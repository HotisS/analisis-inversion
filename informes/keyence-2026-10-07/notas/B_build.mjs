// B_build.mjs: genera notas/B.json a partir de B_parte1.json (historia, negocio) y B_parte2.json (sector, competencia, esg) + fuentes.
import fs from 'fs';
const dir = new URL('./', import.meta.url);
const rd = f => fs.existsSync(new URL(f, dir)) ? JSON.parse(fs.readFileSync(new URL(f, dir), 'utf8')) : {};
const p1 = rd('B_parte1.json'), p2 = rd('B_parte2.json'), fu = rd('B_fuentes.json');
const B = {
  historia: p1.historia ?? null,
  negocio: p1.negocio ?? null,
  sector: p2.sector ?? null,
  competencia: p2.competencia ?? null,
  esg: p2.esg ?? null,
  fuentes: fu.fuentes ?? [],
  huecos: (p1.huecos ?? []).concat(p2.huecos ?? []),
};
// comprobación de citas
const txt = JSON.stringify([B.historia, B.negocio, B.sector, B.competencia, B.esg]);
const ids = new Set(B.fuentes.map(f => f.id));
const citadas = new Set();
for (const m of txt.matchAll(/\[([0-9][0-9 ,\-–]*)\]/g)) {
  for (const part of m[1].split(',')) {
    const r = part.trim().split(/[-–]/).map(Number);
    if (r.length === 2) for (let i = r[0]; i <= r[1]; i++) citadas.add(i); else citadas.add(r[0]);
  }
}
const faltan = [...citadas].filter(i => !ids.has(i));
const sinCitar = [...ids].filter(i => !citadas.has(i));
fs.writeFileSync(new URL('B.json', dir), JSON.stringify(B, null, 2));
console.log('B.json escrito:', Object.entries(B).map(([k, v]) => k + ':' + (v === null ? 'null' : Array.isArray(v) ? v.length : 'ok')).join(' '));
console.log('citas sin fuente:', faltan.join(',') || 'ninguna', '| fuentes sin citar:', sinCitar.join(',') || 'ninguna');
