// local-plugins/portfolio-nav/components.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var SECTIONS = [
  { label: "knowledge", slug: "" },
  { label: "projects", slug: "projects" },
  { label: "security", slug: "security" },
  { label: "server-network", slug: "server-network" },
  { label: "decisions", slug: "decisions" }
];
var PortfolioNav = (() => {
  const Component = ({ fileData, displayClass }) => {
    const currentSlug = String(fileData?.slug ?? "");
    return /* @__PURE__ */ jsxs("div", { class: `portfolio-nav ${displayClass ?? ""}`, children: [
      /* @__PURE__ */ jsx("a", { class: "portfolio-nav-back", href: "/", children: "\u2190 portfolio" }),
      /* @__PURE__ */ jsx("nav", { class: "portfolio-nav-menu", children: SECTIONS.map(({ label, slug }) => {
        const isActive = slug === "" ? currentSlug === "" : currentSlug === slug || currentSlug.startsWith(`${slug}/`);
        const href = slug === "" ? "/knowledge/" : `/knowledge/${slug}/`;
        return /* @__PURE__ */ jsx("a", { class: `portfolio-nav-link${isActive ? " is-active" : ""}`, href, children: label });
      }) })
    ] });
  };
  Component.css = `
.portfolio-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  width: 100%;
  padding: 0.5rem 0 0.75rem;
  border-bottom: 1px solid var(--lightgray);
  margin-bottom: 1rem;
  font-family: var(--codeFont);
  font-size: 0.85rem;
}

.portfolio-nav-back {
  color: var(--gray);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease-out;
}

.portfolio-nav-back:hover {
  color: var(--tertiary);
}

.portfolio-nav-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-left: auto;
}

.portfolio-nav-link {
  color: var(--darkgray);
  text-decoration: none;
  padding: 0.2rem 0.55rem;
  border: 1px solid var(--lightgray);
  background: var(--light);
  transition:
    color 0.15s ease-out,
    border-color 0.15s ease-out;
}

.portfolio-nav-link:hover {
  color: var(--secondary);
  border-color: var(--secondary);
}

.portfolio-nav-link.is-active {
  color: var(--light);
  background: var(--secondary);
  border-color: var(--secondary);
}

@media all and (max-width: 600px) {
  .portfolio-nav {
    gap: 0.5rem;
  }

  .portfolio-nav-menu {
    margin-left: 0;
    width: 100%;
  }
}
`;
  return Component;
});
export {
  PortfolioNav
};
