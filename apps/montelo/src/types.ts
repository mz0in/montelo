import { ClientOptions as OpenAIClientOptions } from "openai";

export type MonteloOptions = {
  montelo?: MonteloClientOptions;
  openai?: OpenAIClientOptions;
};

export type MonteloClientOptions = {
  apiKey?: string;
  baseUrl?: string;
};

export type TraceParams = {
  name: string;
  userId?: string;
  extra?: Record<string, any>;
};
