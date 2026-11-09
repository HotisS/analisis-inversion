# Diario · Neurocrine Biosciences (NBIX) · 9-nov-2026

- Commit de partida: 7810b25 («Escáner 9-nov 9:00: revisiones (Kainos, GEA, ASPEED), calendario y precios»). `git pull --ff-only` dio «Cannot fast-forward to multiple branches» (configuración del clon); `git fetch` confirmó que main ya estaba al día con origin/main. Sin commits ni push (los hace el coordinador).
- Petición de Hotis (9-nov, 9:32 Madrid): rehacer el informe de Neurocrine porque el anterior (`informes/neurocrine-2026-10-15`) es anterior a los resultados del 3T26 (publicados el 2-nov-2026 tras el cierre, 10-Q del mismo día). Iteración nueva en carpeta nueva; la anterior no se toca.
- **Empresa fijada por Hotis hasta el 15-ene-2027** (compra del 15-oct, regla 12: no se toca en 3 meses salvo hecho nuevo y duro). Con el precio de hoy (≈ 164,63 USD) la señal de cartera con el informe viejo daba «Vender» por precio. La señal de este informe se da tal cual sale del método; la decisión de vender o no la toma Hotis con la regla 12.
- Fecha de corte 2026-11-09 (lunes, antes de abrir EE. UU.): precio = cierre del viernes 6-nov, 164,63 USD (bolsa.mjs y movimiento.mjs). USD, US GAAP, ejercicio natural, mismo ticker NBIX.
- Entorno: nube de Claude Code, sin herramienta Agent: fases A-E hechas por mí con un `construir-notas.mjs` nuevo. En la primera pasada (09:34-09:48) partí de las notas del informe anterior y actualicé lo que cambió con el 3T26; el coordinador lo rechazó (Hotis exige el procedimiento entero: el informe anterior solo es punto de partida) y en la segunda pasada (09:49-10:02) rehíce B, C y E desde los documentos y comprobé cada cifra heredada de A contra el XBRL y las notas de resultados.

## Tiempos (hora de Madrid)
- 09:34 lectura de CLAUDE.md, METODO-VIGENTE.md, MEMORIA.md, analiza-empresa.md, prompt.md, lecciones y EE. UU.
- 09:35 cuentas.mjs --sec NBIX (XBRL de la SEC: anuales sin cambios frente al informe anterior).
- 09:37 EDGAR: 8-K 2.02 del 2-nov (nota de resultados del 3T26) y 10-Q del 3T26 descargados.
- 09:39 movimiento.mjs y bolsa.mjs: 164,63 USD (6-nov); +13,4 % el 3-nov tras los resultados.
- 09:40 consenso tras el 3T26 (Yahoo quoteSummary: BPA ajustado 10,56 / 12,09; objetivo 208,11 de 28), Tesoro a 10 años 4,86 % (6-nov), prima de Damodaran de noviembre 4,41 %, Form 4 (77,4 M de ventas en 12 meses, todas 10b5-1; tras el 15-oct solo Morrow 2,3 M), 13G de Vanguard, Stocktwits y Seeking Alpha, STAT del 13-oct (VYKAT XR), comparables de Yahoo.
- 09:41 notas A-E puestas al día (`notas/construir-notas.mjs`): LTM sep-26, 3T26, guía, balance de septiembre, gobierno, consenso, comparables, sentimiento.
- 09:43 supuestos, propio y textos; integrar.mjs y primer cálculo.
- 09:44 robustez previa; regla 13: bolsa.contexto escrito (veredicto «no cambia»).
- 09:47 cálculo final (17 de 19 controles y 2 explicados), Word (25 gráficos, cobertura 89,7 %) y PDF con soffice (45 páginas).
- 09:48 revision-12m-2026-11-09.md; apuntar-12m.mjs (y --precios, con flock); robustez.mjs; comprobar.mjs: ningún ERROR de NBIX (los 3 ERROR C1 son de Aon, ICE y Daiichi, análisis paralelos sin apuntar aún; aviso C10: simbolos.json apunta a la carpeta vieja de NBIX).

