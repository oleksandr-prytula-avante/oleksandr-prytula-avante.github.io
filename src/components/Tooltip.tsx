import * as React from "react";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

export function Tooltip({
  content,
  children,
}: TooltipProps): React.ReactElement {
  return (
    <span className="relative inline-flex group ml-[8px]">
      {children}
      <span
        className="pointer-events-none absolute left-full top-1/2 z-10 ml-[15px] -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-white/10 px-2 py-1 text-[14px] text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-hover:border-[color:var(--color-accent)] group-focus-within:opacity-100 group-focus-within:border-[color:var(--color-accent)]"
        role="tooltip"
      >
        <span
          className="absolute left-[-7px] top-1/2 z-0 -translate-y-1/2"
          aria-hidden="true"
        >
          <span className="block h-0 w-0 border-b-[6px] border-r-[6px] border-t-[6px] border-b-transparent border-r-white/20 border-t-transparent group-hover:border-r-[color:var(--color-accent)] group-focus-within:border-r-[color:var(--color-accent)]" />
        </span>
        <span className="relative z-12">{content}</span>
      </span>
    </span>
  );
}
