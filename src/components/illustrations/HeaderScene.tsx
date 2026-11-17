import { SVG_ASSET_PATHS } from "../../constants/assets";
import { SvgImage } from "../SvgImage";
import { Ufo } from "./Ufo";

export function HeaderScene() {
  return (
    <div className="header-scene" aria-hidden="true">
      <SvgImage src={SVG_ASSET_PATHS.nightSky} className="header-scene__sky" />
      <Ufo className="header-scene__ufo" />
    </div>
  );
}
