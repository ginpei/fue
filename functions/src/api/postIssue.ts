import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { logger, Request, Response } from "firebase-functions/v1";
import { onRequest } from "firebase-functions/v1/https";
import { ValidationErrorGroup } from "../../../src/domains/errors/ValidationErrorGroup";
import { assertIssue, createIssue, Issue } from "../../../src/domains/issues/Issue";
import { getFirestore } from "../firebase";
import { buildErrorLogContent } from "../tools/errors";
import { HttpError } from "../tools/httpError";
import { getRequestBody } from "../tools/request";

export type PostIssueJson =
  | PostIssueSuccessJson
  | ValidationErrorJson
  | HttpErrorJson

export interface PostIssueSuccessJson {
  issue: Issue;
  ok: true;
}

export interface ValidationErrorJson {
  errors: string[];
  ok: false;
}

export interface HttpErrorJson {
  ok: false;
}

export const postIssue = onRequest(async (req, res: Response<PostIssueJson>) => {
  res.set("Access-Control-Allow-Origin", "*");

  try {
    if (req.method === "POST") {
      await post(req, res);
      return;
    }

    throw new HttpError(404, `Unsupported method: ${req.method}`);
  } catch (error) {
    if (error instanceof ValidationErrorGroup) {
      res.status(400);
      res.json({errors: error.messages, ok: false});
      logger.info(buildErrorLogContent(error));
      return;
    }

    const statusCode = error instanceof HttpError ? error.code : 500;
    res.status(statusCode);
    res.json({ok: false});

    logger.error(buildErrorLogContent(error));
  }
});

/**
 * @example
 * issue = {
 *   body: "Hello",
 *   bookId: "AqVeSGkVAmjeb0z0LrZj",
 *   quote: "qqq",
 *   quotePath: ["#element", "span:nth-child(2)"],
 *   url: "https://example.com/path/to/page",
 * };
 * url = "http://127.0.0.1:5001/ginpei-fue/us-central1/postIssue";
 * res = await fetch(url, {
 *   body: JSON.stringify(issue),
 *   method: "POST",
 * });
 * data = await res.json();
 */
async function post(req: Request, res: Response<PostIssueSuccessJson>) {
  logger.info("postIssue", {
    body: req.body,
    ip: req.ip,
  });

  // TODO validate
  const body = getRequestBody<Issue>(req);
  const ip = getReqIpAddr(req);
  const issue = createIssue({...body, ip});
  assertIssue(issue);

  // TODO converter
  const db = getFirestore();
  const coll = db.collection("books").doc(issue.bookId).collection("issues");
  const ref = await coll.add({
    ...issue,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  // TODO converter
  const ss = await ref.get();
  const data = ss.data()!;
  const storedData = {
    ...data,
    id: ss.id,
    createdAt: (data.updatedAt as Timestamp).toMillis(),
    updatedAt: (data.updatedAt as Timestamp).toMillis(),
  } as Issue;

  res.json({issue: storedData, ok: true});
}

function getReqIpAddr(req: Request): string {
  return process.env.DEBUG_REQUEST_IP ?? req.ip;
}
