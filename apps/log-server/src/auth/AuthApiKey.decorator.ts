import { ApiKey } from "@montelo/db";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const IAuthApiKey = createParamDecorator((_data: unknown, ctx: ExecutionContext): ApiKey => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as ApiKey;
});
