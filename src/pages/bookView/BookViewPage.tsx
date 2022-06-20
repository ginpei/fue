import { useRouter } from "next/router";
import { working } from "../../data/working";
import { useBook } from "../../domains/books/bookHooks";
import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { NotFoundPage } from "../notFound/NotFoundPage";

export interface BookViewPgeProps {
}

export function BookViewPge(): JSX.Element {
  const bookId = useRouterBookId();
  const book = useBook(bookId);

  if (bookId === working || book === working) {
    return <></>;
  }

  if (!book) {
    return <NotFoundPage />;
  }

  return (
    <BasicLayout name="BookViewPge" title={book.title}>
      <h1>{book.title}</h1>
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
