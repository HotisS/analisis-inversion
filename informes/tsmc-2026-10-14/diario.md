# Diario · TSMC (2330.TW) · 14-oct-2026

- Commit de partida: 098e441 (Spirax Group, 14-oct).
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Unas 35 búsquedas. Las cifras salen de los extractos de búsqueda de los comunicados de TSMC (6-K de 1T26 y 2T26, ventas de septiembre, informe de gestión 2T26, consejo del 11-ago), StockAnalysis/Stockopedia (cuenta 2021-2025, EBITDA), la transcripción del 4T25 y prensa (Focus Taiwan, Business Today, TechNews). **Confianza: media en cuentas y trimestres; baja en balance histórico, flujos 2021-2022, comparables (solo PER adelantado, fechas distintas), gobierno (sin informe anual) y bolsa (sin beta).**
- Sin subagentes: fases A-E hechas por mí, notas en `notas/A-E.json`, supuestos en `notas/supuestos.mjs`, textos en `notas/textos.mjs` y `notas/resumen.mjs`, unidos en `notas/propio.mjs`.
- Fecha de corte: 2026-10-14. Divisa: TWD (acción local 2330; ADR TSM = 5 acciones, dicho en limitaciones). Cierre: diciembre. Resultados del 3T26: 15-oct-2026.
- Tiempos: inicio 11:09; notas A-E 11:17; primer cálculo 11:19; textos y resumen 11:23; Word y PDF 11:24; revisión 12 m y diario 11:27.

## Decisiones
- Precio: cierre del 8-oct (2.550 TWD), el último localizado; no apareció el del 13-oct (hueco).
- Amortización = EBITDA de StockAnalysis − beneficio operativo de Stockopedia; cuadra con el BPA publicado (66,25 en 2025).
- WACC en TWD: bono taiwanés 1,88 %, beta 1,15 (estimada), prima 5,5 % + 1,5 por Taiwán → 9,58 %. Terminal 1,5 % (la regla daba 1,4 %).
- Sostenibilidad: la primera versión (capex 18-37 %) fallaba (financiable 9,3 % frente a 14,2 %). Se subió el capex hacia la historia de TSMC (34-53 % de las ventas) y se recortó levemente el crecimiento de 2033-35; pasa con 14,1 % financiable frente a 14,1 % proyectado. Veredicto Sí.
- Circulante del 8 % (sin balance de 2025; clientes + existencias ≈19 % de las ventas en el 2T26), explicado como control.
- PER histórico: solo dos cierres verificados (2022, 2025) y la mediana adelantada de Zacks (21x). El mínimo de 5 años (11,4x de 2022) fija el bajista.
- Consenso: solo cuatro objetivos de casas extranjeras (los más recientes, alcistas) y el BPA del ADR convertido: contraste débil.

## Resultado
- Mantener, convicción media. DCF 1.853,18 TWD; valor intrínseco (síntesis) 2.142,85 TWD (−16,0 %); DCF inverso: 16,0 % de crecimiento implícito frente a 10,8 % del base.
- **Línea 12 m:** objetivo ponderado 2.804,63 TWD (+11,0 %; base +13,4 %), Mantener; comprar < 2.142,85, vender > 3.145,14. Detalle en `revision-12m-2026-10-14.md`. No se ha ejecutado `apuntar-12m.mjs` ni `seguimiento.mjs` (lo hace el integrador).
- Controles: 18 de 20 correctos y 2 explicados (circulante sin balance, caja proyectada).

## Lecciones
- **Emisores de Taiwán desde la nube**: los comunicados de TSMC (pr.tsmc.com) y sus 6-K salen bien en la búsqueda con cifras trimestrales completas; el balance histórico y los flujos anuales no. El EBITDA anual en TWD sale de StockAnalysis (página del ADR, que publica en TWD) y el beneficio operativo de Stockopedia: con los dos se obtiene la amortización.
- **Precio del día en Taiwán**: Focus Taiwan/CNA y la prensa taiwanesa (Business Today, TechNews, en chino) dan el cierre; buscar en chino («台積電 收盤») encuentra más que en inglés.
- **Sostenibilidad en industrias de capital intensivo**: con un capex por debajo del histórico, la prueba falla aunque el ROIC sea del 50 %; subir el capex hacia la media histórica es la corrección mínima (como Microsoft o Intuitive en las lecciones).
