import { createDataRecord, DataRecord } from "../dataRecords/DataRecord";
import { ValidationErrorGroup } from "../errors/ValidationErrorGroup";

export interface Issue extends DataRecord {
  bookId: string;
  ip: string;
  message: string;
  quote: string;
  quotePath: string;
  url: string;
}

export type IssueCallback = (issue: Issue) => void;

export function createIssue(init?: Partial<Issue>): Issue {
  return {
    ...createDataRecord(init),
    bookId: init?.bookId ?? "",
    ip: init?.ip ?? "",
    message: init?.message ?? "",
    quote: init?.quote ?? "",
    quotePath: init?.quotePath ?? "",
    url: init?.url ?? "",
  };
}

export function assertIssue(issue: Issue): void {
  const errors: Error[] = [];

  if (issue.bookId === "") {
    errors.push(new Error("bookId is required"));
  }

  if (issue.ip === "") {
    errors.push(new Error("ip is required"));
  }

  if (issue.url === "") {
    errors.push(new Error("url is required"));
  }

  if (errors.length > 0) {
    throw new ValidationErrorGroup(errors);
  }
}
