import { Project } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import _ from "lodash";

export class ProjectDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  teamId: string;

  static fromProject(project: Project): ProjectDto {
    return _.pick(project, ["id", "name", "teamId"]);
  }
}
