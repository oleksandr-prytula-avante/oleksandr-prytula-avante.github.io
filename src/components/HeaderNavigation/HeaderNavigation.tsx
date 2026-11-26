import { SECTION_NAV_ITEMS } from "../../constants/sections";
import { useI18n } from "../../hooks/useI18n";

import "./HeaderNavigation.css";

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

    if (isItemDisabled) {
      return layout === "mobile" ? (
        <span
          key={href}
          className="inline-flex w-full cursor-not-allowed py-2 text-white/40"
          aria-disabled="true"
        >
          {label}
        </span>
      ) : (
        <span
          key={href}
          className="section-navigation__link"
          aria-disabled="true"
        >
          <span>{label}</span>
        </span>
      );
    }

    if (layout === "mobile") {
      return (
        <a
          key={href}
          className={
            isActive
              ? "inline-flex w-full cursor-pointer py-2 text-[color:var(--color-accent)] no-underline"
              : "inline-flex w-full cursor-pointer py-2 text-white no-underline transition-colors duration-200 ease-out hover:text-[color:var(--color-accent)] focus-visible:text-[color:var(--color-accent)]"
          }
          href={href}
          aria-current={isActive ? "page" : undefined}
          onClick={onItemClick}
        >
          {label}
        </a>
      );
    }

    return (
      <a
        key={href}
        className="section-navigation__link"
        href={href}
        aria-current={isActive ? "page" : undefined}
      >
        <span>{label}</span>
      </a>
    );
  });

  if (layout === "mobile") {
    return items;
  }

  return <div className="section-navigation">{items}</div>;
}
