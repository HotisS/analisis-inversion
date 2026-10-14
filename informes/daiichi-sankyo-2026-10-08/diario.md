# Diario: Daiichi Sankyo (4568.T), corte 2026-10-08

- Commit de partida: `dd455d1 Informe de bioMérieux (Comprar, convicción baja)` (el repo no es un clon de git en esta copia: `git log` responde con ese commit).
- Inicio: 10:20 (Madrid) = 17:20 en Tokio. La sesión del 8 ya había cerrado, pero Yahoo aún no tenía el cierre del 8 a las 10:20: `bolsa.mjs` usa el del 7 (2.702,5 JPY). Volver a lanzarlo antes de cerrar.

## Fase 1. Identificación (10:20-10:32)
- Daiichi Sankyo Company, Limited. TSE Prime 4568, ISIN JP3475350009. NIIF. Cierre a 31 de marzo.
- **Etiqueta del ejercicio**: la empresa llama FY2025 al que va de abril de 2025 a marzo de 2026 (`etiqueta_ejercicio: "inicio"`). Los `cierres_ejercicio` de `bolsa.mjs` usan la misma etiqueta (FY2025 = cierre 31-mar-2026).
- Último informe: 1T FY2026 (abr-jun 2026), publicado el 31-jul-2026. Guía FY2026 subida: ingresos 2,34 billones JPY, beneficio operativo básico (*core*) 360.000 M, DPA 100 JPY.
- **Corrección de las cuentas de FY2025** publicada el 31-jul-2026: gastos generales sobrestimados en 29.000 M; *core OP* 360,0 → 388,9 mil M; beneficio atribuido 259,9 → 279,7 mil M. Es una señal de calidad contable y de gobierno.
- Venta escalonada de Daiichi Sankyo Healthcare a Suntory: 30 % cobrado el 1-jul-2026 por 73.950 M JPY; 40 % en jun-2027 (pérdida de control) y 30 % en jun-2029.
- Un solo segmento (Pharmaceutical Operation): `negocio.segmentos` por productos.
- Subagentes A-D lanzados a las 10:24.

## Corte por límite de uso (10:40-17:11)
- A las ~10:40 se paró todo por el límite de uso; D había terminado (D.json completo), B se había colgado a las 10:33 (sin progreso 600 s) y A y C estaban a medias. Reanudados A, B y C con SendMessage a las 17:11 para que sigan desde sus notas.
- Mientras tanto (10:24-10:40) el analista: betas frente a cuatro índices, prima de Damodaran (4,20 % confirmada; Japón 5,14 % total con 0,91 de riesgo país), guía y plan FY2026-FY2030, revisión de FY2025 (153.000 M de gastos temporales: 75.700 CMO, 19.300 Odawara), retirada de la BLA de I-DXd (25-sep-2026), DESTINY-Lung04 positivo (17-ago-2026), catalizadores, preguntas y riesgos en borrador.
- 17:21 A, B, C y D terminados. Integración y cálculo.

