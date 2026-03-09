import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  className?: string;
  titleClassName?: string;
  lineClassName?: string;
  animateLine?: boolean;
  isLineVisible?: boolean;
};

const SCALE_X_VISIBLE = "scaleX(1)";
const SCALE_X_HIDDEN = "scaleX(0)";

export function SectionHeading(props: SectionHeadingProps) {
  const {
    title,
    className,
    titleClassName,
    lineClassName,
    animateLine = false,
    isLineVisible = true,
  } = props;

  const lineStyle = animateLine
    ? { transform: isLineVisible ? SCALE_X_VISIBLE : SCALE_X_HIDDEN }
    : undefined;

  return (
    <div className={`flex items-center ${className ?? ""}`.trim()}>
      <span
        className={
          titleClassName ??
          "text-xl font-bold uppercase text-white max-[1366px]:text-base"
        }
      >
        {title}
      </span>
      <span
        className={
          lineClassName ??
          "ml-6 inline-block h-[4px] flex-1 origin-left bg-[color:var(--color-accent)] transition-transform duration-500 ease-out"
        }
        style={lineStyle}
      />
    </div>
  );
}
