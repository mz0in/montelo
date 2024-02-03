import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { LogDto } from "./dto/log.dto";
import { LogService } from "./log.service";


@ApiTags("Log")
@ApiBearerAuth()
@Controller("project/:projectId/env/:envId/log")
export class LogController {
  constructor(private logService: LogService) {}

  @ApiOkResponse({
    description: "All logs of a user.",
    type: [LogDto],
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(
    @Param("projectId") projectId: string,
    @Param("envId") envId: string,
  ): Promise<LogDto[]> {
    const logs = await this.logService.findAllForEnv({
      envId,
      projectId,
    });
    return logs.map(LogDto.fromLog);
  }
}
