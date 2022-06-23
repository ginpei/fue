import { Timestamp } from "firebase/firestore";
import { DataRecord } from "./DataRecord";

export type FirestoreData<T extends DataRecord> =
  & Omit<T, "createdAt" | "id" | "updatedAt">
  & { createdAt: Timestamp; updatedAt: Timestamp;  }
