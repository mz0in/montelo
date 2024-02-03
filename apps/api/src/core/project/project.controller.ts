import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CreateProjectInput } from "./dto/create-project.input";
import { FullProjectDto } from "./dto/full-project.dto";
import { ProjectDto } from "./dto/project.dto";
import { ProjectService } from "./project.service";

@ApiTags("Project")
@ApiBearerAuth()
@Controller("project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiOkResponse({
    description: "The full project (team and environments included).",
    type: FullProjectDto,
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  @Get(":projectId")
  async get(@Param("projectId") projectId: string): Promise<FullProjectDto> {
    const fullProject = await this.projectService.findById(projectId);
    return FullProjectDto.fromFullProject(fullProject);
  }

  @ApiOkResponse({
    description: "The created project.",
    type: ProjectDto,
    status: 200,
  })
  @ApiBody({
    type: CreateProjectInput,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProjectInput: CreateProjectInput): Promise<ProjectDto> {
    const project = await this.projectService.create(createProjectInput);
    return ProjectDto.fromProject(project);
  }
}
