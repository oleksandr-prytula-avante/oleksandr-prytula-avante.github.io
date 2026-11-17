import { SVG_ASSET_PATHS } from "../../constants/assets";
import { UFO_DEPARTURE_DURATION_MS } from "../../hooks/useUfoDeparture";
import { useUfoDeparture } from "../../hooks/useUfoDeparture";
import type { CSSProperties } from "react";

import { SvgImage } from "../SvgImage";

type UfoProps = {
  className: string;
};

export function Ufo({ className }: UfoProps) {
  const isDeparting = useUfoDeparture();
  const resolvedClassName = isDeparting
    ? `${className} ufo--departing`
    : className;
  const style = {
    "--ufo-departure-duration": `${UFO_DEPARTURE_DURATION_MS}ms`,
  } as CSSProperties;

  return (
    <SvgImage
      src={SVG_ASSET_PATHS.skyUfo}
      className={resolvedClassName}
      style={style}
    />
  );
}
