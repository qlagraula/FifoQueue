import { apiBuilder } from "@zodios/core";
import { z } from "zod";

export const queueApi = apiBuilder({
  method: "get",
  path: "/",
  alias: "getQueue",
  response: z
    .object({
      queue: z.array(z.string()),
    })
    .required(),
})
  .addEndpoint({
    method: "get",
    path: "/credits",
    alias: "getCredits",
    response: z.number().positive(),
  })
  .build();
