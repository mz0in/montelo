import { MonteloClient } from "./MonteloClient";
import { LogInput } from "./client";
import { ExtendedOpenAI } from "./extended/ExtendedOpenAI";
import { MonteloOptions, TraceParams } from "./types";

export class MonteloAI {
  private readonly monteloClient: MonteloClient;
  public readonly openai: ExtendedOpenAI;

  constructor(options?: MonteloOptions) {
    this.monteloClient = new MonteloClient(options?.montelo);
    this.openai = new ExtendedOpenAI(this.monteloClient, options?.openai);
  }

  public log(params: LogInput) {
    void this.monteloClient.createLog(params);
  }

  public trace(params: TraceParams) {
    this.monteloClient.startTrace(params);
  }

  public clearTrace() {
    this.monteloClient.clearTrace();
  }
}
