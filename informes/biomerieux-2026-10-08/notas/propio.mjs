// Parte del analista (bioMérieux, corte 2026-10-08). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const cargar = async (n) => (existsSync(join(aqui, n)) ? (await import(pathToFileURL(join(aqui, n)).href + `?t=${Date.now()}`)) : {});
const { supuestos = {} } = await cargar('supuestos.mjs');
const { textos = {} } = await cargar('textos.mjs');
const { resumen = null } = await cargar('resumen.mjs');
const { textos2 = {} } = await cargar('textos2.mjs');
import { readFileSync } from 'node:fs';
const E = JSON.parse(readFileSync(join(aqui, 'E.json'), 'utf8'));
// Comparables: solo DIV puro; Danaher, Thermo Fisher y Revvity (herramientas de laboratorio diversificadas, ~20x) quedan en el texto.
const DIVERSIFICADAS = ['Danaher', 'Thermo Fisher', 'Revvity'];
const compPuros = E.comparables.empresas.filter((c) => !DIVERSIFICADAS.includes(c.nombre));

const base = {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE',
  },
  identificacion: { sector: 'Salud', industria: 'Equipos y suministros sanitarios (diagnóstico in vitro)', sede: "Marcy-l'Étoile (Lyon, Francia)", fundacion: '1963', empleados: 15078, web: 'www.biomerieux.com' },
  fuentes: [
    { id: 1, titulo: 'First-Half 2026 Results (comunicado de 28 de julio de 2026, con el calendario: ventas del 3T26 el 30 de octubre de 2026)', editor: 'bioMérieux', tipo: 'Primaria', fecha: '2026-07-28', url: 'https://www.biomerieux.com/content/dam/biomerieux-com/investor/regulated-informations/2026/press-releases/PR-bioMerieux-Financial-Results-H1-2026.pdf' },
    { id: 2, titulo: 'Informations mensuelles relatives au nombre total de droits de vote et d\'actions au 30/09/2026', editor: 'bioMérieux', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.biomerieux.com/content/dam/biomerieux-com/investor/regulated-informations/2026/total-number-of-voting-rights-and-shares/Declaration-Capital-et-droits-de-vote-au-30-09-2026.pdf' },
    { id: 3, titulo: 'LCD L39001 MolDX: Multiplex Nucleic Acid Amplification Test (NAAT) Panels for Infectious Disease Testing (revisión R6, en vigor desde el 5-feb-2026)', editor: 'CMS, Medicare Coverage Database (Noridian / MolDX)', tipo: 'Primaria', fecha: '2026-02-05', url: 'https://www.cms.gov/medicare-coverage-database/view/lcd.aspx?lcdid=39001' },
  ],
  huecos: [],
  huecos_resueltos: [{ seccion: 'sector', campo: 'Estado de la LCD de MolDX L39001 (paneles sindrómicos) y sus límites por número de dianas' }],
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
out.comparables = { ...(out.comparables || {}), empresas: compPuros };
const narr = textos.escenarios?.casos || [];
if (textos.escenarios) delete textos.escenarios.casos;
fundir(out, textos);
fundir(out, textos2);
for (const c of out.escenarios?.casos || []) { const t = narr.find((x) => x.escenario === c.escenario); if (t) c.narrativa = t.narrativa; }
if (resumen) out.resumen = resumen;
export default out;
