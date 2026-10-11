# yomitan-agent-skills

[![skills.sh](https://skills.sh/b/philiaspaceai/yomitan-agent-skills)](https://skills.sh/philiaspaceai/yomitan-agent-skills)

Agent skill for working with **Yomitan dictionaries** in Node.js via [`yomitan-tools`](https://github.com/philiaspaceai/yomitan-tools) — search, read, render, validate, and edit any Yomitan-format dictionary (`.zip` or extracted folder), with entries rendered to human-readable Markdown.

## Install

```sh
npx skills add philiaspaceai/yomitan-agent-skills
```

The skill teaches the library; the library itself is a separate npm package (Node >= 22):

```sh
npm install yomitan-tools
```

## What the skill teaches

- **Search** terms, kanji, frequency/pitch metadata, and tags (streaming — safe on 600MB+ dictionaries).
- **Render** any entry to Markdown with pitch accent, frequency, and tag notes resolved.
- **Edit** with staged, schema-checked `add` / `update` / `delete` + atomic `save()` / `saveAs()`.
- **Validate** like Yomitan itself (schema + structural + media-reference checks).
- **Stay safe** on huge dictionaries (`validateFile()` per touched bank, small `limit` + `offset` paging).

## Layout

```text
skills/yomitan-agent-skills/
  SKILL.md            # the skill (<400 words, points into references/)
  references/
    api.md            # full method table, options, standalone functions
    tuples.md         # exact tuple shapes + valid examples
    workflows.md      # staged-save, huge-dict, saveAs, v1 quirk, media rules
```

## License

GPL-3.0-or-later. See [LICENSE](./LICENSE).
