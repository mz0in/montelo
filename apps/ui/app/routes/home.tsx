import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { withAuth } from "~/common/auth/withAuth";
import { HomePageLoaderData } from "~/pages/home/HomePage.types";
import { HomePage } from "~/pages/home/HomePage";

export const meta: MetaFunction = () => {
  return [
    { title: "Montelo" },
    { name: "description", content: "Montelo" },
  ];
};

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
