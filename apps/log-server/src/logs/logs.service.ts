import { Prisma } from "@montelo/db";
import { Injectable, Logger } from "@nestjs/common";
import { pick } from "lodash";

import { CostulatorService } from "../costulator/costulator.service";
import { LogCostInput, LogCostOutput } from "../costulator/llm-provider.interface";
import { TraceMetrics } from "../costulator/types";
import { DatabaseService } from "../database";
import { LogInput, TraceInput } from "./dto/create-log.input";


@Injectable()
export class LogsService {
  private logger = new Logger(LogsService.name);

  constructor(
    private db: DatabaseService,
    private costulatorService: CostulatorService,
  ) {}

  async create(envId: string, log: LogInput, trace?: TraceInput): Promise<void> {
    // get the cost of the individual log
    // you need the arrow function to preserve the binding
    const logCost = this.calculateLogCostOrDefault(log, (params: LogCostInput) =>
      this.costulatorService.getLogCost(params),
    );

    // get the updated cost of the trace + this new log. to do this we check all logs already on
    // the trace, sum the metrics up, then add the current log to it,
    const traceMetrics = await this.calculateTraceMetricsOrDefault({
      traceId: trace?.id,
      logCost,
      logTokens: pick(log, ["inputTokens", "outputTokens", "totalTokens"]),
    });

    const baseCreateTrace: Prisma.TraceCreateWithoutLogsInput = {
      ...traceMetrics,
      envId,
      id: trace?.id,
      name: trace?.name || "",
    };

    const traceArg: Prisma.TraceCreateNestedOneWithoutLogsInput = trace
      ? {
          connectOrCreate: {
            where: {
              id: trace.id,
            },
            create: baseCreateTrace,
          },
        }
      : {
          create: baseCreateTrace,
        };

    const logCreateInput: Prisma.LogCreateInput = {
      ...log,
      ...logCost,
      trace: traceArg,
      environment: {
        connect: {
          id: envId,
        },
      },
    };

    const createdLog = await this.db.log.create({
      data: logCreateInput,
    });
    this.logger.log(`Created log with id ${createdLog.id}`);

    // update the trace metrics after we create the log
    await this.db.trace.update({
      where: {
        id: createdLog.traceId,
      },
      data: traceMetrics,
    });
    this.logger.log(`Updated trace with id ${createdLog.traceId}`);
  }

  private async calculateTraceMetricsOrDefault({
    traceId,
    logCost,
    logTokens,
  }: {
    traceId?: string;
    logCost: LogCostOutput;
    logTokens: { inputTokens?: number; outputTokens?: number; totalTokens?: number };
  }): Promise<TraceMetrics> {
    const defaultTraceMetrics: TraceMetrics = {
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      inputCost: 0,
      outputCost: 0,
      totalCost: 0,
    };
    if (!traceId) {
      return defaultTraceMetrics;
    }

    const dbTrace = await this.db.trace.findFirst({
      where: {
        id: traceId,
      },
      include: {
        logs: true,
      },
    });
    if (!dbTrace) {
      return defaultTraceMetrics;
    }

    const traceMetrics = this.costulatorService.getTraceMetrics(dbTrace);

    return {
      inputTokens: traceMetrics.inputTokens + (logTokens.inputTokens || 0),
      outputTokens: traceMetrics.outputTokens + (logTokens.outputTokens || 0),
      totalTokens: traceMetrics.totalTokens + (logTokens.totalTokens || 0),
      inputCost: traceMetrics.inputCost + logCost.inputCost,
      outputCost: traceMetrics.outputCost + logCost.outputCost,
      totalCost: traceMetrics.totalCost + logCost.totalCost,
    };
  }

  private calculateLogCostOrDefault(
    log: LogInput,
    calculateCost: (params: LogCostInput) => LogCostOutput,
  ): LogCostOutput {
    if (log.model && log.inputTokens && log.outputTokens) {
      return calculateCost({
        model: log.model,
        inputTokens: log.inputTokens,
        outputTokens: log.outputTokens,
      });
    }
    return { inputCost: 0, outputCost: 0, totalCost: 0 };
  }
}
