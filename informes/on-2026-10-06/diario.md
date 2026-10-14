# Diario del análisis de On Holding AG (NYSE: ONON), fecha de corte 2026-10-06

Procedimiento: `/analiza-empresa` siguiendo `verticales/empresa/prompt.md` (versión 4 del prompt y del motor a partir de las 21:00). Resultado: **Mantener, convicción media**, valor objetivo 27,68 CHF (33,33 USD), +4,5 %. Informe de 52 páginas y 26 gráficos; Word lo abre sin reparar; cobertura de campos del 89,9 %; 75 fuentes (62 primarias); 14 de 17 controles correctos (los tres en «Revisar» están explicados en el texto).

## 1. Tiempos por fase

Trabajo efectivo: unos **55 minutos** (18:22-18:50 y 21:00-21:27); tiempo de reloj, 3 h 05 min por un corte de dos horas.

| Hora | Fase | Qué hice |
|---|---|---|
| 18:22-18:27 | 0. Lectura | `analiza-empresa.md`, `prompt.md` entero, `CLAUDE.md` y el diario de Viscofan. |
| 18:27-18:37 | 1. Identificación y acopio | On Holding AG, CIK 1858985, emisor extranjero (20-F/6-K), NIIF del IASB, cuentas en CHF, cierre a 31-dic, Clase A en la NYSE en USD. Bajé de EDGAR con `notas/sec.mjs` (HTML→texto) los 20-F 2021-2025, los 6-K de 1T24 a 2T26, los de resultados anuales (con el informe de remuneración suizo), los de los dos Investor Day y los de las juntas. |
| 18:37-18:50 | 2-4 en paralelo | Cuatro subagentes (A cuentas, B sector, C gobierno, D mercado). Mientras, leí el motor y escribí `notas/construir.mjs` (fusiona `A-D.json`, renumera fuentes por URL y traduce las citas). A y C terminaron y dejaron notas completas. |
| 18:50-21:00 | **Corte por límite de uso** | A mí y a los cuatro subagentes. De B y D quedaron solo los documentos descargados (`docs/B_*`, `docs/D_*`) y tres scripts de D, sin notas. Entretanto el motor, la plantilla y el prompt pasaron a la versión 4 (commit 64aebab). |
| 21:00-21:03 | Retoma | Leí el diff del prompt v4 y comprobé `A.json` y `C.json` (completos y válidos). Sin subagentes a partir de aquí. |
| 21:03-21:10 | D (yo) | Con los ficheros que D había bajado: estadísticas de bolsa (script de D sobre Yahoo), tipos del BCE, curva del Tesoro, consenso de MarketScreener y Stock Analysis, comparables (`notas/comps.mjs`). Bono suizo a 10 años con WebFetch literal (Trading Economics). Escribí `D.json`. |
| 21:10-21:12 | B (yo) | 10-K/20-F/informes anuales de Nike, Deckers, Lululemon, Amer, adidas, Puma y Asics (ya bajados), Grand View y McKinsey/WFSGI (vía SGI News). Escribí `B.json`. |
| 21:12-21:14 | 5-6. Cálculo y supuestos | Primer cálculo, corrección de controles (perímetro de 2021, consenso en base NIIF, múltiplos históricos), DCF a diez años, escenarios y pesos. |
| 21:14-21:20 | 7. Redacción | `notas/redaccion.mjs` con las cifras de `calc` tal cual. Resumen el último. |
| 21:20-21:27 | 8-9. Comité y entrega | Las diez preguntas; cinco correcciones. Word → PDF → PNG para revisar portada, comparables y DCF; PDF y PNG borrados. |

Ficheros de trabajo en `notas/`: `A.json`, `B.json`, `C.json`, `D.json` (hechos con fuentes), `comps.mjs`/`comps.json`, `textos.mjs` (supuestos), `redaccion.mjs` (textos), `propio.mjs` (ensamblado), `construir.mjs`, `sec.mjs`, `B_get.mjs`, `D_*.mjs`.

