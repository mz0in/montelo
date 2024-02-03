import { Prisma } from "@montelo/db";

const fullMembership = Prisma.validator<Prisma.MembershipDefaultArgs>()({
  include: {
    team: {
      include: {
        projects: {
          include: {
            environments: true,
          },
        },
      },
    },
  },
});
export type FullMembership = Prisma.MembershipGetPayload<typeof fullMembership>;
