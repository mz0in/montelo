import { ApiKey } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import _ from "lodash";

export class ApiKeyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  envId: string;

  static fromApiKey(apiKey: ApiKey): ApiKeyDto {
    return _.pick(apiKey, ["id", "type", "envId"]);
  }
}
