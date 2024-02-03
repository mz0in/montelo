import { InjectQueue } from "@nestjs/bull";
import { Controller, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import axios, { AxiosRequestConfig } from "axios";
import { Queue } from "bull";
import { Request, Response } from "express";

import { QueueInput } from "./chat.types";


@ApiTags("Chat")
@Controller("chat/completions")
export class ChatController {
  constructor(@InjectQueue("track") private readonly trackQueue: Queue<QueueInput>) {}

  @Post()
  async chat(@Req() req: Request, @Res() res: Response) {
    const monteloApiKey = req.headers["x-montelo-api-key"] as string | undefined;
    if (!monteloApiKey) {
      throw new UnauthorizedException();
    }

    const openAIChatUrl = "https://api.openai.com/v1/chat/completions";

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: req.headers.authorization!,
      },
    };

    try {
      const start = new Date();
      const response = await axios.post(openAIChatUrl, req.body, config);
      const end = new Date();

      const duration = (end.getTime() - start.getTime()) / 1000;
      const roundedDuration = parseFloat(duration.toFixed(2));

      const queueInput: QueueInput = {
        input: req.body,
        output: response.data,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        duration: roundedDuration,
        monteloApiKey,
      };

      await this.trackQueue.add(queueInput);
      return res.status(response.status).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          res.status(response.status).json(response.data);
        } else {
          res.status(500).json({ message: "OpenAI API request failed without a response" });
        }
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
}
