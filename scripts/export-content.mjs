#!/usr/bin/env node
/**
 * Content export pipeline for the USTA Bucaramanga landing.
 *
 * Primary mode connects to the local MariaDB started via docker-compose
 * (database `web2018`, prefix `xk7z5_`) using mysql2.
 * Fallback mode (`--from-dump`) parses `docker/db/usta-content-dump.sql.gz`
 * directly when no server is available, producing identical output.
 *
 * Output: src/data/news.json (60 latest K2 items, category 211)
 *         src/data/pages.json (institutional Joomla articles)
 *
 * Deterministic: identical inputs always produce byte-identical JSON files.
 */

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createHash } from 'node:crypto'
import { gunzipSync } from 'node:zlib'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const execFileAsync = promisify(execFile)

const SITE_BASE = 'https://www.ustabuca.edu.co/'
const NEWS_CATEGORY_LABEL = 'Noticias'
const NEWS_K2_CATEGORY_ID = 211

const PAGE_IDS = [218, 223, 222, 276, 291, 341, 340, 324, 306, 286, 316]

const DB_CONFIG = {
  host: process.env.MYSQL_HOST ?? '127.0.0.1',
  port: Number(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER ?? 'adminweb',
  password: process.env.MYSQL_PASSWORD ?? 'wZX#k4x:Buca2018',
  database: process.env.MYSQL_DATABASE ?? 'web2018',
}

/* ------------------------------- helpers -------------------------------- */

/** Decode HTML entities into plain characters. */
function decodeEntities(text) {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&ndash;/gi, '\u2013')
    .replace(/&mdash;/gi, '\u2014')
    .replace(/&ldquo;/gi, '\u201C')
    .replace(/&rdquo;/gi, '\u201D')
    .replace(/&lsquo;/gi, '\u2018')
    .replace(/&rsquo;/gi, '\u2019')
    .replace(/&aacute;/gi, '\u00E1')
    .replace(/&eacute;/gi, '\u00E9')
    .replace(/&iacute;/gi, '\u00ED')
    .replace(/&oacute;/gi, '\u00F3')
    .replace(/&uacute;/gi, '\u00FA')
    .replace(/&ntilde;/gi, '\u00F1')
    .replace(/&Ntilde;/g, '\u00D1')
    .replace(/&uuml;/gi, '\u00FC')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
}

