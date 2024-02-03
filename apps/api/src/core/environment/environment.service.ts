import { Environment } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";
import { ApiKeys } from "../apiKey/apiKey.enum";
import { ApiKeyService } from "../apiKey/apiKey.service";
import { Environments } from "./environment.enums";
import { CreateEnvironmentParams, GetEnvByIdParams } from "./environment.types";

@Injectable()
export class EnvironmentService {
  constructor(
    private db: DatabaseService,
    private apiKeyService: ApiKeyService,
  ) {}

  async getEnvById({ projectId, envId }: GetEnvByIdParams): Promise<Environment> {
    return this.db.environment.findUniqueOrThrow({
      where: {
        id: envId,
        projectId: projectId,
      },
    });
  }

  async create({ name, projectId }: CreateEnvironmentParams): Promise<Environment> {
    if (name === Environments.PRODUCTION || name === Environments.DEVELOPMENT) {
      throw new Error("Restricted environment name.");
    }

    const prefix = name.substring(0, 6);
    const apiKey = this.apiKeyService.generateApiKey(prefix);

    return this.db.environment.create({
      data: {
        name,
        projectId,
        apiKeys: {
          create: {
            type: ApiKeys.MONTELO,
            key: apiKey,
          },
        },
      },
    });
  }
}
