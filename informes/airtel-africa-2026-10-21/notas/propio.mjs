// Parte del analista (Airtel Africa, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA SIN DIVISAS (la base que publica la empresa como «EPS before exceptional items and foreign exchange»), con la proyección
// del DCF: (ventas × (margen EBITDA − amortización) − coste financiero recurrente) × (1 − impuesto del DCF) × (1 − 18 % de
// minoritarios) ÷ acciones. Coste financiero recurrente ≈ 840 M en FY2026 (713 publicados + 127 de ganancias de divisa [A2]);
// sube con los arrendamientos de torres y la deuda local: 900 / 950 / 1.000 M. Minoritarios: 134 de 813 M después de impuestos
// en FY2026 (16,5 %) [A1]; 18 % con el 22,15 % de Airtel Money en manos de terceros. Acciones: 3.624,2 M a 30-sep-2026 [C9]
// menos la recompra en curso (hasta el 1 % del capital) → 3.615 / 3.600 / 3.590 M, sin recompras no anunciadas.
// Calibrado con FY2026: (6.415 × (49,3 − 16,3) % − 900) × 0,60 × 0,82 ÷ 3.650 = 16,4 centavos, frente a 16,2 publicados sin
// divisas [A2].
const VENTAS_FY26 = 6415;
const FIN = [900, 950, 1000], ACC = [3615, 3600, 3590];
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r3 = (x) => Math.round(x * 1000) / 1000;
const caso = (nombre) => {
  const c = S.casos.find((x) => x.escenario === nombre);
  const perfil = Object.fromEntries((c.perfil ?? []).map((p) => [p.periodo, p]));
  let v = VENTAS_FY26; const out = [];
  for (let i = 0; i < 3; i++) {
    const a = S.anios[i]; const p = perfil[a.periodo];
    const dg = p ? p.crecimiento_pp : c.ajuste_crecimiento_pp, dm = p ? p.margen_pp : c.ajuste_margen_pp;
    v *= 1 + (a.crecimiento_pct + dg) / 100;
    const ebit = v * (a.margen_ebitda_pct + dm - a.amortizacion_pct_ventas) / 100;
    out.push(r3((ebit - FIN[i]) * (1 - a.tasa_impositiva_pct / 100) * 0.82 / ACC[i]));
  }
  return out;
};
const base = caso('Base');
export const BPA = { FY2027: base[0], FY2028: base[1], FY2029: base[2], Bajista: caso('Bajista')[2], Base: base[2], Alcista: caso('Alcista')[2] };

