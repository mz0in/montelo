import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { EnvironmentDto } from "./dto/environment.dto";
import { EnvironmentService } from "./environment.service";

@ApiTags("Environment")
@ApiBearerAuth()
@Controller("project/:projectId/env")
export class EnvironmentController {
  constructor(private environmentService: EnvironmentService) {}

  @ApiOkResponse({
    description: "The environment.",
    type: EnvironmentDto,
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  @Get(":envId")
  async get(
    @Param("projectId") projectId: string,
    @Param("envId") envId: string,
  ): Promise<EnvironmentDto> {
    const environment = await this.environmentService.getEnvById({
      projectId,
      envId,
    });
    return EnvironmentDto.fromEnvironment(environment);
  }
}
