import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  APP_PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>;
