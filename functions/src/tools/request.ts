import {Request} from "firebase-functions/v1";

export function getRequestBody<T>(req: Request): Partial<T> {
  try {
    return JSON.parse(req.body);
  } catch (error) {
    const httpError = new Error(
        `400 Failed to parse request body (JSON expected)\n${req.body}`
    );
    throw httpError;
  }
}
