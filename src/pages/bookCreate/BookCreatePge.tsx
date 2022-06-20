import { useRouter } from "next/router";
import { useState } from "react";
import { BookCallback, createBook } from "../../domains/books/Book";
import { saveBook } from "../../domains/books/BookDb";
import { BookForm } from "../../domains/books/BookForm";
import { toError } from '../../functions/errors';
import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { ErrorMessage } from "../../ui/util/ErrorMessage";
import { bookViewPagePath } from "../bookView/bookViewPageMeta";

export interface BookCreatePgeProps {
}

const emptyBook = createBook();

export function BookCreatePge(): JSX.Element {
  const router = useRouter();
  const [book, setBook] = useState(emptyBook);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const onBookSubmit: BookCallback = async () => {
    try {
      setSaving(true);
      const bookId = await saveBook(book);
      router.push(bookViewPagePath(bookId));
    } catch (error) {
      setSaveError(toError(error));
      setSaving(false);
    }
  };

  return (
    <BasicLayout name="BookCreatePge" title="New book">
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
