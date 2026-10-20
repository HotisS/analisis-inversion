# Diario · ASPEED (5274.TWO) · análisis value · corte 20-oct-2026

- Commit de partida: `fed4bc9` (checkout compartido con el análisis de Lantheus; sin pull, commit ni push en este encargo). El intento del 19-oct no se ha usado: carpeta nueva desde cero.
- Inicio 16:09 UTC; notas A-C hasta ≈ 16:25; D, E y propio 16:25-16:36; motor, Word, PDF, 12 m y robustez 16:36-16:41 UTC.

## Decisiones

- **Cuentas oficiales**: MOPS corta la conexión desde la nube. Las cuentas auditadas (Deloitte) 2018-2025, las del 1T26 y 2T26, el informe anual 2025 y la presentación del 8-sep-2026 se bajan de la web de la empresa (`aspeedtech.com/app/1/financial_infos?years=AAAA` da ventas mensuales y enlaces a `/file/report/…`; `/app/1/calendars?years=2026` da las presentaciones). Participaciones de consejeros del OpenAPI del TPEx (`tpex.org.tw/openapi/v1/mopsfin_t187ap11_O` y afines). Las cuentas de 2023 de la web son solo de la matriz: el consolidado de 2023 sale de los comparativos de 2024.
- **Reexpresión**: dos dividendos en acciones de 1 por 10 (jul-2022 y jul-2026). BPA y DPA divididos por 1,1 (1,21 antes de 2022), base 41,58 M acciones; los cierres de Yahoo ya están ajustados por esos repartos (se usa `close`, no `adjclose`).
- **Precio**: decisión con el cierre del 20-oct (15.900 TWD, 13:30 de Taipéi, Yahoo `regularMarketPrice` y StockAnalysis). bolsa.mjs, movimiento.mjs, precios.mjs y robustez.mjs toman el del 19-oct (15.980) porque la barra diaria del 20-oct trae el cierre vacío (mismo caso que King Slide).
- **2026e fijo** en 18.497 M: enero-septiembre oficial + centro de la guía del 4T26 (6.600-6.800 M). 2027e +55 % (consenso +65,5 %), 2028e +20 %, 2029e −10 % de digestión del ciclo.
- **Puente de valoración** con el balance de jun-26: caja 9.364,1; arrendamientos 300,5; minoritarios 25,6; dividendo pendiente de pago 3.024,2 en otros ajustes.
- **Resultado financiero**: no se proyectan diferencias de cambio ni valor razonable salvo lo ya contabilizado en el 1S26.
- **Calidad**: ROIC 221 % (capital invertido 1.706 M); sostenibilidad «Sí» del motor y del analista; `mercado_final` vacío por falta de un estudio de mercado de BMC en valor.
- **Comparables**: diseñadores de chips para centros de datos (Yahoo, 10 empresas); crecimiento de Alchip anulado por base anómala. Sin transacciones (hueco).
- **Regla 13**: veredicto «no cambia»; la caída de octubre (−27 % desde el máximo del 22-sep) coincide con la del TAIEX y no hemos encontrado noticia propia.
- **Resultado**: Mantener por la regla de 12 meses (+4,4 % / +13,7 %); robustez «No mantener» (valor intrínseco 5.610,04, −65 %); límite común 5.610,04 TWD.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales 2018-2025 | Web de la empresa (PDF auditados, Deloitte) | 31-dic-2025 (publicadas 5-mar-2026) |
| Cuentas trimestrales | Web de la empresa (1T26, 2T26 revisadas) | 30-jun-2026 (publicadas 5-ago-2026) |
| Ventas mensuales | API de la web de la empresa | septiembre de 2026 (publicadas ≈ 5-oct) |
| Guía del 4T26 | Presentación a inversores | 8-sep-2026 |
| Consejeros y pignoraciones | TPEx OpenAPI | sep-2026 |
| Bolsa, beta, cierres | `bolsa.mjs` (Yahoo) | 19-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs 5274.TWO` | 19-oct-2026 |
| Precio de la decisión | Yahoo y StockAnalysis | 20-oct-2026 13:30 Taipéi |
| Consenso | S&P Global vía StockAnalysis; Yahoo | 20-oct-2026 |
| Comparables | Yahoo quoteSummary | 20-oct-2026 |
| Bono de Taiwán 10 años | Trading Economics | 20-oct-2026 |
| Prima implícita | Damodaran | oct-2026 |
| Sentimiento | PTT (foro Stock) | jun-ago 2026 |
| Precio en precios.json | `precios.mjs 5274.TWO` | 19-oct-2026 |
| Revisión 12 m | `apuntar-12m.mjs aspeed-2026-10-20` | precio del informe, 20-oct-2026 |
| Robustez | `robustez.mjs --actual` | 19-oct-2026 (15.980) |

## Para quien mantenga las lecciones (no tocadas en este encargo)

- Taiwán: la web de inversores de ASPEED tiene una API JSON con ventas mensuales y PDF de cuentas en inglés; el OpenAPI del TPEx (`/openapi/v1/mopsfin_*`) funciona desde la nube; MOPS no.
- Yahoo deja vacío el cierre del día en Taipéi durante horas tras el cierre: `precios.mjs` y `robustez.mjs --actual` toman el anterior.
