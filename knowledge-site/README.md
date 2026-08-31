# knowledge-site

[devmoonpy.github.io](https://devmoonpy.github.io/)의 `/knowledge/` 지식베이스를 만드는 [Quartz v5](https://quartz.jzhao.xyz/) 소스. 저장소 루트의 README를 참고.

- 콘텐츠: `content/`
- 커스텀 네비게이션(← portfolio 링크 + 메뉴): `local-plugins/portfolio-nav/`
- 테마 오버라이드: `quartz/styles/custom.scss`
- 설정: `quartz.config.yaml`

빌드는 저장소 루트에서 `npm run build`로 (기존 포트폴리오와 함께) 실행한다. 이 폴더만 따로 빌드하려면:

```bash
npx quartz build --serve
```
