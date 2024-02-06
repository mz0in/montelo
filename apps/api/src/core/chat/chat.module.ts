import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database";
import { ChatController } from "./chat.controller";
import { ChatHealthIndicator } from "./chat.health";
import { ChatProcessor } from "./chat.processor";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "track",
    }),
    DatabaseModule,
  ],
  controllers: [ChatController],
  providers: [ChatProcessor, ChatHealthIndicator],
  exports: [ChatHealthIndicator],
})
export class ChatModule {}
