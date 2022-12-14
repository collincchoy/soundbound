import { colonizeMilliseconds } from "./utils";

describe("colonizeMilliseconds converts time(ms) from `number` => `'{minutes}:{second}'`", () => {
  test.each([
    [10, "0:00"],
    [6_400, "0:06"],
    [9_852, "0:10"],
    [60_000, "1:00"],
    [75_000, "1:15"],
    [90_000, "1:30"],
    [105_000, "1:45"],
    [120_000, "2:00"],
    [128_000, "2:08"],
  ])("%p => %p", (timeMs, expected) => {
    expect(colonizeMilliseconds(timeMs)).toEqual(expected);
  });
});
