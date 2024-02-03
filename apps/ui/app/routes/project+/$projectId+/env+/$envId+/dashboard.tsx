import { useState } from "react";
import { AlertCircle, DollarSign, GanttChart, Timer } from "lucide-react";
import { AnalyticsCard } from "~/components/cards/AnalyticsCard";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

export default function DashboardPage() {
  // State to manage the selected value, defaulting to "30 mins"
  const [selectedValue, setSelectedValue] = useState("30 mins");

  const BaseContent = ({ main, sub }: { main: string; sub: string }) => (
    <div className={"flex flex-col"}>
      <h1 className={"text-2xl font-bold"}>{main}</h1>
      <p className={"text-md text-muted-foreground"}>{sub}</p>
    </div>
  );

  const CostContent = () => <BaseContent main={"$1,400"} sub={"+40%"} />;
  const LatencyContent = () => <BaseContent main={"2.5s avg."} sub={"-12%"} />;
  const LogsContent = () => <BaseContent main={"411 logs"} sub={"+12%"} />;
  const AlertsContent = () => <BaseContent main={"1 hallucination"} sub={"See here"} />;

  return (
    <div className={"flex flex-col"}>
      <div className={"flex justify-end mb-4"}>
        <Select value={selectedValue} onValueChange={setSelectedValue}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="30 mins">30 mins</SelectItem>
              <SelectItem value="1 hr">1 hr</SelectItem>
              <SelectItem value="24 hrs">24 hrs</SelectItem>
              <SelectItem value="7 days">7 days</SelectItem>
              <SelectItem value="1 month">1 month</SelectItem>
              <SelectItem value="3 months">3 months</SelectItem>
              <SelectItem value="All time">All time</SelectItem>
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
    </div>
  );
}
