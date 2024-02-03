import { getFirstPartOfFilename, getRelativePath } from "@montelo/common";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";

import { FUNCTION_EXAMPLE, FUNCTION_EXAMPLE_FILE_NAME } from "./example";
import { getOutput } from "./utils";

export const initFizz = async (functionsDirectory: string, outputFilePath: string) => {
  if (existsSync(functionsDirectory)) {
    return;
  }

  const filePath = join(functionsDirectory, FUNCTION_EXAMPLE_FILE_NAME);
  mkdirSync(functionsDirectory);
  writeFileSync(filePath, FUNCTION_EXAMPLE);

  const relativePath = getRelativePath(dirname(outputFilePath), filePath);
  const relativePathWithoutExtension = getFirstPartOfFilename(relativePath);
  const functionName = getFirstPartOfFilename(FUNCTION_EXAMPLE_FILE_NAME);

  const output = getOutput([
    {
      name: functionName,
      path: relativePathWithoutExtension,
    },
  ]);

  writeFileSync(outputFilePath, output);
};
