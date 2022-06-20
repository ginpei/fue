import {logger} from "firebase-functions/v1";
import {onRequest} from "firebase-functions/v1/https";
import {createMessage, Message} from "../../../src/domains/messages/Message";
import {getFirestore} from "../firebase";
import {getRequestBody} from "../tools/request";

export const postMessage = onRequest(async (req, res) => {
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
});
