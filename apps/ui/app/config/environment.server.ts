import * as z from "zod";

const serverEnvSchema = z.object({
  SERVER_BASE_URL: z.string().url(),
});

const getEnvironment = () => serverEnvSchema.parse(process.env);

export const env = getEnvironment();
