// Nota C (equipo y gobierno) de Elevance Health, 26-oct-2026. Fuentes primarias: proxy 2026, 8-K de juntas, Form 4,
// 8-K de cambios de directivos y comunicados de resultados. Escribe notas/C.json.
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
const f4 = JSON.parse(readFileSync(join(aqui, 'form4.json'), 'utf8'));

const fuentes = [
  { id: 1, titulo: 'Elevance Health, proxy statement (DEF 14A) 2026', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-27', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000031/elv-20260326.htm' },
  { id: 2, titulo: 'Elevance Health, 8-K de resultados de la junta de 2026 (item 5.07)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-13', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000046/elv-20260513.htm' },
  { id: 3, titulo: 'Elevance Health, 8-K de resultados de la junta de 2025 (item 5.07)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-05-14', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603925000065/elv-20250514.htm' },
  { id: 4, titulo: 'Elevance Health, 8-K de resultados de la junta de 2024 (item 5.07)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-05-15', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603924000069/axsubmissionofmatterstoavo.htm' },
  { id: 5, titulo: 'Elevance Health, Form 4 de consejeros y directivos (26-oct-2025 a 26-oct-2026), resumidos con herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-26', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001156039&type=4&dateb=&owner=include&count=40' },
  { id: 6, titulo: 'Elevance Health, 8-K del 26-feb-2026 (item 5.02: salida de Peter Haytaian de Carelon; guía reafirmada)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000019/elv-20260226.htm' },
  { id: 7, titulo: 'Elevance Health, 8-K del 2-mar-2026 (item 8.01: aviso de sanciones de CMS en Medicare Advantage)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-02', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000022/elv-20260302.htm' },
  { id: 8, titulo: 'Elevance Health, 8-K del 10-sep-2026 (item 7.01: guía de 2026 reafirmada)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-09-10', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000063/elv-20260910.htm' },
  { id: 9, titulo: 'Elevance Health Reports Third Quarter 2026 Results (8-K, exhibit 99.1)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000068/a3q2026elvearningsrelease.htm' },
  { id: 10, titulo: 'Elevance Health, informe trimestral 10-Q del 3T26', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000071/elv-20260930.htm' },
  { id: 11, titulo: 'Elevance Health, resultados del 4T25 (guía de 2026) (8-K, exhibit 99.1)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-01-28', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000006/a4q2025elvearningsrelease.htm' },
  { id: 12, titulo: 'Elevance Health, resultados del 4T24 (guía de 2025) (8-K, exhibit 99.1)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-01-23', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603925000007/a4q2024elvearningsrelease.htm' },
  { id: 13, titulo: 'Elevance Health, resultados del 4T23 (guía de 2024) (8-K, exhibit 99.1)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-01-24', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000119312524013498/d736006dex991.htm' },
  { id: 14, titulo: 'Elevance Health, resultados del 4T22 (guía de 2023) (8-K, exhibit 99.1)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2023-01-25', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000119312523014676/d418386dex991.htm' },
  { id: 15, titulo: 'Anthem, resultados del 4T21 (guía de 2022) y del 4T20 (guía de 2021) (8-K, exhibit 99.1)', editor: 'Anthem (SEC EDGAR)', tipo: 'Primaria', fecha: '2022-01-26', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000119312522017585/d279540dex991.htm' },
  { id: 16, titulo: 'Elevance Health, informe anual 10-K 2025 (directivos)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-06', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000013/elv-20251231.htm' },
  { id: 17, titulo: 'Elevance Health (ELV) Q3 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.fool.com/earnings/call-transcripts/2026/10/21/elevance-elv-q3-2026-earnings-call-transcript/' },
  { id: 18, titulo: 'Elevance Health, resultados del 2T26 y 1T26 (subidas de guía) (8-K, exhibit 99.1)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-15', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000058/a2q2026elvearningsrelease.htm' },
];

// Compras y ventas en mercado (códigos P y S) de los 12 meses, agrupadas por persona y día
const grupos = new Map();
for (const o of f4.operaciones.filter(o => o.codigo === 'P' || o.codigo === 'S')) {
  const k = `${o.fecha}|${o.persona}|${o.codigo}`;
  const g = grupos.get(k) || { fecha: o.fecha, persona: `${o.persona} (${o.cargo})`, operacion: o.codigo === 'P' ? 'Compra' : 'Venta', acciones: 0, importe: 0 };
  g.acciones += o.acciones; g.importe += o.importe; grupos.set(k, g);
}
const insiders = [...grupos.values()].map(g => ({ ...g, importe: Math.round(g.importe / 1e4) / 100 })).sort((a, b) => b.fecha.localeCompare(a.fecha));

const C = {
  _estado: 'completa (26-oct-2026, 10:30)',
  directivos: {
    equipo: [
      { nombre: 'Gail K. Boudreaux', cargo: 'Presidenta y consejera delegada', desde: '2017', participacion_pct: 0.2, trayectoria: 'Antes dirigió UnitedHealthcare (2008-2014). Con ella el BPA ajustado pasó de 19,44 USD (2019) a 33,14 (2023) y la empresa creó Carelon (farmacia y servicios); en 2024 y 2025 incumplió la guía de enero (37,10 y 34,50 USD frente a 33,04 y 30,29) [12, 13, 14]. Compró 2.725 acciones (1,0 M USD) en julio de 2026 [5]. Participación: 442.597 acciones con opciones ejercitables (0,2 %) [1].' },
      { nombre: 'Mark Kaye', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2023', participacion_pct: 0.01, trayectoria: 'Antes director financiero de Moody’s (2018-2023) y responsable de planificación en MassMutual [16]. Vendió 10.584 acciones por 4,66 M USD el 22-oct-2026, al día siguiente de los resultados, sin plan 10b5-1 [5]. Remuneración de 7,99 M USD en 2025 [1].' },
      { nombre: 'Felicia F. Norwood', cargo: 'Vicepresidenta ejecutiva, responsable de Health Benefits (antes de los negocios públicos)', desde: '2018', participacion_pct: 0.04, trayectoria: 'Antes directora del departamento de sanidad de Illinois (2015-2018) y directiva de Aetna [16]. Dirige el negocio de seguros (Medicare, Medicaid y comercial) y explica la recuperación de Medicare Advantage hacia el margen del 2 % en 2026 [17]. 97.429 acciones con opciones [1].' },
      { nombre: 'Morgan Kendrick', cargo: 'Vicepresidente ejecutivo, presidente de Commercial Health Benefits', desde: '2021', participacion_pct: 0.02, trayectoria: 'En la empresa desde 1995; presidente del negocio comercial desde octubre de 2021 [16]: en la campaña de 2027 recuperó grandes empleadores que se habían ido un año antes [17]. Vendió 3.196 acciones (0,91 M USD) en marzo de 2026 [5].' },
      { nombre: 'Jeff Park', cargo: 'Presidente de Carelon', desde: '2026', participacion_pct: null, trayectoria: 'Sustituye a Peter Haytaian, que dejó Carelon el 4-may-2026 por motivos familiares y sigue de asesor hasta fin de año [6, 17]. Experiencia previa en servicios sanitarios y farmacia, según la dirección [17].' },
      { nombre: 'Ramiro G. Peru', cargo: 'Presidente independiente del consejo', desde: '2004', participacion_pct: 0.0, trayectoria: 'Consejero desde 2004 y presidente independiente desde 2025, tras la jubilación de Elizabeth Tallett [1]. Compró 1.000 acciones (0,37 M USD) en julio de 2026 [5].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'BPA ajustado > 24,50 USD (enero)', real: '25,98 USD', cumplida: 'Sí' },
      { anio: '2022', guia: 'BPA ajustado > 28,25 USD (enero)', real: '29,07 USD', cumplida: 'Sí' },
      { anio: '2023', guia: 'BPA ajustado > 32,60 USD (enero)', real: '33,14 USD', cumplida: 'Sí' },
      { anio: '2024', guia: 'BPA ajustado > 37,10 USD (enero)', real: '33,04 USD', cumplida: 'No' },
      { anio: '2025', guia: 'BPA ajustado de 34,15-34,85 USD (enero)', real: '30,29 USD', cumplida: 'No' },
      { anio: '2026', guia: 'BPA ajustado ≥ 25,50 USD (enero); ≥ 26,75 (abril), ≥ 27,00 (julio) y ≥ 29,00 (octubre)', real: '27,06 USD en nueve meses', cumplida: 'Sí' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Ramiro G. Peru', cargo: 'Presidente', tipo: 'Independiente', desde: '2004', comisiones: 'Remuneración y talento; Gobierno' },
      { nombre: 'Gail K. Boudreaux', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2017', comisiones: null },
      { nombre: 'R. Kerry Clark', cargo: 'Consejero (se jubiló en la junta de 2026)', tipo: 'Independiente', desde: null, comisiones: 'Auditoría; Finanzas' },
      { nombre: 'Steven H. Collis', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría; Finanzas' },
      { nombre: 'Susan D. DeVore', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Finanzas (presidenta); Remuneración y talento' },
      { nombre: 'Robert L. Dixon, Jr.', cargo: 'Consejero', tipo: 'Independiente', desde: '2011', comisiones: 'Remuneración y talento; Finanzas' },
      { nombre: 'Lewis Hay, III', cargo: 'Consejero', tipo: 'Independiente', desde: '2013', comisiones: 'Auditoría; Finanzas' },
      { nombre: 'Bahija Jallal', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Gobierno (presidenta); Remuneración y talento' },
      { nombre: 'Antonio F. Neri', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Remuneración y talento (presidente); Gobierno' },
      { nombre: 'Ryan M. Schneider', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría (presidente); Gobierno' },
      { nombre: 'Amy W. Schulman', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría; Finanzas' },
      { nombre: 'Deanna D. Strable', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría; Gobierno' },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: false,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: false,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: false,
    presidente_vinculado_control: false,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: 91.6,
    voto_remuneracion_contra_pct: 8.2,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 22.58, fijo: 1.6, variable_corto: 2.77, variable_largo: 17.64, ratio_salario_medio: 286 },
    remuneracion: 'La consejera delegada cobró 22,58 M USD en 2025: 1,60 M de fijo, 2,77 M de variable anual (el 86,5 % del objetivo) y 17,64 M en acciones y opciones; la relación con el empleado mediano es de 286 a 1 [1]. El variable anual pesa un 50 % el beneficio neto ajustado, un 20 % los ingresos operativos y un 30 % iniciativas estratégicas; las acciones por objetivos (PSU) miden el BPA ajustado y los ingresos [1]. Ninguna métrica es de rentabilidad sobre el capital ni de caja, y las dos financieras pueden premiar crecer comprando y recomprando. Hay cláusula de recuperación (también por daño reputacional), prohibición de coberturas y pignoración, y voto consultivo anual: 95,9 % a favor en 2026, 91,7 % en 2025 y 91,6 % en 2024 [1, 2, 3, 4].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 10.1, tipo: 'Gestora (13G/A)', variacion: '22,9 M de acciones a 31-dic-2025' },
      { nombre: 'BlackRock', pct: 7.8, tipo: 'Gestora (13G/A)', variacion: '17,7 M de acciones a 31-dic-2025' },
      { nombre: 'Consejeros y directivos (19 personas)', pct: 0.3, tipo: 'Directivos', variacion: '799.910 acciones con opciones ejercitables a 1-feb-2026' },
    ],
    insiders,
    control_y_defensas: 'No hay accionista de control: los dos mayores son gestoras indexadas (Vanguard 10,1 %, BlackRock 7,8 %) [1]. Una sola clase de acciones. La defensa principal es el consejo escalonado (cada consejero se elige para tres años): la empresa dice que lo desclasificará si la asociación Blue Cross Blue Shield deja de exigirlo a sus licenciatarias [1, 2]. La licencia Blue limita además quién puede comprar la empresa. El presidente del consejo es independiente desde 2025 y todas las comisiones son de independientes [1].',
    alertas: [
      'Aviso de sanciones de CMS en Medicare Advantage (27-feb-2026) por datos de riesgo de 2015-2023: provisión de 935 M y caso cerrado sin sanciones el 13-jul-2026 [7, 10].',
      'Demanda colectiva de valores por la guía de 2024, que sigue adelante tras la decisión de septiembre de 2026, y tres demandas derivadas contra consejeros [10].',
      'Dos guías anuales incumplidas seguidas (2024 y 2025) [12, 13].',
      'Venta del director financiero de 4,66 M USD el 22-oct-2026, al día siguiente de subir la guía [5].',
      'Salida del presidente de Carelon (mayo de 2026); el sucesor llegó en octubre [6, 17].',
    ],
    confianza: 'Alta',
  },
  fuentes,
  huecos: [
    { seccion: 'gobierno', campo: 'consejo.desde (R. Kerry Clark)', tipo: 'Complemento', intentos: '1) proxy 2026 (su ficha ya no figura: se jubila); 2) proxy 2025 no descargado; 3) 10-K 2025 (no lo dice)', decision: 'Omitido' },
  ],
};
writeFileSync(join(aqui, 'C.json'), JSON.stringify(C, null, 2));
console.log('C.json', insiders.length, 'operaciones agrupadas');
