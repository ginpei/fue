import {ValidationErrorGroup} from "../../../src/domains/errors/ValidationErrorGroup";
import {HttpError} from "./httpError";

export function buildErrorLogContent(error: unknown): Record<string, unknown> {
  if (error instanceof HttpError) {
    return {
      error: {
        code: error.code,
        message: error.message,
        stack: error.stack,
      },
    };
  } else if (error instanceof ValidationErrorGroup) {
    return {
      error: {
        errors: error.messages,
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
