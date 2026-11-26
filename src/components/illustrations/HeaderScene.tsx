import { OPTIMIZED_ILLUSTRATION_PATHS } from "../../constants/assets";
import { ResponsiveImage } from "../ResponsiveImage";
import { Ufo } from "./Ufo";

export function HeaderScene() {
  return (
    <div className="header-scene" aria-hidden="true">
      <ResponsiveImage
        avifSrc={OPTIMIZED_ILLUSTRATION_PATHS.nightSky.avif}
        fallbackSrc={OPTIMIZED_ILLUSTRATION_PATHS.nightSky.fallback}
        className="header-scene__sky"
        fetchPriority="low"
      />
      <Ufo className="header-scene__ufo" />
    </div>
  );
}
