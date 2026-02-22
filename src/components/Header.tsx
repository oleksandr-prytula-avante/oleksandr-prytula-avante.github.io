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
  [ELocale.Ukr]: ETranslationKey.LocaleUkr,
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

  const languageDropdown = languageMenu.isOpen ? (
    <div
      className="absolute right-0 top-[calc(100%-1.33px)] z-20 w-[3.36rem] overflow-hidden rounded-md border border-white/15 bg-[color:var(--color-bg)]"
      role="listbox"
      aria-label="Language"
    >
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
                ? "flex h-12 w-full cursor-pointer items-center bg-white/12 px-3 text-left text-lg text-[color:var(--color-accent)]"
                : "flex h-12 w-full cursor-pointer items-center px-3 text-left text-lg text-white/80 transition-colors duration-200 ease-out hover:bg-white/8 hover:text-white focus-visible:bg-white/8 focus-visible:text-white"
            }
            onClick={handleLocaleOptionClick}
          >
            <span>{i18n.t(LOCALE_LABEL_KEYS[nextLocale as ELocale])}</span>
          </button>
        );
      })}
    </div>
  ) : null;

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
                  className="inline-flex w-[9rem] cursor-not-allowed justify-center border-b-[1.33px] border-transparent py-3 text-white/40"
                  aria-disabled="true"
                >
                  {label}
                </span>
              );
            }

            const isActive = href === activeHash;

            return (
              <a
                key={href}
                className={
                  isActive
                    ? "inline-flex w-[9rem] justify-center border-b-[1.33px] border-[color:var(--color-accent)] py-3 no-underline"
                    : "inline-flex w-[9rem] justify-center border-b-[1.33px] border-transparent py-3 no-underline transition-colors duration-200 ease-out hover:border-[color:rgb(var(--color-accent-rgb)/0.8)] hover:text-white/80 focus-visible:border-[color:rgb(var(--color-accent-rgb)/0.8)] focus-visible:text-white/80"
                }
                href={href}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="relative ml-12" ref={languageMenu.containerRef}>
          <button
            type="button"
            className="flex w-[6rem] cursor-pointer items-center justify-between border-b-[1.33px] border-transparent px-2 py-3 text-lg text-white outline-none transition-colors duration-200 ease-out hover:text-white/80 focus-visible:text-white/80"
            onClick={handleLanguageMenuToggle}
            aria-haspopup="listbox"
            aria-expanded={languageMenu.isOpen}
          >
            <span className="flex-1 text-center">{currentLocaleLabel}</span>
            <span
              className={
                languageMenu.isOpen
                  ? "shrink-0 translate-y-[1px] rotate-180 transition-transform duration-200 ease-out"
                  : "shrink-0 translate-y-[1px] transition-transform duration-200 ease-out"
              }
            >
              ▾
            </span>
          </button>

          {languageDropdown}
        </div>
      </div>
    </header>
  );
}
