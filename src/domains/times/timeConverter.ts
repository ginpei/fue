// TODO
export function timeNumberToString(n: number): string {
  const d = new Date(n);
  const s = d.toLocaleString();
  return s;
}
