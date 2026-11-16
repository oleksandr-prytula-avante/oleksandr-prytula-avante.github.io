export type TypingStep = {
  length: number;
  intervalMs: number;
  charsPerTick?: number;
  delayMs?: number;
};

export type TypingProgress = {
  stepIndex: number;
  visibleChars: number;
  isStarted: boolean;
};

type Schedule = (callback: () => void, delayMs: number) => () => void;

const scheduleTimeout: Schedule = (callback, delayMs) => {
  const id = globalThis.setTimeout(callback, delayMs);
  return () => globalThis.clearTimeout(id);
};

export function startTypingSequence(
  steps: readonly TypingStep[],
  onProgress: (progress: TypingProgress) => void,
  onComplete: () => void,
  schedule: Schedule = scheduleTimeout,
) {
  let isCancelled = false;
  let cancelPending: (() => void) | undefined;

  function startStep(stepIndex: number) {
    if (isCancelled) return;
    if (stepIndex >= steps.length) {
      onProgress({ stepIndex, visibleChars: 0, isStarted: false });
      onComplete();
      return;
    }

    const step = steps[stepIndex];
    let visibleChars = 0;

    function tick() {
      if (isCancelled) return;
      visibleChars = Math.min(
        visibleChars + (step.charsPerTick ?? 1),
        step.length,
      );
      onProgress({ stepIndex, visibleChars, isStarted: true });

      if (visibleChars >= step.length) {
        startStep(stepIndex + 1);
      } else {
        cancelPending = schedule(tick, step.intervalMs);
      }
    }

    function begin() {
      if (isCancelled) return;
      onProgress({ stepIndex, visibleChars, isStarted: true });
      if (step.length === 0) {
        startStep(stepIndex + 1);
      } else {
        cancelPending = schedule(tick, step.intervalMs);
      }
    }

    if (step.delayMs) {
      onProgress({ stepIndex, visibleChars, isStarted: false });
      cancelPending = schedule(begin, step.delayMs);
    } else {
      begin();
    }
  }

  startStep(0);

  return () => {
    isCancelled = true;
    cancelPending?.();
  };
}
