// Parte del analista (TeamViewer SE, TMV.DE, corte 2026-10-20). Citas con la letra de la nota: [A1] = fuente 1 de A.json.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa26 = bpa('Base', 1).bpa;
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 7.01; // cierre de TMV.DE del 19-oct-2026 (la sesión del 20-oct no había cerrado) [D1]

// BPA real en la base de este informe (BPA ajustado de la empresa —sin amortización de compras, no recurrentes ni pagos en acciones— menos
// los pagos en acciones después de impuestos al 30 %): 2022 0,67 − 27,6 × 0,7 / 184,6; 2023 0,88 − 21,8 × 0,7 / 172,1; 2024 1,05 − 16,6 × 0,7 / 159,8;
// 2025 1,17 − 11,7 × 0,7 / 157,0 [A7, A1]. 2021: el BPA ajustado se medía sobre la facturación (no comparable).
const bpaReal = { 2022: 0.67 - 27.632 * 0.7 / 184.6, 2023: 0.88 - 21.842 * 0.7 / 172.1, 2024: 1.05 - 16.6 * 0.7 / 159.8, 2025: 1.17 - 11.7 * 0.7 / 157.0, 2026: bpa26 };
const cierres = { 2021: 11.82, 2022: 12.05, 2023: 14.06, 2024: 9.54, 2025: 6.05 }; // [D1]
const per = (a) => cierres[a] / bpaReal[a + 1];
const perCierre = (a) => cierres[a] / bpaReal[a];
const med = (v) => { const s = [...v].sort((x, y) => x - y); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const avg = (v) => v.reduce((x, y) => x + y, 0) / v.length;
const adel5 = [2021, 2022, 2023, 2024, 2025].map(per);
const cierre5 = [2022, 2023, 2024, 2025].map(perCierre);
export const PERH = { adel5, cierre5, bpaReal, bpa26, bpa27, actual: PRECIO / bpa27 };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE (Geschäftsbericht 2025; notas de resultados anuales 2022-2023 y trimestrales 2025-2026 de TeamViewer)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  huecos: T.huecos ?? [],
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
    // Balance de 30-jun-2026 [A2]: deuda financiera 872,4 (640,9 a largo + 231,5 a corto), de la que 33,1 son arrendamientos (cifra de
    // 31-dic-2025 de la nota 16 [A1]; el semestre no la separa); caja 39,6; asociadas a valor contable 11,5. Sin minoritarios ni pensiones.
    puente: { fecha: '2026-06-30', deuda_financiera: 839.3, arrendamientos: 33.1, caja: 39.6, minoritarios: 0, pensiones: 0, asociadas: 11.5, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran), la principal para mercados desarrollados', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: r2(PRECIO / bpa27),
        mediana_5a: r2(med(adel5)), minimo_5a: r2(Math.min(...adel5)), media_larga: r2(avg(adel5)),
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: r2(med(cierre5)), minimo_5a: r2(Math.min(...cierre5)), media_larga: r2(avg(cierre5)), excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 16.4 },
      consenso: { bpa_ano1: 0.95, bpa_ano2: 1.00, objetivo_medio: 7.99, objetivo_min: 5.70, objetivo_max: 13.00, analistas: 14, tendencia_3m: 'subidas', fuente: 'MarketScreener: BPA NIIF de 2027e y 2028e y objetivo medio de 14 analistas; mínimo y máximo de Yahoo (13 analistas) [D3, D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};
