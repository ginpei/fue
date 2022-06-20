import { useRouter } from "next/router";
import { working } from "../../data/working";
import { BasicLayout } from "../../layouts/basic/BasicLayout";

export interface BookViewPgeProps {
}

export function BookViewPge(): JSX.Element {
  const bookId = useRouterBookId();

  if (bookId === working) {
    return <></>;
  }

  return (
    <BasicLayout name="BookViewPge" title="Books">
      BookViewPge #{bookId}
    </BasicLayout>
  );
}

function useRouterBookId(): string | working {
  const router = useRouter();
  const { bookId } = router.query;
  if (bookId === undefined) {
    return working;
  }

  if (typeof bookId !== "string") {
    throw new Error(`bookId expected string but: ${typeof bookId}`);
  }

  return bookId;
}
