import { Environment } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";
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

    // if changing this also change apiKey service
    const prefix = name.substring(6);
    const apiKey = this.apiKeyService.generateApiKey(prefix);

    return this.db.environment.create({
      data: {
        name,
        projectId,
        apiKey: {
          create: {
            key: apiKey,
          },
        },
      },
    });
  }
}
