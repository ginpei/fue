import styled from "styled-components";
import { Message } from "../../domains/messages/Message";
import { timeNumberToString } from "../../domains/times/timeConverter";

export interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps): JSX.Element {
  return (
    <Root className="MessageItem">
      <Meta>
        <time>{timeNumberToString(message.createdAt)}</time>
        <code>{message.ip}</code>
      </Meta>
      <QuoteBlock cite={message.quotePath}>
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

  &::before {
    color: var(--gray-500);
    content: attr(cite);
    display: block;
  }
`;
