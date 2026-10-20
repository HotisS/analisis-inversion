# Diario · Hon. Precision (7769.TW) · corte 20-oct-2026

- Commit de partida: `47c9863` (checkout compartido con otro análisis: sin pull, commit ni push en este encargo).
- Análisis hecho de cero; el intento del 19-oct no se ha usado.
- Horas (UTC): inicio 07:42 · bolsa 07:43 · notas A-E 07:50-08:09 · integrar y calcular 08:09 · Word y PDF 08:10 · robustez, regla 13 y revisión a 12 m 08:10-08:15.

## Decisiones

- **Cuentas**: MOPS (doc.twse / mopsov) da «FOR SECURITY REASONS» desde la nube y la web de la empresa falla con un error de certificado y un 503. Se usan las cuentas NIIF-Taiwán de S&P Global (vía StockAnalysis, actualizadas el 12-ago-2026: ejercicios 2022-2025 y últimos doce meses a jun-26), cuadradas con la ficha oficial de la TWSE (BPA, capital, ventas mensuales y dividendo). Huecos: 2021, concentración de clientes, vencimientos y opinión del auditor (Deloitte Taiwán).
- **Consejo**: la API de GCIS (registro mercantil) da la lista oficial. Sociedades del fundador: 36,58 %.
- **Selector 12 m**: hay 2 años de historia adelantada (2024 15,0x; 2025 26,6x), menos de los 3 que pide la v3, así que se usa la más baja de v3 y v2. Sale v3 (10,3 % frente a 22,7 % de la v2). Ejercicio objetivo 2028e.
- **Base de ventas**: +90 % en 2026e (enero-septiembre oficial: 40.713 M), +45 % en 2027e (capacidad +50 % anunciada) y +15 % en 2028e. El consenso de 2028 (152.075 M) supondría el 22 % del mercado de equipos de prueba de SEMI y no se adopta.
- **Sostenibilidad**: «En parte» (el motor da «Sí»). La cuota de 2030e (13,7 %) es razonable, pero hay concentración en 4-5 clientes de IA, el foso es estrecho y la empresa no ha cotizado nunca un ciclo bajista.
- **Portada**: el nombre se acorta a «Hon. Precision, Inc.» y el ticker queda como 7769.TW (el nombre chino largo se solapaba).
- **Controles**: 17 correctos y 5 explicados en `meta.controles_explicados`.

## Resultado

- Objetivo a 12 m: ponderado 5.685,35 TWD (+10,3 %), base 5.211,18 (+1,2 %). Con la v2: 22,7 % / 11,1 %.
- Valor intrínseco: 3.113,43 TWD (−40,2 %).
- Señal: **Mantener**. Acción robusta: «No mantener», veredicto SÓLIDA.
- Límite común de compra: 3.113,43 TWD. Venta por encima de 6.378,17.
- Regla 13: **no cambia** (caída de 1 mes −15 %, ligada al mercado; el consejo no ha vendido; no hay colocación pendiente).

## Lecciones (para quien mantenga `lecciones-paises.md`, no aplicadas aquí)

- Taiwán: MOPS está bloqueado desde la nube.
  - La ficha PDF de la TWSE (`twse.com.tw/pdf/en/<código>_en.pdf`) da BPA trimestral, ventas mensuales, capital y dividendo.
  - La API de GCIS da el consejo y sus participaciones.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Precio y bolsa | `bolsa.mjs` (Yahoo, 7769.TW frente a 0050.TW y SOXX) | cierre 20-oct-2026 |
| Precio del informe | `precios.mjs 7769.TW` | cierre 20-oct-2026: 5.205 TWD |
| Cuentas anuales y últimos doce meses | S&P Global vía StockAnalysis | FY2022-2025 y jun-26 (actualizado el 12-ago-2026) |
| BPA, capital, ventas mensuales y dividendo | Ficha oficial de la TWSE `7769_en.pdf` | generada el 20-oct-2026 (ventas hasta sep-26) |
| Consejo y participaciones | API de GCIS | consulta del 20-oct-2026 |
| Sector | Previsiones de equipos de SEMI (prensa) | 2026 |
| Consenso | MarketScreener / Investing | oct-2026 |
| Comparables | StockAnalysis / Yahoo | oct-2026 |
| Prima de mercado | Damodaran ERPbymonth | oct-2026 |
| Sentimiento | PTT, CMoney | hasta 20-oct-2026 |
| Integración | `motor/integrar.mjs` | 20-oct-2026 |
| Cálculo | `motor/calcular-empresa.mjs` | 20-oct-2026 |
| Word y PDF | `motor/rellenar.mjs` + soffice | 20-oct-2026 |
| Revisión a 12 m | `herramientas/apuntar-12m.mjs` | 20-oct-2026 |
| Robustez | `herramientas/robustez.mjs --actual` | cierre 20-oct-2026 |
| Regla 13 | `herramientas/movimiento.mjs` + noticias | 20-oct-2026 |
