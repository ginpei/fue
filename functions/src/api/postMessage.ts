import {logger, Request, Response} from "firebase-functions/v1";
import {onRequest} from "firebase-functions/v1/https";
import {createMessage, Message} from "../../../src/domains/messages/Message";
import {getFirestore} from "../firebase";
import {buildErrorLogContent, HttpError} from "../tools/httpError";
import {getRequestBody} from "../tools/request";

export const postMessage = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  try {
    if (req.method === "POST") {
      post(req, res);
      return;
    }

    throw new HttpError(404, `Unsupported method: ${req.method}`);
  } catch (error) {
    const statusCode = error instanceof HttpError ? error.code : 500;
    res.sendStatus(statusCode);
    res.end();

    logger.error(buildErrorLogContent(error));
  }
});

async function post(req: Request, res: Response) {
  logger.info("postMessage", {
    body: req.body,
    ip: req.ip,
  });

  // TODO validate
  const body = getRequestBody<Message>(req);
  const message = createMessage({...body, ip: req.ip});

  // TODO collection
  const db = getFirestore();
  const coll = db.collection("api");
  const ref = await coll.add(message);

  const ss = await ref.get();
  const storedData = {...ss.data(), id: ss.id};

  res.json(storedData);
}
