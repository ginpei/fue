import { createDataRecord, DataRecord } from "../dataRecords/DataRecord";

export interface Message extends DataRecord {
  body: string;
  bookId: string;
  quote: string;
  quotePath: string[];
  url: string;
}

export type MessageCallback = (message: Message) => void;

export function createMessage(init?: Message): Message {
  return {
    ...createDataRecord(init),
    body: init?.body ?? "",
    bookId: init?.bookId ?? "",
    quote: init?.quote ?? "",
    quotePath: init?.quotePath ?? [],
    url: init?.url ?? "",
  };
}
