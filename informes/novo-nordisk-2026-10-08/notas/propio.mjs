// Parte del analista (Novo Nordisk, corte 2026-10-08). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = fuente propia 1.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { textos as t } from './textos.mjs';
import { resumen } from './resumen.mjs';
export default {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'DKK', divisa_cotizacion: 'DKK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (UE e IASB)', formato_cuenta: 'funcion',
    ...(t.meta || {}),
  },
  ...(t.secciones || {}),
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    etapa2: { ...etapa2, ...((t.dcf && t.dcf.etapa2) || {}) },
    justificacion: t.dcf && t.dcf.justificacion, lectura: t.dcf && t.dcf.lectura, confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: (t.narrativas || {})[c.escenario] || null })), ...(t.escenarios || {}), confianza: 'Media' },
  suma_partes: t.secciones.suma_partes,
  valoracion: {
    rab: null, pesos,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna ERP (T12m with sustainable payout) [P1]' },
    ...(t.secciones.valoracion || {}), confianza: 'Media',
  },
  catalizadores: t.catalizadores,
  riesgos: t.riesgos ? { ...t.riesgos, confianza: 'Media' } : undefined,
  preguntas: t.preguntas,
  resumen,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Capital Markets Day 2026: Corporate strategy (Mike Doustdar)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2026-09-21', url: 'https://www.novonordisk.com/content/dam/nncorp/global/en/investors/pdfs/capital-markets-day/2026/corporate-strategy-presentation-cmd-2026.pdf' },
    { id: 3, titulo: 'Capital Markets Day 2026: Financials (Karsten Munk Knudsen)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2026-09-21', url: 'https://www.novonordisk.com/content/dam/nncorp/global/en/investors/pdfs/capital-markets-day/2026/financials-presentation-cmd-2026.pdf' },
    { id: 4, titulo: 'Capital Markets Day 2026: Obesity', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2026-09-21', url: 'https://www.novonordisk.com/content/dam/nncorp/global/en/investors/pdfs/capital-markets-day/2026/obesity-presentation-cmd-2026.pdf' },
    { id: 5, titulo: 'Investor presentation, second quarter of 2026', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.novonordisk.com/content/dam/nncorp/global/en/investors/pdfs/financial-results/2026/Q2-2026-Full%20presentation.pdf' },
    { id: 6, titulo: 'Financial report for the period 1 January 2026 to 30 June 2026 (Company announcement No 48/2026, Form 6-K)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.sec.gov/Archives/edgar/data/353278/000035327826000023/caq22026.htm' },
    ...(t.fuentes || []),
  ],
  huecos: t.huecos || [],
  huecos_resueltos: t.huecos_resueltos || [],
  _parches: t._parches || [],
};
