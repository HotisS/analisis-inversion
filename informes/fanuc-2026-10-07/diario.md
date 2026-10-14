# Diario — FANUC Corporation (TSE 6954), corte 2026-10-07

Commit de partida: `21591ac Empresa, vuelta 8 (Enagás): niveles con la regla entera, participadas y reguladas`. No cambio de versión del prompt durante el análisis.

## Tiempos
- 10:52 inicio. Leídos `analiza-empresa.md`, `prompt.md` entero y `lecciones.md`.

## Fase 1 — Identificación (10:52-11:05)
- FANUC CORPORATION, TSE Prime 6954, ISIN JP3802400006, sede Oshino-mura (Yamanashi). Yahoo `6954.T`.
- **Normas**: JGAAP («based on Japanese standards» en el Kessan Tanshin del 1T FY2026). Cuenta por función (coste de ventas + SG&A).
- **Ejercicio**: a 31 de marzo. Fanuc llama «FY 2025 (ending March 31, 2026)» → `etiqueta_ejercicio: "inicio"`, `cierre_ejercicio_mes: 3`. Último anual: FY2025 (abr-25 a mar-26). Último trimestre: 1T FY2026 (abr-jun 2026), publicado el 31-jul-2026.
- Guía FY2026 elevada el 31-jul-2026: ventas 948.100 M JPY (+10,5 %), BE 218.000 M (+18,6 %), BN 198.000 M, BPA 212,18 JPY.
- Split 5:1 en abril de 2023 (Yahoo lo da ajustado).
- Precio 6.220 JPY (cierre 06-oct-2026; el del 07 no está). Rango 52s 4.400-8.880.

### Fallo del sistema 1 (bolsa.mjs, índice con salto falso)
Con `--indice 1306.T` (ETF TOPIX de Nomura) la beta salía **0,03**: Yahoo tiene un salto falso de −90 % / +948 % en 1306.T entre el 30-mar y el 1-abr-2026 (un split 10:1 mal ajustado). La herramienta no lo detecta. Arreglo aplicado: usar `1305.T` (ETF TOPIX de Daiwa, sin saltos) → beta 1,47. **Arreglo propuesto**: que `bolsa.mjs` busque rentabilidades diarias > ±50 % que se deshacen en pocas sesiones y avise (o las anule) antes de calcular beta y volatilidad.

- 10:59 lanzados los cuatro subagentes A-D en paralelo (presupuesto 20 min / 80 llamadas cada uno). Convención fijada para todos: periodos `FY2016`…`FY2025` con la etiqueta de Fanuc (FY2025 = abr-25 a mar-26), trimestres `1T FY26` = abr-jun 2026; millones de JPY; acciones reexpresadas por el split 5:1 de 2023.
- Mientras tanto: leo Tanshin anual FY2025, Q&A y presentación del 1T FY26 para la tesis (`propio`).
- 11:00 leído: Q&A 1T FY26 (pedidos FA +63,8 % por China —semis para centros de datos, 3C, NEV, piezas de humanoides—, India y Taiwán; plazos de entrega largos que **adelantan pedidos** y hacen perder clientes en China; costes de componentes al alza y aranceles de EE. UU. que limitan el margen; capacidad aún no al límite, capex al alza). Presentación 1T: pedidos 281,9 mm JPY frente a ventas 231,0 (book-to-bill ≈ 1,22). Tanshin FY25: payout del 60 %, recompras «flexibles según el precio», autocartera limitada al 5 % (amortiza el exceso); JGAAP «en el futuro previsible»; sociedad con comisión de auditoría y supervisión con mayoría de externos independientes. **Participadas por el método de la participación: 30.531 M en FY25** (17 % del resultado de explotación) → decisión de valoración en el puente.
- 11:01 propio.mjs iniciado (meta; suma de partes no aplica: Fanuc declara un único segmento y no da resultado por división). Fuentes propias: Sección 232 (ttnews, 24-sep-2025) y JIMTOF 2026 (26-31 oct).
- 11:12 A y B **no habían guardado nada** a los 13 minutos (solo C y D guardaban por partes). Ver fallo 2.
- 11:21-11:24 terminan los cuatro: B 97 llamadas/23 min, C 88/23 min, D 103/23 min, A 80/25 min. Presupuesto de 80 llamadas superado por B y D (+20-30 %).
- Verificado a mano el JGB a 10 años: **3,103 %** el 6-oct-2026 (CSV del MoF). Es el dato que más mueve el WACC.

