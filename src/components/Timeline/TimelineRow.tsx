import type { ReactNode } from "react";

type TimelineRowProps = {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
};

const DEFAULT_ROW_CLASS_NAME =
  "flex min-w-0 flex-nowrap items-center gap-2 overflow-hidden";

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
