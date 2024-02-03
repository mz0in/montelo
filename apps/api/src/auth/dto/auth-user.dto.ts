import { User } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import _ from "lodash";

export class AuthUserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  static fromUser(user: User): AuthUserDto {
    return _.pick(user, ["id", "firstName", "lastName", "email"]);
  }
}
