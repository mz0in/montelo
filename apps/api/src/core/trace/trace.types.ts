import { Prisma } from "@montelo/db";

const traceWithLogs = Prisma.validator<Prisma.TraceDefaultArgs>()({
  include: {
    logs: true,
  },
});
export type TraceWithLogs = Prisma.TraceGetPayload<typeof traceWithLogs>;
