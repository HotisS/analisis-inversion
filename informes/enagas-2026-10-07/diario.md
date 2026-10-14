# Diario — Enagás, S.A. (BME: ENG) · corte 2026-10-07

Commit de partida: `e50baaa Reguladas: valoracion.rab y valor empresa sobre la RAB en los datos clave`. No se cambia de versión del prompt durante el análisis.

## Tiempos
- 10:02 Inicio. Lectura de `analiza-empresa.md`, `prompt.md` entero (663 líneas) y `lecciones.md`.
- 10:03 Fase 1: identificación. Resultados 1S26 publicados el 22-jul-2026 (beneficio neto 126,9 M; recurrente 118,6 M; EBITDA 314 M; deuda neta 2.305 M; guía 2026 de 235 M de beneficio recurrente reafirmada) [prensa, a confirmar con la nota oficial]. La web de inversores de Enagás carga los documentos por JavaScript: WebFetch no ve los PDF (se encarga a los subagentes buscar las URL directas).

- 10:04 Lanzados los cuatro subagentes A-D en paralelo, cada uno con su extracto (`prompt-de.mjs`), las lecciones y las particularidades de regulada (RAB, retribución, TRF 2027-2032, hidrógeno, límites de voto, EV/RAB). A D se le pide un archivo aparte `notas/rab_comparables.json` porque el formato de comparables y transacciones no tiene campo RAB (decisión: no añadir claves al JSON principal).

## Identificación
- Enagás, S.A. · BME (Mercado Continuo), IBEX 35 · ticker ENG (Yahoo `ENG.MC`) · ISIN ES0130960018 · EUR · ejercicio natural (cierre 31-dic) · NIIF-UE.
- Empresa regulada (transporte, regasificación y almacenamiento de gas en España; gestor técnico del sistema; gestor provisional de la red troncal de hidrógeno).

