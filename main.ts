// The 3 AM Excuse — make.fun entry
// Writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falls back to a local output/ directory when the env var is absent).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Kit gate (RULES.txt): entry.txt must be UTF-8 text of 1–200 chars,
// not whitespace-only. The entry is a single line, no trailing newline.
const GATE = { minChars: 1, maxChars: 200 } as const;

function buildEntryLine(): string {
  return (
    "My keys unionized: no signatures between midnight and sunrise, " +
    "so at 3 AM I am a paperweight with opinions \u2014 and the union says no."
  );
}

function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");
}

function main(): void {
  const entry = buildEntryLine();
  if (entry.length < GATE.minChars || entry.length > GATE.maxChars) {
    throw new Error(
      `entry is ${entry.length} chars, outside gate ${GATE.minChars}–${GATE.maxChars}`,
    );
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (entry.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
}

main();
