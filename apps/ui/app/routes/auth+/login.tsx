import { ActionFunctionArgs } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { authenticator } from "~/services/auth.server";
import { Routes } from "~/routes";
import { AuthLink, FormContainer, PageLayout } from "~/routes/auth+/_auth.styles";
import { LoginForm, loginValidator } from "~/routes/auth+/_forms/_login.form";
import { authenticatedLoader } from "~/routes/auth+/_loaders/authenticated.loader";
import { AUTH_STRATEGIES } from "~/services/strategies";
import { AuthorizationError } from "remix-auth";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const validation = await loginValidator.validate(formData);
  if (validation.error) return validationError(validation.error);

  try {
    return await authenticator.authenticate(AUTH_STRATEGIES.local, request, {
      context: { formData },
      successRedirect: Routes.app.root,
      failureRedirect: undefined,
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      return { error: "Invalid credentials" };
    }
    return { error: "Something went wrong" };
  }
}

export const loader = authenticatedLoader;

export default function AuthLoginPage() {
  return (
    <PageLayout title="Login">
      <FormContainer>
        <LoginForm />
      </FormContainer>
      <AuthLink to={Routes.auth.register}>Don't have an account?</AuthLink>
    </PageLayout>
  );
}