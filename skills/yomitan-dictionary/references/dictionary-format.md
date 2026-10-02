# Dictionary Format

Yomitan dictionaries are zip archives. All data files sit at the **archive root**
(no subdirectories, except optional media). Format version is `3`.

Official schemas: `yomidevs/yomitan/ext/data/schemas/`.

## index.json

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Display name |
| `format` | yes | Must be `3` |
| `revision` | yes | Free-form version string, e.g. `"1.0.0"` |
| `sequenced` | no | `true` if `sequence` numbers in term banks are meaningful (merges definitions across banks) |
| `frequencyMode` | no | Only for frequency dictionaries: `"occurrence-based"` or `"rank-based"` |
| `author`, `description`, `url` | no | Include as much as possible |
| `attribution` | no | License/credit text (required when reusing JMdict etc.) |
| `sourceLanguage`, `targetLanguage` | no | e.g. `"ja"` / `"en"` |
| `isUpdatable`, `indexUrl`, `downloadUrl` | no | Enables Yomitan's "Check for Updates" |

## term_bank_N.json — dictionary entries

Array of 8-field arrays:

```
[ term, reading, definitionTags, rules, score, definitions, sequence, termTags ]
```

| # | Field | Type | Notes |
|---|---|---|---|
| 0 | term | string | Headword as written |
| 1 | reading | string | Kana reading (`""` if none) |
| 2 | definitionTags | string | Space-separated tag names, must exist in a tag bank |
| 3 | rules | string | Deinflection rules, usually `""` (verbs/adjectives may use e.g. `"v1"`) |
| 4 | score | number | Sort priority, usually `0` |
| 5 | definitions | string[] | One or more glosses. May also use structured-content objects (nested `{tag, content}`) for rich HTML |
| 6 | sequence | number | Groups related entries when `sequenced: true` |
| 7 | termTags | string | Space-separated dictionary-level tags |

Example:

```json
["猫", "ねこ", "n5", "", 0, ["cat"], 12345, ""]
```

## kanji_bank_N.json — kanji viewer data

Array of 6-field arrays:

```
[ kanji, onyomi, kunyomi, tags, meanings, stats ]
```

Example:

```json
["猫", "ビョウ", "ねこ", "", ["cat"], {"strokes": 11}]
```

## tag_bank_N.json — tag definitions

Array of 5-field arrays:

```
[ name, category, order, notes, score ]
```

`category` is one of: `partOfSpeech`, `dictionary`, `frequency`, `pitch-accent-dictionary`, etc.
Referenced by `definitionTags`/`termTags` in term banks — every tag name used there
should have an entry here (Yomitan tolerates missing tags, but validation warns).

Example:

```json
["n5", "partOfSpeech", 0, "JLPT N5", 0]
```

## styles.css (optional)

Custom CSS placed at the archive root, applied to this dictionary's viewer entries.
