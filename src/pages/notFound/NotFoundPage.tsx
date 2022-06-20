import { BasicLayout } from "../../layouts/basic/BasicLayout";

export interface NotFoundPageProps {
  title?: string;
}

export function NotFoundPage({ title = "Not found" }: NotFoundPageProps): JSX.Element {
  return (
    <BasicLayout name="NotFoundPage" title={title}>
      <h1>Not found</h1>
    </BasicLayout>
  );
}