## Primeras observaciones sobre el encaje del sistema con una regulada (se amplía al final)
- `valoracion.rab` solo produce `calc.clave.ev_rab` (grep en el motor: línea ~650). No hay campo RAB en `comparables.empresas` ni en `transacciones.operaciones`, así que el múltiplo de referencia del sector (EV/RAB) no se puede comparar dentro del motor ni ponderar en la síntesis.
- El DCF solo admite crecimiento de ingresos, margen EBITDA, amortización, capex y circulante en % de ventas. La retribución regulada (RAB × tasa financiera + amortización regulatoria + O&M + RCS) hay que traducirla a mano a esos porcentajes.
- 10:06 Verificación propia del dato que más mueve el DCF: **Circular 5/2026 de la CNMC (8-sep-2026, BOE 18-sep-2026)**: TRF de regasificación, transporte y GTS para 2027-2032 = **6,46 %** (WACC después de impuestos 4,85 %), frente al 5,44 % de 2021-2026; se aplica **desde el 1-oct-2026** (año de gas). Descargado como `docs/P_boe_circular_5_2026`. B ya lo tenía (duplicación pequeña aceptada como segunda fuente: pregunta 9 del comité).
- 10:08 Lectura propia de la presentación del 1S26 (descargada por A): **el EBITDA de Enagás incluye el resultado de participadas** (86 M en el 1S26; guía 2026 de EBITDA ≈ 620 M). Compras anunciadas: 31,5 % de Teréga a GIC por 573 M (EV/RAB 2025 1,07-1,08x; cierre previsto en el 3T26) y 20 % de Saggas a Osaka Gas por 31 M (EV/RAB 1,07x; pasa a integración global). Cobro de 129 M de Castor previsto en el 2S26. Laudo GSP: 303 M USD (anulación pendiente, 1S27). Guía 2026: beneficio recurrente ≈ 235 M, deuda neta ≈ 2.400 M, DPA 1,00 EUR, FFO/DN > 15 %, inversión ≈ 225 M. La TRF de ≈ 6,5 % ya estaba en las proyecciones de la empresa desde 2027 (presentación de 2025, p. 9): la circular no sorprende al alza.
- Decisión pendiente (la tomo al integrar): **participadas dentro del EBITDA** frente a `asociadas` en el puente. Si el EBITDA del DCF y de los múltiplos incluye las participadas y el puente además suma su valor contable, se cuentan dos veces. Plan: EBITDA del DCF sin participadas y su valor en `asociadas`.
- 10:15 B (sector) termina: 23 fuentes (21 primarias), 8 huecos, 77 llamadas, 10,4 min. Circular 4/2026 (metodología) y 5/2026 (TRF) definitivas; la CNMC prevé que la retribución del sector (transporte + regasificación) pase de 883 M (2026) a 961 M (2027) y 940 M (2032), frente a 710 M en 2032 con la regla anterior. RCS desaparece desde 2027; REVU +32,6 %; valores unitarios de O&M +32,6 %; nuevo IFVA. Cuota de Enagás: 85,5 % del transporte y 53,9 % de la regasificación (73,5 % conjunta, estimación de B). Hidrógeno: PCI renovado (DOUE 9-4-2026), 3.125 M en el plan 2025-2030, FID a finales de 2027; sin marco retributivo aún.
- 10:16 C (gobierno) termina: 19 fuentes, 7 huecos, 92 llamadas (por encima de las 80), 11,8 min. BlackRock 7,43 %, SEPI 5 %, Ortega 5 %; `una_accion_un_voto` false por la DA 31.ª; `accionista_control` false; ILP con TSR 25 %, FFO 20 %, hidrógeno 25 %. Suelo de dividendo de 1,74 EUR roto en feb-2024 (1,00). Cambio de auditor EY → Deloitte (2026).
- 10:24 A termina (92 llamadas, 13,9 min; 16 fuentes) y D termina (98 llamadas, 13,7 min). Los dos pasan de las 80 llamadas, pero no de los 20 minutos. A: cuentas 2021-2025 (el PDF de 2021 escaneado impide 2018-2020), LTM jun-26, EBITDA = EBIT + amortizaciones **con** participadas (131,6 M en 2025). RAB no publicada año a año: ~3.100 M (2024) y ~2.700 M (2026, plan de feb-25). D: precio 16,22 EUR (cierre del 6-oct de MarketScreener; Yahoo no tenía el 6-oct y tomaba el intradía del 7-oct como cierre), 260,298 M de acciones, consenso de 19 analistas (EBITDA 625,8 / 724,2 / 712,5 M; PO medio 17,05), bono a 10 años 4,14 %, beta 0,35, siete comparables, EV/RAB de pares 1,17-1,53x y de Teréga/Saggas 1,07x.
- 10:25 Lanzado un subagente E (12 min, 40 llamadas) para 3-5 transacciones con EV/EBITDA o EV/RAB publicados: D solo dejó una con múltiplo (mínimo del motor: 3).
- 10:27 Decisiones de integración:
  - **Participadas fuera del EBITDA** (parches sobre `financieros.cuenta` y `ltm`): EBITDA y EBIT sin el resultado de participadas, que pasa al resultado financiero (el BAI no cambia). Motivo: el puente suma las asociadas a valor contable; si el EBITDA las incluye, se cuentan dos veces en el DCF y el EV/EBITDA sale bajo. El consenso (EBITDA de la empresa, con participadas antes del PPA) se homogeneiza con `base_ebitda: "ajustado"` y `ajuste_ebitda_pct_ventas` = participadas / ingresos (≈ 22 % en 2027e). Es un uso del campo para algo para lo que no se diseñó (ver fallos).
  - Puente a 30-jun-26 de D, más `otros_ajustes` = Teréga 573 + Saggas 31 (pagos posteriores al balance) + opción de venta de Reganosa 86,6 − cuenta a cobrar del laudo GSP 206,6 (valor razonable) = 484,0; `asociadas` = 1.102,6 + 573 + 31 = 1.706,6. Teréga y Saggas, neutros (deuda y asociada por el mismo importe).
  - Saggas no se consolida en el DCF (se queda a valor contable en asociadas) para no contarla dos veces.
  - Hidrógeno fuera del caso base (capex y retribución): sin marco retributivo, su VAN a TRF ≈ WACC es cero; va como opción en el alcista.
  - `valoracion.rab` = 2.700 M (RAB de gas de 2026 del plan, redondeada por la empresa): no hay RAB publicada a la fecha del puente.
