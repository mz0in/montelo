import { ApiKey } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../database";


@Injectable()
export class AuthService {
  constructor(private db: DatabaseService) {}

  async validateApiKey(apiKey: string): Promise<ApiKey> {
    return this.db.apiKey.findUniqueOrThrow({
      where: {
        key: apiKey,
      },
    });
  }
}
