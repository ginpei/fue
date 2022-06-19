import { BasicLayout } from "../../layouts/basic/BasicLayout";

export interface DashboardPageProps {
}

export function DashboardPage(): JSX.Element {
  return (
    <BasicLayout name="DashboardPage" title="Dashboard">
      <h1>Dashboard</h1>
    </BasicLayout>
  );
}
