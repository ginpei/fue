import { userRootPath } from "../../misc/appMeta";

export function bookEditPagePath(bookId: string): string {
  if (bookId === "") {
    throw new Error("bookId cannot be empty");
  }
  return `${userRootPath}books/${bookId}/edit/`;
}
