import { useCallback, useEffect, useState } from "react";

import { ELocale } from "./types";
import type { ETranslationKey } from "./types";
import { TRANSLATIONS } from "./translations";

export const STORAGE_KEY = "locale";
export const ELOCALE_VALUES = [ELocale.En, ELocale.De, ELocale.Ru, ELocale.Sp];

function isLocale(value: string | null): value is ELocale {
  return value !== null && ELOCALE_VALUES.includes(value as ELocale);
}

function getPreferredBrowserLocale(): ELocale {
  if (typeof window === "undefined") {
    return ELocale.En;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (isLocale(stored)) {
    return stored;
  }

  const lang = window.navigator.language.toLowerCase();

  const matchedBrowserLocale = ELOCALE_VALUES.find(function (locale) {
    return lang.startsWith(locale);
  });

  if (matchedBrowserLocale) {
    return matchedBrowserLocale;
  }

  return ELocale.En;
}

export function useLocale(initialLocale: ELocale = ELocale.En) {
  const [locale, setLocale] = useState<ELocale>(initialLocale);

  useEffect(function () {
    try {
      const browserLocale = getPreferredBrowserLocale();

      setLocale(function (currentLocale) {
        return currentLocale === browserLocale ? currentLocale : browserLocale;
      });
    } catch {
      // ignore
    }
  }, []);

  useEffect(
    function () {
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, locale);
        }
      } catch {
        // ignore
      }
    },
    [locale],
  );

  const t = useCallback(
    function (key: ETranslationKey) {
      return TRANSLATIONS[locale][key] ?? TRANSLATIONS[ELocale.En][key] ?? key;
    },
    [locale],
  );

  return { locale, setLocale, t, languageOptions: ELOCALE_VALUES };
}
