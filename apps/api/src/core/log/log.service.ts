import { Log } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";

@Injectable()
export class LogService {
  constructor(private db: DatabaseService) {}

  async findAllTopLevel(envId: string, options?: { take?: number }): Promise<Log[]> {
    const x = await this.db.log.findMany({
      where: {
        envId,
      },
      orderBy: {
        startTime: "desc",
      },
      take: options?.take || 5000,
    });
    console.log(x[0]);
    return x
  }
}
