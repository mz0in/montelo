export enum Environments {
  DEVELOPMENT = "Development",
  PRODUCTION = "Production",
}

export const EnvApiKeyPrefixMap = {
  [Environments.DEVELOPMENT]: "dev",
  [Environments.PRODUCTION]: "prod",
};
