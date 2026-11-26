import { ELocale } from "../enums/i18n";
import { LOCALE_STORAGE_KEY, LOCALE_VALUES } from "../constants/locale";

export function isLocale(value: string | null): value is ELocale {
  return value !== null && LOCALE_VALUES.includes(value as ELocale);
}

export function getPreferredBrowserLocale(): ELocale {
  if (typeof window === "undefined") {
    return ELocale.En;
  }

  const queryLocale = new URLSearchParams(window.location.search).get("lang");

  if (isLocale(queryLocale)) {
    return queryLocale;
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  if (isLocale(stored)) {
    return stored;
  }

  const lang = window.navigator.language.toLowerCase();
  const matchedBrowserLocale = LOCALE_VALUES.find(function (locale) {
    return lang.startsWith(locale);
  });

  return matchedBrowserLocale ?? ELocale.En;
}
