# Diario · EMCOR (EME) · 15-oct-2026

- Commit de partida: 30aee4a. Encargo del coordinador (megatendencia: frío industrial, electricidad y sistemas para naves y centros de datos). Sin commits, pull ni push; nada escrito fuera de la carpeta.
- Entorno: nube de Claude Code, sin subagentes (notas A-E y propio hechas por mí: `notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`; `comparables-yahoo.mjs` baja los comparables).
- Fuentes: XBRL de la SEC (`cuentas.mjs --sec EME` y companyfacts), 10-K 2025, 10-Q 2T26, notas de prensa 3T25-2T26 y de febrero 2023-2026 (guía inicial), proxy 2026, 8-K de la junta, Form 4 (`form4.mjs`), transcripción del 2T26 (Motley Fool vía Webull), Stock Analysis (objetivos), Yahoo (consenso y comparables), FRED (DGS10 5,21 %; TLNRESCONS), BCE, RSS de Seeking Alpha.
- Fecha de corte 2026-10-15; precio 745,35 USD (cierre del 14-oct; la sesión del 15-oct no había cerrado: ≈721,58 a media sesión). USD, ejercicio natural, US GAAP.
- Decisiones: amortizaciones = depreciación + amortización de intangibles (el XBRL de 2016-2023 solo traía la depreciación); no recurrentes 2017, 2020, 2023 y 2025 (plusvalía del Reino Unido neta de costes, −124,8); arrendamientos operativos fuera de la deuda; recompras con retenciones fiscales; puente con la caja de junio (924,4) menos ≈750 M de las cinco compras eléctricas del 3T26 (sus ingresos, en otros_pct). WACC 11,26 % (beta 1,1). Pesos DCF 50 / comparables 20 / escenarios 30. Margen EBITDA 10,7 % en 2026-2028 y bajando hasta 9,2 % en 2033. Sostenibilidad «Sí» (motor y analista).
- Resultado: DCF 470,97; valor intrínseco 500,68 (−32,8 %); DCF inverso 18,6 % anual; con la prima del mercado, 569,16. ROIC 56,4 % frente a WACC 11,26 % (calidad Sí). Altman 6,95, Piotroski 7, Beneish −2,26.
- **Línea 12 m (v3, selector sin marcas)**: objetivo 655,40 USD, ponderada −11,9 %, base +0,5 % → **Vender** (no comprar), convicción media (motor sugiere alta; v2 da Mantener −7,1 %). Robustez SÓLIDA, acción robusta «No mantener»; límite de compra 500,68 USD; BPA −10 %: −20,7 % / −9,5 %. Detalle en revision-12m-2026-10-15.md.
- Regla 13: veredicto «no cambia» (caída del 22 % desde mayo por múltiplo y rotación fuera de la IA; sin hechos pendientes ajenos; resultados el 29-oct, que no retrasan).
- **Confianza de los datos: media.** Faltan: consenso de 2028 y de EBITDA, segmentos 2021-2022, tamaño del mercado MEP (estimado), fechas de cada venta de directivos, ESG, posición corta.
- Word y PDF (soffice): 21 de 21 controles; cobertura 88 %; 43 páginas.
- Tiempo: ≈16:50-17:15 UTC del reloj del equipo (≈45-50 minutos de trabajo).

## Lecciones (para que las integre quien encarga)

- `cuentas.mjs --sec` en EMCOR: `DepreciationDepletionAndAmortization` de 2016-2023 es solo la depreciación; la amortización de intangibles va en `AmortizationOfIntangibleAssets` (40-67 M al año). Sumarla o el EBITDA de esos años sale bajo frente a 2024-2025.
- MarketScreener con WebFetch devolvió la página de otra empresa (Bill Barrett) para la URL de EMCOR: comprobar el nombre en la respuesta. Yahoo `earningsTrend` (vía `herramientas/yahoo.mjs` → `json`) da consenso de BPA e ingresos de dos ejercicios para la empresa y los comparables en una llamada.
- `robustez.mjs --actual` no tiene precio de una empresa nueva hasta que esté en `simbolos.json`/`precios.json` (aviso D3): el precio de la sesión hay que darlo a mano con `movimiento.mjs`.
- Contratistas con márgenes en máximos de ciclo: la v3 pone el bajista en el mínimo histórico del PER adelantado, que en EMCOR (10,0x en 2023) coincide con un salto del BPA del 62 % que el mercado no anticipó; `robustez.mjs` lo marca como M4 (doble castigo) y con la variante sin doble castigo la ponderada pasa de −11,9 % a −7,1 %.
