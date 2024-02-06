import { useState } from "react";
import { useFetcher, useLocation, useNavigate } from "@remix-run/react";
import { ApiKeyWithEnvDto, EnvironmentDto } from "@montelo/browser-client";
import { sortEnvironmentsByName } from "~/utils/sortEnvironmentsByName";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Check, ChevronsUpDown, KeyRound } from "lucide-react";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { ApiKeysDialog } from "~/components/dialogs/ApiKeys/ApiKeysDialog";
import { Routes } from "~/routes";

type EnvSelectorProps = {
  environments: EnvironmentDto[];
  pathEnv: EnvironmentDto;
};

export const EnvSelector = ({ environments, pathEnv }: EnvSelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedEnvName, setSelectedEnvName] = useState<string>(pathEnv.name);
  const { pathname } = useLocation();
  const fetcher = useFetcher<ApiKeyWithEnvDto[]>();
  const navigate = useNavigate();

  const sortedEnvironments = sortEnvironmentsByName(environments);
  const currentPath = pathname.split("/").at(-1);

  const handleMenuItemClick = (env: EnvironmentDto) => {
    setSelectedEnvName(env.name);
    const path = `/project/${env.projectId}/env/${env.id}/${currentPath}`;
    navigate(path);
  };

  const prefetchApiKeys = () => {
    fetcher.load(Routes.actions.apiKeys.getAll(pathEnv.projectId));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={`w-44`}>
          <Button variant="outline"
                  className={`${pathEnv.name === "Production" ? "border-orange-600 border-2" : ""} justify-between`}>
            {selectedEnvName}
            <ChevronsUpDown size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuLabel>
            Environments
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {sortedEnvironments.map((env) => (
              <DropdownMenuItem key={env.id} onSelect={() => handleMenuItemClick(env)}>
                <div className={"flex flex-row gap-2"}>
                  {selectedEnvName === env.name && <Check size={20} />}
                  {env.name}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem onMouseEnter={prefetchApiKeys}>
              <div className={"flex flex-row gap-2"}>
                <KeyRound size={20} />
                <p>API Keys</p>
              </div>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <ApiKeysDialog apiKeys={fetcher.data} />
    </Dialog>
  );
};
