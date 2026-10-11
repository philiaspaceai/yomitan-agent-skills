# API Reference — `yomitan-tools@0.1.0`

Node >= 22, ESM (`import {openDictionary} from 'yomitan-tools'`). All methods are async unless noted. Mutations are staged in memory until `save()` / `saveAs()`.

## Open / close

| Call | Notes |
|---|---|
| `openDictionary(path)` | Open a `.zip` or extracted directory. Returns `dict` with `.title`, `.version` (1/2/3), `.kind` (`zip`/`dir`), `.path`. |
| `dict.close()` | Release the archive handle. Always call it. |

## Explore

| Call | Notes |
|---|---|
| `dict.listBanks()` | `{index, term[], termMeta[], kanji[], kanjiMeta[], tag[], styles, media[], others[]}` — file names per bank type. |
| `dict.countEntries()` | `{term, termMeta, kanji, kanjiMeta, tag, total}`. Reads every bank — slow on huge dicts, avoid there. |
| `dict.getIndex()` / `dict.setIndex(obj)` | Read / stage replacement `index.json`. `setIndex` is schema-checked and requires non-empty `title` + `revision`. |
| `dict.getBank(bankFile)` | Raw parsed bank array. Throws if the file is not a JSON array. |
| `dict.getEntry(ref)` | `{ref, bankType, entry}` for `{bankFile, entryIndex}`. Throws on out-of-range index. |

## Search (streaming: one bank file at a time, stops at `limit`)

| Call | Notes |
|---|---|
| `dict.searchTerms(q, opts)` | Matches expression, plus effective reading (`reading \|\| expression`) when `includeReading: true` (default). |
| `dict.searchKanji(q, opts)` | Matches field `[0]` (character). |
| `dict.searchTermMeta(q, opts)` | Matches field `[0]` (head expression). |
| `dict.searchKanjiMeta(q, opts)` | Matches field `[0]` (character). |
| `dict.searchTags(q, opts)` | Matches field `[0]` (tag name). |

Options: `match: 'exact'|'prefix'|'includes'` (default `'exact'`), `limit` (default 50, max 5000), `offset` (default 0), `bankFile` (default all banks of that type). Query must be a non-empty string. Each hit: `{ref: {bankFile, bankType, entryIndex}, entry}`.

## Mutations (staged until save; schema-checked; require `format|version` 1/2/3)

| Call | Notes |
|---|---|
| `dict.addEntry(type, tuple, {targetBank?})` | `type`: `term`/`termMeta`/`kanji`/`kanjiMeta`/`tag`. Tuple must be a positional Array (see `tuples.md`). Default target is the highest-numbered bank of that type. Returns the new `ref`. |
| `dict.updateEntry(ref, tuple)` | Schema-checked replace. Returns the normalized `ref`. |
| `dict.deleteEntry(ref)` | Removes the entry at `ref.entryIndex`. Later indexes shift — re-search after deletes. |
| `dict.hasUnsavedChanges()` / `dict.listStaged()` / `dict.discard()` | Staging introspection (sync): pending flag, sorted staged filenames, drop all staged changes. |

## Validate

| Call | Notes |
|---|---|
| `dict.validate()` | Full check incl. staged changes — always run before `save()`. `{valid, version, errors[], warnings[]}`. |
| `dict.validateFile(bankFile)` | Cheap single-file check (`index.json` or one bank). Use for huge dictionaries. |

## Render (lossy Markdown; images stay as `![alt](media/path)` references)

| Call | Notes |
|---|---|
| `dict.render(ref, {maxChars?})` | Entry → Markdown; tags, pitch, frequency, IPA resolved from tag/meta banks. Default cap 20000 chars (`…[truncated]`). |
| `dict.renderRaw(bankType, tuple, opts)` | Same, without a ref. |

## Persist

| Call | Notes |
|---|---|
| `dict.save()` | Atomically persist staged changes to the opened location. |
| `dict.saveAs(newPath)` | Write full image (original + staged) to a new location and continue working there. Zip kind requires a `.zip` target; dir kind requires a directory. Never touches the original. |

## Standalone pure functions

`renderTerm`, `renderKanji`, `renderTag`, `renderMeta`, `renderEntry`, `validateDictionary`, `validateSingleEntry`, `detectVersion`, `splitTags`, `effectiveReading`, `classifyBankFile`.
