# yomitan-agent-skills

![yomitan-agent-skills banner](./assets/banner.png)

[![License: MIT](https://img.shields.io/github/license/philiaspaceai/yomitan-agent-skills?style=for-the-badge&labelColor=000000)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/philiaspaceai/yomitan-agent-skills?style=for-the-badge&labelColor=000000)](https://skills.sh/philiaspaceai/yomitan-agent-skills)

> Baca dalam bahasa Inggris: [README.md](./README.md) · 日本語版: [README.ja.md](./README.ja.md)

Skill AI-agent universal untuk **membuat, mengedit, memvalidasi, dan mengemas
kamus [Yomitan](https://github.com/yomidevs/yomitan)** — bisa dipasang di
80+ harness (OpenCode, Claude Code, Codex, Hermes, OpenClaw, Antigravity, Cursor, …)
lewat CLI [`skills`](https://github.com/vercel-labs/skills) yang terbuka.

Dibuat dengan penuh cinta oleh **Philia Space Community**.

## Instalasi

### Opsi A — Tanpa terminal (tinggal copy-paste ke AI)

Tidak bisa pakai terminal? Santai. Copy pesan di bawah ini,
paste ke chat AI (Claude, ChatGPT, Gemini, dll.), lalu jelaskan maumu —
misalnya *"aku mau nambahin kata baru ke kamusku"*.

```
I want to work on a Yomitan dictionary. Please read and follow this skill:
https://raw.githubusercontent.com/philiaspaceai/yomitan-agent-skills/main/skills/yomitan-dictionary/SKILL.md
Also read the supporting docs in the same repo under skills/yomitan-dictionary/references/
(dictionary-format.md, frequency-pitch-meta.md, validation-packaging.md).
Then ask me what I need.
```

> Catatan: AI yang hanya lewat chat tidak bisa menjalankan script pembantu,
> jadi untuk edit besar (ribuan entri) Opsi B dengan coding agent jauh lebih mantap.

### Opsi B — Terminal (`npx skills`, untuk coding agent)

```bash
npx skills add philiaspaceai/yomitan-agent-skills
```

Atau pasang skill kamusnya saja ke agent tertentu:

```bash
npx skills add philiaspaceai/yomitan-agent-skills --skill yomitan-dictionary -a opencode
```

### Perintah instalasi per AI agent

| AI Agent | Perintah |
|---|---|
| Hermes | `npx skills add philiaspaceai/yomitan-agent-skills -a hermes-agent` |
| Claude Code | `npx skills add philiaspaceai/yomitan-agent-skills -a claude-code` |
| Codex | `npx skills add philiaspaceai/yomitan-agent-skills -a codex` |
| OpenCode | `npx skills add philiaspaceai/yomitan-agent-skills -a opencode` |
| Antigravity | `npx skills add philiaspaceai/yomitan-agent-skills -a antigravity` |

Dan masih banyak lagi — CLI `skills` mendukung 80+ agent
(daftar lengkap [di sini](https://github.com/vercel-labs/skills#supported-agents)).
Untuk pasang ke semuanya sekaligus: `npx skills add philiaspaceai/yomitan-agent-skills -a '*'`.

## Isi repo ini

| Path | Isi |
|---|---|
| `skills/yomitan-dictionary/` | Skill mekanis: `SKILL.md` + `scripts/yomitan.mjs` tanpa dependency + dokumen `references/` |
| `skills/japanese-gloss-craft/` | Skill kualitas makna: `SKILL.md` + dokumen `references/` (tanpa scripts, by design) |
| `agents/yomitan-dictionary-agent.md` | Definisi subagent yang netral untuk semua harness |
| `agents/japanese-gloss-craft-agent.md` | Definisi subagent yang netral untuk semua harness |

## Cara pakai cepat (untuk agent)

```bash
S=skills/yomitan-dictionary/scripts
node $S/yomitan.mjs validate ./my-dict.zip
node $S/yomitan.mjs unpack ./my-dict.zip /tmp/my-dict
node $S/yomitan.mjs get /tmp/my-dict --term "猫"
node $S/yomitan.mjs add /tmp/my-dict --entry '["猫","ねこ","n5","",0,["cat"],12345,""]'
node $S/yomitan.mjs validate /tmp/my-dict
node $S/yomitan.mjs pack /tmp/my-dict ./my-dict-v2.zip
```

Tanpa npm dependencies — hanya butuh Node + `zip`/`unzip` bawaan sistem.

## Kontribusi

Lihat [AGENTS.md](./AGENTS.md).

## Acknowledgements

Dibuat untuk [Yomitan](https://github.com/yomidevs/yomitan) oleh komunitas
[Yomidevs](https://github.com/yomidevs) (penerus Yomichan) — acuan format kamus:
[`yomidevs/yomitan/ext/data/schemas`](https://github.com/yomidevs/yomitan/tree/master/ext/data/schemas).
Project resmi dari Philia Space Community. Tidak resmi terhadap Yomitan —
tidak berafiliasi atau didukung oleh Yomidevs.
