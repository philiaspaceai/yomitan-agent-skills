# Design: yomitan-agent-skills (publishable agent skill for yomitan-tools)

Date: 2026-10-12
Status: approved sections 1-3, pending spec review
Path: architectural (new public repo + skills.sh publish)

## 1. Intended outcome

A public GitHub repo `philiaspaceai/yomitan-agent-skills` containing one
installable agent skill named `yomitan-agent-skills`, so anyone can run:

```sh
npx skills add philiaspaceai/yomitan-agent-skills
```

Success looks like:
- `npx skills add philiaspaceai/yomitan-agent-skills --list` shows the skill.
- A fresh agent with the skill installed can, without reading the
  yomitan-tools repo: open a `.zip`/dir dictionary, search terms/kanji,
  render an entry to Markdown, stage add/update/delete, validate before
  save, persist with `save()`/`saveAs()`, and always `close()`.
- `SKILL.md` stays under 400 words; heavy detail lives in `references/`.

## 2. Constraints (agreed)

- Language: English (discoverability on skills.sh).
- Scope: full CRUD + validate + render for `yomitan-tools@0.1.0` (Node >= 22, ESM).
- License: GPL-3.0-or-later (matches yomitan-tools).
- Publish now: public repo under `philiaspaceai`, branch `main`, push immediately.
- One skill per repo; `SKILL.md` at repo root (CLI + skills.sh requirement).
- Skill = docs only: no `package.json`, no `scripts/`. Users install the
  library themselves via `npm install yomitan-tools`.

## 3. Approaches considered

- A. Minimal single-file (`SKILL.md` only). Rejected: agents hallucinate
  tuple shapes and fail schema-checked `add`/`update`.
- B. Layered progressive disclosure (CHOSEN): thin `SKILL.md` + three
  reference files. Token-efficient, closes the tuple/hallucination gap.
- C. Batteries-included + `scripts/`. Rejected: overkill for a reference
  skill; script maintenance burden; violates simplicity.

## 4. Repo layout

```text
yomitan-agent-skills/
  SKILL.md            # <400 words, frontmatter name + description
  README.md           # GitHub landing + install command
  LICENSE           # GPL-3.0-or-later text
  references/
    api.md            # method table + options
    tuples.md         # exact tuple positions + one valid example per type
    workflows.md      # staged-save, huge-dict, saveAs, v1 quirk, media rules
```

## 5. SKILL.md design

Frontmatter:

```yaml
---
name: yomitan-agent-skills
description: Use when working with Yomitan dictionaries in Node.js - searching, reading, rendering, validating, or editing entries with the yomitan-tools library.
---
```

Body order: Overview (2 sentences) -> When to Use / When NOT ->
Quick reference table (open/search/render/validate/stage/save) ->
Core pattern code block (open -> search -> render -> validate-before-save ->
save -> close; always `close()`; `saveAs` for copies) ->
Common mistakes (forgot `save()`, tuple as object instead of array,
`countEntries` on 600MB dicts, v1 `validate` refusal, default `exact` match) ->
pointers to `references/`.

Keywords for discovery: yomitan, yomitan-tools, JMdict, dictionary,
term_bank, kanji, pitch accent, Node.js, ESM.

## 6. References design

- `api.md`: 14 methods (`openDictionary`, `listBanks`, `countEntries`,
  `getIndex`/`setIndex`, `getBank`/`getEntry`, `searchTerms`,
  `searchKanji`/`searchTermMeta`/`searchKanjiMeta`/`searchTags`,
  `addEntry`, `updateEntry`/`deleteEntry`, `validate`/`validateFile`,
  `render`/`renderRaw`, `hasUnsavedChanges`/`listStaged`/`discard`,
  `save`/`saveAs`, `close`) with option defaults
  (`match: exact|prefix|includes`, `limit` default 50 max 5000, `offset`,
  `bankFile`, `includeReading`, `targetBank`, `maxChars`) + standalone pure
  functions (`renderTerm`, `renderKanji`, `renderTag`, `renderMeta`,
  `renderEntry`, `validateDictionary`, `validateSingleEntry`, `splitTags`,
  `effectiveReading`, `classifyBankFile`).
- `tuples.md`: term v3 8-tuple positions, kanji v3 6-tuple, meta 3-tuple,
  tag 5-tuple, index.json required fields — each with one valid example.
- `workflows.md`: staged-save rule, `validate()` before `save()`,
  huge-dict guidance (`validateFile` per touched bank; avoid full
  `validate()`/`countEntries`; measured jmnedict 3s, oubunsha 1s,
  sanseido 31s, jitendex 37s), `saveAs` isolation (zip->.zip, dir->dir),
  v1 quirk (read/search/render work; validate/add/update refuse, same as
  Yomitan), media-reference errors, empty `styles.css` error, bank-gap
  warnings, index-in-root + non-empty title/revision rules.

## 7. Data flow (agent runtime)

`npm install yomitan-tools` (Node >= 22, ESM `import`) ->
`openDictionary(zip|dir)` -> `listBanks()` -> `searchTerms` (streaming per
bank file, stops at `limit`) -> `render(ref)` for human review ->
stage mutations via ref `{bankFile, bankType, entryIndex}` ->
`validate()` before `save()` -> `save()` or `saveAs(path)` -> `close()`.

## 8. Error handling (documented, not coded)

- `addEntry`/`updateEntry`/`setIndex` throw on schema failure (Ajv summary).
- Mutations require recognized `format|version` 1/2/3, else throw.
- Search query must be a non-empty string; unknown match mode throws.
- `saveAs` on zip kind requires `.zip` target.
- Rendering never fails on auxiliary (tag/meta) data; core entry wins.
- Missing media files = errors; bank numbering gaps = warnings;
  present-but-empty `styles.css` = error.

## 9. Verification

1. Frontmatter has `name` + `description`; body > 200 chars, has a heading,
   `SKILL.md` < 500 lines.
2. `npx skills add philiaspaceai/yomitan-agent-skills --list` succeeds.
3. Smoke install into a scratch agent scope succeeds.
4. Retrieval test: fresh agent answers tuple shape, staged-save rule, and
   `validateFile`-for-huge-dicts without opening the yomitan-tools repo.
5. No secrets in repo; only docs + LICENSE.

## 10. Publish steps

1. `git branch -M main` (local repo is on `master`, empty).
2. `gh repo create philiaspaceai/yomitan-agent-skills --public --source=. --push`.
3. Verify `npx skills add philiaspaceai/yomitan-agent-skills --list`.
4. skills.sh indexes via GitHub scrape (no submit button); install works
   immediately after push.
