import { useRouter } from "next/router";
import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { dashboardPagePath } from "../dashboard/dashboardPageMeta";
import { LoginForm } from "./LoginForm";

export interface LoginPageProps {
  children: React.ReactNode;
}

export function LoginPage(): JSX.Element {
  const router = useRouter();

  const onLoggedIn = () => {
    router.push(dashboardPagePath());
  };

  return (
    <BasicLayout name="LoginPage" title="Login">
      <h1>Login</h1>
      <LoginForm onLoggedIn={onLoggedIn} />
    </BasicLayout>
  );
}
