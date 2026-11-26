import { OPTIMIZED_ILLUSTRATION_PATHS } from "../../constants/assets";
import { ResponsiveImage } from "../ResponsiveImage";
import { SkyUfo } from "./SkyUfo";

export function NightSky() {
  return (
    <div className="night-sky" aria-hidden="true">
      <ResponsiveImage
        avifSrc={OPTIMIZED_ILLUSTRATION_PATHS.nightSky.avif}
        fallbackSrc={OPTIMIZED_ILLUSTRATION_PATHS.nightSky.fallback}
        className="night-sky__image"
      />
      <SkyUfo />
    </div>
  );
}
