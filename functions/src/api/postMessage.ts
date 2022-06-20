import {logger} from "firebase-functions/v1";
import {onRequest} from "firebase-functions/v1/https";
import {createMessage, Message} from "../../../src/domains/messages/Message";
import {getFirestore} from "../firebase";
import {HttpError} from "../tools/httpError";
import {getRequestBody} from "../tools/request";

export const postMessage = onRequest(async (req, res) => {
  try {
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

    // TODO CORS
    res.json(storedData);
  } catch (error) {
    if (error instanceof HttpError) {
      logger.error({
        error: {
          code: error.code,
          message: error.message,
          stack: error.stack,
        },
      });

      res.sendStatus(error.code);
      res.end();

      return;
    } else if (error instanceof Error) {
      logger.error({
        error: {
          message: error.message,
          stack: error.stack,
        },
      });

      res.sendStatus(500);
      res.end();

      return;
    }

    logger.error({
      error: String(error),
    });

    res.sendStatus(500);
    res.end();
  }
});
