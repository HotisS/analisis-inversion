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
