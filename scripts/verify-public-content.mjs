// /publish 전, 그리고 CI 배포 직전에 실행하는 안전장치.
// dist/ 에 민감정보나 깨진 링크가 없는지, 필수 파일이 다 있는지 검사한다.
// second-brain-private 같은 별도 비공개 저장소 없이 이 저장소 안에서 바로 글을
// 쓰기로 했기 때문에(그래서 이 저장소에 커밋되는 순간 git 히스토리에 영구적으로
// 남는다), 이 검사가 사실상 유일한 방어선이다. 문제가 있으면 정확한 파일과
// 이유를 출력하고 exit code 1로 끝난다 — 호출한 쪽(build-site.mjs 이후, 또는
// /publish, 또는 CI)이 이걸 보고 push/deploy를 막아야 한다.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const DIST = path.join(ROOT, "dist")
const KNOWLEDGE_CONTENT = path.join(ROOT, "knowledge-site", "content")

const TEXT_EXTENSIONS = new Set([
  ".html",
  ".htm",
  ".xml",
  ".json",
  ".js",
  ".mjs",
  ".css",
  ".txt",
  ".md",
  ".svg",
])

// [설명, 정규식] — 실패 시 사용자에게 보여줄 이름과 실제 매칭 패턴.
const SENSITIVE_PATTERNS = [
  ["사설 IP 대역 (10.x.x.x)", /\b10\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g],
  ["사설 IP 대역 (172.16-31.x.x)", /\b172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}\b/g],
  ["사설 IP 대역 (192.168.x.x)", /\b192\.168\.\d{1,3}\.\d{1,3}\b/g],
  ["루프백/내부 주소 (127.x.x.x)", /\b127\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g],
  ["개인키 헤더 (PEM)", /-----BEGIN[ A-Z]*PRIVATE KEY-----/g],
  ["AWS Access Key ID", /\bAKIA[0-9A-Z]{16}\b/g],
  ["GitHub 토큰 (ghp_/gho_/ghu_/ghs_/ghr_)", /\bgh[oprsu]_[A-Za-z0-9]{20,}\b/g],
  ["Slack 토큰", /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g],
  ["Bearer 토큰", /\bBearer\s+[A-Za-z0-9._~+/-]{20,}=*\b/g],
  ["평문 비밀번호 대입 (password=...)", /\b(password|passwd|pwd)\s*[:=]\s*['"][^'"\s]{3,}['"]/gi],
]

const FORBIDDEN_DIR_NAMES = new Set(["private", "inbox"])

const EXTERNAL_HREF_RE = /^(https?:)?\/\//i
const SKIP_HREF_RE = /^(mailto:|tel:|javascript:|data:|#)/i

function walk(dir, onFile) {
  if (!existsSync(dir)) return
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, onFile)
    } else if (entry.isFile()) {
      onFile(full)
    }
  }
}

function relFromRoot(p) {
  return path.relative(ROOT, p).split(path.sep).join("/")
}

function checkForbiddenDirs() {
  const problems = []
  if (!existsSync(KNOWLEDGE_CONTENT)) return problems
  for (const entry of readdirSync(KNOWLEDGE_CONTENT, { withFileTypes: true })) {
    if (entry.isDirectory() && FORBIDDEN_DIR_NAMES.has(entry.name)) {
      problems.push({
        file: relFromRoot(path.join(KNOWLEDGE_CONTENT, entry.name)),
        reason: `금지된 폴더명입니다 (${entry.name}/) — 이 저장소에는 절대 있으면 안 되는 폴더입니다.`,
      })
    }
  }
  return problems
}

function checkSensitivePatterns() {
  const problems = []
  walk(DIST, (file) => {
    if (!TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())) return
    const content = readFileSync(file, "utf-8")
    for (const [label, pattern] of SENSITIVE_PATTERNS) {
      pattern.lastIndex = 0
      const match = pattern.exec(content)
      if (match) {
        problems.push({
          file: relFromRoot(file),
          reason: `${label} 의심 패턴 발견: "${match[0]}"`,
        })
      }
    }
  })
  return problems
}

function stripHash(href) {
  return href.split("#")[0].split("?")[0]
}

function resolveInternalLink(href, fromFile) {
  const cleaned = stripHash(href)
  if (cleaned === "") return { ok: true } // 순수 fragment/query만 있던 링크

  const basePath = cleaned.startsWith("/")
    ? path.join(DIST, cleaned)
    : path.join(path.dirname(fromFile), cleaned)

  const candidates = [
    basePath,
    `${basePath}.html`,
    path.join(basePath, "index.html"),
  ]
  const ok = candidates.some((c) => existsSync(c) && statSync(c).isFile())
  return { ok, candidates }
}

function checkBrokenLinks() {
  const problems = []
  walk(DIST, (file) => {
    if (path.extname(file).toLowerCase() !== ".html") return
    const content = readFileSync(file, "utf-8")
    const hrefRe = /(?:href|src)="([^"]*)"/g
    let m
    while ((m = hrefRe.exec(content))) {
      const href = m[1]
      if (href === "" || SKIP_HREF_RE.test(href) || EXTERNAL_HREF_RE.test(href)) continue
      const { ok } = resolveInternalLink(href, file)
      if (!ok) {
        problems.push({
          file: relFromRoot(file),
          reason: `깨진 내부 링크: "${href}"`,
        })
      }
    }
  })
  return problems
}

function checkRequiredFiles() {
  const required = [
    "index.html",
    "styles.css",
    "script.js",
    "favicon.svg",
    "knowledge/index.html",
  ]
  return required
    .filter((f) => !existsSync(path.join(DIST, f)))
    .map((f) => ({ file: `dist/${f}`, reason: "필수 파일이 없습니다." }))
}

function main() {
  if (!existsSync(DIST)) {
    console.error("✗ dist/ 가 없습니다. 먼저 npm run build 를 실행하세요.")
    process.exit(1)
  }

  const problems = [
    ...checkRequiredFiles(),
    ...checkForbiddenDirs(),
    ...checkSensitivePatterns(),
    ...checkBrokenLinks(),
  ]

  if (problems.length === 0) {
    console.log("✓ 검증 통과: 민감정보 패턴 없음 / 깨진 링크 없음 / 필수 파일 확인됨")
    process.exit(0)
  }

  console.error(`✗ 검증 실패: ${problems.length}건\n`)
  for (const p of problems) {
    console.error(`  - ${p.file}\n      ${p.reason}`)
  }
  console.error("\n위 파일들을 수정한 뒤 다시 시도하세요. (커밋/푸시하지 마세요)")
  process.exit(1)
}

main()
