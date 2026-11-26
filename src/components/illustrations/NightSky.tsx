import { SVG_ASSET_PATHS } from "../../constants/assets";
import { SvgImage } from "../SvgImage";
import { SkyUfo } from "./SkyUfo";

export function NightSky() {
  return (
    <div className="night-sky" aria-hidden="true">
      <SvgImage src={SVG_ASSET_PATHS.nightSky} className="night-sky__image" />
      <div className="night-sky__left-stars">
        <SvgImage src={SVG_ASSET_PATHS.nightSky} />
      </div>
      <SkyUfo />
    </div>
  );
}
