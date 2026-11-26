import { useCallback, useEffect, useState } from "react";
import type { SetStateAction } from "react";

import { ELocale } from "./types";
import type { ETranslationKey } from "./types";
import { TRANSLATIONS } from "./translations";
import {
  HTML_LANGUAGE_BY_LOCALE,
  LOCALE_VALUES,
  LOCALE_STORAGE_KEY,
} from "../constants/locale";
import { SEO_BY_LOCALE, SITE_URL } from "../constants/seo";
import { getPreferredBrowserLocale } from "../utils/locale";
import { toDisplayText } from "../utils/text";

export function useLocale(initialLocale: ELocale = ELocale.En) {
  const [locale, setLocale] = useState<ELocale>(initialLocale);

  useEffect(function () {
    let localeTimer = 0;

    try {
      const browserLocale = getPreferredBrowserLocale();

      localeTimer = window.setTimeout(function () {
        setLocale(function (currentLocale) {
          return currentLocale === browserLocale
            ? currentLocale
            : browserLocale;
        });
      }, 0);
    } catch {
      // ignore
    }

    return function () {
      window.clearTimeout(localeTimer);
    };
  }, []);

  const setLocaleWithUrl = useCallback(
    (nextLocale: SetStateAction<ELocale>) => {
      setLocale((currentLocale) => {
        const resolvedLocale =
          typeof nextLocale === "function"
            ? nextLocale(currentLocale)
            : nextLocale;

        try {
          const url = new URL(window.location.href);
          url.searchParams.set("lang", resolvedLocale);
          window.history.replaceState(null, "", url);
        } catch {
          // The locale still changes when URL APIs are unavailable.
        }

        return resolvedLocale;
      });
    },
    [],
  );

  useEffect(
    function () {
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
        }
      } catch {
        // ignore
      }
    },
    [locale],
  );

  useEffect(() => {
    const metadata = SEO_BY_LOCALE[locale];
    const language = HTML_LANGUAGE_BY_LOCALE[locale];
    document.documentElement.lang = language;
    document.title = metadata.title;

    const setMeta = (selector: string, value: string) => {
      document
        .querySelector<HTMLMetaElement>(selector)
        ?.setAttribute("content", value);
    };
    setMeta('meta[name="description"]', metadata.description);
    setMeta('meta[property="og:title"]', metadata.title);
    setMeta('meta[property="og:description"]', metadata.description);
    setMeta('meta[property="og:locale"]', language);
    setMeta('meta[name="twitter:title"]', metadata.title);
    setMeta('meta[name="twitter:description"]', metadata.description);

    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", `${SITE_URL}?lang=${locale}`);
  }, [locale]);

  const t = useCallback(
    function (key: ETranslationKey) {
      const value =
        TRANSLATIONS[locale][key] ?? TRANSLATIONS[ELocale.En][key] ?? key;

      return toDisplayText(value);
    },
    [locale],
  );

  return {
    locale,
    setLocale: setLocaleWithUrl,
    t,
    languageOptions: LOCALE_VALUES,
  };
}