### Fallo del sistema 2 (guardado por partes)
A y B escribieron su nota de golpe al final (A.json y B.json seguían con el esqueleto a los 13 min). Si un límite de uso los hubiera cortado, se perdía todo. Arreglo propuesto: que `prompt-de.mjs` imprima al final, en negrita, «Guarda `notas/<letra>.json` tras cada campo; el analista lo comprobará a los 10 minutos» y que el comando pida al analista mirar el tamaño de las notas a los 10 min y avisar al subagente con SendMessage si sigue vacía.

### Fallo del sistema 3 (PDF japoneses ilegibles, sin aviso)
A, C y D lo encontraron por separado: `descargar.mjs` extrae el Securities Report japonés (109 págs., 149.777 caracteres) como texto ilegible —faltan los datos de caracteres japoneses de poppler— y no avisa; cada subagente perdió llamadas hasta pasar a `pdf-a-png.ps1`. Arreglo: medir la proporción de caracteres legibles (letras latinas, dígitos, kana/kanji válidos) y, por debajo de un umbral, avisar como con los escaneados y sugerir `pdf-a-png.ps1 -Paginas`; o instalar `poppler-data`. Además, filtrar los «Syntax Error: Unknown font tag» que ensucian la salida.

### Fallo del sistema 4 (tablas de Tanshin con -layout)
El texto `-layout` del Tanshin desordena las columnas del balance y la cuenta (lo vi yo y lo vieron A y B); `pdftotext -table` las saca limpias. Arreglo: que `descargar.mjs` genere también `<nombre>.table.txt` para PDF con tablas, o que lecciones.md lo diga para Japón.

## Integración y valoración (11:24-11:33)
- Primer integrar + calcular: 104 fuentes, 26 huecos, DCF sin supuestos. Ratios históricos leídos de `calc`: margen EBITDA 24-36 % (mediana ≈ 28,4 %), circulante 35-60 % de ventas (48,6 % en FY2025), capex 2,5 % en FY2025 frente a 14-20 % en FY2016-18, ROIC 7,9-25,5 %, TCAC de BPA 3,4 % en diez años.
- **Decisiones**:
  - **Acciones 924,914 M** (no 933,158 del 30-jun): la recompra de 50.000 M se completó el 17-sep (8,27 M de acciones, comunicado del 18-sep) y la autocartera de junio prueba que no había comprado nada antes del 30-jun. Coherencia: caja del puente 762.268 − 49.999,8 = 712.268 M. Capitalización resultante 5,753 billones = la publicada por Stock Analysis (5,75).
  - **Participadas** (Shanghai-FANUC y Beijing-FANUC al 50 %): 167.210 M en libros, pero 30.531 M de resultado en FY2025 → a 10x = 305.310 M (+148 JPY/acción frente al contable). Otras inversiones a largo (cruzadas y bonos): 63.900 M como `otros_ajustes` negativo. Pensiones netas al 30 %: 13.675 M.
  - **WACC 9,58 %**: JGB 3,103 % (verificado a mano en el CSV del MoF), beta 1,26 (Blume sobre la semanal de 5 años frente a 1305.T, 1,39, calculada por mí; bolsa.mjs da 1,47 mensual; Stock Analysis 0,94 frente a otro índice), prima 5,14 % (Damodaran ene-26). Sin deuda. Terminal 2,0 % en JPY.
  - Base con una caída cíclica moderada en FY2029e (−6 %, margen 26,5 %): Fanuc cae cada 3-4 años. Proyección a −0,7/−3,2 % del consenso en ventas y EBITDA FY26e-28e.
  - Tipo impositivo 28 % (el 25,5 % contable está rebajado por las participadas).
  - Suma de partes no aplica (segmento único). Transacciones peso 0: solo dos múltiplos de EBITDA; el motor cae a EV/ventas mezclando ABB Robotics, Hillenbrand y Altair (software).
  - Pesos: DCF 40, comparables 45, escenarios 15.
