// Variantes del DCF (sensibilidades propias) sobre una copia de datos.json en %TEMP%. No toca datos.json.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { modelo, construir } from './supuestos.mjs';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(aqui, '../../..');
const tmp = path.join(os.tmpdir(), 'analisis-inversion', 'edenred');
fs.mkdirSync(tmp, { recursive: true });
const base = JSON.parse(fs.readFileSync(path.join(aqui, '..', 'datos.json'), 'utf8'));

function correr(nombre, mod) {
  const d = structuredClone(base);
  delete d.calc;
  mod(d);
  const f = path.join(tmp, `var-${nombre}.json`);
  fs.writeFileSync(f, JSON.stringify(d));
  execFileSync('node', [path.join(repo, 'motor/calcular-empresa.mjs'), '--datos', f], { stdio: 'ignore' });
  const r = JSON.parse(fs.readFileSync(f, 'utf8')).calc;
  return { variante: nombre, dcf: r.dcf.valor_accion, wacc: r.dcf.wacc, objetivo: r.sintesis?.valor_objetivo ?? null, crec_impl: r.dcf.inverso?.crecimiento_implicito_pct };
}

const conMargenes = (d, filas) => { d.dcf.anios.forEach((a, i) => { if (!a.fijo) { a.margen_ebitda_pct = Math.round(filas[i].margen * 100) / 100; a.crecimiento_pct = Math.round(filas[i].g_tot * 100) / 100; } }); };

const res = [];
res.push(correr('base', () => {}));
// (A') Criterio de la empresa: la caja del float no restringida es caja libre (puente sin los 2.739 M), su crecimiento neto de la caja
// restringida es flujo libre (circulante total + caja restringida: −3.940 M a dic-25, −133 % de las ventas; −120 % tras el plazo de 15 días de Brasil)
// y se quita del EBITDA el rendimiento de esa caja (64 % del other revenue) para no contarlo dos veces.
res.push(correr('criterio-empresa', (d) => {
  d.valoracion.puente.otros_ajustes -= 2739;
  const b = d.balance.historico.at(-1); b.clientes = 3609 + 1661; b.proveedores = 9210;
  conMargenes(d, construir(modelo, { retenido: 0.36 }));
  d.dcf.anios.forEach((a, i) => { a.nwc_pct_ventas = i === 0 ? -120.5 : -120; });
}));
res.push(correr('criterio-empresa-sin-corregir', (d) => {
  d.valoracion.puente.otros_ajustes -= 2739;
  const b = d.balance.historico.at(-1); b.clientes = 3609 + 1661; b.proveedores = 9210;
  d.dcf.anios.forEach((a, i) => { a.nwc_pct_ventas = i === 0 ? -120.5 : -120; });
}));
res.push(correr('tipos-100pb', (d) => conMargenes(d, construir(modelo, { delta_rend: -1 }))));
// BRL −10 %: −25 M de EBIT al año (URD 2025, nota 6.6) ≈ −0,8 puntos de margen en 2027e.
res.push(correr('brl-10', (d) => d.dcf.anios.forEach((a) => { if (!a.fijo) a.margen_ebitda_pct -= 25 / 3163 * 100; })));
res.push(correr('beta-cac40-0.83', (d) => { d.dcf.wacc.beta = 0.83; }));
res.push(correr('beta-stoxx-sem2a-1.09', (d) => { d.dcf.wacc.beta = 1.09; }));
res.push(correr('minoritarios-contable', (d) => { d.valoracion.puente.minoritarios = 122; }));
res.push(correr('etapa2-5a', (d) => { d.dcf.etapa2 = { ...d.dcf.etapa2, usar: true, anios: 5 }; }));
res.push(correr('comparables-20', (d) => { d.valoracion.pesos = { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 }; }));
console.table(res);
