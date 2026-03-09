import { useEffect, useState } from "react";

export function useMediaQuery(query: string, initialValue = true) {
  const [matches, setMatches] = useState(function () {
    if (typeof window === "undefined") {
      return initialValue;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(
    function () {
      if (typeof window === "undefined") {
        return;
      }

      const mediaQuery = window.matchMedia(query);

      function handleViewportChange(event: MediaQueryListEvent) {
        setMatches(event.matches);
      }

      setMatches(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleViewportChange);

      return function () {
        mediaQuery.removeEventListener("change", handleViewportChange);
      };
    },
    [query],
  );

  return matches;
}
