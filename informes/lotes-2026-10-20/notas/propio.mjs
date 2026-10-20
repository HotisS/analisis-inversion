// Parte del analista (Lotes, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';
import { bpas } from './bpa12m.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const B = Object.fromEntries(S.casos.map((c) => [c.escenario, bpas(c)]));
const PRECIO = 1805;
const r1 = (x) => Math.round(x * 10) / 10;
const es = (x, d = 1) => x.toFixed(d).replace('.', ',');
// Historia del PER ADELANTADO: cierre de cada año ÷ BPA diluido real del año siguiente; para el cierre de 2025, nuestro BPA de 2026e.
const H = [
  ['2017', 197.16, 17.15], ['2018', 209.67, 20.06], ['2019', 319.71, 26.34], ['2020', 470.39, 32.69], ['2021', 757.3, 57.87],
  ['2022', 821.98, 50.19], ['2023', 1070, 82.33], ['2024', 1955, 70.06], ['2025', 1295, B.Base['2026e'].bpa],
].map(([a, p, e]) => [a, p, e, p / e]);
const ult5 = H.slice(-5).map((h) => h[3]).sort((a, b) => a - b);
const med5 = ult5[2];
const min5 = ult5[0];
const mediaLarga = H.reduce((s, h) => s + h[3], 0) / H.length;
const actual = PRECIO / B.Base['2027e'].bpa;
const txtH = H.map(([a, p, e, x]) => `${a}: ${String(p).replace('.', ',')} ÷ ${es(e, 2)} = ${es(r1(x))}x`).join('; ');

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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Lotes publica sus ventas por línea de producto (servidores, PC de sobremesa, portátiles, productos estratégicos, Lintes, automoción), pero no el resultado de cada una. La filial cotizada Lintes (6715, cables de alta velocidad) fue el 4,4 % de las ventas de 2025 y consolida; sus minoritarios ya van en el puente a valor contable. Una suma de partes no tendría cifras propias en que apoyarse.', confianza: 'Media' },
  valoracion: {
    // Puente: balance de jun-26 [A6]. Caja = efectivo 13.983 + inversiones a corto 13,8 + activos financieros a valor razonable con cambios
    // en resultados (acciones cotizadas, sobre todo TSMC) 2.201 = 16.198 M. Deuda bancaria 507 M; arrendamientos 205 + 792,2 = 997,2 M;
    // pensiones 43 M; minoritarios a valor contable 2.135,5 M; inversiones a largo plazo a valor contable 943 M (asociadas).
    // otros_ajustes = dividendo de 35 TWD × 112,22 M acciones aprobado en la junta del 12-jun-2026, pendiente de pago a 30-jun
    // (ex dividendo 4-ago): 3.927,8 M, que sigue en la caja de jun-26.
    puente: { fecha: '2026-06-30', deuda_financiera: 507.0, arrendamientos: 997.2, caja: 16198, minoritarios: 2135.5, pensiones: 43.0, asociadas: 943, otros_ajustes: 3927.8 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: B[e]['2028e'].bpa, multiplo: null, precio: null, justificacion: T.casos12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: H.length,
        actual: r1(actual), mediana_5a: r1(med5), minimo_5a: r1(min5), media_larga: r1(mediaLarga),
        excluidos: `Ningún año excluido (ninguno con pérdidas ni PER ≥ 150x); 2024 (27,9x) es alto, pero es un dato real del mercado y queda dentro de la mediana de cinco años. Historia ADELANTADA: cierre de cada año ÷ BPA diluido real del año siguiente; para el cierre de 2025, nuestro BPA de 2026e. ${txtH}. Mediana de 2021-2025 ${es(r1(med5))}x; mínimo ${es(r1(min5))}x; media de 2017-2025 ${es(r1(mediaLarga))}x. PER actual = 1.805 (cierre del 20-oct-2026) ÷ nuestro BPA de 2027e (${es(B.Base['2027e'].bpa, 2)}) = ${es(r1(actual))}x. Los cierres anteriores a 2023 son los de Yahoo ajustados por ampliaciones de capital.`,
        v2: { mediana_5a: 21.3, minimo_5a: 14.2, media_larga: 18.4, excluidos: 'Historia AL CIERRE (cierre ÷ BPA diluido del mismo año): 2018 209,67 ÷ 17,15 = 12,2x; 2019 319,71 ÷ 20,06 = 15,9x; 2020 470,39 ÷ 26,34 = 17,9x; 2021 757,3 ÷ 32,69 = 23,2x; 2022 821,98 ÷ 57,87 = 14,2x; 2023 1.070 ÷ 50,19 = 21,3x; 2024 1.955 ÷ 82,33 = 23,7x; 2025 1.295 ÷ 70,06 = 18,5x. Mediana de 2021-2025 21,3x, mínimo 14,2x, media de 2018-2025 18,4x.' },
      },
      comparables_per: { mediana: 17.1 },
      consenso: { bpa_ano1: 80.13, bpa_ano2: 114.46, objetivo_medio: 2422.19, objetivo_min: 1670, objetivo_max: 3200, analistas: 16, tendencia_3m: 'recortes', fuente: 'S&P Global vía StockAnalysis y Yahoo (16 analistas) [D2, D3]' },
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
