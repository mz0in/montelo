import { AuthUserDto, Configuration } from "@montelo/browser-client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Api } from "~/api/api";
import { env } from "~/config/environment.server";
import { Routes } from "~/routes";
import { authenticator } from "~/services/auth.server";

export type AuthenticatedFunctionParams = Parameters<LoaderFunction | ActionFunction>[0] & {
  api: Api;
  user: AuthUserDto;
};

export type AuthenticatedFunction = (
  params: AuthenticatedFunctionParams,
) => ReturnType<LoaderFunction | ActionFunction>;

export const withAuth = (func: AuthenticatedFunction): LoaderFunction | ActionFunction => {
  return async (args) => {
    const decodedJwt = await authenticator.isAuthenticated(args.request, {
      failureRedirect: Routes.auth.login,
    });

    const configuration = new Configuration({
      basePath: env.SERVER_BASE_URL,
      accessToken: decodedJwt.accessToken,
    });
    const api = new Api(configuration);

    return func({ ...args, api, user: decodedJwt.user });
  };
};
