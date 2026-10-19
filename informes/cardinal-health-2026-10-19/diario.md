# Diario: Cardinal Health (CAH), análisis value del 19-oct-2026

- Commit de partida: `c6e3bbef0fbe8fc6ae8e368d92ef961d0e6726f8` (14:01 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: 14:02 UTC. Fin: ≈ 14:28 UTC (reloj del sistema).
- Análisis nuevo, método completo (no hay informe anterior de Cardinal). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, siguiendo la forma de `informes/mckesson-2026-10-19/`.

## Decisiones

1. **Ejercicio a 30 de junio, etiqueta «fin»** (FY2026 = jul-25 a jun-26). Ejercicio objetivo de la regla a 12 meses: **FY2028e** (el primero que cierra más de 18 meses después del corte).
2. **BPA en base ajustada y sin IEEPA**: FY2026 = 10,95 USD (11,26 publicado menos 0,31 del reembolso de aranceles IEEPA, no recurrente según la dirección). Es la base del consenso y de la guía; el GAAP lo deforman amortizaciones, deterioros y opioides.
3. **PER actual = precio ÷ BPA de los próximos 12 meses** (8,4/12 de FY2027e + 3,6/12 de FY2028e = 12,97 → 19,6x), la misma base que la historia (precio de una fecha ÷ BPA de los 12 meses siguientes). Alternativas (solo FY2027e 20,2x; solo FY2028e 18,3x) en la revisión: todas dan Vender.
4. **ROIC con capital negativo**: el del motor (153,9 %) no sirve; medida exigente a mano = resultado operativo no GAAP × 0,81 ÷ (inmovilizado + fondo de comercio + intangibles) = 2.935 ÷ 16.662 = 17,6 % (17,1 % sin IEEPA); ROIC − WACC ≈ +9 puntos. Explicado en `controles_explicados`.
5. **Specialty Alliance Units (1.277 M)**: ya están en el pasivo del balance, así que no se suman a los minoritarios del balance (descuadraba activo = pasivo + patrimonio); se restan como minoritarios solo en el puente (159 + 1.277 = 1.436).
6. **Puente**: deuda 8.886 (con arrendamientos financieros), caja 4.856, opioides después de impuestos 3.397 en `otros_ajustes`; arrendamientos operativos fuera (US GAAP); ajustes propuestos por el IRS no restados (la empresa dice estar provisionada).
7. **Margen del DCF** = EBITDA ajustado − 0,10 puntos por reestructuración y remuneración ligada a compras (recurrentes, excluidas del ajustado; 407 M aún por reconocer).
8. **Precio**: el informe usa el cierre del 16-oct (254,06 USD); la decisión se comprueba con la sesión del 19-oct en `robustez.mjs --actual` (251,55 USD, precios.mjs a las 14:26 UTC; 252,46 en Yahoo a las 14:04 UTC).
9. **Movimiento de mayo-julio de 2026 (+22,6 %)** sin causa concreta tras tres búsquedas: queda como hueco y se explica como rebote del sector.
10. **Regla 13**: veredicto «no cambia» (sin aviso P; subida con causa en resultados, guía y CVS; nada con fecha que pueda mover más de un 5 % en contra).

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada −14,0 %, base −2,0 % (con dividendo) al cierre → **Vender**; v2 de control −18,7 %. Con la sesión (251,55): −13,2 % / −1,0 %, Vender.
- Valor intrínseco 245,63 USD (−3,3 %); DCF 259,80 (WACC 8,09 %); con la prima del mercado 305,51.
- Robustez (`--actual`): SÓLIDA, acción robusta «No mantener»; límite de compra 189,97 USD (v2 179,66), límite robusto 171,21; BPA −10 %: −21,8 % / −10,9 %.
- Controles: 18 de 19 correctos y 1 explicado (crecimiento del BPA medido desde el GAAP).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales FY2017-FY2026 | `herramientas/cuentas.mjs --sec CAH` (XBRL de la SEC) | 10-K FY2026, presentado el 11-ago-2026 (cierre 30-jun-2026) |
| Documentos primarios | 10-K FY2026, 10-Q 3T FY2026, notas de resultados FY2018-FY2026 y trimestrales FY2026, 8-K (CVS, crédito, consejo, bonos), proxy 2026, transcripciones 3T y 4T FY2026 | 2018 a 1-oct-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo) | cierre del 16-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) + ficha sectorial | 19-oct-2026 14:04 UTC (sesión abierta); ficha del 15-oct-2026 |
| Tasa libre | Tesoro de EE. UU., curva diaria | 16-oct-2026 (5,09 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Directivos | `herramientas/form4.mjs` | 19-oct-2025 a 19-oct-2026 |
| Sentimiento | Stocktwits, Seeking Alpha (RSS), MarketBeat | 14-ago a 19-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs CAH` | 19-oct-2026 (252,46 USD) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 19-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs cardinal-health-2026-10-19` | precio 254,06 (16-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada CAH añadida) | 19-oct-2026 |
| Precios | `herramientas/precios.mjs CAH` | cierre 16-oct-2026; sesión 19-oct 251,55 |
| Robustez | `herramientas/robustez.mjs … --actual` | sesión del 19-oct-2026 (251,55) |
