import { Zodios } from "@zodios/core";
import { api } from "api";

const baseUrl = "http://localhost:5000";
export const zodios = new Zodios(baseUrl, api);
