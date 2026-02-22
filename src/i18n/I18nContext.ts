import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

import { ELocale } from "./types";
import type { ETranslationKey } from "./types";

export type I18nContextValue = {
  locale: ELocale;
  setLocale: Dispatch<SetStateAction<ELocale>>;
  t: (key: ETranslationKey) => string;
  languageOptions: ELocale[];
};

export const I18nContext = createContext<I18nContextValue | null>(null);
