import { ExtendedOpenAI } from "./ExtendedOpenAI";
import { MonteloClient } from "./MonteloClient";
import type { LogInput, TraceInput } from "./client";
import { MonteloOptions } from "./types";

export class MonteloAI {
  private readonly monteloClient: MonteloClient;
  public readonly openai: ExtendedOpenAI;

  constructor(options?: MonteloOptions) {
    this.monteloClient = new MonteloClient(options?.montelo);

    if (options?.openai) {
      this.openai = new ExtendedOpenAI(options.openai, this.monteloClient);
    }
  }

  public log(params: LogInput) {
    void this.monteloClient.createLog(params);
  }

  public trace(params: TraceInput) {
    this.monteloClient.startTrace(params);
  }
}
