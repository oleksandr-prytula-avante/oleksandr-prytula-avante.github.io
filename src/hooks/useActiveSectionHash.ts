import { useCallback, useEffect, useSyncExternalStore } from "react";

import {
  getCurrentHash,
  isSectionHash,
  ESection,
  toSectionHash,
} from "../utils/sections";
import type { SectionHash } from "../utils/sections";
import { VALID_HASHES } from "../constants/sections";

const hashListeners = new Map<() => void, SectionHash>();

function replaceInvalidHash(defaultHash: SectionHash) {
  const url = `${window.location.pathname}${window.location.search}${defaultHash}`;
  window.history.replaceState(null, "", url);
}

function notifyHashListeners() {
  const currentHash = getCurrentHash();

  if (!isSectionHash(currentHash, VALID_HASHES)) {
    const defaultHash = hashListeners.values().next().value;

    if (defaultHash) {
      try {
        replaceInvalidHash(defaultHash);
      } catch {
        // The normalized snapshot still supplies the default hash.
      }
    }
  }

  hashListeners.forEach((_, listener) => listener());
}

function subscribeToHash(listener: () => void, defaultHash: SectionHash) {
  if (hashListeners.size === 0) {
    window.addEventListener("hashchange", notifyHashListeners);
  }

  hashListeners.set(listener, defaultHash);

  return function () {
    hashListeners.delete(listener);

    if (hashListeners.size === 0) {
      window.removeEventListener("hashchange", notifyHashListeners);
    }
  };
}

export function useActiveSectionHash(
  defaultHash: SectionHash = toSectionHash(ESection.About),
) {
  const getSnapshot = useCallback(() => {
    const currentHash = getCurrentHash();
    return isSectionHash(currentHash, VALID_HASHES) ? currentHash : defaultHash;
  }, [defaultHash]);
  const getServerSnapshot = useCallback(() => defaultHash, [defaultHash]);
  const subscribe = useCallback(
    (listener: () => void) => subscribeToHash(listener, defaultHash),
    [defaultHash],
  );
  const activeHash = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(
    function () {
      const currentHash = getCurrentHash();

      if (!isSectionHash(currentHash, VALID_HASHES)) {
        try {
          replaceInvalidHash(defaultHash);
        } catch {
          // ignore
        }
      }
    },
    [defaultHash],
  );

  return { activeHash, validHashes: VALID_HASHES };
}
