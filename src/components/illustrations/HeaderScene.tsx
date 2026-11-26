import { SVG_ASSET_PATHS } from "../../constants/assets";
import { Ufo } from "./Ufo";

export function HeaderScene() {
  return (
    <div className="header-scene" aria-hidden="true">
      <div
        className="header-scene__sky"
        style={{ backgroundImage: `url(${SVG_ASSET_PATHS.nightSky})` }}
      />
      <Ufo className="header-scene__ufo" />
    </div>
  );
}
