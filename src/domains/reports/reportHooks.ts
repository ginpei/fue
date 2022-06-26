import { useEffect, useState } from "react";
import { working } from "../../misc/working";
import { Book } from "../books/Book";
import { Report } from "./Report";
import { loadBookReports } from "./reportDb";

export function useBookReports(book: Book | string | null | working): [Report[] | working, Error | null] {
  const [reports, setReports] = useState<Report[] | working>(working);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setError(null);

    if (book === null) {
      setReports([]);
      return;
    }

    setReports(working);
    if (book === working) {
      return;
    }

    const bookId = typeof book === "string" ? book : book.id;
    loadBookReports(bookId)
      .then((v) => setReports(v))
      .catch((newError) => {
        setReports([]);
        setError(newError);
      });
  }, [book]);

  return [reports, error];
}