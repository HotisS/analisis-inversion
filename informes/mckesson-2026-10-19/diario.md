# Diario: McKesson Corporation (MCK), corte 2026-10-19

- Commit de partida: a1f9540 (git log -1 al empezar, 11:43 UTC). Inicio: 12:19 UTC del 19-oct-2026.
- Encargo: análisis value completo desde cero (primera vez de McKesson en el repo; no hay informe anterior en informes/). Checkout compartido: sin git, sin tocar cola/MEMORIA/METODO/lecciones/seguimiento.
- Hecho a mano en la nube, sin subagentes (notas A-E escritas por `notas/construir-notas.mjs`; parte propia en `notas/propio.mjs`, `supuestos.mjs` y `textos.mjs`). Modelo de forma: classys-2026-10-19, applied-nutrition-2026-10-19 y cencora-2026-10-15 (mismo sector; ficha `sectores/distribucion-farmaceutica-2026-10-15.md`).
- 12:19 `cuentas.mjs --sec MCK` → `notas/cuentas-xbrl.json` (FY2017-FY2026, ejercicio a 31-mar, etiqueta «fin»).
- 12:24 `bolsa.mjs --accion MCK --indice SPY --sector XLV --corte 2026-10-19 --cierre-mes 3 --etiqueta fin` → `notas/bolsa.json` (la primera pasada sin `--etiqueta fin` etiquetaba los cierres de marzo con el año anterior; repetida). `movimiento.mjs MCK` → `notas/movimiento.txt` (aviso P2).
- 12:25-12:45 descargas a `notas/docs/` (10-K FY2026, 10-Q 1T27, notas de resultados FY2018-FY2026 y trimestres, resegmentación, día del inversor 2025, proxy y 8-K de la junta, 8-K del ciberataque, CFO, Option Care, Tesoro, Stocktwits y RSS de Seeking Alpha); `yahoo-datos.mjs` (consenso y comparables); `form4.mjs` (ventas de 28,3 M USD, ninguna compra). Fallaron (403/404/anti-bots) americanpharmaceuticalreview, bioxconomy, nasdaq, zacks y una página de MarketBeat: se usaron la transcripción de Fool, Pharmaceutical Commerce y otra página de MarketBeat.
- 12:47 notas A-E con `notas/construir-notas.mjs`; propio, supuestos y textos; integrar y calcular: 19 de 19 controles correctos tras dos arreglos (etiqueta del EBITDA del consenso, que no existe; número de analistas = suma de recomendaciones).
- 12:47 Word con `rellenar.mjs` (cobertura 88,8 %; avisos: suma de partes sin tabla, ESG sin calificaciones, regresión de comparables) y PDF con LibreOffice.
- 12:48 `apuntar-12m.mjs mckesson-2026-10-19`: v3 −9,8 % / base −0,5 % → Mantener (v2 −4,0 %). Símbolo MCK añadido a `simbolos.json`; `precios.mjs MCK`: 1.004,84 USD (16-oct). `robustez.mjs --actual`: SÓLIDA, acción robusta «No mantener».

## Decisiones

- **Base del BPA: la ajustada de la empresa** (la del consenso y la guía), como en Cencora; el GAAP lo deforman opioides, ventas de Europa y Rexall y plusvalías. La historia del PER se calcula en la misma base.
- **Ejercicio objetivo FY2029e** (cierra el 31-mar-2029, más de 18 meses tras el corte); PER actual = precio ÷ nuestro FY2028e.
- **Margen del DCF = EBITDA ajustado − 0,05 puntos** por reestructuración, litigios ordinarios y costes de separación que se repiten (≈ 150-250 M al año).
- **Puente**: deuda 9.729, caja 5.164, minoritarios 2.939 (con los rescatables de socios médicos y los preferentes de Apollo) y opioides después de impuestos 4.470 (5.658 × 0,79). Arrendamientos operativos fuera (US GAAP). Precision Medicine (2.250) y Option Care (1.400), pendientes, neutras.
- **Medical-Surgical (Wellverse) dentro del perímetro**: la separación no tiene fecha y no cambia el valor para el accionista.
- **ROIC**: el del motor no tiene sentido (capital invertido negativo); medida exigente a mano (resultado operativo ajustado × 0,81 ÷ inmovilizado + fondo de comercio + intangibles) = 27,9 %, ≈ +19 puntos sobre el WACC (8,43 %). Explicado en `controles_explicados`.
- **WACC**: beta de 0,70 (la ajustada mensual, 0,52, es baja para un negocio con deuda asimilada de opioides); peso de la deuda del 11 % con los opioides.
- **Regla 13**: veredicto «no cambia». La subida de un 21 % en tres meses (aviso P2) tiene causa en hechos (resultados del 1T27, guía subida, CVS hasta 2032, Option Care); no hay colocaciones ni ampliaciones; resultados el 4-nov-2026 con tendencia alcista (no retrasa).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales FY2017-FY2026 | `cuentas.mjs` (XBRL de la SEC) | 31-mar-2026 (10-K) |
| Balance, deuda, minoritarios, opioides | 10-Q del 1T FY2027 | 30-jun-2026 |
| BPA ajustado histórico | Notas de resultados FY2018-FY2026 | mayo de cada año (FY2026: mayo de 2026) |
| Guía FY2027 | Nota de resultados del 1T27 | 5-ago-2026 |
| Precio, rango, cierres de ejercicio, beta | `bolsa.mjs` (Yahoo) | cierre del 16-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs` | 16-oct-2026 |
| Consenso y comparables | `yahoo-datos.mjs` (Yahoo quoteSummary) | 16-oct-2026 |
| Comparables de la ficha | `sectores/distribucion-farmaceutica-2026-10-15-comparables.json`, escalados al cierre | 14/15-oct-2026 → 16-oct-2026 |
| Ventas de directivos | `form4.mjs` (Form 4 de la SEC) | 19-oct-2025 a 19-oct-2026 |
| Tasa libre | Tesoro de EE. UU. (curva diaria) | 16-oct-2026 (5,09 %) |
| Prima implícita | Damodaran, ERPbymonth | octubre de 2026 (4,20 %) |
| Noticias (CVS, Option Care, Precision, ciberataque, Apollo) | Notas de prensa y 8-K de la empresa | 1-jun a 6-oct-2026 |
| Sentimiento | Stocktwits, Seeking Alpha, MarketBeat | sept-oct 2026 |
| Precio para la revisión | `precios.mjs MCK` | cierre del 16-oct-2026 |
| Robustez | `robustez.mjs --actual` | 16-oct-2026 (sin sesión en curso cerrada) |

## Resultado

- Revisión a 12 meses: v3 −9,8 % ponderada / −0,5 % base → **Mantener** (convicción baja, en el filo de Vender: vender por encima de 1.007,34 USD). v2 −4,0 % / +5,4 %. Valor intrínseco 860,55 USD (−14,4 %). Comprar por debajo de 788,35 (límite robusto con BPA −10 %: 710,08).
- Robustez: SÓLIDA; acción robusta «No mantener». Calidad Q1: sostenibilidad «Sí» y ROIC − WACC ≈ +19.
- Fin: 12:50 UTC.
