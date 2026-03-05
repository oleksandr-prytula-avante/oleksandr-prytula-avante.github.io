import { useCallback, useEffect, useState } from "react";

import { ELocale } from "./types";
import type { ETranslationKey } from "./types";
import { TRANSLATIONS } from "./translations";

export const STORAGE_KEY = "locale";
export const ELOCALE_VALUES = [ELocale.En, ELocale.De, ELocale.Ru, ELocale.Sp];
const BROWSER_LOCALE_FALLBACK_ORDER = [ELocale.Ru, ELocale.De, ELocale.Sp];

function isLocale(value: string | null): value is ELocale {
  return value !== null && ELOCALE_VALUES.includes(value as ELocale);
}

function getInitialLocale(): ELocale {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (isLocale(stored)) {
    return stored;
  }

  const lang = navigator.language.toLowerCase();

  const matchedBrowserLocale = BROWSER_LOCALE_FALLBACK_ORDER.find(
    function (locale) {
      return lang.startsWith(locale);
    },
  );

  if (matchedBrowserLocale) {
    return matchedBrowserLocale;
  }

  return ELocale.En;
}

export function useLocale() {
  const [locale, setLocale] = useState<ELocale>(function () {
    try {
      return getInitialLocale();
    } catch {
      return ELocale.En;
    }
  });

  useEffect(
    function () {
      try {
        localStorage.setItem(STORAGE_KEY, locale);
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
