import { Environment } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { pick } from "lodash";

export class EnvironmentDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  projectId: string;

  static fromEnvironment(environment: Environment): EnvironmentDto {
    return pick(environment, ["id", "name", "projectId"]);
  }
}
