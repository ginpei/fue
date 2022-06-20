import { createDataRecord, DataRecord } from "../dataRecords/DataRecord";

export interface Book extends DataRecord {
  description: string;
  title: string;
  userId: string;
}

export type BookCallback = (book: Book) => void;

export function createBook(init?: Book): Book {
  return {
    ...createDataRecord(init),
    description: init?.description ?? "",
    title: init?.title ?? "",
    userId: init?.userId ?? "",
  };
}
