# Tuple Shapes — positional Arrays, NOT objects

Bank entries are positional Arrays. `index.json` requirements are inline code below (not a fenced block): `title` (non-empty string), `revision` (non-empty string), and `format|version` (integer `1`, `2`, or `3`).

## Term (v3, 8 items)

`[expression, reading, definitionTags, rules, score, glossary, sequence, termTags]` — `definitionTags`/`rules`/`termTags` are space-separated strings (`""` = none); `score`/`sequence` are numbers; `glossary` is an array of strings and/or structured-content objects.

```json
["新語", "しんご", "n", "", 0, ["neologism"], -1, ""]
```

## Kanji (v3, 6 items)

`[character, onyomi, kunyomi, tags, meanings, stats]` — readings/tags are space-separated strings; `meanings` is a string array; `stats` is an object with string values.

```json
["亜", "ア", "つ.ぐ", "", ["sub-"], {"strokes": "7"}]
```

## Term meta (v3, 3 items)

`[head, mode, data]` — `mode` is `"freq"`, `"pitch"`, or `"ipa"`. Frequency data is a string/number or `{"value": number}`.

```json
["打つ", "freq", {"value": 1250, "displayValue": "1250"}]
```

## Tag (v3, 5 items)

`[name, category, order, notes, score]` — `order`/`score` are numbers.

```json
["n", "partOfSpeech", 0, "noun", 0]
```
