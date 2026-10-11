# Workflows

## Staged-save (the only safe mutation flow)

`addEntry` / `updateEntry` / `deleteEntry` / `setIndex` touch memory only. Persist with:

1. Mutate via refs (`{bankFile, bankType, entryIndex}` from search hits).
2. `await dict.validate()` — includes staged changes, so validate **before** save.
3. `await dict.save()` — or `saveAs(path)` to keep the original untouched.
4. Inspect with `hasUnsavedChanges()` / `listStaged()`; undo with `discard()`.

Only the touched bank file is rewritten; everything else stays byte-identical.

## Huge dictionaries (600MB+, 200+ banks)

- Prefer `validateFile(touchedBank)` over full `validate()` (measured full runs: jmnedict 3s, oubunsha 1s, sanseido 31s, jitendex 37s).
- Avoid `countEntries()` (reads every bank).
- Search is streaming (one bank file at a time, stops at `limit`) — keep `limit` small and page with `offset`.

## `saveAs` isolation

- Zip dictionary → target must end with `.zip`; the original file is never touched.
- Extracted directory → target is a new directory materialized from the overlay-resolved image.
- After `saveAs`, you keep working in the new location.

## v1 legacy quirk (upstream Yomitan behavior, mirrored here)

v1 term/kanji schemas declare `maxItems: 5/4`, so v1 entries **with** definitions fail `validate` / `addEntry` / `updateEntry` — under Yomitan's own validators too, not just this library. Reading, searching, and rendering such legacy data still works (handy for migration); fix `index.json` / migrate entries before mutating.

## Validation rules that bite

- `index.json` must sit in the archive root (nested index = error) with non-empty `title` + `revision` and known `format|version`.
- Glossary image paths (`{type:'image'}` and structured-content `{tag:'img'}`) must resolve to real files — missing media is an error.
- Present-but-empty `styles.css` is an error; unknown extra `.json` files and bank-numbering gaps are warnings only.
