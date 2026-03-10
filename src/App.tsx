import { I18nContext } from "./i18n/I18nContext";
import { ELocale } from "./i18n/types";
import { useLocale } from "./i18n/useLocale";

import { Main } from "./layout/Main/Main";

type AppProps = {
  initialLocale?: ELocale;
};

export default function App(props: AppProps) {
  const { initialLocale = ELocale.En } = props;
  const i18n = useLocale(initialLocale);

  return (
    <I18nContext.Provider value={i18n}>
      <Main />
    </I18nContext.Provider>
  );
}
