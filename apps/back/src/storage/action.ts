import { Action } from "api/src/action";

export let currentActions: Action[] = [];

export const setCurrentActions = (actions: Action[]) => {
  currentActions = actions;
};
