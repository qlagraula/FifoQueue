import { zodiosRouter } from "@zodios/express";
import { api } from "api";

import { addAction, getQueue } from "../controller/queue";

export const queueRouter = zodiosRouter(api);

queueRouter.get("/queue", (req, res) => {
  const queue = getQueue();
  return res.json(queue);
});

queueRouter.post("/queue/action", (req, res) => {
  addAction(req.body);
  return res.sendStatus(200);
});
