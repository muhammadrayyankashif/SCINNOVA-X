import fs from "node:fs";
import path from "node:path";

const rawInput = process.argv[2];
if (!rawInput) {
  console.error("Usage: npm run set-domain -- https://your-custom-domain.com");
  process.exit(1);
}

let parsed;
try {
  parsed = new URL(rawInput);
} catch {
  console.error(`Invalid URL: ${rawInput}`);
  process.exit(1);
}

if (!["http:", "https:"].includes(parsed.protocol)) {
  console.error("URL must start with http:// or https://");
  process.exit(1);
}

const nextOrigin = parsed.href.replace(/\/+$/, "");
const rootDir = process.cwd();
const pkgPath = path.join(rootDir, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const canonicalMatch = indexHtml.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
if (!canonicalMatch) {
  console.error("Could not detect current canonical origin in index.html");
  process.exit(1);
}

const currentOrigin = canonicalMatch[1].replace(/\/+(?:index\.html)?$/, "");
const targets = [
  "index.html",
  "about.html",
  "modules.html",
  "faqs.html",
  "core-team.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
];

let updated = 0;
for (const rel of targets) {
  const full = path.join(rootDir, rel);
  if (!fs.existsSync(full)) continue;
  const content = fs.readFileSync(full, "utf8");
  if (!content.includes(currentOrigin)) continue;
  const replaced = content.split(currentOrigin).join(nextOrigin);
  fs.writeFileSync(full, replaced, "utf8");
  updated += 1;
}

pkg.homepage = `${nextOrigin}/`;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");

console.log(`Updated origin across ${updated} file(s): ${currentOrigin} -> ${nextOrigin}`);
