// Parte del analista (Pro Medicus, corte 2026-10-12). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';
import R from './resumen.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const transacciones = [
  { fecha: '2021-04', objetivo: 'Nuance Communications (IA clínica y dictado; PowerScribe en radiología)', comprador: 'Microsoft', ev: 28220, ev_ventas: 15.3, ev_ebitda: null, prima_pct: 23, excluir: false, comentario: 'Valor empresa de 19.700 M USD con la deuda neta [D20]; ventas FY2020 de 1.283,8 M USD [D21]; EBITDA no significativo.' },
  { fecha: '2021-08', objetivo: 'Inovalon (datos y software para aseguradoras y proveedores)', comprador: 'Nordic Capital e Insight Partners', ev: 10457, ev_ventas: 10.9, ev_ebitda: 39.1, prima_pct: 25.3, excluir: false, comentario: 'Valor empresa ~7.300 M USD [D24]; EBITDA contable 2020 de 186,6 M USD [D25] (estimación propia del múltiplo).' },
  { fecha: '2021-12', objetivo: 'Cerner (historia clínica electrónica)', comprador: 'Oracle', ev: 42050, ev_ventas: 5.3, ev_ebitda: 18.2, prima_pct: null, excluir: false, comentario: 'Valor empresa estimado de 29.354 M USD [D22, D23]; EBITDA contable 2020 de 1.612 M USD [D23] (estimación propia).' },
  { fecha: '2023-12', objetivo: 'Volpara Health Technologies (IA para imagen mamaria, ASX)', comprador: 'Lunit', ev: 285.5, ev_ventas: 7.5, ev_ebitda: null, prima_pct: 47.4, excluir: false, comentario: '7,5 veces las ventas FY24, múltiplo publicado por el vendedor [D26]; con pérdidas operativas.' },
  { fecha: '2024-12', objetivo: 'CompuGroup Medical (software para médicos y hospitales)', comprador: 'CVC Capital Partners', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 33.5, excluir: false, comentario: 'Oferta de 22,00 EUR por acción; prima del 33,5 % [D27]. Sin valor empresa ni múltiplo publicados.' },
  { fecha: '2026-03', objetivo: 'Intelerad (PACS y visor de imagen médica)', comprador: 'GE HealthCare', ev: 3295, ev_ventas: 8.5, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '2.300 M USD por ~270 M USD de ingresos del primer año, ~90 % recurrentes y margen EBITDA superior al 30 % [B16] (múltiplo de ventas, cálculo propio). Es el competidor directo más parecido.' },
];

export default {
  meta: {
    fecha_corte: '2026-10-12', divisa: 'AUD', divisa_cotizacion: 'AUD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'Normas contables australianas (AASB, conformes con las NIIF)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  transacciones: { operaciones: transacciones, comentario: T.transacciones_comentario ?? null, confianza: 'Media' },
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: S.mercado_final,
      veredicto: 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? 'Un solo negocio (software de imagen médica con cobro por estudio): no hay partes con perfiles distintos.', confianza: 'Alta' },
  valoracion: {
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)» de octubre de 2026 [D5]' },
    pesos: S.pesos,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Alta' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
