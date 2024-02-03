import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthUserDto } from "../dto/auth-user.dto";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  async validate(email: string, password: string): Promise<AuthUserDto> {
    console.log("[validate] : ", email, password);
    const user = await this.authService.validateUser({ email, password });
    return AuthUserDto.fromUser(user);
  }
}
