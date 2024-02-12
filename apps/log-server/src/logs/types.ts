import { ApiKey } from "@montelo/db";

import { CreateLogInput } from "./dto/create-log.input";

export enum Queues {
  logs = "logs",
}

export type QLogsInput = {
  apiKey: ApiKey;
  params: CreateLogInput;
};
