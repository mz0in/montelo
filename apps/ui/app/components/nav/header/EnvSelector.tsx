import { EnvironmentDto } from "@montelo/browser-client";
import { sortEnvironmentsByName } from "~/utils/sortEnvironmentsByName";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useLocation, useNavigate } from "@remix-run/react";

type EnvSelectorProps = {
  environments: EnvironmentDto[];
  pathEnv: EnvironmentDto;
}

export const EnvSelector = ({ environments, pathEnv }: EnvSelectorProps) => {
  const navigate = useNavigate();
  const sortedEnvironments = sortEnvironmentsByName(environments);
  const { pathname } = useLocation();
  const currentPath = pathname.split("/").at(-1);

  const handleSelectChange = (selectedValue: string) => {
    const selectedEnv = environments.find(env => env.id === selectedValue);
    if (selectedEnv) {
      const path = `/project/${selectedEnv.projectId}/env/${selectedEnv.id}/${currentPath}`;
      navigate(path);
    }
  };

  return (
    <Select value={pathEnv.id} onValueChange={handleSelectChange}>
      <SelectTrigger
        className={`w-36 ${pathEnv.name === "Production" ? "border-orange-600 border-2 shadow-md shadow-orange-500/50" : ""}`}>
        <SelectValue>{pathEnv.name}</SelectValue>
      </SelectTrigger>
      <SelectContent className="w-36">
        <SelectGroup>
          {sortedEnvironments.map((env) => (
            <SelectItem key={env.id} value={env.id}>
              {env.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
