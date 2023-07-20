import { Action } from "types";
import { EXECUTION_INTERVAL } from "../config";
import { runAction } from "./action";
import { queue } from "../storage/queue";

let queueInterval: NodeJS.Timeout | undefined = undefined;

export const getQueue = () => {
  return queue;
};

export const addAction = (action: Action) => {
  if (!queue.length) startQueue();
  queue.push(action);
};

export const runQueue = () => {
  const [currentAction] = getQueue();
  if (!currentAction) {
    return;
  }

  runAction(currentAction);
  queue.shift();
  if (!queue.length) stopQueue();
};

export const startQueue = () => {
  queueInterval = setInterval(() => runQueue(), EXECUTION_INTERVAL);
  console.log("Queue started");
};

export const stopQueue = () => {
  if (!queueInterval) {
    return;
  }
  clearInterval(queueInterval);
  console.log("Queue stoped");
};
