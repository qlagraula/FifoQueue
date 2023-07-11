import { apiBuilder } from "@zodios/core";
import { z } from "zod";

const action = z.object({
  type: z.string(),
  credits: z.number().positive(),
});

export type Action = z.infer<typeof action>;

export const actionApi = apiBuilder({
  method: "post",
  path: "/",
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
  .addEndpoint({
    method: "get",
    path: "/",
    alias: "getActions",
    response: z.array(action),
  })
  .build();
