import { getFirstPartOfFilename, getRelativePath } from "@montelo/common";
import async from "async";
import { sync } from "fast-glob";
import { readFile } from "fs/promises";
import { dirname } from "path";

import { FUNCTION_EXAMPLE_FILE_NAME } from "./example";
import { getOutput } from "./utils";

export const generateFizz = async (
  pathToUserFunctionsDir: string,
  outputFilePath: string,
): Promise<string> => {
  const userFunctions = sync(`${pathToUserFunctionsDir}/**/*.ts`);
  const functions: Array<{
    name: string;
    path: string;
  }> = [];

  await async.eachLimit(userFunctions, 5, async (filePath) => {
    try {
      const fileContent = await readFile(filePath, "utf8");
      if (!fileContent.includes("export default new AIFunction")) {
        return;
      }

      const relativePath = getRelativePath(dirname(outputFilePath), filePath);
      const relativePathWithoutExtension = getFirstPartOfFilename(relativePath);
      const functionName = getFirstPartOfFilename(FUNCTION_EXAMPLE_FILE_NAME);
      functions.push({
        name: functionName,
        path: relativePathWithoutExtension,
      });
    } catch (e) {
      console.error(e);
      throw new Error(`Error reading ${filePath}: ${e}`);
    }
  });

  return getOutput(functions);
};
