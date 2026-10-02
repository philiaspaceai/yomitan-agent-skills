# yomitan-agent-skills

[![License: MIT](https://img.shields.io/github/license/philiaspaceai/yomitan-agent-skills?style=for-the-badge&labelColor=000000)](./LICENSE)
[![skills.sh](https://skills.sh/b/philiaspaceai/yomitan-agent-skills?style=for-the-badge)](https://skills.sh/philiaspaceai/yomitan-agent-skills)

Universal AI-agent skills for **creating, editing, validating, and packaging
[Yomitan](https://github.com/yomidevs/yomitan) dictionaries** — installable in
80+ harnesses (OpenCode, Claude Code, Codex, OpenClaw, Antigravity, Cursor, …)
via the open [`skills`](https://github.com/vercel-labs/skills) CLI.

## Install

```bash
npx skills add philiaspaceai/yomitan-agent-skills
```

Or install just the dictionary skill into specific agents:

```bash
npx skills add philiaspaceai/yomitan-agent-skills --skill yomitan-dictionary -a opencode
```

## What's inside

| Path | What |
|---|---|
| `skills/yomitan-dictionary/` | The skill: `SKILL.md` + zero-dependency `scripts/yomitan.mjs` + `references/` docs |
| `agents/yomitan-dictionary-agent.md` | Harness-agnostic subagent definition |

## Quick use (for agents)

```bash
S=skills/yomitan-dictionary/scripts
node $S/yomitan.mjs validate ./my-dict.zip
node $S/yomitan.mjs unpack ./my-dict.zip /tmp/my-dict
node $S/yomitan.mjs get /tmp/my-dict --term "猫"
node $S/yomitan.mjs add /tmp/my-dict --entry '["猫","ねこ","n5","",0,["cat"],12345,""]'
node $S/yomitan.mjs validate /tmp/my-dict
node $S/yomitan.mjs pack /tmp/my-dict ./my-dict-v2.zip
```

No npm dependencies — only Node + system `zip`/`unzip`.

## Contributing

See [AGENTS.md](./AGENTS.md).
