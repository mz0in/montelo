import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";

import { withAuth } from "../../../../common/auth/withAuth";

export const loader: LoaderFunction = withAuth(async ({ api, params }) => {
  const envId = params.envId!;
  const apiKeyDtos = await api.apiKey().apiKeyControllerGetAllForEnv({
    envId,
  });
  return json<ApiKeyWithEnvDto[]>(apiKeyDtos);
});
