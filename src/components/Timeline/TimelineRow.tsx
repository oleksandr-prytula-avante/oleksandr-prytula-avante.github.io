import type { ReactNode } from "react";

import { TIMELINE_ROW_CLASS_NAME } from "../../constants/timeline";

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
