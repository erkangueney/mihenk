/**
 * Bağımlılıksız, hafif sözdizimi vurgulama.
 *
 * Amaç tam bir parser değil; ders örneklerini okunur kılmak. Harici bir
 * vurgulama kütüphanesi (~100 kB) yerine ~2 kB'lık bu tokenizer yeterli,
 * ve mobil cihazlarda ilk yükleme belirgin şekilde hızlı kalıyor.
 */

export type TokenType = "comment" | "string" | "number" | "keyword" | "builtin" | "plain";

export interface Token {
  text: string;
  type: TokenType;
}

interface LanguageSpec {
  lineComment?: RegExp;
  blockComment?: RegExp;
  strings: RegExp[];
  keywords: Set<string>;
  builtins: Set<string>;
  /** SQL'de anahtar kelimeler büyük/küçük harften bağımsızdır. */
  caseInsensitive?: boolean;
}

const words = (list: string) => new Set(list.split(/\s+/).filter(Boolean));

const python: LanguageSpec = {
  lineComment: /#[^\n]*/y,
  strings: [/"""[\s\S]*?"""/y, /'''[\s\S]*?'''/y, /"(?:\\.|[^"\\\n])*"/y, /'(?:\\.|[^'\\\n])*'/y],
  keywords: words(`
    False None True and as assert async await break class continue def del elif else except
    finally for from global if import in is lambda nonlocal not or pass raise return try while
    with yield match case
  `),
  builtins: words(`
    abs all any bool dict enumerate filter float format int len list map max min print range
    round set sorted str sum tuple type zip open input isinstance super self pd np plt df
  `),
};

const sql: LanguageSpec = {
  lineComment: /--[^\n]*/y,
  blockComment: /\/\*[\s\S]*?\*\//y,
  strings: [/'(?:''|[^'])*'/y, /"(?:""|[^"])*"/y],
  caseInsensitive: true,
  keywords: words(`
    select from where group by having order limit offset join inner left right full outer on
    as and or not in is null like between union all distinct insert into values update set
    delete create table view index alter drop primary key foreign references default case when
    then else end with over partition rows range preceding following current row asc desc
    exists any cast interval using natural cross qualify window recursive
  `),
  builtins: words(`
    count sum avg min max round coalesce nullif abs length upper lower substr trim date
    strftime julianday cast row_number rank dense_rank lag lead ntile first_value last_value
    ifnull replace concat now current_date extract percentile_cont stddev variance
  `),
};

