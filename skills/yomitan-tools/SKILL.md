---
name: yomitan-tools
description: Use when working with Yomitan dictionaries in Node.js - searching, reading, rendering, validating, or editing entries with the yomitan-tools library.
---

# Yomitan Tools

Work with Yomitan dictionaries (`.zip` or folder) from Node.js (ESM, >= 22) via `yomitan-tools` (`npm install yomitan-tools`): term/kanji banks plus term/kanji meta and tag banks — any language, v1/v2/v3, tiny or 600MB+.

## When to Use

- Searching, reading, rendering, validating, or editing a Yomitan dictionary.
- Reviewing an entry as Markdown (pitch, frequency, tag notes resolved).

## When NOT to Use

- Driving the Yomitan browser extension UI (this is file-level work).
- Building a dictionary from raw sources without `yomitan-tools`.
- Deciding entry content (senses, equivalents, labels, examples) — use the `lexicography` skill; this skill covers only file-level mechanics.

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
| Persist | `save()` / `saveAs(path)` (`hasUnsavedChanges()` / `listStaged()` / `discard()` to inspect) |
| Done | `await dict.close()` |

Every hit carries `ref: {bankFile, bankType, entryIndex}` — pass it back to `getEntry` / `updateEntry` / `deleteEntry` / `render`.

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

- Staging edits without `save()` — nothing persists.
- Tuples as objects — entries are positional Arrays (see `references/tuples.md`).
- `countEntries()` / full `validate()` on 600MB+ dicts — use `validateFile()` per bank (see `references/workflows.md`).
- Expecting `validate` / `add` / `update` to accept v1 entries with definitions — refused like Yomitan itself; read/search/render still work.
- Empty results — default `match` is `exact`; try `prefix` or `includes`.

## References

- `references/api.md` — methods, options, standalone functions.
- `references/tuples.md` — tuple shapes + examples.
- `references/workflows.md` — staged-save, huge dicts, `saveAs`, v1 quirk, media.
