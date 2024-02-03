import { readMonteloConfig } from "@montelo/config";
import { generateFizz } from "@montelo/fizz";
import { generatePromptfile } from "@montelo/promptfile";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";

export const generateCommand = async () => {
  const config = readMonteloConfig();
  const cwd = process.cwd();
  const promptsOutputPath = join(cwd, config.prompts.output);
  const functionsOutputPath = join(cwd, config.functions.output);

  // generate prompts
  const promptTS = await generatePromptfile(config.prompts.directory);

  // generate fizz
  const fizzTS = await generateFizz(config.functions.directory, config.functions.output);

  // delete to force the IDE to pick up the new changes
  existsSync(promptsOutputPath) && unlinkSync(promptsOutputPath);
  existsSync(functionsOutputPath) && unlinkSync(functionsOutputPath);

  // write to the files
  writeFileSync(promptsOutputPath, promptTS);
  writeFileSync(functionsOutputPath, fizzTS);

  console.log("⚡️[montelo] Generated types!");
};
