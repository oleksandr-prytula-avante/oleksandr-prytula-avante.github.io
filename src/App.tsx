import { I18nContext } from "./i18n/I18nContext";
import { useLocale } from "./i18n/useLocale";

import { Main } from "./layout/Main/Main";

export default function App() {
  const i18n = useLocale();

  return (
    <I18nContext.Provider value={i18n}>
      <Main />
    </I18nContext.Provider>
  );
}
