import { Children, useMemo } from "react";
import type { ReactNode } from "react";

import { SECTION_NAV_ITEMS } from "../constants/sectionNavigation";
import { useActiveSectionHash } from "../hooks/useActiveSectionHash";
import { ESectionId, toSectionHash } from "../utils/sections";

type SectionCarouselProps = {
  children: ReactNode;
};

export function SectionCarousel({ children }: SectionCarouselProps) {
  const { activeHash } = useActiveSectionHash(toSectionHash(ESectionId.About));

  const slideChildren = useMemo(
    function () {
      return Children.toArray(children);
    },
    [children],
  );

  const slides = useMemo(
    function () {
      return SECTION_NAV_ITEMS.map(function ({ href }, index) {
        return {
          href,
          children: slideChildren[index] ?? null,
        };
      });
    },
    [slideChildren],
  );

  const activeIndex = useMemo(
    function () {
      const index = slides.findIndex(function ({ href }) {
        return href === activeHash;
      });

      return index === -1 ? 0 : index;
    },
    [activeHash, slides],
  );

  return (
    <div className="flex h-full min-h-0 flex-col px-10">
      <div className="relative h-full min-h-0 overflow-hidden">
        <div
          className="flex h-full min-h-0 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map(function ({ href, children }) {
            const sectionClassName =
              href === toSectionHash(ESectionId.About)
                ? "h-full w-full shrink-0 overflow-y-hidden py-8 pb-12 px-2 max-[1366px]:px-0"
                : "h-full w-full shrink-0 overflow-hidden py-8 px-2";

            return (
              <section key={href} className={sectionClassName}>
                {children}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
