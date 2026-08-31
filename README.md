### 1MOON

bug bounty를 위한 학습 노트 · cheat sheet · 공격 기법 정리. [Quartz](https://quartz.jzhao.xyz/) 기반 정적 사이트입니다.

- **컬러**: Royal Blue `#0056b3` / Dark Navy `#0a0e14` / Terminal Green `#00ff41`
- **폰트**: 본문 Noto Sans KR (가독성), 코드/커맨드 Fira Code

---

### 🌐 Live

- `https://devmoonpy.github.io/`

---

### 📁 Structure

- `knowledge-site/` – Quartz 소스. `content/`가 실제 글이 들어가는 곳
  - `content/cheatsheets/` – 페이로드, 명령어, 우회 기법 빠른 참조
  - `content/techniques/` – 취약점 유형별 원리와 찾는 방법
  - `content/recon/` – 정찰·자산 탐색 방법론
  - `content/notes/` – 그때그때 학습 메모
  - `content/learning-log/` – "기록 시작/완료"로 정리한 학습 세션 요약
  - `local-plugins/site-nav/` – 상단 메뉴 (content/ 폴더 구조를 보고 자동 생성됨)
  - `quartz/styles/custom.scss` – 테마 오버라이드
- `scripts/` – 검증(`verify-public-content.mjs`) · 프리뷰 서버(`serve-site.mjs`)
- `.github/workflows/deploy-pages.yml` – 빌드 → 검증 → GitHub Pages 배포

새 섹션(폴더)을 추가하고 싶으면 `content/` 아래에 폴더만 만들면 됩니다. 상단 메뉴는 자동으로 생성됩니다.

---

### 🚀 Local Preview

최초 1회:
```bash
cd knowledge-site && npm i
```

이후:
```bash
npm run preview
# http://localhost:8080/
```

---

### ✍️ 글쓰기

Claude Code 커맨드로 작성합니다.

- `/note <내용>` — 메모를 받아 섹션 분류, 관련 글 백링크 제안, frontmatter 작성까지 해서 저장. 민감정보(서버 정보, 인증정보, 미해결 bug bounty 대상 식별 정보 등)로 보이면 저장 전에 먼저 확인함.
- `/publish` — 빌드 → 검증(민감정보/깨진 링크 스캔) → 변경사항 확인 → 커밋/push. 검증 실패 시 정확한 파일과 사유를 보여주고 중단.

이 저장소는 **공개 저장소**입니다. 커밋되는 순간 인터넷에 공개되고 git 히스토리에 영구히 남으므로, 진행 중인 bug bounty 프로그램의 실제 대상은 절대 적지 않습니다 — 일반화된 기법만 정리합니다.

---

### 🎓 학습 파트너 모드

`CLAUDE.md`에 Offensive Security 학습 파트너 페르소나가 설정되어 있습니다 (Socratic 방식으로 실습 문제 힌트 주기, 사고 편향 교정, 용어 교정, 난도 자동 조절 등). 공부할 때는 평소 채팅처럼 물어보면 됩니다 — 코드/설정 작업 요청에는 적용되지 않습니다.

- **"기록 시작"** (또는 `/record-start`) — 이 시점부터 배운 내용을 추적 시작
- **"기록 완료"** (또는 `/record-end`) — 추적한 내용을 정리해서 `content/learning-log/`에 저장 (오늘의 핵심 학습 / 수정된 오해 / 실무 사고방식 / 핵심 키워드 5개)
