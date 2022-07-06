import {FieldValue, Timestamp} from "firebase-admin/firestore";
import {logger, Request, Response} from "firebase-functions/v1";
import {onRequest} from "firebase-functions/v1/https";
import {ValidationErrorGroup} from "../../../src/domains/errors/ValidationErrorGroup";
import {assertReport, createReport, Report} from "../../../src/domains/reports/Report";
import {getFirestore} from "../firebase";
import {buildErrorLogContent} from "../tools/errors";
import {HttpError} from "../tools/httpError";
import {getRequestBody} from "../tools/request";

export type ReportJson =
  | ReportSuccessJson
  | ValidationErrorJson
  | HttpErrorJson

export interface ReportSuccessJson {
  report: Report;
  ok: true;
}

export interface ValidationErrorJson {
  errors: string[];
  ok: false;
}

export interface HttpErrorJson {
  ok: false;
}

export const report = onRequest(async (req, res: Response<ReportJson>) => {
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
 * report = {
 *   body: "Hello",
 *   bookId: "AqVeSGkVAmjeb0z0LrZj",
 *   quote: "qqq",
 *   quotePath: ["#element", "span:nth-child(2)"],
 *   url: "https://example.com/path/to/page",
 * };
 * url = "http://127.0.0.1:5001/ginpei-fue/us-central1/report";
 * res = await fetch(url, {
 *   body: JSON.stringify(report),
 *   method: "POST",
 * });
 * data = await res.json();
 */
async function post(req: Request, res: Response<ReportSuccessJson>) {
  logger.info("report", {
    body: req.body,
    ip: req.ip,
  });

  // TODO validate
  const body = getRequestBody<Report>(req);
  const ip = getReqIpAddr(req);
  const report = createReport({...body, ip});
  assertReport(report);

  // TODO converter
  const db = getFirestore();
  const coll = db.collection("books").doc(report.bookId).collection("reports");
  const ref = await coll.add({
    ...report,
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
  } as Report;

  res.json({report: storedData, ok: true});
}

function getReqIpAddr(req: Request): string {
  return process.env.DEBUG_REQUEST_IP ?? req.ip;
}
