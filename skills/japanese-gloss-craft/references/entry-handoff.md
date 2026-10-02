# Entry Handoff

Turn finished, gate-passed glosses into a valid `term_bank` entry using the
sibling `yomitan-dictionary` skill. You write the **content**; that skill owns
the **mechanics**.

## Mapping glosses to entry fields

```
[ term, reading, definitionTags, rules, score, definitions, sequence, termTags ]
```

- `term` / `reading` — as identified in step 1 (verify the reading; homographs differ).
- `definitionTags` — space-separated tags that must exist in a tag bank
  (e.g. part-of-speech or register tags; add them to `tag_bank_1.json` if new).
- `definitions` — your glosses, **in sense order**, one string per sense.
  Keep the parenthetical disambiguators ("(of taste)") — they survive into Yomitan popups.
- `sequence` — reuse the existing sequence number when editing; new entries get
  max+1 within the target dictionary.
- Keep source citations in your reply to the user, not inside the entry
  (entries stay clean; traceability lives in the conversation).

## Handoff commands

```bash
S=<repo>/skills/yomitan-dictionary/scripts
# new entry
node $S/yomitan.mjs add /tmp/workdir --entry '["渋い","しぶい","","",0,["(of taste) astringent","(of a face) sullen, glum","refined, tastefully subdued"],1,""]'
# always re-validate, then pack
node $S/yomitan.mjs validate /tmp/workdir
node $S/yomitan.mjs pack /tmp/workdir ./dict-v2.zip
```

Full field reference: `skills/yomitan-dictionary/references/dictionary-format.md`.
