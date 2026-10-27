// Parte del analista (Banco Santander, corte 2026-10-27). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// ES UN BANCO: el valor intrínseco sale del modelo de exceso de rentabilidad sobre el valor tangible (valoracion-banco.mjs →
// valoracion-banco.md) y la calidad se mide con RoTE (y RoE) ordinario − Ke en lugar de ROIC − WACC. Ver meta.limitaciones y textos.mjs.
import S from './supuestos.mjs';
import { RESULTADO as RI, DATOS } from './valoracion-banco.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA ORDINARIO («underlying») por acción, el que publica el banco y sigue el consenso [A1, D2]: (beneficio ordinario − cupones de
// AT1) ÷ acciones medias. 2026e: 1S26 real 0,48 € (7.328 M) + 2S ≈ 0,52 (≈ 7.900 M con Webster desde el 20-ago, TSB entero y
// el 3T26 sin extraordinarios; 14.500 M de acciones medias) = 1,00 €. 2027e: beneficio ≈ 16.900 M (orgánico +8 %, Webster un año
// entero, sinergias de TSB) − 750 M de AT1 ÷ 14.150 M de acciones (recompras de ≈ 3.500 M al año y el canje de Brasil) = 1,16.
// 2028e base: ≈ 18.600 M (por debajo del > 20.000 M del plan) = 1,28. Bajista: coste del riesgo arriba y tipos abajo, ≈ 15.500 M
// = 1,05. Alcista: se cumple el plan (≈ 20.500 M) = 1,43.
export const BPA = { '2026': 1.00, '2027': 1.16, Bajista: 1.05, Base: 1.28, Alcista: 1.43 };
BPA['2028'] = BPA.Base;

const r1 = (x) => Math.round(x * 10) / 10;
const ACC = 14450; // acciones en circulación (Yahoo 14.449,6 M; 14.556,5 M tras amortizar las del programa de 5.030 M, menos ≈ 123 M recompradas desde el 24-ago)
// Historia del PER ADELANTADO: cierre anual de SAN en Madrid (bolsa.mjs [D1]) ÷ BPA ordinario del año siguiente. BPA:
// 2021 0,47 (ordinario: 8.654 M; estadístico 0,44), 2022 0,54, 2023 0,65, 2024 0,77 (estadístico = ordinario) [A2], 2025 0,84
// (ordinario reexpresado sin Polonia [A1]; publicado 0,91), 2026 nuestro 1,00.
const cierres = { 2020: 2.54, 2021: 2.94, 2022: 2.80, 2023: 3.78, 2024: 4.46, 2025: 10.07 };
const bpaR = { 2021: 0.47, 2022: 0.54, 2023: 0.65, 2024: 0.77, 2025: 0.84, 2026: BPA['2026'] };
const adel = Object.keys(cierres).filter((a) => bpaR[+a + 1] > 0).map((a) => [a, r1(cierres[a] / bpaR[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaR[a] > 0 && +a <= 2025).map((a) => [a, r1(cierres[a] / bpaR[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = RI.precio; // SAN, cierre del 26-oct-2026
export const PER = {
  actual: r1(PRECIO / BPA['2027']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
const EV_RI = Math.round(RI.valor_ponderado * ACC);

export default {
  meta: {
    fecha_corte: '2026-10-27', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
      segmento: 'Banco entero: modelo de exceso de rentabilidad sobre el valor tangible (residual income), ponderado 25/50/25',
      metrica: 'Valor por acción × acciones', valor_metrica: null, multiplo: null, ev_directo: EV_RI,
      justificacion: `Valor = valor contable tangible por acción (6,32 € a 30-jun-2026; ${n2(DATOS.vtc_pf)} € pro forma con Webster) + valor actual de (RoTE − Ke) × VTC de los 10 años siguientes + terminal, con Ke del ${n2(RI.ke)} % (Bund 3,43 % + 1,24 × 5,5 % + prima país ponderada ${n2(RI.crp)} %) y crecimiento terminal del 3 %; llevado al 27-oct (el dividendo a cuenta de 0,127 € aún se cobra). Bajista ${n2(RI.valores.Bajista)}, base ${n2(RI.valores.Base)} y alcista ${n2(RI.valores.Alcista)} €; ponderado ${n2(RI.valor_ponderado)} € × ${ACC.toLocaleString('es-ES')} M de acciones = ${EV_RI.toLocaleString('es-ES')} M. Es patrimonio, no valor empresa: el puente es 0. Detalle en valoracion-banco.md [P1].`,
    }],
    comentario: T.suma_partes_comentario ?? null, confianza: 'Media',
  },
  valoracion: {
    // Puente 0: en un banco la deuda (depósitos, emisiones) es materia prima y ya está dentro del ROE; minoritarios insignificantes.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'Prima implícita global de Damodaran (S&P 500, T12m with sustainable payout) sobre el Bund, más la prima país ponderada', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e (BPA ordinario por acción)', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA ordinario por acción (el que publica el banco y sigue el consenso): cierre anual de SAN en Madrid (bolsa.mjs [D1]) ÷ BPA ordinario real del año siguiente [A1, A2]; para el cierre de 2025 (10,07 €), ÷ nuestro 2026e (${n2(BPA['2026'])}). Serie: ${fmt(adel)}. Sin exclusiones: no hay pérdidas ordinarias ni BPA atípico (2020 tuvo pérdidas estadísticas por el deterioro del fondo de comercio, pero el BPA del año siguiente, 2021, es normal). Mediana y mínimo de los 5 últimos años (2021-2025); media de los ${adel.length} años. PER actual = precio (${n2(PRECIO)} €, cierre del 26-oct-2026) ÷ nuestro BPA de 2027e (${n2(BPA['2027'])}), la misma base que la historia. OJO: la historia de 2020-2024 (4-5 veces) es la de la banca europea con tipos negativos o cero; desde 2025 el sector se ha revalorizado (BBVA, CaixaBank e ING cotizan a 9,5-10,5 veces): la regla lleva el bajista a 4,3 veces, un múltiplo de otro régimen.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA recurrente del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de los 5 años 2021-2025.` },
      },
      comparables_per: { mediana: 9.0 },
      consenso: { bpa_ano1: 1.04, bpa_ano2: 1.25, objetivo_medio: 13.85, objetivo_min: 11.3, objetivo_max: 15.3, analistas: 21, tendencia_3m: 'estable', fuente: 'Yahoo Finance, 27-oct-2026 (SAN.MC): BPA de 2026 de 1,036 € (1,042 hace 90 días; 17 analistas) y de 2027 de 1,251 (1,243; 19 analistas); objetivo medio de 13,85 € (21 analistas, de 11,30 a 15,30); 6 compra fuerte, 10 comprar y 5 mantener [D2]' },
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
