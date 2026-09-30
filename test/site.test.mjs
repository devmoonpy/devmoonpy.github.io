import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync, existsSync, readdirSync } from "node:fs"
const html = readFileSync("site/index.html", "utf8")
test("English identity, only approved links", () => {
  assert.match(html, /<html lang="en">/)
  assert.match(html, /<title>mazino — Hacker<\/title>/)
  for (const text of ["Web Security", "Server Security", "Network Security", "FORYOUCOM", "GitHub"]) assert.ok(html.includes(text))
  assert.doesNotMatch(html, /MZ \/|mz_|Notes|Quartz|cheatsheets|explorer|graph|<script/i)
})
test("Favicon and social previews use new penguin assets", () => {
  assert.match(html, /rel="icon"[^>]*href="\/assets\/favicon.png"/)
  assert.match(html, /property="og:image" content="https:\/\/devmoonpy.github.io\/assets\/mazino.png"/)
  for (const name of ["favicon.png", "mazino.png"]) assert.ok(existsSync(`site/assets/${name}`))
})
test("Local links resolve and site has no legacy pages", () => {
  for (const [, target] of html.matchAll(/(?:href|src)="(\/[^\"]+)"/g)) assert.ok(existsSync(`site${target}`), target)
  assert.deepEqual(readdirSync("site").sort(), ["assets", "index.html", "styles.css"])
})
test("Responsive and keyboard-accessible stylesheet", () => {
  const css = readFileSync("site/styles.css", "utf8")
  assert.match(css, /max-width: 600px/)
  assert.match(css, /focus-visible/)
  assert.match(css, /100svh/)
})
