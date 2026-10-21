# Diario: Fastenal (FAST), análisis value del 21-oct-2026

- Commit de partida: `c0bdb0bb94ba5509db9c72bb8592632b2bbc0361` (13:38 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: ≈ 13:39 UTC. Fin: ≈ 14:05 UTC (reloj del sistema), con la investigación de la sesión anterior del mismo hilo.
- Análisis nuevo, método completo (no hay informe anterior de Fastenal). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`; parte propia en `notas/propio.mjs`, `notas/supuestos.mjs` y `notas/textos.mjs`, con la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Ejercicio natural, etiqueta «fin»**. Ejercicio objetivo de la regla a 12 meses: **2028e**.
2. **BPA GAAP** (Fastenal no publica ajustado; sin partidas no recurrentes relevantes). BPA, DPA y acciones reexpresados a las acciones de hoy por las divisiones 2×1 de mayo de 2019 y de mayo de 2025. Dividendos extraordinarios de 2020 (0,20) y 2023 (0,19) aparte.
3. **2026e fijo**: tres trimestres publicados (+14,2 %) y un 4T de ≈ 2.280 M (+12,5 %) → +13,8 % (consenso +13,7 %). Después +8 % en 2027 bajando al +4 % en 2034, por debajo del histórico de diez años (8,4 %) y del consenso de 2027 (+9,5 %), porque el precio arancelario (240-350 pb por trimestre en 2026) sale de la comparación.
4. **Margen EBITDA** 22,6 % → 23,0 % (máximo histórico, sin más): la mezcla de clientes grandes resta 40-50 pb de margen bruto al año y el apalancamiento de gastos lo compensa. El 3T26 lleva unos 20 pb de efectos de calendario no recurrentes.
5. **Circulante del 32 % de las ventas** (32,6 % en 2025, 32,4 % a 12 meses): las cuentas a cobrar suben un 19,9 % con clientes grandes que pagan más tarde; existencias vigiladas.
6. **WACC 9,49 %**: Tesoro a 10 años 5,12 % (20-oct), beta 0,80 (entre la mensual de 5 años 0,66 y la semanal 0,79), prima 5,5 %, deuda casi nula. Con la prima implícita de Damodaran (4,2 %) 8,46 %.
7. **Puente**: deuda 100 (pagarés privados), caja 211,9 a 30-sep-2026; arrendamientos operativos fuera (US GAAP).
8. **PER actual = precio ÷ BPA de los próximos 12 meses** (2,3/12 de 2026e + 9,7/12 de 2027e = 1,36 → 38,0x), la misma base que la historia adelantada. Con solo 2027e, 37,4x: no cambia la señal.
9. **Comparables**: MSC sin número de acciones en Yahoo → 55,9 M del XBRL. Sin EBITDA de consenso (hueco registrado): los gráficos `comps_ev` y `comps_mapa` del Word quedan sin datos.
10. **Transacciones**: no hay compras de distribuidores MRO puros con múltiplo publicado; se usan las de distribución de construcción, con peso 0.
11. **Hechos sin fuente quitados en la revisión** (año de salida a bolsa, inicio del vending, número de sucursales, caída de 2009, fecha de presidencia del consejo, porcentaje digital de julio). Historia de Onsite con el 10-K 2021.
12. **Precio**: el informe usa el cierre del 20-oct (51,65 USD); la decisión se comprueba con la sesión del 21-oct en `robustez.mjs --actual` (51,70 USD, precios.mjs a las 14:02 UTC; 51,61 en Yahoo a las 13:42 UTC).
13. **Regla 13**: veredicto «no cambia» (sin aviso P; +20,3 % en 12 meses y a un 1,3 % del máximo histórico, con causas en las ventas y resultados; las caídas del 13-abr y del 14-oct tienen causa en el margen bruto; nada con fecha que pueda mover más de un 5 % en contra salvo las ventas mensuales).
14. **IA** (lo pide siempre el usuario): riesgo bajo y mixto: la distribución física en la planta no se sustituye con software; la IA ayuda en compras y en el inventario de las máquinas, y el riesgo es que Amazon Business y Grainger la usen mejor en la parte de catálogo.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada −7,8 %, base +2,1 % (con dividendo; apuntar-12m redondea +2,2 %) al cierre → **Mantener**; v2 de control −4,9 % / +4,7 %. Con la sesión (51,70): −7,9 % / +2,1 %, Mantener.
- Valor intrínseco 23,55 USD (−54,4 %); DCF 21,92 (WACC 9,49 %); con la prima del mercado 26,18 (objetivo 26,85). DCF inverso: el precio pide un 27,9 % de crecimiento anual.
- Calidad: ROIC 34,2 % frente a WACC 9,49 % (≈ +25 puntos); sostenibilidad «Sí». Altman 36,6; Piotroski 8; Beneish −2,40.
- Robustez (`--actual`): SÓLIDA, acción robusta «No mantener» (el valor intrínseco no pasa el filtro de seguir en cartera); límite de compra 23,55 USD (v2 23,55), límite robusto 23,55; filtro de mantener hasta 27,71; BPA −10 %: −16,9 % / −7,9 %.
- Controles: 20 de 20 correctos. Avisos del Word: suma de partes vacía (no aplica) y tres gráficos de comparables sin datos de EBITDA de consenso.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2016-2025 | `herramientas/cuentas.mjs` (XBRL de la SEC, companyfacts) | 10-K 2025 (5-feb-2026); descarga 21-oct-2026 |
| Trimestres hasta el 3T26 y balance a 30-sep-2026 | 10-Q del 3T26 y 8-K de resultados (SEC) | 14 y 19-oct-2026 |
| Gobierno y remuneración | Proxy 2026 y 8-K de las juntas de 2025 y 2026 | 25-feb-2026; abril de 2025 y 2026 |
| Precio, betas, cierres anuales | `herramientas/bolsa` → `notas/bolsa.json` (Yahoo) | cierre del 20-oct-2026 |
| Consenso, comparables, objetivos | `notas/yahoo-datos.mjs` (Yahoo) | 21-oct-2026, 13:42 UTC |
| Compras y ventas de consejeros | Form 4 (SEC) → `notas/form4.json` | hasta 21-oct-2026 |
| Comparables (cuentas) | XBRL de la SEC de GWW, MSM, AIT, WCC, DSGR y otros | último 10-K/10-Q de cada uno |
| Tasa libre | Tesoro de EE. UU., bono a 10 años | 20-oct-2026 (5,12 %) |
| Tipos de cambio | BCE | 20-oct-2026 |
| Prima de mercado implícita | Damodaran | octubre de 2026 (4,2 %) |
| Movimiento del precio (regla 13) | `herramientas/movimiento.mjs FAST` | 21-oct-2026 (51,72) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026, 14:00 UTC |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 21-oct-2026, 14:01 UTC |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs fastenal-2026-10-21` | 21-oct-2026 |
| Precio del broker | `herramientas/precios.mjs FAST` | cierre 20-oct (51,65); sesión 21-oct 51,70 a las 14:02 UTC |
| Robustez | `herramientas/robustez.mjs` (cierre) y `--actual` (sesión) | 21-oct-2026, 14:02 UTC |
