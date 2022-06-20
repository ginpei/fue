import { useEffect, useState } from "react";
import { working } from "../../data/working";
import { Book } from "../books/Book";
import { Message } from "./Message";
import { loadBookMessages } from "./messageDb";

export function useBookMessages(book: Book | string | null | working): [Message[] | working, Error | null] {
  const [messages, setMessages] = useState<Message[] | working>(working);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setError(null);

    if (book === null) {
      setMessages([]);
      return;
    }

    setMessages(working);
    if (book === working) {
      return;
    }

    const bookId = typeof book === "string" ? book : book.id;
    loadBookMessages(bookId)
      .then((v) => setMessages(v))
      .catch((newError) => {
        setMessages([]);
        setError(newError);
      });
  }, [book]);

  return [messages, error];
}