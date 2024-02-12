import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";

import { withAuth } from "../../../../../../common/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, params }) => {
  const envId = params.envId!;
  const apiKeyId = params.apiKeyId!;
  const apiKey = await api.apiKey().apiKeyControllerRotate({
    envId,
    apiKeyId,
  });
  return json<ApiKeyWithEnvDto>(apiKey);
});
