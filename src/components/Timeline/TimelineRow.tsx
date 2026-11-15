import type { ReactNode } from "react";

type TimelineRowProps = {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  variant?: "default" | "heading" | "meta";
};

const DEFAULT_ROW_CLASS_NAME =
  "flex min-w-0 flex-nowrap items-start gap-x-2 overflow-hidden";

export function TimelineRow(props: TimelineRowProps) {
  const { icon, children, className, variant = "default" } = props;
  const rowClassName = [
    `timeline-row timeline-row--${variant}`,
    DEFAULT_ROW_CLASS_NAME,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rowClassName}>
      {icon}
      {children}
    </div>
  );
}
