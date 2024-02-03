import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamInput {
  @ApiProperty()
  name: string;
}
