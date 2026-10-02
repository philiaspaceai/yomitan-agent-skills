# Validation & Packaging

## Validation rules (`validate` command)

Failures (each reported as one string in `errors`):

1. `index.json` missing at root, unparseable, or missing `title` (non-empty string),
   `format: 3`, `revision` (non-empty string).
2. Unexpected filenames — only `index.json`, `*_bank_N.json`, and `styles.css` are allowed at root.
3. Bank numbering must start at `1` and be contiguous **per kind**
   (`term_bank_1, term_bank_2, …` with no gaps). Kinds: `term_bank`,
   `term_meta_bank`, `kanji_bank`, `kanji_meta_bank`, `tag_bank`.
4. Every bank file must be a JSON array; empty banks are rejected.
5. Entry shapes (first 200 entries per file are checked):
   - term bank: 8 fields, `term`/`reading` strings, `definitions` array, `sequence` number.
   - term/kanji meta bank: 3 fields, headword + mode strings.
   - kanji bank: 6 fields. tag bank: 5 fields, `name` string.
6. At least one `*_bank_N.json` must exist.

## Bank splitting

- Keep each bank file at **≤10000 entries**. The `add` command appends to the last
  `term_bank_N.json` and rolls over to `N+1` automatically; `remove` recompacts and
  renumbers so no gaps remain.
- Real-world dictionaries use 2000–10000 per bank; any value in that range imports fine.

## Packaging (`pack` command)

1. `validate` the unpacked dir first — `pack` refuses invalid input.
2. Zip from **inside** the dir so files land at the archive root:
   `zip -9 -r out.zip . -i '*.json' '*.css'` (this is what `pack` runs).
3. Highest compression (`-9`). Name the file `<Title> v<revision>.zip`.
4. Never place banks in a subfolder — Yomitan ignores nested JSON.

## Round-trip checklist (for agents)

```
validate dict.zip        → read title, counts, errors
unpack dict.zip workdir  → edit JSON
validate workdir         → must print "ok": true
pack workdir out.zip     → validate out.zip once more
```

Import test: Yomitan → Settings → Dictionaries → Import `out.zip`,
then look up one added term and one untouched term.
