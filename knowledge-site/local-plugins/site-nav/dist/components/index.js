import { jsx, jsxs } from "preact/jsx-runtime"
const SiteNav = () => {
  const Component = ({ fileData, displayClass }) => {
    const slug = String(fileData?.slug ?? "")
    return /* @__PURE__ */ jsxs("nav", {
      class: `site-nav ${displayClass ?? ""}`,
      "aria-label": "Main navigation",
      children: [
        /* @__PURE__ */ jsxs("a", {
          class: "site-nav-brand",
          href: "/",
          children: ["mazino", /* @__PURE__ */ jsx("span", { children: "." })],
        }),
        /* @__PURE__ */ jsxs("div", {
          class: "site-nav-menu",
          children: [
            /* @__PURE__ */ jsx("a", { href: "/", children: "Identity" }),
            /* @__PURE__ */ jsx("a", {
              href: "/writing/",
              "aria-current": slug.startsWith("writing") ? "page" : void 0,
              children: "Notes",
            }),
            /* @__PURE__ */ jsx("a", {
              href: "https://github.com/devmoonpy",
              children: "GitHub \u2197",
            }),
          ],
        }),
      ],
    })
  }
  return Component
}
export { SiteNav }
