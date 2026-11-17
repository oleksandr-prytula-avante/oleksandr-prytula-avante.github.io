import { useCallback, useEffect, useState } from "react";

import { ELocale } from "./types";
import type { ETranslationKey } from "./types";
import { TRANSLATIONS } from "./translations";
import { LOCALE_VALUES, LOCALE_STORAGE_KEY } from "../constants/locale";
import { getPreferredBrowserLocale } from "../utils/locale";
import { toDisplayText } from "../utils/text";

export function useLocale(initialLocale: ELocale = ELocale.En) {
  const [locale, setLocale] = useState<ELocale>(initialLocale);

  useEffect(function () {
    let localeTimer = 0;

    try {
      const browserLocale = getPreferredBrowserLocale();

      localeTimer = window.setTimeout(function () {
        setLocale(function (currentLocale) {
          return currentLocale === browserLocale
            ? currentLocale
            : browserLocale;
        });
      }, 0);
    } catch {
      // ignore
    }

    return function () {
      window.clearTimeout(localeTimer);
    };
  }, []);

  useEffect(
    function () {
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
        }
      } catch {
        // ignore
      }
    },
    [locale],
  );

  const t = useCallback(
    function (key: ETranslationKey) {
      const value =
        TRANSLATIONS[locale][key] ?? TRANSLATIONS[ELocale.En][key] ?? key;

      return toDisplayText(value);
    },
    [locale],
  );

  return { locale, setLocale, t, languageOptions: LOCALE_VALUES };
}
