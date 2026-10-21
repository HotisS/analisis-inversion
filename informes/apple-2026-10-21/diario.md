# Diario: Apple (AAPL), análisis value del 21-oct-2026

- **Commit de partida:** `04b3e9075d886e8c43eaa5a3c6fc7e27b0387820` (15:49 UTC). El checkout es compartido con otros análisis en paralelo, así que este hilo no hace pull, commit ni push.
- **Hora:** inicio ≈ 15:50 UTC; fin ≈ 16:15 UTC (reloj del sistema).
- **Tipo:** análisis nuevo con el método completo; no hay informe anterior de Apple.
- **Notas:** las notas A-E son del analista, sin subagentes, y salen de `notas/construir-notas.mjs`. Siguen la forma de `informes/cardinal-health-2026-10-19/`. Los textos están en `notas/textos.mjs`, los supuestos en `notas/supuestos.mjs` y lo propio en `notas/propio.mjs`.

## Decisiones

1. **Ejercicio a finales de septiembre (último sábado), etiqueta «fin».** El FY2026 (28-sep-2025 a 26-sep-2026) está cerrado pero no se publica hasta el 2-nov-2026. Por eso las cuentas son el 10-K del FY2025 (presentado el 31-oct-2025) más los tres 10-Q del FY2026 (el último, 27-jun-2026, presentado el 31-jul-2026). El ejercicio objetivo de la regla a 12 meses es el **FY2028e**.
2. **FY2026e fijo:** 9 meses reales más el 4T con la guía (ventas +10 %, margen bruto del 47,5 %, gastos de 19.250 M). Resultado: ventas de 477.357 M (+14,7 %) y BPA de 8,86 USD (consenso 8,82).
3. **Caja = efectivo + valores negociables a corto y largo plazo (146.517 M en junio de 2026).** Así el capital invertido del motor es operativo. El ROIC del motor (478,8 %) no tiene sentido porque el patrimonio es casi nulo tras las recompras. La medida exigente, sobre el capital operativo fijo (inmovilizado + intangibles = 60.927 M), da un **184 %**. Sumando todos los otros activos no corrientes da un 84 %. **ROIC − WACC > 70 puntos con cualquier medida.** Está explicado en `controles_explicados`.
4. **Puente al 27-jun-2026:**
   - Deuda 84.344 M; arrendamientos financieros 1.230 M. Los operativos quedan fuera (US GAAP).
   - `otros_ajustes` 6.860 M: recompras del trimestre posteriores al balance (≈ 4.600 M) más el veredicto de Taction (5.722 M) al 50 % y después de impuestos (≈ 2.260 M).
   - Acciones diluidas: 14.652 M.
5. **WACC 10,27 %:**
   - Tasa libre 5,12 % (Tesoro a 10 años, 20-oct).
   - Beta 1,05 ajustada; prima 5,0 %, el suelo de la regla del prompt (5-6 %). La prima implícita de Damodaran (4,20 %) se usa solo para la regla relativa.
   - Peso de la deuda 1,7 % a precio de mercado.
   - Con la prima del mercado (regla relativa), el WACC baja a 9,45 % y el DCF sube a 169,48.
6. **Crecimiento:**
   - FY2027e: +8 %, por debajo del consenso (+10,4 %). La escasez de memoria («inundación de cien años», según Cook) limita unidades y margen, y no se repiten los reembolsos de aranceles IEEPA.
   - Después, convergencia al 3 %.
   - Margen EBITDA: 34,6 % en FY2027e y 35 % después.
   - Sostenibilidad «Sí»: un 5,1 % anual de FY2027e a FY2035e, por debajo de la TCAC de 2018-2025 (6,6 %), y sin inversión neta.
7. **Historia del PER (v3, adelantada):**
   - Cálculo: cierre de cada ejercicio ÷ BPA real del ejercicio siguiente.
   - FY2024 normalizado de 6,08 a 6,75 USD (cargo fiscal único de las ayudas de Estado, 10.200 M).
   - PER actual: precio ÷ BPA de los próximos 12 meses (9,39) = 36,2x, el máximo de la serie.
   - Mediana de 5 años 28,8x, mínimo 24,8x.
   - El selector no marca nada, así que decide la v3 ×1,1.
8. **Comparables:** 8 empresas de EE. UU. (Microsoft, Alphabet, Meta, Amazon, Dell, HP, Logitech y Qualcomm).
   - Fuera Samsung y Xiaomi: Yahoo mezcla divisas en su valor empresa y la memoria deforma a Samsung.
   - EV/EBITDA NTM estimado con el margen actual y las ventas de consenso.
   - La regresión múltiplo-crecimiento no explica nada (R² = 0,07); está explicada y no se usa.
   - Transacciones: ninguna comparable; peso 0 y registrado en huecos.
