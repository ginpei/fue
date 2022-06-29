import { useMemo } from "react";
import styled from "styled-components";
import { Report } from "./Report";
import { timeNumberToString } from "../times/timeConverter";

export interface ReportItemProps {
  report: Report;
}

export function ReportItem({ report }: ReportItemProps): JSX.Element {
  const quotedUrl = useMemo(() => {
    return `${report.url}#:~:text=${encodeURIComponent(report.quote)}`;
  }, [report]);
  return (
    <Root className="ReportItem">
      <Meta>
        <time>{timeNumberToString(report.createdAt)}</time>
        <code>{report.ip}</code>
      </Meta>
      <div><a href={quotedUrl}>{report.url}</a></div>
      <QuoteBlock cite={report.url}>
        <pre>{report.quote}</pre>
      </QuoteBlock>
      <pre>{report.message}</pre>
    </Root>
  );
}

const Root = styled.div`
  border: thin solid var(--gray-300);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-1);
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuoteBlock = styled.blockquote`
  border-left: 2px solid var(--gray-400);
  display: grid;
  gap: var(--space--1);
  padding-block: var(--space--1);
  padding-left: var(--space--2);
`;
