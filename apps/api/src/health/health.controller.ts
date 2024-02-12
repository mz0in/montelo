import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from "@nestjs/terminus";

import { DatabaseService } from "../database";


@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private database: PrismaHealthIndicator,
    private prismaClient: DatabaseService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.database.pingCheck("database", this.prismaClient)]);
  }
}
