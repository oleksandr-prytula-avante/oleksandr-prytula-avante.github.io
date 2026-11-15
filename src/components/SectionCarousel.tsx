import { Children, useMemo } from "react";
import type { CSSProperties, ReactNode } from "react";

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
  const { activeHash } = useActiveSectionHash(toSectionHash(ESection.About));

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
    <div className="section-carousel relative flex h-full min-h-0 flex-col px-10">
      <div className="section-carousel__meta" aria-hidden="true">
        <span className="section-carousel__count">
          {String(activeIndex + 1).padStart(2, "0")}
          <span> / {String(slides.length).padStart(2, "0")}</span>
        </span>
        <span className="section-carousel__progress">
          <span
            style={{
              transform: `scaleX(${(activeIndex + 1) / slides.length})`,
            }}
          />
        </span>
      </div>
      <div className="section-carousel__stage">
        {slides.map(function ({ href, children }, index) {
          const isActive = index === activeIndex;
          const sectionClassName =
            href === toSectionHash(ESection.About)
              ? "overflow-y-hidden py-8 pb-12 px-2 max-[1366px]:px-0"
              : "overflow-hidden py-8 px-2";

          return (
            <section
              key={href}
              className={`section-carousel__panel ${sectionClassName}`}
              data-active={isActive}
              aria-hidden={!isActive}
              inert={!isActive}
              style={
                {
                  "--section-direction": index < activeIndex ? -1 : 1,
                } as CSSProperties
              }
            >
              {children}
            </section>
          );
        })}
      </div>
    </div>
  );
}
