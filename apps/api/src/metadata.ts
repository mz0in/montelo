/* eslint-disable */
export default async () => {
  const t = {
    ["./core/environment/dto/environment.dto"]: await import(
      "./core/environment/dto/environment.dto"
    ),
    ["./core/project/dto/project-with-environments.dto"]: await import(
      "./core/project/dto/project-with-environments.dto"
    ),
    ["./core/team/dto/team-with-projects.dto"]: await import(
      "./core/team/dto/team-with-projects.dto"
    ),
    ["./core/team/dto/team.dto"]: await import("./core/team/dto/team.dto"),
    ["./auth/dto/login.dto"]: await import("./auth/dto/login.dto"),
    ["./auth/dto/auth-user.dto"]: await import("./auth/dto/auth-user.dto"),
    ["./core/log/dto/log.dto"]: await import("./core/log/dto/log.dto"),
    ["./core/membership/dto/full-membership.dto"]: await import(
      "./core/membership/dto/full-membership.dto"
    ),
    ["./core/project/dto/full-project.dto"]: await import("./core/project/dto/full-project.dto"),
    ["./core/project/dto/project.dto"]: await import("./core/project/dto/project.dto"),
    ["./common/dto/delete-success.dto"]: await import("./common/dto/delete-success.dto"),
  };
  return {
    "@nestjs/swagger": {
      models: [
        [
          import("./auth/dto/auth-user.dto"),
          {
            AuthUserDto: {
              id: { required: true, type: () => String },
              firstName: { required: true, type: () => String },
              lastName: { required: true, type: () => String },
              email: { required: true, type: () => String },
            },
          },
        ],
        [
          import("./auth/dto/login.dto"),
          { LoginDto: { access_token: { required: true, type: () => String } } },
        ],
        [
          import("./core/environment/dto/environment.dto"),
          {
            EnvironmentDto: {
              id: { required: true, type: () => String },
              name: { required: true, type: () => String },
              projectId: { required: true, type: () => String },
            },
          },
        ],
        [
          import("./core/log/dto/log.dto"),
          {
            LogDto: {
              id: { required: true, type: () => String },
              messages: { required: true, type: () => Object },
              model: { required: true, type: () => String },
              rawInput: { required: true, type: () => Object },
              rawOutput: { required: true, type: () => Object },
              startTime: { required: true, type: () => String },
              endTime: { required: true, type: () => String },
              duration: { required: true, type: () => Number },
              inputTokenCount: { required: true, type: () => Number },
              outputTokenCount: { required: true, type: () => Number },
              totalTokenCount: { required: true, type: () => Number },
            },
          },
        ],
        [
          import("./core/project/dto/project.dto"),
          {
            ProjectDto: {
              id: { required: true, type: () => String },
              name: { required: true, type: () => String },
              teamId: { required: true, type: () => String },
            },
          },
        ],
        [
          import("./core/project/dto/project-with-environments.dto"),
          {
            ProjectWithEnvironmentsDto: {
              environments: {
                required: true,
                type: () => [t["./core/environment/dto/environment.dto"].EnvironmentDto],
              },
            },
          },
        ],
        [
          import("./core/team/dto/team.dto"),
          {
            TeamDto: {
              id: { required: true, type: () => String },
              name: { required: true, type: () => String },
            },
          },
        ],
        [
          import("./core/team/dto/team-with-projects.dto"),
          {
            TeamWithProjectsDto: {
              projects: {
                required: true,
                type: () => [
                  t["./core/project/dto/project-with-environments.dto"].ProjectWithEnvironmentsDto,
                ],
              },
            },
          },
        ],
        [
          import("./core/membership/dto/membership.dto"),
          {
            MembershipDto: {
              id: { required: true, type: () => String },
              role: { required: true, type: () => Object },
              teamId: { required: true, type: () => String },
            },
          },
        ],
        [
          import("./core/membership/dto/full-membership.dto"),
          {
            FullMembershipDto: {
              team: {
                required: true,
                type: () => t["./core/team/dto/team-with-projects.dto"].TeamWithProjectsDto,
              },
            },
          },
        ],
        [
          import("./core/project/dto/full-project.dto"),
          {
            FullProjectDto: {
              team: { required: true, type: () => t["./core/team/dto/team.dto"].TeamDto },
              environments: {
                required: true,
                type: () => [t["./core/environment/dto/environment.dto"].EnvironmentDto],
              },
            },
          },
        ],
        [
          import("./common/dto/delete-success.dto"),
          { DeleteSuccessDto: { success: { required: true, type: () => Boolean } } },
        ],
        [
          import("./core/apiKey/dto/apiKey.dto"),
          {
            ApiKeyDto: {
              id: { required: true, type: () => String },
              type: { required: true, type: () => String },
              envId: { required: true, type: () => String },
            },
          },
        ],
      ],
      controllers: [
        [
          import("./auth/controllers/auth.controller"),
          {
            AuthController: {
              login: { type: t["./auth/dto/login.dto"].LoginDto },
              register: { type: t["./auth/dto/auth-user.dto"].AuthUserDto },
            },
          },
        ],
        [import("./core/chat/chat.controller"), { ChatController: { chat: {} } }],
        [
          import("./core/environment/environment.controller"),
          {
            EnvironmentController: {
              get: { type: t["./core/environment/dto/environment.dto"].EnvironmentDto },
            },
          },
        ],
        [
          import("./core/log/log.controller"),
          { LogController: { getAll: { type: [t["./core/log/dto/log.dto"].LogDto] } } },
        ],
        [
          import("./core/membership/membership.controller"),
          {
            MembershipController: {
              getAll: { type: [t["./core/membership/dto/full-membership.dto"].FullMembershipDto] },
            },
          },
        ],
        [
          import("./core/project/project.controller"),
          {
            ProjectController: {
              get: { type: t["./core/project/dto/full-project.dto"].FullProjectDto },
              create: { type: t["./core/project/dto/project.dto"].ProjectDto },
            },
          },
        ],
        [
          import("./core/team/team.controller"),
          {
            TeamController: {
              create: { type: t["./core/team/dto/team.dto"].TeamDto },
              delete: { type: t["./common/dto/delete-success.dto"].DeleteSuccessDto },
            },
          },
        ],
        [import("./health/health.controller"), { HealthController: { check: { type: Object } } }],
      ],
    },
  };
};
