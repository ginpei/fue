import { useUserBooks } from "../../domains/books/bookHooks";
import { useCurrentUser } from "../../domains/currentUsers/currentUserHooks";
import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { working } from "../../misc/working";
import { bookCreatePagePath } from "../bookCreate/bookCreatePageMeta";
import { bookViewPagePath } from "../bookView/bookViewPageMeta";
import { LoadingPage } from "../loading/LoadingPage";

export interface DashboardPageProps {
}

export function DashboardPage(): JSX.Element {
  const user = useCurrentUser();
  const books = useUserBooks(user === working ? working : user?.uid);

  if (books === working) {
    return <LoadingPage />;
  }

  return (
    <BasicLayout name="DashboardPage" title="Dashboard">
      <h1>Dashboard</h1>
      <h2>Books</h2>
      <p>
        <a href={bookCreatePagePath()}>Create a new book...</a>
      </p>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <a href={bookViewPagePath(book.id)}>{book.title}</a>
          </li>
        ))}
      </ul>
    </BasicLayout>
  );
}
