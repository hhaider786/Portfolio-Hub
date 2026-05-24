#!/usr/bin/env node
// Copies portfolio-hub/lib/{motion,a11y,seo,actions} into sibling projects.
// Usage: node scripts/sync-lib.mjs  (run from portfolio-hub/)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HUB_ROOT = path.resolve(__dirname, "..");
const WORKSPACE_ROOT = path.resolve(HUB_ROOT, "..");

const SUBDIRS = ["motion", "a11y", "seo", "actions"];
const TARGETS = ["ecommerce-store", "cafe-restaurant", "luxury-chauffeur"];

async function copyDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function sync() {
  for (const target of TARGETS) {
    const dstRoot = path.join(WORKSPACE_ROOT, target, "lib");
    for (const sub of SUBDIRS) {
      const src = path.join(HUB_ROOT, "lib", sub);
      const dst = path.join(dstRoot, sub);
      try {
        await fs.access(src);
      } catch {
        continue;
      }
      await fs.rm(dst, { recursive: true, force: true });
      await copyDir(src, dst);
      console.log(`[sync-lib] ${target}/lib/${sub}`);
    }
  }
  console.log("[sync-lib] done.");
}

sync().catch((err) => {
  console.error(err);
  process.exit(1);
});
