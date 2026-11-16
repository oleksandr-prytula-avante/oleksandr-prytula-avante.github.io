import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string, initialValue = true) {
  const subscribe = useCallback(
    function (onChange: () => void) {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onChange);

      return function () {
        mediaQuery.removeEventListener("change", onChange);
      };
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => initialValue,
  );
}
