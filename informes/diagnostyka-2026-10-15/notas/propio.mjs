// Parte del analista (Diagnostyka, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA propio por escenario (fórmula de objetivo-12m.md): ventas × margen − amortización − financiero − impuestos − minoritarios, ÷ acciones.
const ACC = 33.7565, VENTAS_2025 = 2410.5;
const FIN = { '2026e': 66, '2027e': 70, '2028e': 72 }; // resultado financiero recurrente (deuda + arrendamientos), M PLN
const MINOR = 0.039; // minoritarios ≈ 3,9 % del beneficio neto (10,3 / 261,9 en 2025)
function bpa(periodo, dg = 0, dm = 0) {
  let v = VENTAS_2025, out = null;
  for (const y of S.anios) {
    const fijo = y.fijo;
    v *= 1 + (y.crecimiento_pct + (fijo ? 0 : dg)) / 100;
    if (y.periodo === periodo) {
      const ebitda = v * (y.margen_ebitda_pct + (fijo ? 0 : dm)) / 100;
      const ebit = ebitda - v * y.amortizacion_pct_ventas / 100;
      const neto = (ebit - FIN[periodo]) * (1 - y.tasa_impositiva_pct / 100);
      out = { ventas: v, ebitda, ebit, neto, atribuido: neto * (1 - MINOR), bpa: (neto * (1 - MINOR)) / ACC };
      break;
    }
  }
  return out;
}
export const BPA = {
  '2026e': bpa('2026e'), '2027e': bpa('2027e'),
  Bajista: bpa('2028e', -3.0, -2.0), Base: bpa('2028e'), Alcista: bpa('2028e', 1.5, 1.0),
};
const r2 = (x) => Math.round(x * 100) / 100, r1 = (x) => Math.round(x * 10) / 10;
const PRECIO = 159.0, CIERRE_2025 = 171.0;
const perActual = r1(PRECIO / BPA['2027e'].bpa);
const perAdel2025 = r1(CIERRE_2025 / BPA['2026e'].bpa);
const perCierre2025 = r1(CIERRE_2025 / 7.45);

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'PLN', divisa_cotizacion: 'PLN', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
  escenarios: { casos: S.casos.map((c) => ({ ...c, perfil: [], narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: la empresa publica un solo segmento operativo; la imagen médica (6 % de los ingresos) es demasiado pequeña para cambiar el valor con un múltiplo propio [A1, A4].', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 742.7, arrendamientos: 478.8, caja: 17.6, minoritarios: 17.4, pensiones: 0, asociadas: 39.0, otros_ajustes: 103.7 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados; el riesgo país va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: r2(BPA[e].bpa), multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: 1, actual: perActual, mediana_5a: perAdel2025, minimo_5a: perAdel2025, media_larga: perAdel2025,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: perCierre2025, minimo_5a: perCierre2025, media_larga: perCierre2025, excluidos: 'Un solo cierre como cotizada (2025: 171 PLN ÷ BPA de 2025, 7,45). Sale a bolsa en febrero de 2025; los años anteriores no tienen precio.' },
      },
      comparables_per: { mediana: 16.9 },
      consenso: { bpa_ano1: 7.81, bpa_ano2: 10.10, objetivo_medio: 196.39, objetivo_min: 176.0, objetivo_max: 215.0, analistas: 7, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (7 analistas, 15-oct-2026); en mayo, 211,6 PLN de media con 6 analistas según PPCG [D2, D11]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? T.secciones?.catalizadores ?? null,
  riesgos: T.riesgos ?? T.secciones?.riesgos ?? null,
  preguntas: T.preguntas ?? T.secciones?.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
