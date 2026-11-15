import * as React from "react";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

export function Tooltip(props: TooltipProps): React.ReactElement {
  const { content, children } = props;

  return (
    <span className="relative inline-flex group">
      {children}
      <span
        className="gradient-border gradient-border--strong pointer-events-none absolute left-full top-1/2 z-10 ml-[15px] -translate-y-1/2 whitespace-nowrap rounded-md border bg-white/10 px-2 py-1 text-[0.875rem] text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100 max-[1366px]:bg-white max-[1366px]:text-[color:var(--color-bg)] max-[1024px]:hidden"
        role="tooltip"
      >
        <span
          className="absolute left-[-7px] top-1/2 z-0 -translate-y-1/2"
          aria-hidden="true"
        >
          <span className="gradient-pointer gradient-pointer--left block h-3 w-2" />
        </span>
        <span className="relative z-12">{content}</span>
      </span>
    </span>
  );
}
