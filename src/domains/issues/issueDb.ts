import { collection, CollectionReference, doc, DocumentReference, DocumentSnapshot, Firestore, getDocs, getFirestore } from "firebase/firestore";
import { getBookDoc } from "../books/bookDb";
import { FirestoreData } from "../dataRecords/FirestoreData";
import { ssToDataRecord } from "../dataRecords/firestoreDataDb";
import { createIssue, Issue } from "./Issue";

export type IssueRecord = FirestoreData<Issue>;

export async function loadBookIssues(bookId: string, db = getFirestore()): Promise<Issue[]> {
  const coll = getIssueCollection(db, bookId);
  const ss = await getDocs(coll);

  const issues = ss.docs.map((v) => toIssue(v));
  return issues;
}

export function getIssueCollection(db: Firestore, bookId: string): CollectionReference {
  const refBook = getBookDoc(db, bookId);
  const coll = collection(db, `${refBook.path}/issues`);
  return coll;
}

export function getIssueDoc(db: Firestore, bookId: string, issueId: string): DocumentReference {
  const coll = getIssueCollection(db, bookId);
  const ref = doc(coll, issueId);
  return ref;
}

// TODO
function toIssue(ss: DocumentSnapshot): Issue {
  const data = ssToDataRecord<Issue>(ss);
  return createIssue(data);
}