- 09:49 segunda pasada por orden del coordinador. EDGAR: submissions de Teva, Crinetics, Spruce, Vertex, J&J, Xenon y Bristol-Myers.
- 09:50 B: 8-K de Crinetics del 1-sep (cierre de la fusión con Vertex) y del 6-jul (85 USD por acción, 10.000 M); nota del 3T26 de Teva (AUSTEDO 751 M, +21 %; 727 M en EE. UU.; previsión 2026 subida a 2.550-2.650 M; acuerdo de nación más favorecida en octubre).
- 09:51 B: 3T26 de Vertex (PALSONIFY 40-50 M en 2026, beneficio operativo 712,9 M), datos suplementarios de J&J (CAPLYTA 398 M, +66 %), 2T26 de Crinetics, Xenon y Spruce (Xenon y Spruce aún no han publicado el 3T; Spruce ya no tiene programas de CAH); 3T26 de Bristol-Myers (COBENFY 57 M).
- 09:52 B: tamaño de mercado con dos informes (Global Market Insights 5.400 M en 2025; Market.us 3.600 M en 2024) frente a las cuentas; notas del 4T24 y 4T25 de Teva (AUSTEDO EE. UU. 1.225 / 1.642 / 2.217 M en 2023-2025). 10-Q del 3T26: ANDA de Alvogen contra VYKAT XR (sep-26) y excepción IRA confirmada en ene-26.
- 09:52-09:55 C: proxy 2026 releído (13,45 M del consejero delegado, ratio 49:1, propiedad a 31-mar), 8-K de nov-25, may-26 y sep-26, juntas de 2024 y 2025, 13G de JPMorgan (oct-26) y de las dos filiales de Vanguard, Form 3 de Roberts, Form 4 de 12 meses otra vez (82 presentaciones, 77,4 M, todo 10b5-1) y 15 notas de resultados de 2023-2026 para la historia de guía.
- 09:54-09:57 E: Stocktwits (API), canal de Seeking Alpha y sus tres artículos del 3T, Stocktwits News, stock3, Motley Fool y la transcripción del 3T26 (Mitrade); Reddit da 403.
- 09:56-09:57 A: cuenta y flujos 2021-2025 contra el XBRL (iguales), caja del balance = efectivo + valores disponibles para la venta (cuadra todos los años), ventas por producto 2023-2025 contra las notas del 4T, recompras contra el XBRL.
- 09:57-10:01 notas B, C, E y textos rehechos; construir-notas, integrar, calcular (17 de 19 y 2 explicados), Word y PDF (50 páginas).
- 10:01-10:02 apuntar-12m.mjs (y --precios, con flock), robustez.mjs y comprobar.mjs (0 errores).

## Qué cambió en la segunda pasada
- **Mercado (B)**: la serie pasa a ventas en EE. UU. con las cuentas de Teva (2023 3.061 M, 2024 3.956 M, 2025 4.731 M, 2026e ≈ 5.468 M; TCAC 2023-2025 del 24,3 %). Antes: 4.774 M en 2025 con AUSTEDO global de Zacks y 2026e 5.387. Cuota de INGREZZA 53,1 % (antes 52,7 %); en el 3T26 52,4 %. AUSTEDO creció más que INGREZZA en el trimestre (+21 % frente a +17 %).
- **Competencia (B)**: nuevos Vertex/Crinetics (atumelnant en CAH, compra cerrada el 1-sep), J&J (CAPLYTA, referencia para osavampator), Bristol-Myers (COBENFY, referencia para direclidina) y Xenon; Spruce descartado porque abandonó la CAH. Amenaza de entrada de Porter de 2 a 3. Nueva amenaza: ANDA de Alvogen contra VYKAT XR. Fuentes de B: de 10 a 24 (15 primarias).
- **Gobierno (C)**: historia de guía corregida (2023 empezó en 1.670-1.770 M, no 1.750-1.800; 2024 se subió dos veces, no «se subió y luego se rebajó»); el director médico saliente estuvo 16 meses (no 15) y su salida fue pactada; Vanguard ya no declara como The Vanguard Group (0 acciones) sino con dos filiales (10,2 % en total); JPMorgan 5,30 M a 30-sep; voto de remuneración más bajo de las tres últimas juntas 91,0 % a favor y 7,1 % en contra (2025), antes 93,2 / 6,7 (solo 2026); cambios en la cúpula en 24 meses 0 (antes 1: Gano llegó en oct-2024, fuera del plazo). Fuentes de C: de 9 a 22.
- **Sentimiento (E)**: el informe anterior atribuía 30 comentarios a Seeking Alpha y 8 a stock3 que no se ven al abrir las páginas; ahora 1 y ninguno. Añadidos los tres artículos con su tesis, Motley Fool y la transcripción: el director financiero atribuye unos 20 M de INGREZZA del 3T26 a pedidos adelantados (crecimiento subyacente ≈ 14 %) y retrasa la vuelta al crecimiento de VYKAT XR. Fuentes de E: de 4 a 9.
- **Cuentas (A)**: sin cambios; todas las cifras heredadas cuadran con el XBRL y las notas de resultados.
- **Valoración**: sin cambios (ninguna cifra de B, C o E entra en el BPA, el PER ni el DCF): v3 40,6 % / 35,1 %, valor intrínseco 158,89, filtro de mantener 186,93.

