# Diario: SHIFT (3697.T), análisis value del 21-oct-2026

- Commit de partida: `c0bdb0bb94ba5509db9c72bb8592632b2bbc0361` (13:38 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit, push, checkout ni stash desde este hilo; no se tocan cola.md, MEMORIA.md, METODO-VIGENTE.md, lecciones ni seguimiento.xlsx.
- Inicio: ≈ 13:40 UTC. Fin: ≈ 14:10 UTC (reloj del sistema).
- Análisis nuevo, método completo (no hay informe anterior de SHIFT en informes/). Notas A-E escritas por el analista (sin subagentes), con la forma de `informes/baycurrent-2026-10-19/` y `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Sin XBRL** (Japón): cuenta, balance y flujos FY2022-FY2026 copiados de los tanshin J-GAAP en inglés (FY2024 reexpresado según el tanshin de FY2025) y del resumen de cinco años del yuho en japonés. Documentos de la lista pública de xj-storage de la empresa (AS95685; eir-parts no tiene feed para 3697).
2. **Etiqueta del ejercicio «fin»** (FY2026 = sep-2025 a ago-2026), la de la empresa. `bolsa.mjs --cierre-mes 8 --etiqueta fin`. Ejercicio objetivo de la regla a 12 meses: **FY2028e**.
3. **Precio**: cierre del 21-oct-2026 en Tokio, **1.056,5 JPY** (06:30 UTC). Es el mismo en `bolsa.mjs`, `precios.mjs` y `robustez --actual`.
4. **EBITDA del motor** = resultado operativo + amortización + amortización del fondo de comercio (= EBITDA de la empresa, 21.604 M en FY2026). `resultado_financiero` = BAI − resultado operativo (incluye la pérdida de Rise y los extraordinarios). `proveedores` = pasivo corriente − deuda a corto − impuesto a pagar (sin línea propia).
5. **BPA**: J-GAAP básico (base de la guía, 52,16, y del consenso), no el «ajustado» de la empresa. FY2026 sin la pérdida de Rise (43,64) en la historia del PER.
6. **Crecimiento comprado**: arrastre de Nisseicom (+6,3 puntos en FY2027e) y ≈ 2 puntos de compras hasta FY2031e en `otros_pct`; las compras van en el capex (3,2 % de las ventas). El fondo con Tokyo Gas (consolidado con ≈ 67 % de minoritarios) no se proyecta.
7. **WACC**: bono japonés a 10 años 2,927 % (Hacienda, 20-oct); beta 1,1 (semanal a 5 años 1,11; la mensual, 0,55, por cierres anómalos de 1306.T; 1321.T roto) + 1 punto de prima adicional por la IA. WACC 8,99 %. Terminal 2,0 %. Impuestos 37 % → 35 % (fondo de comercio no deducible).
8. **Puente a 31-ago-2026**: deuda 34.713; caja 31.097; minoritarios 145; pensiones 3.477; asociadas 4.145 (33 % de Rise a precio de mercado, 2.916, + resto de inversiones a libros); `otros_ajustes` = dividendo de 4,53 JPY (1.172 M) con registro 31-ago que el comprador de hoy no cobra.
9. **Riesgo de la IA como riesgo central**: bajista = sustitución de horas de prueba (−6 puntos de crecimiento, −2,5 de margen, WACC +0,5, terminal 1,5 %) con **probabilidad del 30 %** (alcista 20 %), porque la sustitución ya se ve (pruebas tradicionales del 42,3 % al 18,7 % de las ventas en un año; la empresa dejó de contratar ingenieros). Con 25/50/25 la ponderada sería 19,3 % (Comprar): la señal depende de esta elección, y se dice.
10. **Selector**: desrateada (mediana adelantada 57,2x = 2,9 × PER actual 19,7x) → decide la v2 (v3 sin selector daría 25,9 %).
11. **Transacciones**: solo Nisseicom (compra propia, ≈ 1 vez ventas); Fuji Soft/KKR sin fuente primaria. Peso 0.
12. **Regla 13**: aviso P1 (+55 % en tres meses); subida con causa en resultados, dividendo y fondo con Tokyo Gas, tras la venta por la IA de febrero; sigue un 56 % bajo el máximo de cinco años. Veredicto: **no cambia**.

## Resultado

- Regla a 12 meses (v2 por el selector), a 1.056,5 JPY: ponderada **+14,3 %**, base **+15,4 %** → **Mantener**, convicción baja. v3 sin selector: 25,9 % / 27,0 % (Comprar).
- Valor intrínseco 1.147,89 JPY (+8,7 %); DCF 1.231,16 (WACC 8,99 %, VT 64 %); con la prima del mercado, DCF 1.526,64 y valor objetivo 1.401,47. DCF inverso: 5,2 % de crecimiento anual (base 8,1 %) o margen del 13,6 % (base 15,5 %).
- Calidad: ROIC 28,2 % (47,6 % sin fondo de comercio) frente a WACC 9,0 % (+19,2 puntos); sostenibilidad «Sí».
- Robustez (`--actual`, 1.056,5 del 21-oct): **FRÁGIL**; acción robusta «Mantener en cartera» (no compra). Límite de compra común 1.049,95 JPY (v2 igual); límite robusto (BPA −10 %) 945,73 JPY. BPA −10 %: 2,9 % / 3,9 %. Cambia con: v3 sin selector, sin doble castigo (15,2 %), pesos 25/50/25 (19,3 %).
- Controles: 19 de 24 correctos y 5 explicados (tipo impositivo FY2024 y FY2026, segmentos con eliminaciones, crecimiento del BPA desde un FY2026 deprimido por Rise).
- Word: 88,8 % de cobertura; avisos solo de tablas sin datos (suma de partes, calificaciones ESG, mapa de comparables, transacciones).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales FY2022-FY2026 | Tanshin J-GAAP en inglés (TDnet, vía xj-storage), yuho de FY2023 (inglés) y FY2025 (japonés e inglés), `herramientas/descargar.mjs` | Tanshin anual del 15-oct-2026 (cierre 31-ago-2026); yuho del 21-nov-2025 |
| BPA de FY2019-FY2020 | Tanshin del ejercicio a ago-2020 (JPX) | 8-oct-2020 |
| KPI, trimestres, IA, plan | Databook, presentación y transcripción de FY2026 | 15 y 19-oct-2026 |
| Avisos (capital, Rise, Nisseicom, Tokyo Gas, segmentos, dividendo, recompra) | TDnet vía xj-storage | ene-2026 a 15-oct-2026 |
| Gobierno | Yuho, convocatoria, votos de 2023-2025, ISS, informe de participación (Kabutan) | nov-2023 a feb-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs 3697.T` (Yahoo) | cierre del 21-oct-2026 |
| Precio del informe | Yahoo (`regularMarketPrice`) | cierre del 21-oct-2026, 15:30 JST (1.056,5 JPY) |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary), MarketScreener, tipo USD/JPY de Yahoo | 20 y 21-oct-2026 |
| Rise Consulting Group (puente) | Yahoo quoteSummary 9168.T | cierre del 21-oct-2026 |
| Tasa libre | Ministerio de Hacienda de Japón (jgbcme) | 20-oct-2026 (2,927 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Mercado | IDC Japan (servicios de TI); Oficina de Estadística (servicios) | 9-mar-2026; may-2026 |
| Noticias (12 meses) | Kabutan, MarketScreener | oct-2025 a 21-oct-2026 |
| Sentimiento | Foro de Yahoo! Finance Japón, Kabutan, MarketScreener | 21-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs 3697.T` | cierre del 21-oct-2026 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 21-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs shift-2026-10-21` | precio 1.056,5 (21-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada 3697.T añadida) | 21-oct-2026 |
| Precios | `herramientas/precios.mjs 3697.T` | cierre del 21-oct-2026 (1.056,5) |
| Robustez | `herramientas/robustez.mjs … --actual` | 1.056,5 (21-oct, sesión cerrada) |
