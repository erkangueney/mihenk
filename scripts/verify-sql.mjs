/**
 * İçerikteki her SQL alıştırmasının çözümünü gerçek SQLite'ta çalıştırır.
 * Amaç: söz dizimi hatası veya boş sonuç dönen bir alıştırma kalmasın.
 */
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "src");

const datasetsSrc = readFileSync(join(root, "lib/engines/datasets.ts"), "utf8");
const sqlSrc = readFileSync(join(root, "content/tracks/sql.ts"), "utf8");

/** `const xSchema = \`...\`;` bloklarını çıkarır. */
function extractSchemas() {
  const out = {};
  const re = /const (\w+)Schema = `([\s\S]*?)`;/g;
  let m;
  while ((m = re.exec(datasetsSrc))) out[m[1]] = m[2];
  return out;
}

/** sqlTask({...}) çağrılarından dataset + solution çiftlerini çıkarır. */
function extractTasks() {
  const tasks = [];
  const re = /sqlTask\(\{([\s\S]*?)\n\s{12}\}\)/g;
  let m;
  while ((m = re.exec(sqlSrc))) {
    const body = m[1];
    const id = /id: "([^"]+)"/.exec(body)?.[1];
    const dataset = /dataset: "([^"]+)"/.exec(body)?.[1];
    const solution = /solution: `([\s\S]*?)`,\n/.exec(body)?.[1];
    if (id && dataset && solution) tasks.push({ id, dataset, solution });
  }
  return tasks;
}

const schemas = extractSchemas();
const tasks = extractTasks();
const dir = mkdtempSync(join(tmpdir(), "sqlcheck-"));

console.log(`Şema sayısı: ${Object.keys(schemas).join(", ")}`);
console.log(`Bulunan SQL alıştırması: ${tasks.length}\n`);

let fail = 0;
for (const task of tasks) {
  const schema = schemas[task.dataset];
  if (!schema) {
    console.log(`✗ ${task.id}: '${task.dataset}' şeması bulunamadı`);
    fail++;
    continue;
  }
  const file = join(dir, `${task.id}.sql`);
  writeFileSync(file, `${schema}\n${task.solution}\n`);
  try {
    const out = execFileSync("sqlite3", [":memory:", `.read ${file}`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    const rows = out.trim().split("\n").filter(Boolean);
    if (rows.length === 0) {
      console.log(`✗ ${task.id} [${task.dataset}]: sorgu 0 satır döndü`);
      fail++;
    } else {
      console.log(`✓ ${task.id} [${task.dataset}]: ${rows.length} satır — ${rows[0].slice(0, 60)}`);
    }
  } catch (error) {
    console.log(`✗ ${task.id} [${task.dataset}]: ${String(error.stderr || error.message).trim()}`);
    fail++;
  }
}

console.log(`\n${tasks.length - fail}/${tasks.length} alıştırma geçti.`);
process.exit(fail ? 1 : 0);
