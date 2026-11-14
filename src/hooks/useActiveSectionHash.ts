import { useEffect, useMemo, useState } from "react";

import { ESection, toSectionHash } from "../utils/sections";
import type { SectionHash } from "../utils/sections";
import { VALID_HASHES } from "../constants/sections";
import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "../constants/mediaQueries";

function isSectionHash(value: string): value is SectionHash {
  return (VALID_HASHES as readonly string[]).includes(value);
}

function getCurrentHash(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.hash;
}

export function useActiveSectionHash(
  defaultHash: SectionHash = toSectionHash(ESection.Home),
) {
  // Match the server-rendered Home screen before resolving a direct hash link.
  const [hash, setHash] = useState<SectionHash>(defaultHash);

  useEffect(
    function () {
      const desktopMediaQuery = window.matchMedia(
        DESKTOP_MIN_WIDTH_MEDIA_QUERY,
      );

      function onHashChange() {
        const currentHash = getCurrentHash();
        const isHomeAvailable = desktopMediaQuery.matches;
        const fallbackHash =
          !isHomeAvailable && defaultHash === toSectionHash(ESection.Home)
            ? toSectionHash(ESection.About)
            : defaultHash;
        const nextHash =
          isSectionHash(currentHash) &&
          (isHomeAvailable || currentHash !== toSectionHash(ESection.Home))
            ? currentHash
            : fallbackHash;

        if (currentHash === nextHash) {
          setHash(nextHash);

          return;
        }

        try {
          const url = `${window.location.pathname}${window.location.search}${nextHash}`;

          window.history.replaceState(null, "", url);
          setHash(nextHash);
        } catch {
          setHash(nextHash);
        }
      }

      window.addEventListener("hashchange", onHashChange);
      desktopMediaQuery.addEventListener("change", onHashChange);
      onHashChange();

      return function () {
        window.removeEventListener("hashchange", onHashChange);
        desktopMediaQuery.removeEventListener("change", onHashChange);
      };
    },
    [defaultHash],
  );

  const activeHash = useMemo<SectionHash>(
    function () {
      return hash;
    },
    [hash],
  );

  return { activeHash, validHashes: VALID_HASHES };
}
