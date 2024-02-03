import { json, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { withAuth } from "~/routes/_common/withAuth";
import { Header } from "~/components/nav/header/header";
import { Sidebar } from "~/components/nav/sidebar/sidebar";
import { EnvLayoutLoader } from "~/types/envLayout.loader.types";

export const loader: LoaderFunction = withAuth(async ({ params, api, user }) => {
  const envId = params.envId!;
  const projectId = params.projectId!;

  const environmentPromise = api.environment().environmentControllerGet({
    envId,
    projectId,
  });

  const projectPromise = api.project().projectControllerGet({
    projectId,
  });

  const [environment, project] = await Promise.all([environmentPromise, projectPromise]);

  return json<EnvLayoutLoader>({ user, environment, project });
});


export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-4 px-8 ml-48">
          <Outlet />
        </main>
      </div>
    </div>
  );
}