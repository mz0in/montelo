import { AuthLink, FormContainer, PageLayout } from "~/pages/auth/Auth.styles";
import { LoginForm } from "~/pages/auth/forms/LoginForm";
import { Routes } from "~/routes";

export const LoginPage = () => {
  return (
    <PageLayout title="Login">
      <FormContainer>
        <LoginForm />
      </FormContainer>
      <AuthLink to={Routes.auth.register}>Don't have an account?</AuthLink>
    </PageLayout>
  );
};