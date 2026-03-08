import { ELocale, ETranslationKey } from "../enums/i18n";

export { ELocale, ETranslationKey } from "../enums/i18n";

export const LOCALE_LABEL_KEYS: Record<ELocale, ETranslationKey> = {
  [ELocale.En]: ETranslationKey.LocaleEn,
  [ELocale.Ru]: ETranslationKey.LocaleRu,
  [ELocale.Sp]: ETranslationKey.LocaleSp,
  [ELocale.De]: ETranslationKey.LocaleDe,
};

export type Translations = Record<ETranslationKey, string>;
