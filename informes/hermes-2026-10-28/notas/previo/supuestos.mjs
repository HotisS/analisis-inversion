// Supuestos del DCF y de los escenarios (Hermès, corte 2026-10-22; 2026e y 2027e rebajados tras el 3T26: 9M +2,9 % publicado, +5,5 % a tipos constantes, 3T +4,3 %, Asia sin Japón 0,0 %). Millones de EUR; ejercicio natural.
// Base: 2025 real (ingresos 16.002 M; EBITDA 7.368 M = EBIT 6.569 + amortizaciones 799, incluidas las de derechos de uso).
// 2026e: 1S26 publicado (+1,6 % publicado, +6,1 % a tipos constantes; divisas −360 M). Consenso 16.709 M (+4,4 %).
// Capex = inversiones operativas (7,3 % de las ventas en 2025) + altas de derechos de uso ≈ pagos de arrendamientos (2,1 %),
// porque los arrendamientos van en la deuda (NIIF 16). Amortización = inmovilizado + derechos de uso (5,0 %).
// Circulante comercial (existencias + clientes − proveedores) 13,8 % en 2025.
// Impuestos: 33,4 % en 2025 y 35,4 % en 1S26 con la contribución excepcional francesa; 28,7 % en 2024 sin ella.

export const modelo = [
  //  periodo   crec  margen amort capex  nwc   tasa  fijo
  ['2026e', 3.0, 45.3, 5.1, 8.5, 14.0, 34.0, true],
  ['2027e', 7.0, 45.5, 5.1, 8.5, 14.0, 28.5, false],
  ['2028e', 7.5, 45.8, 5.2, 8.2, 14.0, 28.5, false],
  ['2029e', 7.5, 46.0, 5.2, 7.8, 14.0, 28.5, false],
  ['2030e', 7.5, 46.0, 5.3, 7.4, 14.0, 28.5, false],
  ['2031e', 7.0, 46.0, 5.3, 7.0, 14.0, 28.5, false],
  ['2032e', 6.5, 46.0, 5.4, 6.6, 14.0, 28.5, false],
  ['2033e', 6.0, 46.0, 5.4, 6.2, 14.0, 28.5, false],
  ['2034e', 5.5, 46.0, 5.5, 5.9, 14.0, 28.5, false],
  ['2035e', 5.0, 46.0, 5.5, 5.6, 14.0, 28.5, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Bund a 10 años del 21-oct-2026 (3,47 %) [D]. Beta 1,20: ajustada semanal a 5 años frente al CAC 40 (la mensual da 1,44, inflada por la caída de 2025-2026).
// Deuda: solo arrendamientos (2.279 M) frente a 134.650 M de capitalización (1,7 %); coste 2,4 % (intereses de arrendamientos sobre el pasivo).
export const wacc = { tasa_libre_pct: 3.47, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 2.4, tasa_impositiva_pct: 28.5, peso_deuda_pct: 1.7 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: el frenazo de 2025-2026 se hace permanente (China no vuelve, fatiga de precio en marroquinería, como Gucci o LVMH Moda): crecimiento 3,5 puntos menor y 3 puntos menos de margen.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: Hermès vuelve al ritmo de 2015-2025 (≈ 10-12 % a tipos constantes) con China recuperada y capacidad nueva de marroquinería.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 };

// BPA de 2026e-2028e para el objetivo a 12 meses: EBIT (EBITDA − amortizaciones) + resultado financiero ≈ 207 M (2025),
// impuestos del año, minoritarios −36 M, asociadas +48 M; 104,95 M de acciones diluidas [D]. Calibrado: 2025 da 43,1 (real 43,07).
const V25 = 16002, ACC = 104.95, FIN = 207, MINOR = -36, ASOC = 48;
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = V25;
  return anios.slice(0, 3).map((f, i) => {
    const per = (caso?.perfil ?? []).find((p) => p.periodo === f.periodo);
    const dg = i === 0 ? 0 : (per ? per.crecimiento_pp : (caso?.ajuste_crecimiento_pp ?? 0));
    const dm = i === 0 ? 0 : (per ? per.margen_pp : (caso?.ajuste_margen_pp ?? 0));
    v *= 1 + (f.crecimiento_pct + dg) / 100;
    const ebit = v * (f.margen_ebitda_pct + dm - f.amortizacion_pct_ventas) / 100;
    const neto = (ebit + FIN) * (1 - f.tasa_impositiva_pct / 100) + MINOR + ASOC;
    return { periodo: f.periodo, ventas: red(v, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / ACC, 2) };
  });
}
if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); } }
