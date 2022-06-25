import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useBook } from "../../domains/books/bookHooks";
import { createIssue } from "../../domains/issues/Issue";
import { useBookIssues } from "../../domains/issues/issueHooks";
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
import { IssueItem } from "./IssueItem";

export function BookViewPage(): JSX.Element {
  const bookId = useRouterBookId();
  const book = useBook(bookId);
  const [issues, issuesError] = useBookIssues(book);

  if (bookId === working || book === working || issues === working) {
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
      <h2>Issues</h2>
      {issuesError && <ErrorMessage error={issuesError} />}
      {issues.map((issue) => (
        <IssueItem key={issue.id} issue={issue} />
      ))}
      {bookId && <DevPostIssueSection bookId={bookId} />}
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

function DevPostIssueSection(props: { bookId: string }): JSX.Element {
  const initialIssue = createIssue({
    bookId: props.bookId,
    url: "https://example.com/path/to/content",
  });
  const [issue, setIssue] = useState(initialIssue);

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const url = emulating
    ? "http://127.0.0.1:5001/ginpei-fue/us-central1/postIssue"
    : "https://us-central1-ginpei-fue.cloudfunctions.net/postIssue";
    const res = await fetch(url, {
      body: JSON.stringify(issue),
      method: "POST",
    });
    const data = await res.json();
    console.log('# data', data);
    setIssue(initialIssue);
  };

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "body") {
      setIssue({ ...issue, body: value });
    } else if (name === "quote") {
      setIssue({ ...issue, quote: value });
    } else if (name === "quotePath") {
      setIssue({ ...issue, quotePath: value });
    } else if (name === "url") {
      setIssue({ ...issue, url: value });
    } else {
      throw new Error(`Unknown name: ${name}`);
    }
  };

  return (
    <VStack>
      <h2>[DEV] Post Issues</h2>
      <form onSubmit={onSubmit}>
        <VStack>
          <TextField
            label="Body"
            name="body"
            onChange={onChange}
            value={issue.body}
          />
          <InputField
            label="Book ID"
            name="bookId"
            readOnly
            value={issue.bookId}
          />
          <InputField
            label="Quote"
            name="quote"
            onChange={onChange}
            value={issue.quote}
          />
          <InputField
            label="Quote path"
            name="quotePath"
            onChange={onChange}
            value={issue.quotePath}
          />
          <InputField
            label="URL"
            name="url"
            onChange={onChange}
            value={issue.url}
          />
          <PrimaryButton>Post</PrimaryButton>
        </VStack>
      </form>
    </VStack>
  );
}
