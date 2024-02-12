import { Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

type ViewApiKeyProps = {
  onClick: () => void;
}
export const RevealApiKey = ({ onClick }: ViewApiKeyProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Eye size={20} className="cursor-pointer hover:text-blue-500 hover:scale-110 hover:shadow-md"
               onClick={onClick} />
        </TooltipTrigger>
        <TooltipContent>
          <p>You can only reveal once.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};