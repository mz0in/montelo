const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};

const ROOTS_APP = "/";
const ROOTS_AUTH = "/auth";
const ROOTS_API = "/api";

export type EnvParams = {
  projectId: string;
  envId: string;
};

const buildEnvPath = (params: EnvParams) => (sublink: string) =>
  path(ROOTS_APP, `project/${params.projectId}/env/${params.envId}/${sublink}`);

const PATH_APP = {
  root: path(ROOTS_APP, "home"),
  project: {
    env: {
      dashboard: (params: EnvParams) => buildEnvPath(params)("dashboard"),
      logs: (params: EnvParams) => buildEnvPath(params)("logs"),
    },
  },
};

const PATH_AUTH = {
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
};

const PATH_API = {
  addProject: path(ROOTS_API, "/add-project"),
  createTeam: path(ROOTS_API, "/create-team"),
  deleteTeam: path(ROOTS_API, "/delete-team"),
  logout: path(ROOTS_API, "/logout"),
};

const PATH_EXTERNAL = {
  documentation: "https://docs.montelo.ai",
};

export const Routes = {
  auth: PATH_AUTH,
  app: PATH_APP,
  api: PATH_API,
  external: PATH_EXTERNAL,
};
