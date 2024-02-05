import { User } from "@montelo/db";
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

import { UserService } from "../../core/user/user.service";
import { JwtPayload, LoginParams, RegisterParams, ValidateParams } from "./auth.service.types";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: ValidateParams): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async register(params: RegisterParams): Promise<User> {
    const user = await this.userService.findByEmail(params.email);
    if (user) {
      throw new HttpException("Email already exists.", HttpStatus.CONFLICT);
    }

    return this.userService.create(params);
  }

  async login(params: LoginParams): Promise<{ access_token: string }> {
    const { id } = params;
    const jwtPayload: JwtPayload = {
      sub: id,
      user: params,
    };
    const accessToken = this.jwtService.sign(jwtPayload);
    return {
      access_token: accessToken,
    };
  }
}
