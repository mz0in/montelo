import { Prisma } from "@montelo/db";

const createUserInput = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    email: true,
    firstName: true,
    lastName: true,
    password: true,
  },
});
export type CreateUserInput = Prisma.UserGetPayload<typeof createUserInput>;
