import type { ReactNode } from "react";

type SectionBannerProps = {
  children: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

export function SectionBanner({
  children,
  trailing,
  className = "",
}: SectionBannerProps) {
  return (
    <div
      className={`hidden min-w-0 items-center gap-3 bg-linear-to-r from-white/5 to-transparent py-2 pl-3 text-sm tracking-wide text-[color:var(--color-accent)] min-[1025px]:flex ${className}`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="h-px min-w-6 flex-1 bg-(image:--line-track-horizontal)"
      />
      {trailing}
    </div>
  );
}
