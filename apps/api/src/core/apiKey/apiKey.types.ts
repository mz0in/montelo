import { Prisma } from "@montelo/db";

export type RevealKeyParams = {
  envId: string;
  projectId: string;
  apiKeyId: string;
};

export type RotateKeyParams = {
  envId: string;
  projectId: string;
  apiKeyId: string;
};

const apiKeyWithEnvironment = Prisma.validator<Prisma.ApiKeyDefaultArgs>()({
  include: {
    environment: true,
  },
});
export type ApiKeyWithEnvironment = Prisma.ApiKeyGetPayload<typeof apiKeyWithEnvironment>;

export type Prefix = "prod" | "dev" | string;
