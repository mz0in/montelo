import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { useActionData } from "@remix-run/react";
import { FormInput, FormSubmitButton } from "../../../forms/register/form";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "At least 8 characters required" }),
});

export const loginValidator = withZod(loginSchema);

export const LoginForm = () => {
  const actionData = useActionData<{ error?: string }>();

  return (
    <ValidatedForm validator={loginValidator} method="post" className="w-full">
      <FormInput name="email" label="Email" placeholder="Email"
                 type="email" />
      <FormInput name="password" label="Password" placeholder="Password"
                 type="password" />
      <FormSubmitButton content="Login" />
      {actionData?.error && <p className="text-red-500 mt-1">{actionData.error}</p>}
    </ValidatedForm>
  );
};