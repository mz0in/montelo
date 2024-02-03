import { Prisma } from "@montelo/db";

export type GetEnvByIdParams = {
  projectId: string;
  envId: string;
};

export type CreateEnvironmentParams = {
  name: string;
  projectId: string;
};

const fullEnvironment = Prisma.validator<Prisma.EnvironmentDefaultArgs>()({
  include: {
    // apiKeys: true,
    project: {
      include: {
        team: true,
      },
    },
  },
});
export type FullEnvironment = Prisma.EnvironmentGetPayload<typeof fullEnvironment>;
