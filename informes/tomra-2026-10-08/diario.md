# Diario — Tomra Systems (corte 2026-10-08)

- Commit de partida: `0dfbed7 Informe de DSV (Comprar, convicción media)`.
- Inicio: 09:20 (hora local; el reloj del sistema marcaba 09:27 al leer el procedimiento). Fecha de corte 2026-10-08; la sesión de Oslo del día 8 está abierta: se usa el cierre del 7.

## Fase 1 — Identificación (09:20-09:29)
- TOMRA Systems ASA, Oslo Børs (TOM), cuentas en **EUR** (moneda de presentación) bajo NIIF-UE; cotiza en NOK. Ejercicio a diciembre.
- Segmentos vigentes: Collection, Recycling, Food, Horizon y funciones de grupo.
- Último informe: 2T26 (17-jul-2026). Acciones emitidas 296.040.156, autocartera 339.778 → 295,70 M en circulación a 30-jun-26.
- Calendario (web de inversores): 3T26 el **23-oct-2026**; Capital Markets Day el **24-nov-2026**; 4T26 el 12-feb-2027.
- Guía 2S26: Collection 400-440 M ingresos; Food 340-360 M en 2026; capex 90-100 M; Horizon 45-50 M.
- DN/EBITDA 2,5x tras Clynk y la compra de minoritarios de Tomra Collection Australia.

## Fases 2-4 — subagentes (lanzados 09:30)
- A cuentas, B sector, C gobierno, D mercado. Cada uno con la regla de carpetas y su carpeta temporal `%TEMP%\analisis-inversion\tomra-<letra>`.
- Mientras: descargada la hoja de Damodaran (última fila, oct-2026: ERP con payout sostenible 4,20 %; la de 3,70 % es la T12m sin ajustar).
- 09:40 (control de los 10 minutos): A 6,8 KB, C 1,3 KB, D 18 KB y cinco `bolsa-*.json`; **B vacío** (155 bytes): recordatorio con SendMessage. B guardó a las 09:41.
- A terminó hacia las 09:49 (74 llamadas): cuentas 2022-2025 en EUR (2022 convertido de NOK), 7 trimestres, Collection por tipo de ingreso (venta 287,3 / servicio 165,5 / arrendamiento y throughput 164,9 / material 122,8 M en 2025), EBITA por división 2023-2025, pedidos y cartera. Reanudado con SendMessage para completar 2021 desde el informe anual 2022 (NOK) y verificar el rating: **Scope bajó a BBB+ el 3-jun-2026** (D traía el A- de 2025, ya no vigente). Cerró a las ~09:58.
- C terminó hacia las 09:50 (62 llamadas): Latour 21,08 % y presidente del consejo (su CEO); 36-42 % en contra de la remuneración en 2024-2026 (≈53 % del capital libre); posición corta 3,59 %; CEO desde ago-2021 (no 2020); **no hay cambio de responsable en Food**: la novedad es que se estudia vender TOMRA Mining (Recycling) y que Recycling tuvo tres jefes en 2025.
- D terminó hacia las 09:58 (92 llamadas): cierre oficial del 7-oct 92,95 NOK = 8,677 EUR (BCE 10,7120); betas frente a 5 referencias; Bund 3,55 %; consenso MarketScreener (6 analistas) contrastado con el de la propia Tomra (9 casas); 8 comparables; solo 2 transacciones con EV/EBITDA.
- B terminó a las ~10:02 (90 llamadas, el más lento): tabla de 24 mercados de depósito, curva tras el pico (nuevos mercados 20 % → 13 % de Collection y Collection −4 % en 2025), Envipco, Bühler, JBT Marel, Steinert; cuota mundial sin fuente primaria.

