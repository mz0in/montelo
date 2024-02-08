import { DashboardPage } from "~/pages/dashboard/DashboardPage";
import { withAuth } from "~/common/auth/withAuth";
import { AnalyticsControllerGetForDashboardDateSelectionEnum } from "@montelo/browser-client";
import { defer } from "@remix-run/node";
import { DeferredDashboardLoader } from "~/types/DashboardLoader.types";

export const loader = withAuth(async ({ request, api, params }) => {
  const envId = params.envId!;
  const { searchParams } = new URL(request.url);
  const dateSelectionQuery = (searchParams.get("dateSelection") || AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins) as AnalyticsControllerGetForDashboardDateSelectionEnum;

  const analyticsPromise = api.analytics().analyticsControllerGetForDashboard({
    envId,
    dateSelection: dateSelectionQuery,
  });

  const costHistoryPromise = api.analytics().analyticsControllerCostHistory({
    envId,
    dateSelection: dateSelectionQuery,
  });

  const logs = await api.log().logControllerGetAll({
    envId,
    take: "50",
  });

  return defer<DeferredDashboardLoader>({
    analytics: analyticsPromise,
    logs,
    costHistory: costHistoryPromise
  });
});

export default function DashboardRoute() {
  return <DashboardPage />;
}
