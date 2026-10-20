// Supuestos del DCF, escenarios y pesos de Grand Canyon Education (corte 2026-10-20). Ejercicio a 31 de diciembre.
// Millones de USD. 2026e es el año en curso (dos trimestres publicados y guía anual de ingresos y margen): fijo.
// Margen EBITDA = resultado operativo GAAP sin partidas no recurrentes (acuerdos judiciales, deterioros) + amortizaciones
// totales (incluidos los intangibles de Orbis, 8,4 M al año). Los pagos en acciones (13,6 M en 2025) SÍ son coste, al
// contrario que en el EBITDA ajustado de la empresa (368,6 M en 2025 = 33,3 %); el nuestro de 2025 es 344,1 M (31,1 %).
// 2026e: guía de ingresos 1.165,3-1.172,3 M y margen operativo GAAP del 28,0-28,2 % [A3] + amortización ≈ 3,6 % = 31,7 %.
const g = [5.7, 5.5, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const m = [31.7, 32.0, 32.4, 32.7, 33.0, 33.0, 33.0, 33.0];
// Amortización total 3,6 % de las ventas (39,6 M en 2025, con 8,4 de Orbis). Capex 3,5 % (34,8 M en 2025 = 3,1 %, más
// sedes híbridas: 3-5 nuevas en 2027 y la facultad de Derecho) y 3,6 % el último año para que no quede por debajo de la amortización.
const am = [3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6];
const cx = [3.3, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.6];
// Circulante: clientes (84 M, casi todo GCU) − proveedores (24 M) = 5,4 % de las ventas, pero con los demás pasivos corrientes
// (cobros anticipados, nóminas) el circulante operativo es ≈ −1 % [A1]. Usamos el 5,4 % del motor (clientes − proveedores): prudente.
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 5.4, tasa_impositiva_pct: 23.5, fijo: i === 0,
}));
export default {
  anios,
  // Prima adicional de 1 punto: un solo cliente da el 89 % de los ingresos y el 100 % del negocio depende de las ayudas
  // federales al estudio (Title IV) que cobran los socios; la beta de mercado (0,77 ajustada) no recoge ese riesgo binario.
  wacc: { tasa_libre_pct: 5.15, beta: 0.77, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 23.5, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  // Ingresos = alumnos de los socios × ingreso por alumno. Volumen = matrículas (GCU y otros socios); precio = matrícula por
  // crédito (GCU la tiene congelada en el campus desde 2008, en línea sube poco) y mezcla.
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.5, precio_pct: 0.5, otros_pct: -1.3 },
    { periodo: '2027e', volumen_pct: 5.5, precio_pct: 0.5, otros_pct: -0.5 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: 0.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
