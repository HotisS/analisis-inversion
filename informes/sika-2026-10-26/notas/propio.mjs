// Parte del analista (Sika AG, corte 2026-10-26). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = de aquí.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const PRECIO = 180.2;
// Historia del PER adelantado en base AJUSTADA (sin no recurrentes, como los BPA de los escenarios): cierre ÷ BPA ajustado
// del año siguiente. BPA ajustado: 2021 6,60; 2022 6,85; 2023 7,19; 2024 7,76; 2025 7,08 [A1-A4]; 2026e propio 7,27.
const histAdel = { 2020: 241.8 / 6.60, 2021: 380.2 / 6.85, 2022: 221.7 / 7.19, 2023: 273.7 / 7.76, 2024: 215.8 / 7.08, 2025: 162.6 / bpa('2026e') };
// Historia v2 (al cierre, mismo año, ajustado), guardada para comparar.
const histCierre = { 2021: 380.2 / 6.60, 2022: 221.7 / 6.85, 2023: 273.7 / 7.19, 2024: 215.8 / 7.76, 2025: 162.6 / 7.08 };
const r1 = (x) => Math.round(x * 10) / 10;
const mediana = (a) => { const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const cinco = [2022, 2023, 2024, 2025].map((y) => histAdel[y]); // 2021 fuera (burbuja: 55 veces)
const larga = [2020, 2022, 2023, 2024, 2025].map((y) => histAdel[y]);
const cincoV2 = [2022, 2023, 2024, 2025].map((y) => histCierre[y]);

export const per = {
  base: 'adelantado',
  actual: r1(PRECIO / bpa('2027e')),
  mediana_5a: r1(mediana(cinco)), minimo_5a: r1(Math.min(...cinco)), media_larga: r1(larga.reduce((a, b) => a + b, 0) / larga.length),
  anios: 5,
  serie: Object.entries(histAdel).map(([anio, v]) => ({ anio, per: r1(v) })),
  excluidos: '2021 (55,5 veces: burbuja de tipos cero; el doble de la mediana del resto). Historia de 2020 a 2025 con BPA ajustado: no hay BPA comparable de 2017-2019 en las cuentas leídas.',
  v2: { mediana_5a: r1(mediana(cincoV2)), minimo_5a: r1(Math.min(...cincoV2)), media_larga: r1(cincoV2.reduce((a, b) => a + b, 0) / cincoV2.length), excluidos: '2021 (57,6 veces, burbuja)' },
};

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'CHF', divisa_cotizacion: 'CHF', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance de 30-jun-2026 [A5]. Deuda sin arrendamientos ni derivados: bonos 4.709,0 + bancos 889,4 + otros 24,1.
    // Pensiones: déficit de prestación definida 86,6 M + otros compromisos con empleados 128,9 M, netos al 23 % de impuestos.
    // Otros ajustes: Akkim, cerrada el 3-sep (después del balance), precio no publicado: estimación propia de 440 M (2 veces sus
    // ventas de ≈220 M, por debajo de las 2,2-2,6 veces de Chryso y FOSROC). El híbrido de agosto (923 M) entra en caja y
    // refinancia el bono de 922 M que vence el 3-nov: efecto neto nulo en el puente.
    puente: { fecha: '2026-06-30', deuda_financiera: 5622.5, arrendamientos: 455.4, caja: 625.3, minoritarios: 10.4, pensiones: 166, asociadas: 0, otros_ajustes: 440 },
    rab: null,
    referencia_mercado: { mercado: 'Prima implícita de Damodaran (S&P 500, T12m with sustainable payout), válida para mercados desarrollados', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P3]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: bpa('2028e', -2.0, -1.5), multiplo: null, precio: null, justificacion: T.obj_just?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: bpa('2028e'), multiplo: null, precio: null, justificacion: T.obj_just?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: bpa('2028e', 1.5, 0.8), multiplo: null, precio: null, justificacion: T.obj_just?.Alcista ?? null },
      ],
      per_historico: per,
      comparables_per: { mediana: 14.6 },
      consenso: { bpa_ano1: 7.39, bpa_ano2: 8.36, objetivo_medio: 207.95, objetivo_min: 175, objetivo_max: 240, analistas: 19, tendencia_3m: 'subidas', fuente: 'MarketScreener y cash.ch (AWP) [D2, D13]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.obj_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? T.secciones?.rentabilidad?.comentario ?? null, confianza: 'Alta' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: [
    { id: 1, titulo: 'Rendimientos de los bonos de la Confederación (cubo rendeiduebd, 10 años, 30-sep-2026)', editor: 'Banco Nacional Suizo', tipo: 'Datos de mercado', fecha: '2026-09-30', url: 'https://data.snb.ch/en/topics/ziredev/cube/rendeiduebd' },
    { id: 2, titulo: 'Betas por sector, Europa (desapalancadas y corregidas por caja), enero de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/betaEurope.xls' },
    { id: 3, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 4, titulo: 'Monetary policy assessment of 24 September 2026 (previsión condicional de inflación)', editor: 'Banco Nacional Suizo', tipo: 'Primaria', fecha: '2026-09-24', url: 'https://www.snb.ch/en/publications/communication/press-releases-restricted/pre_20260924' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};
