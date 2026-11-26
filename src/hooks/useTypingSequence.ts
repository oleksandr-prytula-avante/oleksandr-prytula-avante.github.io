import { useEffect, useState } from "react";

import {
  startTypingSequence,
  type TypingStep,
  type TypingProgress,
} from "../utils/typingSequence";

export function useTypingSequence(
  steps: readonly TypingStep[],
  isEnabled: boolean,
) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState<TypingProgress>({
    stepIndex: 0,
    visibleChars: 0,
    isStarted: false,
  });

  useEffect(() => {
    if (!isEnabled || isCompleted) return;
    return startTypingSequence(steps, setProgress, () => setIsCompleted(true));
  }, [isCompleted, isEnabled, steps]);

  function getStep(index: number) {
    const isFinished = isCompleted || !isEnabled || progress.stepIndex > index;
    const isStarted =
      isFinished || (progress.stepIndex === index && progress.isStarted);
    return {
      isStarted,
      isFinished,
      visibleChars: isFinished
        ? steps[index].length
        : progress.stepIndex === index
          ? progress.visibleChars
          : 0,
    };
  }

  return { getStep };
}
