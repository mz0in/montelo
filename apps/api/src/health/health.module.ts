import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { ChatModule } from "../core/chat/chat.module";
import { DatabaseModule } from "../database";
import { HealthController } from "./health.controller";


@Module({
  imports: [TerminusModule, HttpModule, DatabaseModule, ChatModule],
  controllers: [HealthController],
})
export class HealthModule {}
