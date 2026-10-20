// Parte del analista (Hon. Precision, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';
import { bpas } from './bpa12m.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const B = Object.fromEntries(S.casos.map((c) => [c.escenario, bpas(c)]));
const PRECIO = 5205;
const r1 = (x) => Math.round(x * 10) / 10;
// Historia del PER adelantado: cierre de cada año ÷ BPA del año siguiente (2025 real; para 2026, nuestro BPA de 2026e).
const per2024 = 1135 / 75.54, per2025 = 3425 / B.Base['2026e'].bpa;
const actual = PRECIO / B.Base['2027e'].bpa;
const med = (per2024 + per2025) / 2;

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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Hon. Precision vende una sola familia de productos (manipuladores de prueba con control térmico) a los mismos clientes y desde las mismas plantas, y publica un único segmento: una suma de partes no tendría cifras propias en que apoyarse.', confianza: 'Media' },
  valoracion: {
    // Puente: balance de jun-26 [A3]. Caja = efectivo 52.690 + inversiones a corto 3.197 + títulos negociables 148 = 56.036 M.
    // Sin deuda financiera; arrendamientos 90 M. asociadas = inversiones financieras a largo plazo (318 M).
    // otros_ajustes = dividendo de 65 TWD × 179,93 M acciones aprobado en junio y pagado en agosto (11.695 M), que sigue en la caja de jun-26.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 89.65, caja: 56036, minoritarios: 0, pensiones: 0, asociadas: 317.86, otros_ajustes: 11695 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: B[e]['2028e'].bpa, multiplo: null, precio: null, justificacion: T.casos12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: 2,
        actual: r1(actual), mediana_5a: r1(med), minimo_5a: r1(Math.min(per2024, per2025)), media_larga: r1(med),
        excluidos: `Ningún año excluido; solo hay dos cierres. Historia ADELANTADA: 2024 (mercado emergente, poco líquido) 1.135 ÷ BPA real de 2025 (75,54) = ${r1(per2024)}x; 2025: 3.425 ÷ nuestro BPA de 2026e (${B.Base['2026e'].bpa}) = ${r1(per2025)}x. PER actual = 5.205 (cierre del 20-oct-2026) ÷ nuestro BPA de 2027e (${B.Base['2027e'].bpa}) = ${r1(actual)}x. Con dos años la v3 no llega a su mínimo de tres: el selector decide con la más baja de v3 y v2.`,
        v2: { mediana_5a: 40.0, minimo_5a: 34.7, media_larga: 40.0, excluidos: 'Historia AL CIERRE (cierre ÷ BPA del mismo año): 2024 1.135 ÷ 32,73 = 34,7x; 2025 3.425 ÷ 75,54 = 45,3x. Mediana y media 40,0x; mínimo 34,7x.' },
      },
      comparables_per: { mediana: 36.8 },
      consenso: { bpa_ano1: 129.2, bpa_ano2: 208.7, objetivo_medio: 9227.24, objetivo_min: 6150, objetivo_max: 12500, analistas: 17, tendencia_3m: 'estables', fuente: 'MarketScreener (17 analistas) e Investing [D1, D2]' },
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
