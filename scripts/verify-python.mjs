/**
 * Her Python alıştırmasının çözümünü, worker'daki harness ile aynı mantıkla çalıştırır:
 * çözümü exec et, sonra her check ifadesini aynı ad alanında eval et.
 * Ayrıca başlangıç kodunun (starter) tek başına kontrolleri geçmediğini doğrular —
 * geçiyorsa alıştırma anlamsızdır.
 */
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "content", "tracks");

const files = ["python.ts", "statistics.ts", "machine-learning.ts"];
const dir = mkdtempSync(join(tmpdir(), "pycheck-"));

function extractTasks(source, file) {
  const tasks = [];
  const re = /pyTask\(\{([\s\S]*?)\n\s{12}\}\)/g;
  let m;
  while ((m = re.exec(source))) {
    const body = m[1];
    const id = /id: "([^"]+)"/.exec(body)?.[1];
    const starter = /starter: `([\s\S]*?)`,\n/.exec(body)?.[1];
    const solution = /solution: `([\s\S]*?)`,\n/.exec(body)?.[1];
    const checks = [...body.matchAll(/code: "((?:[^"\\]|\\.)*)"/g)].map((c) =>
      c[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\"),
    );
    if (id && solution && checks.length) tasks.push({ id, file, starter, solution, checks });
  }
  return tasks;
}

const harness = `
import sys, io, json, traceback

def run(user_code, checks):
    ns = {'__name__': '__main__'}
    buf = io.StringIO()
    old = sys.stdout
    sys.stdout = buf
    err = None
    try:
        exec(user_code, ns)
    except Exception as e:
        err = ''.join(traceback.format_exception_only(type(e), e)).strip()
    finally:
        sys.stdout = old
    results = []
    if err is None:
        for c in checks:
            try:
                results.append(bool(eval(c, ns)))
            except Exception:
                results.append(False)
    return err, results
`;

let tasks = [];
for (const file of files) {
  tasks = tasks.concat(extractTasks(readFileSync(join(root, file), "utf8"), file));
}

console.log(`Bulunan Python alıştırması: ${tasks.length}\n`);

let fail = 0;
for (const task of tasks) {
  const script = `${harness}
SOLUTION = ${JSON.stringify(task.solution)}
STARTER = ${JSON.stringify(task.starter ?? "")}
CHECKS = ${JSON.stringify(task.checks)}

err, res = run(SOLUTION, CHECKS)
print(json.dumps({"err": err, "res": res}))
serr, sres = run(STARTER, CHECKS)
print(json.dumps({"err": serr, "res": sres}))
`;
  const file = join(dir, `${task.file}-${task.id}.py`);
  writeFileSync(file, script);
  try {
    const out = execFileSync("python3", [file], { encoding: "utf8" }).trim().split("\n");
    const solved = JSON.parse(out[out.length - 2]);
    const starter = JSON.parse(out[out.length - 1]);

    const allPass = solved.err === null && solved.res.every(Boolean);
    const starterPasses = starter.err === null && starter.res.length > 0 && starter.res.every(Boolean);

    if (!allPass) {
      console.log(
        `✗ ${task.file}:${task.id} — çözüm geçmiyor. hata=${solved.err} kontroller=${JSON.stringify(solved.res)}`,
      );
      fail++;
    } else if (starterPasses) {
      console.log(`✗ ${task.file}:${task.id} — başlangıç kodu zaten geçiyor (alıştırma boş)`);
      fail++;
    } else {
      console.log(`✓ ${task.file}:${task.id} — ${task.checks.length} kontrol geçti`);
    }
  } catch (error) {
    console.log(`✗ ${task.file}:${task.id} — çalıştırma hatası: ${String(error.stderr || error.message).trim().slice(0, 200)}`);
    fail++;
  }
}

console.log(`\n${tasks.length - fail}/${tasks.length} alıştırma geçti.`);
process.exit(fail ? 1 : 0);
