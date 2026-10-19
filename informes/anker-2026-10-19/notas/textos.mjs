// Textos del analista (Anker Innovations, corte 2026-10-19). Citas con la letra de la nota ([A9] = fuente 9 de A.json).
// Las cifras del motor (DCF, escenarios, objetivo a 12 meses, controles) van sin cita y se comprueban tras el último cálculo.
let F = {};
try { F = (await import(`./textos-final.mjs?t=${Date.now()}`)).default; } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(e.code || e.message)) console.error('textos-final.mjs:', e.message); }

const objetivo_12m = {
  ejercicio: '2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 5.07, multiplo: null, precio: null, justificacion: 'Arancel nuevo en EE. UU. tras el 10-nov-2026 y presión de Amazon y de la competencia china: ventas de 2027e +14 % y 2028e +9 % (48.155 M) con margen EBITDA del 8,0 %: EBITDA de 3.852 M, amortización de 385 M, resultado financiero de +250 M, impuestos del 16 % y minoritarios del 2,5 %: beneficio ≈ 3.044 M sobre 599,9 M de acciones diluidas.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 7.13, multiplo: null, precio: null, justificacion: 'Ventas de 53.480 M (+20 % en 2027e y +15 % en 2028e) y margen EBITDA del 10,0 %: EBITDA de 5.348 M, amortización de 428 M, resultado financiero de +300 M (≈ 11.000 M de caja e inversiones tras Hong Kong), impuestos del 16 % (Pilar Dos) y minoritarios del 2,5 %: beneficio ≈ 4.275 M sobre 599,9 M de acciones (con las H y el convertible). Cuadra con 2025: EBIT de 2.560 M + 363 M financieros − 305 M de impuestos − 72 M de minoritarios = 2.545 M.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 8.57, multiplo: null, precio: null, justificacion: 'El almacenamiento de consumo y el audio con IA tiran más y los aranceles bajan: ventas de 58.130 M (+25 % y +20 %) con margen EBITDA del 11 %: beneficio ≈ 5.143 M, todavía un 4 % por debajo del consenso de 2028e (8,90 CNY).' },
  ],
  per_historico: {
    base: 'adelantado', actual: 18.68, mediana_5a: 19.13, minimo_5a: 14.95, media_larga: 21.68,
    excluidos: 'Historia adelantada (precio de cierre de cada año ÷ BPA diluido real del año siguiente, ajustado por la ampliación de 3 por 10 de 2024): 2020 126,35 ÷ 1,86 = 67,9 (fuera: año de la salida a bolsa en plena euforia del ChiNext); 2021 78,85 ÷ 2,16 = 36,4; 2022 45,59 ÷ 3,05 = 15,0; 2023 68,15 ÷ 3,97 = 17,2; 2024 97,64 ÷ 4,72 = 20,7; 2025 114,39 ÷ 5,98 (nuestro BPA de 2026e, con la devolución de aranceles) = 19,1. Mediana 19,1, mínimo 15,0 y media 21,7 (2021-2025). PER actual: 110,40 ÷ 5,91 (nuestro BPA de 2027e) = 18,7.',
    v2: { mediana_5a: 24.25, minimo_5a: 21.07, media_larga: 26.92, excluidos: 'Al cierre (precio ÷ BPA del mismo año): 2021 42,4; 2022 21,1; 2023 22,3; 2024 24,6; 2025 24,2 (2020, año de la salida a bolsa, fuera).' },
  },
  comparables_per: { mediana: 17.2 },
  consenso: { bpa_ano1: 6.24, bpa_ano2: 7.43, objetivo_medio: 150.79, objetivo_min: null, objetivo_max: null, analistas: 9, tendencia_3m: 'subidas', fuente: 'Media de seis casas tras el 1S26 (Eastmoney) y Yahoo (9 analistas: 6,10 y 7,29 frente a 5,79 y 7,01 hace 90 días; objetivo medio 150,79 CNY), 19-oct-2026 [D3, D8]' },
  diferencia_consenso: F.diferencia_consenso ?? null,
  media: null,
  comentario: F.objetivo_comentario ?? null,
};

export default {
  objetivo_12m,
  ...F,
};
