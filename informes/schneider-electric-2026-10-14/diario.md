# Diario · Schneider Electric (SU, Euronext París) · 14-oct-2026

- Commit de partida: 8fcac9c.
- Entorno: nube de Claude Code; solo WebSearch (WebFetch, curl, descargar.mjs y bolsa.mjs no se probaron, por encargo). 14 búsquedas. Presupuesto: 18 minutos.
- Confianza: **baja**. Alta en ventas, EBITA ajustado, BPA ajustado 2020-2025 y dividendos (comunicados en el depósito de la AMF) y en el 1S26 (Quartr, TED). Baja en EBITDA/amortización (estimados: EBITA + 3,5 % de ventas), deuda neta (15.400 M a jun-26, resumen secundario), minoritarios y pensiones (1.000 M cada uno, estimación), cierres anuales 2020-2024 (de memoria, ±3 %), beta (1,1) y OAT (3,4 %) estimadas, un solo comparable.
- Fecha de corte: 2026-10-14. Divisa EUR. Precio 272,80 EUR (5-oct). Ventas del 3T26: 29-oct-2026.
- Sin subagentes; notas A-E y propio.mjs + resumen.mjs. Sector, competencia, gobierno y directivos omitidos (huecos), capa E con agregadores (Reddit/Boursorama sin resultados).
- Decisiones: BPA ajustado como base del PER y del objetivo; capex del 4 % con el circulante dentro (nwc 0); pesos DCF 55 / escenarios 35 / comparables 10.
- Cierre: 33 controles, 11 correctos y 22 explicados. Word y PDF (soffice). DCF 227,96 EUR (WACC 8,91 %); valor intrínseco 226,07 (−17,1 %). DCF inverso: 8,5 % frente al 6,1 % del base. Sostenibilidad: Sí. ROIC n.d. (sin capital invertido).
- **Línea 12 m**: objetivo 299,94 EUR (BPA 2028e 11,50/13,24/14,48 × PER 18,4/23,1/26,0; 25/50/25); ponderada +11,5 %, base +13,7 % → **Mantener**, convicción baja; comprar < 226,07, vender > 337,93. Consenso 322,31 EUR. No ejecutados apuntar-12m.mjs ni seguimiento.mjs.

## Lecciones
- Con 18 minutos: copiar la estructura de un informe nube pequeño (Spirax) y escribir A-E con un solo script Python; las secciones omitidas se cierran con `controles_explicados` por prefijo del control.
- El valor intrínseco por DCF castiga a los compuestos de crecimiento con WACC del 9 %: la regla 12 m da Mantener aunque el base supere el 12 %, porque el filtro de valor real (VI ≥ precio) falla.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 23.1x, mínimo 18x, media larga 23x; antes v2 27.5x/18.4x/25.5x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Schneider Electric - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 11,1 % (antes v3 Mantener 11,1 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 18,4x / 23,1x / 26,0x, 11,5 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
