---
name: yomitan-dictionary
description: Create, edit, validate, and package Yomitan dictionaries (term banks, frequency and pitch-accent meta banks, kanji banks, tag banks). Use when the user wants to build a new Yomitan dictionary, modify entries in an existing dictionary zip, fix validation errors, or pack a dictionary for import into Yomitan.
---

# Yomitan Dictionary

Work with Yomitan dictionaries (`.zip` archives of `index.json` + `*_bank_N.json` files).
All operations run through one zero-dependency script — no npm install needed,
only system `unzip` + `zip` (preinstalled on most Linux/macOS, Git Bash on Windows).

Script location (relative to this repo): `scripts/yomitan.mjs`

## How It Works

1. **Inspect first** — `validate` a zip (or unpacked dir) to learn its shape before touching it.
2. **Edit unpacked, never in-zip** — `unpack` to a temp dir, `add`/`remove` entries, `validate`, then `pack`.
3. **Keep banks valid** — bank files live at the archive root, numbered from 1 with no gaps, ≤10000 entries each (the script enforces this on write).

## Usage

```bash
SCRIPTS=<repo>/skills/yomitan-dictionary/scripts

# 1. Inspect (read-only, works on zip or dir)
node $SCRIPTS/yomitan.mjs validate ./my-dict.zip

# 2. Edit flow
node $SCRIPTS/yomitan.mjs unpack ./my-dict.zip /tmp/my-dict
node $SCRIPTS/yomitan.mjs get /tmp/my-dict --term "猫"
node $SCRIPTS/yomitan.mjs add /tmp/my-dict --entry '["猫","ねこ","n5", "", 0, ["cat"], 12345, ""]'
node $SCRIPTS/yomitan.mjs remove /tmp/my-dict --term "猫" --reading "ねこ"
node $SCRIPTS/yomitan.mjs validate /tmp/my-dict
node $SCRIPTS/yomitan.mjs pack /tmp/my-dict ./my-dict-v2.zip
```

`get`/`remove` match on `--term` (headword); add `--reading` to narrow to one reading.
`add` also accepts `--file entry.json` instead of `--entry` for long definitions
(structured-content HTML is easier to keep in a file).

## New dictionary from scratch

```bash
mkdir -p /tmp/new-dict
cat > /tmp/new-dict/index.json <<'EOF'
{
  "title": "My Dictionary",
  "format": 3,
  "revision": "1.0.0",
  "author": "Your Name",
  "description": "What this dictionary covers.",
  "sourceLanguage": "ja",
  "targetLanguage": "en"
}
EOF
cat > /tmp/new-dict/tag_bank_1.json <<'EOF'
[["n5", "partOfSpeech", 0, "JLPT N5", 0]]
EOF
cat > /tmp/new-dict/term_bank_1.json <<'EOF'
[["猫", "ねこ", "n5", "", 0, ["cat"], 1, ""]]
EOF
node $SCRIPTS/yomitan.mjs validate /tmp/new-dict
node $SCRIPTS/yomitan.mjs pack /tmp/new-dict ./my-dict.zip
```

Then import `./my-dict.zip` in Yomitan → Dictionaries → Import.

## Output

- `validate` prints `{ ok, title, revision, banks, totalEntries, errors }` as JSON and exits non-zero when invalid. Fix every item in `errors` before packing.
- `get` prints matching entries as JSON (`[{ file, index, entry }]`).
- `add`/`remove` print what changed (`remove` prints `{ removed, remaining }`).

## Present Results to User

- After `validate`: state valid/invalid, title, total entries, and the full error list if any.
- After editing: what was added/removed (term + reading), re-validation result, and the output zip path.
- Never paste whole banks into chat — summarize counts and samples.

## Troubleshooting

- `cannot list zip / need 'unzip'` → install `unzip` + `zip` (`sudo apt install zip unzip`).
- `'add' needs an unpacked dir` → run `unpack` first; in-zip editing is not supported.
- `refusing to pack an invalid dictionary` → run `validate`, fix the listed errors, retry.
- `term entry must have 8 fields` → see `references/dictionary-format.md` for the exact field order.

## Reference files (read on demand, not up front)

- `references/dictionary-format.md` — index.json fields and every bank entry layout.
- `references/frequency-pitch-meta.md` — term_meta_bank modes (`freq`, `pitch`), `frequencyMode` values.
- `references/validation-packaging.md` — validation rules, numbering/splitting, zip layout.