- Resultado: DCF 3.544,66 (−43,0 %); comparables 5.549,6 (−10,8 %); objetivo 4.460,49 (−28,3 %); rentabilidad total −26,6 %; asimetría −0,47x. **DCF inverso**: rentabilidad implícita 5,6 % frente a 9,58 %; crecimiento implícito 21,6 % frente a 4,3 %; margen implícito 52,5 %.
- **Recomendación: Vender (coincide con la regla), convicción Baja**: la diferencia sale de la tasa y no de las previsiones (iguales al consenso); el prompt pide convicción baja en ese caso. Lo que lo sostiene además: prima del 10-16 % sobre las medianas de comparables y múltiplos en el percentil 70-80 de su historia con el JGB 3 puntos más alto.

## Redacción, comité y entrega (11:33-11:40)
- propio.mjs + supuestos.mjs + resumen.mjs. Revisión de comité: (3) el supuesto más agresivo es el WACC, no las cifras; (4) proyección dentro del 3,2 % del consenso; (5) Harmonic Drive fuera de rango, no mueve la mediana; Keyence y SMC con crecimientos del 20 % de MarketScreener; (8) bajista = FY2019; (9) JGB, beta y acciones verificados por segunda vía; quitada una afirmación sin fuente («FY2017 de pedidos inflados por plazos») y fechado con el CSV histórico del MoF lo de «el bono estuvo cerca de cero».
- Síntesis 680 → 645 palabras. Controles: 14 de 16 correctos y 2 explicados (R² de la regresión; saltos LTM→NTM de comparables japoneses por el desfase de 18-21 meses en plena recuperación).
- Word: 60 páginas, 27 gráficos, cobertura de campos 88,6 % (capital y balance < 60 % porque no hay deuda, rating, vencimientos ni adquisiciones). Abre sin reparar; revisadas portada, síntesis, resumen con «La decisión» y síntesis de valoración. Ningún WINWORD colgado.
- Fin 11:40. **Tiempo total ≈ 48 minutos** (subagentes 23-25 min).

### Fallo del sistema 5 (transacciones con menos de tres múltiplos de EBITDA)
Con dos operaciones con EV/EBITDA, el motor valora por EV/ventas y mezcla un software a 15,4x ventas con maquinaria a 1,4x: mediana 3.413 y p75 9.705 JPY. El gráfico de síntesis lo pinta aunque pese 0 (solo lo oculta si se sale del doble o la mitad del precio). Arreglo: permitir `excluir: true` por operación (como en `multiplos_historicos`) y no pintar un método con peso 0 cuyo rango p25-p75 supere el ±50 % del central.

### Fallo del sistema 6 (beta: frecuencia y ajuste)
`bolsa.mjs` da la beta mensual bruta (1,47); la semanal de 5 años es 1,39 y la de antes de 2025, 1,20. El prompt dice «ajustada o reapalancada; di cuál» pero la herramienta no da la ajustada ni la semanal. Arreglo: que `bolsa.mjs` devuelva beta mensual y semanal, bruta y ajustada (Blume), y avise si la de los últimos 2 años se separa más de 0,3 de la de 5 años (aquí 1,80 frente a 1,39 por la subida de la «IA física»).

### Fallo del sistema 7 (recompras posteriores al balance)
El prompt pide acciones «a la fecha más reciente publicada», pero no dice qué hacer con la caja si una recompra posterior al balance reduce las acciones. D tomó las del 30-jun (933,158 M) y la recompra completada el 17-sep pasaba inadvertida: 0,9 % de las acciones y 50.000 M de caja. Arreglo: regla en el prompt (`identificacion` y `puente`): si se usan acciones posteriores al balance por recompras, restar el importe pagado de la caja del puente y decirlo en `limitaciones`.

### Fallo del sistema 8 (participadas fuera del EBITDA a valor contable)
El prompt solo contempla participadas dentro del EBITDA (`participadas_en_ebitda`) o en el puente «a valor contable salvo referencia mejor». Fanuc las tiene fuera del EBIT con un resultado de 30.531 M (17 % del EBIT) y un contable de 167.210 M (5,5x beneficio): a contable se pierden ~148 JPY por acción. Arreglo: en el prompt, si el resultado de participadas supera el 5 % del EBIT, valorarlas por múltiplo de beneficio o por dividendos y decirlo; y que el motor avise cuando asociadas / resultado de participadas < 8x.

### Fallo del sistema 9 (presupuesto de los subagentes)
B y D superaron las 80 llamadas (97 y 103) y todos tardaron 23-25 min en vez de 20. Sin daño, pero el presupuesto no se vigila. Arreglo: que `prompt-de.mjs` añada «a las 60 llamadas, cierra el campo en curso y guarda» y que el comando reserve las últimas 20 llamadas para guardar y verificar citas.

