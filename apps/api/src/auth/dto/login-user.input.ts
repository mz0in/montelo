import { ApiProperty } from "@nestjs/swagger";

export class LoginUserInput {
  @ApiProperty({
    description: "The user's email.",
    example: "john@doe.com",
  })
  email: string;

  @ApiProperty({
    description: "The user's unencrypted/unhashed password.",
    example: "pass123",
  })
  password: string;
}
