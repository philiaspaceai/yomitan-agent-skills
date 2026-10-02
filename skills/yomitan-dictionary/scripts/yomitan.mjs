#!/usr/bin/env node
// yomitan.mjs — zero-dependency CLI for Yomitan dictionaries.
// Requires system `unzip` + `zip` (preinstalled on most Linux/macOS, Git Bash on Windows).
// Commands: validate | unpack | pack | get | add | remove
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const BANK_SPLIT = 10000;
const BANK_RE = /^(term_bank|term_meta_bank|kanji_bank|kanji_meta_bank|tag_bank)_(\d+)\.json$/;

const usage = `Usage:
  node scripts/yomitan.mjs validate <dict.zip|dir>
  node scripts/yomitan.mjs unpack <dict.zip> <dir>
  node scripts/yomitan.mjs pack <dir> <out.zip>
  node scripts/yomitan.mjs get <dict.zip|dir> --term <term> [--reading <reading>]
  node scripts/yomitan.mjs add <dir> --entry '<json-array>' | --file <entry.json>
  node scripts/yomitan.mjs remove <dir> --term <term> [--reading <reading>]`;

function fail(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i === -1 ? null : process.argv[i + 1] ?? null;
}

function isZip(p) {
  return p.toLowerCase().endsWith(".zip");
}

function zipList(zipPath) {
  try {
    const out = execFileSync("unzip", ["-Z1", zipPath], { encoding: "utf8" });
    return out.split("\n").map((s) => s.trim()).filter(Boolean);
  } catch {
    fail(`cannot list zip (need 'unzip' installed): ${zipPath}`);
  }
}

function zipRead(zipPath, inner) {
  try {
    return execFileSync("unzip", ["-p", zipPath, inner], { encoding: "utf8", maxBuffer: 512 * 1024 * 1024 });
  } catch {
    fail(`cannot read ${inner} from ${zipPath}`);
  }
}

function readJsonFile(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(`invalid JSON in ${path}: ${e.message}`);
  }
}

// Resolve <zip|dir> into { mode, files: Map<name, text>, dir? }.
// For zip, files are read via unzip. For dir, banks must be at root.
function loadDictionary(target) {
  const files = new Map();
  if (isZip(target)) {
    if (!existsSync(target)) fail(`not found: ${target}`);
    for (const name of zipList(target)) {
      if (name.endsWith("/") || name.includes("/")) continue; // banks must be at root
      if (!name.endsWith(".json") && name !== "styles.css") continue;
      files.set(name, zipRead(target, name));
    }
    return { mode: "zip", files };
  }
  if (!existsSync(target) || !existsSync(join(target, "index.json"))) {
    fail(`not a dictionary dir (missing index.json): ${target}`);
  }
  for (const name of readdirSync(target)) {
    const full = join(target, name);
    if (name.endsWith(".json") || name === "styles.css") {
      try {
        files.set(name, readFileSync(full, "utf8"));
      } catch { /* skip directories etc. */ }
    }
  }
  return { mode: "dir", files, dir: resolve(target) };
}

function checkEntry(kind, entry, file, i, errors) {
  const ok = (cond, msg) => { if (!cond) errors.push(`${file}[${i}]: ${msg}`); };
  if (!Array.isArray(entry)) return ok(false, `expected array, got ${typeof entry}`);
  if (kind === "term_bank") {
    ok(entry.length === 8, `term entry must have 8 fields, got ${entry.length}`);
    ok(typeof entry[0] === "string", "term[0] term must be string");
    ok(typeof entry[1] === "string", "term[1] reading must be string");
    ok(Array.isArray(entry[5]), "term[5] definitions must be array");
    ok(typeof entry[6] === "number", "term[6] sequence must be number");
  } else if (kind === "term_meta_bank" || kind === "kanji_meta_bank") {
    ok(entry.length === 3, `meta entry must have 3 fields, got ${entry.length}`);
    ok(typeof entry[0] === "string", "meta[0] headword must be string");
    ok(typeof entry[1] === "string", "meta[1] mode must be string");
  } else if (kind === "kanji_bank") {
    ok(entry.length === 6, `kanji entry must have 6 fields, got ${entry.length}`);
    ok(typeof entry[4] === "object" && entry[4] !== null, "kanji[4] meanings must be array/object");
  } else if (kind === "tag_bank") {
    ok(entry.length === 5, `tag entry must have 5 fields, got ${entry.length}`);
    ok(typeof entry[0] === "string", "tag[0] name must be string");
  }
}

