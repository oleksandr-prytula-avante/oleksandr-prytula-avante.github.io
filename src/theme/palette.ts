export const enum EPaletteColor {
  Background = "#272727",
  Accent = "#ff652e",
}

function hexToRgbChannels(hex: string): string {
  const normalized = hex.startsWith("#") ? hex.slice(1) : hex;

  if (normalized.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);

  return `${red} ${green} ${blue}`;
}

export function installPaletteCssVars() {
  if (typeof document === "undefined") {
    return;
  }

  const styleId = "app-palette-vars";

  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement("style");
  style.id = styleId;

  const accentRgb = hexToRgbChannels(EPaletteColor.Accent);

  style.textContent = `:root{--color-bg:${EPaletteColor.Background};--color-accent:${EPaletteColor.Accent};--color-accent-rgb:${accentRgb};}`;

  document.head.appendChild(style);
}
