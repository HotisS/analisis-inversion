// Parte del analista (BTG Pactual, BPAC11, corte 2026-10-27; precio: cierre de B3 del 26-oct-2026). Citas con la letra de la
// nota: [A3] = fuente 3 de A.json; [P1] = fuente propia. Todo por UNIT (1 ordinaria + 2 preferentes de clase A) y en BRL.
import S from './supuestos.mjs';
import { ri, PRECIO, UNITS } from './banco-ri.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO por unit (lucro líquido ajustado ÷ units): el que publica el banco cada trimestre, el del consenso y el de los
// comparables brasileños. El NIIF de la CVM difiere por la amortización del fondo de comercio, los minoritarios de Banco Pan y
// algunos ajustes de valor (financieros.ajustes). Sale del modelo de exceso de rentabilidad (banco-ri.mjs): ROE sobre el
// valor contable de inicio de cada año. 2026e = 1S26 real (2,58) + 2H26 del modelo (2,70) = 5,28.
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const fila = (dRoe, i) => ri({ dRoe }).filas[i].bpa;
const BPA26 = r2(2.58 + fila(0, 0));
export const BPA = { '2026': BPA26, '2027': r2(fila(0, 1)), Bajista: r2(fila(-4, 2)), Base: r2(fila(0, 2)), Alcista: r2(fila(2, 2)) };
BPA['2028'] = BPA.Base;

// Historia del PER ADELANTADO: cierre de cada año (Yahoo [D1]) ÷ BPA ajustado por unit real del año siguiente [A1-A9];
// el cierre de 2025 (52,58) ÷ nuestro 2026e. Sin 2018: el BPA ajustado por unit de 2019 no está en las fuentes descargadas.
const cierres = { 2019: 18.9, 2020: 23.48, 2021: 20.97, 2022: 23.93, 2023: 37.61, 2024: 27.2, 2025: 52.58 };
const bpaR = { 2020: 1.12, 2021: 1.69, 2022: 2.17, 2023: 2.73, 2024: 3.24, 2025: 4.32, 2026: BPA26 };
const adel = Object.keys(cierres).filter((a) => bpaR[+a + 1] > 0).map((a) => [a, r1(cierres[a] / bpaR[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaR[a] > 0).map((a) => [a, r1(cierres[a] / bpaR[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PER = {
  actual: r1(PRECIO / BPA['2027']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-27', divisa: 'BRL', divisa_cotizacion: 'BRL', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin',
    normas_contables: 'BR GAAP de gestión (lucro líquido ajustado, el de los informes trimestrales); NIIF consolidadas de la CVM como contraste',
    formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: false,
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
  suma_partes: T.suma_partes ?? { aplica: false, descuento_holding_pct: 0, partes: [], comentario: null, confianza: 'Baja' },
  valoracion: {
    // Puente en cero: en un banco los depósitos, las emisiones y la caja son operación, no deuda del accionista; los
    // minoritarios (Banco Pan) ya no restan porque el lucro ajustado es el atribuible y Pan es 100 % desde 2026 [A1, D14].
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout); se suma a la tasa libre brasileña', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA ajustado por unit (el que publica el banco y usa el consenso): cierre de cada año en B3 (Yahoo [D1]) ÷ BPA real del año siguiente [A1, A3-A9]; para el cierre de 2025 (52,58 BRL), ÷ nuestro 2026e (${n2(BPA26)}). Serie: ${fmt(adel)}. Sin 2018 (falta el BPA ajustado por unit de 2019 en las fuentes). Mediana y mínimo de los 5 últimos años (2021-2025); media de los ${adel.length} años de 2019-2025. PER actual = precio (60,00 BRL, cierre del 26-oct-2026) ÷ nuestro BPA de 2027e (${n2(BPA['2027'])}), el ejercicio siguiente, la misma base que la historia.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA ajustado del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025.` },
      },
      comparables_per: { mediana: 7.5 },
      consenso: { bpa_ano1: 5.32, bpa_ano2: 6.13, objetivo_medio: 75.31, objetivo_min: 63, objetivo_max: 95, analistas: 13, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 26-oct-2026: BPA por unit de 2026 de 5,32 BRL (7 analistas) y de 2027 de 6,13 (6,01 hace 90 días); objetivo medio de 75,31 BRL, mínimo 63, máximo 95; 11 comprar y 2 mantener. Todo anterior a la elección [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
  huecos: [],
};
export { UNITS };
