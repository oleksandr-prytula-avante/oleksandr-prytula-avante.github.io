import { SVG_ASSET_PATHS } from "../../constants/assets";
import { SvgImage } from "../SvgImage";

type OrbitalAvatarProps = {
  alt?: string;
  className?: string;
};

export function OrbitalAvatar({ alt = "", className }: OrbitalAvatarProps) {
  return (
    <SvgImage
      src={SVG_ASSET_PATHS.orbitalAvatar}
      alt={alt}
      className={className}
    />
  );
}
