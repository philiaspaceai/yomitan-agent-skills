---
name: lexicography
description: Principles for compiling, writing, reviewing, or cleaning up bilingual dictionaries for any language pair (e.g. English–Japanese, Spanish–Russian, Indonesian–Javanese). Use this skill whenever the user mentions a dictionary, lexicon, glossary, wordlist, headword, lemma, entry, sense, definition, equivalent, translation equivalent, usage label, dictionary example sentence, or asks to draft, fill in, edit, check consistency of, or evaluate dictionary entries, even if they never say "lexicography". This skill contains principles only; data format, tooling, source materials, and the style of writing meanings are the user's choice and always take precedence.
---

# Bilingual Lexicography (Universal)

This skill carries **working principles**, not formats. Data format, tools, reference sources, and the style in which meanings are written differ from project to project, and that is the user's call. Your job is to protect lexicographic quality *within* the user's choices, not to replace them.

## 0. Order of authority

When rules conflict, follow this order:

1. The user's explicit instructions and project style guide.
2. Patterns already present in the user's existing entries (treat them as an implicit style guide).
3. The principles in this skill.

If the user has no rules and no sample entries, do not silently invent a format. Ask for one or two sample entries, or offer a few style options with their trade-offs, and let the user choose. Once chosen, follow it consistently.

## 1. Establish "for whom and for what" first

Almost every entry-level decision follows from this. Make sure these are clear (ask only about what cannot be inferred):

- **Source language (SL) and target language (TL)**, and the direction of the dictionary.
- **Intended users**: speakers of SL or of TL? Beginners or professional translators?
- **Function**: *decoding* (understanding SL text) or *encoding* (producing TL text). A decoding dictionary can get by with short equivalents; an encoding dictionary must give grammar, collocations, register, and examples so users do not misuse words.
- **Scope**: general, domain-specific, dialectal, historical? Target size?
- **Stance**: descriptive (records actual usage) or prescriptive (sets a standard)? State it; do not mix the two unconsciously.

Bilingual dictionaries are **asymmetric**. What users need depends on which language they do *not* know. Provide information about the language that is foreign to the user, and do not spend space on what they already know from their mother tongue.

## 2. Headwords

- Choose the lemma form consistently, following the tradition of the language (infinitive, citation form, root, etc.). Write the rule once and apply it everywhere.
- Distinguish **homonyms** (different words with the same form, separate entries) from **polysemy** (one word with several senses, one entry). The basis is the relationship between meanings or etymology, not whether TL equivalents happen to differ.
- Set a policy for irregular inflected forms, spelling variants, regional variants, abbreviations, affixes and clitics, compounds, multiword expressions, and proper names. Decide once and record it.
- For languages with more than one script or romanization system, decide the primary form, the companion forms, and the transliteration system. Do not mix romanization systems within one dictionary.
- Ordering (alphabetical, radical, root-based, etc.) follows the conventions of the SL and the user's decision.

## 3. Sense division

- Split senses based on **real differences in meaning in the SL**, tested through contexts of use, not merely because the TL has two words.
- But this is a *bilingual* dictionary: if one SL sense must be rendered by TL equivalents that are **not interchangeable**, the distinction still has to be shown, either as a sub-sense or as a discriminator (see section 5). Readers must be able to choose the right equivalent without guessing.
- Decide the level of granularity (lumping vs. splitting) and hold it across the dictionary. Some entries too fine and others too coarse is a sign of inconsistency.
- Decide and keep a consistent sense order: by frequency, core → derived, or historical. The basic or most frequent sense usually comes first unless the user specifies otherwise.
- Do not create phantom senses: every sense must be demonstrable from real usage or a trustworthy source.

## 4. Equivalents: the heart of a bilingual dictionary

An equivalent is not simply "the closest TL word". Evaluate each one on:

- **Denotative meaning**, **part of speech**, **register** (formal/informal/vulgar), **connotation** (positive/negative/neutral), **frequency** (common vs. rare), **variety/dialect**, and **collocation**.
- **The substitution test**: can the equivalent replace the headword in a real sentence without changing the meaning or sounding unnatural? If not, add an explanation or split the sense.

Recognize the type of relationship and treat each differently:

| Relationship | Handling |
|---|---|
| Full equivalence | Write it directly |
| Partial equivalence (ranges of meaning differ) | Give several equivalents plus discriminators/context |
| One SL → many TL (divergence) | Give a discriminator for each equivalent |
| Many SL → one TL (convergence) | Make sure each SL entry still shows the nuance that is lost |
| **Lexical gap** (no equivalent exists) | Use an explanatory equivalent (paraphrase), the nearest cultural equivalent with a note, or a loanword with an explanation. **Never force a false equivalent** |

Additional guidance:

- Separate clearly **equivalents** (can be dropped straight into a translation) from **explanations/glosses** (describe the meaning, not meant to be inserted). Readers must be able to tell which is which, using whatever marking convention the user has chosen.
- Watch for **false friends** and the pull of formal similarity between languages. Never infer an equivalent from similarity of form.
- Do not translate through a third language (pivot, e.g. Spanish→English→Russian) without verifying against the real language pair. Nuance errors accumulate through a pivot.
- Avoid circular definitions (A = B, B = A with no anchor in meaning).
- When building both directions, **do not mechanically reverse** (inverting the A→B equivalents into B→A). Reversal often distorts nuance and produces equivalents that are not equivalents. Verify each direction separately.
- Choose one consistent depth for glosses: minimal (synonym only), medium, or full explanation, according to the dictionary's function (section 1).

## 5. Discriminators and labels

