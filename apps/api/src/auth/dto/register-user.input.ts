import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserInput {
  @ApiProperty({
    description: "The user's email.",
    example: "john@doe.com",
  })
  email: string;

  @ApiProperty({
    description: "The user's first name.",
    example: "John",
  })
  firstName: string;

  @ApiProperty({
    description: "The user's last name.",
    example: "Doe",
  })
  lastName: string;

  @ApiProperty({
    description: "The user's unencrypted/unhashed password.",
    example: "pass123",
  })
  password: string;
}
