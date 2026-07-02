import type { ReactNode } from "react";

type TimelineRowProps = {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
};

export const TIMELINE_ROW_ICON_CLASS = "h-5 w-5 shrink-0 text-white";
export const TIMELINE_ROW_INLINE_CONTENT_CLASS =
  "inline-flex min-w-0 max-w-full items-center gap-x-2 gap-y-0 truncate";

const DEFAULT_ROW_CLASS_NAME =
  "flex min-w-0 flex-nowrap items-start gap-x-2 overflow-hidden";

export function TimelineRow(props: TimelineRowProps) {
  const { icon, children, className } = props;
  const rowClassName = className
    ? `${DEFAULT_ROW_CLASS_NAME} ${className}`
    : DEFAULT_ROW_CLASS_NAME;

  return (
    <div className={rowClassName}>
      {icon}
      {children}
    </div>
  );
}
