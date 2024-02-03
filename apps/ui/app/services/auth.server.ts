import { AuthApi } from "@montelo/browser-client";
import { jwtDecode } from "jwt-decode";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import { AUTH_STRATEGIES } from "~/services/strategies";
import { JwtPayload } from "~/services/types";

export const authenticator = new Authenticator<JwtPayload>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("Invalid form: email and password must be strings.");
    }

    const { accessToken } = await new AuthApi().authControllerLogin({
      loginUserInput: {
        email,
        password,
      },
    });

    const decodedJwt = jwtDecode(accessToken);
    return {
      accessToken,
      ...decodedJwt,
    } as JwtPayload;
  }),
  AUTH_STRATEGIES.local,
);
