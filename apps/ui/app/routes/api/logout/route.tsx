import { ActionFunctionArgs } from "@remix-run/node";
import { Routes } from "~/routes";
import { authenticator } from "~/services/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: Routes.auth.login });
}
