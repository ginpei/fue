import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useBook } from "../../domains/books/bookHooks";
import { createMessage } from "../../domains/messages/Message";
import { useBookMessages } from "../../domains/messages/messageHooks";
import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { emulating } from "../../misc/firebase";
import { working } from "../../misc/working";
import { InputField } from "../../ui/forms/InputField";
import { PrimaryButton } from "../../ui/forms/NiceButton";
import { TextField } from "../../ui/forms/TextField";
import { ErrorMessage } from "../../ui/util/ErrorMessage";
import { LiningText } from "../../ui/util/LiningText";
import { VStack } from "../../ui/util/VStack";
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
      {bookId && <DevPostMessageSection bookId={bookId} />}
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

function DevPostMessageSection(props: { bookId: string }): JSX.Element {
  const initialMessage = createMessage({
    bookId: props.bookId,
    url: "https://example.com/path/to/content",
  });
  const [message, setMessage] = useState(initialMessage);

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const url = emulating
    ? "http://127.0.0.1:5001/ginpei-fue/us-central1/postMessage"
    : "https://us-central1-ginpei-fue.cloudfunctions.net/postMessage";
    const res = await fetch(url, {
      body: JSON.stringify(message),
      method: "POST",
    });
    const data = await res.json();
    console.log('# data', data);
    setMessage(initialMessage);
  };

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "body") {
      setMessage({ ...message, body: value });
    } else {
      throw new Error(`Unknown name: ${name}`);
    }
  };

  return (
    <VStack>
      <h2>[DEV] Post messages</h2>
      <form onSubmit={onSubmit}>
        <VStack>
          <TextField
            label="Body"
            name="body"
            onChange={onChange}
            value={message.body}
          />
          <InputField
            label="Book ID"
            name="bookId"
            readOnly
            value={message.bookId}
          />
          <InputField
            label="Quote"
            name="quote"
            onChange={onChange}
            value={message.quote}
          />
          <InputField
            label="Quote path"
            name="quotePath"
            onChange={onChange}
            value={message.quotePath}
          />
          <InputField
            label="URL"
            name="url"
            onChange={onChange}
            value={message.url}
          />
          <PrimaryButton>Post</PrimaryButton>
        </VStack>
      </form>
    </VStack>
  );
}
