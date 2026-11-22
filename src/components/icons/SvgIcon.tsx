import type { ReactNode, SVGProps } from "react";

type SvgIconProps = SVGProps<SVGSVGElement> & {
  children: ReactNode;
};

export function SvgIcon({ children, ...props }: SvgIconProps) {
  return (
    <svg aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}
