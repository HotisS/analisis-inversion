// Parte del analista (ITCEN GLOBAL, corte 2026-10-20). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 21450; // cierre del 20-oct-2026 en el KOSDAQ [D1]

// Historia del PER adelantado (v3): cierre de cada ejercicio ÷ BPA real del año siguiente [D1, A1, A2].
// 2021 5.010 ÷ 85 = 59,0x; 2022 3.590 ÷ 32 = 112,2x (EXCLUIDO, atípico: más de 3 veces la mediana del resto, 32,4x);
// 2023 7.440 ÷ 184 = 40,4x; 2024 5.200 ÷ 2.010 = 2,6x (EXCLUIDO, atípico: menos de un tercio de la mediana del resto, 49,7x);
// 2025 30.300 ÷ nuestro BPA normalizado de 2026e (1.205, sin la ganancia del derivado del CB). 2020 (5.240 ÷ −361) no vale:
// pérdidas en 2021. Quedan tres años: regla de historia corta (el selector elige la más baja de v3 y v2).
// Al cierre (v2): 2021 pérdidas (excluido); 2022 3.590 ÷ 85 = 42,2x; 2023 7.440 ÷ 32 = 232,5x (excluido, ≥ 150x);
// 2024 5.200 ÷ 184 = 28,3x; 2025 30.300 ÷ 2.010 = 15,1x.
const adel = [5010 / 85, 7440 / 184, 30300 / bpa26];
const cierre = [3590 / 85, 5200 / 184, 30300 / 2010];
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'KRW', divisa_cotizacion: 'KRW', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'K-IFRS (NIIF adoptadas en Corea), cuentas consolidadas', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    // Valor de empresa al 100 % de cada negocio; los minoritarios salen en el puente (el mismo del DCF).
    partes: [
      { segmento: 'Oro y metales preciosos (Korea Gold Exchange y filiales)', metrica: 'EBITDA 2027e', valor_metrica: 93000, multiplo: 6.5, ev_directo: null, justificacion: T.sp?.oro ?? null },
      { segmento: 'Servicios informáticos (ITCEN CTS, ENTEC, Cloit, C-Platform, PNS)', metrica: 'EBITDA 2027e', valor_metrica: 52000, multiplo: 6.0, ev_directo: null, justificacion: T.sp?.it ?? null },
      { segmento: 'Gastos de la matriz y ajustes de consolidación', metrica: 'EBITDA 2027e', valor_metrica: -6000, multiplo: 6.0, ev_directo: null, justificacion: T.sp?.matriz ?? null },
      // Descuento de holding del 20 % sobre el valor de las participaciones de la matriz (no sobre el 100 % de las filiales):
      // (880.500 − 58.000 de deuda neta de las filiales + 34.341 de asociadas) × 25 % ≈ 214.000; × 20 % ≈ 42.800.
      { segmento: 'Descuento de holding (20 % de lo que corresponde a la matriz)', metrica: 'Valor de las participaciones', valor_metrica: null, multiplo: null, ev_directo: -42800, justificacion: T.sp?.descuento ?? null },
    ],
    comentario: T.suma_partes_comentario ?? null, confianza: 'Media',
  },
  valoracion: {
    // Balance K-IFRS de 30-jun-2026 [A3]. Deuda financiera: 228.227 en libros − 7.915 de convertibles en libros + 40.000
    // (CB nº 16) + 10.000 (CB de ITCEN PNS) a su nominal = 270.312. Arrendamientos: 13.525 (dic-2025; el semestral no los
    // separa). Caja: efectivo 167.171 + depósitos a corto 9.665 = 176.836 (sin los 45.996 de activos a valor razonable ni
    // los 91.895 de otros activos financieros, que son garantías de derivados del oro y depósitos de oro en fideicomiso,
    // circulante del negocio). Asociadas 34.341 a valor contable (Aurum Exchange, Busan Digital Asset Exchange, Info U...).
    // Minoritarios a valor de mercado (no a valor contable, 457.079): ≈ 75 % del valor de las filiales (oro ≈ 72-75 %,
    // informática ≈ 75-80 % de minoritarios), calculado sobre el valor empresa del DCF menos la deuda neta de las filiales.
    // otros_ajustes: acciones preferentes de ITCEN Cloit con opción de venta (≈ 20.000) + Galaxia FN pagada después del
    // balance (1.385) = 21.385. El CB nº 16 va como deuda (convierte a 38.021 KRW, muy por encima del precio) y sus acciones
    // también en el BPA (lo más prudente para las dos cifras).
    puente: { fecha: '2026-06-30', deuda_financiera: 270312, arrendamientos: 13525, caja: 176836, minoritarios: 706000, pensiones: 0, asociadas: 34341, otros_ajustes: 21385 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        anios: adel.length,
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel)), minimo_5a: r2(Math.min(...adel)), media_larga: r2(adel.reduce((a, b) => a + b, 0) / adel.length),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre)), minimo_5a: r2(Math.min(...cierre)), media_larga: r2(cierre.reduce((a, b) => a + b, 0) / cierre.length), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 10.5 },
      consenso: { bpa_ano1: null, bpa_ano2: null, objetivo_medio: 54000, objetivo_min: 54000, objetivo_max: 54000, analistas: 1, tendencia_3m: 'recortes', fuente: 'FnGuide/WiseReport: una sola casa (BNK, 11-sep-2026), sin BPA de 2027e ni 2028e; BPA de 2026e de 2.222 KRW [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  ...(T.bolsa_contexto ? { bolsa: { contexto: T.bolsa_contexto } } : {}),
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};
