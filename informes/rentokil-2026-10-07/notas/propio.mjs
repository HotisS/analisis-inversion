// Parte del analista (Rentokil Initial, corte 2026-10-07). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const cargar = async (n) => (existsSync(join(aqui, n)) ? (await import(pathToFileURL(join(aqui, n)).href + `?t=${Date.now()}`)) : {});
const { textos = {} } = await cargar('textos.mjs');
const { supuestos = {} } = await cargar('supuestos.mjs');
const { textos2 = {} } = await cargar('textos2.mjs');
const { resumen = null } = await cargar('resumen.mjs');

const base = {
  meta: {
    fecha_corte: '2026-10-07', divisa: 'USD', divisa_cotizacion: 'GBp', tipo_cambio: 0.013276, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (adoptadas en el Reino Unido y emitidas por el IASB)',
  },
  identificacion: { pais_iso: 'GB', sector: 'Industria (GICS)', industria: 'Servicios comerciales y suministros', sede: 'Crawley (Reino Unido); oficina de Norteamérica en Dallas', fundacion: '1925', empleados: 63400, web: 'www.rentokil-initial.com' },
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Financial calendar (Q3 Trading Update, 22 de octubre de 2026)', editor: 'Rentokil Initial plc', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://www.rentokil-initial.com/investors/financial-calendar' },
  ],
  huecos: [],
  _parches: [],
};

const out = structuredClone(base);
const fundir = (a, b) => {
  for (const [k, v] of Object.entries(b || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v) && a[k] && typeof a[k] === 'object' && !Array.isArray(a[k])) fundir(a[k], v);
    else a[k] = v;
  }
};
fundir(out, supuestos);
fundir(out, textos);
const narr = textos2.escenarios?.casos || [];
if (textos2.escenarios) delete textos2.escenarios.casos;
fundir(out, textos2);
for (const c of out.escenarios?.casos || []) { const t = narr.find((x) => x.escenario === c.escenario); if (t) c.narrativa = t.narrativa; }
if (resumen) out.resumen = resumen;
export default out;
