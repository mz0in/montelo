import dotenv from "dotenv";
import { MonteloAI } from "montelo";

dotenv.config();

const chat = async (): Promise<void> => {
  const message = "Queen sized inflatable mattress";

  const montelo = new MonteloAI();
  montelo.trace({
    name: "Amazon review writer",
  });

  // some vector db work
  const writerCompletion = await montelo.openai.chat.completions.create({
    name: "Writer",
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content:
          "You write amazon reviews for the user. The user will give you a product, and you will write a one sentence review on it. Here's the catch: I want you to intentionally make spelling errors. Make as many spelling errors as you can.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });
  const writerContent = writerCompletion.choices[0].message.content;

  // chat
  await montelo.openai.chat.completions.create({
    name: "Writer / Reviewer",
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content:
          "You are a reviewer of amazon reviews. If there are any spelling errors please fix them. Return the amazon review as is, with only the spelling errors fixed.",
      },
      {
        role: "user",
        content: writerContent,
      },
    ],
    // tools: AllFunctions,
  });
};

void chat();
