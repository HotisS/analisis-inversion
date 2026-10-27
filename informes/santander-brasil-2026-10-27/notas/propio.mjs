// Parte del analista (Santander Brasil, corte 2026-10-27). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// ES UN BANCO: el valor intrínseco sale del modelo de exceso de rentabilidad (valoracion-banco.mjs → valoracion-banco.md) y la
// calidad se mide con ROE recurrente − Ke en lugar de ROIC − WACC. Ver meta.limitaciones y textos.mjs.
import S from './supuestos.mjs';
import { RESULTADO as RI, DATOS } from './valoracion-banco.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA RECURRENTE GERENCIAL (BR GAAP) por unit, el que publica el banco y sigue el consenso [A1, D2]: resultado gerencial ÷ 3.744 M
// de units (7.488 M de acciones ÷ 2). Resultado gerencial: 2021 16.347 M, 2022 ≈ 12.900, 2023 ≈ 9.236 (derivado del +50,2 % de
// 2024), 2024 13.872, 2025 15.615 [A5-A9]. 2026e: 1S26 real 6.802 M (3.788 + 3.014) + 2S ≈ 6.600 (PDD aún alta, margen con el
// mercado negativo, 3T26 sin crédito fiscal) = 13.400 M ÷ 3.744 = 3,58 BRL [A1, D10]. 2027e: ROE ≈ 14,5 % sobre un patrimonio que
// crece un 6 % = 14.640 M = 3,91. 2028e base: ROE ≈ 15,5 % = 4,35 (la senda del modelo de exceso de rentabilidad).
// Bajista: coste del crédito en el 4,3-4,5 % de la cartera y ROE ≈ 12 % = 3,31. Alcista: ROE ≈ 17,5 % (el de 2025) = 4,95.
export const BPA = { '2026': 3.58, '2027': 3.91, Bajista: 3.31, Base: 4.35, Alcista: 4.95 };
BPA['2028'] = BPA.Base;

const r1 = (x) => Math.round(x * 10) / 10;
const r3 = (x) => Math.round(x * 1000) / 1000;
const U = DATOS.units;
// Historia del PER ADELANTADO: cierre anual de SANB11 en B3 (Yahoo [D1]) ÷ BPA recurrente del año siguiente. Sin exclusiones:
// la serie gerencial disponible empieza en 2021 (cierres de 2020-2025).
const cierres = { 2020: 43.38, 2021: 30.14, 2022: 28.20, 2023: 32.30, 2024: 23.82, 2025: 34.06 };
const res = { 2021: 16347, 2022: 12900, 2023: 9236, 2024: 13872, 2025: 15615 };
const bpaR = Object.fromEntries(Object.entries(res).map(([a, v]) => [a, r3(v / U)]));
bpaR[2026] = BPA['2026'];
const adel = Object.keys(cierres).filter((a) => bpaR[+a + 1] > 0).map((a) => [a, r1(cierres[a] / bpaR[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaR[a] > 0 && +a <= 2025).map((a) => [a, r1(cierres[a] / bpaR[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = RI.precio_brl; // SANB11, cierre del 26-oct-2026
export const PER = {
  actual: r1(PRECIO / BPA['2027']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
const EV_RI = Math.round(RI.valor_ponderado * U);

export default {
  meta: {
    fecha_corte: '2026-10-27', divisa: 'BRL', divisa_cotizacion: 'BRL', tipo_cambio: 1, unidades: 'millones',
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
      metrica: 'Valor por unit × units', valor_metrica: null, multiplo: null, ev_directo: EV_RI,
      justificacion: `Valor = valor contable por unit (25,77 BRL a 30-jun-2026, BR GAAP) + valor actual de (ROE − Ke) × valor contable de los 10 años siguientes + terminal, con Ke del ${n2(RI.ke)} % y crecimiento terminal del 5 %; llevado al 27-oct y neto del JCP de 0,40 BRL. Bajista ${n2(RI.valores.Bajista)}, base ${n2(RI.valores.Base)} y alcista ${n2(RI.valores.Alcista)} BRL; ponderado ${n2(RI.valor_ponderado)} BRL × ${U.toLocaleString('es-ES')} M de units = ${EV_RI.toLocaleString('es-ES')} M. Es patrimonio, no valor empresa: el puente es 0. Como el ROE queda por debajo del Ke, vale menos que su valor contable. Detalle en valoracion-banco.md [P1].`,
    }],
    comentario: T.suma_partes_comentario ?? null, confianza: 'Media',
  },
  valoracion: {
    // Puente 0: en un banco la deuda (depósitos, emisiones) es materia prima y ya está dentro del ROE; minoritarios insignificantes.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'Brasil: prima implícita global de Damodaran (S&P 500, T12m with sustainable payout) sobre la tasa libre en reales', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e (BPA recurrente gerencial por unit)', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA recurrente gerencial por unit (el que publica el banco y sigue el consenso): cierre anual de SANB11 en B3 (Yahoo [D1]) ÷ BPA recurrente real del año siguiente [A5-A9]; para el cierre de 2025 (34,06 BRL), ÷ nuestro 2026e (${n2(BPA['2026'])}). Serie: ${fmt(adel)}. Sin exclusiones: la serie gerencial que hemos podido reunir empieza en 2021, así que la historia arranca en el cierre de 2020. Mediana y mínimo de los 5 últimos años (2021-2025); media de los ${adel.length} años. PER actual = precio (${n2(PRECIO)} BRL, cierre del 26-oct-2026) ÷ nuestro BPA de 2027e (${n2(BPA['2027'])}), la misma base que la historia. OJO: desde el 30-jul el precio lo fija la oferta de canje de la matriz, no el beneficio.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA recurrente del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de los 5 años 2021-2025.` },
      },
      comparables_per: { mediana: 7.0 },
      consenso: { bpa_ano1: 3.70, bpa_ano2: 4.33, objetivo_medio: 31.18, objetivo_min: 27, objetivo_max: 44, analistas: 9, tendencia_3m: 'bajadas', fuente: 'Yahoo Finance, 26-oct-2026 (SANB11.SA): BPA de 2026 de 3,70 BRL (4,29 hace 90 días) y de 2027 de 4,33 (4,94); objetivo medio de 31,18 BRL (9 analistas, de 27 a 44); 1 comprar y 10 mantener; varios bancos dejaron de recomendar por la oferta de canje (UBS BB pasó a neutral [D11]). ADR: objetivo medio de 6,77 USD [D2]' },
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
