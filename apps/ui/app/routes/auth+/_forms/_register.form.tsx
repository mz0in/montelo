import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm } from "remix-validated-form";
import { FormInput, FormSubmitButton } from "~/forms/register/form";
import { z } from "zod";
import { useActionData } from "@remix-run/react";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Required" }),
  lastName: z
    .string()
    .min(1, { message: "Required" }),
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "At least 8 characters required" })
    .refine((val) => /\d/.test(val), { message: "At least one number required" })
    .refine((val) => /[A-Z]/.test(val), { message: "At least one uppercase letter required" })
    .refine((val) => /[a-z]/.test(val), { message: "At least one lowercase letter required" }),
});

export const registerValidator = withZod(registerSchema);

export const RegisterForm = () => {
  const actionData = useActionData<{ error?: string }>();

  return (
    <ValidatedForm validator={registerValidator} method="post" className="w-full">
      <FormInput name="firstName" label="First Name" placeholder="First Name" />
      <FormInput name="lastName" label="Last Name" placeholder="Last Name" />
      <FormInput name="email" label="Email" placeholder="Email"
                 type="email" />
      <FormInput name="password" label="Password" placeholder="Password"
                 type="password" />
      <FormSubmitButton content="Register" />
      {actionData?.error && <p className="text-red-500 mt-1">{actionData.error}</p>}
    </ValidatedForm>
  );
};