// Comparables y transacciones (Medpace, corte 2026-10-21, precios de cierre del 21-oct-2026; antes, corte 2026-10-12 con cierres del 9-oct).
// Base: las cifras de cada comparable que el análisis de ICON (corte 2026-10-09) tomó de MarketScreener, Yahoo Finance y
// Stock Analysis a 8-oct-2026 [P1-P4], llevadas al cierre del 21-oct con la variación de precio de cada acción [P5]:
// capitalización × (p9/p8); valor empresa = capitalización + deuda neta (sin cambios); múltiplos de valor empresa
// escalados por EV nuevo / EV anterior; PER por p9/p8; rentabilidad por FCF por p8/p9. ICON entra con su EBITDA ajustado
// de MarketScreener (misma base que los demás) y su puente a 30-jun-2026 [P6, P7].

const cierres = { // [P5] Yahoo Finance, cierres del 8 y 21 de octubre de 2026 (estimaciones sin cambios: ninguno publicó el 3T26 antes del 21-oct;
  // Charles River reafirmó su guía 2026 en el día del inversor del 20-oct, sin cifras nuevas para 2027)
  IQV: [258.88, 276.63], CRL: [298.0, 344.87], FTRE: [20.37, 24.06], TMO: [651.98, 694.02], LH: [314.2, 323.75], ICLR: [164.5, 185.25],
};

// A 8-oct-2026 (base del análisis de ICON)
const base = [
  { nombre: 'IQVIA', ticker: 'IQV', pais: 'US', capitalizacion: 42612, ev_ventas: 3.34, ev_ebitda_ltm: 14.5, ev_ebitda_ntm: 13.4, per_ntm: 18.4, crecimiento_pct: 5.8, margen_ebitda_pct: 23.2, roic_pct: 9.8, dn_ebitda: 3.62, fcf_yield_pct: 5.13 },
  { nombre: 'ICON', ticker: 'ICLR', pais: 'IE', capitalizacion: 12778, ev_ventas: 1.83, ev_ebitda_ltm: 11.2, ev_ebitda_ntm: 10.9, per_ntm: 14.3, crecimiento_pct: 0.9, margen_ebitda_pct: 18.6, roic_pct: 0.7, dn_ebitda: 1.83, fcf_yield_pct: 8.1 },
  { nombre: 'Charles River Laboratories', ticker: 'CRL', pais: 'US', capitalizacion: 14226, ev_ventas: 4.27, ev_ebitda_ltm: 18.6, ev_ebitda_ntm: 15.7, per_ntm: 23.9, crecimiento_pct: -0.1, margen_ebitda_pct: 24.2, roic_pct: 8.56, dn_ebitda: 3.1, fcf_yield_pct: 2.61 },
  { nombre: 'Fortrea', ticker: 'FTRE', pais: 'US', capitalizacion: 1937, ev_ventas: 1.08, ev_ebitda_ltm: 13.7, ev_ebitda_ntm: 12.2, per_ntm: 18.9, crecimiento_pct: 1.6, margen_ebitda_pct: 7.0, roic_pct: 1.74, dn_ebitda: 4.51, fcf_yield_pct: 10.12 },
  { nombre: 'Thermo Fisher Scientific', ticker: 'TMO', pais: 'US', capitalizacion: 241068, ev_ventas: 6.03, ev_ebitda_ltm: 23.8, ev_ebitda_ntm: 21.1, per_ntm: 24.1, crecimiento_pct: 5.9, margen_ebitda_pct: 25.0, roic_pct: 8.84, dn_ebitda: 3.27, fcf_yield_pct: 3.04 },
  { nombre: 'Labcorp', ticker: 'LH', pais: 'US', capitalizacion: 25482, ev_ventas: 2.24, ev_ebitda_ltm: 12.9, ev_ebitda_ntm: 12.0, per_ntm: 16.1, crecimiento_pct: 5.3, margen_ebitda_pct: 17.2, roic_pct: 8.67, dn_ebitda: 2.67, fcf_yield_pct: 4.53 },
];