## Integración, cálculo y redacción (10:00-10:13)
- Modelo propio por división en `supuestos.mjs` (Collection, Recycling, Food, Horizon, funciones de grupo, con EBITA y depreciación dentro del EBITDA). 2026e fijado por la guía: 1.477 M (+12,1 %), EBITDA 259 M (17,6 %). 2027e +11,3 % con el Reino Unido; 2029e +4,6 % (hueco tras el pico); 2030e +6,2 % (PPWR). EBITA del grupo hasta 16,5 % (ambición de la dirección: 18 %). Frente al consenso: EBITDA −2,3 / −11,2 / −5,7 % en 2026-2028.
- WACC 8,26 %: Bund 3,55 %, **beta 1,10** (punto medio entre la ajustada local, 0,96 frente al OSEBX, y la europea sectorial en EUR, 1,20; la del STOXX 600 amplio en EUR, 1,42, está inflada por la corona), prima 5,5 %, deuda 4,5 % (BBB+), 21,7 %. Terminal 2,5 %. **Sin etapa 2**: ROIC 9,8 % frente a WACC 8,26 % (1,5 puntos, no 5) y ROIC incremental −1,1 %; el pico es temporal (2024 → 2025).
- Suma de partes por EBITA 2027e: Collection 14x, Recycling 13x, Food 11x, Horizon a una vez ventas, funciones de grupo 12x → 8,86 EUR.
- Resultado: DCF 8,70 (+0,3 %); escenarios 5,74 / 8,70 / 11,27 (25/50/25); comparables 13,72; suma de partes 8,86; **objetivo 9,45 EUR (101,23 NOK), +8,9 %, RT 11,2 %, asimetría 0,88** → regla absoluta Mantener; relativa (prima 4,20 %) Comprar con 11,42 EUR y RT 33,9 %. Manda la relativa: **Comprar, convicción baja** (el precio descuenta nuestro caso base; la diferencia es de tasa; gobierno débil y cortos al 3,59 %).
- DCF inverso: crecimiento 5,3 % (base 5,4 %), margen 22,9 % (base 23,0 %), rentabilidad implícita 8,3 %.
- Controles: 13 correctos y 4 explicados, ninguno en «Revisar». 67 fuentes (42 primarias), 3 sin citar. Cobertura 93,3 %, 28 gráficos, 58 páginas, sin avisos. Síntesis de 644 palabras; cifras de la síntesis cotejadas con la portada (corregido 101,2 → 101,23 NOK).
- Correcciones tras la primera generación: los segmentos de A desaparecían porque `negocio.segmentos` de B (solo descripciones) los sustituía entero; se fusionan en `propio.mjs`. Funciones de grupo con ingresos a 0 (salía un margen del 2.816 %). Retirados de las notas los nombres de campo y las comillas invertidas que se imprimían en el anexo de huecos y en `financieros.ajustes`. Quitados los cambios de perímetro de c-trace y CLYNK (≤3 % del activo): anulaban Altman y Beneish de 2025.

## Revisión de comité (resumen)
1. Convergencia: no hay convergencia con nuestra tasa (el precio ya es nuestro DCF); la hay con la del mercado (11,53 EUR). Lo dice la síntesis y por eso la convicción es baja.
2. DCF inverso: ni exigente ni conservador; exactamente nuestro caso base, que ya está por debajo del consenso.
3. Supuesto más agresivo: EBITA de Collection del 19 % desde 2028 con mercados nuevos de menor margen (17,0 % en 2025).
4. Consenso: −11,2 % de EBITDA en 2027 (Reino Unido), explicado en crecimiento y márgenes.
5. Comparables frágiles (compounders frente a fabricantes): 15 % de peso.
8. Bajista verosímil: combina tres cosas que ya pasaron por separado (−33,8 %).
9. Dato crítico: la beta (1,10 frente a 1,20: el DCF baja a 7,76) y el tamaño del Reino Unido.

