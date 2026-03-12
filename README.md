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

---

### 🛠 Tech Stack

- **Frontend**: Vanilla HTML / CSS / JavaScript
- **Styling**: Fira Code, 다크 테마, 반응형 레이아웃 (Desktop / Mobile)
- **Security Lab Infra**: Docker, AWS, Linux 기반 실습 환경 상정
- **Markdown**: `marked` CDN
- **Deploy**: GitHub Pages (`devmoonpy.github.io`)

---

### 📁 Structure

- `index.html` – 메인 포트폴리오 페이지
- `styles.css` – 터미널 & 블로그 하이브리드 UI 스타일
- `script.js` – 타이핑 애니메이션, 섹션 전환, 마크다운 렌더링

---

### 🚀 Local Preview

```bash
# 이 레포를 클론한 뒤, 단순히 파일만 열어도 동작합니다.
open index.html

# 또는 간단한 로컬 서버를 띄워서 확인할 수도 있습니다.
python -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

---

### 💬 Concept Note

> "단순히 예쁜 사이트가 아니라, 취약점 분석가와 레드팀러의 로그가 터미널 위에 펼쳐지는 화면."

- 코드 가독성과 시각적인 **Hacker 감성**의 밸런스를 맞추는 것을 목표로 합니다.
- TryHackMe, Hack The Box, CTF에서 쳐 본 웹 공격과 방어 아이디어를 정리하는 용도로 설계되었습니다.
