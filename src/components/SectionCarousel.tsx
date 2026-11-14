import { Children, useMemo } from "react";
import type { ReactNode } from "react";

import {
  SECTION_NAV_ITEMS,
  NOT_FOUND_INDEX,
  FIRST_SLIDE_INDEX,
} from "../constants/sections";
import { useActiveSectionHash } from "../hooks/useActiveSectionHash";
import { ESection, toSectionHash } from "../utils/sections";

import "./SectionCarousel.css";

type SectionCarouselProps = {
  children: ReactNode;
};

export function SectionCarousel({ children }: SectionCarouselProps) {
  const { activeHash } = useActiveSectionHash();

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

      return index === NOT_FOUND_INDEX ? FIRST_SLIDE_INDEX : index;
    },
    [activeHash, slides],
  );

  return (
    <div className="section-carousel">
      {slides.map(function ({ href, children }, index) {
        const isActive = index === activeIndex;
        const position = isActive
          ? "active"
          : index < activeIndex
            ? "before"
            : "after";
        const sectionClassName =
          href === toSectionHash(ESection.Home)
            ? "h-full w-full shrink-0 overflow-hidden"
            : href === toSectionHash(ESection.About)
              ? "h-full w-full shrink-0 overflow-y-hidden py-8 pb-12 px-12 max-[1366px]:px-10"
              : "h-full w-full shrink-0 overflow-hidden py-8 px-12";

        return (
          <section
            key={href}
            className={`section-carousel-slide ${sectionClassName}`}
            data-position={position}
            inert={!isActive}
            aria-hidden={!isActive}
          >
            {children}
          </section>
        );
      })}
    </div>
  );
}
