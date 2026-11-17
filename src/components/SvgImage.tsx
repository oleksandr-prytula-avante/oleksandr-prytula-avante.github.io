import type { ImgHTMLAttributes } from "react";

type SvgImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
};

export function SvgImage({ src, alt = "", ...props }: SvgImageProps) {
  return <img src={src} alt={alt} decoding="async" {...props} />;
}
