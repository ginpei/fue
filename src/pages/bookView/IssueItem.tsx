import { useMemo } from "react";
import styled from "styled-components";
import { Issue } from "../../domains/issues/Issue";
import { timeNumberToString } from "../../domains/times/timeConverter";

export interface IssueItemProps {
  issue: Issue;
}

export function IssueItem({ issue }: IssueItemProps): JSX.Element {
  const quotedUrl = useMemo(() => {
    return `${issue.url}#:~:text=${encodeURIComponent(issue.quote)}`;
  }, [issue]);
  return (
    <Root className="IssueItem">
      <Meta>
        <time>{timeNumberToString(issue.createdAt)}</time>
        <code>{issue.ip}</code>
      </Meta>
      <div><a href={quotedUrl}>{issue.url}</a></div>
      <div>{issue.quotePath}</div>
      <QuoteBlock cite={issue.url}>
        <pre>{issue.quote}</pre>
      </QuoteBlock>
      <pre>{issue.body}</pre>
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
