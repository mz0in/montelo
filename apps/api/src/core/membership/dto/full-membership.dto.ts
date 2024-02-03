import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { TeamWithProjectsDto } from "../../team/dto/team-with-projects.dto";
import { FullMembership } from "../membership.types";
import { MembershipDto } from "./membership.dto";

export class FullMembershipDto extends MembershipDto {
  @ApiProperty()
  @IsString()
  team: TeamWithProjectsDto;

  static fromFullMembership(fullMembership: FullMembership): FullMembershipDto {
    const baseMembership = MembershipDto.fromMembership(fullMembership);
    const teamDto = TeamWithProjectsDto.fromTeamWithProject(fullMembership.team);
    return {
      ...baseMembership,
      team: teamDto,
    };
  }
}
