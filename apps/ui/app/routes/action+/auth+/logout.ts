import { ActionFunctionArgs } from "@remix-run/node";

import { withAuth } from "../../../common/auth/withAuth";
import { Routes } from "../../../routes";
import { authenticator } from "../../../services/auth.server";

export const action = withAuth(async ({ request }: ActionFunctionArgs) => {
  await authenticator.logout(request, { redirectTo: Routes.auth.login });
});
