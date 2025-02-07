import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectInput {
  @ApiProperty()
  name: string;

  @ApiProperty()
  teamId: string;

  @ApiProperty({
    type: [String],
  })
  envNames: string[];
}
