export type Pricing = {
  /**
   * Price per 1k tokens
   */
  input1K: number;
  /**
   * price per 1k tokens
   */
  output1K: number;
};

export type TraceMetrics = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
};
