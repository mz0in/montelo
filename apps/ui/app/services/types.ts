import { AuthUserDto } from "@montelo/browser-client";

export type JwtPayload = {
  accessToken: string;
  sub: string;
  user: AuthUserDto;
};
