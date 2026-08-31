// knowledge-site/public/ 을 그대로 서빙하는 의존성 0개짜리 정적 서버.
// 실제 배포(GitHub Pages)와 동일하게 로컬에서 확인하기 위한 용도.
// Quartz는 파일을 foo.html 형태로 내보내고(트레일링 슬래시 없는 clean URL), 폴더는
// foo/index.html로 내보내므로 두 케이스를 모두 시도한다.

import { createServer } from "node:http"
import { createReadStream, existsSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const SITE = path.join(ROOT, "knowledge-site", "public")
const PORT = Number(process.env.PORT) || 8080

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0].split("#")[0])
  const safeSuffix = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "")
  const base = path.join(SITE, safeSuffix)

  const candidates = decoded.endsWith("/")
    ? [path.join(base, "index.html")]
    : [base, `${base}.html`, path.join(base, "index.html")]

  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return candidate
    }
  }
  return null
}

function notFound(res) {
  const custom404 = path.join(SITE, "404.html")
  if (existsSync(custom404)) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
    createReadStream(custom404).pipe(res)
    return
  }
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
  res.end("404 Not Found")
}

if (!existsSync(SITE)) {
  console.error("✗ knowledge-site/public/ 이 없습니다. 먼저 npm run build 를 실행하세요.")
  process.exit(1)
}

const server = createServer((req, res) => {
  const file = resolveFile(req.url ?? "/")
  if (!file) {
    notFound(res)
    return
  }
  const ext = path.extname(file).toLowerCase()
  res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" })
  createReadStream(file).pipe(res)
})

server.listen(PORT, () => {
  console.log(`\n✓ 프리뷰 서버 실행 중: http://localhost:${PORT}/`)
  console.log("  Ctrl+C 로 종료\n")
})
