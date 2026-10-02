# AGENTS.md — yomitan-agent-skills

Universal skills for working with Yomitan dictionaries. Installable in 80+
harnesses via the open `skills` CLI.

## Install

```bash
npx skills add philiaspaceai/yomitan-agent-skills
```

## Repo layout

```
skills/yomitan-dictionary/     # skill 1: mechanics (validate|unpack|pack|get|add|remove)
  SKILL.md                 # skill definition (keep <500 lines)
  scripts/yomitan.mjs      # zero-dep CLI
  references/              # on-demand docs (format, meta, validation)
skills/japanese-gloss-craft/  # skill 2: meaning quality (no scripts by design)
  SKILL.md                 # skill definition (keep <500 lines)
  references/              # on-demand docs (sources, senses, gloss craft, handoff)
agents/
  yomitan-dictionary-agent.md  # harness-agnostic subagent definition
  japanese-gloss-craft-agent.md
```

## Rules for contributors (human or agent)

1. `SKILL.md` stays lean — details go in `references/`, logic in `scripts/`.
2. `scripts/yomitan.mjs` must stay dependency-free (Node stdlib + system
   `zip`/`unzip` only) so it runs wherever `npx` runs.
3. Test every script change against real dictionaries:
   `node skills/yomitan-dictionary/scripts/yomitan.mjs validate <dict.zip>`
   using files in `examples-references/` (git-ignored, never commit them).
4. Don't commit `.zip` dictionaries, unpacked dict dirs, or `/tmp` artifacts.
5. Yomitan schema source of truth: `yomidevs/yomitan/ext/data/schemas/`.
