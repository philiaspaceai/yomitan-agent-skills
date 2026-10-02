---
name: japanese-gloss-craft
description: Craft highly accurate target-language meanings for Japanese vocabulary when adding new Yomitan dictionary entries or improving existing glosses. Use when the user wants to write, add, or fix the meaning of a Japanese word, create a new entry from scratch, or check whether a gloss is accurate. Grounds every sense in Japanese monolingual dictionaries before writing anything.
---

# Japanese Gloss Craft

Produce expert-linguist-quality meanings for Japanese words. Quality comes from
**process + sources, not model cleverness**: you never write a meaning from memory.
Every sense is quoted from a monolingual dictionary first, then rendered into the
target language.

For file mechanics (editing banks, packing zips) use the sibling skill
`yomitan-dictionary` — this skill decides **what the meaning says**.

## How It Works

1. **Pin down the term** — headword, reading, part of speech, and the user's context
   (which sense do they need? if unclear, ask).
2. **Prepare monolingual sources** — pick at least one dictionary from
   `references/monolingual-sources.md`, download once into the cache dir if missing,
   then look up **only this term** (never read whole banks).
3. **Collect monolingual senses** — quote each sense's definition in Japanese,
   keeping senses separate exactly as the source separates them.
4. **Map senses** — decide split vs merge per `references/sense-mapping.md`.
5. **Write target-language glosses** — per `references/gloss-craft.md`, one gloss
   (or gloss set) per sense, each citing its monolingual source.
6. **Pass the quality gate, then hand off** — no entry is written until every
   gate item passes; then write via `yomitan-dictionary`
   (see `references/entry-handoff.md`).

Lookup commands (the `yomitan-dictionary` script, reused — no new tooling):

```bash
S=<repo>/skills/yomitan-dictionary/scripts
node $S/yomitan.mjs unpack ~/path/to/shinmeikai.zip /tmp/mono-shinmeikai
node $S/yomitan.mjs get /tmp/mono-shinmeikai --term "渋い" --reading "しぶい"
```

## Quality Gate (all must pass)

- [ ] Every target-language sense traces to a quoted monolingual sense (no memory-written glosses).
- [ ] Polysemous words checked in ≥2 monolingual sources; disagreements kept as separate senses.
- [ ] Transitive/intransitive pairs, register (keigo/slang/archaic), and aspect nuance verified, not assumed.
- [ ] Gloss reads naturally in the target language (no translationese) and fits the user's context.
- [ ] Source cited per sense (dictionary name + sense number).

## Present Results to User

Per sense: monolingual quote (short) → your gloss → source. Then the written entry
and its validation result. Summarize — don't dump banks.

## Troubleshooting

- Download fails → retry with `gdown --folder`, check link freshness in
  `references/monolingual-sources.md`; use the GitHub fallback links.
- Term missing in one dictionary → try another source before concluding it doesn't exist
  (coverage differs, especially slang vs classical).
- Unsure which sense the user needs → ask with the monolingual options, don't guess.

## Reference files (read on demand, not up front)

- `references/monolingual-sources.md` — which dictionary for what, download + query how-to.
- `references/sense-mapping.md` — splitting/mapping senses like a lexicographer.
- `references/gloss-craft.md` — writing accurate, natural target-language meanings.
- `references/entry-handoff.md` — turning finished glosses into a valid bank entry.
