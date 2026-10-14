# Diario · Merck KGaA (MRK, Xetra) · 14-oct-2026

- Commit de partida: e9e80b6 (Amadeus, 14-oct). Prompt y regla de múltiplos sin cambios durante el análisis.
- Entorno: nube de Claude Code. Solo WebSearch (≈ 35 búsquedas); WebFetch, curl, descargar.mjs y bolsa.mjs no se probaron (no funcionan aquí, según el encargo). Todas las cifras salen de extractos de búsqueda con la URL del documento como fuente; lo que no cuadra está en null y en `meta.huecos`. **Confianza: media** en cuentas, guía y BPA pre (documentos de la empresa, coherentes entre sí: el BPA pre de 2025 cuadra con la fórmula); **baja** en balance de detalle, sector, gobierno y sentimiento.
- Identificación: Merck KGaA (Darmstadt), ISIN DE0006599905, NIIF-UE, cierre en diciembre, EUR. 434,8 M de acciones de capital total (129,2 M cotizadas + E. Merck KG ≈ 70 %).
- Precio: 137,20 EUR, Börse Stuttgart, 13-oct-2026 20:16 (sin cierre de Xetra verificable).
- Comparables, Bund (3,53 %), BCE (1,1181 USD/EUR) y prima de Damodaran reutilizados de los análisis paralelos del mismo día (Mettler-Toledo, Danaher, Roche, Amadeus, Diageo).
- Notas A-E escritas con `notas/construir-notas.mjs` (hechos); `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs`.

## Decisiones
- DCF con EBITDA publicado ≈ EBITDA pre − 1 punto (los ajustes «pre» se repiten: 210-293 M al año) y amortización sin la de intangibles comprados (6,0-6,7 %).
- Bio-Techne (≈ 9.900 M EUR, cierre 4T26-1T27) fuera del DCF, del puente y del BPA: la empresa no espera que aporte al BPA pre hasta el tercer año; se supone comprada a su valor.
- Pensiones: 1.956 M de 2024 netos de un 25 % de impuestos (1.467 M) en el puente (estimación).
- Sostenibilidad: el motor no hace la prueba (reinversión del 15 % del NOPAT). A mano: con el ROIC contable del 7,5 % el crecimiento financiable es del 1,1 %; sin fondo de comercio ni intangibles comprados el ROIC orgánico supera el 20 %. Rebajado medio punto el crecimiento de 2028e-2030e; veredicto «En parte».
- 12 meses en base BPA pre (la de la guía y del mercado); 2021 excluido del PER (26,0x, burbuja de la pandemia).
- Convicción: la sugerida (Baja; reglas absoluta Mantener y relativa Comprar).

## Tiempos
- 13:20 inicio; 13:33 primer cálculo; 13:34 Word y PDF (soffice) con 16 de 18 controles y 2 explicados.

## Línea 12 m
- 14-oct-2026: objetivo 150,51 EUR; ponderada +11,3 %, base +8,4 % (con dividendo 1,6 %) → **Mantener** (compra < 132,78 EUR; venta > 169,68). Valor intrínseco 134,52 EUR (−2,0 %). Consenso 146,11 EUR. ROIC − WACC = +0,1 puntos. Detalle en revision-12m-2026-10-14.md. No se ha ejecutado apuntar-12m.mjs ni seguimiento.mjs (lo hace el orquestador).

## Lecciones
- En conglomerados con mucho fondo de comercio (Merck KGaA), la prueba de sostenibilidad con el ROIC contable falla siempre; hazla también con el capital operativo sin intangibles comprados y dilo, y calibra el BPA del objetivo a 12 meses en la base «pre» de la empresa cuadrando el último ejercicio (aquí 8,34 exacto con una amortización propia del 5,5 % de ventas).
