// Parte del analista (Midea, línea H, corte 2026-10-16). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente 1 de propio.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista', 3), Base: bpa('Base', 3), Alcista: bpa('Alcista', 3) };
const bpa27 = bpa('Base', 2).bpa;
const PRECIO = 80.0; // 93,95 HKD × 0,8515 RMB/HKD

export default {
  meta: {
    fecha_corte: '2026-10-16', divisa: 'CNY', divisa_cotizacion: 'HKD', tipo_cambio: 0.8515, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (HKFRS, cuentas de la línea H)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance NIIF de 30-jun-2026 [A3]. Caja = tesorería total (efectivo, depósitos, activos financieros a coste amortizado y a valor razonable).
    // Deuda con los bonos convertibles de mayo de 2026 (se tratan como deuda: el de 2027 está casi en el dinero, 91,82 HKD).
    // otros_ajustes: −2.400 M por las recompras posteriores al balance ya pagadas con caja que el balance aún cuenta (signo: resta de la caja → suma a la deuda).
    puente: { fecha: '2026-06-30', deuda_financiera: 80327, arrendamientos: 3312, caja: 328842, minoritarios: 12932, pensiones: 0, asociadas: 0, otros_ajustes: 2400 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; referencia de mercado desarrollado)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: Math.round((PRECIO / bpa27) * 100) / 100,
        mediana_5a: 12.33, minimo_5a: 9.54, media_larga: 12.17,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 13.1, minimo_5a: 10.5, media_larga: 13.0, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 15.65 },
      consenso: { bpa_ano1: 6.6, bpa_ano2: 7.19, objetivo_medio: 95.81, objetivo_min: 75.75, objetivo_max: 115.52, analistas: 11, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA, 15-oct-2026) y Yahoo Finance (objetivos de 11 analistas en la H: 112,52 HKD de media, a 0,8515 RMB/HKD) [D3, D4]' },
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
