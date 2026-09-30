import { cpSync, mkdirSync, rmSync } from "node:fs"
rmSync("dist", { recursive: true, force: true })
mkdirSync("dist", { recursive: true })
cpSync("site", "dist", { recursive: true })
console.log("Built clean static site in dist/")
