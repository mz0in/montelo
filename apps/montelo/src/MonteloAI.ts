import { MonteloClient } from "./MonteloClient";
import { LogInput } from "./client";
import { ExtendedOpenAI } from "./extended/ExtendedOpenAI";
import { MonteloOptions, TraceParams } from "./types";


/**
 * The API for interfacing with MonteloAI. Wraps OpenAI and other providers.
 */
export class MonteloAI {
  private readonly monteloClient: MonteloClient;
  public readonly openai: ExtendedOpenAI;

  constructor(options?: MonteloOptions) {
    this.monteloClient = new MonteloClient(options?.montelo);
    this.openai = new ExtendedOpenAI(this.monteloClient, options?.openai);
  }

  /**
   * Creates a log.
   *
   * To nest a log under each other, see {@link https://docs.montelo.ai Log Nesting}.
   *
   * To add traces as part of a trace, see {@link https://docs.montelo.ai Log Tracing}.
   *
   */
  public log(params: LogInput) {
    void this.monteloClient.createLog(params);
  }

  /**
   * Creates a trace, for which all subsequent traces and LLM calls fall under.
   *
   * To learn how tracing works, see {@link https://docs.montelo.ai Log Tracing}.
   */
  public trace(params: TraceParams) {
    this.monteloClient.startTrace(params);
  }

  /**
   * Manually clears the trace context.
   */
  public clearTrace() {
    this.monteloClient.clearTrace();
  }
}
