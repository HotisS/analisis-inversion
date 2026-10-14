# Diario · IDEXX Laboratories (IDXX) · 14-oct-2026

- Commit de partida: bed0cd4 (al retomar tras el corte por límite: 209014f). Sin commits propios (los hace el coordinador).
- Entorno: nube con red abierta. Cuentas del XBRL de la SEC (`cuentas.mjs --sec IDXX`), precio y bolsa con `bolsa.mjs` (cierre del 13-oct: la sesión del 14 no había cerrado), documentos con `descargar.mjs` (10-K 2025, 10-Q 2T26, notas de prensa 4T25-2T26, proxy 2026, 8-K de enero, febrero, marzo y mayo, presentación del Investor Day del 13-ago-2026), Form 4 con `form4.mjs`, FRED con curl, consenso de MarketScreener y Stock Analysis con WebFetch, sentimiento de Seeking Alpha (RSS), Stocktwits (API), TIKR y Wealth Awesome.
- Notas A-E y propio hechas por mí sin subagentes: `notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Tiempos: 18:27-18:55 UTC (corte por límite) y 19:53-20:15 UTC. Unos 50 minutos.

## Decisiones

- **Fallo de `cuentas.mjs` corregido a mano**: la deuda de la SEC (LongTermDebt) no incluye la línea de crédito (LinesOfCreditCurrent: 398 M en 2025, 250 M en 2022-2024, 289 M en 2019). Deuda 2025 = 848 M, no 450. Arrendamientos operativos (128 M) fuera de la deuda (US GAAP).
- Capex con los instrumentos cedidos en arrendamiento operativo (9,9-14,6 M en 2023-2025). No recurrentes: litigio de regalías 61,5 M en 2024 y reversión de 9 M en 2025.
- Cuenta de 2019-2025 (siete años; 2016-2018 con patrimonio negativo por recompras). Segmentos solo 2023-2025.
- WACC 10,57 % (bono 5,24 %, beta 1,0 entre la semanal de 2 años 0,85 y la ajustada de 5 años 1,15; la mensual de 5 años 1,56 recoge la burbuja). Etapa 2 de cinco años (ROIC 48,6 %). Terminal 3 %.
- Sostenibilidad «Sí»: reinversión del 7 % del NOPAT; prueba de cuota a mano (recurrente de diagnóstico 52 % del sector en 2025 → 55 % en 2031, ×1,06). `mercado_final` en null porque la cuota es de un segmento.
- Comparables: los seis de salud animal del análisis de Zoetis (7-oct) llevados al 13-oct con la variación de precio, más Thermo Fisher y Danaher del 14-oct. Elanco sin PER (contable de 77x por amortización de intangibles).
- PER histórico adelantado sin 2020-2021 (burbuja): mediana 43,2x, mínimo 31,6x, media larga 40,5x; actual 31,7x. v2 al cierre: 51,3 / 38,7 / 49,5.

## Resultado

- DCF 269,23 USD (−48,3 %); valor intrínseco 260,83 (−49,9 %); con la prima del mercado 311,95. DCF inverso: 19,0 % de crecimiento anual 2027-2032 (base 7,9 %) o rentabilidad implícita del 7,1 %.
- ROIC 48,6 % − WACC 10,57 % = 38 puntos. Calidad: Sí. Sostenibilidad: Sí.
- **Línea 12 m**: selector → v3 ×1,1. Objetivo 641,39 USD; ponderada **+23,3 %**, base **+22,3 %**; v2 +15,0 % / +11,1 %. **Mantener**, convicción media (la regla de 12 meses daría Comprar, pero el valor intrínseco está un 50 % bajo el precio). Comprar < 260,83; vender > 712,66. Detalle en revision-12m-2026-10-14.md.
- Robustez: SÓLIDA; acción robusta «No mantener» (V1: valor intrínseco un 50 % bajo el precio). No está en cartera.
- Word y PDF: 18 de 20 controles y 2 explicados (regresión y comparables frágiles). 36 fuentes.
- Próximos resultados: 3T26 el 3-nov-2026 (fecha de Estimize; la empresa no la había confirmado en lo leído).
- Ficha sectorial: `sectores/salud-animal-2026-10-14.md` y `-comparables.json`.

## Lecciones

- `cuentas.mjs --sec` en empresas que se financian con la línea de crédito (IDEXX): la deuda sale sin `LinesOfCreditCurrent`; sumarlo siempre que exista ese concepto.
- En compounders de EE. UU. con el bono al 5,2 %, la regla de 12 meses (v3) y el filtro de valor real (DCF) dan señales opuestas (+23 % frente a −50 %); la señal la decide el filtro y la acción robusta sale «No mantener». Merece revisar si el filtro de valor real debe usar el WACC relativo (prima implícita) para estas empresas: con él el valor sube a 311,95, todavía −40 %.
