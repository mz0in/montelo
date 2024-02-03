import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

import { DatabaseService } from "../../database";
import { QueueInput } from "./chat.types";


@Processor("track")
export class ChatProcessor {
  constructor(private db: DatabaseService) {}

  @Process()
  async handleTrack(job: Job<QueueInput>) {
    // make sure the api key exists
    await this.db.apiKey.findUniqueOrThrow({
      where: {
        key: job.data.monteloApiKey,
      },
    });

    await this.db.log.create({
      data: {
        paths: "Coming Soon",
        apiKey: job.data.monteloApiKey,
        startTime: job.data.startTime,
        endTime: job.data.endTime,
        duration: job.data.duration,
        rawInput: job.data.input,
        rawOutput: job.data.output,
        model: job.data.input.model,
        isTopLevel: true,
        messages: job.data.input.messages,
        inputTokenCount: job.data.output?.usage?.prompt_tokens || null,
        inputCost: 0,
        outputTokenCount: job.data.output?.usage?.completion_tokens || null,
        outputCost: 0,
        totalCost: 0,
        totalTokenCount: job.data.output?.usage?.total_tokens || null,
      },
    });
  }
}
