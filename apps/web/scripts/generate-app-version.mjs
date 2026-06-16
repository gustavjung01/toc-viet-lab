import { mkdirSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";

function readGitSha() {
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

const git = readGitSha();
const data = {
  version: `${git}-${Date.now()}`,
  git,
  builtAt: new Date().toISOString()
};

const outputPath = join(process.cwd(), "public", "app-version.json");
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);

console.log("Generated public/app-version.json", data.version);
