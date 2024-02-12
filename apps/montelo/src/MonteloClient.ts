import { APIOut, CreatLogParams, MonteloClientOptions } from "./types";

export class MonteloClient {
  private readonly LOG_SERVER_BASE_URL: string;
  private readonly apiKey: string;

  constructor(options: MonteloClientOptions) {
    const apiKey = options.apiKey || process.env.MONTELO_API_KEY;
    if (!apiKey) {
      throw new Error("MONTELO_API_KEY not set.");
    }
    this.apiKey = apiKey;
  }

  public async createLog(params: CreatLogParams): Promise<APIOut<{ id: string }>> {
    try {
      const result = await fetch(`${this.LOG_SERVER_BASE_URL}/logs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(params),
      });
      const data = await result.json();
      return { data, error: null };
    } catch (e: any) {
      return { data: null, error: e.toString() };
    }
  }
}
