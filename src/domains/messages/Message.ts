import { createDataRecord, DataRecord } from "../dataRecords/DataRecord";
import { ValidationErrorGroup } from "../errors/ValidationErrorGroup";

export interface Message extends DataRecord {
  body: string;
  bookId: string;
  ip: string;
  quote: string;
  quotePath: string;
  url: string;
}

export type MessageCallback = (message: Message) => void;

export function createMessage(init?: Partial<Message>): Message {
  return {
    ...createDataRecord(init),
    body: init?.body ?? "",
    bookId: init?.bookId ?? "",
    ip: init?.ip ?? "",
    quote: init?.quote ?? "",
    quotePath: init?.quotePath ?? "",
    url: init?.url ?? "",
  };
}

export function assertMessage(message: Message): void {
  const errors: Error[] = [];

  if (message.bookId === "") {
    errors.push(new Error("bookId is required"));
  }

  if (message.ip === "") {
    errors.push(new Error("ip is required"));
  }

  if (message.url === "") {
    errors.push(new Error("url is required"));
  }

  if (errors.length > 0) {
    throw new ValidationErrorGroup(errors);
  }
}
