# Diario: BayCurrent (6532.T), análisis value del 19-oct-2026

- Commit de partida: `250a336acc2e45e3c7dd51a518d0c96ea8e744bf` (17:42 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit, push, checkout ni stash desde este hilo; no se tocan cola.md, MEMORIA.md, METODO-VIGENTE.md, lecciones ni seguimiento.xlsx.
- Inicio: ≈ 17:43 UTC. Fin: ≈ 18:15 UTC (reloj del sistema).
- Análisis nuevo, método completo (no hay informe anterior de BayCurrent). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Sin XBRL** (Japón): cuenta, balance y flujos FY2020-FY2025 copiados de los tanshin NIIF (inglés y japonés) y comprobados con el yuho del ejercicio a feb-2026 (texto con pdfminer: `pdftotext` no extrae los yuho).
2. **Etiqueta del ejercicio «inicio»** (FY2025 = mar-2025 a feb-2026), la que la empresa usa desde el 15-oct-2026 en su plan a 2030; los documentos anteriores la llamaban «FY2026». `bolsa.mjs` con `--cierre-mes 2 --etiqueta inicio`. Ejercicio objetivo de la regla a 12 meses: **FY2028e** (mar-2028 a feb-2029).
3. **Precio**: cierre del 19-oct-2026 en Tokio, **10.740 JPY** (Yahoo chart, `regularMarketTime` 06:30 UTC = 15:30 JST). `bolsa.mjs` y `precios.mjs` solo llegaban al 16-oct (10.195, stop-high): la barra diaria del 19-oct de Yahoo aún no tenía cierre consolidado. `robustez.mjs --actual` calculó con 10.195 (16-oct); con 10.740 la regla da 7,8 % / 22,8 % (apuntar-12m). Las dos dan la misma acción.
4. **EBITDA del motor** = resultado operativo + toda la amortización (con derechos de uso): 53.456 M en FY2025 frente a 52.125 M de la empresa. Sin línea de proveedores: «otros pasivos corrientes» en `proveedores`.
5. **WACC**: bono japonés a 10 años 2,958 % (Hacienda, 16-oct); la beta mensual frente a 1306.T sale negativa (−0,13, cierres anómalos del ETF) y la semanal 0,77: se usa **beta 1,0 + 1 punto de prima adicional por el riesgo de la IA**. WACC 9,37 %. Terminal 2,0 % (≤ tasa libre − 0,5).
6. **Capex 2,1 %** = inmovilizado (≈ 0,8 %) + altas de derechos de uso (≈ 1,3 %), porque los alquileres futuros no están en el puente.
7. **Puente a 31-ago-2026**: deuda 0; arrendamientos 8.873; caja 54.483 + depósitos a plazo 3.020; `otros_ajustes` = dividendo a cuenta de 65 JPY (9.554 M, registro 31-ago, pago 30-nov) que el comprador de hoy no cobra.
8. **Riesgo de la IA como riesgo central**: escenario bajista = sustitución de horas (−8 puntos de crecimiento al año, −4 de margen, WACC +0,5); en la regla a 12 meses, PER bajista = mínimo de 5 años (13,8x, febrero de 2026). Robustez lo marca como «doble castigo» (M4): sin él la ponderada a 10.740 sería ≈ +14,6 %, todavía bajo el 15 %, y el valor real falla igual.
9. **Concentración de clientes**: ningún cliente ≥ 10 % (yuho); el peso de los mayores no se publica (hueco).
10. **PER actual** = precio ÷ BPA de los próximos 12 meses (4,3/12 de FY2026e + 7,7/12 de FY2027e = 376,02 → 28,6x). Con solo FY2027e (26,6x) la ponderada sería ≈ +4 %: la señal no cambia.
11. **Transacciones**: sin operaciones con múltiplo publicado → tabla vacía, peso 0, hueco registrado.
12. **Regla 13**: avisos P1 (+39 % en un mes; ≈ +46 % con el cierre del 19-oct) y P2 (en máximos tras +52 % en tres meses); la subida tiene causa (resultados del 1S y plan a 2030, rebote tras el pánico de la IA), sin colocaciones ni hechos con fecha en contra; ventas del fundador sin fecha. Veredicto: **no cambia**.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector), a 10.740 JPY: ponderada **+7,8 %**, base **+22,8 %** (con dividendo) → **Mantener**; v2 de control +17,2 % / +30,0 %, también Mantener por el filtro de valor real.
- Valor intrínseco 8.256,99 JPY (−23,1 %); DCF 8.839,58 (WACC 9,37 %); con la prima del mercado, DCF 10.784,32 y valor objetivo 9.956,32. DCF inverso: 17,1 % de crecimiento anual (base 13,0 %) o margen del 44,5 %.
- Calidad: ROIC 81,1 % frente a WACC 9,4 % (+71,7 puntos); sostenibilidad «Sí».
- Robustez (`--actual`, con 10.195 del 16-oct): SÓLIDA, acción robusta «No mantener»; límite de compra común 8.256,99 JPY (v2 igual; límite robusto con BPA −10 % igual); BPA −10 %: 2,4 % / 16,6 %.
- Controles: 20 de 20 correctos.
- Revisión a 12 meses: 6532.T v3 ponderada 7,8 %, base 22,8 % → Mantener (v2 17,2 %).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales FY2020-FY2025 | Tanshin NIIF (TDnet vía eir-parts) y yuho del ejercicio a feb-2026 (EDINET vía eir-parts), `herramientas/descargar.mjs` | Tanshin anual del 14-abr-2026 (cierre 28-feb-2026); yuho de mayo de 2026 |
| Último periodo | Tanshin y suplemento del 1S del ejercicio a feb-2027 | 15-oct-2026 (cierre 31-ago-2026) |
| Plan y política de capital | Plan a 2030, FAQ, aviso de política de capital | 15-oct-2026 |
| Gobierno | Yuho, informe de gobierno, avisos de consejo y accionistas, Kabutore (participaciones) | may-2025 a 19-oct-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs 6532.T` (Yahoo) | cierre del 16-oct-2026 |
| Precio del informe | Yahoo chart (`regularMarketPrice`) | cierre del 19-oct-2026, 15:30 JST (10.740 JPY) |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary), tipos de cambio de Yahoo | 19-oct-2026 |
| Tasa libre | Ministerio de Hacienda de Japón (jgbcm) | 16-oct-2026 (2,958 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Noticias (12 meses) | Kabutan, Toyo Keizai, Minkabu, Kabutore | oct-2025 a 19-oct-2026 |
| Sentimiento | Foro de Yahoo! Finance Japón, Kabutan, Toyo Keizai | abr-2026 a 19-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs 6532.T` | cierre del 16-oct-2026 (10.195; la barra del 19-oct aún sin cierre) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 19-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs baycurrent-2026-10-19` | precio 10.740 (19-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada 6532.T añadida) | 19-oct-2026 |
| Precios | `herramientas/precios.mjs 6532.T` | cierre del 16-oct-2026 (10.195) |
| Robustez | `herramientas/robustez.mjs … --actual` | 10.195 (16-oct; sin sesión en curso en precios.json) |
