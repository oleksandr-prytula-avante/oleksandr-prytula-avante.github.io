import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  layout?: "default" | "mobile";
  animateLine?: boolean;
  isLineVisible?: boolean;
};

const SCALE_X_VISIBLE = "scaleX(1)";
const SCALE_X_HIDDEN = "scaleX(0)";

export function SectionHeading(props: SectionHeadingProps) {
  const {
    title,
    layout = "default",
    animateLine = false,
    isLineVisible = true,
  } = props;

  const isMobile = layout === "mobile";

  const containerClassName = isMobile
    ? "flex items-center mb-6 hidden max-[1024px]:flex"
    : "flex items-center";

  const titleClassName =
    "text-xl font-bold uppercase text-white max-[1366px]:text-base";

  const lineClassName = isMobile
    ? "ml-6 inline-block h-[2px] flex-1 origin-left bg-[color:var(--color-accent)]/70 transition-transform duration-500 ease-out"
    : "ml-6 inline-block h-[4px] flex-1 origin-left bg-[color:var(--color-accent)] transition-transform duration-500 ease-out";

  const lineStyle = animateLine
    ? { transform: isLineVisible ? SCALE_X_VISIBLE : SCALE_X_HIDDEN }
    : undefined;

  return (
    <div className={containerClassName}>
      <span className={titleClassName}>{title}</span>
      <span className={lineClassName} style={lineStyle} />
    </div>
  );
}
