import { Log } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";

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
        apiKey: true
      },
    });

    return this.db.log.findMany({
      where: {
        apiKey: environment.apiKey!.key,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5000,
    });
  }
}
