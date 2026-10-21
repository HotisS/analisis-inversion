# Diario: Otis Worldwide (OTIS), análisis value del 21-oct-2026

- Commit de partida: `2f975a604501a30f62505de0d1fbc52ccdfde06d` (2026-10-21 14:37:15 UTC, «Lagercrantz: análisis value completo…»). Checkout compartido con otros tres análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: ≈ 14:39 UTC. Fin: ≈ 15:10 UTC (reloj del sistema).
- Análisis nuevo, método completo (no hay informe anterior de Otis). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`; sector reutilizado de `sectores/ascensores-2026-10-14.md` y comparables de `informes/kone-2026-10-18/`.

## Decisiones

1. **Años de las cuentas 2019-2025**: el balance de 2018 en XBRL está incompleto (Otis se separó de UTC en abril de 2020; 2019 sale del 10-K de 2021).
2. **BPA en base ajustada** (la de la guía y el consenso): 2019-2025 de las filas «Key Figures» de las notas del 4T (2,24 / 2,52 / 3,01 / 3,17 / 3,54 / 3,83 / 4,05). Ejercicio objetivo: **2028e**.
3. **PER actual = precio ÷ BPA de los próximos 12 meses** (2,3/12 de 2026e + 9,7/12 de 2027e = 4,39 → 16,4x), la misma base que la historia adelantada. Alternativas (solo 2027e 16,1x; solo 2028e 14,9x): el tope ×1,1 manda igual.
4. **Patrimonio negativo (−5.748 M a 30-jun-2026)**: ROE y ROIC del motor (130 %) no sirven. ROIC operativo a mano = (resultado operativo ajustado − reestructuración recurrente) × 0,755 ÷ (inmovilizado + fondo de comercio + intangibles + circulante con contratos) = 1.797 ÷ 3.028 = **59 %** en 2025 (53-63 % en 2022-2025); ROIC − WACC ≈ +51 puntos. En `controles_explicados` y en la sección 11.
5. **Equipo nuevo frente a servicio**: segmentos de 2022-2025 reexpresados sin Rusia (10-K 2024 y 2025); 2021 sin resultado en la segmentación vigente (hueco). El servicio da el 91 % del resultado de los segmentos; la suma de partes no se aplica como método (mismo negocio), solo como referencia en el comentario.
6. **Puente**: deuda 8.436, caja 813, arrendamientos 0 (US GAAP), minoritarios 675 (≈ 45 M de resultado × 15; en libros 294), pensiones 213 (284 × 0,75), otros 98 (financiación de proveedores a 240 días); litigio fiscal alemán y pago a RTX se compensan.
7. **Margen del DCF** = resultado operativo ajustado + amortizaciones − la reestructuración que se repite (40-77 M al año). 2026e al 16,6 % calibrado con la guía de BPA (4,01-4,05).
8. **Sostenibilidad**: con el primer crecimiento propuesto (5,0 % en 2027e, 4,5 % después; 4,1 % medio) el motor daba «En parte» (muy por encima del 1,6 % histórico publicado). Se rebajó a 4,5 % en 2027e (el consenso) y 4,0 / 4,0 / 3,5 / 3,5 / 3,0 / 3,0: 3,6 % medio en 2027e-2033e, por debajo del orgánico de 2021-2025 (3,3 %) y del mercado (3,9 %). El motor da «Sí» y las tres pruebas pasan. El DCF bajó de 77,54 a 75,80 USD.
9. **WACC 8,25 %**: tasa libre 5,12 % (Tesoro, 20-oct), beta 0,90 (mensual a 5 años; la semanal a 2 años, 0,49, no se usa por prudencia), prima 5,0 %, deuda al 5,0 % y 23,5 % de peso.
10. **Precio**: el informe usa el cierre del 20-oct (72,07 USD); la decisión se comprueba con la sesión del 21-oct en `robustez.mjs --actual` (71,95 USD, precios.mjs a las 15:07 UTC; 71,92 en movimiento.mjs y 72,01 en Yahoo a las 14:44 UTC).
11. **Regla 13**: veredicto «no cambia». Sin aviso P; las caídas tienen causa (dos rebajas de guía, retirada de la consejera delegada); el rebote de octubre y la caída del 18-mar quedan sin causa concreta tras tres búsquedas (hueco). Los resultados del 3T26 (28-oct) no retrasan la decisión (regla 11).
12. **Consenso de 2028e**: no publicado gratis (Yahoo solo 2026-2027; MarketScreener no abre; Stock Analysis de pago): hueco.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada +25,7 %, base +23,0 % (con dividendo) al cierre → **Comprar**; v2 de control +16,0 % / +12,3 %. Con la sesión (71,95): +25,9 % / +23,2 %; v2 16,2 %.
- BPA −10 %: 13,4 % / 11,0 % (sesión: 13,6 % / 11,2 %) → **no es compra robusta: nivel B1**. Límites: A 71,09 USD; B1 74,32; valor intrínseco 75,87.
- Valor intrínseco 75,87 USD (+5,3 %); DCF 75,80 (WACC 8,25 %); con la prima del mercado 86,19.
- Calidad: ROIC operativo − WACC ≈ +51 puntos; sostenibilidad «Sí»: pasa.
- Controles: 21 de 21 correctos; ROIC/ROE del motor y Altman Z explicados.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2018-2025 | `herramientas/cuentas.mjs --sec OTIS` (XBRL de la SEC) | 10-K 2025 (cierre 31-dic-2025); 10-Q 2T26 (30-jun-2026) |
| Documentos primarios | 10-K 2021, 2023, 2024 y 2025; 10-Q 2T26; notas de resultados del 4T20 al 4T25, 3T25, 1T26 y 2T26; 8-K (retirada de Marks, Miñarro, bono 2029, juntas 2025 y 2026); proxy 2026; transcripciones 1T26 y 2T26 | 2021 a 15-sep-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo) | cierre del 20-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) + ficha sectorial + informe de KONE | 21-oct-2026 14:44 UTC (sesión abierta); ficha del 14-oct-2026 |
| Sector China | NBS (inversión inmobiliaria ene-jun 2026); Roland Berger (mercado 2025-2030) | jul-2026; primavera de 2026 |
| Tasa libre | Tesoro de EE. UU., curva diaria | 20-oct-2026 (5,12 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Directivos | `herramientas/form4.mjs` | 21-oct-2025 a 21-oct-2026 |
| Sentimiento | Stocktwits, Seeking Alpha (RSS), MarketBeat | 15-ago a 18-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs OTIS` | 21-oct-2026 (71,92 USD) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 21-oct-2026 15:06 UTC |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs otis-2026-10-21` | precio 72,07 (20-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada OTIS añadida) | 21-oct-2026 |
| Precios | `herramientas/precios.mjs OTIS` | cierre 20-oct-2026; sesión 21-oct 71,95 (15:07 UTC) |
| Robustez | `herramientas/robustez.mjs … --actual` | sesión del 21-oct-2026 (71,95) |
