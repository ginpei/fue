import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { bookCreatePagePath } from "../bookCreate/bookCreatePageMeta";
import { bookViewPagePath } from "../bookView/bookViewPageMeta";

export interface DashboardPageProps {
}

export function DashboardPage(): JSX.Element {
  return (
    <BasicLayout name="DashboardPage" title="Dashboard">
      <h1>Dashboard</h1>
      <h2>Books</h2>
      <p>
        <a href={bookCreatePagePath()}>Create a new book...</a>
      </p>
      <ul>
        <li><a href={bookViewPagePath("123")}>#123</a></li>
      </ul>
    </BasicLayout>
  );
}