- 10:29 E (transacciones) termina: 4 operaciones con cifras oficiales (OGE 11,3x, ENW 10,6x y EV/RAV 1,44x, WPD EV/RAV 1,62x, Grain LNG 7,5x), 36 llamadas, 4,4 min. Se integran desde `propio` porque el integrador solo lee A-D.
- 10:28-10:31 Primer y segundo cálculo. Con asociadas a valor contable y WACC 5,85 % el DCF daba 10,70 EUR (−34 %). Revisado: (1) asociadas a valor estimado (164 M de dividendos de 2025 como renta de 20 años al 8 % = 1.600 M, más Teréga y Saggas a precio pagado = 2.204 M), porque el valor contable (1.102,6 M) rinde un 15 % en dividendos; (2) prima de mercado de la CNMC (5,02 %) en vez de 5,5 % y coste de la deuda 3,8 %; (3) circulante −12 % (el real de 2025) en vez de −15 %; (4) alcista con −0,6 pp de WACC (los tipos de hace un año). Bono a 10 años comprobado en segunda fuente (Trading Economics: 4,12 %, +0,90 pp en un año). Resultado: DCF 13,13 EUR, WACC 5,63 %, VT 53 %; DCF inverso: rentabilidad implícita 4,6 %, crecimiento implícito 2,9 % (base 0,3 %).
- 10:32 Textos (`notas/textos.mjs`), resumen el último. Revisión de comité: la regla da Vender por la cláusula de asimetría (rentabilidad total −7,7 %, asimetría 0,27x) y la causa es la tasa de descuento (EBITDA 2027e un 3,9 % por debajo del consenso homogeneizado) → convicción Baja, como pide el prompt. Comprobadas a mano unas 20 cifras de los textos contra `calc` y las notas; corregidas 13 frases (citas a la fuente equivocada, «el doble del valor contable», sensibilidad por 0,5 pp).
- 10:34 Integración final: 82 fuentes, 28 huecos; 14 de 15 controles correctos y 1 explicado (regresión). Informe: 28 gráficos, cobertura 93 %, un aviso (tabla de suma de partes vacía, a propósito). Word abre sin reparar (59 páginas); revisadas como imagen la portada, la síntesis y «La decisión».
- 10:36 Cierre del diario. **Tiempo total: ≈ 34 minutos** (A-D en paralelo de 10:04 a 10:18; E de 10:25 a 10:29).

## Resultado
- Vender, convicción Baja. Valor objetivo 13,97 EUR (−13,9 %); rentabilidad total esperada −7,7 % (dividendo 6,2 %); alcista 18,14 / base 13,13 / bajista 9,19; asimetría 0,27x.
- DCF inverso: el precio descuenta un 4,6 % anual (bono español 4,12 %, WACC regulatorio 4,85 %, nuestro WACC 5,63 %).
- EV/RAB 1,79x sobre la RAB de gas del plan (2.700 M) frente a 1,07x de Teréga/Saggas y 1,17-1,53x de los pares.

