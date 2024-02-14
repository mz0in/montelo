import { Inject, Injectable } from "@nestjs/common";

import { TraceWithLogs } from "../logs/types";
import { LLMProvider, LogCostInput, LogCostOutput } from "./llm-provider.interface";
import { TraceMetrics } from "./types";


@Injectable()
export class CostulatorService {
  constructor(@Inject("LLM_PROVIDERS") private providers: LLMProvider[]) {
    console.log("Providers injected into CostulatorService:", this.providers);
  }

  getLogCost(params: LogCostInput): LogCostOutput {
    console.log("Getting log cost: ", this.providers);
    const provider = this.providers.find((provider) =>
      provider.supportedModels().includes(params.model),
    );
    if (!provider) {
      console.error(`No provider found for model ${params.model}`);
      return { inputCost: 0, outputCost: 0, totalCost: 0 };
    }
    return provider.calculateLogCost(params);
  }

  getTraceMetrics(trace: TraceWithLogs): TraceMetrics {
    return trace.logs.reduce(
      (accum, curr) => {
        return {
          inputTokens: accum.inputTokens + (curr.inputTokens || 0),
          outputTokens: accum.outputTokens + (curr.outputTokens || 0),
          totalTokens: accum.totalTokens + (curr.totalTokens || 0),
          inputCost: accum.inputCost + (curr.inputCost || 0),
          outputCost: accum.outputCost + (curr.outputCost || 0),
          totalCost: accum.totalCost + (curr.totalCost || 0),
        };
      },
      {
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        inputCost: 0,
        outputCost: 0,
        totalCost: 0,
      } as TraceMetrics,
    );
  }
}
