import { useContext } from "react";

import { I18nContext } from "../i18n/I18nContext";

export function useI18n() {
  const value = useContext(I18nContext);

  if (!value) {
    throw new Error("useI18n must be used within I18nContext.Provider");
  }

  return value;
}
