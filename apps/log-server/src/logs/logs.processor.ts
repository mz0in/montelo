import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

import { LogsService } from "./logs.service";
import { QLogsInput, Queues } from "./types";


@Processor(Queues.logs)
export class LogsProcessor {
  constructor(private logsService: LogsService) {}

  @Process()
  async handleLog(job: Job<QLogsInput>) {
    const {
      data: { envId, trace, log },
    } = job;
    await this.logsService.create(envId, trace, log);
  }
}
