import { Prisma } from "@montelo/db";

const teamWithProjects = Prisma.validator<Prisma.TeamDefaultArgs>()({
  include: {
    projects: {
      include: {
        environments: true,
      },
    },
  },
});
export type TeamWithProjects = Prisma.TeamGetPayload<typeof teamWithProjects>;