export function validateDictionary(target) {
  const errors = [];
  const { files } = loadDictionary(target);

  if (!files.has("index.json")) return { ok: false, errors: ["missing index.json at root"], counts: {} };
  let index;
  try {
    index = JSON.parse(files.get("index.json"));
  } catch (e) {
    return { ok: false, errors: [`index.json: invalid JSON (${e.message})`], counts: {} };
  }
  if (typeof index.title !== "string" || !index.title) errors.push("index.json: 'title' must be a non-empty string");
  if (index.format !== 3) errors.push(`index.json: 'format' must be 3, got ${JSON.stringify(index.format)}`);
  if (typeof index.revision !== "string" || !index.revision) errors.push("index.json: 'revision' must be a non-empty string");

  // Bank sequence must start at 1 and be contiguous per kind.
  const seen = new Map();
  for (const name of files.keys()) {
    const m = BANK_RE.exec(name);
    if (name.endsWith(".json") && name !== "index.json" && !m) {
      errors.push(`${name}: unexpected filename (must be index.json, *_bank_N.json, or styles.css)`);
      continue;
    }
    if (m) {
      if (!seen.has(m[1])) seen.set(m[1], new Set());
      seen.get(m[1]).add(Number(m[2]));
    }
  }
  for (const [kind, nums] of seen) {
    const sorted = [...nums].sort((a, b) => a - b);
    for (let n = 1; n <= sorted[sorted.length - 1]; n++) {
      if (!nums.has(n)) errors.push(`${kind}_${n}.json: missing (sequence must start at 1 and be contiguous)`);
    }
  }

  const counts = {};
  for (const [name, text] of files) {
    const m = BANK_RE.exec(name);
    if (!m) continue;
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      errors.push(`${name}: invalid JSON (${e.message})`);
      continue;
    }
    if (!Array.isArray(data)) {
      errors.push(`${name}: top level must be an array`);
      continue;
    }
    counts[name] = data.length;
    const limit = Math.min(data.length, 200);
    for (let i = 0; i < limit; i++) checkEntry(m[1], data[i], name, i, errors);
    if (data.length === 0) errors.push(`${name}: bank is empty`);
  }

  if ([...files.keys()].filter((n) => BANK_RE.test(n)).length === 0) {
    errors.push("no *_bank_N.json files found");
  }
  return { ok: errors.length === 0, errors, counts, index };
}

function cmdValidate(target) {
  if (!target) fail(usage);
  const r = validateDictionary(target);
  const total = Object.values(r.counts).reduce((a, b) => a + b, 0);
  console.log(JSON.stringify({ target, ok: r.ok, title: r.index?.title, revision: r.index?.revision, banks: r.counts, totalEntries: total, errors: r.errors }, null, 2));
  process.exit(r.ok ? 0 : 1);
}

function cmdUnpack(zipPath, dir) {
  if (!zipPath || !dir) fail(usage);
  mkdirSync(dir, { recursive: true });
  try {
    execFileSync("unzip", ["-o", "-q", resolve(zipPath), "-d", resolve(dir)], { stdio: "inherit" });
  } catch {
    fail(`unpack failed (need 'unzip' installed)`);
  }
  console.log(`Unpacked to ${resolve(dir)}`);
}

function cmdPack(dir, outZip) {
  if (!dir || !outZip) fail(usage);
  const r = validateDictionary(dir);
  if (!r.ok) {
    console.error(JSON.stringify({ ok: false, errors: r.errors }, null, 2));
    fail("refusing to pack an invalid dictionary (fix errors first)");
  }
  const absDir = resolve(dir);
  const absOut = resolve(outZip);
  if (existsSync(absOut)) rmSync(absOut);
  try {
    execFileSync("zip", ["-9", "-q", "-r", absOut, ".", "-i", "*.json", "*.css"], { cwd: absDir, stdio: "inherit" });
  } catch {
    fail(`pack failed (need 'zip' installed)`);
  }
  console.log(`Packed ${absOut}`);
}

