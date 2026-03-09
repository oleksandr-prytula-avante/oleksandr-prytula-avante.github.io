import { useEffect, useState } from "react";

import { useActiveSectionHash } from "../hooks/useActiveSectionHash";
import { useI18n } from "../hooks/useI18n";
import { ESection, toSectionHash } from "../utils/sections";
import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "../constants/mediaQueries";
import { ETranslationKey } from "../i18n/types";

import { LanguageDropdown } from "./LanguageDropdown";
import { Links } from "./Links";
import { MobileLanguageSwitcher } from "./MobileLanguageSwitcher";
import { HeaderNavigation } from "./HeaderNavigation";

import logoUrl from "../assets/images/logo.webp";

const MOBILE_HEADER_HORIZONTAL_PADDING_CLASS =
  "max-[1024px]:px-18 max-[768px]:px-12 max-[640px]:px-8";
const MENU_ICON_BUTTON_CLASS =
  "flex h-12 w-12 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border border-white/8 bg-white/4 transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:bg-white/10 focus-visible:border-[color:var(--color-accent)] focus-visible:bg-white/10";

type HeaderProps = {
  isLanguageDisabled?: boolean;
  isNavigationDisabled?: boolean;
};

export function Header(props: HeaderProps) {
  const {
    isLanguageDisabled = false,
    isNavigationDisabled = false,
  } = props;
  const i18n = useI18n();
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
        className={`fixed inset-0 z-[100] flex h-dvh w-screen flex-col overflow-y-auto bg-[color:var(--color-bg)] px-24 ${MOBILE_HEADER_HORIZONTAL_PADDING_CLASS} pb-10 pt-0 landscape:pt-[calc(env(safe-area-inset-top)+1rem)]`}
      >
        <div className="flex h-24 items-center justify-between">
          <img
            src={logoUrl}
            alt={i18n.t(ETranslationKey.A11yLogo)}
            className="h-16 w-auto"
          />
          <button
            type="button"
            className={MENU_ICON_BUTTON_CLASS}
            onClick={handleMobileMenuClose}
            aria-label={i18n.t(ETranslationKey.A11yCloseMenu)}
          >
            <span className="block h-[2px] w-6 translate-y-[4px] rotate-45 bg-white" />
            <span className="block h-[2px] w-6 -translate-y-[4px] -rotate-45 bg-white" />
          </button>
        </div>

        <MobileLanguageSwitcher isDisabled={isLanguageDisabled} />

        <nav className="mt-10 flex flex-col items-start gap-2 text-[1.5rem] uppercase">
          <HeaderNavigation
            layout="mobile"
            activeHash={activeHash}
            isAllItemsDisabled={isNavigationDisabled}
            onItemClick={handleMobileMenuClose}
          />
        </nav>

        <Links
          className="mt-auto flex w-full items-center justify-center gap-6 pb-2"
          size="large"
        />
      </div>
    );
  }

  return (
    <>
      <header
        className={`flex h-24 w-full items-center justify-between px-0 max-[1024px]:fixed max-[1024px]:left-0 max-[1024px]:right-0 max-[1024px]:top-0 max-[1024px]:z-50 max-[1024px]:bg-[color:var(--color-bg)] ${MOBILE_HEADER_HORIZONTAL_PADDING_CLASS}`}
      >
        <img
          src={logoUrl}
          alt={i18n.t(ETranslationKey.A11yLogo)}
          className="h-16 w-auto"
        />

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
            className={`block h-[2px] w-6 bg-white transition-transform duration-200 ease-out ${isMobileMenuOpen ? "translate-y-[8px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-opacity duration-200 ease-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-transform duration-200 ease-out ${isMobileMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
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