## Nota sobre las herramientas
- `descargar.mjs`: muy bien con los PDF ingleses de Fanuc (Tanshin, presentaciones, Q&A); mal con los japoneses (fallo 3). `-layout` desordena tablas del Tanshin (fallo 4): usar `pdftotext -table`.
- `bolsa.mjs`: correcto con 6954.T; sus «FY2025» (cierre de marzo de 2026) coinciden con la etiqueta «inicio» de Fanuc, pero conviene que la herramienta acepte la etiqueta para no depender de la casualidad. Vulnerable a índices con saltos falsos (fallo 1).
- `integrar.mjs`: sin problemas; agrupó fuentes repetidas entre notas (el Integrated Report de A y B quedó en una) y acepta rangos `[A1-A10]`.
- `pdf-a-png.ps1`: imprime el «·» mal codificado en la consola (cosmético); nombra las imágenes `pNN.png`.
- MarketScreener da «Access Denied» a `curl` y a `descargar.mjs`; solo abre con WebFetch (anotar en lecciones).
- EDINET: la API pide clave, pero IR BANK (`irbank.net/E01946/edinet`) da los identificadores y `https://disclosure2dl.edinet-fsa.go.jp/searchdocument/pdf/ID.pdf` descarga sin clave (lo encontró C).

## Nota sobre las particularidades de Japón
- **JGAAP**, no NIIF: sin NIIF 16 (arrendamientos operativos fuera de balance; la nueva norma japonesa llega en el ejercicio a marzo de 2028). El «ordinary income» incluye intereses, dividendos y participadas, que van al resultado financiero; EBITDA = operating income + amortización.
- **Ejercicio a marzo con etiqueta de inicio** (Fanuc: «FY2025» = abr-25 a mar-26; trimestres «1T FY26» = abr-jun 2026). Muchas japonesas nombran por el año de cierre («FY3/2026»): comprobar siempre.
- **El 1T y el 3T no traen estado de flujos** (solo es obligatorio el semestral): no hay FCF de los últimos 12 meses hasta el 2T.
- **Segmento único** declarado por Fanuc: solo ventas por división, sin márgenes.
- **Gobierno**: no hay votación anual de la retribución (el último acuerdo es de 2021), no hay registro tipo Form 4 de operaciones de directivos, y los primeros accionistas son custodios (Master Trust, Custody Bank); los porcentajes reales están en los informes de gran participación de EDINET (≥ 5 %). Los votos de cada consejero están en el «Extraordinary Report» posterior a la junta, solo en japonés. Japón solo obliga a individualizar retribuciones ≥ 100 M JPY.
- **Tasa libre**: JGB a 10 años del 3,103 % (oct-2026), lejos del ~0 % de 2016-2022: el múltiplo histórico de las japonesas de calidad es de otra época. CSV diario del MoF (`jgbcme.csv` y `historical/jgbcme_all.csv`).
- Comparables japoneses con ejercicio a marzo: el LTM queda 18 meses por detrás del NTM; en un año de recuperación el salto LTM→NTM dispara el control del motor.
- Las presentaciones usan miles de millones de yenes («billions of yen»); las cuentas, millones.

## Actualización v3 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v3.mjs` (parte de `datos-v2.json`), salida `datos-v3.json` y `Fanuc - 2026-10-07 v3.docx` / `.pdf`. Mismo precio (6.220 JPY, 6-oct) y fecha de corte. La prueba falló con los supuestos de v2 y el caso base se rebajó dentro de esta misma versión (lectura prudente, decisión del usuario del 13-oct).

| | v2 | v3 |
|---|---|---|
| Recomendación · convicción | Vender · Baja | Vender · Baja (el motor sugiere Media) |
| DCF (WACC 9,58 %) | 3.544,66 JPY | 2.938,60 JPY |
| Valor objetivo · rentabilidad total | 4.460,49 JPY, −26,6 %, asimetría −0,47x | 4.124,66 JPY, −32,0 %, asimetría −0,64x |
| Con la prima del mercado (4,20 %, WACC 8,4 %) | 4.713,09 JPY, −22,5 % | 4.313,09 JPY, −28,9 % |
| Comprar por debajo / vender por encima | 4.188,40 / 4.821,79 (la síntesis aún decía 3.724,51 / 4.572,00) | 3.481,21 / 4.421,64 |
| Crecimiento medio proyectado · financiable al ROIC | 4,3 % · n.d. («sin inversión neta»; a mano, 12,1 % × 9 % = 1,1 %) | 4,3 % · 3,8 % (+ ≈ 0,5 puntos de precio y divisa) |
| Rendimiento del capital nuevo (tope 1,25 × 12,1 % = 15,1 %) | 49,4 % (a mano) | 14,3 % |
| Veredicto de sostenibilidad | — | En parte |

