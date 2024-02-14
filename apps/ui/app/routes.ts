const path = (root: string, sublink: string) => `${root}${sublink}`;

const ROOT_APP = "/";
const ROOT_AUTH = "/auth";
const ROOT_ACTION = "/action";

const buildEnvPath = (params: EnvParams) => (sublink: string) =>
  path(ROOT_APP, `project/${params.projectId}/env/${params.envId}/${sublink}`);

// app pages
const PATH_APP = {
  root: path(ROOT_APP, "home"),
  project: {
    env: {
      dashboard: (params: EnvParams) => buildEnvPath(params)("dashboard"),
      logs: (params: EnvParams) => buildEnvPath(params)("logs"),
      logId: (params: EnvParams & { logId: string }) =>
        buildEnvPath(params)(`logs/${params.logId}`),
    },
  },
};

// auth pages
const PATH_AUTH = {
  login: path(ROOT_AUTH, "/login"),
  register: path(ROOT_AUTH, "/register"),
};

// remix loaders/actions
const PATH_ACTIONS = {
  setTheme: path(ROOT_ACTION, "/set-theme"),
  auth: {
    logout: path(ROOT_ACTION, "/auth/logout"),
  },
  team: {
    create: path(ROOT_ACTION, "/team/create"),
    delete: path(ROOT_ACTION, "/team/delete"),
  },
  project: {
    create: path(ROOT_ACTION, "/project/create"),
    getAllApiKeys: (projectId: string) => path(ROOT_ACTION, `/project/${projectId}/api-keys`),
  },
  apiKeys: {
    reveal: ({ envId, apiKeyId }: ApiKeyParams) =>
      path(ROOT_ACTION, `/env/${envId}/api-keys/${apiKeyId}/reveal`),
    rotate: ({ envId, apiKeyId }: ApiKeyParams) =>
      path(ROOT_ACTION, `/env/${envId}/api-keys/${apiKeyId}/rotate`),
  },
};

// external pages
const PATH_EXTERNAL = {
  documentation: "https://docs.montelo.ai",
  // TODO: change to Discord link
  support: "mailto:founders@montelo.ai",
};

// routes object to use in files
export const Routes = {
  actions: PATH_ACTIONS,
  app: PATH_APP,
  auth: PATH_AUTH,
  external: PATH_EXTERNAL,
};

/* Types */

export type EnvParams = {
  projectId: string;
  envId: string;
};

type ApiKeyParams = {
  envId: string;
  apiKeyId: string;
};
