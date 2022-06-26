import { createDataRecord, DataRecord } from "../dataRecords/DataRecord";
import { ValidationErrorGroup } from "../errors/ValidationErrorGroup";

export interface Report extends DataRecord {
  bookId: string;
  ip: string;
  message: string;
  quote: string;
  quotePath: string;
  url: string;
}

export type ReportCallback = (report: Report) => void;

export function createReport(init?: Partial<Report>): Report {
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

export function assertReport(report: Report): void {
  const errors: Error[] = [];

  if (report.bookId === "") {
    errors.push(new Error("bookId is required"));
  }

  if (report.ip === "") {
    errors.push(new Error("ip is required"));
  }

  if (report.url === "") {
    errors.push(new Error("url is required"));
  }

  if (errors.length > 0) {
    throw new ValidationErrorGroup(errors);
  }
}
