# Diario — Paychex (PAYX), corte 2026-10-12

- Commit de partida: `ad289a1 Informe de Coloplast (Comprar, convicción media) y entra en la cartera en lugar de ampliar Zoetis`.
- Prompt: `verticales/empresa/prompt.md` (711 líneas) y lecciones (155 líneas) leídos enteros.

## Fase 1 — Identificación
- Paychex, Inc.; NASDAQ PAYX; CIK 0000723531; ISIN US7043261079; Rochester (NY). US GAAP, USD.
- Ejercicio a 31 de mayo, etiqueta «fin» (FY2026 = jun-25 a may-26). Trimestres: 1T27 = jun-ago 2026.
- Último informe: 10-Q 1T FY27 (31-ago-2026, presentado 24-sep-2026); nota de resultados 23-sep-2026. 10-K FY26 del 17-jul-2026. Proxy del 4-sep-2026 (junta 15-oct-2026).
- Guía FY27 (23-sep): ingresos +5-6 %, margen operativo ajustado ~44 %, BPA ajustado +7-9 %, intereses de fondos 200-210 M.
- Próximos resultados: 2T FY27 hacia el 18-22 de diciembre de 2026 (el 2T FY26 se publicó el 19-dic-2025); D lo confirma.
- Paycor: compra cerrada en abril de 2025 → cambio de perímetro en FY2025/FY2026.
- Fondos de clientes: fuera de caja y deuda en el puente.

## Fase 2-4 bis
- Subagentes A-E lanzados a la vez en primer plano.
- A-E terminaron en 4-13 minutos, todos con `_estado`; sin caracteres mal codificados.

## Fases 5-9
- Integración y cálculo sin fallos del motor. Insperity fuera de comparables (margen EBITDA 1 %, salto LTM→NTM 22,8x→9,7x), filtrada en `propio.mjs`.
- DCF: FY2027e-FY2034e, crecimiento 5,5 % → 3,5 % (medio 4,5 %), margen EBITDA 47,0-47,5 % (= consenso), capex 5,3-5,0 % (incluye el exceso de comisiones activadas sobre su amortización, ~1,4 % de las ventas en FY2026), circulante 20,8 %, tipo 24 %. WACC 9,50 % (Rf 5,22 %, beta ajustada 0,90, prima 5,5 %). Gordon 3,0 % (10,5x EBITDA implícito).
- Resultado: DCF 93,54; objetivo 97,19 USD (−6,5 %); rentabilidad total −2,2 %; alcista +9,4 %, bajista −35,5 %, asimetría 0,26x. Prima del mercado: 111,76 USD, +11,8 %. Regla absoluta Vender, relativa Mantener → Mantener, convicción Baja (sugerida). DCF inverso: 6,2 % de crecimiento frente a 4,5 %; rentabilidad implícita 8,9 %.
- Controles: 16 de 18 correctos y 2 explicados (regresión R² 0,15; fragilidad de la mediana).
- Word (55 páginas, 28 gráficos, cobertura 90,9 %) y PDF generados; revisadas portada y resumen ejecutivo.

## Lecciones nuevas
- **Fondos de clientes de nóminas** (Paychex, ADP): a diferencia de Pluxee, aquí el balance histórico se limpia solo poniendo en `caja` la caja corporativa; los fondos y sus obligaciones quedan en activo y pasivo corrientes pero no entran en el circulante comercial (clientes − proveedores), así que el motor no se distorsiona. En el puente, el neto fondos − obligaciones (−92 M) es pequeño y se deja fuera.
- **Comisiones activadas** también en nóminas (342,5 capitalizadas frente a 249,2 amortizadas en FY2026, 1,4 % de las ventas): súmalo al capex (lección de ATOSS); quita ~2 USD por acción.
- **Consenso de MarketScreener con base mixta** (Paychex): EBITDA GAAP, EBIT ajustado (sin amortización de intangibles de Paycor) y BPA GAAP. Comprobado con la conciliación; `base_ebitda: "NIIF"`.
- La API de Stocktwits (`api.stocktwits.com/api/2/streams/symbol/<T>.json`) abre y da 30 mensajes con su marca; MarketBeat (`/stocks/NASDAQ/<T>/news/`) es buen índice de columnas.
- `form4.mjs` mezcla las donaciones (código G) del accionista del 10 % con las operaciones de directivos; hay que filtrarlas a mano.
- `descargar.mjs` no deja `.tabla.txt` en los HTML de EDGAR y no decodifica entidades HTML (`&#x2022;`) en el `.txt`.
- `prompt-de.mjs` no imprimió las lecciones a B y D (salida de 33-38 KB).
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 121,26 USD (ponderado; base 113,18), rentabilidad +21,0 % con dividendo, señal Comprar, convicción media (`revision-12m-2026-10-13.md`).
