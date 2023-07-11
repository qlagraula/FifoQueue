import { apiBuilder } from "@zodios/core";
import { z } from "zod";

export const action = z.object({
  type: z.string(),
  credits: z.number(),
});

export type Action = z.infer<typeof action>;

export const actionApi = apiBuilder({
  method: "get",
  path: "/",
  alias: "getActions",
  response: z.array(action),
}).build();
