import { DateSelection } from "./analytics.enum";

export type GetCostHistoryParams = {
  envId: string;
  dateSelection: DateSelection;
};

export type CostHistory = {
  intervalStart: string;
  totalCost: number;
};

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
