import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { LogDto } from "./dto/log.dto";
import { LogService } from "./log.service";

@ApiTags("Log")
@ApiBearerAuth()
@Controller("env/:envId/log")
export class LogController {
  constructor(private logService: LogService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Param("envId") envId: string): Promise<LogDto[]> {
    const logs = await this.logService.findAllTopLevel(envId);
    return logs.map(LogDto.fromLog);
  }
}
