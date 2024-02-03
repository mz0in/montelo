import { LoaderFunction } from "@remix-run/node";
import { Routes } from "~/routes";
import { authenticator } from "~/services/auth.server";

export const authenticatedLoader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: Routes.app.root,
  });
};
