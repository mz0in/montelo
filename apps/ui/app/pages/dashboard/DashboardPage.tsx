import { ArrowUpRightFromSquare, CircleSlash, DollarSign, GanttChart, Target, Timer } from "lucide-react";
import { Area, AreaChart, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyticsControllerGetForDashboardDateSelectionEnum, LogDto } from "@montelo/browser-client";
import { Await, Link, useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { Suspense } from "react";
import numbro from "numbro";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { DashboardLoader } from "../../types/DashboardLoader.types";
import { Routes } from "../../routes";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { AnalyticsCard } from "./cards/AnalyticsCard";
import { BaseContent, BaseContentSkeleton } from "./cards/BaseContent";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";


export const DashboardPage = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { analytics, logs, costHistory } = useLoaderData<DashboardLoader>();
  const selectedValue = searchParams.get("dateSelection") || AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins;

  const RecentLog = ({ log }: { log: LogDto }) => {
    return (
      <TableRow>
        <TableCell className={"cursor-pointer"}>
          <Link to={Routes.app.project.env.traceId({
            projectId: params.projectId!,
            envId: params.envId!,
            logId: log.id,
          })} prefetch={"intent"}>
            <ArrowUpRightFromSquare size={16} />
          </Link>
        </TableCell>
        <TableCell>{dayjs(log.startTime).format("H:mm:ss")}</TableCell>
        <TableCell>{log.model}</TableCell>
        <TableCell>{log.duration}s</TableCell>
        {/*TODO once we have totalCost, add that here*/}
        <TableCell>0</TableCell>
      </TableRow>
    );
  };

  const formatXDates = (tickItem: string): string => {
    const date = dayjs(tickItem);
    const formatMap: Record<AnalyticsControllerGetForDashboardDateSelectionEnum, string> = {
      [AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins]: date.format("H:mm"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._1Hr]: date.format("H:mm"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._24Hrs]: date.format("H:mm"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._7Days]: date.format("MMM D"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._1Month]: date.format("MMM D"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._3Months]: date.format("MMM D"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum.AllTime]: date.format("MMM YYYY"),
    };
    return formatMap[selectedValue as AnalyticsControllerGetForDashboardDateSelectionEnum];
  };

  return (
    <div className={"flex flex-col pt-0.5"}>
      <div className={"flex justify-end mb-4"}>
        <Select value={selectedValue}
                onValueChange={(value) => {
                  setSearchParams((prev) => {
                    prev.set("dateSelection", value);
                    return prev;
                  });
                }}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins}>30 mins</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._1Hr}>1 hr</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._24Hrs}>24 hrs</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._7Days}>7 days</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._1Month}>1 month</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._3Months}>3 months</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum.AllTime}>All time</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/*Analytics Section*/}
      <div className={"flex flex-row flex-grow gap-8"}>
        <AnalyticsCard title={"Cost"} icon={DollarSign}>
          <Suspense fallback={<BaseContentSkeleton />}>
            <Await resolve={analytics}>
              {(analytics) =>
                <BaseContent title={numbro(analytics.cost).formatCurrency({
                  mantissa: 2,
                  thousandSeparated: true,
                })} sub={analytics.costChange} />}
            </Await>
          </Suspense>
        </AnalyticsCard>
        <AnalyticsCard title={"Latency"} icon={Timer}>
          <Suspense fallback={<BaseContentSkeleton />}>
            <Await resolve={analytics}>
              {(analytics) => <BaseContent title={`${analytics.averageLatency}s avg`}
                                           sub={analytics.averageLatencyChange} />}
            </Await>
          </Suspense>
        </AnalyticsCard>
        <AnalyticsCard title={"Logs"} icon={GanttChart}>
          <Suspense fallback={<BaseContentSkeleton />}>
            <Await resolve={analytics}>
              {(analytics) => <BaseContent title={numbro(analytics.logCount).format({
                thousandSeparated: true,
              })} sub={analytics.logCountChange} />}
            </Await>
          </Suspense>
        </AnalyticsCard>
        <AnalyticsCard title={"Scores"} icon={Target}>
          <Suspense fallback={<BaseContentSkeleton />}>
            <Await resolve={analytics}>
              {(analytics) => <BaseContent title={"1 hallucination"} sub={"See here"} />}
            </Await>
          </Suspense>
        </AnalyticsCard>
      </div>

      <div className={"grid grid-cols-5 gap-8 mt-8"}>
        {/*Recent Logs Section*/}
        <div className="col-span-2">
          <h1 className={"text-2xl font-medium mb-4"}>Recent Logs</h1>
          <ScrollArea className="h-[32rem] rounded-lg border" type={"scroll"}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Latency</TableHead>
                  <TableHead>Total Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => <RecentLog key={log.id} log={log} />)}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/*Cost History Section*/}
        <div className="h-[32rem] col-span-3">
          <h1 className={"text-2xl font-medium mb-4"}>Cost History</h1>

          <Suspense fallback={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[]}></LineChart>
            </ResponsiveContainer>
          }>
            <Await resolve={costHistory}>
              {(costHistory) => {
                if (!costHistory.costHistory.length) {
                  return (<div className={"flex h-full justify-center items-center border rounded-lg"}>
                    <Alert className={"flex flex-row w-1/3 p-4 justify-start items-center gap-4"}>
                      <div>
                        <CircleSlash size={20} />
                      </div>
                      <div className={"flex flex-col"}>
                        <AlertTitle>No Data</AlertTitle>
                        <AlertDescription>Try another date filter.</AlertDescription>
                      </div>
                    </Alert>
                  </div>);
                }

                return (
                  <ResponsiveContainer>
                    <AreaChart data={costHistory.costHistory}>
                      <defs>
                        <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                          <stop offset="90%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="intervalStart"
                        type={"category"}
                        tickFormatter={formatXDates}
                        stroke={"hsl(var(--border))"}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        stroke={"hsl(var(--border))"}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          borderRadius: "8px",
                          borderColor: "hsl(var(--border))",
                        }}
                        formatter={(value) => [numbro(value).formatCurrency({
                          mantissa: 2,
                          thousandSeparated: true,
                        }), "Total Cost"]}
                        labelFormatter={(date) => dayjs(date).format("MMM D YYYY H:mm:ss")}
                        cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 2 }}
                      />
                      <Area
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="totalCost"
                        dot={false}
                        legendType={"none"}
                        strokeWidth={3}
                        stroke={"hsl(var(--primary))"}
                        fill={"url(#area-gradient)"}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};