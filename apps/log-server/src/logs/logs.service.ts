import { ApiKey, Log, Prisma } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database";
import { CreateLogInput } from "./dto/create-log.input";


@Injectable()
export class LogsService {
  constructor(private db: DatabaseService) {}

  async create(authApiKey: ApiKey, params: CreateLogInput): Promise<Log> {
    const data: Prisma.LogCreateInput = {
      ...params,
      envId: authApiKey.envId,
      inputCost: 0,
      outputCost: 0,
      totalCost: 0,
    };
    return this.db.log.create({
      data: data,
    });
  }
}
