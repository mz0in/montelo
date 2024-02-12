import { AlertTriangle } from "lucide-react";
import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Alert, AlertDescription } from "../../ui/alert";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../ui/table";
import { ApiKeyRow } from "./ApiKeyRow";

type ApiKeysDialogProps = {
  apiKeys: ApiKeyWithEnvDto[] | undefined;
}

export const ApiKeysDialog = ({ apiKeys }: ApiKeysDialogProps) => {
  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>API Keys</DialogTitle>
      </DialogHeader>
      <div>
        <Alert variant="destructive" className={"mb-4"}>
          <AlertDescription>
            <div className={"flex flex-row items-center gap-4"}>
              <AlertTriangle />
              API keys are only revealed once and will be hidden after.
            </div>
          </AlertDescription>
        </Alert>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Environment</TableHead>
              <TableHead>API Key</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys?.map((apiKey) => <ApiKeyRow key={apiKey.id} apiKey={apiKey} />)}
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  );
};
