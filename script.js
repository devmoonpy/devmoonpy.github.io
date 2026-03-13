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
  setupSectionNavigation();
  setupWhoamiTyping();
});

