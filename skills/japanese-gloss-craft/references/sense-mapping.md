# Sense Mapping

Think like a lexicographer: the monolingual dictionary's sense division is your
starting map. Your job is to transfer that map faithfully into the target language.

## The core rule

**One monolingual sense = one candidate target sense.** Merge two senses only if
you can state exactly why (same situation, same translation, register identical).
When in doubt, split. An over-split entry is mildly redundant; a wrong merge
deletes a meaning the user will never find.

## Procedure per word

1. Collect the sense list from source #1 (prefer Shinmeikai for nuance).
2. Collect the sense list from source #2. Align them: same, narrower, extra?
3. Extra senses in either source stay in your entry unless clearly archaic —
   mark those with an appropriate tag instead of dropping them.
4. If the user's context selects one sense (e.g. 渋い顔 "a bitter face"),
   still record the other senses briefly; lead with the contextual one.

## Classic traps

- **Transitive/intransitive pairs** (開ける/開く, 掛ける/掛かる): verify which
  one the user means; never copy a gloss across the pair.
- **Register**: 敬語, 俗語 (やばい), 古語 senses must be labeled in the gloss
  (e.g. "[slang]", "[formal]") so learners don't misuse them.
- **Aspect/result-state**: 渋い = "astringent (taste)" vs "sullen (face)" vs
  "refined, quietly tasteful" — three different worlds, never one gloss.
- **Set phrases**: 微妙 covers "delicate/subtle" AND the slang "questionable,
  meh" — the slang sense needs its own gloss with a usage example.
- **Homographs**: confirm the reading first (e.g. 方ほう vs 方かた);
  different reading = different entry.

## Worked mini-example: 渋い (しぶい)

Monolingual sources agree on roughly: ① astringent taste ② sullen/unpleased air
③ refined, subdued good taste. Three senses → three glosses:

1. "(of taste) astringent; bitter-puckery" ← Shinmeikai ①
2. "(of a face/mood) sullen, glum" ← Shinmeikai ②
3. "refined, tastefully subdued" ← Shinmeikai ③

Each gloss cites its source sense. That citation is what makes a weaker model
produce frontier-quality output: the judgment was already made by lexicographers.
