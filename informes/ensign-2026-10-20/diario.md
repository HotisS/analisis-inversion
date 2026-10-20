# Diario: The Ensign Group (ENSG), análisis value del 20-oct-2026

- Commit de partida: `d6a592463882f7770cb589dc1d5112e1a2c27ea8` («Cola de índices: Lundin Gold (pareja 21)»). Checkout compartido con otro análisis en paralelo (ExlService): sin pull, commit ni push desde este hilo.
- Inicio: 12:21 UTC. Cálculo, Word y PDF terminados a las 12:47 UTC; robustez con el cierre a las 12:48; robustez con la sesión del 20-oct a las 13:36 UTC. Fin: 13:37 UTC.
- Análisis nuevo, método completo (no hay informe anterior de Ensign). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **BPA en base GAAP diluida** (no la ajustada de la empresa y del consenso, que suma la remuneración en acciones: ≈ 0,85-0,90 USD por acción en 2026). La historia del PER va en la misma base. Ejercicio objetivo: **2028e**.
2. **Historia adelantada sin 2022** (su PER divide por el BPA de 2023, rebajado 0,80 USD por el litigio de directores médicos, 60,8 M); v2 sin 2023 por la misma razón. Desde 2019 por la escisión de Pennant.
3. **Arrendamientos operativos fuera del puente y de la deuda** (US GAAP: el alquiler ya resta en el EBITDA); pasivo de ≈ 1.990 M a junio de 2026. Se explica que con ellos el ROIC baja a ≈ 11 % (fuente propia P2) y se cuenta como objeción.
4. **Compras de centros e inmuebles dentro del capex del DCF** (comprador en serie): 12,3 % de las ventas en 2026e (376 M ya gastados en el 1S), bajando al 3,9 % en 2033e. El crecimiento de 2026e-2027e lleva 5-10 puntos de compras; el orgánico converge al 4 %.
5. **Standard Bearer sin suma de partes**: el 85 % de su renta la pagan los propios centros; separarla contaría dos veces el flujo. Valor orientativo en el comentario (≈ 1.000-1.300 M).
6. **Puente a 30-jun-2026**: deuda 139,7 (hipotecas), caja 262,3; las inversiones de la aseguradora cautiva cubren las provisiones de autoseguro y no cuentan como caja; minoritarios 3,1.
7. **WACC 9,77 %**: tasa libre 5,15 % (Tesoro a 10 años del 19-oct; FRED falló, CSV del Tesoro), beta ajustada 0,77, prima 5,5 % + 0,5 por el riesgo regulatorio y legal concreto (CID del DOJ, informes bajistas, demanda).
8. **Consenso**: el primer cálculo daba un PER NTM de 84x porque `construir-notas.mjs` tomaba las estimaciones trimestrales (0q, +1q) de Yahoo en vez de las anuales (0y, +1y). Corregido.
9. **Sensibilidad del DCF**: con crecimientos del 7-9 % diez años más, más capex y etapa 2, el DCF solo llega a ≈ 103 USD; se descartó y se dejó el caso base. El valor real queda muy por debajo del precio con cualquier supuesto razonable.
10. **Regla 13**: veredicto «no cambia». Movimientos fuertes con causa (oct-25 +10,8 % sin hecho propio; feb-26 +26,9 % por los resultados de 2025; may-26 −14,9 % corrección del múltiplo sin hecho propio; jun-26 −16,4 % por Hunterbrook y Muddy Waters; jul-26 +15,0 % por el 2T26). Sin hecho pendiente con fecha que mueva más de un 5 %: la demanda colectiva solo tiene plazos procesales y el CID del DOJ no tiene fecha. Sin avisos P.
11. **Riesgo de IA**: exposición baja, sentido mixto (ayuda en la parte administrativa; amenaza por los algoritmos de Medicare Advantage que acortan estancias).
12. Huecos: transacciones precedentes (sin múltiplos publicados), calificaciones ESG, EV/EBITDA de los comparables con la misma definición.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada −1,4 %, base +6,4 % (con dividendo) al cierre del 19-oct → **Mantener**; v2 +5,4 % / +9,2 %. BPA −10 %: −11,2 % / −4,2 %.
- Valor intrínseco 92,27 USD (−46,7 %); DCF 81,60 (WACC 9,77 %); con la prima del mercado 104,10.
- Calidad: ROIC 18,9 % frente a WACC 9,77 % (+9,1 puntos); sostenibilidad «Sí» (financiable 11,4 % frente a 8,4 % proyectado).
- Robustez (`--actual`, cierre del 19-oct): SÓLIDA, acción robusta «No mantener»; límite de compra común 92,27 USD; filtro de mantener hasta 108,55.
- Con la sesión del 20-oct (174,34 USD, precios.mjs a las 13:36 UTC): ponderada −2,1 %, base +5,6 %, Mantener; v2 +4,7 %; BPA −10 %: −11,9 % / −4,9 %. Acción robusta «No mantener», mismo límite (92,27 USD).
- Controles: 21 de 21 correctos (dos explicados en `controles_explicados`: PER NTM ajustado frente a GAAP y DCF muy por debajo del precio).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2016-2025 | `herramientas/cuentas.mjs --sec ENSG` (XBRL de la SEC) | 10-K 2025 (cierre 31-dic-2025); deuda 2019-2020 y capex completados a mano con los 10-K |
| Documentos primarios | 10-K 2025, 2023, 2022 y 2020; 10-Q 1T26 y 2T26; notas de resultados 2T25-2T26; 8-K (recompra, crédito, estatutos, cúpula, junta); proxy 2026 | 2020 a ago-2026 (10-Q del 2T26: 30-jun-2026) |
| Datos de bolsa | `herramientas/bolsa.mjs --accion ENSG --indice SPY --sector XLV` (Yahoo) | cierre del 19-oct-2026 (173,05 USD) |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary), Stock Analysis | 20-oct-2026 12:25 UTC |
| Tasa libre | Tesoro de EE. UU., curva diaria | 19-oct-2026 (5,15 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Sector | CMS NHE 2024, Skilled Nursing News, regla final SNF PPS FY27, derogación de la plantilla mínima | 2024 a 29-jul-2026 |
| Directivos | `herramientas/form4.mjs` | 20-oct-2025 a 20-oct-2026 |
| Noticias de 12 meses | Investing, OCBJ, Bleichmar Fonti (demanda), notas de prensa | oct-2025 a 8-oct-2026 |
| Sentimiento | Stocktwits, Seeking Alpha (RSS) | 8-jun a 17-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs ENSG` y `movimiento-precio.mjs`; Yahoo diario de 13 meses | 19-oct-2026 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 20-oct-2026 12:46 UTC |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 20-oct-2026 12:47 UTC |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs ensign-2026-10-20` | 20-oct-2026 |
| Precio (cierre) | `herramientas/precios.mjs ENSG` | 19-oct-2026 (173,05 USD) |
| Robustez con el cierre | `herramientas/robustez.mjs --actual` | 19-oct-2026 |
| Precio (sesión) y robustez | `herramientas/precios.mjs ENSG` y `robustez.mjs --actual` | 20-oct-2026 13:36 UTC (174,34 USD) |
