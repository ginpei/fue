import { useRouter } from "next/router";
import { useState } from "react";
import { Book } from "../../domains/books/Book";
import { deleteBook, saveBook } from "../../domains/books/bookDb";
import { BookForm } from "../../domains/books/BookForm";
import { useBook } from "../../domains/books/bookHooks";
import { useCurrentUser } from "../../domains/currentUsers/currentUserHooks";
import { toError } from "../../domains/errors/errors";
import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { working } from "../../misc/working";
import { DangerButton } from "../../ui/forms/NiceButton";
import { ErrorMessage } from "../../ui/util/ErrorMessage";
import { bookViewPagePath } from "../bookView/bookViewPageMeta";
import { dashboardPagePath } from "../dashboard/dashboardPageMeta";
import { LoadingPage } from "../loading/LoadingPage";
import { NotFoundPage } from "../notFound/NotFoundPage";

interface BookEditPageContentProps {
  initialBook: Book;
}

export function BookEditPage(): JSX.Element {
  const bookId = useRouterBookId();
  const book = useBook(bookId);

  if (bookId === working || book === working) {
    return <LoadingPage />;
  }

  if (!book) {
    return <NotFoundPage />;
  }

  return (
    <BookEditPageContent initialBook={book} />
  );
}

function BookEditPageContent({ initialBook }: BookEditPageContentProps): JSX.Element {
  const router = useRouter();
  const user = useCurrentUser();
  const [book, setBook] = useState(initialBook);
  const [saving, setSaving] = useState(false);
  const [savingError, setSavingError] = useState<Error | null>(null);

  const onChange = setBook;

  const onSubmit = async () => {
    if (user === working || user === null) {
      throw new Error("user required");
    }

    try {
      setSavingError(null);
      setSaving(true);
      await saveBook({ ...book, userId: user.uid });
      router.push(bookViewPagePath(book.id))
    } catch (error) {
      setSavingError(toError(error));
      setSaving(false);
    }
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("Delete?");
    if (!ok) {
      return;
    }

    try {
      setSavingError(null);
      setSaving(true);
      await deleteBook(book.id);
      router.push(dashboardPagePath())
    } catch (error) {
      setSavingError(toError(error));
      setSaving(false);
    }
  };

  return (
    <BasicLayout name="BookEditPageContent" title={book.title}>
      <h1>Edit {book.title}</h1>
      {savingError && <ErrorMessage error={savingError} />}
      <BookForm
        book={book}
        disabled={saving}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <h2>Danger zone</h2>
      <DangerButton disabled={saving} onClick={onDeleteClick}>
        Delete
      </DangerButton>
    </BasicLayout>
  );
};

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
