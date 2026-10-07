// Construye notas/A.json a partir de las piezas de A-parte-*.cjs
const fs = require("fs");
const path = require("path");
const dir = __dirname;
const out = JSON.parse(fs.readFileSync(path.join(dir, "A.json"), "utf8"));
for (const f of fs.readdirSync(dir).filter(f => /^A-parte-.*\.cjs$/.test(f)).sort()) {
  const parte = require(path.join(dir, f));
  Object.assign(out, parte);
}
fs.writeFileSync(path.join(dir, "A.json"), JSON.stringify(out, null, 2));
console.log("A.json:", Object.keys(out).map(k => k + "=" + (out[k] === null ? "null" : "ok")).join(" "));
