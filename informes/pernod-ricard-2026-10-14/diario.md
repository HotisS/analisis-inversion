# Diario · Pernod Ricard (RI.PA) · 14-oct-2026

- Commit de partida: 2100da9 (regla de múltiplos v3 en main desde 0ab5dfd); al calcular, main en 46da3e5 (otras sesiones), sin cambios en el método.
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, descargar.mjs y bolsa.mjs no funcionan. Unas 25 búsquedas. Las cifras salen de resultados de búsqueda que citan las notas de prensa e informes de gestión de la empresa (FY22-FY26), prensa financiera (RTTNews, HL, ScanX) y agregadores (Stock Analysis, Digrin, Eulerpool, Weiss), con la URL como fuente.
- Reutilizado del repositorio: sector, competidores y transacciones del análisis de Diageo (12-oct) y comparables a 12-oct (MarketScreener) del análisis de Heineken (14-oct), pasados a EUR.
- Fecha de corte 2026-10-14; divisa EUR; ejercicio a 30 de junio, etiqueta «fin». Notas A-E y propio hechos por mí sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`).
- **Confianza de los datos de núcleo: baja.** Precio derivado (capitalización de MarketScreener del 12-oct ÷ 252,3 M acciones = 64,00 EUR; en septiembre cotizó entre 58,92 y 66,64), balance incompleto (deuda neta publicada con caja 0; patrimonio estimado con el ratio deuda neta/patrimonio de Eulerpool), flujos solo FY24-FY25 completos, sin consenso de BPA, sin beta propia (0,9 estimada).
- Decisiones: base recurrente (PRO y beneficio neto recurrente) en toda la cuenta; EBITDA FY26 = deuda neta / 3,7x; capex del DCF con la inversión en existencias envejecidas (sin circulante en el modelo). La primera proyección no pasaba la sostenibilidad (capital nuevo al 15,9 % frente a ROIC del 7,0 %): rebajé medio punto el crecimiento FY28-FY32, el margen final al 31,5 % y subí el capex al 9 %; pasa (11,0 % ≤ WACC + 5). Comparables con peso 0 (sin consenso NTM, el motor no calcula su valor): DCF 50 / escenarios 50. Historia del PER adelantada con FY22-FY23 excluidos (burbuja poscovid).
- Resultado: DCF 95,45 EUR; valor intrínseco 91,09 EUR (+42,3 %); DCF inverso −2,5 % anual de ventas. Sostenibilidad «En parte». ROIC 7,0 % frente a WACC 6,53 %.
- **Línea 12 m (v3)**: objetivo 73,95 EUR, ponderada +22,9 %, base +25,4 % (dividendo 7,3 % incluido); la regla da Comprar, se queda en **Mantener** por confianza baja. Comprar < 68,39; vender > 87,39. Detalle en revision-12m-2026-10-14.md. No pasa el requisito de calidad de la cartera (ROIC − WACC 0,5 puntos).
- Para pasar a Comprar: leer en la presentación y el documento de registro del FY26 la deuda neta, la caja, el patrimonio, las existencias y el flujo de caja; un cierre real de la acción; y las ventas del 1T27 (16-oct-2026).
- Word y PDF (soffice): 19 de 20 controles y 1 explicado (el de Comprar pendiente de confirmar). Cobertura 75 %.
- Tiempo: unos 20 minutos de reloj.

## Lecciones

- En la nube sin red, el análisis de un competidor hecho días antes (Diageo, Heineken) da sector, competidores, transacciones y comparables a 12-oct: reutilizarlo ahorra la mitad de las búsquedas. Sin consenso NTM accesible, los comparables no entran en el valor (el motor necesita el EBITDA y el BPA de los próximos 12 meses de la empresa).
