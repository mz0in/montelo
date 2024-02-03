import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AuthUserDto } from "../dto/auth-user.dto";
import { LoginUserInput } from "../dto/login-user.input";
import { LoginDto } from "../dto/login.dto";
import { RegisterUserInput } from "../dto/register-user.input";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../services/auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    description: "The access token.",
    type: LoginDto,
  })
  @ApiBody({
    type: LoginUserInput,
  })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: Request): Promise<LoginDto> {
    // @ts-ignore
    const user = req.user;
    return this.authService.login(user);
  }

  @ApiOkResponse({
    description: "The AuthUser.",
    type: AuthUserDto,
  })
  @ApiBadRequestResponse({
    description: "Email already exists.",
  })
  @Post("register")
  async register(@Body() registerUserInput: RegisterUserInput): Promise<AuthUserDto> {
    const user = await this.authService.register(registerUserInput);
    return AuthUserDto.fromUser(user);
  }
}