## 2. Fuentes clave

- **Primarias**: 20-F 2021-2025 (Item 3.D, 4, 5, 6, 7, 15 y notas), 6-K de resultados de 3T24 a 2T26 con su MD&A, estados intermedios a 30-jun-2026, informe de remuneración 2025, actas de las juntas de 2024-2026 (votos con cifras), Investor Day 2023 y 2026, 13G/13G-A y Form 144 de EDGAR; 10-K de Nike, Deckers y Lululemon, 20-F de Amer, informes anuales de adidas, Puma y Asics.
- **Mercado**: MarketScreener (estimaciones de On y de los siete comparables, precios objetivo), Stock Analysis (capitalización, valor empresa, ROIC, flotante, posición corta, recomendaciones), Yahoo (cotizaciones diarias), BCE (tipos), Tesoro de EE. UU. y Trading Economics (bonos).
- **Hallazgos que cambian la lectura**: la moneda funcional de la matriz y de On AG pasó al USD el 1-ene-2026; el mayor cliente ya es el 11,6 % de las ventas; la guía de ventas de 2026 se rebajó por primera vez desde la OPV; el pago a la dirección de 2025 superó el máximo aprobado; los fundadores son co-CEO desde mayo de 2026 tras la salida de Hoffmann.

## 3. Decisiones

1. **Divisa**: todo en CHF; precio, capitalización, comparables y precios objetivo al USD/CHF del BCE del 6-oct (0,8305). Valor objetivo y niveles también en USD en el resumen.
2. **Precio**: cierre del 5-oct (31,88 USD); el 6-oct, a la hora del corte, cotizaba en torno a 33 USD (+3,5 %).
3. **Acciones**: 336,1 M equivalentes de Clase A (A + B/10 + planes dilutivos).
4. **EBITDA**: NIIF, con la remuneración en acciones como gasto. El consenso de EBITDA (ajustado) se pasó a base NIIF restando el 1,99 % de las ventas, la proporción del 1S26. Estimación propia, dicha en la fuente.
5. **DCF**: diez años (2026e fijo por la guía y dos trimestres publicados), capex con altas de arrendamientos (los pasivos están en el puente), WACC en CHF del 10,01 % (bono suizo 0,51 %, beta de Blume 1,72, prima 5,5 % + 0,5), g del 2,0 %.
6. **Comparables**: siete; fuera Puma (pérdidas) y Skechers (privatizada). Ventas, EBITDA y BPA de un solo proveedor (MarketScreener) para LTM y NTM, como pide la v4.
7. **Pesos**: DCF 50, escenarios 30, comparables 20, transacciones 0 (sección omitida).
8. **Gobierno**: `una_accion_un_voto: false`, `accionista_control: true` (≈ 54 % del voto de los fundadores), `cambios_cupula_24m: 2` (Allemann y Coppetti entran como co-CEO en may-2026, anunciado en mar-2026, con menos de seis meses), voto en contra máximo del 12,9 % (informe de remuneración de 2023, junta de 2024).

## 4. Fricciones del sistema, con el arreglo propuesto (de más a menos importante)

