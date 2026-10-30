// desdoblamiento.mjs — pasa un informe value a acciones de después de un desdoblamiento (split) o contrasplit, sin
// investigación nueva. Parte del último datos(-vN).json de la carpeta y escribe datos-v(N+1).json con:
//   · acciones × factor (identificacion.acciones, financieros.cuenta[].acciones_diluidas, ltm);
//   · cifras por acción ÷ factor: precio y rango, BPA y DPA (cuenta, LTM, trimestres, consenso), BPA de los escenarios del
//     objetivo a 12 meses, consenso del objetivo y precios de cierre de la historia de múltiplos.
// Los múltiplos (PER, EV/EBITDA), el DCF en millones y los porcentajes no cambian. Los textos del Word quedan en acciones
// de antes: el informe nuevo lo dice en meta.limitaciones y se regenera solo si se rehace el análisis.
// Uso: node herramientas/desdoblamiento.mjs informes/<carpeta> --factor 5 --fecha AAAA-MM-DD [--simular]
//   (--fecha: primera sesión que cotiza en acciones nuevas; factor 5 = 1 acción pasa a 5).
// Después: node motor/calcular-empresa.mjs --datos <nuevo>, node herramientas/apuntar-12m.mjs <carpeta> --precios y robustez.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith('--'));
const val = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const factor = Number(val('--factor'));
const fecha = val('--fecha');
if (!dir || !(factor > 0) || !/^\d{4}-\d{2}-\d{2}$/.test(fecha || '')) {
  console.error('Uso: node herramientas/desdoblamiento.mjs informes/<carpeta> --factor N --fecha AAAA-MM-DD [--simular]');
  process.exit(1);
}

const versiones = readdirSync(dir).filter((a) => /^datos(-v\d+)?\.json$/.test(a))
  .map((a) => ({ a, n: Number(a.match(/-v(\d+)/)?.[1] ?? 1) })).sort((x, y) => x.n - y.n);
const ultimo = versiones.at(-1);
const d = JSON.parse(readFileSync(join(dir, ultimo.a), 'utf8'));
if ((d.meta?.desdoblamientos || []).some((s) => s.fecha === fecha)) {
  console.error(`${ultimo.a} ya lleva el desdoblamiento del ${fecha}: no se aplica dos veces.`);
  process.exit(1);
}
delete d.calc;

const cambios = [];
const r2 = (x) => Math.round(x * 1e4) / 1e4;
const div = (o, k, ruta) => { if (o && typeof o[k] === 'number') { const v = r2(o[k] / factor); cambios.push(`${ruta}: ${o[k]} → ${v}`); o[k] = v; } };
const mul = (o, k, ruta) => { if (o && typeof o[k] === 'number') { const v = r2(o[k] * factor); cambios.push(`${ruta}: ${o[k]} → ${v}`); o[k] = v; } };

const id = d.identificacion || {};
mul(id, 'acciones', 'identificacion.acciones');
for (const k of ['precio', 'max_52s', 'min_52s']) div(id, k, `identificacion.${k}`);
for (const [i, c] of (d.financieros?.cuenta || []).entries()) {
  mul(c, 'acciones_diluidas', `financieros.cuenta[${i}].acciones_diluidas`);
  for (const k of ['bpa', 'dpa', 'dpa_extraordinario']) div(c, k, `financieros.cuenta[${i}].${k}`);
}
const ltm = d.financieros?.ltm;
mul(ltm, 'acciones_diluidas', 'financieros.ltm.acciones_diluidas');
for (const k of ['bpa', 'dpa', 'dpa_extraordinario']) div(ltm, k, `financieros.ltm.${k}`);
for (const [i, t] of (d.trimestres?.items || []).entries()) div(t, 'bpa', `trimestres.items[${i}].bpa`);
for (const [i, e] of (d.consenso?.estimaciones || []).entries()) for (const k of ['bpa', 'dpa']) div(e, k, `consenso.estimaciones[${i}].${k}`);
for (const k of ['objetivo_medio', 'objetivo_min', 'objetivo_max']) div(d.consenso, k, `consenso.${k}`);
for (const [i, s] of (d.multiplos_historicos?.serie || []).entries()) div(s, 'precio_cierre', `multiplos_historicos.serie[${i}].precio_cierre`);
const o12 = d.valoracion?.objetivo_12m;
if (o12) {
  for (const [i, c] of (o12.casos || []).entries()) { div(c, 'beneficio_por_accion', `objetivo_12m.casos[${i}].beneficio_por_accion`); div(c, 'precio', `objetivo_12m.casos[${i}].precio`); }
  for (const k of ['bpa_ano1', 'bpa_ano2', 'objetivo_medio', 'objetivo_min', 'objetivo_max']) div(o12.consenso, k, `objetivo_12m.consenso.${k}`);
  div(o12, 'media', 'objetivo_12m.media');
}
if (d.bolsa?.identificacion) for (const k of ['precio', 'max_52s', 'min_52s']) div(d.bolsa.identificacion, k, `bolsa.identificacion.${k}`);

const nota = `Desdoblamiento de ${factor} por 1 desde el ${fecha}: las cifras por acción de esta versión (${`datos-v${ultimo.n + 1}.json`}) están en acciones nuevas (÷ ${factor}) y las acciones × ${factor}; los textos y el Word anteriores siguen en acciones de antes.`;
d.meta = d.meta || {};
d.meta.desdoblamientos = [...(d.meta.desdoblamientos || []), { fecha, factor, desde: ultimo.a }];
d.meta.limitaciones = [d.meta.limitaciones, nota].filter(Boolean).join(' ');

const salida = join(dir, `datos-v${ultimo.n + 1}.json`);
console.log(`${ultimo.a} → ${salida}: ${cambios.length} cifras cambiadas.`);
for (const c of cambios) console.log(`  ${c}`);
if (args.includes('--simular')) console.log('(simulación: no se escribe nada)');
else writeFileSync(salida, JSON.stringify(d, null, 2));
