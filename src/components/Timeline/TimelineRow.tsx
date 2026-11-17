import type { ReactNode } from "react";

const TIMELINE_ROW_CLASS_NAME =
  "flex min-w-0 flex-nowrap items-start gap-x-2 overflow-hidden";

type TimelineRowProps = {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  variant?: "default" | "heading" | "meta";
};

export function TimelineRow(props: TimelineRowProps) {
  const { icon, children, className, variant = "default" } = props;
  const rowClassName = [
    `timeline-row timeline-row--${variant}`,
    TIMELINE_ROW_CLASS_NAME,
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
