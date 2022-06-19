export function toError(errorLike: unknown): Error {
  if (errorLike instanceof Error) {
    return errorLike;
  }

  return new Error(String(errorLike));
}
