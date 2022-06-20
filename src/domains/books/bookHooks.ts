import { useEffect, useState } from "react";
import { working } from "../../data/working";
import { Book } from "./Book";
import { loadBook } from "./BookDb";

export function useBook(bookId: string | working): Book | null | working {
  const [book, setBook] = useState<Book | null | working>(working);

  useEffect(() => {
    if (bookId === working) {
      setBook(working);
      return;
    }

    loadBook(bookId).then((newBook) => {
      setBook(newBook);
    });
  }, [bookId]);

  return book;
}