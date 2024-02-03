import { ApiProperty } from "@nestjs/swagger";

import { EnvironmentDto } from "../../environment/dto/environment.dto";
import { ProjectWithEnvironments } from "../project.types";
import { ProjectDto } from "./project.dto";

export class ProjectWithEnvironmentsDto extends ProjectDto {
  @ApiProperty({ type: [EnvironmentDto] })
  environments: EnvironmentDto[];

  static fromProjectWithEnvironments(
    projectWithEnvironments: ProjectWithEnvironments,
  ): ProjectWithEnvironmentsDto {
    const projectDto = ProjectDto.fromProject(projectWithEnvironments);
    const environmentDtos = projectWithEnvironments.environments.map(
      EnvironmentDto.fromEnvironment,
    );
    return {
      ...projectDto,
      environments: environmentDtos,
    };
  }
}
