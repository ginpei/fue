import { collection, CollectionReference, doc, DocumentReference, DocumentSnapshot, Firestore, getDocs, getFirestore } from "firebase/firestore";
import { getBookDoc } from "../books/bookDb";
import { FirestoreData } from "../dataRecords/FirestoreData";
import { ssToDataRecord } from "../dataRecords/firestoreDataDb";
import { createReport, Report } from "./Report";

export type ReportRecord = FirestoreData<Report>;

export async function loadBookReports(bookId: string, db = getFirestore()): Promise<Report[]> {
  const coll = getReportCollection(db, bookId);
  const ss = await getDocs(coll);

  const reports = ss.docs.map((v) => toReport(v));
  return reports;
}

export function getReportCollection(db: Firestore, bookId: string): CollectionReference {
  const refBook = getBookDoc(db, bookId);
  const coll = collection(db, `${refBook.path}/reports`);
  return coll;
}

export function getReportDoc(db: Firestore, bookId: string, reportId: string): DocumentReference {
  const coll = getReportCollection(db, bookId);
  const ref = doc(coll, reportId);
  return ref;
}

// TODO
function toReport(ss: DocumentSnapshot): Report {
  const data = ssToDataRecord<Report>(ss);
  return createReport(data);
}
