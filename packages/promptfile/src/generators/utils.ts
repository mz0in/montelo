import { AUTO_GENERATED_FILE_HEADER } from "@montelo/common";

export const getOutput = (prompts: string) => {
  return `${AUTO_GENERATED_FILE_HEADER}
import { OpenAI } from "openai";

type ChatCompletionMessageParam = OpenAI.ChatCompletionMessageParam;

export const prompts = {
  ${prompts}
};

`;
};
