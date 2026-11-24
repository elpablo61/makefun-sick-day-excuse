import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Funniest Sick-Day Excuse — one line, 137 characters.
// A micro-anecdote that sounds true: a named kid, a time, one sensory
// detail, and the laugh lands on the last word.
const ENTRY =
  "I won't be in today. A mosquito got my eyelid at 3am and now my eye is swollen shut. Dina, my neighbour's kid, just asked who punched me.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// The gate requires 1-200 characters of non-whitespace text; refuse to
// write an entry that would fail it instead of shipping a bad artifact.
// The length check runs before any file is written so a bad entry can
// never produce a partial artifact in the output directory.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${join(outDir, "entry.txt")}`);
