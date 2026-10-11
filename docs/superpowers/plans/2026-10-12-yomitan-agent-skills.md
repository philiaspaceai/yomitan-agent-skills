# yomitan-agent-skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish public repo `philiaspaceai/yomitan-agent-skills` with an installable `SKILL.md` + `references/` teaching Node.js usage of `yomitan-tools@0.1.0`.

**Architecture:** Docs-only skill repo (no `package.json`, no `scripts/`): thin `SKILL.md` (<400 words) with progressive disclosure into three `references/` files, plus `README.md` landing and GPL-3.0 `LICENSE` copied from yomitan-tools.

**Tech Stack:** Markdown + YAML frontmatter; Node >= 22 + `yomitan-tools@0.1.0` (verification only); `gh` CLI (publish); `npx skills` CLI (verification).

**Spec:** `docs/superpowers/specs/2026-10-12-yomitan-agent-skills-design.md`

## Global Constraints

- Skill name is exactly `yomitan-agent-skills`; repo is `philiaspaceai/yomitan-agent-skills`, public, branch `main`.
- Frontmatter description is verbatim: `Use when working with Yomitan dictionaries in Node.js - searching, reading, rendering, validating, or editing entries with the yomitan-tools library.`
- `SKILL.md` at repo root; body < 400 words, > 200 chars, at least one heading, file < 500 lines.
- Library floor: Node >= 22, ESM `import`, `yomitan-tools@0.1.0`; search defaults `match: exact`, `limit: 50` (max 5000).
- License: GPL-3.0-or-later, `LICENSE` copied byte-identical from yomitan-tools.
- No secrets in repo; commit each task separately.

## Review Focus

- V1-dictionary user hits `validate`/`add` refusal and thinks the skill is broken → expect `references/workflows.md` to document the v1 quirk (test in Task 2, Step 5).
- Huge-dictionary user runs full `validate()`/`countEntries()` and hangs → expect `SKILL.md` mistakes list + `workflows.md` to prescribe `validateFile()` (tests in Task 1 Step 4, Task 2 Step 5).
- Agent authors a tuple as an object instead of a positional array → expect every `tuples.md` example to parse as a JSON Array (test in Task 2, Step 4).
- Agent stages `add`/`update`/`delete` but never calls `save()` → expect `SKILL.md` core pattern to contain a `save()` call (test in Task 1, Step 4).
- `searchTerms('打ち')` returns `[]` because default match is `exact` → expect `SKILL.md` to state the `exact` default and `prefix|includes` opts (test in Task 1, Step 4).

---

### Task 1: SKILL.md (root)

**Files:**
- Create: `SKILL.md`
- Test: inline `node` verification commands below (no test files; docs-only repo)

**Interfaces:**
- Consumes: spec sections 4–5 (frontmatter values, body order, keyword list).
- Produces: `SKILL.md` with frontmatter `name: yomitan-agent-skills` + verbatim description; body pointers to `references/api.md`, `references/tuples.md`, `references/workflows.md` (Task 2 must create exactly these paths).

- [ ] **Step 1: Write `SKILL.md`** with YAML frontmatter (`name`, verbatim `description`) then body in this order: Overview (2 sentences) → When to Use / When NOT → Quick reference table (open/search/render/validate/stage/save) → Core pattern `js` code block (open → search → render → validate-before-save → save → close; includes `await dict.close()` and a `saveAs` comment) → Common mistakes (missing `save()`, tuple-as-object, `countEntries` on 600MB dicts, v1 validate refusal, default `exact` match) → pointers to the three `references/` files. Body < 400 words. Include keywords: yomitan, yomitan-tools, JMdict, term_bank, pitch accent, ESM.

- [ ] **Step 2: Verify frontmatter and shape.** Run:

