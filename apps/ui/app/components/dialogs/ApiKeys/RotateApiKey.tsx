import { RefreshCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

type RotateApiKeyProps = {
  handleRotate: () => void;
}
export const RotateApiKey = ({ handleRotate }: RotateApiKeyProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <RefreshCcw size={20} className="cursor-pointer hover:text-blue-500 hover:scale-110 hover:shadow-md"
                      onClick={handleRotate} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Rotate</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
