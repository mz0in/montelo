import { LoaderFunction, redirect } from "@remix-run/node";
import { Routes } from "~/routes";
import { withAuth } from "~/common/auth/withAuth";

export const loader: LoaderFunction = withAuth(async () => {
  return redirect(Routes.app.root);
});

export default function RootRoute() {
  return null;
}
