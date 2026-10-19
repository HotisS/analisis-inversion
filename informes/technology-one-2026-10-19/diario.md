# Diario · Technology One (TNE.AX) · corte 19-oct-2026

- **Commit de partida**: `f04d576` (Análisis value de la cola de índices, pareja 2: McKesson y Elm). Checkout compartido con otro análisis: sin pull, commit ni push; solo se escribe en esta carpeta, en la entrada TNE de `simbolos.json` y en lo que escriben `precios.mjs` y `apuntar-12m.mjs`.
- **Tiempos**: inicio 13:37 UTC; notas A-E terminadas hacia 13:55; `propio` y primer cálculo 13:58; Word y PDF 14:05; revisión, robustez y diario 14:10 (≈ 35 minutos de reloj tras retomar; la fase de documentación se hizo antes en la misma sesión).
- **Método**: `/analiza-empresa` completo desde cero (sin informe anterior de TNE en el repo). Notas A-E hechas por el analista en orden con `notas/construir-notas.mjs` (modelo: `informes/classys-2026-10-19/`), después `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs`.

## Decisiones

1. **Cuentas oficiales sin XBRL** (Australia no lo publica): FY2021-FY2025 de los informes anuales auditados y Appendix 4E de la ASX; semestres de los Appendix 4D (H1 FY2024-FY2026). FY2024 reexpresado según el informe de FY2025. Descarga de PDF: el listado antiguo de anuncios de la ASX da 404; funciona `/asx/v2/statistics/announcements.do?…&year=AAAA` y la URL del PDF sale del campo oculto `pdfURL`.
2. **Ejercicio cerrado y sin publicar**: FY2026 (30-sep-2026) se publica hacia el 17-nov. FY2026e va `fijo` (guía de beneficio antes de impuestos +18-20 % en el extremo alto; nuestro BAI 217,6 M = +19,9 %); el DCF no le da peso (fracción 0) y la caja de su segundo semestre entra en el puente como estimación propia (`otros_ajustes` −32 M: flujo libre ≈ +145 − dividendo 26,2 − fideicomiso de empleados 86,9).
3. **Criterio de la cuenta**: ingresos = revenue from contracts; EBITDA = BAI − otros ingresos + gastos financieros + D&A; resultado financiero = otros ingresos − gastos financieros. Pasivos de contrato en el circulante; capex con desarrollo y comisiones activadas, más ≈ 1,1 puntos de altas de derechos de uso porque los arrendamientos van en el puente (NIIF 16).
4. **WACC 11,06 %** (bono AUD 5,31 %, beta 1,15, prima 5,0 %, sin deuda) y terminal del 3,0 % (el 3,5 % inicial lo marcó el control). El DCF queda en 11,29 AUD frente a 31,30: el DCF inverso pide un 23,3 % anual.
5. **Historia del PER adelantado FY2021-FY2025** con nuestro BPA de FY2026e para el cierre de FY2025 (como Classys con su año en curso); el cierre de FY2026 no entra porque su BPA aún es estimado. FY2019 en v2 con el BPA básico (18,43 c).
6. **Dividendo de los últimos 12 meses** corregido a 0,38 AUD (0,28 ordinario + 0,10 extraordinario): la primera versión de la nota A tenía 0,28 como total.
7. **Resultado**: Mantener (ponderada −3,4 %, base +6,0 %); robustez SÓLIDA con acción robusta «No mantener» por el filtro de valor intrínseco (11,56 AUD). Regla 13: no cambia.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Precio, betas, rentabilidades, cierres de ejercicio | `herramientas/bolsa.mjs` (Yahoo TNE.AX, STW.AX, ^AXIJ) | cierre 2026-10-19 |
| Precio común | `NODE_USE_ENV_PROXY=1 node herramientas/precios.mjs TNE` | 2026-10-19 (31,30 AUD) |
| Movimiento y regla 13 | `NODE_USE_ENV_PROXY=1 node herramientas/movimiento.mjs TNE.AX` | 2026-10-19 |
| Cuentas anuales | Annual Report FY2025 y FY2024, Appendix 4E FY2021-FY2023 (ASX) | 2021-11-23 a 2025-11-18 |
| Cuentas semestrales | Appendix 4D H1 FY2026 y H1 FY2025 (ASX) | 2026-05-19 y 2025-05-20 |
| Guía | Junta del 18-feb-2026 y resultados del 19-may-2026 (ASX) | 2026-05-19 |
| Gobierno y directivos | Annual Report FY2025, votaciones de la junta, Appendix 3Y, avisos de accionista significativo, anuncios de liderazgo (ASX) | 2025-11-18 a 2026-09-25 |
| Fideicomiso de empleados | Anuncios de compra en el mercado (ASX) | 2026-08-27 |
| Consenso | Yahoo quoteSummary (BPA e ingresos FY2026e-FY2027e), FNArena, Investing.com | 2026-10-16 a 2026-10-19 |
| Comparables y tipos de cambio | Yahoo quoteSummary de 8 comparables | 2026-10-19 |
| Bono australiano a 10 años | RBA, tabla F2 | 2026-10-14 |
| Prima de riesgo | Damodaran ERPbymonth | 2026-10 |
| Sector y riesgo de IA | `sectores/software-2026-10-14.md` | 2026-10-14 |
| Sentimiento | Motley Fool Australia, Livewire, Webull | 2026-05 a 2026-10 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` (20 de 20 controles) | 2026-10-19 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 2026-10-19 |
| Revisión a 12 meses | `node herramientas/apuntar-12m.mjs technology-one-2026-10-19` | 2026-10-19 |
| Robustez | `node herramientas/robustez.mjs informes/technology-one-2026-10-19 --actual` | 2026-10-19 |
