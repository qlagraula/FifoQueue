import { Action } from "types";

import {
  ACTIONS,
  MIN_CREDITS,
  MAX_CREDITS,
  RESET_ACTION_INTERVAL,
} from "../config";
import { currentActions, setCurrentActions } from "../storage/action";
import * as utils from "../utils";

let actionsTimestamp;

export const getActions = (getRandom = utils.getRandom) => {
  const actionHaveExpired =
    actionsTimestamp + RESET_ACTION_INTERVAL - new Date().getTime() < 0;

  if (!currentActions.length || actionHaveExpired) {
    setCurrentActions(
      ACTIONS.map((action) => randomizeAction(action, getRandom))
    );
    actionsTimestamp = new Date().getTime();
  }
  return currentActions;
};

export const randomizeAction = (
  action: Action,
  getRandom: (min: number, max: number) => number,
  min: number = MIN_CREDITS,
  max: number = MAX_CREDITS
): Action => {
  return {
    ...action,
    credits: Math.floor(action.credits * getRandom(min, max)),
  };
};

export const runAction = (action: Action) => {
  setCurrentActions(
    currentActions.map((_action) => {
      if (action.type === _action.type) {
        if (_action.credits === 0) {
          console.log("No credit to run action");
          return _action;
        }

        console.log(`Run action ${action.type}`);
        return {
          ..._action,
          credits: _action.credits - 1,
        };
      }
      return _action;
    })
  );
};
