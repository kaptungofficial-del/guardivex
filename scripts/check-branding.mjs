import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const TARGETS = ["apps/web/src", "apps/web/index.html"]
const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".html", ".md"])

const ALLOW_CONTEXT_PATTERNS = [
  /guardivex-home-typography/g,
  /(?:https?:\/\/)?(?:[a-z0-9-]+\.)*guardivex\.com/gi,
  /github\.com\/guardivex\/[\w.-]+/gi,
  /[\w.+-]+@guardivex(?:\.com)?/gi,
  /\/opt\/guardivex\b/gi,
  /\bapp\.guardivex\.com\b/gi,
  /\bdocs\.guardivex\.com\b/gi,
  /\bwww\.guardivex\.com\b/gi,
  /\bapi\.guardivex\.com\b/gi,
  /\binstall\.guardivex\.com\b/gi,
  /\bdocker compose logs -f guardivex\b/gi,
  /\bsystemctl status guardivex\b/gi,
  /\bservice guardivex\b/gi,
  /\bguardivex\/deploy\b/gi,
  /guardivex[A-Za-z0-9_-]*/g,
  /guardivex\.[A-Za-z0-9_.-]+/g,
]

function walkFiles(entryPath) {
  const stat = fs.statSync(entryPath)
  if (stat.isFile()) return [entryPath]

  const out = []
  for (const name of fs.readdirSync(entryPath)) {
    if (name === "node_modules" || name === "dist" || name === ".git") continue
    const full = path.join(entryPath, name)
    const childStat = fs.statSync(full)
    if (childStat.isDirectory()) {
      out.push(...walkFiles(full))
      continue
    }
    if (FILE_EXTENSIONS.has(path.extname(full))) {
      out.push(full)
    }
  }
  return out
}

function collectAllowedSpans(line) {
  const spans = []
  for (const pattern of ALLOW_CONTEXT_PATTERNS) {
    pattern.lastIndex = 0
    let match
    while ((match = pattern.exec(line)) !== null) {
      spans.push([match.index, match.index + match[0].length])
    }
  }
  return spans
}

function isIndexAllowed(index, spans) {
  return spans.some(([start, end]) => index >= start && index < end)
}

const violations = []

for (const target of TARGETS) {
  const absolute = path.join(ROOT, target)
  if (!fs.existsSync(absolute)) continue

  const files = walkFiles(absolute)
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8")
    const lines = text.split(/\r?\n/)

    lines.forEach((line, lineIndex) => {
      if (!line.includes("guardivex")) return

      const spans = collectAllowedSpans(line)
      let match
      const tokenRegex = /guardivex/g
      while ((match = tokenRegex.exec(line)) !== null) {
        if (!isIndexAllowed(match.index, spans)) {
          violations.push({
            file: path.relative(ROOT, file).replace(/\\/g, "/"),
            line: lineIndex + 1,
            text: line.trim(),
          })
        }
      }
    })
  }
}

if (violations.length > 0) {
  console.error("Branding check failed: lowercase 'guardivex' found in disallowed contexts. Use 'Guardivex' for display text.")
  for (const v of violations) {
    console.error(`- ${v.file}:${v.line} -> ${v.text}`)
  }
  process.exit(1)
}

console.log("Branding check passed.")