1. **Los subagentes guardan al final y un corte se lo lleva todo.** B y D trabajaron 12 minutos y no dejaron notas; hubo que rehacer su parte con menos profundidad (sin transacciones ni calificaciones ESG). *Arreglo*: que el comando obligue a cada subagente a escribir `notas/<letra>.json` **sección a sección** (o un `notas/<letra>.parcial.json` cada pocos minutos), y que la integración acepte notas parciales.
2. **EBITDA ajustado frente a NIIF.** On solo guía EBITDA ajustado (sin remuneración en acciones, ~2 % de las ventas) y MarketScreener da ese ajustado como «EBITDA», pero el EBIT y el BPA en NIIF. Sin corregirlo, el EV/EBITDA de On salía en 14,2x LTM y 10,1x NTM, un salto que es definición y no crecimiento, y el control nuevo de LTM/NTM **no lo vigila para la propia empresa**, solo para los comparables. *Arreglo*: campos `financieros.cuenta[].remuneracion_acciones` y `consenso.base_ebitda: "ajustado|reportado"`; el motor convierte y aplica el control de salto también a la empresa.
3. **Divisa de cotización distinta de la de las cuentas.** La plantilla solo muestra el precio y el valor objetivo en `meta.divisa`; el lector que mira la cotización en USD tiene que convertir. *Arreglo*: `identificacion.divisa_cotizacion` y `tipo_cambio`; el motor imprime precio, valor objetivo y niveles de compra/venta en las dos divisas en la portada y en «La decisión».
4. **WACC en una divisa de tipos muy bajos.** La regla «bono a 10 años del país de la divisa» da un 0,51 % en CHF; con beta 2 y g del 2 % el resultado depende mucho de criterios que el prompt no fija (beta bruta o ajustada, prima adicional, g por encima de la tasa libre). *Arreglo*: una nota en el prompt: el crecimiento terminal en la divisa de las cuentas = crecimiento real + inflación de esa divisa, y una comprobación (`g ≤ tasa libre + 2 pp`, por ejemplo) o la opción de valorar en la divisa funcional (USD para On desde 2026).
5. **Múltiplos históricos y TCAC con años negativos.** Con 2020-2021 (EBITDA negativo) el EV/EBITDA histórico tenía un mínimo de −86x y la media no significaba nada; además, la TCAC de EBITDA y BPA sale «n.d.» si el primer año es negativo. Tuve que recortar la serie a 2022-2025. *Arreglo*: el motor excluye múltiplos negativos de la media y del percentil, y calcula la TCAC desde el primer año positivo indicando el periodo.
6. **Control de perímetro que salta por una OPV.** El activo de 2021 crece un 223 % por la caja de la salida a bolsa y el motor pide declarar una compra. Lo declaré en `cambios_perimetro` explicando que no es una compra. *Arreglo*: no avisar si el salto lo explican `flujos.emision_acciones` o la deuda nueva, o admitir `tipo: "ampliación de capital"`.
7. **El DCF inverso y los escenarios dan crecimientos medios distintos.** El inverso compara con el 10,7 % (2027-2035, sin el año `fijo`) y la tabla de escenarios dice 11,3 % (con 2026). *Arreglo*: misma definición en los dos y la etiqueta con el periodo («crecimiento medio 2027-2035»).
8. **NIIF 16 en el DCF.** Si los arrendamientos están en la deuda y su amortización en el EBITDA, el capex debe incluir las altas de arrendamientos (aquí ~2,4 % de las ventas) o el DCF cuenta las tiendas sin sus alquileres. El prompt no lo dice. *Arreglo*: una frase en `capex_pct_ventas` y un dato histórico de altas de derechos de uso en `flujos.historico` para que el motor muestre el «capex con arrendamientos».
9. **Emisor extranjero (20-F) y doble clase.** El prompt habla de IAGC/IARC o *proxy* y de Form 4; On no presenta ni *proxy* ni Form 4. Las operaciones de directivos salen de los Form 144 (avisos de venta, no ejecuciones confirmadas) y los votos de las actas suizas de la junta, donde las acciones B (diez veces más voto por franco) inflan el apoyo: el 87,1 % a favor del informe de remuneración es en torno a un 65 % entre las acciones A. *Arreglo*: un párrafo para emisores extranjeros (20-F Item 6-7, informe de remuneración local, actas, Form 144) y un campo `voto_remuneracion_libre_pct` (sin el bloque de control) que puntúe en lugar del total.
10. **Comparables con ejercicios no naturales hechos a mano.** Nike (mayo), Deckers (marzo), Lululemon (enero) y Birkenstock (septiembre): pesos de LTM y NTM calculados en `comps.mjs`. *Arreglo*: que `comparables.empresas[]` admita las series anuales del proveedor y el mes de cierre, y que el motor calcule LTM, NTM y crecimiento con la misma regla que para la empresa.