const javascript: LanguageSpec = {
  lineComment: /\/\/[^\n]*/y,
  blockComment: /\/\*[\s\S]*?\*\//y,
  strings: [/`(?:\\.|[^`\\])*`/y, /"(?:\\.|[^"\\\n])*"/y, /'(?:\\.|[^'\\\n])*'/y],
  keywords: words(`
    const let var function return if else for while do break continue class extends new this
    import export default from async await try catch finally throw typeof instanceof null
    undefined true false switch case
  `),
  builtins: words(`console log Math JSON Object Array Number String Promise document window`),
};

const r: LanguageSpec = {
  lineComment: /#[^\n]*/y,
  strings: [/"(?:\\.|[^"\\\n])*"/y, /'(?:\\.|[^'\\\n])*'/y],
  keywords: words(`
    if else for while function return TRUE FALSE NULL NA NA_integer_ Inf NaN in repeat break
    next library require
  `),
  builtins: words(`
    c data.frame tibble mutate filter select arrange summarise summarize group_by ggplot aes
    geom_point geom_line geom_bar head str summary print paste paste0 mean median sd sum length
  `),
};

/** Power BI / Fabric formülleri: DAX ve Power Query (M). */
const dax: LanguageSpec = {
  lineComment: /\/\/[^\n]*/y,
  blockComment: /\/\*[\s\S]*?\*\//y,
  strings: [/"(?:""|[^"])*"/y],
  caseInsensitive: true,
  keywords: words(`
    var return if else true false not in and or each let type
  `),
  builtins: words(`
    calculate calculatetable filter all allexcept allselected sum sumx average averagex count
    countrows countax distinctcount divide related relatedtable values selectedvalue min max
    minx maxx rankx topn dateadd datesytd datesinperiod sameperiodlastyear totalytd earlier
    format switch blank hasonevalue userelationship crossfilter table.selectrows
    table.transformcolumns table.group list.sum text.upper date.year
  `),
};

/**
 * Excel formülleri. Türkçe arayüzde fonksiyon adları da Türkçedir, bu yüzden
 * iki dilin adları birlikte tanınıyor.
 */
const excel: LanguageSpec = {
  lineComment: /\/\/[^\n]*/y,
  strings: [/"(?:""|[^"])*"/y],
  caseInsensitive: true,
  keywords: words(`
    tr en doğru yanlış true false
  `),
  builtins: words(`
    düşeyara vlookup çaprazara xlookup indis index kaçıncı match eğer if eğerhata iferror
    içokeğer ifs etopla sumif çoketopla sumifs eğersay countif çokeğersay countifs topla sum
    ortalama average say count bağ_değ_dolu_say counta metinbirleştir textjoin birleştir concat
    kırp trim temiz clean parçaal mid soldan left sağdan right uzunluk len bul find yerinekoy
    substitute değiştir replace metneçevir text bugün today şimdi now tarih date seriay edate
    yıl year ay month gün day filtre filter benzersiz unique sırala sort sıralaölçüt sortby
    devrik transpose topla.çarpım sumproduct maksimum max minimum min yuvarla round eğerortalama
    averageif dolaylı indirect kaydır offset satır row sütun column dolgu let lambda
  `),
};

/** Terminal komutları — git ve kabuk örnekleri için. */
const shell: LanguageSpec = {
  lineComment: /#[^\n]*/y,
  strings: [/"(?:\\.|[^"\\\n])*"/y, /'[^'\n]*'/y],
  keywords: words(`
    git npm npx node python pip cd ls mkdir rm cp mv echo export sudo curl if then else fi for
    do done while case esac
  `),
  builtins: words(`
    init clone add commit status log diff branch checkout switch merge rebase pull push fetch
    remote reset revert stash tag restore cherry-pick blame show config
  `),
};

const specs: Record<string, LanguageSpec> = {
  python: python,
  py: python,
  sql: sql,
  javascript,
  js: javascript,
  ts: javascript,
  json: javascript,
  r: r,
  dax,
  m: dax,
  powerquery: dax,
  excel,
  shell,
  bash: shell,
  git: shell,
};

/** Türkçe harfler de kimliğin parçası: `DÜŞEYARA` tek parça olarak okunmalı. */
const IDENTIFIER = /[A-Za-zÇĞİÖŞÜçğıöşü_][A-Za-zÇĞİÖŞÜçğıöşü0-9_.]*/y;
const NUMBER = /\d+(?:\.\d+)?/y;

/**
 * Karşılaştırma için küçük harfe indirger.
 *
 * `toLowerCase()` Türkçe "İ"yi birleşik noktalı bir çifte çevirdiği için
 * önce sadeleştiriliyor; `toLocaleLowerCase("tr")` ise SQL'in ASCII "I"sını
 * "ı" yapıp anahtar kelimeleri kaçırırdı.
 */
const fold = (value: string) => value.replace(/İ/g, "i").toLowerCase();

/** Kaynağı renklendirilebilir parçalara böler. */
export function tokenize(source: string, lang: string): Token[] {
  const spec = specs[lang?.toLowerCase()];
  if (!spec) return [{ text: source, type: "plain" }];

  const tokens: Token[] = [];
  let index = 0;
  let plainStart = 0;

  const flushPlain = (end: number) => {
    if (end > plainStart) tokens.push({ text: source.slice(plainStart, end), type: "plain" });
  };

  const tryMatch = (regex: RegExp): string | null => {
    regex.lastIndex = index;
    const match = regex.exec(source);
    return match ? match[0] : null;
  };

  while (index < source.length) {
    const start = index;

    const comment =
      (spec.lineComment && tryMatch(spec.lineComment)) ||
      (spec.blockComment && tryMatch(spec.blockComment));
    if (comment) {
      flushPlain(start);
      tokens.push({ text: comment, type: "comment" });
      index += comment.length;
      plainStart = index;
      continue;
    }

    let matchedString: string | null = null;
    for (const pattern of spec.strings) {
      matchedString = tryMatch(pattern);
      if (matchedString) break;
    }
    if (matchedString) {
      flushPlain(start);
      tokens.push({ text: matchedString, type: "string" });
      index += matchedString.length;
      plainStart = index;
      continue;
    }

    const identifier = tryMatch(IDENTIFIER);
    if (identifier) {
      const probe = spec.caseInsensitive ? fold(identifier) : identifier;
      const type: TokenType = spec.keywords.has(probe)
        ? "keyword"
        : spec.builtins.has(fold(probe))
          ? "builtin"
          : "plain";
      if (type !== "plain") {
        flushPlain(start);
        tokens.push({ text: identifier, type });
        index += identifier.length;
        plainStart = index;
        continue;
      }
      index += identifier.length;
      continue;
    }

    const number = tryMatch(NUMBER);
    if (number) {
      flushPlain(start);
      tokens.push({ text: number, type: "number" });
      index += number.length;
      plainStart = index;
      continue;
    }

    index += 1;
  }

  flushPlain(index);
  return tokens;
}

export const tokenClass: Record<TokenType, string> = {
  comment: "text-muted italic",
  string: "text-[var(--success)]",
  number: "text-[var(--warning)]",
  keyword: "text-[var(--accent)] font-semibold",
  builtin: "text-[var(--accent-2)]",
  plain: "",
};
