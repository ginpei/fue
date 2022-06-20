import { addDoc, collection, CollectionReference, doc, DocumentReference, Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { Book, createBook } from "./Book";

export async function saveBook(book: Book, db = getFirestore()): Promise<string> {
  const coll = getBookCollection(db);

  // new
  if (book.id === "")  {
    const ref = await addDoc(coll, book);
    return ref.id;
  }

  // update
  const ref = getBookDoc(db, book.id);
  await setDoc(ref, book);
  return book.id;
}

export async function loadBook(bookId: string, db = getFirestore()): Promise<Book | null> {
  const ref = getBookDoc(db, bookId);
  const ss = await getDoc(ref);
  if (!ss.exists()) {
    return null;
  }

  const book = createBook(ss.data() as Book);
  return book;
}

function getBookCollection(db: Firestore): CollectionReference {
  const coll = collection(db, "books");
  return coll;
}

function getBookDoc(db: Firestore, bookId: string): DocumentReference {
  const coll = getBookCollection(db);
  const ref = doc(coll, bookId);
  return ref;
}
