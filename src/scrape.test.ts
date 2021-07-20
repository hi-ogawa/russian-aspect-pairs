import * as assert from "assert";
import { describe, it } from "mocha";
import { findPair } from "./scrape";

describe("findPair", () => {
  it("example1", async () => {
    const word = "делать";
    const result = await findPair(word);
    assert.deepStrictEqual(result, { ok: true, data: ["делать", "сделать"] });
  });

  it("example2", async () => {
    const word = "cделать";
    const result = await findPair(word);
    assert.deepStrictEqual(result, {
      ok: false,
      data: 'Found different word "делать"',
    });
  });

  it("example3", async () => {
    const word = "спать";
    const result = await findPair(word);
    assert.deepStrictEqual(result, { ok: true, data: ["спать", undefined] });
  });

  it("example4", async () => {
    assert.deepStrictEqual(await findPair("поспать"), {
      ok: true,
      data: [undefined, "поспать"],
    });
  });

  it("example5", async () => {
    // give up when there are multiple entries
    assert.deepStrictEqual(await findPair("бичевать"), {
      ok: false,
      data: 'Found different word "1. бичевать"',
    });
  });
});
