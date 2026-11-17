import { useEffect, useState } from "react";

const UFO_DEPARTURE_MIN_DELAY_MS = 14_000;
const UFO_DEPARTURE_MAX_DELAY_MS = 32_000;
export const UFO_DEPARTURE_DURATION_MS = 1_200;

function getRandomDelay() {
  return (
    UFO_DEPARTURE_MIN_DELAY_MS +
    Math.random() * (UFO_DEPARTURE_MAX_DELAY_MS - UFO_DEPARTURE_MIN_DELAY_MS)
  );
}

export function useUfoDeparture() {
  const [isDeparting, setIsDeparting] = useState(false);

  useEffect(function () {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotionQuery.matches) {
      return;
    }

    let isActive = true;
    let departureTimer: number | undefined;
    let resetTimer: number | undefined;

    function scheduleDeparture() {
      departureTimer = window.setTimeout(function () {
        if (!isActive) {
          return;
        }

        setIsDeparting(true);
        resetTimer = window.setTimeout(function () {
          if (!isActive) {
            return;
          }

          setIsDeparting(false);
          scheduleDeparture();
        }, UFO_DEPARTURE_DURATION_MS);
      }, getRandomDelay());
    }

    scheduleDeparture();

    return function () {
      isActive = false;
      window.clearTimeout(departureTimer);
      window.clearTimeout(resetTimer);
    };
  }, []);

  return isDeparting;
}
