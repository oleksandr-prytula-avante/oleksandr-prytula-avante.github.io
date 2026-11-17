import { SVG_ASSET_PATHS } from "../../constants/assets";
import { SvgImage } from "../SvgImage";

export function MountainMist() {
  return (
    <div className="mountain-mist" aria-hidden="true">
      <SvgImage
        src={SVG_ASSET_PATHS.mountainMist}
        className="mountain-mist__image"
      />
    </div>
  );
}
