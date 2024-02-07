import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database";
import { LogModule } from "../log/log.module";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";

@Module({
  imports: [DatabaseModule, LogModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
