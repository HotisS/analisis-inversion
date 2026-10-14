# Diario · Deutsche Börse (DB1) · 14-oct-2026

- Commit de partida: 3586cdc (Alibaba, 14-oct). Prompt y regla de múltiplos sin cambios durante el análisis.
- Entorno: nube de Claude Code. Solo funciona la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no. Las cifras salen de los comunicados de resultados de la empresa citados por la búsqueda (4T22, 4T23, 4T24, 4T25, 2T26), de MarketScreener, Fintel, Simply Wall St y Börsengeflüster, con su URL. Confianza: media en cuenta de resultados, guía y consenso; baja en balance, flujos, gobierno y sector.
- Fecha de corte: 2026-10-14. Divisa: EUR. Cierre: diciembre. Precio: 298,90 EUR (cierre de Xetra del 13-oct; la sesión del 14 estaba abierta).
- 12:59-13:13 aprox.: unas 30 búsquedas, notas A-E (sin subagentes), propio, cálculo, Word y PDF (soffice).
- Decisiones:
  - **Resultado de tesorería** (intereses de los saldos de clientes en Clearstream/Eurex: 1.050 M en 2024, 837 M en 2025, > 700 M guía 2026): **dentro del DCF**, porque es recurrente y la empresa lo guía, pero a la baja (≈ 650 M estables desde 2027). Los saldos de clientes y el balance bancario (≈ 300.000 M) quedan fuera del puente y del ROIC, como en ICE. Si la tesorería fuera cero, el valor bajaría ≈ 15-20 % (estimación).
  - Allfunds (5.300 M, cierre 1S27) fuera de la proyección y de las acciones: no ha cerrado.
  - Puente a dic-25 con deuda bruta de Simply Wall St y deuda neta de MarketScreener; `otros_ajustes` 1.600 M (20 % de ISS STOXX + recompra de 2026, porque las acciones, 180,6 M, ya la descuentan).
  - Comparables del informe de ICE (8-oct), en euros a 1,175. Beta 0,85 estimada (sin bolsa.mjs). Bund 2,95 % (Cbonds, junio).
  - Sostenibilidad: reinversión neta negativa → prueba a mano; veredicto Sí (5,5 % medio frente a +9-11 % orgánico sin tesorería).
- Resultado: Mantener, convicción Baja (sugerida: reglas absoluta Mantener / relativa Comprar). Valor intrínseco 327,36 EUR (+9,5 %), DCF 334,87. 16 de 17 controles, el restante explicado (regresión). Cobertura 74,3 %.
- **Rentabilidad a 12 meses v2**: objetivo 320,35 EUR (BPA 2028e 13,80 / 15,25 / 16,02 × PER 19,8 / 20,5 / 23,9), ponderada +8,6 %, base +6,0 % → Mantener; comprar < 282,21 EUR. Detalle en `revision-12m-2026-10-14.md`. No apuntado con `apuntar-12m.mjs` (lo hace el integrador).

## Lecciones

- Bolsas con balance bancario (Deutsche Börse, como ICE): el «resultado de tesorería» va en ingresos y EBITDA; decide y escribe cuánto se mantiene con los tipos del BCE, y deja el balance de cámara/banco fuera del puente y del ROIC.
- En la búsqueda web, la «valoración» de MarketScreener da el BPA histórico y el consenso de tres años en una sola consulta; Börsengeflüster da los cierres anuales en euros.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 17.8x, mínimo 17.3x, media larga 18.3x; antes v2 20.5x/19.8x/20.7x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Deutsche Börse - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 1,2 % (antes v3 Mantener 1,2 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 19,8x / 20,5x / 23,9x, 8,6 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
