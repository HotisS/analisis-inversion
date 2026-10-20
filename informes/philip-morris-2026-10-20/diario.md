# Diario: Philip Morris International (PM), análisis value del 20-oct-2026

- Commit de partida: `9598416623658746c8245e65d3c3b0a9c541bb03`. Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo; no se tocan cola, memoria, método, lecciones ni seguimiento.
- Inicio: ≈ 13:37 UTC. Notas A-E: 14:01 UTC. Cálculo, Word y PDF: 14:08 UTC. Robustez: 14:08 UTC (reloj del sistema).
- Análisis nuevo, método completo (no hay informe anterior de Philip Morris en `informes/`). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`.
- Exclusiones (`herramientas/exclusiones.mjs`): el tabaco **no** está en ninguna lista de exclusión del repo; se analiza con normalidad.

## Decisiones

1. **Ejercicio a 31 de diciembre.** Ejercicio objetivo de la regla a 12 meses: **2028e**.
2. **BPA en base ajustada** (sin amortización de intangibles de Swedish Match, reestructuración, deterioros —RBH 2024 y 2026—, valor razonable de participaciones ni efecto fiscal de la financiación de Swedish Match): 2025 = 7,54 USD (7,26 publicado). Es la base del consenso y de la guía (8,35-8,50 en 2026). BPA propio calibrado: 2025 7,54; 2026e 8,35; 2027e 8,99; 2028e 8,67 / 9,65 / 10,05.
3. **PER actual = precio ÷ BPA de los próximos 12 meses** (2,4/12 de 2026e + 9,6/12 de 2027e = 8,86 → 22,7x). Alternativas (solo 2026e 24,1x; solo 2027e 22,4x) dan también Mantener.
4. **Patrimonio negativo (−9.994 M)**: ROE sin sentido; ROIC del motor 36,7 % (capital por pasivo ≈ 35.000 M, inflado). ROIC sobre capital operativo a mano: 12.896 ÷ 48.188 = 26,8 % (24,1 % GAAP); ROIC − WACC ≈ +18 puntos (+28 con la cifra del motor). Pasa con las dos.
5. **Deuda de Swedish Match**: deuda financiera a 30-jun-2026 de 49.113 M (con los vencimientos corrientes; la de `cuentas.mjs` omitía la parte a corto y se corrigió con el XBRL). Caja 5.999.
6. **Minoritarios a valor de mercado** (≈ 12 × 556 M = 6.670 M, en libros 1.926): filiales de Oriente Medio, Indonesia y Egipto que valen más que su coste. Asociadas 2.042 (con RBH a 51 M tras el deterioro de 511 M del 2T26). Pensiones 460 después de impuestos.
7. **RBH (Canadá)**: desconsolidada desde 2019, plan de acuerdo aprobado en 2025; el deterioro de 2026 no tiene salida de caja. Los dos controles BAI − impuestos − minoritarios (2024 y 2025) se explican porque PMI pone el resultado de participadas después de impuestos.
8. **Margen del DCF** = EBITDA ajustado − 0,3 puntos por las partidas excluidas que se repiten (513-1.284 M al año en 2021-2025). Capex de 2022 y 2023 del XBRL incluye pagos de intangibles (derechos de IQOS): se deja y se explica.
9. **Divisa**: crecimiento de 2026e con ≈ 1,5 puntos de divisa; 0,5 puntos de prima adicional en el WACC por emergentes y Rusia (≈ 6 % de los ingresos).
10. **Regulación e impuestos** valorados en serio: directiva europea (TED) en el bajista y en riesgos; Japón, Reino Unido, sabores, FDA (ZYN autorizado y con riesgo reducido; ILUMA pendiente). Riesgo de IA: bajo y mixto (`riesgos.ia`).
11. **Precio**: el informe usa el cierre del 19-oct (201,05 USD); la sesión del 20-oct (200,86 USD, `precios.mjs` a las 14:07 UTC) se usa en `robustez.mjs --actual`.
12. **Regla 13**: veredicto «no cambia» (subidas con causa: resultados, FDA, rotación defensiva; ventas de directivos tras la entrega anual; resultados del 3T26 el 21-oct no aplazan, regla 11).

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada −6,5 %, base +1,8 % (con dividendo) al cierre → **Mantener**; v2 de control −18,6 % (Vender). Con la sesión (200,86): −6,4 % / +1,9 %, Mantener.
- Valor intrínseco 132,89 USD (−33,9 %); DCF 139,04 (WACC 8,57 %); con la prima del mercado 162,32. DCF inverso: 10,9 % de crecimiento anual frente al 4,4 % del base.
- Sostenibilidad: «Sí» (motor y analista).
- Robustez (`--actual`): SÓLIDA, acción robusta «No mantener»; límite de compra 132,89 USD, límite robusto 132,88; BPA −10 %: −15,5 % / −8,0 %. Aviso D5 (variante): salto del BPA GAAP en 2025 por el deterioro de RBH de 2024.
- Controles: 18 de 20 correctos y 2 explicados (resultado de participadas después de impuestos).
- Línea de la revisión a 12 meses: `PM: v3 ponderada -6.5 %, base 1.8 % → Mantener (v2: -18.6 % Vender)`.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2016-2025 | `herramientas/cuentas.mjs --sec PM` (XBRL de la SEC) | 10-K 2025 (cierre 31-dic-2025) y 10-Q 2T26 (30-jun-2026) |
| Documentos primarios | 10-K 2025, 10-Q 2T26, notas de resultados 2018-2025 y trimestrales 3T25-2T26, cuentas reexpresadas, 8-K (CFO, bonos, prepago, juntas, Altria), proxy 2026, CAGNY 2026, conferencias de Barclays, Deutsche Bank y Morgan Stanley | 2018 a 18-sep-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo) | cierre del 19-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs`, `notas/comparables-yahoo.mjs` (Yahoo), MarketScreener | 19-20 oct-2026 |
| Tasa libre | Tesoro de EE. UU., curva diaria | 19-oct-2026 (5,15 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Directivos | `herramientas/form4.mjs` | 20-oct-2025 a 20-oct-2026 |
| Noticias (12 meses) | `herramientas/noticias.mjs` y búsqueda web | 20-oct-2025 a 20-oct-2026 |
| Sentimiento | Stocktwits, Seeking Alpha (RSS), Yahoo | hasta 20-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs PM` | 20-oct-2026 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 20-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 20-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs philip-morris-2026-10-20` | precio 201,05 (19-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada PM añadida) | 20-oct-2026 |
| Precios | `herramientas/precios.mjs PM` | cierre 19-oct-2026; sesión 20-oct 200,86 (14:07 UTC) |
| Robustez | `herramientas/robustez.mjs … --actual` | cierre 19-oct (201,05) y sesión del 20-oct (200,86, 14:08 UTC) |
