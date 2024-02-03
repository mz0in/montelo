import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database";
import { ApiKeyModule } from "../apiKey/apiKey.module";
import { UserService } from "./user.service";

@Module({
  imports: [DatabaseModule, ApiKeyModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
