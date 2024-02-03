import { Log } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";
import { ApiKeys } from "../apiKey/apiKey.enum";

@Injectable()
export class LogService {
  constructor(private db: DatabaseService) {}

  async findAllForEnv({ envId, projectId }: { envId: string; projectId: string }): Promise<Log[]> {
    const environment = await this.db.environment.findUniqueOrThrow({
      where: {
        id: envId,
        projectId,
      },
      include: {
        apiKeys: {
          where: {
            type: {
              equals: ApiKeys.MONTELO,
            },
          },
        },
      },
    });

    return this.db.log.findMany({
      where: {
        apiKey: environment.apiKeys[0].key,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5000,
    });
  }
}
