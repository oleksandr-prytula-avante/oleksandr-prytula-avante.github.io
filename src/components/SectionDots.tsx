import { SECTION_NAV_ITEMS } from "../constants/sections";
import { useActiveSectionHash } from "../hooks/useActiveSectionHash";
import { useI18n } from "../hooks/useI18n";
import { ETranslationKey } from "../i18n/types";
import { ESection, toSectionHash } from "../utils/sections";

export function SectionDots() {
  const i18n = useI18n();
  const { activeHash } = useActiveSectionHash(toSectionHash(ESection.About));

  return (
    <nav
      className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 max-[1280px]:right-5"
      aria-label={i18n.t(ETranslationKey.A11ySectionNavigation)}
    >
      {SECTION_NAV_ITEMS.map(function ({ href, labelKey, isDisabled }) {
        const label = i18n.t(labelKey);
        const isActive = href === activeHash;
        const isItemDisabled = isDisabled ?? false;

        return (
          <a
            key={href}
            href={isItemDisabled ? undefined : href}
            aria-label={label}
            aria-current={
              isItemDisabled ? undefined : isActive ? "page" : undefined
            }
            aria-disabled={isItemDisabled || undefined}
            tabIndex={isItemDisabled ? -1 : undefined}
            className={
              isItemDisabled
                ? "h-[15px] w-[15px] cursor-not-allowed rounded-full border border-white/40 bg-transparent"
                : isActive
                  ? "h-[15px] w-[15px] cursor-pointer rounded-full border-2 border-white bg-[color:var(--color-accent)]"
                  : "h-[15px] w-[15px] cursor-pointer rounded-full border border-white bg-transparent transition-colors duration-200 ease-out hover:border-[color:rgb(var(--color-accent-rgb)/0.85)] focus-visible:border-[color:rgb(var(--color-accent-rgb)/0.85)]"
            }
          />
        );
      })}
    </nav>
  );
}
