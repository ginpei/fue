import { useEffect } from "react";

export function useErrorLogger(...args: any[]): void {
  useEffect(
    () => console.error(...args),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    args
  );
}
