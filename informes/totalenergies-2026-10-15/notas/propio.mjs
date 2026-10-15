// Parte del analista (TotalEnergies, corte 2026-10-15). Sin subagentes: todas las secciones aquí. Citas [Pn] = fuentes de abajo.
import * as N from './numeros.mjs';
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
const t = (k) => T[k] ?? null;

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'EUR', tipo_cambio: N.TC, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: t('limitaciones'),
    controles_explicados: T.controles_explicados ?? [],
  },
  identificacion: {
    nombre: 'TotalEnergies SE', nombre_corto: 'TotalEnergies', ticker: 'TTE', isin: 'FR0000120271', mercado: 'Euronext París (también NYSE desde el 8-dic-2025)',
    indice_referencia: 'CAC 40', pais: 'Francia', pais_iso: 'FR', sector: 'Energía', industria: 'Petróleo, gas y combustibles integrados',
    sede: 'Courbevoie (París)', fundacion: '1924', empleados: null, web: 'totalenergies.com',
    precio: N.PRECIO, fecha_precio: '2026-10-15', acciones: 2230, capitalizacion_publicada: 196640, free_float_pct: null,
    max_52s: Math.round(81.35 * N.TC * 100) / 100, min_52s: Math.round(51.49 * N.TC * 100) / 100,
    volumen_medio_diario: '≈ 273 M EUR/día (3,6 M de acciones, 3 meses)', proximos_resultados: '2026-10-29',
  },
  financieros: {
    cuenta: N.cuenta, ltm: N.ltm, cambios_perimetro: [],
    comentario: t('fin_comentario'), ajustes: t('fin_ajustes'), confianza: 'Alta',
  },
  trimestres: { items: N.trimestres, ultima_presentacion: t('ultima_presentacion'), confianza: 'Media' },
  balance: {
    historico: N.balance,
    vencimientos: [],
    liquidez: t('liquidez'), rating: t('rating'), coste_deuda_pct: 6.0, vida_media_anios: null,
    otros_pasivos: t('otros_pasivos'), comentario: t('balance_comentario'), confianza: 'Media',
  },
  flujos: { historico: N.flujos, comentario: t('flujos_comentario'), confianza: 'Media' },
  multiplos_historicos: { serie: N.serie_multiplos, comentario: t('multiplos_comentario'), confianza: 'Media' },
  comparables: { criterio: t('comp_criterio'), empresas: N.comparables, comentario: t('comp_comentario'), confianza: 'Media' },
  transacciones: null,
  consenso: {
    guidance: t('guidance'),
    estimaciones: [
      { periodo: '2026e', ingresos: 217233, ebitda: 52897, ebit: 39079, bpa: 12.07, dpa: 4.07, fuente: 'MarketScreener, 21 analistas [P10]' },
      { periodo: '2027e', ingresos: 205255, ebitda: 48418, ebit: 33635, bpa: 10.90, dpa: 4.22, fuente: 'MarketScreener [P10]' },
      { periodo: '2028e', ingresos: 200228, ebitda: 44262, ebit: 29345, bpa: 9.59, dpa: 4.42, fuente: 'MarketScreener [P10]' },
    ],
    recomendaciones: { n_analistas: 21, comprar: null, mantener: null, vender: null, po_medio: 98.73, po_min: null, po_max: null },
    revisiones: t('revisiones'), base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 3.4, confianza: 'Media',
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
    // Puente a 30-jun-2026 (6-K 2T26): deuda bruta sin arrendamientos = corto 11.229 + otros pasivos financieros corrientes 209
    // + largo 41.157; caja = efectivo 27.678 + activos financieros corrientes 3.720 + no corrientes 1.601. Participadas a 10 veces
    // su resultado normalizado (≈2.800 M). otros_ajustes = híbridos perpetuos (estimación 11.500) + recompra del 3T26 pagada
    // después del balance (1.500), porque las acciones son las de después de esa recompra.
    puente: { fecha: '2026-06-30', deuda_financiera: 52595, arrendamientos: 8904, caja: 32999, minoritarios: 2545, pensiones: 1500, asociadas: 28000, otros_ajustes: 13000 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P13]' },
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
        mediana_5a: 7.22, minimo_5a: 5.84, media_larga: 7.76,
        excluidos: t('per_excluidos'),
      },
      comparables_per: { mediana: 9.23 },
      consenso: { bpa_ano1: 12.07, bpa_ano2: 10.90, objetivo_medio: 98.73, objetivo_min: null, objetivo_max: null, analistas: 21, tendencia_3m: 'subidas', fuente: 'MarketScreener [P10]' },
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
