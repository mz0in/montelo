import { LoaderFunction, redirect } from "@remix-run/node";

import { withAuth } from "../common/auth/withAuth";
import { Routes } from "../routes";

export const loader: LoaderFunction = withAuth(async () => {
  return redirect(Routes.app.root);
});

export default function RootRoute() {
  return null;
}
