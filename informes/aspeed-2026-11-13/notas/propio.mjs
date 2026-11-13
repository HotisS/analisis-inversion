// Parte del analista (ASPEED, corte 2026-11-13). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';
import { bpas } from './bpa12m.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const B = Object.fromEntries(S.casos.map((c) => [c.escenario, bpas(c)]));
const PRECIO = 12000; // cierre del 13-nov-2026 [D1]
const r1 = (x) => Math.round(x * 10) / 10;
const f1 = (x) => r1(x).toFixed(1).replace('.', ',');
// Historia del PER ADELANTADO con BPA diluido reexpresado a las acciones de hoy (dividendos en acciones de 2022 y 2026; cierres de Yahoo
// ajustados solo por esos repartos, sin dividendos): cierre de cada año ÷ BPA real del año siguiente; para el cierre de 2025, nuestro BPA de 2026e
// (con nueve meses publicados, octubre y la guía del 4T26). BPA 2017-2019 de las cuentas de 2018 y 2019 (15,64, 20,10 y 24,28 nominales ÷ 1,21) [A1-A4, P2, P3].
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
    fecha_corte: '2026-11-13', divisa: 'TWD', divisa_cotizacion: 'TWD', tipo_cambio: 1, unidades: 'millones',
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
    // Puente: balance de sep-26 [A16]. Caja = efectivo 4.624,0 + depósitos a plazo 3.140,9 + activos financieros a valor razonable a corto 764,3 + renta fija a largo a coste amortizado 354,7 = 8.883,9 M.
    // Deuda: préstamo bancario a corto de 400,0 M. Asociadas: participaciones financieras a valor razonable (111,9 + 529,0 = 640,8 M).
    // Arrendamientos 317,8 M; minoritarios 29,4 M (Cupola360).
    // otros_ajustes = 0: el dividendo de 3.024,2 M que el informe anterior restaba como pendiente se pagó en julio y ya no está en la caja de sep-26.
    puente: { fecha: '2026-09-30', deuda_financiera: 400, arrendamientos: 317.8, caja: 8883.9, minoritarios: 29.4, pensiones: 0, asociadas: 640.8, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'publicado',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: B[e]['2028e'].bpa, multiplo: null, precio: null, justificacion: T.casos12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', base_bpa: 'publicado', anios: larga.length,
        actual: r1(actual), mediana_5a: r1(med5), minimo_5a: r1(min5), media_larga: r1(mediaLarga),
        excluidos: `Ningún año excluido (ninguno con pérdidas, PER ≥ 150x ni atípico frente a la mediana del resto). Historia ADELANTADA con BPA diluido reexpresado a las 41,6 M acciones de hoy: cierre de cada año ÷ BPA real del año siguiente; para el cierre de 2025, nuestro BPA de 2026e (con nueve meses publicados, octubre y la guía del 4T26). ${txtH}. Mediana de 2021-2025 ${f1(med5)}x; mínimo ${f1(min5)}x; media de 2018-2025 ${f1(mediaLarga)}x. PER actual = 12.000 (cierre del 13-nov-2026) ÷ nuestro BPA de 2027e (${B.Base['2027e'].bpa.toFixed(2).replace('.', ',')}) = ${f1(actual)}x.`,
        v2: { mediana_5a: r1(c5[2]), minimo_5a: r1(c5[0]), media_larga: r1(cMedia), excluidos: `Historia AL CIERRE (cierre ÷ BPA diluido reexpresado del mismo año): ${txtC}. Mediana de 2021-2025 ${f1(c5[2])}x, mínimo ${f1(c5[0])}x, media de 2018-2025 ${f1(cMedia)}x. Ningún año excluido.` },
      },
      comparables_per: { mediana: 28.7 },
      consenso: { bpa_ano1: 202.32, bpa_ano2: 341.66, objetivo_medio: 20444.26, objetivo_min: 14417, objetivo_max: 24000, analistas: 17, tendencia_3m: 'recortes', fuente: 'Yahoo (17 analistas, 13-nov-2026) y notas de dos bancos tras el 3T26 [D2, D4, D5]' },
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
