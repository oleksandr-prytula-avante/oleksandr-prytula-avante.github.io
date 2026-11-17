import { SVG_ASSET_PATHS } from "../../constants/assets";
import { SvgImage } from "../SvgImage";

type PortfolioMarkProps = {
  alt: string;
  className?: string;
};

export function PortfolioMark({ alt, className }: PortfolioMarkProps) {
  return (
    <SvgImage
      src={SVG_ASSET_PATHS.portfolioMark}
      alt={alt}
      width={1828}
      height={448}
      className={className}
    />
  );
}
