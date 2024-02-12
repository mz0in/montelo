import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { LogsModule } from "./logs/logs.module";


@Module({
  imports: [AuthModule, LogsModule],
})
export class AppModule {}
