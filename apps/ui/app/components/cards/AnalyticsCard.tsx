import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { LucideIcon } from "lucide-react";

type AnalyticsCardProps = {
  title: string;
  icon: LucideIcon;
  content: () => JSX.Element;
}

export const AnalyticsCard = ({ title, icon: Icon, content: Content }: AnalyticsCardProps) => {
  return (
    <Card className="flex flex-col p-8 flex-grow flex-1">
      <CardHeader className={"p-0"}>
        <CardTitle>
          <div className={"flex justify-between font-medium"}>
            {title}
            <Icon size={20} className={"text-gray-400"} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={"p-0 mt-2 flex-grow"}>
        <Content />
      </CardContent>
    </Card>
  );
};