## Fallos del sistema con una regulada (por orden de importancia) y su arreglo concreto
1. **El DCF no sabe de retribución regulada.** Solo admite % de ventas; la RAB, la TRF, la amortización regulatoria y la inversión reconocida hay que traducirlas fuera (`notas/regulado.mjs`). *Arreglo*: bloque opcional `dcf.regulado` { rab_inicial, tasa_retribucion_pct por año, amortizacion_regulatoria, inversion_reconocida, opex, otros_ingresos } con el que `calcular-empresa.mjs` construya ingresos = RAB media × TRF + amortización + O&M + otros y derive crecimiento y margen; y un control que compare la TRF después de impuestos con el WACC (si es menor, cada euro de inversión regulada destruye valor).
2. **La regla del valor terminal (capex ≥ amortización) no encaja con redes amortizadas.** Enagás cobra extensión de vida útil (REVU/IFVA) sobre activos amortizados con poco capex; forzar capex = amortización sin el ingreso que generaría la nueva base baja el FCFF terminal de 272 a 179 M y el múltiplo implícito a 7,6x. *Arreglo*: `dcf.terminal.metodo: "rab"` (valor terminal = RAB final × EV/RAB elegido, o FCFF con capex = amortización y los ingresos que remuneran ese capex a la TRF), con la excepción en el control.
3. **Participadas dentro del EBITDA → doble cómputo.** Enagás (como Redeia, Naturgy o Ferrovial) mete la puesta en equivalencia en el resultado de explotación y el puente suma `asociadas`. Hubo que parchear EBITDA, EBIT y resultado financiero año a año y usar `consenso.ajuste_ebitda_pct_ventas` (pensado para la remuneración en acciones) para quitar las participadas del consenso. *Arreglo*: campo `resultado_participadas` en `financieros.cuenta`, `ltm` y `consenso.estimaciones`, que el motor reste del EBITDA/EBIT para DCF y múltiplos cuando `puente.asociadas` > 0, con un control que avise si falta.
4. **Asociadas a valor contable por defecto.** El prompt no dice cómo valorarlas y el valor contable de Enagás (1.102,6 M) rinde un 15 % en dividendos: con él, el objetivo baja ≈ 1,9 EUR. *Arreglo*: `puente.asociadas_criterio` ("contable" | "dividendos" | "mercado"); si es por dividendos, que el motor lo calcule desde `dividendos_asociadas`, años y coste de los fondos propios y lo enseñe en el puente.
5. **EV/RAB a medias.** `valoracion.rab` solo da el EV/RAB de mercado en la tabla clave: no hay RAB en `comparables.empresas` ni en `transacciones.operaciones`, el valor objetivo no se expresa sobre RAB, no hay método «EV/RAB» en la síntesis y el mínimo de 3 transacciones con múltiplo no cuenta las que solo publican EV/RAB. Además el EV/RAB de Enagás (1,79x) no es comparable: su RAB excluye activos amortizados que siguen cobrando, y la empresa no publica la RAB a la fecha del puente. *Arreglo*: campos `rab` en comparables y transacciones, implícito por EV/RAB en `calc.comparables`, objetivo / RAB en la síntesis y `valoracion.rab_definicion` (perímetro, fecha, fuente).
6. **Transacciones de participaciones minoritarias.** Teréga (31,5 %) y Saggas (20 %) publican precio de la participación y EV/RAB, no EV al 100 %: el motor no las puede usar. *Arreglo*: aceptar `ev_rab` o `precio_participacion` + `pct_adquirido`.
7. **Niveles de compra y venta incoherentes con la regla.** La regla da Vender por «negativa con asimetría < 0,5», pero la tabla de niveles dice «Mantener entre 12,84 y 16,66» con el precio en 16,22, porque los niveles solo usan los umbrales de rentabilidad total. *Arreglo*: que `calc.recomendacion.niveles` incorpore la asimetría o lo diga en la condición.
8. **Gobierno y límites legales de voto.** `una_accion_un_voto` = false penaliza igual un blindaje estatutario que el límite del 3 % que la Ley de Hidrocarburos impone a todo gestor técnico; `insiders_sin_operaciones` no distingue «no verificado» de «hubo operaciones»; SEPI se abstiene en remuneración y hunde el «a favor» (77-82 %) sin rechazo real. *Arreglo*: valor `"limite_legal"` puntuado aparte, `null` documentado como «sin verificar» y `voto_remuneracion_abstencion_pct`.
9. **El integrador solo lee A-D.** Un subagente adicional (E, transacciones) no se integra: hubo que copiar sus operaciones y renumerar sus fuentes en `propio`. *Arreglo*: que `integrar.mjs` lea cualquier `notas/[A-Z].json` con su letra como prefijo.
10. **Sector y competencia pensados para mercados con demanda.** El tamaño de mercado es la retribución que fija la CNMC (con un salto por cambio de metodología, no por crecimiento), CR5 = 100 %, Porter y «poder de precios» no aplican y los rivales españoles no publican cuentas. *Arreglo*: en reguladas, `retribucion_reconocida_sector` y `cuota_retribucion_pct` en vez de `tamano` y `cr5`, y pares europeos regulados en vez de competidores.

