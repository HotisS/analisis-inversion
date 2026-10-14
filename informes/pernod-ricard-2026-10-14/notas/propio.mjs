// Parte del analista (Pernod Ricard, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: tras vender los vinos, el grupo es un solo negocio de espirituosos y champán con márgenes y comparables parecidos en todas las marcas.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 10660, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D12]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 5.09, multiplo: null, precio: null, justificacion: 'Ventas de 9.028 M (−4 % en el FY27 y 0 % en el FY28: EE. UU. y China no tocan fondo) con margen EBITDA del 28,9 %: EBIT de 2.167 M, 420 M de gasto financiero, impuesto del 25 % y 25 M de minoritarios sobre 252,3 M de acciones.' },
        { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 5.95, multiplo: null, precio: null, justificacion: 'Ventas de 9.400 M (−2 % en el FY27 por divisa con orgánico plano, según la guía, y +2 % en el FY28) con margen EBITDA del 30,9 % por el plan de eficiencia: EBIT de 2.444 M, 410 M de gasto financiero, impuesto del 25 % y 25 M de minoritarios; 252,3 M de acciones sin recompras.' },
        { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 6.60, multiplo: null, precio: null, justificacion: 'Ventas de 9.685 M (EE. UU. se estabiliza en el FY27 y el FY28 crece un 3,5 %, en la banda baja del objetivo del 3-6 %) con margen del 32,4 %: EBIT de 2.663 M y 410 M de gasto financiero.' },
      ],
      per_historico: { base: 'adelantado', actual: 11.2, mediana_5a: 14.5, minimo_5a: 11.2, media_larga: 14.4, excluidos: 'Historia adelantada (precio de cierre de junio ÷ BPA recurrente diluido del ejercicio siguiente): FY2024 126,70 / 7,26 = 17,5x; FY2025 84,60 / 5,85 = 14,5x; FY2026 63,86 / 5,69 (nuestro FY27e) = 11,2x [D2, A5, A2]. Se excluyen FY2022 (176,8 / 9,11 = 19,4x) y FY2023 (202,40 / 7,90 = 25,6x): burbuja de los destilados tras la pandemia. Actual = 64,0 / 5,69.' },
      comparables_per: { mediana: 15.6 },
      consenso: { bpa_ano1: null, bpa_ano2: null, objetivo_medio: 80.25, objetivo_min: 75, objetivo_max: 95, analistas: null, tendencia_3m: 'recortes', fuente: 'Mediana de objetivos de julio de 2026 (Idéal Investisseur), UBS 75 EUR y Jefferies 95 EUR [D5, D6, D7]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: 76.82,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Baja' },
  fuentes: [],
};
