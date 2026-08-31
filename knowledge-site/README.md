# knowledge-site

[devmoonpy.github.io](https://devmoonpy.github.io/)를 만드는 [Quartz v5](https://quartz.jzhao.xyz/) 소스. 저장소 루트의 README를 참고.

- 콘텐츠: `content/`
- 커스텀 상단 메뉴(content/ 폴더 구조에서 자동 생성): `local-plugins/site-nav/`
- 테마 오버라이드: `quartz/styles/custom.scss`
- 설정: `quartz.config.yaml`

빌드는 저장소 루트에서 `npm run build`로 실행한다. 이 폴더에서 직접 미리보기하려면:

```bash
npx quartz build --serve
```
