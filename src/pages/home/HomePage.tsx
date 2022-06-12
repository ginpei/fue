import { BasicLayout } from "../../layouts/BasicLayout";

export interface HomePageProps {
  children: React.ReactNode;
}

export function HomePage(): JSX.Element {
  return (
    <BasicLayout name="HomePage" title="Home">
      <h1>HomePage</h1>
    </BasicLayout>
  );
}
