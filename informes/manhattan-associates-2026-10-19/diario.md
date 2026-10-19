# Diario: Manhattan Associates (MANH), análisis value, corte 19-oct-2026

- **Commit de partida**: `c72687b2e8295086bf8970fefb219a699c4badf4` (checkout compartido con otro análisis: sin pull, commit, push, checkout ni stash).
- **Tiempos (UTC)**: inicio 16:01; cuentas XBRL, bolsa, Form 4, documentos y búsquedas hasta ≈ 16:20; notas A-E 16:21; propio, integrar y motor 16:22-16:27 (21 de 21 controles); Word y PDF 16:28; revisión a 12 meses, apuntar-12m, simbolos.json, precios y robustez 16:25-16:29.
- **Procedimiento**: `/analiza-empresa` completo, sin informe anterior de MANH. Notas A-E escritas por el analista (`notas/construir-notas.mjs`), con el formato de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Fecha del 3T26 corregida**: el encargo decía ≈ 21-oct; la nota de la empresa del 7-oct (Business Wire, vía Finviz) da el **27-oct-2026 tras el cierre**, conferencia a las 16:30 ET [D8].
2. **Precio**: el informe usa el cierre del 16-oct (222,17 USD). La sesión del 19-oct estaba abierta: 225,10 USD (movimiento.mjs, ≈ 16:02 UTC), 225,37 (Yahoo, 16:04 UTC) y **225,52 USD a las 16:25 UTC (12:25 de Nueva York)** con `precios.mjs`; la decisión se comprueba con este último en `robustez.mjs --actual`.
3. **DCF sobre EBITDA GAAP** (la remuneración en acciones, 10,3 % de las ventas, es coste). Sensibilidad hecha aparte (copia en el scratchpad, no en el repo): sin restarla, DCF ≈ 112 USD; la conclusión no cambia.
4. **Regla a 12 meses en BPA ajustado** (base del consenso), historia adelantada 2016-2025 y v2 al cierre como control; PER actual con BPA NTM (2,4/12 de 2026e + 9,6/12 de 2027e).
5. **ROIC del motor no significativo** (capital invertido casi nulo por cobros anticipados y recompras): ROIC exigente manual del 72 % (inmovilizado + fondo de comercio + clientes); explicado en `controles_explicados`.
6. **Arrendamientos operativos fuera del puente** (US GAAP). Puente a 30-jun-2026: caja 186,1 M, sin deuda.
7. **Comparables sin SAP ni Oracle** (Yahoo mezcla EUR y USD en el EV de SAP; ORCL con deuda y perfil distinto); Descartes por DSGX (DSG.TO sin datos). Sin EV/EBITDA NTM gratuito: los gráficos de EV de comparables y transacciones no se dibujan.
8. **Riesgo de IA**: exposición media (WMS de bajo riesgo según la ficha sectorial; servicios de implantación, 47 % de las ventas, expuestos). Recogido en el bajista (−3 puntos de crecimiento y margen).
9. **Regla 13**: veredicto «no cambia» (subida explicada por resultados y mejora de Morgan Stanley; sin colocaciones; resultados del 27-oct no aplazan con tendencia alcista). Causas de las caídas del 23-feb (−9,8 %) y del 13-may (−6,9 %) no encontradas.
10. **simbolos.json**: añadida solo la entrada MANH (edición atómica tras releer el archivo, sin reordenar).
11. Incidencias: `bolsa.mjs` escribió en una ruta anidada por usar `--salida` relativa desde `notas/` (movido a `notas/bolsa.json`); `form4.mjs` no admite `--json` (se usó `--salida`); FRED no respondió (curva del Tesoro en CSV).

## Resultado

- Regla a 12 meses (v3): ponderada +23,5 %, base +26,6 % al cierre del 16-oct; +21,7 % / +24,7 % a 225,52. BPA −10 %: 9,5 % / 12,2 %.
- Valor intrínseco 90,70 USD (DCF 82,98; con prima de mercado 100,49): −60 % frente al precio.
- Robustez: **No mantener** (SÓLIDA); límite de compra común 90,70 USD.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales 2016-2025 | `cuentas.mjs --sec MANH` (XBRL companyfacts) | 10-K 2025, presentado el 2026-02-04 |
| Trimestres y balance a 30-jun-2026 | 10-Q del 2T26 y notas de resultados 1T25-2T26 (EDGAR) | 2026-07-31 (10-Q); 2026-07-28 (nota) |
| BPA ajustado histórico y guías | Notas del 4T de 2018-2025 (8-K, EDGAR) | 2019-01 a 2026-01-27 |
| Gobierno y remuneración | Proxy 2026 (DEF 14A), 8-K de juntas 2025-2026 | 2026-04-02; 2026-05-18 |
| Directivos | `form4.mjs` (Form 4, 12 meses) | 2025-10-19 a 2026-10-19 |
| Cotización, rentabilidades, beta | `bolsa.mjs` (Yahoo) | cierre 2026-10-16 |
| Movimiento (regla 13) | `movimiento.mjs MANH` | 2026-10-19 (≈ 16:02 UTC) |
| Consenso, objetivos, comparables | Yahoo quoteSummary (`notas/yahoo-datos.mjs`) | 2026-10-19, 16:04 UTC |
| Tasa libre | Tesoro de EE. UU., curva diaria (CSV) | 2026-10-16 (5,09 %) |
| Prima implícita | Damodaran, ERPbymonth | 2026-10 (4,20 %) |
| Fecha del 3T26 | Nota de la empresa (Business Wire vía Finviz) | 2026-10-07 |
| Mercado de SCM | MarketsandMarkets; Allied Market Research | 2025-11; 2026-05 |
| Riesgo de IA del sector | `sectores/software-2026-10-14.md` | 2026-10-14 |
| Transacciones | E2open/WiseTech, Coupa/Thoma Bravo, Blue Yonder/Panasonic | 2025-05; 2022-12; 2021-04 |
| Noticias y causas de movimientos | StockStory/FinancialContent, Seeking Alpha, Stocktwits | 2026-01-28 a 2026-10-12 |
| Precio para la decisión | `precios.mjs MANH` (sesión en curso) | 2026-10-19, 16:25 UTC (225,52) |
| Robustez | `robustez.mjs --actual` | 2026-10-19, 16:29 UTC |
