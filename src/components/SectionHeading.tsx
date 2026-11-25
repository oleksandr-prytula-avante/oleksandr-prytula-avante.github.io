import type { ReactNode } from "react";

import { SCALE_X_VISIBLE, SCALE_X_HIDDEN } from "../constants/sections";

type SectionHeadingProps = {
  title: ReactNode;
  layout?: "default" | "mobile";
  animateLine?: boolean;
  isLineVisible?: boolean;
};

export function SectionHeading(props: SectionHeadingProps) {
  const {
    title,
    layout = "default",
    animateLine = false,
    isLineVisible = true,
  } = props;

  const isMobile = layout === "mobile";

  const containerClassName = isMobile
    ? "mb-6 hidden items-center max-[1025px]:flex"
    : "flex items-center";

  const titleClassName =
    "text-xl font-bold uppercase text-white max-[1366px]:text-base";

  const lineClassName =
    "accent-line ml-6 h-px min-w-0 flex-1 origin-left motion-safe:transition-transform motion-safe:duration-500 ease-out max-[640px]:ml-4";

  const lineStyle = animateLine
    ? { transform: isLineVisible ? SCALE_X_VISIBLE : SCALE_X_HIDDEN }
    : undefined;

  return (
    <div className={containerClassName}>
      <span className={titleClassName}>{title}</span>
      <span aria-hidden="true" className={lineClassName} style={lineStyle} />
    </div>
  );
}
