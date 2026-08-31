// local-plugins/site-nav/components.tsx
import { jsx } from "preact/jsx-runtime";
var EXCLUDED_SECTIONS = /* @__PURE__ */ new Set(["tags", "404"]);
function getSections(allFiles) {
  const sections = /* @__PURE__ */ new Set();
  for (const file of allFiles) {
    const slug = String(file?.slug ?? "");
    const [first, ...rest] = slug.split("/");
    if (first && rest.length > 0 && !EXCLUDED_SECTIONS.has(first)) {
      sections.add(first);
    }
  }
  return [...sections].sort();
}
var SiteNav = (() => {
  const Component = ({ fileData, allFiles, displayClass }) => {
    const currentSlug = String(fileData?.slug ?? "");
    const sections = getSections(allFiles);
    return /* @__PURE__ */ jsx("div", { class: `site-nav ${displayClass ?? ""}`, children: /* @__PURE__ */ jsx("nav", { class: "site-nav-menu", children: sections.map((slug) => {
      const isActive = currentSlug === slug || currentSlug.startsWith(`${slug}/`);
      return /* @__PURE__ */ jsx("a", { class: `site-nav-link${isActive ? " is-active" : ""}`, href: `/${slug}/`, children: slug });
    }) }) });
  };
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
`;
  return Component;
});
export {
  SiteNav
};