## Nota sobre las herramientas
- `bolsa.mjs`, con la fecha de corte en plena sesión, tomó el intradía del 7-oct (16,20) como cierre sin avisar (`aviso_cierre: null`) y no detectó que faltaba la barra del 6-oct en Yahoo; D usó el cierre de MarketScreener (16,22). *Arreglo*: si la fecha de corte es hoy y el mercado está abierto, usar la última sesión cerrada y avisar; comprobar huecos de días hábiles.
- `bolsa.mjs`: `^IBEX` es solo de precio; D usó XESP.DE como índice, pero la beta se sigue midiendo contra el IBEX (0,35, poco útil para una utility en un índice bancario). *Arreglo*: opción `--indice-beta` separada.
- `descargar.mjs` funcionó con BOE, CNMC, CNMV, EDGAR, emarketstorage y los PDF directos de Enagás (la web de inversores carga por JavaScript y WebFetch no ve los enlaces). `pdftotext -layout` desordenó los estados financieros; `-table` funcionó.
- A, C y D pasaron de las 80 llamadas (92, 92 y 98) pero acabaron en 10-14 minutos: se rompe el límite de llamadas, no el de tiempo.
- `a-pdf.ps1` y `pdf-a-png.ps1` funcionaron a la primera; no se cerró ningún WINWORD.


## Actualización v2 (7 oct 2026): regla relativa y DCF en tres etapas

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`, escribe `datos-v2.json`). Fuente nueva [83]: prima implícita del S&P 500 de Damodaran, octubre de 2026 (4,20 %).

| | v1 | v2 |
|---|---|---|
| Recomendación | Vender | **Mantener** |
| Convicción | Baja | Baja |
| Valor objetivo (nuestro WACC 5,63 %) | 13,97 EUR (RTE −7,7 %, asimetría 0,27) | igual |
| Valor objetivo con la prima del mercado (WACC 5,30 %) | — | 14,66 EUR (RTE −3,5 %, asimetría 0,54) |
| Regla absoluta / relativa | Vender / — | Vender / Mantener |
| Comprar por debajo de / vender por encima de | 13,01 / 15,16 EUR | 13,61 / 16,41 EUR |

- **etapa2: no.** El ROIC sin participadas (4,1 %) está por debajo del WACC, la RAB de gas baja de ≈ 3.100 M a ≈ 2.100 M en 2030 [9] y la retribución del sector baja un 2 % en 2027-2032 [23].
- **Por qué la relativa mueve poco en una regulada.** La beta es de 0,68 y nuestra prima de mercado ya era la de la CNMC (5,02 %), no un 5,5 %. Bajarla al 4,20 % solo resta 0,33 puntos al WACC. El Mantener depende de una asimetría de 0,54, a 0,04 del umbral de venta, con el precio a un 1,2 % del nivel de venta. Con una prima del 4,4 %, la regla relativa ya da Vender (medido con el motor). Por eso la convicción sigue siendo baja.

**Fallos del sistema vistos en esta actualización**
1. **La regla es un precipicio.** Una diferencia de 0,2 puntos en la prima implícita del mercado o de 0,04 en la asimetría cambia Mantener por Vender. No hay banda ni histéresis. En las reguladas, con betas bajas y rentabilidades totales cerca de cero, la recomendación cae casi siempre al borde.
2. La relativa compara con una prima del S&P 500, pero la absoluta de las reguladas usa la prima de la CNMC. Las dos referencias no son homogéneas: la diferencia entre reglas es menor que en una industrial por construcción, no por el negocio.
3. Sin tocar (no es de esta actualización): la tesis dice ≈ 73,5 % de la retribución del transporte y la regasificación, y la síntesis da un 85,5 % del transporte y un 53,9 % de la regasificación. Son perímetros distintos, pero leídos juntos parecen una contradicción.

## Actualización v3 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v3.mjs` (parte de `datos-v2.json`, escribe `datos-v3.json`). Añade `dcf.sostenibilidad`: puente de ingresos 2026e-2030e sacado de `notas/regulado.mjs` (precio = retribución unitaria de la CNMC e indexación del resto regulado; volumen = RAB que se amortiza; otros = obras de Castor e ingresos no regulados) y mercado final = retribución reconocida del transporte y la regasificación del sector en 2032 (940,1 M [23], último año con cifra de la CNMC; 2033-2035 no tienen metodología). No cambia supuestos, precio ni fecha de corte. Word «Enagás - 2026-10-07 v3.docx» y PDF.

