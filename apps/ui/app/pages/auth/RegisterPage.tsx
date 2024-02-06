import { AuthLink, FormContainer, PageLayout } from "~/pages/auth/Auth.styles";
import { RegisterForm } from "~/pages/auth/forms/RegisterForm";
import { Routes } from "~/routes";

export const RegisterPage = () => {
  return (
    <PageLayout title="Register">
      <FormContainer>
        <RegisterForm />
      </FormContainer>
      <AuthLink to={Routes.auth.login}>Already have an account?</AuthLink>
    </PageLayout>
  );
};