// Parte del analista (Fluidra, corte 2026-10-19). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const cargar = async (n) => (existsSync(join(aqui, n)) ? (await import(pathToFileURL(join(aqui, n)).href + `?t=${Date.now()}`)) : {});
const { supuestos = {} } = await cargar('supuestos.mjs');
const { textos = {} } = await cargar('textos.mjs');
const { textos2 = {} } = await cargar('textos2.mjs');
const { contexto = {}, fuentesP = [], textos2: textos2b = null } = await cargar('contexto.mjs');
const { resumen = null } = await cargar('resumen.mjs');
const { ajustes = {} } = await cargar('ajustes.mjs');

const base = {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE',
  },
  identificacion: { proximos_resultados: '2026-10-29', sector: 'Industria (GICS)', industria: 'Equipos de piscina y wellness', sede: 'Sant Cugat del Vallès (Barcelona)', fundacion: '1969', empleados: 6753, web: 'www.fluidra.com' },
  fuentes: [
    { id: 1, titulo: 'Fluidra, S.A. - calendario de eventos (resultados de los nueve meses de 2026 el 29-oct-2026)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/FLUIDRA-S-A-365952/calendar/' },
    { id: 2, titulo: 'Fluidra delivers a strong first half of 2026 (nota de prensa, 30-jul-2026)', editor: 'Fluidra, S.A.', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://www.fluidra.com/wp-content/uploads/2026/07/NP_H126_ENG_v6-final.pdf' },
  ],
  huecos: [],
  _parches: [],
  huecos_resueltos: [{ seccion: 'dcf', campo: "Nota de rating de Moody's y S&P" }],
};

const out = structuredClone(base);
const fundir = (a, b) => {
  for (const [k, v] of Object.entries(b || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v) && a[k] && typeof a[k] === 'object' && !Array.isArray(a[k])) fundir(a[k], v);
    else a[k] = v;
  }
};
fundir(out, ajustes);
fundir(out, supuestos);
fundir(out, textos);
const t2 = textos2b || textos2;
const narr = t2.escenarios?.casos || [];
if (t2.escenarios) delete t2.escenarios.casos;
fundir(out, t2);
fundir(out, contexto);
out.fuentes = [...base.fuentes, ...fuentesP];
for (const c of out.escenarios?.casos || []) { const t = narr.find((x) => x.escenario === c.escenario); if (t) c.narrativa = t.narrativa; }
if (ajustes._parches) out._parches = [...(base._parches || []), ...ajustes._parches];
if (resumen) out.resumen = resumen;
export default out;
