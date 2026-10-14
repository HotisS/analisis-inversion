# Diario · Rightmove (RMV) · 14-oct-2026

- Commit de partida: 24bcd68 (RELX, 14-oct). Método v2 con regla de múltiplos común.
- Entorno: nube de Claude Code; solo WebSearch (≈25 búsquedas). WebFetch, curl, descargar.mjs y bolsa.mjs no se probaron (no funcionan aquí). Cifras de los comunicados de resultados citados por la búsqueda (RNS de 2025, 1S26, 2024, 2022, 2020) y de agregadores (Stock Analysis, Kalkine, TipRanks, Simply Wall St); lo que no cuadra va a null y a huecos.
- Fecha de corte 2026-10-14; divisa GBP (cotiza en peniques: 488,9 p = 4,889 GBP, Stockopedia, última sesión antes del corte; InvestSmart 491 p y MarketScreener ≈495 p el 9-oct cuadran). Acciones 732,5 M (RNS de recompra del 14-sep). Cierre a diciembre, etiqueta «fin».
- Confianza: media en cuenta 2021-2025 y en la guía; baja en balance (solo totales), cierres anuales de cotización (aproximados), consenso (un agregador, sin 2027-28), gobierno (sin consejo ni remuneración) y sector (sin tamaño de mercado). Estimaciones propias marcadas: amortización 2019-22, beneficio 2019-20, capex 2021-23, dividendos pagados 2021-22, ajuste del puente (−24 M de caja consumida hasta septiembre).
- Decisiones: comparables y transacciones del informe de Auto Trader (10-oct) más Auto Trader; EBITDA publicado (con pagos en acciones); 2026e fijo con la guía (+7 % ingresos, margen 68,4 %); beta 0,90; WACC 10,05 %; terminal 3 %; sostenibilidad «Sí» hecha a mano (reinversión ≈0: la prueba es el ARPA y la cuota). BPA 2028e con las recompras ya anunciadas (programa de 350 M) y sin otras.
- 14-oct, ≈50 min: notas A-E (A_build.mjs y BCDE_build.mjs), propio, 18 de 18 controles; Word y PDF (soffice).
- Línea 12 m: objetivo 5,53 GBP; ponderada +15,2 %, base +13,1 % → Comprar (convicción baja; compra < 4,90, venta > 6,26). Valor intrínseco 5,21 (+6,6 %). Consenso 5,95. Detalle en revision-12m-2026-10-14.md. No se ha ejecutado apuntar-12m.mjs ni seguimiento.mjs (lo integra el orquestador).

## Lecciones

- Las notas A-E solo traducen citas locales `[n]`: una cita `[A1]` dentro de B-E queda sin traducir. Si una nota cita otra, copia la fuente a la nota (hecho con un paso al final de BCDE_build.mjs).
