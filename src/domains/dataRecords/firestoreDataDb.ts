import { DocumentSnapshot } from "firebase/firestore";
import { DataRecord } from "./DataRecord";
import { FirestoreData } from "./FirestoreData";

export function ssToDataRecord<T extends DataRecord>(ss: DocumentSnapshot): Partial<T> {
  const data = ss.data() as FirestoreData<T> | undefined;
  if (!data) {
    throw new Error(`Data not exist`);
  }

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
    id: ss.id,
  } as Partial<T>;
}
