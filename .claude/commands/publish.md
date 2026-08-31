---
description: 검증 후 지식베이스 변경사항을 커밋/푸시해서 실제 사이트에 반영한다
---

`knowledge-site/content/` 등의 변경사항을 검증하고, 통과하면 사용자 확인을 받아 commit/push한다. push되면 GitHub Actions가 자동으로 `https://devmoonpy.github.io/knowledge/`를 갱신한다.

## 절차 (반드시 순서대로, 실패하면 그 자리에서 멈춘다)

1. `git status`로 변경사항을 확인한다. 변경된 파일이 없으면 그렇게 안내하고 끝낸다.

2. 저장소 루트에서 `npm run build`를 실행해 통합 빌드가 실제로 성공하는지 확인한다. 실패하면 에러를 그대로 보여주고 여기서 멈춘다 (커밋하지 않는다).

3. `npm run verify`를 실행한다. 실패하면:
   - **절대 커밋도 push도 하지 않는다.**
   - 검증 스크립트가 출력한 파일 경로와 사유를 그대로 사용자에게 보여준다.
   - 사용자가 직접 고치거나, 고쳐달라고 명확히 요청할 때까지 기다린다.

4. 검증을 통과하면:
   - `git status` / `git diff --stat`로 바뀐 파일 목록을 사용자에게 보여준다.
   - 변경 내용에 맞는 간단한 커밋 메시지를 제안한다.
   - **커밋 전에 사용자 확인을 받는다.**

5. 확인받으면 `git add`(관련 파일만, `-A`/`.` 금지) → `git commit`.

6. **push 직전에 다시 한번 확인을 받는다.** push하면 실제 라이브 사이트가 GitHub Actions를 통해 곧바로 갱신된다는 점을 짧게 상기시킨다. force push는 하지 않는다.

7. push 후, GitHub Actions 워크플로(`Deploy Pages`)가 실행 중이라는 것과 몇 분 뒤 `https://devmoonpy.github.io/knowledge/`에서 확인할 수 있다는 것을 안내한다. `gh run watch`로 진행 상황을 지켜볼 수 있다고 알려줘도 좋다(원하면).
