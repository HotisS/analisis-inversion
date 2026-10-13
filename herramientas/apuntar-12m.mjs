// Apunta una revisión a 12 meses v2 (verticales/empresa/objetivo-12m.md) en verticales/empresa/objetivo12m-revisados.json
// y calcula lo que es igual para todas: media ponderada con las probabilidades de los escenarios del informe,
// rentabilidad del base y señal (Comprar si ponderada ≥ 15 % y base ≥ 12 %; Vender si ponderada ≤ −10 %).
// Sin dependencias.
//
//   node herramientas/apuntar-12m.mjs '<línea JSON>' ['<línea JSON>' …]
//
// Cada línea: {"ticker","carpeta","fecha","objetivo_12m","rentabilidad_12m_pct","senal","base","nota"}, con la nota
// «bajista PERx × BPA = X; base PERx × BPA = Y; alcista PERx × BPA = Z; ejercicio …; convicción …» (de ahí salen los
// tres objetivos). Después: node herramientas/seguimiento.mjs.
import { readFileSync, writeFileSync } from 'node:fs';
import { ultimoDatos } from './objetivo12m.mjs';

const P = new URL('../verticales/empresa/objetivo12m-revisados.json', import.meta.url);
const J = JSON.parse(readFileSync(P, 'utf8'));
const num = (s) => +s.replace(/\./g, '').replace(',', '.');
const tomar = (nota, k) => { const m = nota.match(new RegExp(k + '[^;]*?=\\s*([\\d.]+(?:,\\d+)?)')); return m ? num(m[1]) : null; };

for (const linea of process.argv.slice(2)) {
  const r = JSON.parse(linea);
  const t = String(r.ticker).trim().toUpperCase().replace(/\s+/g, '-');
  const d = ultimoDatos(r.carpeta);
  if (!d) throw new Error(`Carpeta sin datos: ${r.carpeta}`);
  const p = d.identificacion.precio, div = d.calc?.recomendacion?.dividendo_pct || 0;
  const b = tomar(r.nota, 'bajista'), m = r.base ?? tomar(r.nota, 'base'), a = tomar(r.nota, 'alcista');
  if ([b, m, a].some((x) => x === null)) throw new Error(`${t}: la nota no trae «bajista … = X; base … = Y; alcista … = Z»`);
  const pr = (d.escenarios?.casos || []).map((c) => +c.probabilidad_pct || 0);
  const [pb, pm, pa] = pr.length === 3 && pr.reduce((s, x) => s + x, 0) > 0 ? pr : [25, 50, 25];
  const pond = (b * pb + m * pm + a * pa) / (pb + pm + pa), rp = (pond / p - 1) * 100 + div, rb = (m / p - 1) * 100 + div;
  J.revisados[t] = { fecha: r.fecha, carpeta: r.carpeta, rentabilidad_12m_pct: r.rentabilidad_12m_pct, objetivo_12m: r.objetivo_12m, senal: r.senal,
    objetivo_base: m, nota: r.nota, objetivo_bajista: b, objetivo_alcista: a, probabilidades: [pb, pm, pa],
    objetivo_ponderado: +pond.toFixed(2), rentabilidad_ponderada_pct: +rp.toFixed(1), rentabilidad_base_pct: +rb.toFixed(1),
    senal_ponderada: rp >= 15 && rb >= 12 ? 'Comprar' : rp <= -10 ? 'Vender' : 'Mantener' };
  console.log(`${t}: ponderada ${rp.toFixed(1)} %, base ${rb.toFixed(1)} % → ${J.revisados[t].senal_ponderada}`);
}
writeFileSync(P, JSON.stringify(J, null, 2) + '\n');
