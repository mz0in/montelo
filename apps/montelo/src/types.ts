import { ClientOptions as OpenAIClientOptions } from "openai";

export type MonteloOptions = {
  montelo?: MonteloClientOptions;
  openai?: OpenAIClientOptions;
};

export type MonteloClientOptions = {
  apiKey?: string;
};

export type APIOut<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: string;
    };

export type CreatLogParams = {

};
