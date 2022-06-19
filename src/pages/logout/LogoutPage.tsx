import { useRouter } from "next/router";
import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { homePagePath } from "../home/homePageMeta";
import { LogoutForm } from "./LogoutForm";

export interface LogoutPageProps {
  children: React.ReactNode;
}

export function LogoutPage(): JSX.Element {
  const router = useRouter();

  const onLoggedOut = () => {
    router.push(homePagePath());
  };

  return (
    <BasicLayout name="LogoutPage" title="Logout">
      <h1>Logout</h1>
      <LogoutForm onLoggedOut={onLoggedOut} />
    </BasicLayout>
  );
}
