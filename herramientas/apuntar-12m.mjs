// Apunta la rentabilidad a 12 meses v2 (verticales/empresa/objetivo-12m.md) de uno o varios informes en
// verticales/empresa/objetivo12m-revisados.json. Lee `valoracion.objetivo_12m` del último datos*.json de cada carpeta
// y calcula con la MISMA función que el motor (motor/objetivo12m.mjs): múltiplos con la regla común, media ponderada
// con las probabilidades de los escenarios, rentabilidad del base y señal. Sin dependencias.
//
//   node herramientas/apuntar-12m.mjs <carpeta> [<carpeta> …] [--fecha AAAA-MM-DD]
//
// Después: node herramientas/seguimiento.mjs.
import { readFileSync, writeFileSync } from 'node:fs';
import { ultimoDatos } from './objetivo12m.mjs';
import { calcularObjetivo12m } from '../motor/objetivo12m.mjs';

const P = new URL('../verticales/empresa/objetivo12m-revisados.json', import.meta.url);
const J = JSON.parse(readFileSync(P, 'utf8'));
const args = process.argv.slice(2);
const iF = args.indexOf('--fecha');
const fecha = iF >= 0 ? args.splice(iF, 2)[1] : new Date().toISOString().slice(0, 10);
const f = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));

for (const carpeta of args) {
  const d = ultimoDatos(carpeta);
  if (!d) throw new Error(`Carpeta sin datos: ${carpeta}`);
  const o = d.valoracion?.objetivo_12m;
  if (!o) throw new Error(`${carpeta}: falta valoracion.objetivo_12m`);
  const precio = +d.identificacion.precio, div = +(d.calc?.recomendacion?.dividendo_pct || 0);
  const prob = ['bajista', 'base', 'alcista'].map((k) => (d.escenarios?.casos || []).find((e) => new RegExp(k, 'i').test(e.escenario || ''))?.probabilidad_pct ?? null);
  const c = calcularObjetivo12m(o, { precio, dpa: (div / 100) * precio, prob: prob.every((x) => x !== null) ? prob : null, valorIntrinseco: d.calc?.sintesis?.valor_objetivo ?? null, confianza: d.resumen?.confianza ?? null });
  if (!c?.completo) throw new Error(`${carpeta}: objetivo_12m incompleto`);
  const previo = Object.entries(J.revisados).find(([, v]) => v.carpeta === carpeta)?.[0];
  const t = previo || String(d.identificacion.ticker).trim().toUpperCase().replace(/\s+/g, '-');
  const [b, m, a] = c.filas;
  const nota = `${c.version} regla común${c.senal_sin_confirmar ? ` (${c.senal_sin_confirmar} pendiente de confirmar datos: confianza baja)` : ''}: bajista ${f(b.multiplo, 1)}x × ${f(b.beneficio_por_accion)} = ${f(b.precio)}; base ${f(m.multiplo, 1)}x × ${f(m.beneficio_por_accion)} = ${f(m.precio)}; alcista ${f(a.multiplo, 1)}x × ${f(a.beneficio_por_accion)} = ${f(a.precio)}; ejercicio ${o.ejercicio}; precio ${f(precio)}`;
  J.revisados[t] = { fecha, carpeta, precio_ref: precio, objetivo_12m: c.objetivo_ponderado, rentabilidad_12m_pct: c.rentabilidad_simple_pct, senal: c.senal,
    objetivo_base: c.objetivo_base, nota, objetivo_bajista: b.precio, objetivo_alcista: a.precio, multiplos: c.filas.map((x) => x.multiplo),
    probabilidades: c.probabilidades, objetivo_ponderado: c.objetivo_ponderado, rentabilidad_ponderada_pct: c.rentabilidad_ponderada_pct,
    rentabilidad_base_pct: c.rentabilidad_base_pct, senal_ponderada: c.senal, comprar_por_debajo: c.comprar_por_debajo, vender_por_encima: c.vender_por_encima };
  console.log(`${t}: ponderada ${c.rentabilidad_ponderada_pct} %, base ${c.rentabilidad_base_pct} % → ${c.senal}`);
}
writeFileSync(P, JSON.stringify(J, null, 2) + '\n');
