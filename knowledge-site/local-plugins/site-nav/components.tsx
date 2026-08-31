import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "../../quartz/components/types"

// content/ 바로 아래 폴더들을 메뉴로 자동 생성한다. 새 섹션을 추가하고 싶으면
// content/에 폴더만 새로 만들면 되고, 이 컴포넌트를 다시 고칠 필요는 없다.
const EXCLUDED_SECTIONS = new Set(["tags", "404"])

function getSections(allFiles: QuartzComponentProps["allFiles"]): string[] {
  const sections = new Set<string>()
  for (const file of allFiles) {
    const slug = String(file?.slug ?? "")
    const [first, ...rest] = slug.split("/")
    if (first && rest.length > 0 && !EXCLUDED_SECTIONS.has(first)) {
      sections.add(first)
    }
  }
  return [...sections].sort()
}

export const SiteNav = (() => {
  const Component: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
    const currentSlug = String(fileData?.slug ?? "")
    const sections = getSections(allFiles)

    return (
      <div class={`site-nav ${displayClass ?? ""}`}>
        <nav class="site-nav-menu">
          {sections.map((slug) => {
            const isActive = currentSlug === slug || currentSlug.startsWith(`${slug}/`)
            return (
              <a class={`site-nav-link${isActive ? " is-active" : ""}`} href={`/${slug}/`}>
                {slug}
              </a>
            )
          })}
        </nav>
      </div>
    )
  }

  Component.css = `
.site-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0.5rem 0 0.75rem;
  border-bottom: 1px solid var(--lightgray);
  margin-bottom: 1rem;
  font-family: var(--codeFont);
  font-size: 0.85rem;
}

.site-nav-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.site-nav-link {
  color: var(--darkgray);
  text-decoration: none;
  padding: 0.2rem 0.55rem;
  border: 1px solid var(--lightgray);
  background: var(--light);
  transition:
    color 0.15s ease-out,
    border-color 0.15s ease-out;
}

.site-nav-link:hover {
  color: var(--secondary);
  border-color: var(--secondary);
}

.site-nav-link.is-active {
  color: var(--light);
  background: var(--secondary);
  border-color: var(--secondary);
}
`

  return Component
}) satisfies QuartzComponentConstructor
