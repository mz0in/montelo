import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

type AnalyticsCardProps = {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}

export const AnalyticsCard = ({ title, icon: Icon, children }: AnalyticsCardProps) => {
  return (
    <Card className="flex flex-col flex-1 flex-grow p-8">
      <CardHeader className={"p-0"}>
        <CardTitle>
          <div className={"flex justify-between font-medium"}>
            {title}
            <Icon size={20} className={"text-gray-400"} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={"p-0 mt-2 flex-grow"}>
        {children}
      </CardContent>
    </Card>
  );
};