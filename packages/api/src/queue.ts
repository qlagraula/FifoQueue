import { apiBuilder } from "@zodios/core";
import { z } from "zod";
import { action } from "./action";

export const queueApi = apiBuilder({
  method: "get",
  path: "/",
  alias: "getQueue",
  response: z.array(action),
})
  .addEndpoint({
    method: "post",
    path: "/action",
    alias: "addAction",
    parameters: [
      {
        name: "Body",
        type: "Body",
        schema: action,
      },
    ],
    response: z.object({
      queue: z.array(z.string()),
    }),
  })
  .build();
