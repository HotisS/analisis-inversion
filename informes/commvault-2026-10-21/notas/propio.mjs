// Parte del analista (Commvault, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA DE LA REGLA A 12 MESES: BPA «GAAP limpio», con la remuneración en acciones como gasto (la empresa la excluye de su
// BPA no GAAP y el consenso también: 5,46 USD en FY2027e frente a ≈ 2,7 en nuestra base; la diferencia, ≈ 2,4 USD por
// acción, es sobre todo la remuneración en acciones después de impuestos). Definición:
//   (resultado operativo GAAP + amortización de intangibles comprados + deterioros y ajustes de compras − nada por la
//    reestructuración, que se repite todos los años) + intereses netos, × (1 − 24 %) ÷ acciones diluidas.
// Con la proyección del DCF: resultado operativo limpio = ventas × (margen EBITDA del DCF − 0,8 % de depreciación).
// Calibrado con FY2026 real (antes de impuestos 98,2 M → 1,67 USD con 44,6 M de acciones) y con la guía de FY2027
// (ventas 1.300-1.310, margen no GAAP ≈ 21 %, remuneración en acciones ≈ 142 M, 42 M de acciones [D11]).
// Intereses netos ≈ +24-25 M: ≈ 930 M de caja al ≈ 4 % menos la amortización de los gastos del convertible al 0 %.
// Acciones: 42,0 M en FY2027e y FY2028e (guía de 42 M; las recompras del ≈ 60 % del flujo libre solo compensan la dilución).
const VENTAS_FY26 = 1183.7, ACC = 42.0, IMP = 0.24;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const bpa = (v, margenDcf, interes, acc) => r2(((v * (margenDcf - 0.8) / 100 + interes) * (1 - IMP)) / acc);
const v27 = VENTAS_FY26 * (1 + S.anios[0].crecimiento_pct / 100);
const caso = (dg, dm) => bpa(v27 * (1 + (S.anios[1].crecimiento_pct + dg) / 100), S.anios[1].margen_ebitda_pct + dm, 25, ACC);
const bpa27 = bpa(v27, S.anios[0].margen_ebitda_pct, 24, ACC);
export const BPA = { FY2027: bpa27, Bajista: caso(-3.0, -3.0), Base: caso(0, 0), Alcista: caso(2.0, 2.0) };
BPA.FY2028 = BPA.Base;

// Historia del PER en la MISMA base (BPA limpio con la remuneración en acciones como gasto) [A1, A6]: FY2022 0,70; FY2023 0,67;
// FY2024 1,43; FY2025 1,51; FY2026 1,67 USD; FY2020-FY2021 pérdidas. Cierres a 31 de marzo [D1].
const cierres = { FY2021: 64.50, FY2022: 66.35, FY2023: 56.74, FY2024: 101.43, FY2025: 157.76, FY2026: 77.89 };
const bpaH = { FY2022: 0.70, FY2023: 0.67, FY2024: 1.43, FY2025: 1.51, FY2026: 1.67, FY2027: BPA.FY2027 };
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaH[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaH[a]).map((a) => [a, r1(cierres[a] / bpaH[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 155.85;
// A 21-oct-2026 quedan 5,3 meses de FY2027 y entran 6,7 de FY2028.
export const BPA_NTM = r2(5.3 / 12 * BPA.FY2027 + 6.7 / 12 * BPA.FY2028);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2027: r1(PRECIO / BPA.FY2027), solo_fy2028: r1(PRECIO / BPA.FY2028),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
if (process.argv[1]?.endsWith('propio.mjs')) console.log({ BPA, BPA_NTM, PER: { ...PER, adel: fmt(PER.adel), v2: fmt(PER.v2.alCierre) } });

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Commvault es un solo negocio (protección y recuperación de datos) que vende el mismo software con tres modelos de entrega (licencia a plazo, suscripción gestionada por el cliente y SaaS) y una base de mantenimiento de licencias perpetuas que se va consumiendo; no publica segmentos con resultado [A1].', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-jun-2026 [A5]: deuda = principal del convertible al 0 % de 2030 (900 M; precio de conversión 236,88 USD, muy
    // por encima del precio, con compra de opciones que lo lleva a 357,56); caja e inversiones a corto 929,8; participación en un
    // fondo de capital privado 13,5 (asociadas). Arrendamientos operativos fuera (US GAAP). Sin minoritarios ni pensiones.
    puente: { fecha: '2026-06-30', deuda_financiera: 900, arrendamientos: 0, caja: 929.8, minoritarios: 0, pensiones: 0, asociadas: 13.5, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA LIMPIO con la remuneración en acciones como gasto (la misma base que nuestros casos; no la del consenso, que la excluye): cierre de cada ejercicio (31 de marzo, Yahoo [D1]) ÷ BPA limpio real del ejercicio siguiente [A1, A6]; para el cierre de FY2026 (77,89), ÷ nuestro FY2027e (${n2(bpa27)}). Serie: ${fmt(adel)}. Mediana y mínimo de FY2022-FY2026; media de FY2021-FY2026. Excluidos FY2019 y FY2020: el BPA del ejercicio siguiente fue pérdida (FY2020-FY2021, reestructuración y paso a suscripción). Los PER de 90-100 veces de FY2021, FY2022 y FY2025 son de años con el beneficio deprimido por la transición; sin ellos la mediana sería ≈ 40-67 y la regla daría menos. PER actual = precio (155,85 USD, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 5,3/12 de FY2027e ${n2(bpa27)} + 6,7/12 de FY2028e ${n2(BPA.FY2028)}). Con solo FY2027e sería ${n2(PER.solo_fy2027)}x y con solo FY2028e ${n2(PER.solo_fy2028)}x. En la base del consenso (no GAAP) el PER es 28,5x FY2027e.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA limpio del mismo ejercicio): ${fmt(PER.v2.alCierre)}. FY2021 excluido (pérdida).` },
      },
      // Mediana de comparables con la remuneración en acciones como gasto (NTAP, NTNX, CHKP, QLYS, FFIV, DBX, TENB, AKAM, GEN; Rubrik sin beneficio) [D2]; sin ella, 17,8.
      comparables_per: { mediana: 21.9 },
      consenso: { bpa_ano1: 5.46, bpa_ano2: 6.20, objetivo_medio: 163.49, objetivo_min: 130, objetivo_max: 200, analistas: 17, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 21-oct-2026: BPA no GAAP (sin remuneración en acciones) FY2027 de 5,46 USD (19 analistas; 5,22 hace 90 días) y FY2028 de 6,20 (6,02 hace 90 días); objetivo medio de 17 analistas [D2]' },
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
    { id: 1, titulo: 'Ficha sectorial de software (14-oct-2026): excluye ciberseguridad e infraestructura; sin ficha propia de protección de datos', editor: 'Repositorio de análisis (sectores/software-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/software-2026-10-14.md' },
    { id: 2, titulo: 'Cálculo propio del BPA limpio (remuneración en acciones como gasto) y del PER histórico a partir del XBRL de la SEC y de los cierres de Yahoo', editor: 'Elaboración propia (notas/propio.mjs)', tipo: 'Propio', fecha: '2026-10-21', url: null },
  ],
  huecos: [],
};