```bash
node --input-type=module -e "
import {readFileSync} from 'node:fs';
const raw = readFileSync('SKILL.md','utf8');
const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!m) throw new Error('missing frontmatter block');
const [ , fm, body ] = m;
if (!fm.includes('name: yomitan-agent-skills')) throw new Error('bad name');
if (!fm.includes('Use when working with Yomitan dictionaries in Node.js')) throw new Error('bad description');
const words = body.trim().split(/\s+/).length;
if (words >= 400) throw new Error('body too long: ' + words);
if (body.length <= 200) throw new Error('body too short');
if (!/^#/m.test(body)) throw new Error('no heading');
if (raw.split('\n').length >= 500) throw new Error('too many lines');
for (const s of ['save()','exact','references/api.md','references/tuples.md','references/workflows.md']) {
  if (!body.includes(s)) throw new Error('body missing: ' + s);
}
console.log('SKILL.md OK, body words:', words);
"
```

Expected: prints `SKILL.md OK, body words: N` with N < 400.

- [ ] **Step 3: Commit.**

```bash
git add SKILL.md
git commit -m "feat: add yomitan-agent-skills SKILL.md"
```

### Task 2: references/ (api, tuples, workflows)

**Files:**
- Create: `references/api.md`, `references/tuples.md`, `references/workflows.md`
- Test: inline `node` verification commands below

**Interfaces:**
- Consumes: `SKILL.md` pointer paths (must match exactly); spec sections 6–8 (method table, tuple positions, workflow rules, timings).
- Produces: three reference files; `tuples.md` examples that pass `validateSingleEntry` at version 3.

- [ ] **Step 1: Write `references/api.md`** — table of all 14 entry points with exact names (`openDictionary`, `listBanks`, `countEntries`, `getIndex`/`setIndex`, `getBank`/`getEntry`, `searchTerms`, `searchKanji`/`searchTermMeta`/`searchKanjiMeta`/`searchTags`, `addEntry`, `updateEntry`/`deleteEntry`, `validate`/`validateFile`, `render`/`renderRaw`, `hasUnsavedChanges`/`listStaged`/`discard`, `save`/`saveAs`, `close`) plus option defaults (`match: exact|prefix|includes`, `limit` default 50 max 5000, `offset`, `bankFile`, `includeReading`, `targetBank`, `maxChars`) plus the ref shape `{bankFile, bankType, entryIndex}` and standalone pure functions (`renderTerm`, `renderKanji`, `renderTag`, `renderMeta`, `renderEntry`, `validateDictionary`, `validateSingleEntry`, `splitTags`, `effectiveReading`, `classifyBankFile`).

- [ ] **Step 2: Write `references/tuples.md`** — exact positions: term v3 8-tuple `[expression, reading, definitionTags, rules, score, glossary, sequence, termTags]`; kanji v3 6-tuple `[character, onyomi, kunyomi, tags, meanings, stats]`; term/kanji meta 3-tuple `[head, mode, data]`; tag 5-tuple `[name, category, order, notes, score]`; `index.json` requires non-empty `title` + `revision` and `format|version` 1/2/3 (stated as inline code, not a fenced `json` block, so every fenced `json` block in the file is a positional Array). Each of term / kanji / meta / tag gets exactly one valid fenced `json` example that is a positional Array (term example: `["新語","しんご","n","","0",["neologism"],-1,""]`).

- [ ] **Step 3: Write `references/workflows.md`** — staged-save rule (`add`/`update`/`delete`/`setIndex` staged → `validate()` before `save()` → `save()`/`saveAs()`; `listStaged`/`discard`/`hasUnsavedChanges`); huge-dict rule (`validateFile()` per touched bank; avoid full `validate()`/`countEntries()`; timings jmnedict 3s, oubunsha 1s, sanseido 31s, jitendex 37s); `saveAs` isolation (zip→`.zip`, dir→dir, original untouched); v1 quirk paragraph (read/search/render work; `validate`/`add`/`update` refuse, same as Yomitan); media-reference errors, empty `styles.css` error, bank-gap warnings, index-in-root rule.

- [ ] **Step 4: Verify tuple examples are Arrays and schema-valid at version 3.** Run:

