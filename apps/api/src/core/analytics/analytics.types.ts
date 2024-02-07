import { DateSelection } from "./analytics.enum";

export type GetDashboardAnalyticsParams = {
  envId: string;
  dateSelection: DateSelection;
};

export type DashboardAnalytics = {
  cost: string;
  costChange: string;
  averageLatency: string;
  averageLatencyChange: string;
  logCount: string;
  logCountChange: string;
};
