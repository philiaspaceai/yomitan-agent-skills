---
name: yomitan-agent-skills
description: Use when working with Yomitan dictionaries in Node.js - searching, reading, rendering, validating, or editing entries with the yomitan-tools library.
---

# Yomitan Agent Skills

Work with Yomitan dictionaries (`.zip` or extracted folder) from Node.js (ESM, Node >= 22) via the `yomitan-tools` library (`npm install yomitan-tools`). Covers JMdict-style term/kanji banks plus term/kanji meta and tag banks — any language, v1/v2/v3, tiny or 600MB+.

## When to Use

- Searching, reading, rendering, validating, or editing a Yomitan dictionary in Node.js.
- Reviewing an entry as Markdown (pitch accent, frequency, tag notes resolved).

## When NOT to Use

- Driving the Yomitan browser extension UI; this is file-level dictionary work.
- Building a dictionary zip from raw sources without `yomitan-tools`.

## Quick Reference

| Goal | Call |
|---|---|
| Open | `openDictionary(path)` (`.zip` or dir) |
| Explore | `listBanks()` |
| Search | `searchTerms(q)` / `searchKanji` / `searchTermMeta` / `searchKanjiMeta` / `searchTags` (`match: exact\|prefix\|includes`, default `exact`; `limit` default 50, max 5000; `offset`, `bankFile`) |
| Read | `getBank(file)` / `getEntry(ref)` |
| Review | `render(ref, {maxChars})` / `renderRaw(type, tuple)` |
| Change (staged) | `addEntry(type, tuple)` / `updateEntry(ref, tuple)` / `deleteEntry(ref)` / `setIndex(obj)` |
| Check | `validate()` (full) / `validateFile(file)` (one file, huge dicts) |
| Persist | `save()` / `saveAs(path)`; inspect `hasUnsavedChanges()` / `listStaged()` / `discard()` |
| Done | `await dict.close()` |

Every search hit carries `ref: {bankFile, bankType, entryIndex}` — pass it back to `getEntry` / `updateEntry` / `deleteEntry` / `render`.

## Core Pattern

```js
import {openDictionary} from 'yomitan-tools';

const dict = await openDictionary('./dict.zip'); // or extracted dir
const hits = await dict.searchTerms('打つ'); // exact on expression/reading
console.log(await dict.render(hits[0].ref)); // Markdown review
await dict.updateEntry(hits[0].ref, [...editedTuple]); // staged only
console.log(await dict.validate()); // validate BEFORE save
await dict.save(); // or saveAs('copy.zip') to keep the original
await dict.close(); // always close
```

## Common Mistakes

- Staging edits without `save()` — nothing persists until `save()` / `saveAs()`.
- Writing tuples as objects — bank entries are positional Arrays (see `references/tuples.md`).
- `countEntries()` / full `validate()` on 600MB+ dicts — use `validateFile()` per touched bank (see `references/workflows.md`).
- Expecting `validate` / `add` / `update` to accept v1 entries with definitions — refused, same as Yomitan itself; read/search/render still work.
- Empty search results — default `match` is `exact`; try `prefix` or `includes`.

## References

- `references/api.md` — full method table, options, standalone functions.
- `references/tuples.md` — exact tuple shapes + valid examples.
- `references/workflows.md` — staged-save, huge-dict, `saveAs`, v1 quirk, media rules.
