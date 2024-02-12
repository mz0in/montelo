import { Configuration, LogsApi } from "./client";

export class Api {
  private readonly configuration: Configuration;

  constructor(configuration: Configuration) {
    this.configuration = configuration;
  }

  public log(): LogsApi {
    return new LogsApi(this.configuration);
  }
}
