import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database";
import { ApiKeyController } from "./apiKey.controller";
import { ApiKeyService } from "./apiKey.service";

@Module({
  imports: [DatabaseModule],
  controllers: [ApiKeyController],
  providers: [ApiKeyService],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
