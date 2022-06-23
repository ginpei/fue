import Link from "next/link";
import { useRouter } from "next/router";
import { useBook } from "../../domains/books/bookHooks";
import { useBookMessages } from "../../domains/messages/messageHooks";
import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { working } from "../../misc/working";
import { ErrorMessage } from "../../ui/util/ErrorMessage";
import { LiningText } from "../../ui/util/LiningText";
import { bookEditPagePath } from "../bookEdit/bookEditPageMeta";
import { LoadingPage } from "../loading/LoadingPage";
import { NotFoundPage } from "../notFound/NotFoundPage";
import { MessageItem } from "./MessageItem";

export function BookViewPage(): JSX.Element {
  const bookId = useRouterBookId();
  const book = useBook(bookId);
  const [messages, messagesError] = useBookMessages(book);

  if (bookId === working || book === working || messages === working) {
    return <LoadingPage />;
  }

  if (!book) {
    return <NotFoundPage />;
  }

  return (
    <BasicLayout name="BookViewPage" title={book.title}>
      <h1>{book.title}</h1>
      <p>
        <Link href={bookEditPagePath(book.id)}>Edit</Link>
      </p>
      <LiningText>
        {book.description ? book.description : <small>(No description)</small>}
      </LiningText>
      <h2>Messages</h2>
      {messagesError && <ErrorMessage error={messagesError} />}
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
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
