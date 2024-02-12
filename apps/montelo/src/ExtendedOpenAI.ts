import OpenAI, { ClientOptions as OpenAIClientOptions } from "openai";
import { APIPromise, RequestOptions } from "openai/core";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { Stream } from "openai/streaming";

import { MonteloClient } from "./MonteloClient";

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
    body: OpenAI.ChatCompletionCreateParams,
    options?: RequestOptions,
  ): APIPromise<OpenAI.ChatCompletion> | APIPromise<Stream<OpenAI.ChatCompletionChunk>> {
    const originalPromise = super.create(body, options);

    const loggingPromise = originalPromise.then((data) => {
      this.logToDatabase(data).catch((error) =>
        console.error("Logging to database failed:", error),
      );
      return data;
    });

    // @ts-ignore
    return loggingPromise;
  }

  private async logToDatabase(data: any): Promise<void> {
    await this.monteloClient.createLog(data);
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
