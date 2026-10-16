# Diario · TMX Group (X.TO) · 16-oct-2026

- Commit de partida: 0f09d25. Prompt y regla de múltiplos (v3 con tope ×1,1 y selector) sin cambios durante el análisis.
- Entorno: nube de Claude Code. Sin subagentes: notas A-E escritas por `notas/construir-notas.mjs`; parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Fecha de corte 2026-10-16; divisa CAD; ejercicio natural; NIIF. Precio 54,31 CAD, cierre del 15-oct (`bolsa.mjs`; la sesión del 16 seguía abierta).
- Fuentes de núcleo: informes anuales 2024 y 2025 y MD&A (PDF directos de s21.q4cdn.com: la web de inversores da 403), notas de resultados del 4T21, 4T22 y 2T26, estados intermedios a 30-jun-2026, circular de 2026, notas de RAFI, Cboe y fecha del 3T26, consenso de Zonebourse y MarketBeat, bono canadiense a 10 años (3,85 %), ficha sectorial de bolsas.
- Decisiones:
  - Cifras de la cuenta **publicadas**; BPA **ajustado** (sin amortización de intangibles de compras) solo para la historia del PER y el objetivo a 12 meses, como en LSEG.
  - Balance sin los saldos de compensación de CDCC y CDS ni los fondos de participantes.
  - DCF: margen EBITDA = ajustado − 1 punto (costes de compras que se repiten); amortización 3,6 % sin PPA; capex 5,0 %. WACC 7,52 % (beta 0,80: la mensual frente al XIC sale 0,08 y la semanal 0,41, sin sentido para una bolsa).
  - Puente a 30-jun-2026: minoritarios de BOX a valor de mercado estimado (880 M) en vez de 222 M contables; caja sin los ≈ 240 M retenidos por regulación; RAFI y Cboe pagados después del balance (1.093 M) en `otros_ajustes`, con su EBITDA en la proyección. MEMX fuera del caso base (cierre 2S27).
- Resultado: DCF 68,30 CAD (+25,8 %); valor intrínseco 64,26 (+18,3 %); DCF inverso 4,0 % de crecimiento 2027-2032 frente al 7,8 % del base; con la prima del mercado 87,14. ROIC 9,1 % frente a WACC 7,52 % (+1,58 puntos). Sostenibilidad «Sí» (motor y analista). 17 de 19 controles y 2 explicados (regresión; crecimiento del BPA por la base ajustada). Cobertura 87 %.
- **Línea 12 m (v3)**: objetivo 59,52 CAD (BPA 2028e 2,78 / 3,10 / 3,27 × PER 15,3 / 19,2 / 23,4), ponderada +11,3 %, base +11,3 % → Mantener; v2: +15,7 % / +13,0 % (Comprar, no decide). Comprar < 52,56; vender > 67,16. Robustez: FRÁGIL, acción robusta Mantener. Detalle en `revision-12m-2026-10-16.md`. No apuntado (lo hace el coordinador); `precios.json` no tiene X.TO (sin símbolo en el mapa).
- Para subir la confianza: SEDI (operaciones de directivos), calificaciones ESG, segmentos 2021-2022, BPA de consenso de 2028.

## Lecciones

- TMX: la web de inversores (Q4) bloquea con 403; los PDF se descargan directos de `s21.q4cdn.com/671813756/files/doc_financials/...` y `doc_news`.
- Beta de bolsas canadienses frente al XIC: la mensual sale absurda (0,08); usar la semanal a 5 años como referencia y la de las bolsas cotizadas para el WACC.
- Compradores en serie con BPA ajustado muy superior al publicado (43 % en TMX): el control de crecimiento del BPA salta si el objetivo a 12 meses usa la base ajustada; explicarlo con el ajustado del último año.
