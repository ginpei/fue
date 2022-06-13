import dynamic from "next/dynamic";
import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { LoginForm } from "./LoginForm";

export interface LoginPageProps {
  children: React.ReactNode;
}

export function LoginPage(): JSX.Element {
  return (
    <BasicLayout name="LoginPage" title="Login">
      <h1>Login</h1>
      <LoginForm />
    </BasicLayout>
  );
}
