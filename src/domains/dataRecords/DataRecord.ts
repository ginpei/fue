export interface DataRecord {
  createdAt: number;
  id: string;
  updatedAt: number;
}

export function createDataRecord(init?: DataRecord): DataRecord {
  return {
    createdAt: init?.createdAt ?? 0,
    id: init?.id ?? "",
    updatedAt: init?.updatedAt ?? 0,
  };
}

