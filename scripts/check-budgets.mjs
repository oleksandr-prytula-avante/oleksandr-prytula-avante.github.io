import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const limits = {
  js: 420_000,
  css: 80_000,
  image: 1_700_000,
  illustrationSvg: 3_500_000,
};
const failures = [];

function visit(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      visit(path);
      continue;
    }

    const extension = name.split(".").at(-1);
    const limit =
      extension === "js"
        ? limits.js
        : extension === "css"
          ? limits.css
          : extension === "svg"
            ? limits.illustrationSvg
          : ["avif", "webp", "png", "jpg", "jpeg"].includes(extension)
            ? limits.image
            : undefined;
    if (limit && stat.size > limit)
      failures.push(`${path}: ${stat.size} > ${limit}`);
  }
}

visit("dist");
if (failures.length > 0) {
  console.error(`Asset budgets exceeded:\n${failures.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("All production assets are within their size budgets.");
}
