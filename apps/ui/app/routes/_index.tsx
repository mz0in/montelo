import { LoaderFunction, redirect } from "@remix-run/node";
import { Routes } from "~/routes";
import { withAuth } from "~/routes/_common/withAuth";

export const loader: LoaderFunction = withAuth(async () => {
  return redirect(Routes.app.root);
});

export default function HomePage() {
  return null;
}