```bash
rm -rf /tmp/opencode/skill-verify && mkdir -p /tmp/opencode/skill-verify && npm init -y --prefix /tmp/opencode/skill-verify >/dev/null 2>&1 && npm install --prefix /tmp/opencode/skill-verify yomitan-tools@0.1.0 >/dev/null 2>&1
node --input-type=module -e "
import {readFileSync} from 'node:fs';
import {validateSingleEntry} from '/tmp/opencode/skill-verify/node_modules/yomitan-tools/src/validate.js';
const raw = readFileSync('references/tuples.md','utf8');
const blocks = [...raw.matchAll(/\`\`\`json\n([\s\S]*?)\n\`\`\`/g)].map(m => m[1]);
if (blocks.length < 4) throw new Error('need >=4 json examples, got ' + blocks.length);
for (const b of blocks) {
  const v = JSON.parse(b);
  if (!Array.isArray(v)) throw new Error('example is not an Array: ' + b.slice(0,60));
}
const checks = [['term', JSON.parse(blocks[0]), 3], ['kanji', JSON.parse(blocks[1]), 3], ['tag', JSON.parse(blocks[3] ?? blocks[blocks.length-1]), 3]];
for (const [t, e, v] of checks) {
  const r = validateSingleEntry(t, e, v);
  if (!r.ok) throw new Error(t + ' example invalid: ' + JSON.stringify(r.errors));
}
if (!readFileSync('references/workflows.md','utf8').match(/v1/i)) throw new Error('workflows missing v1 quirk');
if (!readFileSync('references/workflows.md','utf8').includes('validateFile')) throw new Error('workflows missing validateFile');
console.log('references OK, json examples:', blocks.length);
"
```

Expected: prints `references OK, json examples: N` with N >= 4, no throw.

- [ ] **Step 5: Commit.**

```bash
git add references/api.md references/tuples.md references/workflows.md
git commit -m "feat: add references (api, tuples, workflows)"
```

### Task 3: README, LICENSE, publish

**Files:**
- Create: `README.md`
- Copy: `LICENSE` (byte-identical from yomitan-tools)
- Publish: GitHub public repo + push `main`

**Interfaces:**
- Consumes: `SKILL.md`, `references/` (Tasks 1–2); spec sections 9–10 (verification, publish steps).
- Produces: public `philiaspaceai/yomitan-agent-skills` on branch `main`; installable via `npx skills add philiaspaceai/yomitan-agent-skills`.

- [ ] **Step 1: Write `README.md`** — `# yomitan-agent-skills`, one-line description, `## Install` with `npx skills add philiaspaceai/yomitan-agent-skills` and `npm install yomitan-tools` (Node >= 22), `## What the skill teaches` (5 bullets: search, render, staged editing, validate, huge-dict safety), `## Layout` (file tree), `## License` (GPL-3.0-or-later). No secrets.

- [ ] **Step 2: Copy `LICENSE` byte-identical.** Run:

```bash
cp /tmp/opencode/yomitan-tools/LICENSE ./LICENSE
cmp /tmp/opencode/yomitan-tools/LICENSE ./LICENSE && echo "LICENSE identical"
```

Expected: prints `LICENSE identical`. (Fallback if the clone is absent: `git clone --depth 1 https://github.com/philiaspaceai/yomitan-tools.git /tmp/opencode/yomitan-tools` first, then copy.)

- [ ] **Step 3: Verify skill shape + commit.** Run:

```bash
test -f SKILL.md && test -f README.md && test -f LICENSE && test -f references/api.md && test -f references/tuples.md && test -f references/workflows.md && echo "layout OK"
grep -q "npx skills add philiaspaceai/yomitan-agent-skills" README.md && echo "readme OK"
git add README.md LICENSE
git commit -m "feat: add README and LICENSE"
git branch -M main
```

Expected: prints `layout OK` and `readme OK`.

- [ ] **Step 4: Create public repo and push.** Run:

```bash
gh repo create philiaspaceai/yomitan-agent-skills --public --source=. --push
```

Expected: repo created; `git remote -v` shows `philiaspaceai/yomitan-agent-skills`.

- [ ] **Step 5: Verify publish.** Run:

```bash
npx -y skills add philiaspaceai/yomitan-agent-skills --list 2>&1 | head -n 20
```

Expected: output lists `yomitan-agent-skills` (install resolves without error).
