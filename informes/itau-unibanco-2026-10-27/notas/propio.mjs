// Parte del analista (Itaú Unibanco, corte 2026-10-27). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// ES UN BANCO: el valor intrínseco sale del modelo de exceso de rentabilidad (valoracion-banco.mjs → valoracion-banco.md) y la
// calidad se mide con ROE recurrente − Ke en lugar de ROIC − WACC. Ver meta.limitaciones y textos.mjs.
import S from './supuestos.mjs';
import { RESULTADO as RI, DATOS } from './valoracion-banco.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA RECURRENTE GERENCIAL (BR GAAP), el que publica Itaú cada trimestre y usa el consenso [A1, D2]. Todas las cifras por acción
// sobre ≈ 11.050 M de acciones, reexpresadas por las bonificaciones del 10 % (mar-2025) y del 3 % (dic-2025) [A6].
// Resultado recurrente: 2019 28.363 M, 2020 18.536, 2021 26.879, 2022 30.786, 2023 35.618, 2024 ≈ 41.400 (derivado), 2025 46.800
// [A7-A10]. 2026e: 1S26 real 24.689 M (12.282 + 12.407) + 2S ≈ 25.600 (≈ +4 % sobre el 1S, cartera +6-7 %, comisiones flojas,
// coste del crédito dentro de la guía) = 50.290 M ÷ 11.022 = 4,56 BRL [A1, A11]. 2027e: +7,7 % (cartera +7-8 %, ROE ≈ 24 %,
// recompras ≈ 0,5 %) = 4,91. 2028e base: +6,9 % = 5,25 (ROE del 23,5 % sobre un patrimonio que crece un 7,5 %, la senda del modelo
// de exceso de rentabilidad). Bajista: coste del riesgo un 25-30 % mayor tras el giro fiscal (ROE ≈ 21 %) y cartera +5 % = 4,45.
// Alcista: ROE ≈ 25 % con eficiencia e IA y cartera +9 % = 5,55.
export const BPA = { '2026': 4.56, '2027': 4.91, Bajista: 4.45, Base: 5.25, Alcista: 5.55 };
BPA['2028'] = BPA.Base;

const r1 = (x) => Math.round(x * 10) / 10;
// Historia del PER ADELANTADO: cierre de ITUB4 en B3 (Yahoo, ajustado por bonificaciones [D1]) ÷ BPA recurrente del año siguiente.
// Excluido el cierre de 2019: el BPA de 2020 (1,68) lo hundieron las provisiones de la COVID (resultado −35 %).
const cierres = { 2018: 31.33, 2019: 32.74, 2020: 27.92, 2021: 18.49, 2022: 22.07, 2023: 29.98, 2024: 27.12, 2025: 39.23 };
const bpaR = { 2018: 2.356, 2019: 2.567, 2020: 1.677, 2021: 2.432, 2022: 2.786, 2023: 3.223, 2024: 3.747, 2025: 4.244, 2026: BPA['2026'] };
const COVID = (a) => +a === 2020;
const adel = Object.keys(cierres).filter((a) => !COVID(+a + 1) && bpaR[+a + 1] > 0).map((a) => [a, r1(cierres[a] / bpaR[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => !COVID(a) && +a >= 2019 && bpaR[a] > 0).map((a) => [a, r1(cierres[a] / bpaR[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = RI.precio_brl; // 7,70 USD × 5,4064 = 41,63 BRL
export const PER = {
  actual: r1(PRECIO / BPA['2027']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
const EV_RI = Math.round(RI.valor_ponderado * DATOS.acciones);

export default {
  meta: {
    fecha_corte: '2026-10-27', divisa: 'BRL', divisa_cotizacion: 'USD', tipo_cambio: DATOS.tc, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'naturaleza',
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
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    partes: [{
      segmento: 'Banco entero: modelo de exceso de rentabilidad (residual income), ponderado 25/50/25',
      metrica: 'Valor por acción × acciones', valor_metrica: null, multiplo: null, ev_directo: EV_RI,
      justificacion: `Valor = valor contable por acción (18,92 BRL a 30-jun-2026) + valor actual de (ROE − Ke) × valor contable de los 10 años siguientes + terminal, con Ke del ${n2(RI.ke)} % y crecimiento terminal del 5 %; llevado al 27-oct. Bajista ${n2(RI.valores.Bajista)}, base ${n2(RI.valores.Base)} y alcista ${n2(RI.valores.Alcista)} BRL; ponderado ${n2(RI.valor_ponderado)} BRL × ${DATOS.acciones.toLocaleString('es-ES')} M de acciones = ${EV_RI.toLocaleString('es-ES')} M. Es patrimonio, no valor empresa: el puente es 0. Detalle en valoracion-banco.md [P1].`,
    }],
    comentario: T.suma_partes_comentario ?? null, confianza: 'Media',
  },
  valoracion: {
    // Puente 0: en un banco la deuda (depósitos, emisiones) es materia prima y ya está dentro del ROE; los minoritarios (≈ 1 % del
    // beneficio) ya están fuera del beneficio atribuido que usa el modelo.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'Brasil: prima implícita global de Damodaran (S&P 500, T12m with sustainable payout) sobre la tasa libre en reales', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e (BPA recurrente gerencial)', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA recurrente gerencial (el que publica Itaú y usa el consenso): cierre de ITUB4 en B3 de cada año (Yahoo, ajustado por bonificaciones [D1]) ÷ BPA recurrente real del año siguiente [A7-A10]; para el cierre de 2025 (39,23 BRL), ÷ nuestro 2026e (${n2(BPA['2026'])}). Serie: ${fmt(adel)}. Excluido el cierre de 2019: el BPA de 2020 (1,68 BRL) lo hundieron las provisiones de la COVID. Mediana y mínimo de los 5 últimos años válidos (2021-2025); media de los ${adel.length} años válidos de 2018-2025. PER actual = precio (7,70 USD × 5,4064 = ${n2(PRECIO)} BRL, cierre del 26-oct-2026) ÷ nuestro BPA de 2027e (${n2(BPA['2027'])}), el ejercicio siguiente, la misma base que la historia.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA recurrente del mismo año): ${fmt(PER.v2.alCierre)}. Excluido 2020 (COVID). Mediana y mínimo de los 5 últimos años válidos.` },
      },
      comparables_per: { mediana: 9.8 },
      consenso: { bpa_ano1: 4.60, bpa_ano2: 5.04, objetivo_medio: 49.69, objetivo_min: 30.5, objetivo_max: 60, analistas: 13, tendencia_3m: 'bajadas', fuente: 'Yahoo Finance, 26-oct-2026 (ITUB4): BPA de 2026 de 4,60 BRL y de 2027 de 5,04 (10 analistas; 5,13 hace 90 días); objetivo medio de 49,69 BRL (13 analistas, de 30,5 a 60), anterior a la caída del 26-oct; 10 comprar y 3 mantener. ADR: objetivo medio de 9,03 USD [D2]' },
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
