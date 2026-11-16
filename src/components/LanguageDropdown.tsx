import { useEffect, useMemo } from "react";

import { useI18n } from "../hooks/useI18n";
import { useDropdownMenu } from "../hooks/useDropdownMenu";

import { ELocale, ETranslationKey, LOCALE_LABEL_KEYS } from "../i18n/types";

type LanguageDropdownProps = {
  isDisabled?: boolean;
};

export function LanguageDropdown(props: LanguageDropdownProps) {
  const { isDisabled = false } = props;
  const i18n = useI18n();
  const languageMenu = useDropdownMenu();

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

  function handleLanguageMenuToggle(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    if (
      event.detail > 0 &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      languageMenu.open();
      return;
    }

    languageMenu.toggle();
  }

  function handlePointerEnter(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDisabled && event.pointerType === "mouse") {
      languageMenu.open();
    }
  }

  function handlePointerLeave(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") {
      languageMenu.close();
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      languageMenu.close();
    }
  }

  function handleLocaleOptionClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    const nextLocale = event.currentTarget.dataset.locale as
      | ELocale
      | undefined;

    if (!nextLocale) {
      return;
    }

    handleSelectLocale(nextLocale);
  }

  useEffect(
    function () {
      if (isDisabled) {
        languageMenu.close();
      }
    },
    [isDisabled],
  );

  let languageDropdown = null;

  if (languageMenu.isOpen) {
    languageDropdown = (
      <div
        className="absolute right-0 top-[calc(100%-1.33px)] z-20 w-10"
        role="listbox"
        aria-label={i18n.t(ETranslationKey.A11yLanguage)}
      >
        <span className="gradient-pointer pointer-events-none absolute left-1/2 top-0 h-[9px] w-[15px] -translate-x-1/2" />

        <div className="gradient-border gradient-border--strong relative mt-[8px] overflow-hidden rounded-md border bg-[color:var(--color-bg)]">
          {i18n.languageOptions.map(function (nextLocale) {
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
                    ? "control-label flex h-10 w-full cursor-pointer items-center justify-center bg-white/12 text-center text-[0.875rem] text-white"
                    : "control-label flex h-10 w-full cursor-pointer items-center justify-center text-center text-[0.875rem] text-white/80 transition-colors duration-200 ease-out hover:bg-white/8 hover:text-white focus-visible:bg-white/8 focus-visible:text-white"
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
    <div
      className="relative border-b-[1.33px] border-transparent py-3"
      ref={languageMenu.containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onBlur={handleBlur}
    >
      <button
        type="button"
        className={
          isDisabled
            ? "subtle-border subtle-border--quiet control-label relative flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border bg-white/5 text-[0.875rem] text-white/50 outline-none"
            : languageMenu.isOpen
              ? "subtle-border subtle-border--quiet control-label relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-white/8 text-[0.875rem] text-white outline-none transition-colors duration-200 ease-out"
              : "subtle-border subtle-border--quiet control-label relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-white/2 text-[0.875rem] text-white outline-none transition-colors duration-200 ease-out hover:bg-white/8 focus-visible:bg-white/8"
        }
        onClick={handleLanguageMenuToggle}
        aria-haspopup="listbox"
        aria-expanded={isDisabled ? false : languageMenu.isOpen}
        disabled={isDisabled}
      >
        <span className="text-center">{currentLocaleLabel}</span>
      </button>

      {languageDropdown}
    </div>
  );
}
