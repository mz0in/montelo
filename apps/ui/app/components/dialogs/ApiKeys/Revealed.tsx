import { Copy } from "lucide-react";
import { useCopyToClipboard } from "../../../hooks";

type RevealedProps = {
  apiKey: string;
}
export const Revealed = ({ apiKey }: RevealedProps) => {
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleClick = () => copyToClipboard(apiKey);

  return (
    <div className={"flex flex-row cursor-pointer hover:underline underline-offset-1 gap-1"} onClick={handleClick}>
      <Copy size={16} />
      <p>
        {apiKey}
      </p>
    </div>
  );
};