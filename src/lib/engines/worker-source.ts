/**
 * Worker kaynak kodları.
 *
 * Worker'lar Blob URL'inden oluşturulur; böylece bundler'a özel worker
 * yapılandırmasına (webpack/turbopack farkları) hiç ihtiyaç kalmaz ve
 * motorlar yalnızca kullanıcı bir alıştırmayı çalıştırdığında indirilir.
 */

export const PYODIDE_BASE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
export const SQLJS_BASE = "https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/";

export const pythonWorkerSource = /* js */ `
const BASE = ${JSON.stringify(PYODIDE_BASE)};
let pyodidePromise = null;

const HARNESS = [
  "import sys, io, json, traceback",
  "",
  "def __va_run(user_code, checks_json):",
  "    checks = json.loads(checks_json)",
  "    ns = {'__name__': '__main__'}",
  "    buf = io.StringIO()",
  "    old = sys.stdout",
  "    sys.stdout = buf",
  "    err = None",
  "    try:",
  "        exec(user_code, ns)",
  "    except Exception as e:",
  "        err = ''.join(traceback.format_exception_only(type(e), e)).strip()",
  "    finally:",
  "        sys.stdout = old",
  "    results = []",
  "    if err is None:",
  "        for c in checks:",
  "            if c['kind'] == 'contains':",
  "                ok = c['needle'] in user_code",
  "            else:",
  "                try:",
  "                    ok = bool(eval(c['code'], ns))",
  "                except Exception:",
  "                    ok = False",
  "            results.append({'passed': ok, 'message': c['message']})",
  "    return json.dumps({'stdout': buf.getvalue(), 'error': err, 'checks': results})",
].join("\\n");

async function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      self.postMessage({ type: "status", text: "Python motoru indiriliyor (ilk seferde ~10 sn)…" });
      importScripts(BASE + "pyodide.js");
      const py = await self.loadPyodide({ indexURL: BASE });
      await py.runPythonAsync(HARNESS);
      self.postMessage({ type: "ready" });
      return py;
    })().catch((error) => {
      pyodidePromise = null;
      throw error;
    });
  }
  return pyodidePromise;
}

self.onmessage = async (event) => {
  const message = event.data;
  try {
    if (message.type === "init") {
      await getPyodide();
      return;
    }
    if (message.type !== "run") return;

    const py = await getPyodide();
    const started = performance.now();

    // import satırlarına bakıp pandas/numpy gibi paketleri kendiliğinden yükler.
    try {
      self.postMessage({ type: "status", text: "Kütüphaneler hazırlanıyor…" });
      await py.loadPackagesFromImports(message.code);
    } catch (_) {
      // Paket bulunamadıysa kod yine de çalışsın; hatayı Python tarafı raporlar.
    }

    const runner = py.globals.get("__va_run");
    let raw;
    try {
      raw = runner(message.code, JSON.stringify(message.checks || []));
    } finally {
      runner.destroy();
    }

    const parsed = JSON.parse(raw);
    const checks = parsed.checks || [];
    self.postMessage({
      type: "result",
      result: {
        ok: !parsed.error,
        stdout: parsed.stdout || "",
        error: parsed.error || undefined,
        checks: checks,
        passed: !parsed.error && checks.every((c) => c.passed),
        ms: Math.round(performance.now() - started),
      },
    });
  } catch (error) {
    self.postMessage({ type: "fatal", error: String((error && error.message) || error) });
  }
};
`;

export const sqlWorkerSource = /* js */ `
const BASE = ${JSON.stringify(SQLJS_BASE)};
let sqlPromise = null;

async function getSql() {
  if (!sqlPromise) {
    sqlPromise = (async () => {
      self.postMessage({ type: "status", text: "SQL motoru indiriliyor…" });
      importScripts(BASE + "sql-wasm.js");
      const SQL = await self.initSqlJs({ locateFile: (file) => BASE + file });
      self.postMessage({ type: "ready" });
      return SQL;
    })().catch((error) => {
      sqlPromise = null;
      throw error;
    });
  }
  return sqlPromise;
}

const MAX_ROWS = 100;

function normalizeCell(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return String(Math.round(value * 1e6) / 1e6);
  if (value instanceof Uint8Array) return "<blob>";
  return String(value);
}

function toTable(result) {
  if (!result) return undefined;
  return {
    columns: result.columns,
    rows: result.values.slice(0, MAX_ROWS).map((row) => row.map(normalizeCell)),
    total: result.values.length,
  };
}

function signature(result, ordered) {
  if (!result) return "";
  const rows = result.values.map((row) => row.map(normalizeCell).join("\\u0001"));
  if (!ordered) rows.sort();
  return rows.join("\\u0002");
}

self.onmessage = async (event) => {
  const message = event.data;
  try {
    if (message.type === "init") {
      await getSql();
      return;
    }
    if (message.type !== "run") return;

    const SQL = await getSql();
    const started = performance.now();
    const db = new SQL.Database();
    let table;
    let error;

    try {
      if (message.schema) db.run(message.schema);
      const results = db.exec(message.code);
      table = toTable(results[results.length - 1]);
    } catch (e) {
      error = String((e && e.message) || e);
    }

    const checks = [];
    if (!error) {
      for (const check of message.checks || []) {
        if (check.kind === "contains") {
          const needle = String(check.needle || "").toLowerCase();
          checks.push({ passed: message.code.toLowerCase().includes(needle), message: check.message });
        } else if (check.kind === "resultEquals" && message.solution) {
          let passed = false;
          try {
            const reference = new SQL.Database();
            if (message.schema) reference.run(message.schema);
            const expected = reference.exec(message.solution);
            const actual = db.exec(message.code);
            const ordered = /order\\s+by/i.test(message.solution);
            passed =
              signature(expected[expected.length - 1], ordered) ===
              signature(actual[actual.length - 1], ordered);
            reference.close();
          } catch (_) {
            passed = false;
          }
          checks.push({ passed, message: check.message });
        }
      }
    }

    db.close();
    self.postMessage({
      type: "result",
      result: {
        ok: !error,
        stdout: "",
        error,
        checks,
        passed: !error && checks.every((c) => c.passed),
        table,
        ms: Math.round(performance.now() - started),
      },
    });
  } catch (error) {
    self.postMessage({ type: "fatal", error: String((error && error.message) || error) });
  }
};
`;
