import { ELocale } from "../enums/i18n";

export const LOCALE_STORAGE_KEY = "locale";
export const LOCALE_VALUES = [ELocale.En, ELocale.De, ELocale.Ru, ELocale.Sp];

export const HTML_LANGUAGE_BY_LOCALE: Record<ELocale, string> = {
  [ELocale.En]: "en",
  [ELocale.De]: "de",
  [ELocale.Ru]: "ru",
  [ELocale.Sp]: "es",
};
