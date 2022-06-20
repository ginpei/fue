import { useEffect, useState } from "react";
import { working } from "../../data/working";
import { Book } from "./Book";
import { loadBook, loadUserBooks } from "./bookDb";

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

export function useUserBooks(userId: string | undefined | working): Book[] | working {
  const [books, setBooks] = useState<Book[] | working>(working);

  useEffect(() => {
    if (userId === working) {
      setBooks(working);
      return;
    }

    if (userId === undefined) {
      setBooks([]);
      return;
    }

    loadUserBooks(userId).then((newBook) => {
      setBooks(newBook);
    });
  }, [userId]);

  return books;
}