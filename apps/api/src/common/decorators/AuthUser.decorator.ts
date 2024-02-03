import { ExecutionContext, createParamDecorator } from "@nestjs/common";

import { AuthUserDto } from "../../auth/dto/auth-user.dto";

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.user;
  },
);
