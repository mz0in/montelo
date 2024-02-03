import { Team } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import _ from "lodash";

export class TeamDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  static fromTeam(team: Team): TeamDto {
    return _.pick(team, ["id", "name"]);
  }
}
