import { DashboardPage } from "~/pages/dashboard/DashboardPage";
import { withAuth } from "~/common/auth/withAuth";
import { json } from "@remix-run/react";
import { AnalyticsControllerGetForDashboardDateSelectionEnum, DashboardAnalyticsDto } from "@montelo/browser-client";

export const loader = withAuth(async ({ request, api, params }) => {
  const envId = params.envId!;
  let { searchParams } = new URL(request.url);
  let dateSelectionQuery = (searchParams.get("dateSelection") || "30 mins") as AnalyticsControllerGetForDashboardDateSelectionEnum;

  const analytics = await api.analytics().analyticsControllerGetForDashboard({
    envId,
    dateSelection: dateSelectionQuery,
  });

  console.log(analytics)

  return json<DashboardAnalyticsDto>(analytics);
});

export default function DashboardRoute() {
  return <DashboardPage />;
}
