export class HttpError extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }
}

export function buildErrorLogContent(error: unknown): Record<string, unknown> {
  if (error instanceof HttpError) {
    return {
      error: {
        code: error.code,
        message: error.message,
        stack: error.stack,
      },
    };
  } else if (error instanceof Error) {
    return {
      error: {
        message: error.message,
        stack: error.stack,
      },
    };
  }

  return {
    error: String(error),
  };
}