9. **Pesos de la síntesis:** DCF 45, comparables 20 y escenarios 35.
10. **Riesgos evaluados expresamente:**
    - **iPhone y China:** 50 % de las ventas; Gran China 15,5 % de las ventas y centro de la fabricación.
    - **Aranceles:** IEEPA anulados el 20-feb-2026 con reembolsos; siguen la sección 301 y la investigación de la sección 232.
    - **Google:** ≈ 20.000 M USD al año. El DOJ pide en la apelación prohibir los pagos; decisión probable en 2027. Está en el bajista.
    - **App Store:** DMA (multa de 500 M EUR; investigación del art. 6.4) y Epic (el Supremo acepta revisarlo el 30-jun-2026).
    - **Resultados del 4T (2-nov):** no retrasan nada (regla 11).
    - **IA:** exposición alta y sentido **mixto**. Es un riesgo (sin modelo propio de frontera; depende de Gemini) y a la vez puede ser motivo de renovación del iPhone (Siri nueva, 2.500 M de dispositivos para distribuir la IA de otros).
11. **Regla 13:** `movimiento.mjs AAPL`, en máximos históricos y sin avisos P1-P5. Doce meses de noticias. **Veredicto: no cambia.** Lo que impide comprar es el precio, no las noticias.
12. **Hueco:** la causa de la caída del −10,8 % de junio de 2026 (25-jun, −6,1 %) no se encontró tras tres búsquedas. Queda registrada en huecos.

## Resultados

- **DCF:** 150,83 USD (−55,6 %), con el valor terminal en el 54 % del total.
- **DCF inverso:** el precio pide un 17,2 % anual de crecimiento, frente al 5,1 % del base.
- **Valor intrínseco:** 155,79 USD (−54,1 %). Con la prima del mercado, 170,36.
- **Escenarios:** 104,13 / 150,83 / 177,72.
- **Objetivo a 12 meses (v3):** 310,61 USD. Rentabilidad ponderada −8,2 % y del base −1,5 %: **Mantener**. El control v2 da −6,4 % / +0,9 %, también Mantener. Las reglas del valor intrínseco (absoluta y relativa) dan Vender.
- **Calidad:** Altman Z 12,72; Piotroski F 8; Beneish M −2,29. Gobierno: 11 de 13 criterios.
- **Robustez al cierre** (339,50 USD, 20-oct):
  - Veredicto SÓLIDA. Acción vigente y robusta: **No mantener**, porque el valor intrínseco queda un 54 % bajo el precio (filtro de mantener hasta 183,28).
  - Límite de compra común: 155,79 USD.
  - Con el BPA −10 %: −17,4 % / −11,3 %.
- **Robustez con la sesión del 21-oct** (343,76 USD, `precios.mjs` a las 16:14 UTC; Yahoo marcaba 344,52 a las 15:53 UTC): −9,3 % / −2,8 %, Mantener. Acción robusta: No mantener. Límite: 155,79 USD.
- **Controles:** 19 de 20 correctos y 1 explicado (la regresión).
- **Word:** 2 avisos, de tablas vacías (sin suma de partes ni calificaciones ESG publicadas).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales FY2018-FY2025 (FY2016-17 sin ajustar por el split) | `herramientas/cuentas.mjs --sec AAPL` (XBRL de la SEC) | 10-K FY2025, presentado el 31-oct-2025 (cierre 27-sep-2025) |
| Trimestres del FY2026 | 10-Q 1T, 2T y 3T FY2026 y XBRL company facts | último: 27-jun-2026 (presentado el 31-jul-2026) |
| Documentos primarios | 10-K FY2025, 10-Q FY2026, notas de resultados 4T FY2025 a 3T FY2026, 8-K (Ternus, votaciones, otros), proxy 2026 | 31-oct-2025 a 31-jul-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs --accion AAPL --indice SPY --sector XLK` (Yahoo) | cierre del 20-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) y MarketScreener | 21-oct-2026, 15:53 UTC (sesión abierta) |
| Tasa libre | Tesoro de EE. UU., curva diaria (10 años) | 20-oct-2026 (5,12 %) |
| Prima de mercado | Damodaran, prima implícita | oct-2026 (4,20 %) |
| Directivos | `herramientas/form4.mjs --ticker AAPL --desde 2025-10-21` | 21-oct-2025 a 21-oct-2026 |
| Sentimiento | Stocktwits, Seeking Alpha y prensa (Reddit da 403) | sep-oct 2026 |
| Noticias (12 meses) | Prensa y regulador (Courthouse News, Bloomberg vía terceros, 10-Q) | 21-oct-2025 a 20-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs AAPL` | 21-oct-2026 (344,39 USD en sesión) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 21-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs apple-2026-10-21` | precio 339,50 (20-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada AAPL añadida) | 21-oct-2026 |
| Precios | `herramientas/precios.mjs AAPL` | cierre del 20-oct-2026; sesión del 21-oct a 343,76 (16:14 UTC) |
| Robustez | `herramientas/robustez.mjs` (al cierre y con `--actual`) | 20-oct (339,50) y sesión del 21-oct (343,76) |
