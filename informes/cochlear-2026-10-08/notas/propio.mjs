// Parte del analista (Cochlear, corte 2026-10-08). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'AUD', divisa_cotizacion: 'AUD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'Normas contables australianas (AASB, conformes con las NIIF)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [{ ruta: 'consenso.base_ebitda', valor: 'NIIF' }, { ruta: 'consenso.ajuste_ebitda_pct_ventas', valor: 0 },
    // Cloud fuera del EBITDA en todos los años (FY22-FY24 lo llevaban dentro del subyacente): 21,6 / 38,5 / 30,3 M antes de impuestos [A1, A3-A5].
    { ruta: 'financieros.cuenta[1].no_recurrentes_en_ebitda', valor: 4.3 }, { ruta: 'financieros.cuenta[2].no_recurrentes_en_ebitda', valor: 45.1 }, { ruta: 'financieros.cuenta[3].no_recurrentes_en_ebitda', valor: 60.1 },
    // GN Store Nord: cambio de perímetro, sin LTM homogéneo; fuera de los múltiplos [D14].
    { ruta: 'comparables.empresas[2].ev_ebitda_ntm', valor: null }, { ruta: 'comparables.empresas[2].per_ntm', valor: null }, { ruta: 'comparables.empresas[2].ev_ventas', valor: null },
    { ruta: 'directivos.historial_guidance[6].cumplida', valor: null },
    { ruta: 'identificacion.fundacion', valor: '1981' }, { ruta: 'identificacion.empleados', valor: 5400 }, ...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.suma_partes ?? null,
  valoracion: {
    ...(T.puente ? { puente: T.puente } : {}),
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)», fila de octubre de 2026 [P1]' },
    pesos,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'FY26 Result - ASX & Media Release (18-ago-2026)', editor: 'Cochlear Limited (ASX)', tipo: 'Primaria', fecha: '2026-08-18', url: 'https://announcements.asx.com.au/asxpdf/20260818/pdf/072vlb13j40ckk.pdf' },
    { id: 3, titulo: 'FY26 Result - Presentation (18-ago-2026)', editor: 'Cochlear Limited (ASX)', tipo: 'Primaria', fecha: '2026-08-18', url: 'https://announcements.asx.com.au/asxpdf/20260818/pdf/072vp99h99kr7s.pdf' },
    { id: 4, titulo: 'Trading update and reduction to FY26 earnings guidance (22-abr-2026)', editor: 'Cochlear Limited (ASX)', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://announcements.asx.com.au/asxpdf/20260422/pdf/06yqjm0ttfryc1.pdf' },
    { id: 5, titulo: 'Cochlear to host Capital Markets Day (25-sep-2026)', editor: 'Cochlear Limited (ASX)', tipo: 'Primaria', fecha: '2026-09-25', url: 'https://announcements.asx.com.au/asxpdf/20260925/pdf/074hv4bxxq7wxd.pdf' },
    { id: 6, titulo: 'Defence of Class Action Proceedings (29-sep-2026)', editor: 'Cochlear Limited (ASX)', tipo: 'Primaria', fecha: '2026-09-29', url: 'https://announcements.asx.com.au/asxpdf/20260929/pdf/074mzsqwdc44r8.pdf' },
    { id: 7, titulo: 'Cochlear statement on US tariff announcement (24-jul-2026)', editor: 'Cochlear Limited (ASX)', tipo: 'Primaria', fecha: '2026-07-24', url: 'https://announcements.asx.com.au/asxpdf/20260724/pdf/0720kdnzgg6547.pdf' },
    { id: 8, titulo: 'HY26 Result - ASX & Media Release (13-feb-2026)', editor: 'Cochlear Limited (ASX)', tipo: 'Primaria', fecha: '2026-02-13', url: 'https://announcements.asx.com.au/asxpdf/20260213/pdf/06w84mj8zfc6np.pdf' },
    { id: 9, titulo: 'Annual Report 2026 (riesgos principales, págs. 91-93)', editor: 'Cochlear Limited (ASX)', tipo: 'Primaria', fecha: '2026-08-18', url: 'https://announcements.asx.com.au/asxpdf/20260818/pdf/072vl3mz6g9cps.pdf' },
    { id: 10, titulo: 'Date of AGM (junta el 26-oct-2026)', editor: 'Cochlear Limited (ASX)', tipo: 'Primaria', fecha: '2026-08-17', url: 'https://announcements.asx.com.au/asxpdf/20260817/pdf/072tdss1w0sb9z.pdf' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};