## Decisiones
- Base del BPA: **publicado normalizado** en historia y escenarios (H1 casa): dentro pagos en acciones y amortización de VYKAT XR; fuera costes de Soleno (125 M en nueve meses), ajuste de existencias a valor razonable (159 M pendientes, normalizado en 2027-2028), variación de valor de participaciones; I+D adquirida a 25 M/año.
- Hoja de producto rehecha con el 3T26: 2026e 3.985 M (consenso 3.991), 2027e 4.610 M (consenso 4.582) con precio neto de INGREZZA −6 % en 2027 («un dígito medio o alto», dirección, 2-nov) y volumen de dos dígitos; VYKAT XR 460 M en 2027 (antes 400) y 530 M en 2028 (antes 470).
- Acciones diluidas 104,8 M (101,2 M a 26-oct + 3,6 M de dilución del 3T26); 105,9 M en 2028 (contando la recompra anunciada pendiente de 174,2 M).
- Puente a 30-sep-26: caja 789,7 M, sin deuda, participaciones cotizadas 95,0 M.
- WACC 10,26 % (bono 4,86 %; antes 10,61 % con 5,21 %).
- Comparables de Yahoo al 9-nov (PER adelantado sobre BPA ajustado 2027), mediana 15,1x; en base publicada 18,8x.
- **Selector**: mediana adelantada 29,4 / PER actual 16,9 = 1,74 → v3 (en octubre 1,95 → v2). A menos de un 5 % de 1,8: v2 al lado (27,5 % / 22,8 %). El cambio de versión lo provoca la subida del precio.
- Convicción Baja (la sugerida: reglas del valor intrínseco discrepan, absoluta Vender y relativa Mantener).
- Empresa fijada por Hotis hasta el 15-ene-2027: la señal se da tal cual; con este informe, al precio de hoy, la señal de cartera ya no es Vender sino Mantener.

## Resultado
- **Línea 12 m**: v3, objetivo ponderado 231,53 USD → **+40,6 %**; base 222,46 → **+35,1 %**; bajista 154,66, alcista 326,55. v2 de control 27,5 % / 22,8 % (objetivo 209,98). **Regla: Mantener** porque el valor intrínseco (158,89 USD, −3,5 %) queda por debajo del precio. DCF 154,59 (WACC 10,26 %); DCF inverso 6,3 % frente al 5,2 % del base.
- Robustez: SÓLIDA; **si la tienes: Mantener** (filtro de mantener hasta **186,93 USD** = precio de venta para quien la tiene); **¿compra robusta?: no** (sin nivel; límite robusto v3 y v2 con BPA −10 % 158,88 USD; D6 CONFIANZA por el BPA +37 % anual desde 2025 y M6 aviso). Banda Vender de la regla: > 257,26 USD. Colchón de BPA para mantener 22 %.
- Cambio frente al 15-oct: el 3T26 batió (1.123 M frente a 1.040 M esperados) y subió la guía; BPA 2028 11,23 → 11,96; DCF 145,26 → 154,59; valor intrínseco 156,01 → 158,89. El precio subió un 21 % (135,91 → 164,63), más que el valor: se pasa de Comprar (robusta Mantener) a Mantener, y para quien la tiene de «Vender por precio» (con el objetivo fijo del informe viejo) a Mantener.

## Lección propuesta (para el coordinador)
- En una iteración tras resultados, el selector v3/v2 puede saltar solo por el precio (Neurocrine: 1,95 → 1,74 con +21 %): decirlo en la síntesis y en la revisión, y comparar con la v2 al lado antes de leer el cambio de señal como un cambio de la empresa.
