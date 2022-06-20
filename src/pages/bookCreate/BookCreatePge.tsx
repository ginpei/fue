import { BasicLayout } from "../../layouts/basic/BasicLayout";

export interface BookCreatePgeProps {
}

export function BookCreatePge(): JSX.Element {
  return (
    <BasicLayout name="BookCreatePge" title="New book">
      <h1>New book</h1>
    </BasicLayout>
  );
}
