// Parte del analista (Cheryong Electric, corte 2026-10-20). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 40900; // cierre del 20-oct-2026 en el KOSDAQ [D1]

// Historia del PER adelantado (v3): cierre de cada ejercicio ÷ BPA real del año siguiente [D1, A1, A3, A4, A5].
// 2020 5.290 ÷ 73 = 72,5x (EXCLUIDO); 2021 5.220 ÷ 777 = 6,7x; 2022 11.250 ÷ 3.510 = 3,2x (EXCLUIDO); 2023 20.050 ÷ 4.976 = 4,0x
// (EXCLUIDO); 2024 45.950 ÷ 3.655 = 12,6x; 2025 35.100 ÷ nuestro BPA recurrente de 2026e (1.251) = 28,1x (EXCLUIDO). Exclusiones
// por la regla de atípicos (más de 3 veces o menos de un tercio de la mediana del resto, con seis años): son los años en que el BPA
// se multiplicó o se hundió (×10,6 en 2021-2022 de BPA casi nulo; ×4,5 en 2023; −66 % en 2026e). Al cierre (v2): 2020 5.290 ÷ 219;
// 2021 5.220 ÷ 73 (EXCLUIDO, 71,5x); 2022 11.250 ÷ 777; 2023 20.050 ÷ 3.510; 2024 45.950 ÷ 4.976; 2025 35.100 ÷ 3.655.
const adel = [5220 / 777, 45950 / 3655];
const cierre = [5290 / 219, 11250 / 777, 20050 / 3510, 45950 / 4976, 35100 / 3655];
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
export const PERH = { adel, cierre, PRECIO, bpa26, bpa27, B };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'KRW', divisa_cotizacion: 'KRW', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'K-IFRS (NIIF adoptadas en Corea), cuentas individuales (la empresa no tiene filiales)', formato_cuenta: 'funcion',
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
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance K-IFRS de 30-jun-2026 [A2]. Sin deuda financiera. Arrendamientos 578. Caja: efectivo 39.457 + depósitos a corto y
    // largo plazo 114.496 = 153.953 (tras pagar la nave de Bosch, 40.000 M, y el dividendo de 2025, 17.669 M). Asociadas e
    // inversiones financieras no corrientes a valor contable ≈ 3.965. Pensiones: plan de aportación definida, sin pasivo relevante.
    // No se resta nada por la demanda de KEPCO (2.000 M, sin sentencia) ni la multa del cártel de GIS (1.165 M, ya pagada) [C4].
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 578, caja: 153953, minoritarios: 0, pensiones: 0, asociadas: 3965, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D5]' },
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
      comparables_per: { mediana: 20.35 },
      consenso: { bpa_ano1: null, bpa_ano2: null, objetivo_medio: null, objetivo_min: null, objetivo_max: null, analistas: 0, tendencia_3m: null, fuente: 'FnGuide/WiseReport: ninguna recomendación ni estimación en los últimos tres meses (20-oct-2026) [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(T.bolsa_contexto ? { bolsa: { contexto: T.bolsa_contexto } } : {}),
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};
