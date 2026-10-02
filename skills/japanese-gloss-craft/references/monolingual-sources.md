# Monolingual Sources

Japanese monolingual (国語) dictionaries are the ground truth for this skill.
Always consult them **before** writing any target-language meaning.

## Which dictionary for what

| Dictionary | Best for |
|---|---|
| 新明解国語辞典 (Shinmeikai) | Fine nuance distinctions; famously sharp at telling similar senses apart |
| 明鏡国語辞典 (Meikyou) | Learner-friendly explanations, usage notes |
| 広辞苑 (Koujien) | Authoritative depth, etymology, wide coverage |
| 大辞林 (Daijirin) / 精選版日本国語大辞典 | Depth and precision for hard words |
| デジタル大辞泉 (Daijisen) | Broad modern coverage |
| 実用日本語表現辞典 | Real usage patterns and expressions |
| 日本語俗語辞書 | Slang (mind the register when glossing) |
| 故事ことわざの辞典 / 新明解四字熟語辞典 | Proverbs and yojijukugo |
| 古語辞典 (Weblio / 旺文社全訳) | Classical Japanese |
| 三省堂国語辞典 / 旺文社国語辞典 / 岩波国語辞典 | Solid all-rounders, good second opinions |

Rule of thumb: **Shinmeikai first for nuance**, then one all-rounder as second
opinion. Polysemous words always need ≥2 sources.

## Collections (download from here)

1. **shoui / TheMoeWay collection** (founder of TheMoeWay immersion community):
   `https://drive.google.com/drive/folders/1tTdLppnqMfVC5otPlX_cs4ixlIgjv_lH`
2. **MarvNC collection** ([yomitan-dictionaries](https://github.com/MarvNC/yomitan-dictionaries) hub):
   `https://drive.google.com/drive/folders/1LXMIOoaWASIntlx1w08njNU005lS5lez`
   — the repo README lists every dictionary with direct links; prefer those
   direct links when available, Drive folders otherwise.

Background on choosing dictionaries:
`https://learnjapanese.moe/resources/#dictionaries`.

## How to download (agent instructions)

Google Drive folders can't be fetched with plain curl. Use `gdown`:

```bash
pip install gdown
mkdir -p ~/.cache/yomitan-monolingual
cd ~/.cache/yomitan-monolingual
gdown --folder https://drive.google.com/drive/folders/1LXMIOoaWASIntlx1w08njNU005lS5lez
```

- **Cache, don't re-download.** Check `~/.cache/yomitan-monolingual/` first;
  download once, reuse forever. Dictionaries are 30–200MB each.
- If a folder link is stale, fall back to the direct per-dictionary links in
  the MarvNC repo README.
- If `gdown` fails on a huge file (Drive virus-scan prompt), retry — `gdown`
  handles the confirmation token automatically on the second attempt.

## How to query (never read whole banks)

```bash
S=<repo>/skills/yomitan-dictionary/scripts
node $S/yomitan.mjs unpack ~/.cache/yomitan-monolingual/shinmeikai.zip /tmp/mono-shinmeikai
node $S/yomitan.mjs get /tmp/mono-shinmeikai --term "渋い"
```

Unpack once per dictionary, then `get --term [--reading]` per word.
Quote the monolingual definition text for each sense into your working notes —
those quotes are the evidence your glosses stand on.

## Copyright note

These are commercial dictionaries shared by the community for **personal
study/reference use**. Look up what you need, but do not redistribute the
zips or republish their contents verbatim. Glosses you write should be your
own renderings grounded in the sources, not copies.