## Fallos del sistema
1. **`integrar.mjs` sustituye listas enteras**: B escribió `negocio.segmentos` solo con descripciones y borró la historia de A sin aviso; el informe salió sin gráficos de segmentos. Arreglo: fusionar las listas de segmentos por `nombre` (campo a campo) o avisar cuando una nota sustituye una lista con números por otra sin ellos.
2. **Los nombres de campo y las notas de trabajo de los subagentes se imprimen en el anexo de huecos** («extra.drs», «cuota_pct», «no al alcance de este subagente», «pedido en el encargo»). Arreglo: que `integrar.mjs` avise de cadenas con guion bajo, comillas invertidas, «subagente», «encargo» o «extra.» fuera de `notas_integrador`; y decirlo en `prompt-de.mjs`.
3. **Cambios de perímetro pequeños anulan Altman y Beneish**: A declaró c-trace y CLYNK (≤3 % del activo) y el motor marcó 2025 como no interpretable. Arreglo: umbral de materialidad (p. ej. >10 % del activo o de las ventas) en el prompt o en el motor.
4. **Segmento de funciones de grupo con ingresos negativos casi nulos**: el motor imprime un margen del 2.816 %. Arreglo: no calcular margen cuando los ingresos del segmento son menores que el 1 % de los del grupo.
5. **B tardó 32 minutos y no guardó hasta el recordatorio de los 10 minutos.** Arreglo: en el encargo, «primer guardado antes de la llamada 10» (como en DSV) y no «a los 10 minutos».
6. **Rating contradictorio entre subagentes** (A: BBB+ de jun-2026; D: A- de 2025). Arreglo: en `lecciones.md`, «Noruega: Scope califica a emisores nórdicos; el último comunicado manda; buscar en NewsWeb/Cision»; y que el integrador cruce los campos que dan dos notas.
7. **Parchear `propio.mjs` desde un heredoc perdió las barras de una expresión regular** y la integración falló una vez (y las citas de B se tradujeron mal hasta corregirlo). Ya estaba en lecciones («scripts con Write, no con heredocs»); arreglo: que `integrar.mjs` valide que las citas de cada texto llevan letra de nota cuando vienen de `propio`.
8. **La herramienta de cierre de Yahoo no trae el 7-oct en Oslo**: D tuvo que ir a Euronext para el cierre oficial. Arreglo: `bolsa.mjs` podría aceptar `--precio` manual y citarlo aparte.
- Fin: 10:15. Tiempo total ≈ 55 min (09:20-10:15).

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Tomra - 2026-10-08 v2.docx` y su PDF. Mismo precio (92,95 NOK, 8,68 EUR) y fecha de corte. No se tocan supuestos del DCF: solo `dcf.sostenibilidad`, dos párrafos de la síntesis, los niveles en el texto y un control explicado.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Baja | Comprar · Baja |
| Valor objetivo (WACC 8,26 %) | 9,45 EUR (101,23 NOK), RTE 11,2 % | igual |
| Con la prima del mercado (4,20 %, WACC 7,14 %) | 11,42 EUR (122,33 NOK), RTE 33,9 % | igual |
| Regla absoluta / relativa | Mantener / Comprar | Mantener / Comprar |
| Comprar por debajo / vender por encima | 9,65 / 12,54 EUR (103,35 / 134,33 NOK) | **9,19** / 12,54 EUR (**98,39** / 134,33 NOK) |
| Sostenibilidad del crecimiento | — | **En parte** (6,1 % proyectado; financiable al ROIC actual: 2,0 %) |

- **Puente 2026e-2030e** (estimación propia; Tomra no separa volumen y precio): volumen 11 / 9,5 / 4 / 2,5 / 4 puntos (Polonia, Reino Unido, hueco tras el pico, PPWR), precio 2 puntos al año (indexación de servicio y throughput), divisa −1 en 2026e (Collection +12 % frente a +15 % a tipo constante en el 1T26). **`mercado_final: null`**: `competencia.cuota_pct` es null y la serie del sector es solo venta de RVM en USD, sin el servicio ni el material que sí cuentan en los ingresos de Collection.
- **La prueba de reinversión salta**: la proyección reinvierte el 20 % del NOPAT, que al ROIC del 9,8 % financia un 2,0 % de crecimiento; supone que el capital nuevo rinde un 39,3 % (ROIC incremental histórico: −1,1 %) y que el ROIC llega al 18,2 % en 2035e, por encima del máximo de la serie (15,0 % en 2021). Casi todo es margen (EBIT del 11,0 % al 15,8 %) sobre el capital ya invertido en 2024-2025.
- **No se recorta el base** y la síntesis lo explica: el margen queda por debajo de la ambición de 2030 y del consenso, y con el ROIC topado en el 15 % (−2,7 puntos de margen desde 2028e, cálculo aparte en el scratchpad) el DCF bajaría a 6,48 EUR, cerca del bajista (5,74). Es la cifra que justifica la convicción baja, ahora explicada en la síntesis (control nuevo «La síntesis explica la convicción»).
- **El nivel de compra baja de 9,65 a 9,19 EUR** por la regla nueva del motor (un Comprar solo relativo exige ≥ 5 % con nuestro coste de capital), no por la sostenibilidad. Corregido en «Qué cambiaría la decisión» y en `cambiaria_recomendacion`.
- Revisión de comité, pregunta 3: el supuesto más agresivo sigue siendo el margen (EBITA de Collection del 19 % desde 2028e), y la prueba lo confirma por la vía del capital.
- Controles: 15 correctos y 4 explicados. Word sin avisos, cobertura 89,9 %; PDF de 1,5 MB.

**Fallos del sistema vistos**
1. **La prueba de reinversión no separa margen de capital nuevo**: atribuye al capital nuevo toda la subida del NOPAT, también la recuperación de margen sobre el capital existente. En empresas con el ROIC deprimido (Tomra: 9,8 % frente a 15,0 %) el 39,3 % exagera. Arreglo: dar también el ROIC del último año proyectado frente al máximo histórico (aquí 18,2 % frente a 15,0 %), que es la comparación que se entiende.
2. **Los niveles cambian con la versión del motor** sin aviso: los textos de la v1 citaban 9,65 EUR y `rellenar` no lo detectó. Arreglo: que `rellenar` o el motor avisen si un texto cita un precio de compra o venta distinto de `calc.recomendacion.niveles`.
3. **Sin `cuota_pct` la prueba de cuota desaparece en silencio**: el motor no avisa de que falta. Arreglo: un control «Prueba de cuota no calculable» que exija decirlo en la justificación.

- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 14,08 EUR (150,8 NOK), rentabilidad 64,6 %, señal Comprar (`revision-12m-2026-10-13.md`).

## Actualización v3 (13 oct 2026): caso base al crecimiento financiable

Sin investigación nueva. Script: `notas/actualizacion-v3.mjs` (parte de `datos-v2.json`), salida `datos-v3.json`, `Tomra - 2026-10-08 v3.docx` y su PDF. Mismo precio (92,95 NOK, 8,68 EUR) y fecha de corte. Lectura prudente de la sostenibilidad, decidida por el usuario: la v2 dejó la prueba de reinversión fallando y lo explicaba en la síntesis; ahora el caso base se rebaja.

| | v2 | v3 |
|---|---|---|
| Recomendación · convicción | Comprar · Baja | **Mantener** · Baja |
| Valor objetivo (WACC 8,26 %) | 9,45 EUR (101,23 NOK), RTE 11,2 % | **8,10 EUR (86,77 NOK), RTE −4,3 %** |
| Con la prima del mercado (4,20 %, WACC 7,14 %) | 11,42 EUR (122,33 NOK), RTE 33,9 % | 9,74 EUR (104,34 NOK), RTE 14,6 % |
| Regla absoluta / relativa | Mantener / Comprar | Mantener / **Mantener** |
| Comprar por debajo / vender por encima | 9,19 / 12,54 EUR (98,39 / 134,33 NOK) | 7,90 / 11,05 EUR (84,60 / 118,35 NOK) |
| DCF · bajista / alcista | 8,70 · 5,74 / 11,27 EUR | 6,49 · 3,90 / 11,27 EUR |
| Crecimiento medio proyectado · financiable al ROIC actual | 6,1 % · 2,0 % | 6,1 % · 2,4 % (3,6 % al ROIC del 15 %) |
| Capital nuevo · ROIC de 2035e | 39,3 % · 18,2 % | 28,4 % · 15,1 % |
| Margen EBITDA de 2035e | 23,0 % | 20,3 % |
| Sostenibilidad | En parte (base por encima de lo financiable, explicado) | En parte (base dentro de lo financiable) |

- **Qué cambió**: solo el margen EBITDA del caso base, de 2027e en adelante (21,2 / 22,3 / 22,6 / 22,8 … 23,0 % → 19,5 / 19,8 / 20,0 / 20,1 … 20,3 %). 2027e recupera solo lo identificable (los 13 M de reestructuración de Recycling de 2026 no se repiten y los 16 M de ahorros tienen efecto pleno [4]); después sube despacio hasta un 20,3 %, entre el 19,7 % de 2025 y el 22,1 % de 2021 (EBITA del 13,8 % frente al 13,2 % de 2025). Es el margen con el que el ROIC de 2035e queda en el máximo de la serie 2021-2025 (15,0 % en 2021).
- **Por qué el margen y no el crecimiento**: el exceso de la v2 venía de subir el EBIT del 11,0 % al 15,8 %, no del volumen. El crecimiento (6,1 % de media; 5,4 % en 2027e-2035e) no se toca: 2026e es la guía (fijo) y, al ROIC del 15 %, la reinversión (24 % del NOPAT) financia un 3,6 % anual, que con los 2 puntos de precio del puente cubre el 5,4 %.
- **El control de capital nuevo sigue saltando (28,4 %) y queda explicado**: la prueba atribuye al capital nuevo toda la subida del NOPAT (de 110 a 236 M). Si los 1.121 M de capital de 2025 vuelven al 15 % de 2021 dan 58 M más, y los 443 M de reinversión al mismo 15 %, unos 67 M: es la vuelta del capital de 2024-2025 a su rendimiento histórico, no un base optimista. La prueba frente al incremental (−1,1 %) no se puede pasar con ningún margen razonable.
- **Escenarios**: el alcista se deja igual que en la v2 (son las ambiciones de la dirección: margen EBITDA final del 24,5 %), con un perfil por año que compensa el recorte; el bajista sigue dos puntos por debajo del base y baja a 3,90 EUR (−55,1 %).
- **La señal cambia de Comprar a Mantener**: con nuestro WACC la rentabilidad pasa al −4,3 % y con la prima del mercado al 14,6 %, a 0,4 puntos del umbral de compra. El DCF inverso ya no paga nuestro base: el precio descuenta un margen del 22,9 % (o una rentabilidad del 7,2 %).
- Textos reescritos: síntesis entera (812 → 649 palabras), tesis, visión diferencial, `cambiaria_recomendacion`, `dcf.justificacion.margenes`, `wacc` y `terminal`, `dcf.lectura`, justificación de la sostenibilidad, narrativa del base, comentarios de escenarios y valoración, efectos en valor de seis riesgos, pregunta 1, comparables y dos controles explicados (capital nuevo y consenso: EBITDA un 18,3 % y un 16,3 % por debajo en 2027e-2028e).
- Controles: 16 correctos y 6 explicados. Word sin avisos, cobertura 89,9 %; PDF de 1,5 MB.

**Fallos del sistema vistos**
1. **La suma de partes no sigue al DCF**: usa el EBITA por división de 2027e como dato de entrada (244 M), que ya no cuadra con el base recortado (214 M); con el mismo recorte bajaría a ≈ 7,5 EUR y el objetivo a ≈ 7,9 EUR. Se dice en el comentario de valoración. Arreglo: que el motor avise si la suma de las métricas de la suma de partes se aleja más de un 5 % del EBITA del DCF del mismo año.
2. **El techo de la prueba de capital nuevo es inalcanzable con un incremental negativo**: el motor toma el máximo entre el ROIC actual y el incremental (9,8 %), ×1,25, o el WACC + 5; con el capital de 2024-2025 sin rendir, ni un margen plano lo pasa. Arreglo (ya apuntado en la v2): comparar el ROIC del último año proyectado con el máximo histórico.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio) rehecha con el informe v3: objetivo 12,49 EUR (133,8 NOK; ponderado 25/50/25; base 9,92 EUR, +16,6 %), rentabilidad +46,2 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +46,2 % → +32,0 %, base +16,6 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v4.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 55.4x, mínimo 34.3x, media larga 60.1x; antes v2 37.5x/35.2x/39x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v4.json y «Tomra - 2026-10-08 v4.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 46,2 % (antes v3 Mantener 72,3 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 19,1x / 22,5x / 29,3x, 32,0 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 72,3 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
