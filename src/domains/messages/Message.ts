import { createDataRecord, DataRecord } from "../dataRecords/DataRecord";

export interface Message extends DataRecord {
  body: string;
  bookId: string;
  ip: string;
  quote: string;
  quotePath: string[];
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
    quotePath: init?.quotePath ?? [],
    url: init?.url ?? "",
  };
}
