import type { CSSProperties } from "react";

import { SECTION_NAV_ITEMS } from "../constants/sections";
import { useI18n } from "../hooks/useI18n";

import "./SectionNavigation.css";

type HeaderNavigationProps = {
  layout: "desktop" | "mobile";
  activeHash: string;
  isAllItemsDisabled?: boolean;
  onItemClick?: () => void;
};

export function HeaderNavigation(props: HeaderNavigationProps) {
  const { layout, activeHash, isAllItemsDisabled = false, onItemClick } = props;
  const i18n = useI18n();

  const items = SECTION_NAV_ITEMS.map(function ({
    href,
    labelKey,
    isDisabled,
  }) {
    const label = i18n.t(labelKey);
    const isActive = href === activeHash;
    const isItemDisabled = isAllItemsDisabled || (isDisabled ?? false);

    if (layout === "mobile") {
      return (
        <a
          key={href}
          className={
            isItemDisabled
              ? "inline-flex w-full cursor-not-allowed py-2 text-white/40 no-underline"
              : isActive
                ? "inline-flex w-full cursor-pointer py-2 text-[color:var(--color-accent)] no-underline"
                : "inline-flex w-full cursor-pointer py-2 no-underline transition-colors duration-200 ease-out hover:text-white/80 focus-visible:text-white/80"
          }
          href={isItemDisabled ? undefined : href}
          aria-current={
            isItemDisabled ? undefined : isActive ? "page" : undefined
          }
          aria-disabled={isItemDisabled || undefined}
          tabIndex={isItemDisabled ? -1 : undefined}
          onClick={isItemDisabled ? undefined : onItemClick}
        >
          {label}
        </a>
      );
    }

    return (
      <a
        key={href}
        className="section-navigation__link"
        href={isItemDisabled ? undefined : href}
        aria-current={
          isItemDisabled ? undefined : isActive ? "page" : undefined
        }
        aria-disabled={isItemDisabled || undefined}
        tabIndex={isItemDisabled ? -1 : undefined}
      >
        <span>{label}</span>
      </a>
    );
  });

  if (layout === "mobile") {
    return items;
  }

  const activeIndex = Math.max(
    0,
    SECTION_NAV_ITEMS.findIndex(({ href }) => href === activeHash),
  );

  return (
    <div
      className="section-navigation"
      data-disabled={isAllItemsDisabled}
      style={{ "--active-section": activeIndex } as CSSProperties}
    >
      {items}
      <span className="section-navigation__indicator" aria-hidden="true" />
    </div>
  );
}