## Integración, cálculo y redacción (17:11-17:31)
- Archivos del analista: `notas/propio.mjs` (importa `supuestos.mjs`, `textos.mjs`, `resumen.mjs`, `catalizadores.mjs`, `preguntas.mjs`, `riesgos.mjs`). Variantes del DCF fuera del informe con `%TEMP%\analisis-inversion\daiichi\variante.mjs`.
- **Decisión clave 1, ingresos diferidos**: el margen EBITDA del DCF excluye la amortización de pagos iniciales (65.100 M en FY2025; pasivos por contrato de 875.898 M), porque su caja ya está en el puente. Incluirla subiría el DCF un 13,5 % (3.358 JPY) y la recomendación pasaría a Comprar: es el supuesto que más mueve la conclusión.
- **Decisión clave 2, hitos de ventas**: los de Enhertu se acaban en FY2026 (93.800 M; el plan dice «no further sales milestones»). Ojo: los 186.700 M de la tabla de la presentación son lo cobrado hasta junio de 2026, no el total del contrato (lo corregí en el texto).
- **Decisión clave 3, prima de riesgo**: prima de mercado 4,23 % + prima país de Japón 0,91 % en `prima_adicional_pct` (total 5,14 %, Damodaran ene-26), como dice el prompt. Con 5,14 % en `prima_mercado_pct` y 0 de adicional (lo que hicieron Fanuc y Keyence), la regla relativa daba Comprar (22,1 %) porque se comía el riesgo país; con el criterio del prompt, las dos reglas dan Mantener.
- **Beta 0,92**: TOPIX (1305.T) 0,72 mensual / 0,76 semanal (Blume 0,81/0,84); Nikkei 225 (^N225) 0,32/0,51; 1321.T roto (0,08); TOPIX-17 farmacéutico (1621.T) 1,44 (mide el peso de Daiichi en el índice); IXJ 0,75 semanal en USD. Damodaran farmacéuticas Japón 0,98 desapalancada (1,07 corregida por caja), mundo 1,00. Elegida la media de la ajustada semanal frente al TOPIX y la sectorial.
- **Cartera no aprobada**: DCF solo con lo aprobado = 2.416 JPY (−18,3 %; 3 puntos menos de crecimiento en FY2027-FY2031 y 1,5 de margen desde FY2028).
- **Puente**: otros_ajustes −289.400 = cobro de Daiichi Sankyo Healthcare (73.950 + VA de 172.550 al 3 %) + participaciones a valor razonable (50.291). Fuera: pasivos por contrato y la provisión a CMO (compensada en parte por 192.906 M de anticipos a esos fabricantes).
- Resultado: DCF 2.957,44 · comparables (PER) 2.749,56 · escenarios 2.977,24 · valor objetivo 2.888,64 (+6,9 %, total 9,8 %), asimetría 1,62. Regla absoluta y relativa: Mantener. Convicción media.
- Controles en «Revisar»: 3, explicados (tipo impositivo de FY2025; EBITDA frente al consenso en FY2026e y FY2027e).
- Word y PDF (65 páginas) a las 17:28; revisadas como imagen la portada, la síntesis, el resumen con «La decisión» y la síntesis de valoración.

## Tiempos
- Fase 1 e inicio: 10:20-10:24. Subagentes: 10:24-10:40 (corte por límite de uso) y 17:11-17:21 tras reanudarlos. Integración, cálculo, redacción y entrega: 17:11-17:31. Trabajo efectivo ≈ 40 minutos.

