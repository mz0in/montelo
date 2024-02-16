import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";
import { LogsModule } from "./logs/logs.module";


@Module({
  imports: [
    BullModule.forRoot({
      redis: process.env.REDIS_URL,
    }),
    HealthModule,
    AuthModule,
    LogsModule,
  ],
})
export class AppModule {}
