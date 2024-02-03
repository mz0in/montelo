import { Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";

@Injectable()
export class ApiKeyService {
  constructor() {}

  generateApiKey(prefix: "prod" | "dev" | string): string {
    return `sk_${prefix}_${randomBytes(32).toString("hex")}`;
  }
}
