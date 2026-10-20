# Diario: InterDigital (IDCC), análisis value del 20-oct-2026

- Commit de partida: `23a7cb3cf4d31f2c8bd0a160f44d16a4ba4c5f36` («Cola de índices: Mycronic (pareja 17)»). Checkout compartido con otro análisis en paralelo: sin pull, commit, push, checkout ni stash desde este hilo.
- Inicio: ≈ 10:06 UTC. Fin: ≈ 10:35 UTC (reloj del sistema). Nueva York no había abierto (abre a las 13:30 UTC): el precio es el cierre del 19-oct.
- Análisis nuevo, método completo (no hay informe anterior de InterDigital). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Ejercicio a 31 de diciembre**; ejercicio objetivo de la regla a 12 meses: **2028e**.
2. **Acciones económicas = 30,6 M** (diluidas no GAAP de la guía de 2026): suman la dilución de los warrants (6,0 M a 105,43 USD, ≈ 4,0 M netas a 322 USD, entrega sep-2027 a abr-2028) y no cuentan el convertible de 2027, cubierto hasta 105,43 por la opción comprada y pagado en caja. Las 25,8 M en circulación dan la capitalización publicada (8.320 M); la diferencia queda explicada en los controles.
3. **BPA en base GAAP por acción económica**, no el no GAAP de la empresa y del consenso (que suma la remuneración en acciones y la amortización de patentes compradas, ≈ +2,45 USD). Historia 2023-2025 con las diluidas no GAAP (27,6, 27,3 y 30,4 M).
4. **Atrasados de licencias**: los ingresos de 2023-2026 llevan 141, 460, 277 y ≥ 167 M de cobros de años pasados. El DCF los deja caer (2026e −3,0 % en el centro de la guía; 2027e −6,0 %) y luego proyecta solo recurrentes. En la historia del PER, 2018, 2022 y 2023 salen como atípicos con el criterio común (el BPA del año siguiente estaba hundido o inflado por atrasados); sin esas exclusiones la ponderada sería peor.
5. **Margen EBITDA GAAP** (después de la remuneración en acciones y de los litigios), no el «ajustado» de la empresa: 54 % en 2026e (de la guía de beneficio neto), 58 % a largo plazo.
6. **WACC 11,61 %**: tasa libre 5,15 % (Tesoro, 19-oct), beta 1,15 (entre la semanal de 2 años, 0,98, y la ajustada mensual de 5, 1,33), prima 5,5 %, prima adicional 0,5 puntos por la concentración (61 % de los ingresos en tres licenciatarios) y la dependencia de laudos. La conclusión no depende de la tasa (con la prima del mercado el DCF es 168,05).
7. **ROIC**: el del motor (115 %) no sirve (capital contable mínimo, beneficio con atrasados). Medida exigente sin atrasados y con cinco años de investigación capitalizados: ≈ 19 %, ROIC − WACC ≈ +7 puntos. Calidad «Sí».
8. **PER actual = precio ÷ BPA de los próximos 12 meses** (2,4/12 de 2026e + 9,6/12 de 2027e = 9,26 → 34,8x).
9. **Puente** a 30-jun-2026: deuda 378,2 (convertible), caja 1.112,4 (efectivo + inversiones a corto); sin arrendamientos (US GAAP), minoritarios ni pensiones.
10. **Regla 13**: veredicto «no cambia». Las caídas fuertes (abr-may 2026, −30,6 %) y la subida (jun-ago, +33,8 %) tienen causa en resultados y acuerdos propios; los hechos pendientes (impugnación de Samsung, laudos de Lenovo y Amazon, Disney) no tienen fecha cercana. Resultados del 3T26 el 29-oct: no retrasan (regla 11). Dos días de −5 % (6-ene y 20-mar-2026) sin causa concreta tras búsqueda: se dice en el texto.
11. **Comparables**: Qualcomm, Nokia (EUR convertido a 1,1225), Dolby, Adeia, Rambus y Universal Display; fuera Arm y Ceva (pérdidas o múltiplos sin sentido) y Ericsson (datos en SEK incoherentes en Yahoo).
12. **Símbolo**: entrada IDCC añadida al principio de `verticales/empresa/simbolos.json` (edición atómica, sin reordenar).

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada −6,5 %, base +7,5 % (con dividendo) → **Mantener**; v2 de control −46,1 % (Vender). `apuntar-12m.mjs`: −6,6 % / +7,4 %, marca «¡REVISAR!» por la distancia v3-v2 (explicada: la v2 mide la historia al cierre con BPA inflados por atrasados).
- Valor intrínseco 151,64 USD (−53,0 %); DCF 145,66 (WACC 11,61 %); con la prima del mercado 168,05. DCF inverso: 15,3 % de crecimiento anual descontado.
- Robustez (`--actual`, precio 322,40 del 19-oct; la sesión del 20-oct no había abierto): SÓLIDA, acción robusta «No mantener»; límite de compra 151,64 USD (v2 148,93), límite robusto 148,92; BPA −10 %: −15,8 % / −3,2 %.
- Controles: 18 de 20 correctos y 2 explicados (tipo impositivo de 2023; capitalización con acciones económicas).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2016-2025 | `herramientas/cuentas.mjs --sec IDCC` (XBRL de la SEC) | 10-K 2025, presentado el 5-feb-2026 (cierre 31-dic-2025) |
| Último trimestre | 10-Q del 2T26 y nota de resultados | 30-jul-2026 (cierre 30-jun-2026) |
| Documentos primarios | 10-K 2025, 2024 y 2022; notas de resultados 2T25-2T26; material suplementario 4T25-2T26; 8-K; proxy 2026; transcripciones 1T26 y 2T26 | feb-2023 a 30-jul-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo) | cierre del 19-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 20-oct-2026 (antes de la apertura; cierre del 19-oct) |
| Tasa libre | Tesoro de EE. UU., curva diaria | 19-oct-2026 (5,15 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Directivos | `herramientas/form4.mjs` | 20-oct-2025 a 20-oct-2026 |
| Sentimiento | Stocktwits, Seeking Alpha, MarketBeat, Trefis | may a 19-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs IDCC` | 19-oct-2026 (322,40 USD) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 20-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 20-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs interdigital-2026-10-20` | precio 322,40 (19-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada IDCC añadida) | 20-oct-2026 |
| Precios | `herramientas/precios.mjs IDCC` | cierre 19-oct-2026 (322,40) |
| Robustez | `herramientas/robustez.mjs … --actual` | cierre 19-oct-2026 (322,40); sesión del 20-oct sin abrir a las 10:33 UTC |
