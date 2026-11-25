// The 3 AM Excuse — make.fun entry
// Writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falls back to a local output/ directory when the env var is absent).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My keys unionized: no signatures between midnight and sunrise, so at 3 AM I am a paperweight with opinions \u2014 and the union says no.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
