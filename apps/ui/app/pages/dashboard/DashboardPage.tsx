import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { AnalyticsCard } from "~/components/cards/AnalyticsCard";
import { ScrollArea } from "~/components/ui/scroll-area";
import { AlertCircle, ArrowUpRightFromSquare, DollarSign, GanttChart, Timer } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  AnalyticsControllerGetForDashboardDateSelectionEnum,
  DashboardAnalyticsDto,
  LogDto,
} from "@montelo/browser-client";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";

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
  const analytics = useLoaderData<DashboardAnalyticsDto>();
  const selectedValue = searchParams.get("dateSelection") || AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins;

  const BaseContent = ({ main, sub }: { main: string; sub: string }) => (
    <div className={"flex flex-col"}>
      <h1 className={"text-2xl font-bold"}>
        {main}
      </h1>
      <p className={"text-md text-muted-foreground"}>
        {sub}
      </p>
    </div>
  );

  const CostContent = () => <BaseContent main={analytics.cost} sub={analytics.costChange} />;
  const LatencyContent = () => <BaseContent main={`${analytics.averageLatency}s avg.`}
                                            sub={analytics.averageLatencyChange} />;
  const LogsContent = () => <BaseContent main={analytics.logCount} sub={analytics.logCountChange} />;
  const AlertsContent = () => <BaseContent main={"1 hallucination"} sub={"See here"} />;

  const RecentLog = ({ log }: { log: LogDto }) => {

    return (
      <TableRow key={log.id}>
        <TableCell className={"cursor-pointer hover:text-blue-500 hover:scale-110 hover:shadow-md"}>
          <Link to={`/logs/${log.id}`} >
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
      <div className="flex flex-row justify-between space-x-4">
        <AnalyticsCard title={"Cost"} icon={DollarSign} content={CostContent} />
        <AnalyticsCard title={"Latency"} icon={Timer} content={LatencyContent} />
        <AnalyticsCard title={"Logs"} icon={GanttChart} content={LogsContent} />
        <AnalyticsCard title={"Alerts"} icon={AlertCircle} content={AlertsContent} />
      </div>
      <div className={"grid grid-cols-5 gap-8 mt-8"}>
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
                {analytics.logs.map((log) => <RecentLog log={log} />)}
              </TableBody>
            </Table>
          </ScrollArea>

        </div>
        <div className="h-[32rem] col-span-3">
          <h1 className={"text-2xl font-medium mb-4"}>Cost History</h1>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};