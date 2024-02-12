import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { DatabaseModule } from "../database";
import { AuthService } from "./auth.service";
import { BearerTokenStrategy } from "./bearer-token.strategy";


@Module({
  imports: [PassportModule, DatabaseModule],
  providers: [AuthService, BearerTokenStrategy],
})
export class AuthModule {}
