import { AuthUserDto } from "../dto/auth-user.dto";

export type ValidateParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginParams = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

// Note: this also exists on the frontend, so change that too if you every change this.
export type JwtPayload = {
  sub: string;
  user: AuthUserDto;
};
