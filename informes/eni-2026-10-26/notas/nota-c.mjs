// Nota C (Equipo y gobierno) de Eni, corte 2026-10-26. Cita solo con [n] de su propia lista.
// Ejecutar: node informes/eni-2026-10-26/notas/nota-c.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1002242';
const G = 'https://www.eni.com/content/dam/enicom/documents/eng/governance';
const ED = 'https://www.eni.com/content/dam/enicom/documents';

const fC = [
  { id: 1, titulo: 'Annual Report on Form 20-F 2025 (Item 6: consejo, directivos y acciones; Item 7: accionistas; poderes especiales del Estado)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-23', url: `${E8}/000155485526000390/e-20251231.htm` },
  { id: 2, titulo: 'Il Consiglio conferma Claudio Descalzi Amministratore Delegato e nomina i Comitati consiliari', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-05-07', url: 'https://www.eni.com/it-IT/media/comunicati-stampa/2026/05/cs-cda-nomina-claudio-descalzi-ad-componenti-comitati-consiliari-2026.html' },
  { id: 3, titulo: 'Resolutions of the Ordinary and Extraordinary Shareholders\' Meeting 2026 (consejo nombrado, listas y requisitos de independencia)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-05-06', url: `${G}/shareholders-meetings/2026/resolutions-shareholders-meeting-2026.pdf` },
  { id: 4, titulo: 'Summary report of the votes, Shareholders\' Meeting 2026', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-05-06', url: `${G}/shareholders-meetings/2026/Summary-report-of-the-votes.pdf` },
  { id: 5, titulo: 'Remuneration Report 2026 (política 2026 y retribución pagada en 2025; tabla 1 y ratio con el empleado mediano)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-04', url: `${G}/shareholders-meetings/2026/Remuneration-Report-2026.pdf` },
  { id: 6, titulo: 'Eni: results for the third quarter and nine months of 2026 (guía revisada, recompra de 3.800 M, dividendo extraordinario de 0,46 EUR)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-10-23', url: `${ED}/press-release/migrated/2026-en/10/PR-2026-third-quarter-results.pdf` },
  { id: 7, titulo: 'Eni: report on the purchase of treasury shares during the period from 12 to 16 October 2026 (6-K)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: `${E8}/000117494726000921/form6k-36435_eni.htm` },
  { id: 8, titulo: 'Claudio Descalzi amministratore delegato Eni fino al 2029, via al quinto mandato', editor: 'QuiFinanza', tipo: 'Prensa', fecha: '2026-05-06', url: 'https://quifinanza.it/attualita/claudio-descalzi-amministratore-delegato-eni-quinto-mandato/992534/' },
  { id: 9, titulo: 'Corporate Governance Report 2025 (comités, sistema de control, operaciones vinculadas)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-03', url: `${G}/shareholders-meetings/2026/Corporate-Governance-Report-2025.pdf` },
];

const C = {
  _estado: 'Completo salvo operaciones de directivos (registro de internal dealing de eni.com no legible sin navegador).',
  directivos: {
    equipo: [
      { nombre: 'Claudio Descalzi', cargo: 'Consejero delegado y director general', desde: '2014', participacion_pct: 0.02, trayectoria: 'En Eni desde 1981, ingeniero de yacimientos; dirigió E&P antes de ser consejero delegado. Bajo su mando la exploración aportó Zohr, Coral y Baleine y la empresa creó los satélites con socios. Reelegido en 2026 para un quinto mandato hasta 2029; 647.621 acciones [1, 5, 8].' },
      { nombre: 'Giuseppina Di Foggia', cargo: 'Presidenta', desde: '2026', participacion_pct: null, trayectoria: 'Antes consejera delegada de Terna (2023-2026); sustituye a Giuseppe Zafarana en la presidencia (junta del 6-may-2026, 99,2 % a favor) [3, 4].' },
      { nombre: 'Francesco Gattei', cargo: 'Director de transformación y financiero (CT&FO)', desde: '2020', participacion_pct: null, trayectoria: 'Antes responsable de relaciones con inversores y de planificación de E&P; presentó los resultados del 3T26 [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Recompra de 1.500 M ampliada con el flujo de caja; producción +2-3 %', real: 'Recompra de 1.896 M; producción +3 % (20-F)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Marzo: producción +3-4 %, flujo de caja de 11.500 M con Brent de 70 USD y recompra de 1.500 M', real: 'Octubre: producción +6-7 % subyacente, flujo de caja de 16.500 M (con Brent de 95 USD), recompra de 3.800 M y dividendo extraordinario de 0,46 EUR [6]', cumplida: 'Sí' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Giuseppina Di Foggia', cargo: 'Presidenta', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Claudio Descalzi', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2014', comisiones: null },
      { nombre: 'Stefano Cappiello', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Benedetta Fiorini', cargo: 'Consejera', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Matteo Petrella', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Cristina Sgubin', cargo: 'Consejera', tipo: 'Dominical', desde: '2023', comisiones: null },
      { nombre: 'Emma Marcegaglia', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Carolyn Adele Dittmeier', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: null },
      { nombre: 'Raphael Louis L. Vermeir', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: 'limite_legal',
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 79.7, voto_remuneracion_contra_pct: 19.7, voto_remuneracion_contra_libre_pct: 38.8, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 8.4, fijo: 1.6, variable_corto: 2.32, variable_largo: 4.44, ratio_salario_medio: 138 },
    accionistas: [
      { nombre: 'Cassa Depositi e Prestiti (82,77 % del Ministerio de Economía)', pct: 30.92, tipo: 'Control (Estado)', variacion: 'Sube sin comprar por la amortización de autocartera' },
      { nombre: 'Ministerio de Economía y Finanzas', pct: 2.17, tipo: 'Control (Estado)', variacion: 'Estable' },
      { nombre: 'BlackRock', pct: 4.98, tipo: 'Institucional', variacion: null },
      { nombre: 'Romano Minozzi y sociedades', pct: 3.27, tipo: 'Particular', variacion: 'Presentó lista propia en 2026 y colocó a una consejera [3]' },
      { nombre: 'Autocartera', pct: 5.68, tipo: 'Autocartera', variacion: '2,87 % en marzo de 2026; 5,68 % el 16-oct-2026 por la recompra [1, 7]' },
    ],
    insiders: [],
    alertas: [
      'El Estado (MEF y CDP, ≈33 % del capital) nombra la mayoría del consejo, al presidente y al consejero delegado, y conserva poderes especiales («golden power») [1].',
      'Voto en contra de la remuneración del 19,7 % sobre el capital presente en 2026, que equivale a un 38,8 % del capital libre presente si se descuenta el voto del Estado [4].',
      'Casos judiciales cerrados por corrupción internacional (Nigeria OPL 245, absuelta en 2021; Argelia) y demanda climática de Greenpeace y ReCommon ante el tribunal de Roma (2023) [1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
};

fs.writeFileSync(path.join(dir, 'C.json'), JSON.stringify(C, null, 2) + '\n', 'utf8');
console.log('Nota C escrita');
