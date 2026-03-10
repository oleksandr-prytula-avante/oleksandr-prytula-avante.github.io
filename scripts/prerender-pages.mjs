import { readFileSync, writeFileSync } from "node:fs";

import { render } from "../dist/server/entry-server.js";

const indexPath = "./dist/index.html";
const html = readFileSync(indexPath, "utf8");
const appHtml = render();

const hydratedHtml = html.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
);

writeFileSync(indexPath, hydratedHtml);
