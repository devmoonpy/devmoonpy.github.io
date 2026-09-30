import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "../../quartz/components/types"

export const SiteNav = (() => {
  const Component: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const slug = String(fileData?.slug ?? "")
    return (
      <nav class={`site-nav ${displayClass ?? ""}`} aria-label="Main navigation">
        <a class="site-nav-brand" href="/">
          mazino<span>.</span>
        </a>
        <div class="site-nav-menu">
          <a href="/">Identity</a>
          <a href="/writing/" aria-current={slug.startsWith("writing") ? "page" : undefined}>
            Notes
          </a>
          <a href="https://github.com/devmoonpy">GitHub ↗</a>
        </div>
      </nav>
    )
  }
  return Component
}) satisfies QuartzComponentConstructor
