import { zodiosRouter } from "@zodios/express";
import { api } from "api";

import { getActions } from "../controller/action";

export const actionRouter = zodiosRouter(api);

actionRouter.get("/action", (req, res) => {
  return res.json(getActions());
});
