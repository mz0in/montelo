import dotenv from "dotenv";
import { MonteloAI } from "montelo";

import { AllFunctions } from "./functions/functions.montelo";
import { prompts } from "./prompts/prompts.montelo";

dotenv.config();

const chat = async (message: string) => {
  const montelo = new MonteloAI();
  montelo.trace();

  // some vectordb work
  montelo.log({});

  // chat
  const chatCompletion = await montelo.openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: prompts.weatherman({ message }),
    tools: AllFunctions,
  });
  const response = chatCompletion.choices[0]?.message;

  console.log("Response: ", JSON.stringify(response));
};

void chat("What's the weather in Toronto today?");
