import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from "@nestjs/terminus";

import { ChatHealthIndicator } from "../core/chat/chat.health";
import { DatabaseService } from "../database";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private database: PrismaHealthIndicator,
    private prismaClient: DatabaseService,
    private chatHealthIndicator: ChatHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // () => this.http.pingCheck("server", "http://localhost:3000"),
      () => this.database.pingCheck("database", this.prismaClient),
      () => this.chatHealthIndicator.isHealthy(),
    ]);
  }
}
