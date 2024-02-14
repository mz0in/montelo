import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ApiKeyService } from "./apiKey.service";
import { ApiKeyWithEnvDto } from "./dto/apiKeyWithEnv.dto";

@ApiTags("Api Key")
@ApiBearerAuth()
@Controller()
export class ApiKeyController {
  constructor(private apiKeyService: ApiKeyService) {}

  @UseGuards(JwtAuthGuard)
  @Get("project/:projectId/api-keys")
  async getAllForProject(@Param("projectId") projectId: string): Promise<ApiKeyWithEnvDto[]> {
    const apiKeys = await this.apiKeyService.findAllForProject(projectId);
    return apiKeys.map(ApiKeyWithEnvDto.fromApiKeyWithEnv);
  }

  @UseGuards(JwtAuthGuard)
  @Get("env/:envId/api-keys/:apiKeyId")
  async reveal(
    @Param("envId") envId: string,
    @Param("apiKeyId") apiKeyId: string,
  ): Promise<ApiKeyWithEnvDto> {
    const apiKey = await this.apiKeyService.reveal(envId, apiKeyId);
    return ApiKeyWithEnvDto.fromApiKeyWithEnv(apiKey);
  }

  @UseGuards(JwtAuthGuard)
  @Post("env/:envId/api-keys/:apiKeyId")
  async rotate(
    @Param("envId") envId: string,
    @Param("apiKeyId") apiKeyId: string,
  ): Promise<ApiKeyWithEnvDto> {
    const apiKey = await this.apiKeyService.rotate(envId, apiKeyId);
    return ApiKeyWithEnvDto.fromApiKeyWithEnv(apiKey);
  }
}
