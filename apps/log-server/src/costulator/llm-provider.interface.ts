export type LogCostOutput = {
  inputCost: number;
  outputCost: number;
  totalCost: number;
};

export type LogCostInput = {
  model: string;
  inputTokens: number;
  outputTokens: number;
};

export interface LLMProvider {
  calculateLogCost(params: LogCostInput): LogCostOutput;

  supportedModels(): string[];
}
