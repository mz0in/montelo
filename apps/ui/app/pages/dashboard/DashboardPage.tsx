import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ArrowUpRightFromSquare, DollarSign, Timer } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyticsControllerGetForDashboardDateSelectionEnum, LogDto } from "@montelo/browser-client";
import { Await, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { DashboardLoader } from "~/types/DashboardLoader.types";
import { Suspense } from "react";
import { AnalyticsCard } from "~/pages/dashboard/cards/AnalyticsCard";
import { BaseContent, BaseContentSkeleton } from "~/pages/dashboard/cards/BaseContent";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { analytics, logs, costHistory } = useLoaderData<DashboardLoader>();
  const selectedValue = searchParams.get("dateSelection") || AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins;

  const RecentLog = ({ log }: { log: LogDto }) => {
    return (
      <TableRow>
        <TableCell className={"cursor-pointer hover:text-blue-500 hover:scale-110 hover:shadow-md"}>
          <Link to={`/logs/${log.id}`}>
            <ArrowUpRightFromSquare size={16} />
          </Link>
        </TableCell>
        <TableCell>{dayjs(log.startTime).format("D MMM H:m:ss")}</TableCell>
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
      [AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins]: date.format("h:m:s a"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._1Hr]: date.format("h:m:s a"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._24Hrs]: date.format("h:m a"),
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
              {(analytics) => <BaseContent title={analytics?.cost} sub={analytics?.costChange} />}
            </Await>
          </Suspense>
        </AnalyticsCard>
        <AnalyticsCard title={"Latency"} icon={Timer}>
          <Suspense fallback={<BaseContentSkeleton />}>
            <Await resolve={analytics}>
              {(analytics) => <BaseContent title={`${analytics?.averageLatency}s avg`}
                                           sub={analytics?.averageLatencyChange} />}
            </Await>
          </Suspense>
        </AnalyticsCard>
        <AnalyticsCard title={"Latency"} icon={Timer}>
          <Suspense fallback={<BaseContentSkeleton />}>
            <Await resolve={analytics}>
              {(analytics) => <BaseContent title={analytics?.logCount} sub={analytics?.logCountChange} />}
            </Await>
          </Suspense>
        </AnalyticsCard>
        <AnalyticsCard title={"Latency"} icon={Timer}>
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
              {(costHistory) =>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costHistory.costHistory}>
                    <XAxis dataKey="intervalStart" type={"category"} tickFormatter={formatXDates}
                           stroke={"hsl(var(--border))"} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis stroke={"hsl(var(--border))"} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="totalCost" dot={false} legendType={"none"} strokeWidth={3} stroke={"hsl(var(--primary))"}/>
                  </LineChart>
                </ResponsiveContainer>
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};