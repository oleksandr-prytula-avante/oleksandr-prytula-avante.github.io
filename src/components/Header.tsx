import { useEffect, useState } from "react";

import {
  MENU_ICON_BUTTON_CLASS,
  MOBILE_HEADER_HORIZONTAL_PADDING_CLASS,
} from "../constants/header";
import { PORTFOLIO_MARK_PATH } from "../constants/assets";
import { useActiveSectionHash } from "../hooks/useActiveSectionHash";
import { useI18n } from "../hooks/useI18n";
import { ESection, toSectionHash } from "../utils/sections";
import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "../constants/mediaQueries";
import { ETranslationKey } from "../i18n/types";

import { LanguageDropdown } from "./LanguageDropdown";
import { Links } from "./Links";
import { MobileLanguageSwitcher } from "./MobileLanguageSwitcher";
import { HeaderNavigation } from "./HeaderNavigation";

type HeaderProps = {
  isLanguageDisabled?: boolean;
  isNavigationDisabled?: boolean;
};

export function Header(props: HeaderProps) {
  const { isLanguageDisabled = false, isNavigationDisabled = false } = props;
  const i18n = useI18n();
  const brandMark = (
    <img
      src={PORTFOLIO_MARK_PATH}
      alt={`Per Aspera Ad Astra — ${i18n.t(ETranslationKey.HeroName)} ${i18n.t(ETranslationKey.HeroSurname)}`}
      width={1828}
      height={448}
      decoding="async"
      className="header-brand"
    />
  );
  const { activeHash } = useActiveSectionHash(toSectionHash(ESection.About));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(function () {
    const mediaQuery = window.matchMedia(DESKTOP_MIN_WIDTH_MEDIA_QUERY);

    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    }

    mediaQuery.addEventListener("change", handleViewportChange);

    return function () {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  useEffect(
    function () {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setIsMobileMenuOpen(false);
    },
    [activeHash],
  );

  function handleMobileMenuToggle() {
    setIsMobileMenuOpen(function (currentValue) {
      return !currentValue;
    });
  }

  function handleMobileMenuClose() {
    setIsMobileMenuOpen(false);
  }

  let mobileMenu = null;

  if (isMobileMenuOpen) {
    mobileMenu = (
      <div
        id="mobile-header-menu"
        className={`fixed inset-0 z-[100] flex h-dvh min-h-dvh w-screen flex-col overflow-y-auto overscroll-contain bg-[color:var(--color-bg)] px-24 ${MOBILE_HEADER_HORIZONTAL_PADDING_CLASS} pb-[max(2.5rem,calc(2.5rem + env(safe-area-inset-bottom)))] pt-0 landscape:pt-[calc(env(safe-area-inset-top)+1rem)]`}
      >
        <div className="mobile-menu-header relative flex h-24 shrink-0 items-center justify-between">
          {brandMark}
          <button
            type="button"
            className={MENU_ICON_BUTTON_CLASS}
            onClick={handleMobileMenuClose}
            aria-label={i18n.t(ETranslationKey.A11yCloseMenu)}
          >
            <span className="accent-line block h-[2px] w-6 translate-y-[4px] rotate-45" />
            <span className="accent-line block h-[2px] w-6 -translate-y-[4px] -rotate-45" />
          </button>
        </div>

        <MobileLanguageSwitcher isDisabled={isLanguageDisabled} />

        <nav className="mt-10 flex flex-col items-center gap-2 text-[1.5rem] uppercase w-[30%] max-[767px]:w-[60%] mx-auto">
          <HeaderNavigation
            layout="mobile"
            activeHash={activeHash}
            isAllItemsDisabled={isNavigationDisabled}
            onItemClick={handleMobileMenuClose}
          />
        </nav>

        <Links size="large" />
      </div>
    );
  }

  return (
    <>
      <header
        className={`site-header flex h-24 w-full shrink-0 items-center justify-between px-0 max-[1024px]:fixed max-[1024px]:left-0 max-[1024px]:right-0 max-[1024px]:top-0 max-[1024px]:z-50 ${MOBILE_HEADER_HORIZONTAL_PADDING_CLASS}`}
      >
        {brandMark}
        <button
          type="button"
          className={`${MENU_ICON_BUTTON_CLASS} min-[1025px]:hidden`}
          onClick={handleMobileMenuToggle}
          aria-label={
            isMobileMenuOpen
              ? i18n.t(ETranslationKey.A11yCloseMenu)
              : i18n.t(ETranslationKey.A11yOpenMenu)
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-header-menu"
        >
          <span
            className={`accent-line block h-[2px] w-6 transition-transform duration-200 ease-out ${isMobileMenuOpen ? "translate-y-[8px] rotate-45" : ""}`}
          />
          <span
            className={`accent-line block h-[2px] w-6 transition-opacity duration-200 ease-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`accent-line block h-[2px] w-6 transition-transform duration-200 ease-out ${isMobileMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
          />
        </button>

        <div className="hidden items-center gap-1 whitespace-nowrap min-[1025px]:flex">
          <nav className="flex items-center gap-1 text-[1.125rem] uppercase">
            <HeaderNavigation
              layout="desktop"
              activeHash={activeHash}
              isAllItemsDisabled={isNavigationDisabled}
            />
          </nav>
          <div className="ml-12">
            <LanguageDropdown isDisabled={isLanguageDisabled} />
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
