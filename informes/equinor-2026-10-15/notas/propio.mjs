// Parte del analista (Equinor, corte 2026-10-15). Sin subagentes: todas las secciones aquí. Citas [Pn] = fuentes de fuentes.mjs.
import * as N from './numeros.mjs';
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
const t = (k) => T[k] ?? null;

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'NOK', tipo_cambio: N.TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: t('limitaciones'),
    controles_explicados: T.controles_explicados ?? [],
  },
  identificacion: {
    nombre: 'Equinor ASA', nombre_corto: 'Equinor', ticker: 'EQNR', isin: 'NO0010096985', mercado: 'Oslo Børs (también ADR en la Bolsa de Nueva York)',
    indice_referencia: 'OBX / Oslo Børs Benchmark (OSEBX)', pais: 'Noruega', pais_iso: 'NO', sector: 'Energía', industria: 'Petróleo y gas integrados',
    sede: 'Stavanger', fundacion: '1972', empleados: null, web: 'equinor.com',
    precio: N.PRECIO, fecha_precio: '2026-10-15', acciones: 2357, capitalizacion_publicada: 107320, free_float_pct: 33.0,
    max_52s: Math.round(434.3 * N.TC * 100) / 100, min_52s: Math.round(226.4 * N.TC * 100) / 100,
    volumen_medio_diario: '≈ 1.060 M NOK/día (2,7 M de acciones, 3 meses)', proximos_resultados: '2026-10-28',
  },
  financieros: {
    cuenta: N.cuenta, ltm: N.ltm, cambios_perimetro: [],
    comentario: t('fin_comentario'), ajustes: t('fin_ajustes'), confianza: 'Alta',
  },
  trimestres: { items: N.trimestres, ultima_presentacion: t('ultima_presentacion'), confianza: 'Alta' },
  balance: {
    historico: N.balance,
    vencimientos: [],
    liquidez: t('liquidez'), rating: t('rating'), coste_deuda_pct: 3.6, vida_media_anios: null,
    otros_pasivos: t('otros_pasivos'), comentario: t('balance_comentario'), confianza: 'Alta',
  },
  flujos: { historico: N.flujos, comentario: t('flujos_comentario'), confianza: 'Alta' },
  multiplos_historicos: { serie: N.serie_multiplos, comentario: t('multiplos_comentario'), confianza: 'Media' },
  comparables: { criterio: t('comp_criterio'), empresas: N.comparables, comentario: t('comp_comentario'), confianza: 'Media' },
  transacciones: null,
  consenso: {
    guidance: t('guidance'),
    estimaciones: [
      { periodo: '2026e', ingresos: 131640, ebitda: null, ebit: null, bpa: 6.16, dpa: null, fuente: 'Yahoo Finance (EQNR), 6 analistas en BPA y 14 en ventas [P12]' },
      { periodo: '2027e', ingresos: 119950, ebitda: null, ebit: null, bpa: 4.82, dpa: null, fuente: 'Yahoo Finance (EQNR), 6 y 13 analistas [P12]' },
    ],
    recomendaciones: { n_analistas: 25, comprar: null, mantener: null, vender: null, po_medio: Math.round(382.66 * N.TC * 100) / 100, po_min: null, po_max: null },
    revisiones: t('revisiones'), base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null, confianza: 'Media',
  },
  bolsa: T.bolsa ?? null,
  dcf: {
    anios: N.anios, wacc: N.wacc, terminal: N.terminal,
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: N.puente_ingresos.map((p) => ({ ...p, comentario: T.puente?.[p.periodo] ?? null })),
      mercado_final: null, veredicto: 'Sí', justificacion: t('sost_justificacion'),
    },
    lectura: t('dcf_lectura'), confianza: 'Media',
  },
  escenarios: { casos: N.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: t('escenarios_comentario'), confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: t('suma_partes_comentario'), confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 (informe del 2T26): deuda financiera = no corriente 21.594 + corriente 6.807; arrendamientos 2.649 + 1.369;
    // caja = efectivo 8.062 + inversiones financieras corrientes 15.664; asociadas = participadas a valor contable 8.191;
    // pensiones = pasivo 4.335 − activo 2.253, neto de impuestos al 22 % ≈ 1.620. otros_ajustes = deuda con el Estado por la
    // amortización de sus acciones (3.052, pagada en julio con la caja del balance) + parte del Estado de los tramos 2 y 3 de la
    // recompra de 2026, que se amortizará en mayo de 2027 (≈ 904) + compras del tramo 3 en bolsa pagadas después del balance (≈ 321),
    // porque las acciones (2.357 M) son las de hoy sin las que se amortizarán al Estado.
    puente: { fecha: '2026-06-30', deuda_financiera: 28401, arrendamientos: 4018, caja: 23726, minoritarios: 69, pensiones: 1620, asociadas: 8191, otros_ajustes: 4277 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P15]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: N.BPA.bajista2028, multiplo: null, precio: null, justificacion: t('o12_bajista') },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: N.BPA.base2028, multiplo: null, precio: null, justificacion: t('o12_base') },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: N.BPA.alcista2028, multiplo: null, precio: null, justificacion: t('o12_alcista') },
      ],
      per_historico: {
        base: 'adelantado', actual: Math.round((N.PRECIO / N.BPA.e2027) * 100) / 100,
        mediana_5a: 9.08, minimo_5a: 3.57, media_larga: 8.26,
        excluidos: t('per_excluidos'),
      },
      comparables_per: { mediana: 9.35 },
      consenso: { bpa_ano1: 6.16, bpa_ano2: 4.82, objetivo_medio: Math.round(382.66 * N.TC * 100) / 100, objetivo_min: 33, objetivo_max: 51, analistas: 25, tendencia_3m: 'subidas', fuente: 'Yahoo Finance y Stock Analysis [P12, P13]' },
      diferencia_consenso: t('diferencia_consenso'),
      media: null,
      comentario: t('o12_comentario'),
    },
    comentario: t('valoracion_comentario'), confianza: 'Media',
  },
  ...(T.secciones ?? {}),
  resumen: T.resumen ?? null,
  rentabilidad: { comentario: t('rentabilidad_comentario'), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
