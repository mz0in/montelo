import { createDefaultMonteloConfig, getConfigPath } from "@montelo/config";
import { initFizz } from "@montelo/fizz";
import { initPromptfile } from "@montelo/promptfile";
import { existsSync } from "fs";

export const initCommand = async () => {
  const configPath = getConfigPath();
  if (existsSync(configPath)) {
    console.log("[montelo] Looks like you're already setup! Skipping init...");
    return;
  }

  const config = createDefaultMonteloConfig(configPath);
  await initFizz(config.functions.directory, config.functions.output);
  await initPromptfile(config.prompts.directory, config.prompts.output);
  console.log("⚡️[montelo] Initialized!");
};
