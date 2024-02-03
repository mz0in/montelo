import { ApiProperty } from "@nestjs/swagger";

import { EnvironmentDto } from "../../environment/dto/environment.dto";
import { TeamDto } from "../../team/dto/team.dto";
import { FullProject } from "../project.types";
import { ProjectDto } from "./project.dto";

export class FullProjectDto extends ProjectDto {
  @ApiProperty()
  team: TeamDto;

  @ApiProperty({ type: [EnvironmentDto] })
  environments: EnvironmentDto[];

  static fromFullProject(fullProject: FullProject): FullProjectDto {
    const projectDto = ProjectDto.fromProject(fullProject);
    const teamDto = TeamDto.fromTeam(fullProject.team);
    const environmentDtos = fullProject.environments.map(EnvironmentDto.fromEnvironment);
    return {
      ...projectDto,
      team: teamDto,
      environments: environmentDtos,
    };
  }
}
