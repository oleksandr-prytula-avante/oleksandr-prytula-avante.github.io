import { useMemo } from "react";
import type { MouseEventHandler } from "react";

import { useI18n } from "../hooks/useI18n";
import { useActiveSectionHash } from "../hooks/useActiveSectionHash";
import { useDropdownMenu } from "../hooks/useDropdownMenu";
import { ESectionId, toSectionHash } from "../utils/sections";

import { ELocale, ETranslationKey } from "../i18n/types";

import logoUrl from "../assets/images/logo.webp";

const LOCALE_LABEL_KEYS: Record<ELocale, ETranslationKey> = {
  [ELocale.En]: ETranslationKey.LocaleEn,
  [ELocale.Ru]: ETranslationKey.LocaleRu,
  [ELocale.Sp]: ETranslationKey.LocaleSp,
  [ELocale.De]: ETranslationKey.LocaleDe,
};

export function Header() {
  const i18n = useI18n();
  const { activeHash } = useActiveSectionHash(toSectionHash(ESectionId.About));
  const languageMenu = useDropdownMenu();

  const navItems = [
    {
      href: toSectionHash(ESectionId.About),
      label: i18n.t(ETranslationKey.NavAbout),
    },
    {
      href: toSectionHash(ESectionId.Expirience),
      label: i18n.t(ETranslationKey.NavExpirience),
    },
    {
      href: toSectionHash(ESectionId.Education),
      label: i18n.t(ETranslationKey.NavEducation),
    },
    {
      href: toSectionHash(ESectionId.Projects),
      label: i18n.t(ETranslationKey.NavProjects),
      disabled: true,
    },
  ];

  const currentLocaleLabel = useMemo(
    function () {
      return i18n.t(LOCALE_LABEL_KEYS[i18n.locale as ELocale]);
    },
    [i18n.locale],
  );

  function handleSelectLocale(nextLocale: ELocale) {
    i18n.setLocale(nextLocale);
    languageMenu.close();
  }

  const handleLanguageMenuToggle: MouseEventHandler<HTMLButtonElement> =
    function (event) {
      event.preventDefault();
      languageMenu.toggle();
    };

  const handleLocaleOptionClick: MouseEventHandler<HTMLButtonElement> =
    function (event) {
      event.preventDefault();

      const nextLocale = event.currentTarget.dataset.locale as
        | ELocale
        | undefined;

      if (!nextLocale) {
        return;
      }

      handleSelectLocale(nextLocale);
    };

  let languageDropdown = null;

  if (languageMenu.isOpen) {
    languageDropdown = (
      <div
        className="absolute right-0 top-[calc(100%-1.33px)] z-20 w-10"
        role="listbox"
        aria-label="Language"
      >
        <span className="pointer-events-none absolute left-1/2 top-[-8px] h-0 w-0 -translate-x-1/2 border-x-[7.5px] border-x-transparent border-b-[9px] border-b-[color:var(--color-accent)]" />

        <div className="overflow-hidden rounded-md border border-[color:var(--color-accent)] bg-[color:var(--color-bg)]">
          {i18n.languageOptions.map((nextLocale) => {
            const isActive = nextLocale === i18n.locale;

            return (
              <button
                key={nextLocale}
                type="button"
                role="option"
                aria-selected={isActive}
                data-locale={nextLocale}
                className={
                  isActive
                    ? "flex h-12 w-full cursor-pointer items-center justify-center bg-white/12 text-center text-lg text-white"
                    : "flex h-12 w-full cursor-pointer items-center justify-center text-center text-lg text-white/80 transition-colors duration-200 ease-out hover:bg-white/8 hover:text-white focus-visible:bg-white/8 focus-visible:text-white"
                }
                onClick={handleLocaleOptionClick}
              >
                <span>{i18n.t(LOCALE_LABEL_KEYS[nextLocale as ELocale])}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <header className="flex h-24 w-full items-center justify-between">
      <img src={logoUrl} alt="Logo" className="h-12 w-auto" />

      <div className="flex items-center gap-8 whitespace-nowrap">
        <nav className="flex items-center gap-8 text-lg uppercase">
          {navItems.map(({ href, label, disabled }) => {
            if (disabled) {
              return (
                <span
                  key={href}
                  className="inline-flex w-[9rem] cursor-not-allowed justify-center text-white/40"
                  aria-disabled="true"
                >
                  <span className="inline-flex border-b-[1.33px] border-transparent py-3">
                    {label}
                  </span>
                </span>
              );
            }

            const isActive = href === activeHash;

            return (
              <a
                key={href}
                className={
                  isActive
                    ? "inline-flex w-[9rem] justify-center no-underline"
                    : "group inline-flex w-[9rem] justify-center no-underline transition-colors duration-200 ease-out hover:text-white/80 focus-visible:text-white/80"
                }
                href={href}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={
                    isActive
                      ? "inline-flex border-b-[1.33px] border-[color:var(--color-accent)] py-3"
                      : "inline-flex border-b-[1.33px] border-transparent py-3 transition-colors duration-200 ease-out group-hover:border-[color:rgb(var(--color-accent-rgb)/0.8)] group-focus-visible:border-[color:rgb(var(--color-accent-rgb)/0.8)]"
                  }
                >
                  {label}
                </span>
              </a>
            );
          })}
        </nav>

        <div
          className="relative border-b-[1.33px] border-transparent py-3"
          ref={languageMenu.containerRef}
        >
          <button
            type="button"
            className={
              languageMenu.isOpen
                ? "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[color:var(--color-accent)] bg-white/8 text-lg text-white outline-none transition-colors duration-200 ease-out"
                : "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/4 bg-white/2 text-lg text-white outline-none transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:bg-white/8 focus-visible:border-[color:var(--color-accent)] focus-visible:bg-white/8"
            }
            onClick={handleLanguageMenuToggle}
            aria-haspopup="listbox"
            aria-expanded={languageMenu.isOpen}
          >
            <span className="text-center">{currentLocaleLabel}</span>
          </button>

          {languageDropdown}
        </div>
      </div>
    </header>
  );
}
