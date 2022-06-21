import {FieldValue, Timestamp} from "firebase-admin/firestore";
import {logger, Request, Response} from "firebase-functions/v1";
import {onRequest} from "firebase-functions/v1/https";
import {ValidationErrorGroup} from "../../../src/domains/errors/ValidationErrorGroup";
import {assertMessage, createMessage, Message} from "../../../src/domains/messages/Message";
import {getFirestore} from "../firebase";
import {buildErrorLogContent} from "../tools/errors";
import {HttpError} from "../tools/httpError";
import {getRequestBody} from "../tools/request";

export type PostMessageJson =
  | PostMessageSuccessJson
  | ValidationErrorJson
  | HttpErrorJson

export interface PostMessageSuccessJson {
  message: Message;
  ok: true;
}

export interface ValidationErrorJson {
  errors: string[];
  ok: false;
}

export interface HttpErrorJson {
  ok: false;
}

export const postMessage = onRequest(async (req, res: Response<PostMessageJson>) => {
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

async function post(req: Request, res: Response<PostMessageSuccessJson>) {
  logger.info("postMessage", {
    body: req.body,
    ip: req.ip,
  });

  // TODO validate
  const body = getRequestBody<Message>(req);
  const message = createMessage({...body, ip: req.ip});
  assertMessage(message);

  // TODO collection
  const db = getFirestore();
  const coll = db.collection("api");
  const ref = await coll.add({
    ...message,
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
  } as Message;

  res.json({message: storedData, ok: true});
}
