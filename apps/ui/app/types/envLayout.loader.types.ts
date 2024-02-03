import { AuthUserDto, EnvironmentDto, FullProjectDto } from "@montelo/browser-client";

export type EnvLayoutLoader = {
  environment: EnvironmentDto;
  user: AuthUserDto;
  project: FullProjectDto;
};
