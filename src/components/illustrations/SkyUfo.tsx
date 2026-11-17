import { SVG_ASSET_PATHS } from "../../constants/assets";
import { SvgImage } from "../SvgImage";

export function SkyUfo() {
  return <SvgImage src={SVG_ASSET_PATHS.skyUfo} className="night-sky__ufo" />;
}