Otras menores: el gráfico de vencimientos avisa «sin valores» cuando la empresa no tiene deuda (debería ocultarse sin aviso); no hay campo para activos contingentes como los 53 M CHF de aranceles a devolver (los mencioné en el texto del puente); la fecha de corte cae en plena sesión de la NYSE y el prompt no dice si usar el cierre anterior; los resúmenes de WebSearch dieron cifras de McKinsey que no pude abrir en el original (403 y tiempo agotado) y usé la que sí pude leer en SGI News.

## 5. ¿Encajaron los campos nuevos de la versión 4 con On?

- `financieros.cambios_perimetro`: On no ha hecho compras (solo una de 0,3 M CHF en 2019); el campo sirvió para callar un falso aviso de la OPV, que no es su uso (fricción 6). El LTM pro forma no aplica.
- `gobierno.accionista_control`, `cambios_cupula_24m`, `voto_remuneracion_contra_pct`: encajan bien y hacen la puntuación más honesta (7 de 12). El voto en contra (12,9 %) sigue sin recoger que el bloque de control vota siempre a favor (fricción 9).
- `dcf.anios[].fijo`: útil; 2026 está casi cerrado (dos trimestres y guía reiterada el 22-sep). La pega es la etiqueta del crecimiento medio (fricción 7).
- `comparables` con el mismo proveedor para LTM y NTM: obligó a construir el LTM con los ejercicios de MarketScreener en lugar del LTM de Stock Analysis; más coherente. El control no se aplica a la propia empresa (fricción 2).
- Criterio de anticipos del puente: no aplica (On no tiene anticipos ni prefinanciación).
- Regla 0 con WebFetch literal: usada para el bono suizo; las demás cifras de valoración salen de páginas guardadas en `docs/`.


## Actualización v3 (7 oct 2026): regla relativa y DCF en tres etapas

Sin investigación nueva. Script: `notas/actualizacion-v3.mjs` (parte de `datos-v2.json`), salida `datos-v3.json` y `On Holding - 2026-10-06 v3.docx`. Fuente nueva [76]: prima implícita del S&P 500 de Damodaran, octubre de 2026, 4,20 %.

| | v2 | v3 |
|---|---|---|
| Recomendación · convicción | Mantener · Media | **Comprar · Baja** |
| Valor objetivo (WACC 10,01 %) | 27,68 CHF (33,33 USD), RTE +4,5 % | igual |
| Objetivo con la prima del mercado (WACC 7,91 %) | — | 36,62 CHF (44,09 USD), RTE +38,3 %, asimetría 10,98x |
| Regla absoluta / relativa | Mantener / — | Mantener / Comprar (discrepan; manda la relativa) |
| Niveles | compra < 24,07 CHF, venta > 30,76 CHF | compra < 30,75 CHF (37,03 USD), venta > 40,69 CHF (48,99 USD) |

- **etapa2: no se usa.** ROIC 38,4 % frente a WACC 10,01 % (pasa el filtro), pero el recorrido después de 2035 no se demuestra: los diez años explícitos ya llevan las ventas de 3.014 a 8.720 M CHF (de ≈ 2 % a ≈ 4 % del calzado deportivo mundial, estimación propia) y en 2034-2035 crecen al ritmo del mercado; el foso es solo la marca. Con una etapa de diez años el DCF pasaría de 30,07 a 31,80 CHF (+5,8 %).
- **Convicción baja por «Ojo con la causa»**: nuestras ventas están a −1,6/−3,7 % del consenso hasta 2028 y el objetivo relativo (36,62) es casi el de los analistas (36,11); la distancia con el precio es de tasa, sin catalizador con fecha confirmada.
- **Dependencia de la beta: sí depende.** La beta de 1,72 convierte 1,3 puntos menos de prima en 2,2 puntos menos de coste de capital. El Comprar relativo aguanta hasta una prima implícita del ≈ 5,0 % (WACC 9,2 %, RTE +15,1 %); con 5,1 % ya es Mantener. Dicho en la síntesis y en `cambiaria_recomendacion`.
- **Terminal**: no se toca (el encargo lo limita a Keyence), pero la regla nueva lo marca: con el bono suizo al 0,51 % el techo sería 0,0 %. Sensibilidad: con g del 1,0 % el DCF baja a 28,12 CHF, la RTE absoluta a −1,3 % y la relativa a +26,2 % (33,43 CHF): la recomendación no cambia, aunque entonces el Comprar relativo solo aguanta hasta una prima del ≈ 4,6 %.

