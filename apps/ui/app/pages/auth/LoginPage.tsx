import { AuthLink, FormContainer, PageLayout } from "./Auth.styles";
import { LoginForm } from "./forms/LoginForm";
import { Routes } from "../../routes";


export const LoginPage = () => {
  return (
    <PageLayout>
      <FormContainer title="Login">
        <LoginForm />
      </FormContainer>
      <AuthLink to={Routes.auth.register}>Don't have an account?</AuthLink>
    </PageLayout>
  );
};