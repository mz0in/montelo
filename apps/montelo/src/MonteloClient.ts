import cuid from "cuid";

import { Api } from "./api";
import { Configuration, type LogInput, type TraceInput } from "./client";
import { MonteloClientOptions } from "./types";

export class MonteloClient {
  private api: Api;
  private currentTrace: (TraceInput & { id: string }) | null = null;

  constructor(options: MonteloClientOptions) {
    const apiKey = options.apiKey || process.env.MONTELO_API_KEY;
    const baseUrl = options.baseUrl || process.env.MONTELO_BASE_URL;
    if (!apiKey) {
      throw new Error("Montelo API key not set.");
    }
    if (!baseUrl) {
      throw new Error("Montelo base url not set.");
    }

    const configuration = new Configuration({
      basePath: baseUrl,
      accessToken: apiKey,
    });
    this.api = new Api(configuration);
  }

  public async createLog(params: LogInput): Promise<void> {
    try {
      await this.api.log().logsControllerCreateLog({
        createLogInput: {
          log: params,
          trace: this.currentTrace,
        },
      });
    } catch (e: any) {
      console.error("Montelo Error: ", e);
    }
  }

  public startTrace(params: TraceInput) {
    this.currentTrace = {
      ...params,
      id: cuid(),
    };
  }
}
