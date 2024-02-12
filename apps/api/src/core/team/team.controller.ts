import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

import { AuthUserDto } from "../../auth/dto/auth-user.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { AuthUser } from "../../common/decorators/AuthUser.decorator";
import { DeleteSuccessDto } from "../../common/dto/delete-success.dto";
import { CreateTeamInput } from "./dto/create-team.input";
import { TeamDto } from "./dto/team.dto";
import { TeamService } from "./team.service";


@ApiTags("Team")
@ApiBearerAuth()
@Controller("team")
export class TeamController {
  constructor(private teamService: TeamService) {}

  @ApiBody({
    type: CreateTeamInput,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @AuthUser() user: AuthUserDto,
    @Body() createTeamInput: CreateTeamInput,
  ): Promise<TeamDto> {
    const team = await this.teamService.create(user.id, createTeamInput);
    return TeamDto.fromTeam(team);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<DeleteSuccessDto> {
    await this.teamService.delete(id);
    return { success: true };
  }
}
