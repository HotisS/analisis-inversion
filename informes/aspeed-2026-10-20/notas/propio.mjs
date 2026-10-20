// Parte del analista (ASPEED, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';
import { bpas } from './bpa12m.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const B = Object.fromEntries(S.casos.map((c) => [c.escenario, bpas(c)]));
const PRECIO = 15900; // cierre del 20-oct-2026 (13:30 de Taipéi) [D2]
const r1 = (x) => Math.round(x * 10) / 10;
const f1 = (x) => r1(x).toFixed(1).replace('.', ',');
// Historia del PER ADELANTADO con BPA diluido reexpresado a las acciones de hoy (dividendos en acciones de 2022 y 2026; cierres de Yahoo
// ajustados solo por esos repartos, sin dividendos): cierre de cada año ÷ BPA real del año siguiente; para el cierre de 2025, nuestro BPA de 2026e
// (con nueve meses de ventas oficiales). BPA 2017-2019 de las cuentas de 2018 y 2019 (15,64, 20,10 y 24,28 nominales ÷ 1,21) [A1-A4, P2, P3].
const H = [
  ['2016', 390.91, 12.93], ['2017', 593.39, 16.61], ['2018', 485.95, 20.07], ['2019', 792.56, 24.17], ['2020', 1417.36, 31.55],
  ['2021', 2946.28, 50.32], ['2022', 1531.82, 24.18], ['2023', 2836.36, 61.66], ['2024', 3022.73, 94.30], ['2025', 6600, B.Base['2026e'].bpa],
].map(([a, p, e]) => [a, p, e, p / e]);
const ult5 = H.slice(-5).map((h) => h[3]).sort((a, b) => a - b);
const med5 = ult5[2];
const min5 = ult5[0];
const larga = H.slice(-8);
const mediaLarga = larga.reduce((s, h) => s + h[3], 0) / larga.length;
const actual = PRECIO / B.Base['2027e'].bpa;
const txtH = H.map(([a, p, e, x]) => `${a}: ${String(p).replace('.', ',')} ÷ ${e.toFixed(2).replace('.', ',')} = ${f1(x)}x`).join('; ');
// v2: historia AL CIERRE (cierre ÷ BPA del mismo año).
const C = [['2018', 485.95, 16.61], ['2019', 792.56, 20.07], ['2020', 1417.36, 24.17], ['2021', 2946.28, 31.55], ['2022', 1531.82, 50.32], ['2023', 2836.36, 24.18], ['2024', 3022.73, 61.66], ['2025', 6600, 94.30]]
  .map(([a, p, e]) => [a, p, e, p / e]);
const c5 = C.slice(-5).map((h) => h[3]).sort((a, b) => a - b);
const cMedia = C.reduce((s, h) => s + h[3], 0) / C.length;
const txtC = C.map(([a, p, e, x]) => `${a} ${String(p).replace('.', ',')} ÷ ${e.toFixed(2).replace('.', ',')} = ${f1(x)}x`).join('; ');

export const _hist = { H, med5, min5, mediaLarga, actual, c5, cMedia };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'TWD', divisa_cotizacion: 'TWD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en Taiwán (TIFRS)', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'ASPEED tiene un solo segmento operativo; el 96 % de las ventas de 2025 son chips de servidor (BMC y afines) y el resto, AV sobre IP y Cupola360, menos del 4 % [A1]. Una suma de partes no cambiaría el valor.', confianza: 'Alta' },
  valoracion: {
    // Puente: balance de jun-26 [A5]. Caja = efectivo y activos financieros corrientes 9.364,1 M. Sin deuda financiera.
    // Arrendamientos 300,5 M; minoritarios 25,6 M (Cupola360).
    // otros_ajustes = dividendo de 80 TWD por acción antigua aprobado en la junta del 28-may-2026, pendiente de pago a 30-jun (3.024,2 M), que sigue en la caja de jun-26.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 300.5, caja: 9364.1, minoritarios: 25.6, pensiones: 0, asociadas: 0, otros_ajustes: 3024.2 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: B[e]['2028e'].bpa, multiplo: null, precio: null, justificacion: T.casos12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: larga.length,
        actual: r1(actual), mediana_5a: r1(med5), minimo_5a: r1(min5), media_larga: r1(mediaLarga),
        excluidos: `Ningún año excluido (ninguno con pérdidas, PER ≥ 150x ni atípico frente a la mediana del resto). Historia ADELANTADA con BPA diluido reexpresado a las 41,6 M acciones de hoy: cierre de cada año ÷ BPA real del año siguiente; para el cierre de 2025, nuestro BPA de 2026e (con nueve meses de ventas oficiales). ${txtH}. Mediana de 2021-2025 ${f1(med5)}x; mínimo ${f1(min5)}x; media de 2018-2025 ${f1(mediaLarga)}x. PER actual = 15.900 (cierre del 20-oct-2026) ÷ nuestro BPA de 2027e (${B.Base['2027e'].bpa.toFixed(2).replace('.', ',')}) = ${f1(actual)}x.`,
        v2: { mediana_5a: r1(c5[2]), minimo_5a: r1(c5[0]), media_larga: r1(cMedia), excluidos: `Historia AL CIERRE (cierre ÷ BPA diluido reexpresado del mismo año): ${txtC}. Mediana de 2021-2025 ${f1(c5[2])}x, mínimo ${f1(c5[0])}x, media de 2018-2025 ${f1(cMedia)}x. Ningún año excluido.` },
      },
      comparables_per: { mediana: 36.6 },
      consenso: { bpa_ano1: 200.92, bpa_ano2: 342.05, objetivo_medio: 22593.47, objetivo_min: 17363.64, objetivo_max: 26660, analistas: 16, tendencia_3m: 'subidas', fuente: 'S&P Global vía StockAnalysis y Yahoo (16 analistas) [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  esg: T.esg ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