**Fallos del sistema**
1. La portada pone «Comprar» al lado del valor objetivo absoluto (27,68 CHF) y de una rentabilidad del +4,5 %: el lector ve un Comprar con un 4,5 % de potencial. Arreglo: cuando discrepan y manda la relativa, que la portada dé también el objetivo y la RTE de la regla que manda.
2. La regla del terminal no tiene solución en divisas de tipos muy bajos (CHF: intervalo vacío). Arreglo: «si la tasa libre − 0,5 queda por debajo de la inflación esperada, el terminal es la inflación esperada», o un control del motor que lo avise.
3. El motor no da la prima de equilibrio de la regla relativa (aquí ≈ 5,0 %), la cifra que dice cuánto depende el Comprar de la prima y de la beta; hubo que buscarla a mano.

## Actualización v4 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v4.mjs` (parte de `datos-v3.json`), salida `datos-v4.json`, `On Holding - 2026-10-06 v4.docx` y su PDF. Sin fuentes nuevas; mismo precio (26,48 CHF / 31,88 USD) y corte (6-oct). Supuestos del DCF sin cambios.

| | v3 | v4 |
|---|---|---|
| Recomendación · convicción | Comprar · Baja | **Mantener · Baja** |
| Valor objetivo (WACC 10,01 %) | 27,68 CHF (33,33 USD), RTE +4,5 % | igual |
| Objetivo con la prima del mercado (WACC 7,91 %) | 36,62 CHF (44,09 USD), RTE +38,3 %, asimetría 10,98x | igual |
| Regla absoluta / relativa / combinada | Mantener / Comprar / Comprar | Mantener / Comprar / **Mantener** (Comprar solo relativo con RTE propia < 5 %) |
| Niveles | compra < 30,75 CHF (37,03 USD), venta > 40,69 CHF (48,99 USD) | compra < 26,35 CHF (31,73 USD), venta > 40,69 CHF (48,99 USD) |
| Sostenibilidad | — | **En parte** (11,3 % proyectado; financiable al ROIC actual 6,0 %; capital nuevo al 58,4 % frente al 48,6 % histórico; cuota 2,1 % → 4,0 % en 2035e) |

- **Puente 2026e-2029e**: volumen 17/14/13/12, precio 4/3,5/3,5/3,5, otros (divisa) −4,4/−0,5/−0,5/−0,5. Reparto volumen/precio, estimación propia: On no publica unidades ni subidas de precio [40]. **Mercado final**: calzado deportivo mundial de Grand View (el perímetro del 2,1 %), 205.800 M USD en 2030e extrapolado al 5 % hasta 2035e y pasado a CHF al 0,8305: 218.138 M CHF. El motor divide las ventas totales (con 7-8 % de ropa): la cuota sale ≈ 0,3 puntos alta (≈ 3,7 % solo calzado).
- **Veredicto «En parte»**: poder de precios demostrado (margen bruto 56,0 → 64,8 %) y plan con guía hasta 2029; después, foso estrecho (solo marca), crecimiento sin ciclo y las tres pruebas por encima de lo histórico. Ningún control de la prueba salta (la cuota pasa por la vía de «+10 puntos» y el capital nuevo queda a 1,20 veces el histórico), pero el financiable (6,0 %) es la mitad del proyectado.
- **El base no se recorta, y la síntesis dice por qué**: el precio ya descuenta casi el límite de la prueba. Con la cuota de 2035 en 1,5 veces la actual (−2,9 puntos al año en 2027-2035: 7,8 % medio, cuota 3,2 %) el objetivo sería 24,57 CHF (−7,2 %) con nuestro WACC y 31,95 CHF (+20,7 %) con la prima del mercado: Mantener igual (cálculo en el scratchpad, no publicado).
- **El paso a Mantener no lo da la sostenibilidad sino la regla del 9-oct** (un Comprar solo relativo exige RTE ≥ 5 % con nuestro WACC), que la v3 (7-oct) no tenía: 4,5 % no llega. El veredicto «En parte» apoya no apartarse de la regla. El nivel de compra baja de 30,75 a 26,35 CHF, un 0,5 % bajo el precio.

