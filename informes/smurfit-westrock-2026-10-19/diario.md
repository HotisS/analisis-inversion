# Diario · Smurfit Westrock plc (NYSE SW) · 19-oct-2026

- Commit de partida: 8e12032 («Escáner value amplio (16 regiones, 61 bolsas) y seis análisis value del 19-oct…»). Sin `git pull`, `commit`, `push` ni cambios de rama por encargo (checkout compartido). Escrito fuera de esta carpeta, siempre con `flock` sobre el candado común: la entrada `SW` en `verticales/empresa/simbolos.json` (releído dentro del candado; solo se añade la entrada, en el orden original), `verticales/empresa/objetivo12m-revisados.json` (`apuntar-12m.mjs`) y `verticales/empresa/precios.json` (`precios.mjs SW`).
- Tiempos (marcas de los archivos, UTC del contenedor): inicio 10:26 (`_commit.txt`, `cuentas.mjs --sec SW`); bolsa y movimiento 10:27; documentos de la SEC 10:27-10:40; comparables 10:32; Tesoro 10:33; notas A-E 10:49; supuestos, propio, textos y resumen 10:50-10:58; Word y PDF 10:59; revisión a 12 meses, apuntado, precios y robustez 11:00-11:05.
- Fases A-E hechas por mí, sin subagentes (`notas/construir-notas.mjs`); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de Eastroc).

## Pasos y fecha de sus datos

