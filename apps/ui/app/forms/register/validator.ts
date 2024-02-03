import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 chars" }),
});

export const signUpValidator = withZod(signUpSchema);

export type SignUpValidatorType = z.infer<typeof signUpSchema>;
