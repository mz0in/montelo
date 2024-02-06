import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthUserDto } from "../../auth/dto/auth-user.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { AuthUser } from "../../common/decorators/AuthUser.decorator";
import { FullMembershipDto } from "./dto/full-membership.dto";
import { MembershipService } from "./membership.service";

@ApiTags("Membership")
@ApiBearerAuth()
@Controller("membership")
export class MembershipController {
  constructor(private membershipService: MembershipService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@AuthUser() user: AuthUserDto): Promise<FullMembershipDto[]> {
    const memberships = await this.membershipService.findAllForUser(user.id);
    return memberships.map(FullMembershipDto.fromFullMembership);
  }
}
