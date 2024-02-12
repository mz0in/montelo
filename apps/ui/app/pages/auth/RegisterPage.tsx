import { AuthLink, FormContainer, PageLayout } from "./Auth.styles";
import { RegisterForm } from "./forms/RegisterForm";
import { Routes } from "../../routes";

export const RegisterPage = () => {
  return (
    <PageLayout>
      <FormContainer title="Register">
        <RegisterForm />
      </FormContainer>
      <AuthLink to={Routes.auth.login}>Already have an account?</AuthLink>
    </PageLayout>
  );
};