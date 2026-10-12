# Yomitan Agent Skills — Japanese Dictionaries for AI Agents

[![Install via skills.sh](https://img.shields.io/badge/skills.sh-install-green)](https://skills.sh/philiaspaceai/yomitan-agent-skills)

![banner](./banner.png)

Agent skills for working with **Japanese dictionaries in Yomitan format** (JMdict, kokugo & 100+ more) in Node.js via [`yomitan-tools`](https://github.com/philiaspaceai/yomitan-tools) — search, read, render, validate, and edit any Yomitan-format dictionary (`.zip` or extracted folder), with entries rendered to human-readable Markdown.

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
- **Create** new dictionaries from zero (`initDictionary`) — valid from the first byte.
- **Stay safe** on huge dictionaries (`validateFile()` per touched bank, small `limit` + `offset` paging).

## Layout

```text
skills/yomitan-tools/
  SKILL.md            # file-level mechanics: search, render, edit, validate (<400 words)
  references/
    api.md            # methods, options, standalone functions
    tuples.md         # tuple shapes + examples
    workflows.md      # staged-save, huge dicts, saveAs, v1 quirk, media
skills/lexicography/
  SKILL.md            # language-level judgment: senses, equivalents, labels, examples
```

## License

GPL-3.0-or-later. See [LICENSE](./LICENSE).
