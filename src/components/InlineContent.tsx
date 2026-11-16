import type { ReactNode } from "react";

type InlineContentProps = {
  children: ReactNode;
  inline?: boolean;
  stackOnMobile?: boolean;
};

export function InlineContent({
  children,
  inline = true,
  stackOnMobile = false,
}: InlineContentProps) {
  const className = [
    inline
      ? "inline-flex min-w-0 max-w-full items-center gap-x-2 gap-y-0 truncate"
      : "",
    stackOnMobile
      ? "max-[640px]:flex-col max-[640px]:items-start max-[640px]:overflow-visible max-[640px]:whitespace-normal"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={className || undefined}>{children}</span>;
}
