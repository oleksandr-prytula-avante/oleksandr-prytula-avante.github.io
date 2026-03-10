import { renderToString } from "react-dom/server";

import App from "./App";
import { ELocale } from "./i18n/types";

export function render(initialLocale: ELocale = ELocale.En): string {
  return renderToString(<App initialLocale={initialLocale} />);
}
