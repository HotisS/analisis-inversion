// Fichas de Yahoo (cuentas anuales: ventas, EBIT, EBITDA, capital invertido) de los competidores. Uso: NODE_USE_ENV_PROXY=1 node fichas.mjs
import { ficha } from '../../../../herramientas/yahoo.mjs';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const out = {};
for (const t of ['COR', 'MCK', 'CAH', 'HSIC', '7459.T', '2784.T', '9987.T', 'GALE.SW', 'EBO.AX', '1099.HK']) {
  try {
    const f = await ficha(t);
    const anios = Object.keys(f.anual).sort();
    const ult = anios.at(-1), a = f.anual[ult];
    const roic = a.EBIT && a.InvestedCapital ? a.EBIT * (1 - (a.TaxRateForCalcs ?? 0.25)) / a.InvestedCapital * 100 : null;
    out[t] = { nombre: f.nombre, divisa_cuentas: f.divisa_cuentas, ejercicio: ult, ventas: a.TotalRevenue / 1e6, ebit: a.EBIT / 1e6, ebitda: a.EBITDA / 1e6, margen_ebit: a.EBIT / a.TotalRevenue * 100, roic, anual: Object.fromEntries(anios.map((k) => [k, { ventas: f.anual[k].TotalRevenue / 1e6, ebit: f.anual[k].EBIT / 1e6 }])) };
    console.log(t, ult, f.divisa_cuentas, Math.round(a.TotalRevenue / 1e6), 'EBIT%', (a.EBIT / a.TotalRevenue * 100).toFixed(2), 'ROIC', roic?.toFixed(1));
  } catch (e) { console.log(t, 'error', e.message); }
}
writeFileSync(path.join(dir, '..', 'fichas-competidores.json'), JSON.stringify(out, null, 1));
