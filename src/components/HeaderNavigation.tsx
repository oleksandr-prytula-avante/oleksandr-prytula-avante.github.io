import { SECTION_NAV_ITEMS } from "../constants/sectionNavigation";
import { useI18n } from "../hooks/useI18n";

type HeaderNavigationProps = {
  layout: "desktop" | "mobile";
  activeHash: string;
  onItemClick?: () => void;
};

export function HeaderNavigation(props: HeaderNavigationProps) {
  const { layout, activeHash, onItemClick } = props;
  const i18n = useI18n();

  return SECTION_NAV_ITEMS.map(function ({ href, labelKey, isDisabled }) {
    const label = i18n.t(labelKey);
    const isActive = href === activeHash;
    const isItemDisabled = isDisabled ?? false;

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
          aria-current={isItemDisabled ? undefined : isActive ? "page" : undefined}
          aria-disabled={isItemDisabled || undefined}
          tabIndex={isItemDisabled ? -1 : undefined}
          onClick={onItemClick}
        >
          {label}
        </a>
      );
    }

    return (
      <a
        key={href}
        className={
          isItemDisabled
            ? "inline-flex w-[8rem] cursor-not-allowed justify-center text-white/40 no-underline"
            : isActive
              ? "inline-flex w-[8rem] cursor-pointer justify-center no-underline"
              : "group inline-flex w-[8rem] cursor-pointer justify-center no-underline transition-colors duration-200 ease-out hover:text-white/80 focus-visible:text-white/80"
        }
        href={isItemDisabled ? undefined : href}
        aria-current={isItemDisabled ? undefined : isActive ? "page" : undefined}
        aria-disabled={isItemDisabled || undefined}
        tabIndex={isItemDisabled ? -1 : undefined}
      >
        <span
          className={
            isItemDisabled
              ? "inline-flex border-b-[1.33px] border-transparent py-3"
              : isActive
                ? "inline-flex border-b-[1.33px] border-[color:var(--color-accent)] py-3"
                : "inline-flex border-b-[1.33px] border-transparent py-3 transition-colors duration-200 ease-out group-hover:border-[color:rgb(var(--color-accent-rgb)/0.8)] group-focus-visible:border-[color:rgb(var(--color-accent-rgb)/0.8)]"
          }
        >
          {label}
        </span>
      </a>
    );
  });
}
