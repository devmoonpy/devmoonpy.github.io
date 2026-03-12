// 간단한 타이핑 효과 유틸
function typeText(element, text, speed = 35) {
  element.textContent = "";
  let i = 0;

  return new Promise((resolve) => {
    function step() {
      if (i <= text.length) {
        element.textContent = text.slice(0, i);
        i += 1;
        setTimeout(step, speed);
      } else {
        resolve();
      }
    }
    step();
  });
}

// 마크다운 샘플 콘텐츠
const blogMarkdown = `
취약점 분석과 웹 공격, 두 가지를 같은 화면에서 다루고 싶었습니다.

이 포트폴리오는 **터미널 UI**와 **블로그 레이아웃**을 결합해서,  
레드팀 관점에서의 웹 공격 실험과 개발 메모를 동시에 기록하기 위한 공간입니다.

- Offensive Web Security / Red Teaming
- Web Exploitation (특히 XSS, CSS 기반 공격)
- Docker, AWS, Linux 로 구성한 실습 환경

TryHackMe, Hack The Box, CTF에서 테스트해 본 아이디어들을  
여기서 다시 정리하고, 나중에 제가 또 공격당하지 않게 기록으로 남겨 둡니다.
`;

const aboutMarkdown = `
\\# 1MOON

취약점 분석과 레드팀 관점의 웹 공격을 좋아합니다.  
**화면은 가볍게, 공격 로그는 진하게** 남기는 편입니다.

- 관심사: Offensive Web Security, Red Team, CTF(Web)
- 도구: Docker, AWS, Linux, Burp Suite, 브라우저 DevTools

이 페이지는 완성형 결과물이라기보다는,  
제가 어떤 방식으로 취약점을 찾고, 다시 막아 두는지 기록하는 **작업 로그**에 가깝습니다.
`;

function renderMarkdown() {
  if (window.marked) {
    const post1 = document.getElementById("post-1");
    const about = document.getElementById("about-body");
    if (post1) {
      post1.innerHTML = window.marked.parse(blogMarkdown.trim());
    }
    if (about) {
      about.innerHTML = window.marked.parse(aboutMarkdown.trim());
    }
  }
}

function setupSectionNavigation() {
  const buttons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");
  const commandText = document.getElementById("section-command-text");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-section");

      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      sections.forEach((sec) => {
        sec.classList.remove("is-active");
      });

      const targetSection = document.getElementById(`section-${target}`);
      if (targetSection) {
        targetSection.classList.add("is-active");
      }

      if (commandText) {
        commandText.textContent = `show ${target}`;
      }
    });
  });
}

function setupWhoamiTyping() {
  const output = document.getElementById("whoami-output");
  if (!output) return;

  const textLines = [
    "MOON (devmoonpy)",
    "offensive web security // red team",
    "",
    "# 이것저것 다한다",
  ];

  // 여러 줄을 순차적으로 타이핑
  (async () => {
    for (let i = 0; i < textLines.length; i++) {
      const lineEl = document.createElement("p");
      output.appendChild(lineEl);
      // 너무 길지 않게 살짝 빠르게
      // eslint-disable-next-line no-await-in-loop
      await typeText(lineEl, textLines[i], 25);
    }
  })();
}

window.addEventListener("DOMContentLoaded", () => {
  renderMarkdown();
  setupSectionNavigation();
  setupWhoamiTyping();
});