const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
export const empresas = base.map((e) => {
  const [p8, p9] = cierres[e.ticker];
  const f = p9 / p8;
  const ev = e.capitalizacion / (1 - e.dn_ebitda / e.ev_ebitda_ltm); // EV = cap + DN, con DN = dn_ebitda × EV / múltiplo LTM
  const cap = e.capitalizacion * f;
  const evN = ev + (cap - e.capitalizacion);
  const g = evN / ev;
  return {
    ...e,
    capitalizacion: Math.round(cap),
    ev_ventas: r2(e.ev_ventas * g), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * g), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * g),
    per_ntm: r1(e.per_ntm * f), fcf_yield_pct: r2(e.fcf_yield_pct / f),
  };
});

export const transacciones = [
  { fecha: '2025-10', objetivo: 'Clario (datos y tecnología de ensayos clínicos)', comprador: 'Thermo Fisher Scientific', ev: 8875, ev_ventas: 7.1, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '8.875 M USD en caja al cierre, más 125 M aplazados y hasta 400 M condicionados, por unos ingresos esperados de 1.250 M USD en 2025; no se publicó el EBITDA [P8].' },
  { fecha: '2023-05', objetivo: 'Syneos Health', comprador: 'Elliott, Patient Square Capital y Veritas Capital', ev: 7100, ev_ventas: null, ev_ebitda: 9.7, prima_pct: 24, excluir: false, comentario: '43,00 USD por acción en efectivo, un 24 % sobre el cierre del 13-feb-2023; unos 7.100 M USD con la deuda; múltiplo sobre el EBITDA ajustado previsto para 2023 (731 M USD) [P9].' },
  { fecha: '2021-12', objetivo: 'Clinigen Group', comprador: 'Triton', ev: null, ev_ventas: null, ev_ebitda: 13.3, prima_pct: null, excluir: false, comentario: 'Servicios farmacéuticos (suministro para ensayos). Múltiplo sobre el EBITDA ajustado de los últimos doce meses, del análisis de operaciones de BofA Securities en el proxy de Syneos [P9].' },
  { fecha: '2021-05', objetivo: 'UDG Healthcare', comprador: 'Clayton Dubilier & Rice', ev: null, ev_ventas: null, ev_ebitda: 17.6, prima_pct: null, excluir: false, comentario: 'Servicios de comercialización y comunicación para la industria farmacéutica; EBITDA ajustado de los últimos doce meses [P9].' },
  { fecha: '2021-04', objetivo: 'PPD', comprador: 'Thermo Fisher Scientific', ev: null, ev_ventas: null, ev_ebitda: 23.4, prima_pct: 23.8, excluir: false, comentario: '47,50 USD por acción en efectivo, un 23,8 % sobre el cierre previo a la filtración; EBITDA ajustado de los últimos doce meses [P10, P9].' },
  { fecha: '2021-02', objetivo: 'PRA Health Sciences', comprador: 'ICON', ev: 12000, ev_ventas: null, ev_ebitda: 24.4, prima_pct: 30, excluir: false, comentario: '80 USD en efectivo y 0,4125 acciones de ICON por acción, unos 12.000 M USD; prima del 30 % sobre el cierre del 23-feb-2021; EBITDA ajustado de los últimos doce meses [P11, P9].' },
  { fecha: '2020-03', objetivo: 'Huntsworth', comprador: 'Clayton Dubilier & Rice', ev: null, ev_ventas: null, ev_ebitda: 10.4, prima_pct: null, excluir: false, comentario: 'Comunicación médica e investigación clínica (Huntsworth Health); EBITDA ajustado de los últimos doce meses [P9].' },
];

if (process.argv[1] && process.argv[1].endsWith('comparables.mjs')) console.table(empresas);
