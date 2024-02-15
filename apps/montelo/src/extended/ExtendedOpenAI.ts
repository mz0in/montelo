import OpenAI, { ClientOptions as OpenAIClientOptions } from "openai";
import { APIPromise, RequestOptions } from "openai/core";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { Stream } from "openai/streaming";

import { MonteloClient } from "../MonteloClient";
import { LogInput } from "../client";
import { MonteloLogExtend } from "./types";

class ExtendedChatCompletions extends OpenAI.Chat.Completions {
  private monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient, openAIOptions: OpenAI) {
    super(openAIOptions);

    this.monteloClient = monteloClient;
  }

  create(
    body: OpenAI.ChatCompletionCreateParamsNonStreaming & MonteloLogExtend,
    options?: RequestOptions,
  ): APIPromise<OpenAI.ChatCompletion>;
  create(
    body: OpenAI.ChatCompletionCreateParamsStreaming & MonteloLogExtend,
    options?: RequestOptions,
  ): APIPromise<Stream<OpenAI.ChatCompletionChunk>>;
  create(
    body: ChatCompletionCreateParamsBase & MonteloLogExtend,
    options?: RequestOptions,
  ): APIPromise<Stream<OpenAI.ChatCompletionChunk> | OpenAI.ChatCompletion>;

  create(
    body: ChatCompletionCreateParamsBase & MonteloLogExtend,
    options?: RequestOptions,
  ): APIPromise<OpenAI.ChatCompletion | Stream<OpenAI.ChatCompletionChunk>> {
    const startTime = new Date();

    const { name, ...bodyWithoutMonteloParams } = body;
    const originalPromise = super.create(bodyWithoutMonteloParams, options);

    if ("stream" in body && body.stream) {
      return originalPromise;
      // return new Promise((resolve, reject) => {
      //   const chunks: OpenAI.ChatCompletionChunk[] = [];
      //   originalPromise
      //     .then((stream) => {
      //       // @ts-ignore
      //       stream.on("data", (chunk) => chunks.push(chunk));
      //       // @ts-ignore
      //       stream.on("end", () => {
      //         const endTime = new Date(); // Capture end time as Date object
      //         const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2); // Duration in seconds, rounded to two decimal places
      //
      //         // Convert accumulated chunks into a suitable format if necessary
      //         const resultData = this.processStreamedData(chunks);
      //
      //         this.logToDatabase(
      //           resultData,
      //           startTime.toISOString(),
      //           endTime.toISOString(),
      //           parseFloat(duration),
      //         ).catch(console.error);
      //         resolve(stream); // Resolve with the original stream
      //       });
      //       stream.on("error", reject);
      //     })
      //     .catch(reject);
      // }) as APIPromise<Stream<OpenAI.ChatCompletionChunk>>;
    } else {
      // @ts-ignore
      return originalPromise.then((data) => {
        const endTime = new Date();
        const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);

        // @ts-ignore
        void this.logToDatabase(body, data, {
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration: parseFloat(duration),
        });
        return data;
      });
    }
  }

  private async logToDatabase(
    input: ChatCompletionCreateParamsBase & MonteloLogExtend,
    output: OpenAI.ChatCompletion,
    time: {
      startTime: string;
      endTime: string;
      duration: number;
    },
  ): Promise<void> {
    const payload: LogInput = {
      ...time,
      name: input.name,
      model: output.model,
      inputTokens: output.usage?.prompt_tokens,
      outputTokens: output.usage?.completion_tokens,
      totalTokens: output.usage?.total_tokens,
      input: input.messages,
      output: output.choices[0],
      extra: input.extra,
    };
    await this.monteloClient.createLog(payload);
  }
}

class ExtendedChat extends OpenAI.Chat {
  completions: ExtendedChatCompletions;

  constructor(monteloClient: MonteloClient, openAIOptions: OpenAI) {
    super(openAIOptions);

    this.completions = new ExtendedChatCompletions(monteloClient, this._client);
  }
}

export class ExtendedOpenAI extends OpenAI {
  chat: ExtendedChat;

  constructor(monteloClient: MonteloClient, openAIOptions?: OpenAIClientOptions) {
    super(openAIOptions);

    this.chat = new ExtendedChat(monteloClient, this);
  }
}
