import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "fix: stopped the crash by saving the bad input; the database is now corrupted, but quietly";

function validateEntry(entry: string): void {
  const lines = entry.split("\n");
  if (lines.length !== 1) {
    throw new Error(`entry must be exactly one line, got ${lines.length}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (entry.length > 100) {
    throw new Error(`entry is ${entry.length} chars, over the 100-char limit`);
  }
}

function main(): void {
  validateEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf-8");
}

main();