| Paso | Herramienta / fuente | Fecha de los datos |
|---|---|---|
| Cuentas 2022-2025 y trimestres | `cuentas.mjs --sec SW` (XBRL de la SEC) | 10-K 2025 (feb-2026); 10-Q 2T26 (30-jun-2026) |
| Cuentas 2021-2023 de Smurfit Kappa en US GAAP y USD | folleto 424B3 de la combinación (EDGAR) | 26-abr-2024 |
| 10-K 2024 y 2025, 10-Q 1T26 y 2T26, notas y presentaciones de resultados 3T24-2T26, plan a medio plazo | EDGAR (`notas/docs/`) | hasta el 29-jul-2026 (2T26) |
| Proxy, juntas, Form 4 | EDGAR (DEF 14A 2026, 8-K 5.07 de 2025 y 2026, Form 4 de 12 meses) | DEF 14A mar-2026; junta 1-may-2026; Form 4 hasta el 19-oct-2026 |
| Precio, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs --accion SW --indice SPY --sector XLB`; `precios.mjs SW` | cierre 16-oct-2026 (41,16 USD) |
| Movimiento y caídas diarias | `movimiento.mjs SW --json` | 16-oct-2026 |
| Consenso y objetivos | MarketScreener (BPA 2026e-2028e) y Yahoo (17 analistas, 56,47 USD) | 16-19-oct-2026 |
| Comparables (9) | ficha de Yahoo y earningsTrend (`herramientas/yahoo.mjs`, script en el scratchpad) | 19-oct-2026 |
| Bono a 10 años de EE. UU. (5,09 %) | Daily Treasury Par Yield Curve (CSV del Tesoro) | 16-oct-2026 |
| Prima implícita (4,20 %) | Damodaran ERPbymonth | oct-2026 |
| Transacciones | IP DEFM14A (DS Smith), notas de PCA-Greif, Mondi-Schumacher, SW-CMPC | 2024-09-2026 |
| Sentimiento | Stocktwits (API), Seeking Alpha (RSS), TIKR | abr-oct-2026 |
| Próximos resultados | estimación por el calendario de 2025 (3T25 el 29-oct-2025) | **28-oct-2026 (estimada)** |

## Decisiones

- **Perímetro**: 2021-2023 = Smurfit Kappa (adquirente contable); 2024 con WestRock desde el 5-jul. El crecimiento se lee en pro forma: ventas 32.511 M (2023) → 30.919 M (2024) → 31.179 M (2025, +0,8 %); EBITDA ajustado combinado 4.706 → 4.939 M (+5,0 %). Sinergias de más de 400 M cumplidas; deterioros y cierres cada año (709 M en 2024, 531 M en 2025, 197 M en el 1S26); unas 600.000 t cerradas en 2025 y más de 200.000 t en 2026.
- **US GAAP**: los arrendamientos operativos no son deuda (`arrendamientos` 0; los financieros, 543 M, ya están en la deuda). `no_recurrentes_en_ebitda` = ajustes de la empresa salvo los pagos en acciones; el EBITDA del motor es el ajustado menos los pagos en acciones (`consenso.base_ebitda: "ajustado"`, `ajuste_ebitda_pct_ventas` 0,45).
- **Puente** a 30-jun-2026: deuda 14.164, caja 677, minoritarios 24, otros ajustes +659 (cuentas a cobrar vendidas sin recurso). CMPC Chile (420 M, pendiente) fuera del puente y de la proyección: casi neutra en valor.
- **DCF**: ventas +2,5 % (2026e fijo) / +5,5 % / +3 % / 2,5 % después; margen EBITDA 15,0 % (guía de 4.900-5.100 M) → 16,2 % → 16,9 % → 17,4 % desde 2030e; amortización 8,1 % → 7,3 %; capex 7,7 % → 7,4 %; circulante 14 %; impuesto 28 % / 27 %. WACC 7,90 % (Tesoro 5,09 %, beta 0,95, prima 5,5 %, Kd 5,5 %, deuda 39 %); g 2,5 %. Pesos DCF 50 / comparables 20 / transacciones 5 / escenarios 25. Mercado final: Mordor 238.200 M en 2030e → cuota 15,2 % → 15,3 %. Sostenibilidad **Sí** (motor y analista).
- **Margen de 2026e**: bajé del 15,2 % (punto medio de la guía) al 15,0 % (zona baja) por los dos recortes de guía seguidos.
- **BPA propio**: resultado financiero −720 / −700 / −680 M, 526,5 M de acciones sin recompras. 2026e 2,03; 2027e 2,91 (consenso 3,53); 2028e 3,44 (consenso 4,08, −16 %).
- **Historia del PER** (BPA ajustado de la empresa; hasta 2023, Smurfit Kappa): adelantado 2020, 2021, 2022, 2024, 2025 = 15,3 / 11,5 / 10,3 / 26,3 / 19,0 (2023 excluido: el BPA de 2024 mezcla medio año de WestRock) → mediana 15,28x; actual 14,15x. v2 de cierre 2021, 2022, 2023, 2025 (2024 excluido) → mediana 14,35x. Selector: 1,08 < 1,8 y cinco años → decide la v3.
- **Transacciones**: añadí EV/EBITDA a DS Smith (7,5x, el de mercado citado en el DEFM14A) y CMPC (6,0x, techo de «menos de 6 veces con sinergias») para tener tres o más; mediana 8,0x → 42,60 USD.
- Convicción **Baja** frente a la «Alta» sugerida (control explicado): v2 en Mantener, B1 de robustez, ROIC < WACC y guía recortada dos veces.

## Resultado

- DCF 55,34 USD (WACC 7,90 %, VT 62 %); valor intrínseco **52,39 USD, +27,3 %**; con la prima del mercado, DCF 68,58. DCF inverso: ventas −0,7 % al año o margen EBITDA del 15,8 % perpetuo; rentabilidad implícita 9,0 %.
- **12 m (v3)**: objetivo **48,57 USD**; ponderada **+22,4 %**, base **+27,3 %**; v2 de control 12,1 % / 23,1 % (Mantener); con BPA −10 %: **10,6 % / 15,0 %**. Regla: **Comprar**, convicción baja. Comprar por debajo de 43,81; vender por encima de 55,98.
- **Calidad**: ROIC 2025 **5,3 %** − WACC **7,9 %** = **−2,6 puntos** (motor); sostenibilidad Sí.
- **Robustez (`--actual`)**: FRÁGIL; acción vigente Comprar; **acción robusta Mantener en cartera** (cambia con la v2); límite de compra 43,81 USD (v2 40,12); límite robusto 39,60 USD; colchón de BPA 7 % para Comprar. Marcas D6 (CONFIANZA), D7, M4, E2. **No es COMPRA ROBUSTA (regla 6)**: fallan la v2, la variante BPA −10 % y la calidad (ROIC − WACC < 5).
- Regla 13: **no cambia**. Próximos resultados: 28-oct-2026 (estimada).
- Riesgo de IA: Neutral, exposición baja, 0 % a 3-5 años (producto físico; la IA solo ayuda en planificación y mantenimiento).
- Word y PDF (47 páginas, soffice con perfil propio): 20 de 23 controles correctos y 3 explicados (tipo impositivo de 2024, compra robusta v3/v2, crecimiento del BPA); cobertura 91,1 %. Avisos del Word: sin suma de partes (no aplica), sin calificaciones ESG y mapa de comparables sin ROIC.

## Huecos

- Balance de 2021 comparable (solo NIIF y EUR), vida media de la deuda, antigüedad del auditor, DPA de 2021 (estimado), calificaciones ESG, ROIC de los comparables, EV/EBITDA de la propia fusión SK-WestRock.

## Lecciones propuestas (para el coordinador; no escritas en archivos comunes)

- Fusiones con adquirente contable extranjero (Smurfit Westrock): el XBRL de la SEC empieza con el primer 10-K (2022 sin balance); la historia anterior en US GAAP y USD está en el folleto S-4/424B3 de la combinación, no en los informes anuales del adquirente (NIIF y EUR).
- El encargo decía «LSE SWR», pero la cotización de Londres se canceló el 22-jun-2026: comprobar la lista de cotizaciones antes de fijar el mercado.
- `simbolos.json` no está ordenado: al añadir una entrada con `node -e` no hay que reordenar las claves (yo lo hice y lo deshice dentro del candado, conservando el orden del último commit).
- Con un año de cargos grandes (cierres, deterioros), el control «BPA ≤ 25 % anual desde el último real» y la marca D6 de robustez saltan aunque el BPA ajustado sea coherente; conviene que el motor admita un BPA ajustado de referencia.
