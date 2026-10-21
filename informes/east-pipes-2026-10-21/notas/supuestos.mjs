// Supuestos del DCF, escenarios y pesos de East Pipes (1321.SR, corte 2026-10-21). SAR, ejercicio a 31 de marzo (etiqueta «fin»).
// FY2027e: 1S publicado (865,5 M, −9,5 %; 2T27 −39,6 % por la bobina retrasada) + 2S ≈ 1.100 M (3T ≈ 480 M con la logística
// todavía desviada y 4T ≈ 620 M con el arranque del contrato de Aramco de 771 M con IVA) ⇒ ≈ 1.965 M (−14,5 %).
// FY2028e: +12 % (Aramco hasta el 1T FY2028, agua y gas) y después el ciclo se normaliza: el margen EBITDA (sin intereses de la caja)
// baja del 27,9 % de FY2026 (máximo histórico) y del ≈ 25 % del 1S FY2027 hacia el 20,5 % de mitad de ciclo (FY2021 ≈ 26 %,
// FY2022 6,5 %, FY2023 11,2 %, FY2024 22,9 %, FY2025 25,2 %). Capex alto en FY2027-28 (revestimiento y manipulación, 33,6 M).
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('FY2027e', -14.5, 25.0, 1.2, 2.5, 8.0, 33.0),
    a('FY2028e', 12.0, 24.0, 1.3, 2.5, 8.0, 33.0),
    a('FY2029e', 3.0, 23.0, 1.3, 1.8, 8.0, 33.0),
    a('FY2030e', 0.0, 22.0, 1.3, 1.6, 8.0, 33.0),
    a('FY2031e', 1.5, 21.0, 1.3, 1.5, 8.0, 33.0),
    a('FY2032e', 3.0, 20.5, 1.3, 1.5, 8.0, 33.0),
    a('FY2033e', 3.0, 20.5, 1.3, 1.5, 8.0, 33.0),
  ],
  // Tasa libre en USD (SAR anclado a 3,75): Treasury a 10 años 5,15 % (FRED, 19-oct-2026) + diferencial soberano saudí 0,51 % = 5,66 %.
  // Beta 1,10 (mensual de 5 años 1,32; semanal de 2 años 1,18; semanal de 5 años 0,85; sin deuda). Prima de país 0,78 % (Damodaran).
  wacc: { tasa_libre_pct: 5.66, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0.78, coste_deuda_pct: 5.5, tasa_impositiva_pct: 8.0, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -7.0, ajuste_margen_pp: -6.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: 'FY2027e', crecimiento_pp: -4.0, margen_pp: -2.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: 'FY2027e', crecimiento_pp: 3.0, margen_pp: 1.0 }] },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: -17.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 11.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 3.0, precio_pct: 0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 1.0, precio_pct: -1.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 1.5, precio_pct: 0, otros_pct: 0 },
  ],
  // Mercado de tubo de acero de Arabia Saudí en 2030 (P&S: USD 3.413,1 M × 3,751) [B1]; cuota de hoy ≈ 23,8 %.
  mercado_final: { periodo: 'FY2030e', tamano: 12803 },
};
