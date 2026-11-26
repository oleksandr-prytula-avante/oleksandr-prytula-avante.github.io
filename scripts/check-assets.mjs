import { existsSync, readFileSync } from "node:fs";

const source = readFileSync("src/constants/assets.ts", "utf8");
const paths = [...source.matchAll(/"(\/assets\/[^"?]+)"/g)].map(
  ([, path]) => path,
);
const missing = paths.filter((path) => !existsSync(`public${path}`));

if (missing.length > 0) {
  console.error(`Missing public assets:\n${missing.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Verified ${paths.length} referenced public assets.`);
}