## Fallos del sistema
1. **Corte por límite de uso a mitad de análisis (10:40-17:11).** D había terminado; A y C, a medias; B, colgado desde las 10:33 («sin progreso en 600 s») antes incluso del corte. Arreglo: SendMessage a cada subagente con lo que falta funcionó bien porque guardaban por partes. Propuesta: que el comando diga explícitamente «tras un corte, reanudar con SendMessage y una lista de campos pendientes» y que cada subagente escriba al principio de su nota un `estado` (campos hechos y pendientes).
2. **Subagente colgado sin aviso (B, 10:33).** El vigilante lo marcó como fallido al cabo de 10 minutos sin progreso. Propuesta: comprobar las notas cada 5 minutos, no solo a los 10, y reanudar de inmediato.
3. **Riesgo país y regla relativa, criterio incoherente entre informes japoneses.** El prompt pide la prima país en `prima_adicional_pct`, pero Fanuc y Keyence la metieron dentro de `prima_mercado_pct` (5,14 %), con lo que su regla relativa usa 4,20 % sin riesgo país. Aquí cambia la recomendación (Comprar frente a Mantener). Propuesta: que el motor avise si `prima_mercado_pct` > 5 % y `prima_adicional_pct` = 0 en un país con prima país en Damodaran, y revisar Fanuc y Keyence.
4. **Ingresos diferidos sin campo propio.** El motor no tiene forma de restar del EBITDA del DCF los ingresos no monetarios (amortización de pagos iniciales de licencias) y hay que hacerlo a mano en el margen, lo que dispara el control «propio frente a consenso». Propuesta: campo `dcf.anios[].ingresos_no_monetarios_pct_ventas` (o `financieros.cuenta[].ingresos_diferidos_reconocidos`) que el motor reste del FCFF y explique en el control.
5. **Yahoo sin el cierre del día de corte.** A las 17:11 de Madrid (00:11 en Tokio del día siguiente) Yahoo tenía la fila del 8-oct con cierre nulo; `bolsa.mjs` usó el del 7. Propuesta: que la herramienta diga «fila presente con cierre nulo» y pruebe una segunda fuente (Stooq o la web de la bolsa).
6. **Índice con datos rotos (1321.T).** Beta 0,08 frente al ETF del Nikkei 1321.T; la herramienta avisó (< 0,2) pero no dijo por qué. Igual que el 1306.T de Fanuc: falta detectar saltos falsos por desdoblamientos.
7. **Avisos de «nota de trabajo» que no se ven en todos los campos.** El integrador detectó la palabra «subagente» en un hueco, pero no los nombres de campo en `huecos[].campo` («posicion_corta_pct», «insiders», «vs_consenso») ni «analista principal» en el editor de una fuente. Propuesta: ampliar la detección a nombres con guion bajo y a `fuentes[].editor`.
8. **Transacciones con un solo múltiplo.** En farmacia y biotecnología las compras de ADC no tienen EBITDA; el motor exige 3 con múltiplo y dibuja un gráfico vacío. Propuesta: admitir EV/ventas esperadas o marcar la sección como «solo referencia» sin aviso.
9. **Gráfico del mapa de comparables vacío** porque el proveedor gratuito no da EV/EBITDA de los próximos 12 meses. Propuesta: que el mapa use el PER de los próximos 12 meses cuando falte el EV/EBITDA.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Daiichi Sankyo - 2026-10-08 v2.docx` y su PDF. Mismo precio (2.702,5 JPY) y fecha de corte; no se cambia ningún supuesto del DCF.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Mantener · Media | Mantener · Media |
| Valor objetivo (WACC 7,30 %) | 2.888,64 JPY, RTE +9,8 %, asimetría 1,62x | igual |
| Con la prima del mercado (4,20 %) | 2.897,35 JPY, RTE +10,1 %, asimetría 1,66x | igual |
| Comprar por debajo / vender por encima | 2.585,33 / 3.307,49 JPY | igual |
| Sostenibilidad del crecimiento | — | **Sí** |

- **Puente por producto (FY2026e-FY2030e)**: el volumen (Enhertu y Datroway en indicaciones nuevas, menos Lixiana y American Regent) da +6,5 a +11 puntos al año; el precio, −1 punto al año (NHI −4,02 % sobre el 27,3 % de ventas en Japón); otros, +1,5 en FY2026e (yen e hitos) y −7 en FY2027e (fin de los hitos de ventas de Enhertu, ≈ 4 puntos, y salida de Daiichi Sankyo Healthcare, ≈ 3 puntos). Reparto volumen/precio: estimación propia.
- **mercado_final = null**: la cuota del 35,8 % es de dos productos (ventas combinadas con AstraZeneca) sobre la suma de ADC de cinco grupos; los ingresos del grupo no comparan con ese perímetro. A mano: ≈ 20.000 M USD de ingresos del grupo en FY2035e frente a 48.100 M USD de mercado de ADC previsto.
- **Veredicto «Sí»**: el base crece un 4,1 % anual, menos de la mitad del 10,4 % histórico y del 11,2 % previsto para el mercado, y ya incluye el fin de la exclusividad de Enhertu. No hay que bajar el base.
- La prueba de reinversión da «activos ligeros» (12 % del NOPAT) porque en farmacia el crecimiento lo compra la I+D, que va a resultados; dicho en la justificación.
- Se añade a «La recomendación y por qué» una frase sobre la convicción (control nuevo «La síntesis explica la convicción»); la frase obligatoria del veredicto va en «El negocio».

**Fallos del sistema vistos**
1. En farmacia (y en software) la prueba de reinversión mide capex y circulante, pero el crecimiento lo compra la I+D expensada: sale «activos ligeros» y no prueba nada. Arreglo: opción para sumar la I+D (o la parte de desarrollo) a la reinversión.
2. La cuota implícita divide los ingresos del grupo entre el mercado: no sirve cuando la cuota es de una línea de productos y, además, con ventas de un socio dentro (Enhertu combinado). Arreglo: un campo `ingresos_perimetro` en `mercado_final`.
3. El control «La síntesis explica la convicción» es nuevo y salta en un informe que no tocaba la convicción: cuenta la palabra, no el contenido.
4. Los avisos de `rellenar` (suma de partes vacía, mapa de comparables y transacciones sin datos) son los mismos de la v1.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 3.608 JPY, rentabilidad 36,4 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +31,9 % → +26,8 %, base +18,3 %, señal Comprar (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v3.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 46.1x, mínimo 23.2x, media larga 36x; antes v2 22.5x/18.3x/28.8x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
