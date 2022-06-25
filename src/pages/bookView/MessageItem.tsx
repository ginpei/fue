import { useMemo } from "react";
import styled from "styled-components";
import { Message } from "../../domains/messages/Message";
import { timeNumberToString } from "../../domains/times/timeConverter";

export interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps): JSX.Element {
  const quotedUrl = useMemo(() => {
    return `${message.url}#:~:text=${encodeURIComponent(message.quote)}`;
  }, [message]);
  return (
    <Root className="MessageItem">
      <Meta>
        <time>{timeNumberToString(message.createdAt)}</time>
        <code>{message.ip}</code>
      </Meta>
      <div><a href={quotedUrl}>{message.url}</a></div>
      <div>{message.quotePath}</div>
      <QuoteBlock cite={message.url}>
        <pre>{message.quote}</pre>
      </QuoteBlock>
      <pre>{message.body}</pre>
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
