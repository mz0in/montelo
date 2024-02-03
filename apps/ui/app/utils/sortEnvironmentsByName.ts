import { EnvironmentDto } from "@montelo/browser-client";
import _ from "lodash";

export const sortEnvironmentsByName = (environments: EnvironmentDto[]) => {
  const priority = ["Development", "Production"];

  return _.sortBy(environments, [
    // This function determines the sort order
    (environment) => {
      const index = priority.indexOf(environment.name);
      return index === -1 ? priority.length : index;
    },
    "name",
  ]);
};
