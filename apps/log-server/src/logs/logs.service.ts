import { Log, Prisma } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database";
import { LogInput, TraceInput } from "./dto/create-log.input";


@Injectable()
export class LogsService {
  constructor(private db: DatabaseService) {}

  async create(envId: string, trace: TraceInput | null, log: LogInput): Promise<Log> {
    const baseCreateTrace: Prisma.TraceCreateWithoutLogsInput = {
      envId,
      name: trace?.name || "",
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      inputCost: 0,
      outputCost: 0,
      totalCost: 0,
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

    const data: Prisma.LogCreateInput = {
      ...log,
      trace: traceArg,
      environment: {
        connect: {
          id: envId,
        },
      },
      inputCost: 0,
      outputCost: 0,
      totalCost: 0,
    };

    return this.db.log.create({
      data: data,
    });
  }
}
