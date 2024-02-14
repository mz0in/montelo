import { Injectable, UnauthorizedException } from "@nestjs/common";

import { HashingService } from "../common/services/hashing/hashing.service";
import { DatabaseService } from "../database";

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private hashingService: HashingService,
  ) {}

  /**
   * @param apiKey incoming api key from the user.
   * @returns the envId for the given apiKey.
   */
  async validateApiKey(apiKey: string): Promise<string> {
    console.log("validating: ", apiKey);
    const [publicWithPrefix, privatePart] = apiKey.split("_");

    const dbApiKey = await this.db.apiKey.findUniqueOrThrow({
      where: {
        public: publicWithPrefix,
      },
    });

    console.log("dbApiKey: ", dbApiKey);

    const isValid = await this.hashingService.verify(privatePart, dbApiKey.private);
    console.log("isValid: ", isValid);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return dbApiKey.envId;
  }
}
