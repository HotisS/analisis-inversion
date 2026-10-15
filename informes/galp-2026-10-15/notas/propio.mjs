// Parte del analista (Galp, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const casos12 = ['Bajista', 'Base', 'Alcista'].map((esc) => ({
  escenario: esc, metrica: 'PER 2028e', beneficio_por_accion: S.bpa12[esc], multiplo: null, precio: null, justificacion: T.just12?.[esc] ?? null,
}));

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: {
    aplica: true, descuento_holding_pct: 10,
    partes: [
      { segmento: 'Upstream Brasil', metrica: 'EBITDA 2028e', valor_metrica: 2100, multiplo: 3.5, ev_directo: null, justificacion: 'Productoras de crudo a EV/EBITDA de 2,5-4,5 veces (Equinor 2,6x, OMV 3,6x en la tabla de comparables); EBITDA con Brent de 78-80 USD y 135 kboepd (estimación propia).' },
      { segmento: 'Industrial y midstream', metrica: 'EBITDA de mitad de ciclo', valor_metrica: 850, multiplo: 4.5, ev_directo: null, justificacion: 'Refino y trading a mitad de ciclo (952 M en 2025 con 7,1 USD/bep de margen); múltiplo de refinerías europeas.' },
      { segmento: 'Comercial', metrica: 'EBITDA 2025', valor_metrica: 384, multiplo: 7.0, ev_directo: null, justificacion: 'Distribución y estaciones de servicio con un tercio de tiendas y servicios.' },
      { segmento: 'Renovables', metrica: 'EBITDA 2026e (guía)', valor_metrica: 80, multiplo: 11.0, ev_directo: null, justificacion: 'Activos operativos de 2,7 GW; la eólica se pagó a 318 M por 351 MW.' },
      { segmento: 'Namibia (Mopane, Venus, PEL 91), opción con riesgo', metrica: 'Valor directo', valor_metrica: null, multiplo: null, ev_directo: 1500, justificacion: 'Estimación propia con riesgo: Galp conserva el 40 % de Mopane con acarreo del 50 % de su inversión por TotalEnergies; sin recursos certificados ni decisión de inversión. Equivale a unos 2 EUR por acción.' },
      { segmento: 'Corporativo', metrica: 'Costes 2025', valor_metrica: -29, multiplo: 6.0, ev_directo: null, justificacion: 'Costes centrales capitalizados.' },
    ],
    comentario: T.sdp_comentario ?? null,
    confianza: 'Baja',
  },
  valoracion: {
    // Deuda y caja a 30-jun-2026 [A3]. Minoritarios a valor económico (30 % de Sinopec en Petrogal Brasil ≈ 10 veces sus 180 M de beneficio normalizado), no al contable de 933 M.
    // Pensiones 222 M × (1 − 30 %). otros_ajustes = dividendo a cuenta pagado en agosto (0,35 × 722 M = 253 M) + recompra hasta noviembre (≈ 24 M).
    puente: { fecha: '2026-06-30', deuda_financiera: 3366, arrendamientos: 1232, caja: 1987, minoritarios: 1800, pensiones: 155, asociadas: 114, otros_ajustes: 277 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: casos12,
      per_historico: { base: 'adelantado', actual: 10.68, mediana_5a: 10.29, minimo_5a: 8.09, media_larga: 12.81, excluidos: T.per_excluidos ?? null, v2: { mediana_5a: 11.98, minimo_5a: 9.41, media_larga: 13.92, excluidos: 'Historia al cierre (precio de cierre ÷ BPA RCA del mismo año), solo para control v2: 2019 22,7x; 2021 15,9x; 2022 12,0x; 2023 10,9x; 2024 12,7x; 2025 9,4x; fuera 2020 (pérdidas).' } },
      comparables_per: { mediana: 8.4 },
      consenso: { bpa_ano1: 2.30, bpa_ano2: 2.067, objetivo_medio: 23.83, objetivo_min: 18.40, objetivo_max: 28.00, analistas: 18, tendencia_3m: 'subidas', fuente: 'MarketScreener, 18 analistas [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
