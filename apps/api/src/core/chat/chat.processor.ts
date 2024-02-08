import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

import { DatabaseService } from "../../database";
import { QueueInput } from "./chat.types";


@Processor("track")
export class ChatProcessor {
  constructor(private db: DatabaseService) {}

  @Process()
  async handleTrack(job: Job<QueueInput>) {
    const environment = await this.db.environment.findFirstOrThrow({
      where: {
        apiKey: {
          id: job.data.monteloApiKey,
        },
      },
    });

    await this.db.log.create({
      data: {
        paths: [],
        envId: environment.id,
        startTime: job.data.startTime,
        endTime: job.data.endTime,
        duration: job.data.duration,
        rawInput: job.data.input,
        rawOutput: job.data.output,
        outputContent: "Figure this out",
        model: job.data.input.model,
        isTopLevel: true,
        messages: job.data.input.messages,
        inputTokenCount: job.data.output?.usage?.prompt_tokens || null,
        inputCost: 0,
        outputTokenCount: job.data.output?.usage?.completion_tokens || null,
        outputCost: 0,
        totalCost: 0,
        totalTokenCount: job.data.output?.usage?.total_tokens || null,
        tags: [],
        metadata: {},
      },
    });
  }
}
