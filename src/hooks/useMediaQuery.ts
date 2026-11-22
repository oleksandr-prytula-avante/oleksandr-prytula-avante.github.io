import { useCallback, useSyncExternalStore } from "react";

const mediaQueryCache = new Map<string, MediaQueryList>();

function getMediaQuery(query: string) {
  let mediaQuery = mediaQueryCache.get(query);

  if (!mediaQuery) {
    mediaQuery = window.matchMedia(query);
    mediaQueryCache.set(query, mediaQuery);
  }

  return mediaQuery;
}

export function useMediaQuery(query: string, initialValue = true) {
  const subscribe = useCallback(
    function (onChange: () => void) {
      const mediaQuery = getMediaQuery(query);
      mediaQuery.addEventListener("change", onChange);

      return function () {
        mediaQuery.removeEventListener("change", onChange);
      };
    },
    [query],
  );
  const getSnapshot = useCallback(
    function () {
      return getMediaQuery(query).matches;
    },
    [query],
  );
  const getServerSnapshot = useCallback(
    function () {
      return initialValue;
    },
    [initialValue],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
