import { ZodiosHooks } from "@zodios/react";

import { zodios } from "../api";

export const zodiosHooks = new ZodiosHooks("api", zodios);