- When a headword has several equivalents or senses, provide **discriminators** (context indicators, SL synonyms, collocates, subject field) so the reader can choose without reading every example.
- **Usage labels** cover register, regional variety, subject field, time (archaic/new), attitude (derogatory, vulgar, humorous), and frequency. Use a **fixed, defined label inventory**. Add new labels deliberately and record them.
- Apply labels on the right side: on the SL headword, on the TL equivalent, or both. A register mismatch between headword and equivalent should be visible to the reader.
- Taboo, vulgar, or sensitive words are **still recorded and labeled**, not censored, and not accompanied by moral commentary. The dictionary's job is to tell readers the word is offensive, not to avoid it.

## 6. Grammatical and phonological information

Include **what users cannot predict**, adapted to the language pair. Dimensions that may be relevant, depending on the language:

- Part of speech, gender, classifiers/counters, noun class or declension, conjugation pattern, tense/aspect (including aspectual pairs), transitivity, valency and government (cases/prepositions required), irregular forms, countability.
- Speech levels/honorifics (e.g. keigo, Javanese speech levels, formal pronouns) where the language has them.
- Pronunciation: notation system (IPA or other), stress, tone, pitch accent, vowel length, assimilation.

Do not apply one language's grammatical framework to another automatically. Not every language has gender or case, and adding them only adds noise. Let the typology of the language pair determine the microstructure, not the other way around.

## 7. Example sentences and collocations

- Examples exist to **show one sense and one usage pattern**, not to fill space.
- Prefer **authentic** examples (corpus, real texts, native speakers). If an example is constructed, make sure it is natural, short, and does not use structures speakers would never produce.
- **Never present a constructed example as authentic.** Mark the difference if the user's convention distinguishes them.
- One example, one sense. An example that fits two senses confuses the reader.
- Example translations must be natural in the TL, not word-for-word. If an idiomatic translation departs from the SL structure, that is fine as long as the meaning is faithful; add a note when needed.
- Avoid examples containing real personal data, accusations against individuals, or inappropriate content without a lexicographic need.
- Collocations and phrases remain essential for encoding. Record word pairings that are *customary*, not merely grammatically possible.

## 8. Idioms, phrases, and multiword units

- Decide **under which headword** idioms are placed (the key word, the first word, or the most distinctive word) and keep to it, along with a cross-reference policy.
- Translate **meaning and function**, not word for word. If the TL has an equivalent idiom, show it and note any difference in register or imagery. If not, give a paraphrase; do not invent a TL idiom.
- Distinguish idioms (meaning not derivable), collocations (customary combinations), and free phrases (no need to be in the dictionary).

## 9. Special cases that need an explicit policy

Decide with the user, then follow: proper names and place names, abbreviations and acronyms, loanwords, neologisms, culture-bound terms, slang, historical words, and etymology. If etymology is included, mark speculative etymologies as speculative.

## 10. Evidence, sources, and epistemic honesty

This is the most important section for you, because the greatest risk is **confident fabrication**.

- Order of trust: **evidence of real usage (corpus, authentic texts, native speakers) > reputable lexicographic references > the model's own intuition/memory**.
- **Do not copy text from other dictionaries.** They may be used for cross-checking, but the wording of meanings must be written independently from understanding. The definitions and arrangement of other dictionaries' entries are protected by copyright.
- **Do not fabricate** equivalents, senses, "authentic" examples, etymologies, or attestations. If unsure, say so. This applies especially to rare words, low-resource languages, dialects, and narrow technical terminology, where model memory is weakest.
- Mark confidence levels in whatever way the user marks them (e.g. needs native-speaker verification). If the user has no method, suggest a simple one; do not impose it.
- Record the **source** of each non-trivial decision if the user tracks sources. Source tracking enables audit and correction.
- When the user's sources contradict each other, show the conflict; do not silently pick one.
- Final verification by a native speaker (or a domain expert for technical dictionaries) cannot be replaced. Say so when the stakes are high.

## 11. Consistency is a contract

- Microstructure (the order of elements in an entry), punctuation, abbreviations, numbering, and cross-references are a **contract** with the reader. Even small deviations damage the reader's ability to scan.
- When working on many entries, **imitate the existing entries** and do not "fix" the style unilaterally. If a style looks problematic, report it and ask; do not change it silently.
- When reviewing, flag consistency violations separately from content errors.
- Cross-references must not dangle: every target must exist and every reciprocal reference must make sense.

## 12. Working with the user

**Before writing entries**: learn the languages, direction, audience, scope, and any sample entries or style guide (section 1). Ask as little as possible, one focused question if needed. If samples exist, infer from them first.

**While writing**: follow the user's conventions; state assumptions briefly where there are gaps; flag uncertain items; do not add elements that were not requested (suggest them instead).

**When reviewing / doing QA**, check across these categories:

- Duplicate headwords or overlapping senses
- Empty mandatory elements (part of speech, labels, etc.)
- Part-of-speech mismatch between headword and equivalent
- Equivalents that fail the substitution test or mismatch in register
- Senses not supported by examples, or examples that do not match their sense
- Circular definitions and dangling cross-references
- Inconsistent labels, abbreviations, punctuation, sense order
- Equivalents that look like the product of formal similarity or pivoting
- Lexical gaps filled with a forced equivalent

**When proposing changes**: distinguish "this is wrong" (fact) from "this is a style choice" (subjective, the user's decision). Do not present a preference as an error.

## 13. Summary: questions to ask of every entry

1. Does it serve the intended users and function (section 1)?
2. Is the sense division supported by real usage?
3. Does every equivalent pass the substitution test, and are lexical gaps honestly acknowledged?
4. Can the reader choose the right equivalent without guessing?
5. Is the information included what the user *cannot predict*?
6. Are the examples natural, single-sense, and not posing as authentic?
7. Are there claims I am unsure about that I have flagged?
8. Is the entry consistent with the conventions and with the other entries?
