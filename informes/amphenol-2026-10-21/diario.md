# Diario: Amphenol (APH), análisis value completo, corte 21-oct-2026

- Commit de partida: `04b3e90` (04b3e9075d886e8c43eaa5a3c6fc7e27b0387820, «Kainos: análisis value completo 21-oct…»). Checkout compartido con otros análisis: sin git pull, commit ni push en esta tarea.
- Inicio ≈ 15:50 UTC del 21-oct-2026; fin ≈ 16:25 UTC.
- Primer análisis de Amphenol en el repo (no había informe anterior).

## Decisiones

1. **Split 2×1 del 2-sep-2026**: todas las cifras por acción en acciones de hoy (BPA ajustado de 2025: 3,34 publicado → 1,67). Factores en la cuenta XBRL: ×8 en 2016-2018, ×4 en 2019-2021, ×2 en 2022-2025 (BPA, DPA y acciones diluidas).
2. **Base del BPA**: la ajustada de la empresa en la historia del PER, los casos y el consenso (comprador en serie: misma base en todo). El ajustado de Amphenol no quita la amortización de intangibles; quita revalorización de existencias compradas, gastos de compras y partidas fiscales discretas. El DCF resta 0,5 puntos de margen por los gastos de compras que se repiten.
3. **Sin ficha de sector**: no hay ficha de conectores en `sectores/` y esta tarea no puede escribir fuera de su carpeta; el perímetro (Bishop & Associates), las cuotas y los comparables van en la nota B. Queda pendiente hacer la ficha corta de conectores e interconexión.
4. **Resultados del 3T26 (28-oct-2026)**: salen después del análisis; no se incluyen. Se usa la guía del 3T26 (ventas 9.300-9.400 M; BPA 0,70-0,71).
5. **Comparables** con datos de Yahoo de la sesión del 21-oct (casi iguales al cierre del 20-oct). Molex no cotiza; Hirose y Yageo excluidos (ver nota D).
6. **Etapa 2 del DCF**: no se usa (con ella el valor apenas cambia: 40,17 frente a 39,47 USD).
7. **mercado_final = null**: la cuota de Bishop es solo de conectores; Amphenol vende además sensores y antenas. La prueba de sostenibilidad se hace a mano (veredicto Sí; el motor también da Sí).
8. **Escenario bajista = digestión de la IA** con `perfil` en 2027e-2028e (crecimiento −12 y −15 puntos, margen −3 y −4) para no convertir una pausa en una pérdida permanente.
9. **Controles explicados**: capitalización (acciones diluidas frente a acciones en circulación), caja proyectada (CCS y el salto de las ventas) y crecimiento del BPA desde 2025 (dos tercios ya están en el 1S26 real y en la guía).
10. Regla 13: veredicto «no cambia» (subida del 25 % en 12 meses en línea con el BPA; las caídas de enero, febrero y abril-mayo de 2026 fueron del sector de IA o de la guía, sin hechos propios negativos).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2016-2025 | `herramientas/cuentas.mjs --sec APH` (XBRL de la SEC, CIK 820313) | 10-K 2025 (31-dic-2025, presentado el 11-feb-2026) |
| Balance, LTM, trimestres | 10-Q del 2T26, notas de resultados 1T24-2T26 | 30-jun-2026 (10-Q del 31-jul-2026) |
| Guía | Nota de resultados del 2T26 y conferencia | 29-jul-2026 |
| Split y dividendo | 8-K | 6-ago-2026 / 2-sep-2026 |
| Precio, beta, cierres | `herramientas/bolsa.mjs` (Yahoo) | Cierre del 20-oct-2026 (79,32 USD) |
| Movimiento (regla 13) | `herramientas/movimiento.mjs APH` | 21-oct-2026 |
| Consenso y comparables | Yahoo quoteSummary (`notas/yahoo-datos.mjs`) | 21-oct-2026, 15:55 UTC |
| Directivos | `herramientas/form4.mjs` (Form 4) | 21-oct-2025 a 21-oct-2026 |
| Consejo y remuneración | Proxy DEF 14A 2026 | 8-abr-2026 |
| Tasa libre | Tesoro de EE. UU. (curva diaria) | 20-oct-2026 (5,12 %) |
| Prima de mercado | Damodaran, ERPbymonth | Octubre de 2026 (4,20 %) |
| Mercado de conectores | Bishop & Associates (titulares) | 2024 y 2025 |
| Sentimiento | Seeking Alpha, Stocktwits, MarketBeat, Motley Fool | Junio-octubre de 2026 |
| Cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 21-oct-2026 |
| Precio de la decisión | `herramientas/precios.mjs APH` | Cierre 20-oct (79,32); sesión 21-oct 79,71 (≈ 16:20 UTC) |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs amphenol-2026-10-21` | 21-oct-2026 |
| Robustez | `herramientas/robustez.mjs` (cierre) y `--actual` | 20-oct-2026 y 21-oct-2026 16:21 UTC |

## Resultado

Mantener (regla v3: ponderada 3,3 %, base 13,5 %; v2 13,5 %). Valor intrínseco 41,45 USD frente a 79,32. Robustez: SÓLIDA, acción robusta «No mantener» (no comprar), límite común 41,45 USD. Con la sesión del 21-oct (79,71): ponderada 2,8 %, base 13,0 %.
