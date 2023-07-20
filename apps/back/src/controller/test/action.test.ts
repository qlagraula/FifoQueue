import { beforeAll, describe, expect, test, vi } from "vitest";

import { getActions, runAction } from "../action";
import * as config from "../../config";
import * as utils from "../../utils";
import * as storageAction from "../../storage/action";

vi.spyOn(config, "RESET_ACTION_INTERVAL", "get").mockReturnValue(100);
vi.spyOn(config, "ACTIONS", "get").mockReturnValue([
  { type: "A", credits: 10 },
]);
const consoleSpy = vi.spyOn(console, "log");

describe("getActions()", () => {
  test("should generate actions", () => {
    expect(getActions(() => 1)).toMatchInlineSnapshot(`
      [
        {
          "credits": 10,
          "type": "A",
        },
      ]
    `);
  });

  test("should not re-generate actions is data is not expired", () => {
    expect(getActions(() => 0)).toMatchInlineSnapshot(`
      [
        {
          "credits": 10,
          "type": "A",
        },
      ]
    `);
  });

  test("should re-generate actions if data is expired", async () => {
    await utils.sleep(200);
    expect(getActions(() => 0)).toMatchInlineSnapshot(`
      [
        {
          "credits": 0,
          "type": "A",
        },
      ]
    `);
  });
});

describe("runAction()", () => {
  beforeAll(async () => {
    // Force one remaining credit
    await utils.sleep(200);
    getActions(() => 0.1);
  });

  test("should not run if action does not exist", () => {
    expect(storageAction.currentActions).toMatchInlineSnapshot(`
    [
      {
        "credits": 1,
        "type": "A",
      },
    ]
  `);
    runAction({ type: "B", credits: 1 });
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(storageAction.currentActions).toMatchInlineSnapshot(`
    [
      {
        "credits": 1,
        "type": "A",
      },
    ]
  `);
  });

  test("should run action and decrement credit", () => {
    expect(storageAction.currentActions).toMatchInlineSnapshot(`
      [
        {
          "credits": 1,
          "type": "A",
        },
      ]
    `);
    runAction({ type: "A", credits: 1 });
    expect(consoleSpy).toHaveBeenCalledWith("Run action A");
    expect(storageAction.currentActions).toMatchInlineSnapshot(`
      [
        {
          "credits": 0,
          "type": "A",
        },
      ]
    `);
  });

  test("should not run action if no credit", () => {
    expect(storageAction.currentActions).toMatchInlineSnapshot(`
      [
        {
          "credits": 0,
          "type": "A",
        },
      ]
    `);
    runAction({ type: "A", credits: 1 });
    expect(consoleSpy).toHaveBeenCalledWith("No credit to run action");
    expect(storageAction.currentActions).toMatchInlineSnapshot(`
      [
        {
          "credits": 0,
          "type": "A",
        },
      ]
    `);
  });
});
