import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import styled from "styled-components";
import { Book } from "../../domains/books/Book";
import { useBook } from "../../domains/books/bookHooks";
import { createReport } from "../../domains/reports/Report";
import { useBookReports } from "../../domains/reports/reportHooks";
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
import { ReportItem } from "./ReportItem";

export function BookViewPage(): JSX.Element {
  const bookId = useRouterBookId();
  const book = useBook(bookId);
  const [reports, reportsError] = useBookReports(book);

  if (bookId === working || book === working || reports === working) {
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
      <h2>Reports</h2>
      {reportsError && <ErrorMessage error={reportsError} />}
      {reports.map((report) => (
        <ReportItem key={report.id} report={report} />
      ))}
      <h2>Tag</h2>
      <CodeExample book={book} />
      <DevReportSection bookId={bookId} />
      <Script src="/fue-button.js"></Script>
      <fue-button
        book-id={bookId}
        style={{ position: "fixed", right: "8px", bottom: "8px" }}
      />
    </BasicLayout>
  );
}

function CodeExample({ book }: { book: Book }) {
  return (
    <CodePre>
      <code>
        &lt;script async src=&quot;https://fue.ginpei.dev/fue-button.js&quot;&gt;&lt;/script&gt;
        {"\n"}
        &lt;fue-button book-id=&quot;{book.id}&quot;&gt;&lt;/fue-button&gt;
      </code>
    </CodePre>
  );
}

const CodePre = styled.pre`
  background-color: var(--gray-200);
  border: thin solid var(--gray-500);
  padding: var(--space--2);
`;

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

function DevReportSection(props: { bookId: string }): JSX.Element {
  const initialReport = createReport({
    bookId: props.bookId,
    url: "https://example.com/path/to/content",
  });
  const [report, setReport] = useState(initialReport);

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const url = emulating
    ? "http://127.0.0.1:5001/ginpei-fue/us-central1/report"
    : "https://us-central1-ginpei-fue.cloudfunctions.net/report";
    const res = await fetch(url, {
      body: JSON.stringify(report),
      method: "POST",
    });
    const data = await res.json();
    console.log('# data', data);
    setReport(initialReport);
  };

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "message") {
      setReport({ ...report, message: value });
    } else if (name === "quote") {
      setReport({ ...report, quote: value });
    } else if (name === "url") {
      setReport({ ...report, url: value });
    } else {
      throw new Error(`Unknown name: ${name}`);
    }
  };

  return (
    <details>
      <summary>[DEV] Post Reports</summary>
      <form onSubmit={onSubmit}>
        <VStack>
          <TextField
            label="Message"
            name="message"
            onChange={onChange}
            value={report.message}
          />
          <InputField
            label="Book ID"
            name="bookId"
            readOnly
            value={report.bookId}
          />
          <InputField
            label="Quote"
            name="quote"
            onChange={onChange}
            value={report.quote}
          />
          <InputField
            label="URL"
            name="url"
            onChange={onChange}
            value={report.url}
          />
          <PrimaryButton>Post</PrimaryButton>
        </VStack>
      </form>
    </details>
  );
}
