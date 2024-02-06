import { ActionFunctionArgs } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { authenticator } from "~/services/auth.server";
import { Routes } from "~/routes";
import { loginValidator } from "~/pages/auth/forms/LoginForm";
import { authenticatedLoader } from "~/common/auth/authenticated.loader";
import { AUTH_STRATEGIES } from "~/services/strategies";
import { AuthorizationError } from "remix-auth";
import { LoginPage } from "~/pages/auth/LoginPage";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const validation = await loginValidator.validate(formData);
  if (validation.error) {
    return validationError(validation.error);
  }

  try {
    return await authenticator.authenticate(AUTH_STRATEGIES.local, request, {
      context: { formData },
      successRedirect: Routes.app.root,
      failureRedirect: undefined,
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    if (error instanceof AuthorizationError) {
      return { error: "Invalid credentials" };
    }
    return { error: "Something went wrong" };
  }
};

export const loader = authenticatedLoader;

export default function LoginRoute() {
  return <LoginPage />;
}