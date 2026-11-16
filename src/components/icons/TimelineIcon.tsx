import type { ReactNode } from "react";

type TimelineIconProps = {
  children: ReactNode;
  className?: string;
};

export function TimelineIcon({ children, className = "" }: TimelineIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`h-5 w-5 shrink-0 text-white ${className}`.trim()}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}
