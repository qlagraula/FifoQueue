import { Action } from "types";

export const ACTIONS: Action[] = [
  { type: "A", credits: 20 },
  { type: "B", credits: 20 },
  { type: "C", credits: 30 },
];

export const MIN_CREDITS = 80;
export const MAX_CREDITS = 100;

export const EXECUTION_INTERVAL = 2 * 60 * 1000; // 2 minutes;

export const RESET_ACTION_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours;
