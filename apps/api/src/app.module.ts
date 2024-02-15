import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { AnalyticsModule } from "./core/analytics/analytics.module";
import { EnvironmentModule } from "./core/environment/environment.module";
import { LogModule } from "./core/log/log.module";
import { MembershipModule } from "./core/membership/membership.module";
import { ProjectModule } from "./core/project/project.module";
import { TeamModule } from "./core/team/team.module";
import { TraceModule } from "./core/trace/trace.module";
import { UserModule } from "./core/user/user.module";
import { EnvModule, envSchema } from "./env";
import { HealthModule } from "./health/health.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === "production" ? undefined : ".env.development",
      isGlobal: true,
      validate: envSchema.parse,
    }),
    EnvModule,
    HealthModule,
    AuthModule,
    UserModule,
    TeamModule,
    ProjectModule,
    EnvironmentModule,
    MembershipModule,
    LogModule,
    AnalyticsModule,
    TraceModule,
  ],
})
export class AppModule {}
