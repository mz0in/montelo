import { LogInput, TraceInput } from "./dto/create-log.input";

export enum Queues {
  logs = "logs",
}

export type QLogsInput = {
  envId: string;
  trace: TraceInput | null;
  log: LogInput;
};
