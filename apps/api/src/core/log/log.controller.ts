import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { LogDto } from "./dto/log.dto";
import { LogService } from "./log.service";


@ApiTags("Log")
@ApiBearerAuth()
@Controller("env/:envId/log")
export class LogController {
  constructor(private logService: LogService) {}

  @ApiQuery({
    name: "take",
    type: String,
    description: "How many logs to get. If undefined returns all.",
    required: false,
  })
  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Param("envId") envId: string, @Query("take") take?: string): Promise<LogDto[]> {
    const options = take ? { take: parseInt(take) } : undefined;
    const logs = await this.logService.findAllTopLevel(envId, options);
    return logs.map(LogDto.fromLog);
  }
}
