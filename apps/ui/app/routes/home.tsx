import { json, LoaderFunction } from "@remix-run/node";
import { withAuth } from "../common/auth/withAuth";
import { HomePage } from "../pages/home/HomePage";
import { HomePageLoaderData } from "../pages/home/HomePage.types";

export const loader: LoaderFunction = withAuth(async ({ api, user }) => {
  const memberships = await api.membership().membershipControllerGetAll();
  const returnObj = {
    user,
    memberships,
  };
  return json<HomePageLoaderData>(returnObj);
});

export default function HomeRoute() {
  return <HomePage />;
}
