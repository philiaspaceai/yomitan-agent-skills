# yomitan-agent-skills

![yomitan-agent-skills banner](./assets/banner.png)

[![License: MIT](https://img.shields.io/github/license/philiaspaceai/yomitan-agent-skills?style=for-the-badge&labelColor=000000)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/philiaspaceai/yomitan-agent-skills?style=for-the-badge&labelColor=000000)](https://skills.sh/philiaspaceai/yomitan-agent-skills)

> [English](./README.md) · [Bahasa Indonesia](./README.id.md)

[Yomitan](https://github.com/yomidevs/yomitan)辞書の**作成・編集・検証・パッケージ化**のための
汎用AIエージェントスキル — オープンな[`skills`](https://github.com/vercel-labs/skills) CLIで
80以上のハーネス（OpenCode、Claude Code、Codex、Hermes、OpenClaw、Antigravity、Cursorなど）に
インストールできます。

**Philia Space Community**が心を込めて開発しました。

## インストール

### 方法A — ターミナル不要（AIにコピペするだけ）

ターミナルが使えなくても大丈夫です。下のメッセージをコピーして、
AIチャット（Claude、ChatGPT、Geminiなど）に貼り付け、やりたいことを説明してください。
例：*「辞書に新しい単語を追加したい」*。

```
I want to work on a Yomitan dictionary. Please read and follow this skill:
https://raw.githubusercontent.com/philiaspaceai/yomitan-agent-skills/main/skills/yomitan-dictionary/SKILL.md
Also read the supporting docs in the same repo under skills/yomitan-dictionary/references/
(dictionary-format.md, frequency-pitch-meta.md, validation-packaging.md).
Then ask me what I need.
```

> 注意：チャットのみのAIはヘルパースクリプトを実行できません。
> 大規模な編集（数千件のエントリ）には、コーディングエージェントを使う方法Bがおすすめです。

### 方法B — ターミナル（`npx skills`、コーディングエージェント向け）

```bash
npx skills add philiaspaceai/yomitan-agent-skills
```

特定のエージェントに辞書スキルのみをインストールする場合：

```bash
npx skills add philiaspaceai/yomitan-agent-skills --skill yomitan-dictionary -a opencode
```

### AIエージェント別のインストールコマンド

| AIエージェント | コマンド |
|---|---|
| Hermes | `npx skills add philiaspaceai/yomitan-agent-skills -a hermes-agent` |
| Claude Code | `npx skills add philiaspaceai/yomitan-agent-skills -a claude-code` |
| Codex | `npx skills add philiaspaceai/yomitan-agent-skills -a codex` |
| OpenCode | `npx skills add philiaspaceai/yomitan-agent-skills -a opencode` |
| Antigravity | `npx skills add philiaspaceai/yomitan-agent-skills -a antigravity` |

他にも多数対応 — `skills` CLIは80以上のエージェントをサポートしています
（完全なリストは[こちら](https://github.com/vercel-labs/skills#supported-agents)）。
すべてに一括インストールする場合：`npx skills add philiaspaceai/yomitan-agent-skills -a '*'`。

## 内容

| パス | 内容 |
|---|---|
| `skills/yomitan-dictionary/` | 仕組みのスキル：`SKILL.md` ＋ 依存関係ゼロの `scripts/yomitan.mjs` ＋ `references/` ドキュメント |
| `skills/japanese-gloss-craft/` | 意味品質のスキル：`SKILL.md` ＋ `references/` ドキュメント（設計上スクリプトなし） |
| `agents/yomitan-dictionary-agent.md` | ハーネス非依存のサブエージェント定義 |
| `agents/japanese-gloss-craft-agent.md` | ハーネス非依存のサブエージェント定義 |

## クイックスタート（エージェント向け）

```bash
S=skills/yomitan-dictionary/scripts
node $S/yomitan.mjs validate ./my-dict.zip
node $S/yomitan.mjs unpack ./my-dict.zip /tmp/my-dict
node $S/yomitan.mjs get /tmp/my-dict --term "猫"
node $S/yomitan.mjs add /tmp/my-dict --entry '["猫","ねこ","n5","",0,["cat"],12345,""]'
node $S/yomitan.mjs validate /tmp/my-dict
node $S/yomitan.mjs pack /tmp/my-dict ./my-dict-v2.zip
```

npmの依存関係はありません — Nodeとシステムの`zip`/`unzip`のみ必要です。

## コントリビューション

[AGENTS.md](./AGENTS.md)をご覧ください。

## 謝辞

[Yomitan](https://github.com/yomidevs/yomitan)を開発する[Yomidevs](https://github.com/yomidevs)
コミュニティ（Yomichanの後継）のために作られました — 辞書フォーマットのリファレンス：
[`yomidevs/yomitan/ext/data/schemas`](https://github.com/yomidevs/yomitan/tree/master/ext/data/schemas)。
Philia Space Communityの公式プロジェクトです。Yomitanに対しては非公式であり、
Yomidevsとは提携・承認関係にありません。
