import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useActiveSectionHash } from "../hooks/useActiveSectionHash";
import { useI18n } from "../hooks/useI18n";
import { ESection, toSectionHash } from "../utils/sections";
import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "../constants/mediaQueries";
import { ETranslationKey } from "../i18n/types";

import { LanguageDropdown } from "./LanguageDropdown";
import { Links } from "./Links";
import { MobileLanguageSwitcher } from "./MobileLanguageSwitcher";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeaderScene } from "./illustrations/HeaderScene";
import { MountainMist } from "./illustrations/MountainMist";
import { PortfolioMark } from "./illustrations/PortfolioMark";

const MOBILE_HEADER_HORIZONTAL_PADDING_CLASS =
  "max-[1025px]:px-18 max-[768px]:px-12 max-[640px]:px-8";
const MENU_ICON_BUTTON_CLASS =
  "subtle-border subtle-border--quiet relative flex h-12 w-12 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border bg-white/4 transition-colors duration-200 ease-out hover:bg-white/10 focus-visible:bg-white/10";

type HeaderProps = {
  isLanguageDisabled?: boolean;
  isNavigationDisabled?: boolean;
};

export function Header(props: HeaderProps) {
  const { isLanguageDisabled = false, isNavigationDisabled = false } = props;
  const i18n = useI18n();
  const brandMark = (
    <PortfolioMark
      alt={`Per Aspera Ad Astra – ${i18n.t(ETranslationKey.HeroName)} ${i18n.t(ETranslationKey.HeroSurname)}`}
      className="header-brand"
    />
  );
  const { activeHash } = useActiveSectionHash(toSectionHash(ESection.About));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDialogElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const menu = mobileMenuRef.current;
    if (isMobileMenuOpen && menu && !menu.open) {
      menu.showModal();
    }
  }, [isMobileMenuOpen]);

  useEffect(function () {
    const mediaQuery = window.matchMedia(DESKTOP_MIN_WIDTH_MEDIA_QUERY);

    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) {
        mobileMenuRef.current?.close();
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
      mobileMenuRef.current?.close();
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setIsMobileMenuOpen(false);
    },
    [activeHash],
  );

  function handleMobileMenuClose() {
    mobileMenuRef.current?.close();
    setIsMobileMenuOpen(false);
    mobileMenuButtonRef.current?.focus({ preventScroll: true });
  }

  let mobileMenu = null;

  if (isMobileMenuOpen) {
    mobileMenu = (
      <dialog
        id="mobile-header-menu"
        ref={mobileMenuRef}
        aria-label={i18n.t(ETranslationKey.A11yOpenMenu)}
        onCancel={(event) => {
          event.preventDefault();
          handleMobileMenuClose();
        }}
        className={`fixed inset-0 z-[100] m-0 h-dvh min-h-dvh max-h-none w-screen max-w-none flex-col overflow-x-hidden overflow-y-auto overscroll-contain bg-[color:var(--color-bg)] px-24 pb-[max(2.5rem,calc(2.5rem + env(safe-area-inset-bottom)))] pt-0 text-white open:flex ${MOBILE_HEADER_HORIZONTAL_PADDING_CLASS} landscape:pt-[calc(env(safe-area-inset-top)+1rem)]`}
      >
        <div className="mobile-menu-header relative flex h-24 shrink-0 items-center justify-between">
          <HeaderScene />
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

        <div className="mobile-menu-footer">
          <div className="mobile-menu-footer__links">
            <Links size="large" />
          </div>
          <div className="mobile-menu-footer-scene" aria-hidden="true">
            <MountainMist />
            <HeaderScene />
          </div>
        </div>
      </dialog>
    );
  }

  return (
    <>
      <header
        className={`site-header relative flex h-24 w-full shrink-0 items-center justify-between px-0 max-[1025px]:fixed max-[1025px]:left-0 max-[1025px]:right-0 max-[1025px]:top-0 max-[1025px]:z-50 ${MOBILE_HEADER_HORIZONTAL_PADDING_CLASS}`}
      >
        <HeaderScene />
        {brandMark}
        <button
          ref={mobileMenuButtonRef}
          type="button"
          className={`${MENU_ICON_BUTTON_CLASS} min-[1025px]:hidden`}
          onClick={() => setIsMobileMenuOpen(true)}
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
