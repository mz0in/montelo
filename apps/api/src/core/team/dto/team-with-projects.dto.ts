import { ApiProperty } from "@nestjs/swagger";

import { ProjectWithEnvironmentsDto } from "../../project/dto/project-with-environments.dto";
import { TeamWithProjects } from "../team.types";
import { TeamDto } from "./team.dto";

export class TeamWithProjectsDto extends TeamDto {
  @ApiProperty({ type: [ProjectWithEnvironmentsDto] })
  projects: ProjectWithEnvironmentsDto[];

  static fromTeamWithProject(teamWithProjects: TeamWithProjects): TeamWithProjectsDto {
    const teamDto = TeamDto.fromTeam(teamWithProjects);
    const projectDtos = teamWithProjects.projects.map(
      ProjectWithEnvironmentsDto.fromProjectWithEnvironments,
    );
    return {
      ...teamDto,
      projects: projectDtos,
    };
  }
}