// Historia del PER en la base SIN DIVISAS (la de nuestros casos). Cierres a 31 de marzo en peniques [D1] pasados a dólares con el
// GBPUSD de ese día [D2]. BPA sin divisas: FY2023 20,6; FY2024 18,3; FY2025 9,8; FY2026 16,2 centavos [A2, A6, A7]; FY2022
// ≈ 18,2 (BPA antes de excepcionales de 16,0 sin la pérdida de divisa: estimado) [A9].
const cierresP = { FY2021: 79.3, FY2022: 139.5, FY2023: 106.5, FY2024: 105.8, FY2025: 165.6, FY2026: 344.6 };
const fx = { FY2021: 1.3786, FY2022: 1.3147, FY2023: 1.2387, FY2024: 1.2617, FY2025: 1.2921, FY2026: 1.3243 };
const bpaH = { FY2022: 0.182, FY2023: 0.206, FY2024: 0.183, FY2025: 0.098, FY2026: 0.162, FY2027: BPA.FY2027 };
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const cierres = Object.fromEntries(Object.keys(cierresP).map((a) => [a, cierresP[a] / 100 * fx[a]]));
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaH[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaH[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 3.7451; // 280,6 peniques (cierre del 20-oct-2026) × 0,0133467 USD por penique [D1, D7]
// A 21-oct-2026 quedan 5,3 meses de FY2027 y entran 6,7 de FY2028.
export const BPA_NTM = r3(5.3 / 12 * BPA.FY2027 + 6.7 / 12 * BPA.FY2028);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2027: r1(PRECIO / BPA.FY2027), solo_fy2028: r1(PRECIO / BPA.FY2028),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const n2 = (x) => String(x).replace('.', ',');
const fmt = (l) => l.map(([a, p]) => `${a} ${n2(p)}x`).join('; ');
const c = (x) => n2(r1(x * 100)); // centavos

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'GBp', tipo_cambio: 0.0133467, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IFRS UK)', formato_cuenta: 'naturaleza',
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
  escenarios: { casos: S.casos.map((x) => ({ ...x, narrativa: T.narrativas?.[x.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    partes: [
      { segmento: 'Telefonía móvil, datos y otros (sin Airtel Money)', metrica: 'EBITDA FY2027e', valor_metrica: 2975, multiplo: 5.5, ev_directo: null, justificacion: 'EBITDA del grupo FY2027e (≈ 3.835 M) menos el de Airtel Money (≈ 860 M, 50 % de margen con ingresos +25 %) [A2, D10]. Múltiplo de 5,5 veces: el EV/EBITDA de 12 meses de MTN (4,9), Turkcell (5,7) y Vodacom (7,1), sin Bharti (India, 11,8) [D2].' },
      { segmento: 'Airtel Money (100 %, a precio de mercado)', metrica: 'Capitalización a 182,6 peniques', valor_metrica: 6580, multiplo: null, ev_directo: 6580, justificacion: '2.700 M de acciones × 182,6 peniques (20-oct) × 0,0133467 = 6.580 M USD; la caja propia de Airtel Money (depósitos de clientes) no se suma. El 22,15 % de terceros se resta en el puente como minoritario [D8, D9, D2].' },
    ],
    comentario: T.suma_partes_comentario ?? null,
    confianza: 'Media',
  },
  valoracion: {
    // Puente a 30-jun-2026 [A4]: préstamos 1.001 (largo) + 1.187 (corto) + 8 de costes de formalización + 41 de depósitos del banco
    // de pagos = 2.237; arrendamientos 4.369; caja 697 + 150 de depósitos a plazo + 20 de saldos restringidos = 867.
    // Minoritarios: 22,15 % de Airtel Money a mercado (598,05 M de acciones × 182,6 p × 0,0133467 ≈ 1.457 M) + minoritarios
    // contables del resto (≈ 340 M en FY2026, sin Airtel Money) = 1.797. La opción de venta de los minoritarios de Airtel Money
    // (515 M) no se suma: la salida a bolsa la deja sin objeto. otros_ajustes = recompras después de junio (≈ 62 M) + dividendo
    // final pagado el 24-jul (≈ 155 M) = 217. Asociadas: 6.
    puente: { fecha: '2026-06-30', deuda_financiera: 2237, arrendamientos: 4369, caja: 867, minoritarios: 1797, pensiones: 0, asociadas: 6, otros_ajustes: 217 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2029e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA SIN DIVISAS (la base que publica la empresa y la de nuestros casos): precio de cierre de cada ejercicio (31 de marzo, en peniques [D1], pasado a dólares con el GBPUSD de ese día) ÷ BPA sin divisas del ejercicio siguiente [A2, A6, A7, A8, A9] (FY2022 estimado: 18,2 centavos); para el cierre de FY2026 (344,6 peniques = 4,56 USD), ÷ nuestro FY2027e (${c(BPA.FY2027)} centavos). Serie: ${fmt(adel)}. Mediana y mínimo de los cierres FY2022-FY2026; media de FY2021-FY2026 (no hay más: salió a bolsa en junio de 2019). Sin exclusiones: el BPA sin divisas no tiene pérdidas; con el BPA publicado, FY2024 sería negativo (−4,4 centavos) por la naira. PER actual = precio (280,6 peniques = 3,7451 USD, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${c(BPA_NTM)} centavos = 5,3/12 de FY2027e ${c(BPA.FY2027)} + 6,7/12 de FY2028e ${c(BPA.FY2028)}). Con solo FY2027e sería ${n2(PER.solo_fy2027)}x y con solo FY2028e ${n2(PER.solo_fy2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA sin divisas del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2022-FY2026.` },
      },
      comparables_per: { mediana: 9.5 },
      consenso: { bpa_ano1: 0.249, bpa_ano2: 0.344, objetivo_medio: 5.3271, objetivo_min: 4.268, objetivo_max: 6.9129, analistas: 6, tendencia_3m: 'bajadas', fuente: 'Yahoo Finance, 21-oct-2026: BPA FY2027 de 24,9 centavos (2 analistas) y FY2028 de 34,4 (5); objetivo medio de 399,1 peniques (319,8-517,9) de 6 analistas, pasado a dólares [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Orange: análisis value del 20-oct-2026 (operador con filiales en África; referencia de WACC y comparables europeos)', editor: 'Repositorio de análisis (informes/orange-2026-10-20)', tipo: 'Analistas', fecha: '2026-10-20', url: 'informes/orange-2026-10-20/' },
  ],
  huecos: [],
};