function allTermEntries(target) {
  const { files } = loadDictionary(target);
  const out = [];
  for (const [name, text] of [...files.entries()].sort()) {
    const m = BANK_RE.exec(name);
    if (!m || m[1] !== "term_bank") continue;
    const data = JSON.parse(text);
    data.forEach((e, i) => out.push({ file: name, index: i, entry: e }));
  }
  return out;
}

function cmdGet(target, term, reading) {
  if (!target || !term) fail(usage);
  const hits = allTermEntries(target).filter(
    ({ entry }) => entry[0] === term && (!reading || entry[1] === reading)
  );
  console.log(JSON.stringify(hits, null, 2));
}

function termBankFiles(dir) {
  return readdirSync(dir)
    .filter((n) => /^term_bank_\d+\.json$/.test(n))
    .sort((a, b) => Number(a.match(/(\d+)/)[1]) - Number(b.match(/(\d+)/)[1]));
}

function cmdAdd(dir, entryJson, entryFile) {
  if (!dir) fail(usage);
  let entry;
  try {
    entry = entryJson ? JSON.parse(entryJson) : JSON.parse(readFileSync(entryFile, "utf8"));
  } catch (e) {
    fail(`cannot parse entry: ${e.message}`);
  }
  const errs = [];
  checkEntry("term_bank", entry, "new-entry", 0, errs);
  if (errs.length) fail(errs.join("; "));
  let files = termBankFiles(dir);
  if (files.length === 0) {
    writeFileSync(join(dir, "term_bank_1.json"), JSON.stringify([entry], null, 0));
    console.log("Created term_bank_1.json with 1 entry");
    return;
  }
  const last = files[files.length - 1];
  const data = readJsonFile(join(dir, last));
  data.push(entry);
  if (data.length > BANK_SPLIT) {
    const overflow = data.splice(BANK_SPLIT);
    writeFileSync(join(dir, last), JSON.stringify(data));
    const nextN = Number(last.match(/(\d+)/)[1]) + 1;
    const next = `term_bank_${nextN}.json`;
    writeFileSync(join(dir, next), JSON.stringify(overflow));
    console.log(`Appended to ${last} (split overflow ${overflow.length} into ${next})`);
  } else {
    writeFileSync(join(dir, last), JSON.stringify(data));
    console.log(`Appended to ${last} (now ${data.length} entries)`);
  }
}

function cmdRemove(dir, term, reading) {
  if (!dir || !term) fail(usage);
  const files = termBankFiles(dir);
  if (files.length === 0) fail("no term_bank files in dir");
  let removed = 0;
  let kept = [];
  for (const f of files) {
    for (const e of readJsonFile(join(dir, f))) {
      if (e[0] === term && (!reading || e[1] === reading)) removed++;
      else kept.push(e);
    }
  }
  // Rewrite compacted, re-split at BANK_SPLIT, prune extras.
  for (const f of files) rmSync(join(dir, f));
  if (kept.length === 0) {
    writeFileSync(join(dir, "term_bank_1.json"), "[]");
  } else {
    for (let i = 0; i < kept.length; i += BANK_SPLIT) {
      writeFileSync(join(dir, `term_bank_${i / BANK_SPLIT + 1}.json`), JSON.stringify(kept.slice(i, i + BANK_SPLIT)));
    }
  }
  console.log(JSON.stringify({ removed, remaining: kept.length }));
}

// Use a temp dir for zip targets that need rewriting (add/remove only support dirs).
const [cmd, target, a3] = process.argv.slice(2);
if (cmd === "validate") cmdValidate(target);
else if (cmd === "unpack") cmdUnpack(target, a3);
else if (cmd === "pack") cmdPack(target, a3);
else if (cmd === "get") cmdGet(target, getArg("--term"), getArg("--reading"));
else if (cmd === "add") {
  if (isZip(target)) fail("'add' needs an unpacked dir — run 'unpack' first");
  cmdAdd(target, getArg("--entry"), getArg("--file"));
} else if (cmd === "remove") {
  if (isZip(target)) fail("'remove' needs an unpacked dir — run 'unpack' first");
  cmdRemove(target, getArg("--term"), getArg("--reading"));
} else {
  console.log(usage);
  process.exit(1);
}
