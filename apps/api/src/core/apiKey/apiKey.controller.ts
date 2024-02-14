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
  @Get("api-keys/:apiKeyId")
  async reveal(@Param("apiKeyId") apiKeyId: string): Promise<ApiKeyWithEnvDto> {
    const apiKey = await this.apiKeyService.reveal(apiKeyId);
    return ApiKeyWithEnvDto.fromApiKeyWithEnv(apiKey);
  }

  @UseGuards(JwtAuthGuard)
  @Post("api-keys/:apiKeyId")
  async rotate(@Param("apiKeyId") apiKeyId: string): Promise<ApiKeyWithEnvDto> {
    const apiKey = await this.apiKeyService.rotate(apiKeyId);
    return ApiKeyWithEnvDto.fromApiKeyWithEnv(apiKey);
  }
}