- **Por qué falló**: el capex de v2 (4,0-5,0 % de las ventas) no llegaba a la amortización (4,8-5,2 %) mientras las ventas crecían un 51 % en diez años: la reinversión era solo el circulante (9 % del NOPAT) y el capital nuevo «rendía» un 49 %, frente a un ROIC del 12,1 % y un incremental histórico del 3,9 % (el capital invertido pasó de 594.696 M en FY2016 a 1.131.231 M en FY2025).
- **Supuesto cambiado**: capex de FY2027e-FY2035e del 4,5-5,0 % al **9,0 %** de las ventas, la media de FY2016-FY2025 (9,4 %). FY2026e (4,0 %) no se toca. Es el mínimo uniforme que pasa las dos pruebas (con 8,8 % el capital nuevo rinde 14,9 %, pero el financiable, 3,6 %, más el precio no llega al 4,3 %). Recortar el crecimiento no servía: el cociente NOPAT nuevo / capital nuevo no depende del crecimiento cuando el capex no cubre la amortización. Bajar el capex al final (6,5-7 %) hace fallar la prueba.
- **Puente** FY2026e-FY2028e: volumen 9,5/6/3, precio 1/1/1, divisa 1,5/0/0 (el yen a 158 frente a los 150 de la guía); reparto volumen/precio, estimación propia. `mercado_final` en null: no hay cuota publicada (hueco de la sección de competencia).
- **Textos**: síntesis (recomendación, negocio con la frase del veredicto, valoración, riesgos, niveles), tesis, visión, en contra, qué vigilar, cambiaría (nuevo disparador: crecer un ciclo con capex del 4-5 % devolvería el DCF de v2), justificación de inversión y terminal (Gordon implica 5,5x; el 15x, un 6,65 %), lectura, comentario de escenarios (ponderado 3.012,65), valoración, riesgo 1 y pregunta 1. Síntesis de 649 palabras. Control nuevo explicado: DCF inverso sin solución.
- La señal no cambia; la convicción se queda en Baja aunque el motor sugiera Media: la diferencia sigue saliendo de la tasa (y ahora de la inversión), no de las previsiones de ventas y márgenes, y los comparables (5.352-5.747 JPY) están mucho más cerca del precio que el DCF.

**Fallos del sistema vistos**
1. Con una reinversión < 15 % del NOPAT el motor declara la empresa «de activos ligeros» y no calcula ni el financiable ni el capital nuevo, aunque aquí la causa sea un capex por debajo de la amortización en una industrial con rotación de 0,76: la prueba de v2 habría pasado en silencio. Arreglo: no tratar como ligero un negocio con capital invertido / ventas > 0,5, o avisar cuando el capex proyectado < amortización con crecimiento > 3 %.
2. Con capex en la media histórica el DCF inverso no encuentra solución y el control dice «supuesto extremo»; aquí es la consecuencia lógica de un ROIC marginal cerca del WACC. Arreglo: que el motor distinga «crecer no crea valor» (ROIC del capital nuevo < WACC + 5) y lo diga así.
3. El capex del 9 % se aplica también al año terminal (crecimiento del 2 %), lo que sobreinvierte en la perpetuidad; bajar el capex al final hace fallar la prueba porque el motor mide el rendimiento del capital nuevo sobre los diez años. Arreglo: que el terminal normalice la inversión neta a g / ROIC, como hace la etapa de transición.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 6.043 JPY (ponderado; base 6.221), rentabilidad −1,1 %, señal Mantener (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada -1,1 % → -1,1 %, base +1,7 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v4.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 26.6x, mínimo 22.7x, media larga 31.6x; antes v2 26.7x/25.8x/27.1x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v4.json y «Fanuc - 2026-10-07 v4.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 1,7 % (antes v3 Mantener 1,7 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 25,8x / 26,7x / 27,1x, -1,1 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
