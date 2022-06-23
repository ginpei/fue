import { collection, CollectionReference, doc, DocumentReference, DocumentSnapshot, Firestore, getDocs, getFirestore } from "firebase/firestore";
import { getBookDoc } from "../books/bookDb";
import { FirestoreData } from "../dataRecords/FirestoreData";
import { ssToDataRecord } from "../dataRecords/firestoreDataDb";
import { createMessage, Message } from "./Message";

export type MessageRecord = FirestoreData<Message>;

export async function loadBookMessages(bookId: string, db = getFirestore()): Promise<Message[]> {
  const coll = getMessageCollection(db, bookId);
  const ss = await getDocs(coll);

  const messages = ss.docs.map((v) => toMessage(v));
  return messages;
}

export function getMessageCollection(db: Firestore, bookId: string): CollectionReference {
  const refBook = getBookDoc(db, bookId);
  const coll = collection(db, `${refBook.path}/messages`);
  return coll;
}

export function getMessageDoc(db: Firestore, bookId: string, messageId: string): DocumentReference {
  const coll = getMessageCollection(db, bookId);
  const ref = doc(coll, messageId);
  return ref;
}

// TODO
function toMessage(ss: DocumentSnapshot): Message {
  const data = ssToDataRecord<Message>(ss);
  return createMessage(data);
}
