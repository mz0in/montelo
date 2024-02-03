import { LogTable } from "~/components/tables/LogTable/LogTable";
import { LogDto } from "@montelo/browser-client";
import { withAuth } from "~/routes/_common/withAuth";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type LoaderType = {
  logs: LogDto[];
}

export const loader: LoaderFunction = withAuth(async ({ api, user, params }) => {
  const envId = params.envId!;
  const projectId = params.projectId!;

  const logs = await api.log().logControllerGetAll({
    envId,
    projectId,
  });
  return json<LoaderType>({ logs });
});

export default function LogsPage() {
  const { logs } = useLoaderData<LoaderType>();
  return <LogTable logs={logs}/>;
};