| | v2 | v3 |
|---|---|---|
| Recomendación / convicción | Mantener / Baja | igual |
| Valor objetivo (nuestro WACC 5,63 %) | 13,97 EUR (RTE −7,7 %, asimetría 0,27) | igual |
| Con la prima del mercado (WACC 5,30 %) | 14,66 EUR (RTE −3,5 %, asimetría 0,54) | igual |
| Comprar por debajo de / vender por encima de | 13,61 / 16,41 EUR | igual |
| Sostenibilidad del crecimiento | — | **Sí** (−0,3 % anual proyectado; reinversión −819 M, −48 % del NOPAT; cuota 100,6 % mecánica, 73,5 % en el mismo perímetro) |

- **Por qué «Sí».** Proyectamos casi nada (−0,3 % anual) y lo que hay sale de la tarifa ya publicada por la CNMC (TRF del 6,46 % desde 2027) [22, 23], no de capital nuevo ni de ganar cuota. Hasta 2032 el capex queda por debajo de la amortización: la reinversión es negativa y el motor no calcula el crecimiento financiable ni el rendimiento del capital nuevo. Los tres controles nuevos pasan (puente, cuota); 17 de 18 correctos y 1 explicado (regresión). No hay recorte.
- Síntesis: frase del veredicto en «El negocio»; para seguir en ≤ 650 palabras se acortan los catalizadores y se quita «Sin DCF en tres etapas…» (sigue en `dcf.etapa2`). 647 palabras.

**Fallos del sistema vistos**
1. **Cuota con perímetro distinto.** El motor divide los ingresos del grupo (con almacenamiento, GTS y otros, ≈ 255 M en 2032e) entre la retribución del transporte y la regasificación del sector: sale un 100,6 % «frente al 73,5 %» en la tabla del Word, aunque en el mismo perímetro la cuota no cambia. Falta un campo de ingresos del perímetro (lo mismo que en Krones o CAF).
2. **«Activos ligeros» con desinversión.** Con reinversión negativa (−819 M), el texto del motor dice «activos ligeros» y «comprador en serie»: en una regulada es una base de activos que se amortiza sin reponerse. Se dice en la justificación.
3. **El mercado final de una regulada no llega al último año explícito** (la CNMC publica hasta 2032 y el DCF va hasta 2035): se usa `periodo: "2032e"`, que el motor acepta.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 14,24 EUR, rentabilidad −6,1 %, señal Mantener (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada -6,0 % → -6,7 %, base -2,4 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v4.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 11.7x, mínimo 9.1x, media larga 11.7x; antes v2 12.95x/9.9x/12.5x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
