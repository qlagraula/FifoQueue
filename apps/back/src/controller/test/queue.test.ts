import { beforeAll, describe, expect, test, vi } from "vitest";

import { queue } from "../../storage/queue";
import * as config from "../../config";

import { getActions } from "../action";
import { addAction, runQueue } from "../queue";

vi.spyOn(config, "ACTIONS", "get").mockReturnValue([
  { type: "A", credits: 10 },
]);
const consoleSpy = vi.spyOn(console, "log");

beforeAll(() => {
  getActions();
});

describe("addAction()", () => {
  test("should add action in queue and start queue", () => {
    expect(queue).toEqual([]);
    addAction({ type: "A", credits: 1 });
    expect(queue).toMatchInlineSnapshot(`
      [
        {
          "credits": 1,
          "type": "A",
        },
      ]
    `);
  });
});

describe("runQueue()", () => {
  test("should run first action", () => {
    expect(queue).toMatchInlineSnapshot(`
    [
      {
        "credits": 1,
        "type": "A",
      },
    ]
  `);
    runQueue();
    expect(queue).toEqual([]);
  });

  test("should do nothing if queue is empty", () => {
    expect(queue).toEqual([]);
    runQueue();
    expect(queue).toEqual([]);
  });

  test("should stop queue when queue is empty", () => {
    addAction({ type: "A", credits: 1 });
    runQueue();
    expect(consoleSpy).toHaveBeenCalledWith("Queue stoped");
  });
});
