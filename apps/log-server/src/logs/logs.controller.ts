import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Queue } from "bull";
import { Response } from "express";

import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";
import { CreateLogInput } from "./dto/create-log.input";
import { QLogsInput, Queues } from "./types";


@ApiTags("Logs")
@Controller()
export class LogsController {
  constructor(@InjectQueue(Queues.logs) private readonly logsQueue: Queue<QLogsInput>) {}

  @UseGuards(BearerGuard)
  @Post("logs")
  async createLog(
    @Res() res: Response,
    @EnvId() envId: string,
    @Body() body: CreateLogInput,
  ): Promise<{}> {
    const queueInput: QLogsInput = {
      envId,
      trace: body.trace,
      log: body.log,
    };
    await this.logsQueue.add(queueInput);
    return res.status(200).json({});
  }
}
