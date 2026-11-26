import { OPTIMIZED_ILLUSTRATION_PATHS } from "../../constants/assets";
import { ResponsiveImage } from "../ResponsiveImage";

export function MountainMist() {
  return (
    <div className="mountain-mist" aria-hidden="true">
      <ResponsiveImage
        avifSrc={OPTIMIZED_ILLUSTRATION_PATHS.mountainMist.avif}
        fallbackSrc={OPTIMIZED_ILLUSTRATION_PATHS.mountainMist.fallback}
        className="mountain-mist__image"
      />
    </div>
  );
}
