# Diario · TeamViewer SE (TMV.DE) · análisis value completo · corte 20-oct-2026

- **Commit de partida:** `58013cc` («Cola de índices: Cheryong Electric (pareja 20)»), con el árbol limpio, a las 11:44:49 UTC (`notas/_commit.txt`).
- **Encargo:** análisis value desde cero, con el método completo de `/analiza-empresa` y sin refrescar ningún informe anterior. No había informe previo de TeamViewer.

## Checkout compartido con otro análisis en paralelo (Lundin Gold)

**Sin operaciones de git:** no se hizo pull, commit, push, checkout ni stash.

**Lo que se escribió fuera de esta carpeta:**
- Mi entrada `TMV` en `verticales/empresa/simbolos.json`. Se añadió dentro de `flock` sobre `scratchpad/repo.lock`, releyendo el archivo y añadiendo solo esa entrada, sin reordenar nada.
- Lo que escriben solas `precios.mjs TMV` (`precios.json`) y `apuntar-12m.mjs` (`objetivo12m-revisados.json`), también bajo el candado.

**Lo que no se tocó:**
- Archivos: `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` y `seguimiento.xlsx`.
- Herramientas: no se ejecutó `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.

## Tiempos (UTC del contenedor)

| Hora | Paso |
|---|---|
| 11:44 | Inicio |
| 11:45 | Bolsa y movimiento |
| 11:46-11:54 | Documentos (Geschäftsbericht 2025, junta 2026, notas trimestrales y anuales) |
| 11:49 | Yahoo y comparables |
| 11:50 | Bund |
| 12:01-12:03 | Notas A-E, propio y supuestos |
| 12:09 | Textos, resumen e integración |
| 12:09-12:12 | Cálculo, Word y PDF |
| 12:11 | Precios, apuntar-12m y robustez |

Hubo una compactación del contexto después de escribir los textos de valoración. Todas las fases las hice yo, sin subagentes: las notas A-E con `notas/construir-notas.mjs` y la parte propia con `propio.mjs`, `supuestos.mjs`, `textos.mjs` y `resumen.mjs`.

## Decisiones

**Cuentas**
- `cuentas.mjs --esef` no da datos, porque Alemania no está en filings.xbrl.org.
- 2024-2025 salen del Geschäftsbericht 2025 en PDF (estados en las pp. 133-135; deuda en la p. 46; conciliaciones ajustadas en la p. 44).
- 2021-2023 salen de las notas anuales con estados completos; el 1S26, de la nota del 28-jul-2026.
- La web de relación con inversores solo funciona con JavaScript: se usaron copias de EQS, boersengefluester y webdisclosure.

**EBITDA y BPA**
- **EBITDA del informe:** NIIF con los pagos en acciones como coste, devolviendo solo los costes de la compra de 1E y de litigios. En 2025 da un 42,0 %, ≈ 2 puntos menos que el ajustado de la empresa.
- **BPA de la regla a 12 meses:** el ajustado de la empresa menos los pagos en acciones después de impuestos. Así el PER histórico y el BPA futuro están en la misma base.
- **Amortización del DCF:** sin la de los intangibles de las compras (PPA de 29,4 M), que no es caja ni desgrava.

**WACC y escenarios**
- **WACC del 8,35 %:** Bund al 3,45 %; beta de 1,20 (la mensual; la semanal ajustada da 0,93); prima adicional de 1 punto por la IA y la pérdida de clientes; peso de la deuda del 35 %. g terminal del 1,5 %.
- **Bajista severo:** −6 puntos de crecimiento en 2027e, −4 de margen y g de −0,5 %, para recoger la sustitución por IA y las herramientas gratuitas de Microsoft (Quick Assist, Remote Help en Intune).

**Sostenibilidad y regla a 12 meses**
- **Sostenibilidad «En parte»:** el motor da «Sí», pero se rebaja porque el crecimiento sale de subir el precio por cliente mientras los clientes caen un 7 % al año (NRR del 93 %).
- **Regla a 12 meses:** decide la v2 por el selector (desrateada: 14,4 ÷ 6,1 = 2,4). Da Mantener: 12,0 % ponderada y 9,7 % en el base.

**Robustez**
- Sale FRÁGIL y la acción robusta es **No mantener**, por la variante del BPA del consenso (D7). El consenso de MarketScreener (1,00 EUR en 2028e) es NIIF y carga la amortización de las compras.
- No se ha cambiado el campo del consenso para esquivar la prueba: se comunica tal cual, con la explicación de la diferencia de base. En base comparable estimamos ≈ 1,13 EUR, un 11 % por debajo del nuestro.

**Regla 13:** veredicto **no cambia**.

**Huecos y avisos de Word que quedan**
- Sentimiento: sin foros legibles, sección omitida.
- Calificaciones ESG: no encontradas, tabla omitida.
- Mapa de comparables: Yahoo no da EV/EBITDA de los próximos 12 meses de los comparables, así que el gráfico se omite.
- Suma de partes: no aplica.

**Controles:** 19 de 19 correctos.

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Cuentas XBRL | `cuentas.mjs --esef` (sin datos para Alemania) | — |
| Cuentas anuales 2024-2025 | Geschäftsbericht 2025 (PDF) | 31-dic-2025 (publicado feb/mar-2026) |
| Cuentas 2021-2023 | Notas Q4/FY 2022 y 2023 con estados | 31-dic-2021 a 31-dic-2023 |
| Trimestres y 1S26 | Notas del 1T26 y 2T26 (EQS) | 30-jun-2026 (publicado 28-jul-2026) |
| Bolsa, beta, cierres | `bolsa.mjs --accion TMV.DE --indice EXS1.DE --sector EXV3.DE` | Cierre del 19-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs TMV.DE` | 20-oct-2026 (6,96 EUR) |
| Consenso y comparables | `yahoo-datos.mjs` (Yahoo quoteSummary) | 20-oct-2026, 11:08 UTC |
| Consenso por años | MarketScreener (14 analistas) | oct-2026 |
| Tipo libre de riesgo | Bundesbank, Bund a 10 años | 20-oct-2026 (3,45 %) |
| Prima de mercado implícita | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Transacciones | SolarWinds (2025), Jamf (2025), 1E (2025) | 2025 |
| Cálculo | `calcular-empresa.mjs` | 20-oct-2026 |
| Precio de hoy | `precios.mjs TMV` | 20-oct-2026, 12:11 UTC: 6,99 EUR en sesión (cierre del 19-oct: 7,01) |
| Revisión a 12 meses | `apuntar-12m.mjs teamviewer-2026-10-20` | Cierre del 19-oct-2026 |
| Robustez | `robustez.mjs … --actual` | 20-oct-2026, 12:11 UTC (6,99 EUR) |
