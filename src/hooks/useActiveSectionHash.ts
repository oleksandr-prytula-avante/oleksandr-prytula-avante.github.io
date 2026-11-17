import { useEffect, useMemo, useState } from "react";

import {
  getCurrentHash,
  isSectionHash,
  ESection,
  toSectionHash,
} from "../utils/sections";
import type { SectionHash } from "../utils/sections";
import { VALID_HASHES } from "../constants/sections";

export function useActiveSectionHash(
  defaultHash: SectionHash = toSectionHash(ESection.About),
) {
  const [hash, setHash] = useState<SectionHash>(function () {
    const currentHash = getCurrentHash();
    return isSectionHash(currentHash, VALID_HASHES) ? currentHash : defaultHash;
  });

  useEffect(
    function () {
      function onHashChange() {
        const currentHash = getCurrentHash();

        if (isSectionHash(currentHash, VALID_HASHES)) {
          setHash(currentHash);

          return;
        }

        try {
          const url = `${window.location.pathname}${window.location.search}${defaultHash}`;

          window.history.replaceState(null, "", url);
          setHash(defaultHash);
        } catch {
          setHash(defaultHash);
        }
      }

      const currentHash = getCurrentHash();

      if (!isSectionHash(currentHash, VALID_HASHES)) {
        try {
          const url = `${window.location.pathname}${window.location.search}${defaultHash}`;

          window.history.replaceState(null, "", url);
        } catch {
          // ignore
        }
      }

      window.addEventListener("hashchange", onHashChange);

      return function () {
        window.removeEventListener("hashchange", onHashChange);
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
