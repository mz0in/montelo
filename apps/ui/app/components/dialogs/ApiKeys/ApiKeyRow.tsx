import { TableCell, TableRow } from "~/components/ui/table";
import { RevealApiKey } from "~/components/dialogs/ApiKeys/RevealApiKey";
import { RotateApiKey } from "~/components/dialogs/ApiKeys/RotateApiKey";
import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { Routes } from "~/routes";
import { Revealed } from "~/components/dialogs/ApiKeys/Revealed";
import { useFetcherWithReset } from "~/hooks";

type InputFetcherParams = {
  projectId: string;
  envId: string;
  apiKeyId: string;
}

type ApiKeyRowProps = {
  apiKey: ApiKeyWithEnvDto;
}

export const ApiKeyRow = ({ apiKey }: ApiKeyRowProps) => {
  const revealFetcher = useFetcherWithReset<ApiKeyWithEnvDto>();
  const rotateFetcher = useFetcherWithReset<ApiKeyWithEnvDto>();

  const apiKeyToShow = rotateFetcher.data?.key ? undefined : revealFetcher.data?.key;

  const params: InputFetcherParams = {
    projectId: apiKey.environment.projectId,
    envId: apiKey.envId,
    apiKeyId: apiKey.id,
  };

  const handleReveal = () => {
    revealFetcher.submit(params, {
      method: "POST",
      action: Routes.actions.apiKeys.reveal(params),
    });
    rotateFetcher.reset();
  };

  const handleRotate = () => {
    rotateFetcher.submit(params, {
      method: "POST",
      action: Routes.actions.apiKeys.rotate(params),
    });
    revealFetcher.reset();
  };

  return (
    <TableRow key={apiKey.envId}>
      <TableCell className="font-medium">{apiKey.environment.name}</TableCell>
      <TableCell>
        {apiKeyToShow ? <Revealed apiKey={apiKeyToShow} /> : apiKey.key}
      </TableCell>
      <TableCell>
        <div className="grid grid-cols-2 gap-1">
          <div>
            {!apiKey.viewed && <RevealApiKey onClick={handleReveal} />}
          </div>
          <RotateApiKey handleRotate={handleRotate} />
        </div>
      </TableCell>
    </TableRow>
  );
};