**Fallos del sistema vistos**
1. El control de cuota usa «1,5 veces o +10 puntos»: con cuotas pequeñas (2 %) el +10 lo deja pasar todo, y On casi duplica su cuota sin aviso. Arreglo: «+10 puntos» solo si la cuota actual pasa del 20 %, o bien el mínimo de los dos.
2. La cuota implícita divide las ventas totales entre un mercado de un solo producto (calzado) y no hay campo para el peso del perímetro. Arreglo: `mercado_final.ventas_en_perimetro_pct` (aquí ≈ 92 %).
3. Con la prueba de reinversión, un financiable (6,0 %) muy por debajo del proyectado (11,3 %) no genera control si el ROIC implícito queda dentro de 1,25 veces el histórico: la tabla dice una cosa y los controles otra. Arreglo: un aviso cuando el financiable sea menos de dos tercios del proyectado y el veredicto sea «Sí».
4. El motor no da la sensibilidad «caso base al límite de la prueba» (valor y regla con la cuota en 1,5 veces o con el crecimiento financiable); hubo que calcularla con una copia del JSON.

## Actualización v5 (13 oct 2026): caso base al crecimiento financiable

Sin investigación nueva. Script: `notas/actualizacion-v5.mjs` (parte de `datos-v4.json`), salida `datos-v5.json`, `On Holding - 2026-10-06 v5.docx` y su PDF. Mismo precio (26,48 CHF / 31,88 USD) y corte (6-oct). Lectura prudente de la sostenibilidad (decisión del usuario del 13-oct): la v4 fallaba la reinversión (financiable 6,0 % frente a 11,3 % proyectado) y la cuota (2,1 % → 4,0 %, más de 1,5 veces); el capital nuevo (58,4 % frente a 48,6 %, 1,20 veces) pasaba por poco.

| | v4 | v5 |
|---|---|---|
| Recomendación · convicción | Mantener · Baja | Mantener · Baja (sin cambio) |
| Valor objetivo (WACC 10,01 %) | 27,68 CHF (33,33 USD), RTE +4,5 % | **23,88 CHF (28,75 USD), RTE −9,8 %** (a 0,2 puntos de Vender en la regla absoluta) |
| Objetivo con la prima del mercado (WACC 7,91 %) | 36,62 CHF (44,09 USD), RTE +38,3 %, asimetría 10,98x | **30,88 CHF (37,18 USD), RTE +16,6 %, asimetría 2,94x** |
| Regla absoluta / relativa / combinada | Mantener / Comprar / Mantener | Mantener / Comprar / Mantener |
| Niveles (combinada) | compra < 26,35 CHF (31,73 USD), venta > 40,69 CHF (48,99 USD) | compra < 22,73 CHF (27,37 USD), venta > 34,32 CHF (41,32 USD) |
| DCF · escenarios (bajista / base / alcista) | 30,07 · 18,18 / 30,07 / 39,72 | 25,27 · 15,61 / 25,27 / 33,14 (asimetría 0,61x) |
| Crecimiento medio proyectado (2026e-2035e) | 11,3 % | 8,3 % |
| Financiable al ROIC actual | 6,0 % (reinversión 16 % del NOPAT) | ≈ 4,7 % (reinversión 12 %; + 3,6 puntos de precio del puente = 8,3 %) |
| Capital nuevo · cuota 2035e | 58,4 % (48,6 % hist.) · 4,0 % | ≈ 55,0 % (1,13x) · 3,0 % (tope 3,15 %) |
| Veredicto | En parte | **Sí** (el base queda en el límite de las tres pruebas) |

