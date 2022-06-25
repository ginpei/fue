import { useEffect, useState } from "react";
import { working } from "../../misc/working";
import { Book } from "../books/Book";
import { Issue } from "./Issue";
import { loadBookIssues } from "./issueDb";

export function useBookIssues(book: Book | string | null | working): [Issue[] | working, Error | null] {
  const [issues, setIssues] = useState<Issue[] | working>(working);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setError(null);

    if (book === null) {
      setIssues([]);
      return;
    }

    setIssues(working);
    if (book === working) {
      return;
    }

    const bookId = typeof book === "string" ? book : book.id;
    loadBookIssues(bookId)
      .then((v) => setIssues(v))
      .catch((newError) => {
        setIssues([]);
        setError(newError);
      });
  }, [book]);

  return [issues, error];
}