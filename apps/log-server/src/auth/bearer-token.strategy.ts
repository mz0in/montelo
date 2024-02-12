import { ApiKey } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";

import { AuthService } from "./auth.service";


@Injectable()
export class BearerTokenStrategy extends PassportStrategy(Strategy, "bearer-token") {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<ApiKey> {
    return this.authService.validateApiKey(token);
  }
}
