// 기존 포트폴리오(루트 정적 파일) + Quartz 지식베이스(knowledge-site)를
// 하나의 dist/ 로 합친다. 로컬 프리뷰(npm run preview)와 CI 배포가 이 스크립트를 공유한다.
//
// dist/
// ├── index.html / styles.css / script.js / favicon.svg / background.png
// └── knowledge/  (Quartz 빌드 결과)

import { existsSync, mkdirSync, rmSync, cpSync } from "node:fs"
import { spawnSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const DIST = path.join(ROOT, "dist")
const KNOWLEDGE_SITE = path.join(ROOT, "knowledge-site")

// 루트에서 dist/로 그대로 복사할 정적 파일 목록. 화이트리스트 방식으로,
// 여기 없는 파일(예: 실수로 루트에 떨어진 메모나 설정 파일)은 절대 dist/에 안 들어감.
const ROOT_STATIC_FILES = ["index.html", "styles.css", "script.js", "favicon.svg", "background.png"]

function run(cmd, args, cwd) {
  console.log(`\n$ ${cmd} ${args.join(" ")}  (cwd: ${path.relative(ROOT, cwd) || "."})`)
  const result = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: true })
  if (result.status !== 0) {
    console.error(`✗ 명령 실패: ${cmd} ${args.join(" ")} (exit ${result.status})`)
    process.exit(result.status ?? 1)
  }
}

function main() {
  console.log("== 1/4 dist/ 초기화 ==")
  rmSync(DIST, { recursive: true, force: true })
  mkdirSync(DIST, { recursive: true })

  console.log("== 2/4 기존 포트폴리오 정적 파일 복사 ==")
  for (const file of ROOT_STATIC_FILES) {
    const src = path.join(ROOT, file)
    if (!existsSync(src)) {
      console.error(`✗ 필수 파일이 없습니다: ${file}`)
      process.exit(1)
    }
    cpSync(src, path.join(DIST, file))
    console.log(`  copied ${file}`)
  }

  console.log("\n== 3/4 Quartz 지식베이스 빌드 (knowledge-site) ==")
  run("npx", ["quartz", "plugin", "install", "--from-config"], KNOWLEDGE_SITE)
  run("npx", ["quartz", "build"], KNOWLEDGE_SITE)

  const quartzPublic = path.join(KNOWLEDGE_SITE, "public")
  if (!existsSync(quartzPublic)) {
    console.error("✗ Quartz 빌드 결과(knowledge-site/public)가 없습니다.")
    process.exit(1)
  }

  console.log("\n== 4/4 dist/knowledge/ 로 복사 ==")
  cpSync(quartzPublic, path.join(DIST, "knowledge"), { recursive: true })

  console.log(`\n✓ 빌드 완료: ${path.relative(process.cwd(), DIST) || "dist"}`)
}

main()
