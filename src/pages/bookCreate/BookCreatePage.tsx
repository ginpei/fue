import { useRouter } from "next/router";
import { useState } from "react";
import { BookCallback, createBook } from "../../domains/books/Book";
import { saveBook } from "../../domains/books/bookDb";
import { BookForm } from "../../domains/books/BookForm";
import { useCurrentUser } from "../../domains/currentUsers/currentUserHooks";
import { toError } from '../../domains/errors/errors';
import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { working } from "../../misc/working";
import { ErrorMessage } from "../../ui/util/ErrorMessage";
import { bookViewPagePath } from "../bookView/bookViewPageMeta";

export interface BookCreatePageProps {
}

const emptyBook = createBook();

export function BookCreatePage(): JSX.Element {
  const router = useRouter();
  const user = useCurrentUser();
  const [book, setBook] = useState(emptyBook);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const onBookSubmit: BookCallback = async () => {
    if (user === working || user === null) {
      throw new Error("user required");
    }

    try {
      setSaving(true);
      const bookId = await saveBook({ ...book, userId: user.uid });
      router.push(bookViewPagePath(bookId));
    } catch (error) {
      setSaveError(toError(error));
      setSaving(false);
    }
  };

  return (
    <BasicLayout name="BookCreatePage" title="New book">
      <h1>New book</h1>
      {saveError && <ErrorMessage error={saveError} />}
      <BookForm
        book={book}
        disabled={saving}
        onChange={setBook}
        onSubmit={onBookSubmit}
      />
    </BasicLayout>
  );
}
