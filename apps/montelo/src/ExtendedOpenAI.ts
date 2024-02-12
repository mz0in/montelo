import OpenAI, { ClientOptions as OpenAIClientOptions } from "openai";
import { APIPromise, RequestOptions } from "openai/core";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { Stream } from "openai/streaming";

import { MonteloClient } from "./MonteloClient";
import { LogInput } from "./client";

class ExtendedChatCompletions extends OpenAI.Chat.Completions {
  private monteloClient: MonteloClient;

  constructor(client: OpenAI, monteloClient: MonteloClient) {
    super(client);
    this.monteloClient = monteloClient;
  }

  create(
    body: OpenAI.ChatCompletionCreateParamsNonStreaming,
    options?: RequestOptions,
  ): APIPromise<OpenAI.ChatCompletion>;
  create(
    body: OpenAI.ChatCompletionCreateParamsStreaming,
    options?: RequestOptions,
  ): APIPromise<Stream<OpenAI.ChatCompletionChunk>>;
  create(
    body: ChatCompletionCreateParamsBase,
    options?: RequestOptions,
  ): APIPromise<Stream<OpenAI.ChatCompletionChunk> | OpenAI.ChatCompletion>;

  create(
    body: ChatCompletionCreateParamsBase,
    options?: RequestOptions,
  ): APIPromise<OpenAI.ChatCompletion | Stream<OpenAI.ChatCompletionChunk>> {
    const startTime = new Date();

    const originalPromise = super.create(body, options);

    if ("stream" in body && body.stream) {
      // Handle streaming response
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
      return originalPromise.then((data) => {
        const endTime = new Date();
        const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);

        this.logToDatabase(
          // @ts-ignore
          data,
          startTime.toISOString(),
          endTime.toISOString(),
          parseFloat(duration),
        ).catch(console.error);
        return data;
      });
    }
  }

  private async logToDatabase(
    data: OpenAI.ChatCompletion,
    startTime: string,
    endTime: string,
    duration: number,
  ): Promise<void> {
    const payload: LogInput = {
      name: "",
      startTime,
      endTime,
      duration,
      model: data.model,
      inputTokens: data.usage.prompt_tokens,
      outputTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens,
      extra: {},
      input: {},
      output: data.choices[0],
    };
    await this.monteloClient.createLog(payload);
  }
}

class ExtendedChat extends OpenAI.Chat {
  completions: ExtendedChatCompletions;

  constructor(client: OpenAI, monteloClient: MonteloClient) {
    super(client);

    // Override the completions with the extended version
    this.completions = new ExtendedChatCompletions(this._client, monteloClient);
  }
}

export class ExtendedOpenAI extends OpenAI {
  chat: ExtendedChat;

  constructor(options: OpenAIClientOptions, monteloClient: MonteloClient) {
    super(options);

    // Override the chat with the extended version
    this.chat = new ExtendedChat(this, monteloClient);
  }
}
