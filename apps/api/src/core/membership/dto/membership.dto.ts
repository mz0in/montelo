import { Membership, UserPermissionRole } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { pick } from "lodash";

export class MembershipDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ enum: UserPermissionRole })
  role: UserPermissionRole;

  @ApiProperty()
  teamId: string;

  static fromMembership(membership: Membership): MembershipDto {
    return pick(membership, ["id", "role", "teamId"]);
  }
}
