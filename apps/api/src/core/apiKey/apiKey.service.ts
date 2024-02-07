import { Environment } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";

import { HashingService } from "../../common/services/hashing/hashing.service";
import { DatabaseService } from "../../database";
import { Environments } from "../environment/environment.enums";
import {
  ApiKeyWithEnvironment,
  GeneratedKey,
  Prefix,
  RevealKeyParams,
  RotateKeyParams,
} from "./apiKey.types";

@Injectable()
export class ApiKeyService {
  constructor(
    private db: DatabaseService,
    private hashingService: HashingService,
  ) {}

  async findAllForProject(projectId: string): Promise<ApiKeyWithEnvironment[]> {
    const envs = await this.db.environment.findMany({
      where: {
        projectId,
      },
      include: {
        apiKey: true,
      },
    });

    const apiKeyPromises = envs.map((entity) => this.findAllForEnv(entity));
    const apiKeys = await Promise.all(apiKeyPromises);
    return apiKeys.flat();
  }

  async reveal(params: RevealKeyParams): Promise<ApiKeyWithEnvironment> {
    const dbApiKey = await this.db.apiKey.findUniqueOrThrow({
      where: {
        id: params.apiKeyId,
        envId: params.envId,
        environment: {
          projectId: params.projectId,
        },
      },
    });

    if (dbApiKey.viewed) {
      throw new Error("Already viewed key.");
    }

    const dbUpdatedApiKey = await this.markKeyAsViewed(params.apiKeyId, dbApiKey.key);

    // return the unhashed key
    return { ...dbUpdatedApiKey, key: dbApiKey.key };
  }

  async rotate(params: RotateKeyParams): Promise<ApiKeyWithEnvironment> {
    const existingApiKey = await this.db.apiKey.findUniqueOrThrow({
      where: {
        id: params.apiKeyId,
        envId: params.envId,
        environment: {
          projectId: params.projectId,
        },
      },
      include: {
        environment: true,
      },
    });

    const prefixMap = {
      [Environments.DEVELOPMENT]: "dev",
      [Environments.PRODUCTION]: "prod",
    };

    const envName = existingApiKey.environment.name;
    const prefix = prefixMap[envName] ?? envName.substring(6);
    const newKey = this.generateApiKey(prefix);

    const updatedKey = await this.db.apiKey.update({
      where: {
        id: params.apiKeyId,
      },
      data: {
        key: newKey,
        viewed: false,
      },
      include: {
        environment: true,
      },
    });

    return this.obfuscateApiKey(updatedKey);
  }

  async verifyApiKey(apiKey: string): Promise<boolean> {
    const hashedInputKey = await this.hashingService.hash(apiKey);

    const dbApiKey = await this.db.apiKey.findUniqueOrThrow({
      where: {
        key: hashedInputKey,
      },
      select: {
        key: true,
      },
    });

    return hashedInputKey === dbApiKey.key;
  }

  public generateApiKey(prefix: Prefix): GeneratedKey {
    const random = randomBytes(32).toString("base64url");
    const cleaned = random.replace("-", "").replace("_", "");
    return `sk-${prefix}-${cleaned}`;
  }

  private async findAllForEnv(env: Environment): Promise<ApiKeyWithEnvironment[]> {
    const dbApiKeys = await this.db.apiKey.findMany({
      where: {
        envId: env.id,
        environment: {
          projectId: env.projectId,
        },
      },
      include: {
        environment: true,
      },
    });

    return dbApiKeys.map(this.obfuscateApiKey);
  }

  private async markKeyAsViewed(apiKeyId: string, key: string): Promise<ApiKeyWithEnvironment> {
    const hashKey = await this.hashingService.hash(key);

    return this.db.apiKey.update({
      where: {
        id: apiKeyId,
      },
      data: {
        key: hashKey,
        viewed: true,
      },
      include: {
        environment: true,
      },
    });
  }

  private obfuscateApiKey(apiKey: ApiKeyWithEnvironment): ApiKeyWithEnvironment {
    const obfuscatedPart = Array(16).fill("*").join("");
    // if it's already been viewed then the has is in the db
    if (apiKey.viewed) {
      return { ...apiKey, key: `sk-${obfuscatedPart}` };
    }

    const splitKey = (apiKey.key as GeneratedKey).split("-");
    const obfuscatedKey = `${splitKey[0]}-${splitKey[1]}-${obfuscatedPart}`;
    return { ...apiKey, key: obfuscatedKey };
  }
}
