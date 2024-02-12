import { ExtendedOpenAI } from "./ExtendedOpenAI";
import { MonteloClient } from "./MonteloClient";
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

  public async log() {
    return this.monteloClient.createLog({});
  }

  public async trace() {

  }
}
