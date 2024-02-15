import { LogDto } from "@montelo/browser-client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "../../../../../../common/auth/withAuth";
import { LogTable } from "../../../../../../components/tables/LogTable/LogTable";

type LoaderType = {
  logs: LogDto[];
}

export const loader: LoaderFunction = withAuth(async ({ api, user, params }) => {
  const envId = params.envId!;

  const logs = await api.log().logControllerGetAll({
    envId,
  });

  return json<LoaderType>({ logs });
});

export default function TracesPage() {
  const { logs } = useLoaderData<LoaderType>();
  return <LogTable logs={logs} />;
};