function toPlainText(html) {
  return decodeEntities(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1\s*>/gi, ' ')
      .replace(/<[^>]*>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim()
}

function truncateSummary(text, maxLength = 220) {
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  const boundary = cut.lastIndexOf(' ')
  return `${cut.slice(0, boundary > 80 ? boundary : maxLength)}…`
}

/** Convert a naive CMS datetime (local time, America/Bogota = UTC-5) to ISO 8601. */
function toIsoDate(value) {
  if (!value || value.startsWith('0000-00-00')) return null
  return `${value.trim().replace(' ', 'T').slice(0, 19)}-05:00`
}

const TRACKING_PARAMS = /^(utm_|fbclid$|gclid$|mc_[a-z]+$|ref$|referrer$)/i

function absoluteUrl(url) {
  const trimmed = url.trim()
  if (/^(https?:)?\/\//i.test(trimmed)) {
    return trimmed.startsWith('//') ? `https:${trimmed}` : trimmed
  }
  return new URL(trimmed.replace(/^\//, ''), SITE_BASE).toString()
}

/**
 * Clean article HTML for rendering:
 * - drop <script>, <style>, comments and inline event handlers
 * - drop Joomla inline-plugin placeholders ({slider}, {tab}, {loadposition}…)
 * - absolutize internal image/link URLs
 * - strip tracking parameters from link URLs
 */
function cleanArticleHtml(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\{(\/?)(accordion|acc_item|sliders?|tabs?|lists?|tab|loadposition|loadmodule[a-z]*|space|rokbox|module|source)\b[^{}]*\}/gi, '')
    .replace(/\[(acc_item|\/acc_item|\blist\b|\/list|\/?slider|\/?tab)[^\]]*\]/gi, '')
    .replace(/(<img\b[^>]*\bsrc\s*=\s*)(["'])(.*?)\2/gi, (match, head, quote, url) => {
      if (url.startsWith('data:')) return match
      return `${head}${quote}${absoluteUrl(url)}${quote}`
    })
    .replace(/(<a\b[^>]*\bhref\s*=\s*)(["'])(.*?)\2/gi, (match, head, quote, rawUrl) => {
      try {
        const url = new URL(absoluteUrl(rawUrl))
        const kept = [...url.searchParams.entries()].filter(([key]) => !TRACKING_PARAMS.test(key))
        url.search = new URLSearchParams(kept).toString()
        url.hash = ''
        url.hostname = 'www.ustabuca.edu.co'
        url.protocol = 'https:'
        return `${head}${quote}${url.toString()}${quote}`
      } catch {
        return match
      }
    })
    .replace(/\r\n/g, '\n')
}

/* ------------------------- source adapters ------------------------------ */

async function loadFromDatabase() {
  const { default: mysql } = await import('mysql2/promise')
  const connection = await mysql.createConnection(DB_CONFIG)

  // NOTE: the reserved-word column `fulltext` must always be qualified/aliased.
  const [newsRows] = await connection.query(
    'SELECT `id`, `title`, `alias`, `introtext`, `xk7z5_k2_items`.`fulltext` AS body, `created` FROM `xk7z5_k2_items` ' +
      'WHERE `catid` = ? AND `published` = 1 AND `trash` = 0 ' +
      'ORDER BY `created` DESC, `id` DESC',
    [NEWS_K2_CATEGORY_ID]
  )

  const placeholders = PAGE_IDS.map(() => '?').join(', ')
  const [pageRows] = await connection.execute(
    'SELECT `id`, `title`, `alias`, `introtext`, `xk7z5_content`.`fulltext` AS body FROM `xk7z5_content` ' +
      `WHERE \`state\` = 1 AND \`id\` IN (${placeholders}) ORDER BY \`id\` ASC`,
    PAGE_IDS
  )

  await connection.end()
  return { newsRows, pageRows }
}

/**
 * Minimal mysqldump reader: extracts values from `INSERT INTO `table` VALUES (...)`
 * statements. Handles MySQL escape sequences inside single-quoted strings,
 * numbers and NULL.
 */
function loadFromDump() {
  const sql = gunzipSync(readFileSync(resolve(ROOT, 'docker/db/usta-content-dump.sql.gz'))).toString('utf8')
  const tables = {}
  let cursor = 0

  while (cursor < sql.length) {
    const header = /^INSERT INTO `(xk7z5_\w+)` VALUES /gm.exec(sql.slice(cursor))
    if (!header) break
    const table = header[1]
    let pos = cursor + header.index + header[0].length

    while (pos < sql.length && sql[pos] !== ';') {
      pos = skipWhitespace(sql, pos)
      if (sql[pos] === '(') {
        const [tuple, next] = parseTuple(sql, pos)
        ;(tables[table] ??= []).push(tuple)
        pos = skipWhitespace(sql, next)
        if (sql[pos] === ',') pos += 1
      } else if (pos < sql.length) {
        pos += 1
      }
    }
    cursor = pos + 1
  }

  // xk7z5_k2_items: id(0) title(1) alias(2) catid(3) published(4) introtext(5) fulltext(6) video(7) … created(11)
  const newsRows = (tables.xk7z5_k2_items ?? [])
    .filter((row) => row[3] === NEWS_K2_CATEGORY_ID && row[4] === 1)
    .map((row) => ({ id: row[0], title: row[1], alias: row[2], introtext: row[5], body: row[6], created: row[11] }))
    .sort((a, b) => String(b.created).localeCompare(String(a.created)) || b.id - a.id)

  // xk7z5_content: id(0) asset_id(1) title(2) alias(3) introtext(4) fulltext(5) state(6)
  const pageRows = PAGE_IDS.map((id) => (tables.xk7z5_content ?? []).find((row) => row[0] === id))
    .filter((row) => row && row[6] === 1)
    .map((row) => ({ id: row[0], title: row[2], alias: row[3], introtext: row[4], body: row[5] }))

  return { newsRows, pageRows }
}

function skipWhitespace(sql, pos) {
  while (pos < sql.length && /\s/.test(sql[pos])) pos += 1
  return pos
}

function parseTuple(sql, pos) {
  const values = []
  pos = skipWhitespace(sql, pos + 1) // past '('
  for (;;) {
    pos = skipWhitespace(sql, pos)
    const char = sql[pos]
    if (char === "'") {
      const [value, next] = parseString(sql, pos)
      values.push(value)
      pos = next
    } else if (sql.startsWith('NULL', pos)) {
      values.push(null)
      pos += 4
    } else {
      let end = pos
      while (end < sql.length && !',()'.includes(sql[end]) && !/\s/.test(sql[end])) end += 1
      values.push(Number(sql.slice(pos, end)))
      pos = end
    }
    pos = skipWhitespace(sql, pos)
    if (sql[pos] === ',') {
      pos += 1
      continue
    }
    if (sql[pos] === ')') return [values, pos + 1]
    throw new Error(`Unexpected character '${sql[pos]}' at ${pos}`)
  }
}

function parseString(sql, start) {
  let out = ''
  let pos = start + 1
  for (;;) {
    const char = sql[pos]
    if (char === '\\') {
      const escaped = sql[pos + 1]
      switch (escaped) {
        case 'n': out += '\n'; break
        case 't': out += '\t'; break
        case 'r': out += '\r'; break
        case 'b': out += '\b'; break
        case '0': out += '\0'; break
        case 'Z': out += '\x1a'; break
        case '%': out += '\\%'; break
        case '_': out += '\\_'; break
        default: out += escaped ?? ''
      }
      pos += 2
    } else if (char === "'") {
      if (sql[pos + 1] === "'") {
        out += "'"
        pos += 2
      } else {
        return [out, pos + 1]
      }
    } else {
      out += char
      pos += 1
    }
  }
}

/* ---------------------------- projections ------------------------------- */

/**
 * K2 stores item images under media/k2/items/cache/<md5("Image" + id)>_<size>.jpg.
 * A cheap HEAD request keeps broken URLs out of the dataset.
 */
function projectNews(rows, verifiedImages) {
  return rows
    .map((row) => {
      const source = `${String(row.introtext)}${row.body ? String(row.body) : ''}`
      return {
        id: Number(row.id),
        title: decodeEntities(String(row.title)),
        summary: truncateSummary(toPlainText(String(row.introtext))),
        html: cleanArticleHtml(source),
        date: toIsoDate(String(row.created)),
        alias: String(row.alias),
        image: verifiedImages.get(k2ImageHash(Number(row.id))) ? `${SITE_BASE}media/k2/items/cache/${k2ImageHash(Number(row.id))}_L.jpg` : null,
        category: NEWS_CATEGORY_LABEL,
        slug: String(row.alias),
        url: `${SITE_BASE}index.php?option=com_k2&view=item&layout=item&id=${Number(row.id)}`,
      }
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)) || b.id - a.id)
}

const k2ImageHash = (itemId) => createHash('md5').update(`Image${itemId}`).digest('hex')

const NULL_DEVICE = process.platform === 'win32' ? 'NUL' : '/dev/null'
async function headRequest(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    const code = String(error.cause?.code ?? error.message)
    if (!/CERT|SIGNATURE|TLS|SSL/i.test(code)) return false
  }
  // Host serves an incomplete TLS chain (no intermediates); Node rejects it but
  // the OS trust store resolves it via AIA fetching — probe with native curl.
  try {
    const { stdout } = await execFileAsync(
      'curl',
      ['-s', '-o', NULL_DEVICE, '-w', '%{http_code}', '-I', '--max-time', '20', url],
      { timeout: 30000 }
    )
    return stdout.trim().startsWith('2')
  } catch {
    return false
  }
}

async function verifyImages(items) {
  const uniqueHashes = [...new Set(items.map(({ id }) => k2ImageHash(id)))]
  const results = new Map(
    await Promise.all(
      uniqueHashes.map(async (hash) => [
        hash,
        await headRequest(`${SITE_BASE}media/k2/items/cache/${hash}_L.jpg`),
      ])
    )
  )
  return results
}

function projectPages(rows) {
  return rows
    .map((row) => {
      const source = `${String(row.introtext)}${row.body ? String(row.body) : ''}`
      return {
        id: Number(row.id),
        title: decodeEntities(String(row.title)),
        alias: String(row.alias),
        summary: truncateSummary(toPlainText(source)),
        html: cleanArticleHtml(source),
      }
    })
    .sort((a, b) => a.id - b.id)
}

/* -------------------------------- main ---------------------------------- */

async function main() {
  const fromDump = process.argv.includes('--from-dump')
  let loaded
  if (fromDump) {
    console.log('Exporting from SQL dump (docker/db/usta-content-dump.sql.gz)')
    loaded = loadFromDump()
  } else {
    console.log(`Connecting to MariaDB at ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`)
    loaded = await loadFromDatabase()
  }

  const projections = projectNews(loaded.newsRows, await verifyImages(loaded.newsRows))
  const pages = projectPages(loaded.pageRows)

  const dataDir = resolve(ROOT, 'src/data')
  mkdirSync(dataDir, { recursive: true })
  writeJson(resolve(dataDir, 'news.json'), projections)
  writeJson(resolve(dataDir, 'pages.json'), pages)

  const missingPages = PAGE_IDS.filter((id) => !pages.some((page) => page.id === id))
  if (missingPages.length > 0) {
    console.warn(`Warning: requested page ids not found or unpublished: ${missingPages.join(', ')}`)
  }
  console.log(`news.json: ${projections.length} items`)
  console.log(`pages.json: ${pages.length} items (${PAGE_IDS.length} requested)`)
  console.log(`${projections.filter((item) => item.image).length} news items with verified images`)
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
