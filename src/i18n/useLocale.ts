import { useCallback, useEffect, useMemo, useState } from "react";

import { ELocale } from "./types";
import type { ETranslationKey } from "./types";
import { TRANSLATIONS } from "./translations";

export const STORAGE_KEY = "resume.locale";
export const ELOCALE_VALUES = [ELocale.En, ELocale.De, ELocale.Ru, ELocale.Sp];

function isLocale(value: string | null): value is ELocale {
  return value !== null && ELOCALE_VALUES.includes(value as ELocale);
}

function getInitialLocale(): ELocale {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (isLocale(stored)) {
    return stored;
  }

  const lang = navigator.language.toLowerCase();

  if (lang.startsWith(ELocale.Ru)) {
    return ELocale.Ru;
  }

  if (lang.startsWith(ELocale.De)) {
    return ELocale.De;
  }

  if (lang.startsWith(ELocale.Sp)) {
    return ELocale.Sp;
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

  const languageOptions = useMemo(function () {
    return ELOCALE_VALUES;
  }, []);

  return { locale, setLocale, t, languageOptions };
}
