import { Module } from "@nestjs/common";

import { ApiKeyService } from "./apiKey.service";

@Module({
  providers: [ApiKeyService],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