- **Supuesto cambiado: solo el crecimiento** (márgenes, inversión, WACC, terminal y escenarios iguales). 2027e-2029e: 17/16/15 → 16/14/12 (solo volumen; el puente pasa a 13/11/9 de volumen, 3,5 de precio y −0,5 de divisa). 2030e-2035e: 13/11/9/7/5/3,5 → 8/5/4/3/2,5/2, convergiendo al 2 % del terminal. Ventas de 2029e: 5.205 M CHF (−7 % frente al objetivo de 5.600); de 2035e: 6.610 M CHF (antes 8.720).
- **Por qué así**: la cuota limita las ventas de 2035e (≤ 1,5 × 2,1 % de 218.138 M CHF = 6.871 M CHF), y el financiable más la parte de precio (media del puente 2026e-2029e, 3,6 puntos) limita el crecimiento medio. Se recorta sobre todo el final; el plan a 2029 solo pierde 1-3 puntos de volumen, porque el recorte de los mayoristas del 2T26 aún no ha tocado fondo. Con la senda elegida la cuota sube hasta ≈ 3,3 % en 2031 (con el mercado al 5 % anual, estimación propia) y vuelve al 3,0 % en 2035: On crece por debajo de su mercado al final, como ya supone el terminal.
- **La señal no cambia**, pero sí la lectura: el DCF inverso (8,4 % anual en 2027-2035) está ahora por encima del caso base (7,4 %); el precio pide más de lo financiable. La relativa da Comprar solo hasta una prima implícita del 4,26 % (WACC 8,0 %); con un terminal del 1,0 %, la relativa ya da Mantener (28,41 CHF, +7,3 %). Escenarios sin cambios: el bajista (−5 pp) supone ahora ventas que caen desde 2032 (−41,0 %).
- Textos reescritos: síntesis (636 palabras), tesis, visión diferencial, a favor (se quita el DCF inverso como argumento) y en contra (+1), justificación de crecimiento, márgenes y terminal, etapa 2, lectura del DCF, sostenibilidad, narrativas del bajista y del base, comentario de escenarios y de valoración, efectos de los riesgos, qué vigilar y qué cambiaría la recomendación.

**Fallos del sistema vistos**
1. Al recortar el crecimiento, la reinversión cae del 16 % al 12 % del NOPAT (menos circulante) y el motor pasa a tratar a On como «activos ligeros»: deja de imprimir el financiable y el rendimiento del capital nuevo, desaparece el control del capital nuevo (21 → 20 controles) y la tabla «La decisión» dice «sin inversión neta». El umbral fijo del 15 % convierte el propio recorte en un cambio de prueba. Arreglo: calcular siempre el financiable y el ROIC implícito cuando la reinversión sea positiva, y usar el 15 % solo para el texto.
2. La prueba de cuota solo mira el último año: una senda que sube la cuota por encima del tope a mitad de la proyección y la devuelve al final pasa sin aviso. Arreglo: cuota implícita de cada año con el crecimiento del mercado, o al menos la máxima.
3. La regla «crecimiento medio ≤ financiable + precio» no está en el motor: la parte de precio y el financiable con reinversión baja se calculan a mano.

- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio, sobre la v5): objetivo 28,46 CHF (34,27 USD), rentabilidad +7,5 % (ponderada; base +17,6 %), señal Mantener (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +7,5 % → +12,3 %, base +17,6 %, señal Mantener (`revision-12m-2026-10-13.md`).
