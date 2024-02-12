import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ApiKeyService } from "./apiKey.service";
import { ApiKeyWithEnvDto } from "./dto/apiKeyWithEnv.dto";

@ApiTags("Api Key")
@ApiBearerAuth()
@Controller("env/:envId")
export class ApiKeyController {
  constructor(private apiKeyService: ApiKeyService) {}

  @UseGuards(JwtAuthGuard)
  @Get("api-keys")
  async getAllForEnv(@Param("envId") envId: string): Promise<ApiKeyWithEnvDto[]> {
    const apiKeys = await this.apiKeyService.findAllForEnv(envId);
    return apiKeys.map(ApiKeyWithEnvDto.fromApiKeyWithEnv);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":envId/api-keys/:apiKeyId")
  async reveal(
    @Param("envId") envId: string,
    @Param("apiKeyId") apiKeyId: string,
  ): Promise<ApiKeyWithEnvDto> {
    const apiKey = await this.apiKeyService.reveal(envId, apiKeyId);
    return ApiKeyWithEnvDto.fromApiKeyWithEnv(apiKey);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":envId/api-keys/:apiKeyId")
  async rotate(
    @Param("envId") envId: string,
    @Param("apiKeyId") apiKeyId: string,
  ): Promise<ApiKeyWithEnvDto> {
    const apiKey = await this.apiKeyService.rotate(envId, apiKeyId);
    return ApiKeyWithEnvDto.fromApiKeyWithEnv(apiKey);
  }
}
