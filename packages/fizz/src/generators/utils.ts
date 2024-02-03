import { AUTO_GENERATED_FILE_HEADER } from "@montelo/common";

type OutputParams = Array<{
  name: string;
  path: string;
}>;

export const getOutput = (params: OutputParams) => {
  const imports = params.map((p) => `import ${p.name} from "${p.path}";`);
  const functions = params.map((p) => p.name);

  return `${AUTO_GENERATED_FILE_HEADER}

${imports.join("\n")}

export const functions = {
  ${functions.join(",\n")}
};

export const AllFunctions = Object.values(functions).map((func) => func.toJSON());

`;
};
