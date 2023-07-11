import { mergeApis } from "@zodios/core";
import { queueApi } from "./queue";
import { actionApi } from "./action";

export const api = mergeApis({
  "/queue": queueApi,
  "/action": actionApi,
});
