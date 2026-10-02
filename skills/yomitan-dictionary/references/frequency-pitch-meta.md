# Frequency & Pitch-Accent Meta Banks

`term_meta_bank_N.json` stores per-term metadata that is **not** a definition:
frequency ranks and pitch-accent diagrams. `kanji_meta_bank_N.json` does the same for kanji.

## Layout

Array of 3-field arrays:

```
[ headword, mode, data ]
```

| # | Field | Type | Notes |
|---|---|---|---|
| 0 | headword | string | Must match `term` (or kanji) exactly |
| 1 | mode | string | `"freq"` or `"pitch"` (kanji banks: usually `"freq"`) |
| 2 | data | any | Shape depends on mode (below) |

## freq mode

`data` is either a plain number or an object:

```json
["猫", "freq", 1234]
["猫", "freq", {"value": 1234, "displayValue": "1234『N5』"}]
```

- `value`: the rank/count. Meaning depends on the dictionary's `frequencyMode` in `index.json`:
  - `"occurrence-based"` — number of occurrences in the corpus (higher = more common).
  - `"rank-based"` — 1-based rank (lower = more common). Words missing from the corpus
    are conventionally appended after the ranked list and marked in `displayValue`
    (e.g. a dagger `†` for "added from another list, no occurrence data").
- `displayValue` (optional): string shown in the popup instead of the raw number.

## pitch mode

`data` describes downstep positions:

```json
["猫", "pitch", {"reading": "ねこ", "pitches": [{"position": 1, "nasal": false, "deviced": false}]}]
```

- `reading`: which reading this accent applies to.
- `pitches`: one item per sense/mora pattern; `position` is the downstep mora
  (`0` = heiban/flat, `1` = atamadaka, …).

## frequencyMode (index.json)

Set exactly one, only on frequency dictionaries:

- `"occurrence-based"` — `value` is a raw count.
- `"rank-based"` — `value` is a rank.

Omitting it on a normal definition dictionary is correct. Setting it on a
definition dictionary confuses Yomitan's frequency display — don't.

## Editing meta banks

Meta entries are keyed by exact headword string. When adding frequency data for a
new term, append `["term", "freq", value]` to the last `term_meta_bank_N.json`
(same ≤10000-entries-per-bank split as term banks). The `get`/`add`/`remove`
commands in `scripts/yomitan.mjs` target term banks; edit meta banks by
unpacking and editing the JSON directly, then re-running `validate`.
