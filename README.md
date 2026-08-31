![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=25&pause=1000&color=0056B3&width=435&lines=Whoami+1MOON;Scanning+Vulnerabilities...;Access+Granted)

---

### 1MOON Hybrid Portfolio

Offensive Web Security / Red Team 관점에서 웹을 다루는 **하이브리드 터미널 포트폴리오 & 블로그**입니다.

- **컨셉**: 터미널(Terminal) UI + 읽기 좋은 블로그 레이아웃
- **컬러**: Royal Blue `#0056b3` / Dark Navy `#0a0e14` / Terminal Green `#00ff41`
- **타깃**: 보안/웹 개발 관련 업계 관계자, 개발자

---

### 🌐 Live

- GitHub Pages: `https://devmoonpy.github.io`
- Knowledge Base: `https://devmoonpy.github.io/knowledge/`

---

### 🧬 Features

- **Single Terminal Layout**
  - 하나의 터미널 윈도우 안에서 `whoami`, Blog, Projects, About 섹션을 순차적으로 보여주는 구성

- **Terminal Vibes**
  - Fira Code 모노스페이스 폰트
  - 명령 프롬프트(`$`, `>`)와 깜빡이는 커서 애니메이션
  - 로딩 시 `whoami` 영역에 한 줄씩 타이핑되는 효과

- **Blog & Markdown**
  - `marked.js` 를 이용해 **마크다운 기반 글쓰기** 지원
  - TryHackMe / Hack The Box / CTF 등에서의 웹 공격, 취약점 분석 기록을 정리하기 적합

- **Knowledge Base** (`/knowledge/`)
  - [Quartz](https://quartz.jzhao.xyz/) 기반 지식베이스. 포트폴리오와 같은 다크 터미널 톤으로 커스터마이징
  - 검색, 태그, 백링크, 지식 그래프 지원
  - 포트폴리오와 하나의 GitHub Pages 배포로 통합 (`knowledge-site/` 참고)

---

### 🛠 Tech Stack

- **Frontend**: Vanilla HTML / CSS / JavaScript (포트폴리오), [Quartz v5](https://quartz.jzhao.xyz/) (지식베이스)
- **Styling**: Fira Code, 다크 테마, 반응형 레이아웃 (Desktop / Mobile)
- **Security Lab Infra**: Docker, AWS, Linux 기반 실습 환경 상정
- **Markdown**: `marked` CDN (포트폴리오), Quartz 자체 마크다운 파이프라인 (지식베이스)
- **Deploy**: GitHub Pages, GitHub Actions (`devmoonpy.github.io`)

---

### 📁 Structure

- `index.html` / `styles.css` / `script.js` / `favicon.svg` / `background.png` – 메인 포트폴리오 (루트 `/`)
- `knowledge-site/` – Quartz 지식베이스 소스 (`/knowledge/`로 빌드됨)
- `scripts/` – 통합 빌드(`build-site.mjs`) · 검증(`verify-public-content.mjs`) · 프리뷰 서버(`serve-dist.mjs`)
- `.github/workflows/deploy-pages.yml` – 빌드 → 검증 → GitHub Pages 배포
- `dist/` – 빌드 결과물 (커밋 안 함, CI가 매번 생성)

---

### 🚀 Local Preview

포트폴리오만 볼 때는 예전처럼 파일을 바로 열어도 됩니다.

```bash
open index.html
```

포트폴리오 + `/knowledge/`를 실제 배포와 동일한 구조로 함께 확인하려면 (최초 1회 `cd knowledge-site && npm i` 필요):

```bash
npm run preview
# http://localhost:8080/          (포트폴리오)
# http://localhost:8080/knowledge/ (지식베이스)
```

---

### 💬 Concept Note

> "단순히 예쁜 사이트가 아니라, 취약점 분석가와 레드팀러의 로그가 터미널 위에 펼쳐지는 화면."

- 코드 가독성과 시각적인 **Hacker 감성**의 밸런스를 맞추는 것을 목표로 합니다.
- TryHackMe, Hack The Box, CTF에서 쳐 본 웹 공격과 방어 아이디어를 정리하는 용도로 설계되었습니다.
