import { ActionFunctionArgs, json } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { AuthApi, Configuration } from "@montelo/browser-client";
import { registerValidator } from "../../pages/auth/forms/RegisterForm";
import { env } from "../../config/environment.server";
import { authenticator } from "../../services/auth.server";
import { AUTH_STRATEGIES } from "../../services/strategies";
import { Routes } from "../../routes";
import { authenticatedLoader } from "../../common/auth/authenticated.loader";
import { RegisterPage } from "../../pages/auth/RegisterPage";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const validation = await registerValidator.validate(formData);
  if (validation.error) return validationError(validation.error);
  const data = validation.data;

  const configuration = new Configuration({ basePath: env.SERVER_BASE_URL });
  const authApi = new AuthApi(configuration);

  try {
    await authApi.authControllerRegister({ registerUserInput: data });
  } catch (e: any) {
    const statusCode = e?.response?.status as number | undefined;
    if (statusCode === 409) {
      return json({ error: "Email already exists." });
    }
    return json({ error: "Something went wrong." });
  }

  return await authenticator.authenticate(AUTH_STRATEGIES.local, request, {
    successRedirect: Routes.app.root,
    context: { formData },
    failureRedirect: undefined,
    throwOnError: undefined,
  });
}

export const loader = authenticatedLoader;

export default function RegisterRoute() {
  return <RegisterPage />;
}