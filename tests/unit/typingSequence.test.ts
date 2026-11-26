import assert from "node:assert/strict";
import test from "node:test";

import { startTypingSequence } from "../../src/utils/typingSequence.ts";

test("typing sequence advances through every step in order", () => {
  const progress: Array<[number, number]> = [];
  const scheduled: Array<() => void> = [];
  let completed = false;

  startTypingSequence(
    [
      { length: 2, intervalMs: 10 },
      { length: 1, intervalMs: 10 },
    ],
    ({ stepIndex, visibleChars }) => progress.push([stepIndex, visibleChars]),
    () => {
      completed = true;
    },
    (callback) => {
      scheduled.push(callback);
      return () => undefined;
    },
  );

  while (scheduled.length > 0) scheduled.shift()?.();

  assert.equal(completed, true);
  assert.deepEqual(progress.at(-1), [2, 0]);
  assert.ok(progress.some(([step, chars]) => step === 0 && chars === 2));
  assert.ok(progress.some(([step, chars]) => step === 1 && chars === 1));
});

test("typing sequence cancellation prevents pending progress", () => {
  const scheduled: Array<() => void> = [];
  let progressEvents = 0;
  const cancel = startTypingSequence(
    [{ length: 3, intervalMs: 10 }],
    () => {
      progressEvents += 1;
    },
    () => assert.fail("cancelled sequence must not complete"),
    (callback) => {
      scheduled.push(callback);
      return () => undefined;
    },
  );

  cancel();
  scheduled.forEach((callback) => callback());
  assert.equal(progressEvents, 1);
});
