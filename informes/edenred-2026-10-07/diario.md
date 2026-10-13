# Diario — EDENRED SE (EDEN) — corte 2026-10-07

- Inicio: 2026-10-07 17:15 (hora local).
- Commit de partida: `8ed71de Prompt: columna exacta de la prima implícita de Damodaran (4,20 % en oct 2026)`. No se cambia de versión del prompt durante el análisis.
- Procedimiento: `.claude/commands/analiza-empresa.md` + `verticales/empresa/prompt.md` (leído entero) + `lecciones.md`.
- En paralelo corren otros análisis: solo se escribe en `informes/edenred-2026-10-07/` y en `%TEMP%\analisis-inversion\edenred*`.

## Fase 1 — Identificación (17:15-17:22)
- Edenred SE, Euronext Paris `EDEN` (Yahoo `EDEN.PA`), ISIN FR0010908533. Cuentas en EUR, NIIF-UE, ejercicio natural. Cotiza en EUR: tipo 1.
- Último informe: semestral 1S26 (23-jul-2026): ingresos totales 1.473 M (+1,5 % comparable), de ellos *other revenue* 113 M; EBITDA 616 M (−4,6 % comparable); guía 2026 mejorada a EBITDA −7 % / −10 % comparable (≈1.230-1.270 M); 2027-28: EBITDA +8 % / +12 % y conversión ≥65 %. A− de S&P confirmado en julio.
- Próximos resultados: ingresos del 3T26 el 21-oct-2026 (nota de prensa del 1S26, calendario).
- Sesión del 7-oct abierta a las 17:15 (cierra a las 17:30): el precio será el cierre del 6-oct.

## Fases 2-4 — Subagentes A-D
- Lanzados a las 17:22 con el aviso de guardar antes de la llamada 15.
- Control de los 10 minutos (17:28): **los cuatro ya habían guardado** (A 29 KB, B 8 KB, C 14 KB, D 16 KB + bolsa.json). El aviso «guarda antes de la llamada 15» en el encargo funcionó; no hizo falta recordatorio.
- 17:29: el coordinador pide además el PDF en la carpeta del informe con `a-pdf.ps1 … -Salida`.
- C terminó a las ~17:35 (87 llamadas, 12 min): consejo 11 (8 de 9 independientes), PDG Dumazy reelegido hasta 2030, votos de remuneración con hasta 34,33 % en contra (política 2024), Rock Investment (Niel) 8 % en opciones de compra con liquidación en efectivo (ejercitables ene-may 2027), aproximaciones exploratorias de fondos admitidas el 18-jun-2026. BDIF de la AMF abrió por API: 21 declaraciones.
- B terminó a las ~17:35 (88 llamadas): decreto brasileño 12.712 leído en Planalto (tope 3,6 % MDR, 2 % intercambio, pago en 15 días), Italia ley 193/2024 (tope 5 %), Francia PPL 2892 (digital desde 2028, sin tope de comisión). Corrigió el encargo: los objetivos >8/>10/>65 % eran de Next Frontier, no de Beyond22-25.
- A terminó a las ~17:36 (93 llamadas) y D a las ~17:38 (105 llamadas). Los cuatro subagentes acabaron antes del corte; no hubo que relanzar ninguno.

## Integración y cálculo (17:38-17:42; corte de sesión hacia las 17:42; se reanuda después)
- Primer cálculo con la deuda neta de la empresa: DCF 67,68. Variantes en `notas/variantes.mjs` (copia en %TEMP%).
- **Decisión del float** (D y yo llegamos a lo mismo): de los 4.357 M de float neto a jun-26, 1.618 están en caja restringida y ≈2.739 M financian la caja «libre» de 3.319 M que la empresa resta en su deuda neta. Usar esa deuda neta y a la vez un EBITDA con todo el other revenue cuenta el rendimiento del float dos veces. Caso base = visión operativa: el float no es caja libre (+2.739 M en `otros_ajustes`), el circulante del DCF es el que no es float (−30 % de las ventas) y el EBITDA lleva todo el other revenue (= EBITDA de la empresa y del consenso). Variante «criterio de la empresa» (caja libre, flujo libre con el crecimiento del float, EBITDA sin el 64 % del other revenue): 60,72 EUR.
- Reanudado tras el corte: notas A-D completas en disco, no hizo falta relanzar nada.
- Base final: **visión operativa del float** (2.739 M a `otros_ajustes` + 113 M de recompras jul-sep = 2.852 M), EBITDA con todo el other revenue, circulante sin float de −30 % (2024 −35,3 %, 2025 −31,5 % tras parchear clientes/proveedores sin cuentas ligadas ni fondos a reembolsar). Minoritarios a 12x su beneficio (516 M en vez de 122 M contables: −1,72 EUR/acción).
- Proyección en `supuestos.mjs` con dos motores: ingresos operativos × margen operativo + other revenue = float (1,62x ingresos operativos) × rendimiento (4,3 % → 3,5 %). EBITDA 2026e 1.256 (guía 1.230-1.270), +9,6 % 2027e, +8,1 % 2028e: +0,2/+2,0/+2,2 % sobre el consenso.
- WACC 8,65 %: OAT 4,00 % (media de agosto, BCE), beta 1,00 (STOXX 600 mensual 1,01; CAC 40 0,83; semanales de 2 años 0,96-1,09 en los 4 índices), prima 5,5 % + 0,8 regulatoria. Terminal 2,5 %. Etapa 2 no (ROIC operativo ≈21 % pero el exceso viene del float y de comisiones que los reguladores recortan; 5 años solo darían +0,78 EUR).
- Variantes (`variantes.mjs`): criterio de la empresa 60,72; sin corregir el doble cómputo 66,93; −100 pb del float 43,24; BRL −10 % 44,45; beta 0,83 55,06; beta 1,09 41,80; minoritarios contables 47,56; etapa 2 de 5 años 46,62.
- Resultado: DCF 45,84 (+66,0 %); escenarios 23,10 / 45,84 / 60,90 (30/50/20); objetivo 42,22 (+52,9 %), RT 12 m +57,7 %, asimetría 7,40x → regla absoluta Comprar. Relativa (prima 4,20 %, WACC 7,64 %): objetivo 54,10, RT +100,8 % → Comprar. **Comprar, convicción media** (las cifras coinciden con el consenso y la diferencia viene de la tasa que pide el precio; hay catalizadores con fecha: 12-oct ley francesa, 21-oct 3T, 2-mar-2027 guía 2027, ventana de opciones de Rock Investment ene-may 2027).
- DCF inverso: crecimiento 1,2 % (base 5,1 %), margen 33,9 % (base 44,2 %), rentabilidad implícita 10,9 %.
- Controles: 13 correctos y 6 explicados (tipo impositivo 2023, EBIT+RF≠BAI por «otros ingresos y gastos» en 4 años, comparables frágiles). 65 fuentes (47 primarias), todas citadas. Cobertura 92,6 %. Word de 59 páginas y 28 gráficos; PDF generado en la carpeta del informe (abre sin reparar). Revisadas como imagen las páginas 1-3 y 43.

## Revisión de comité (resumen)
1. Convergencia: el precio descuenta un crecimiento del 1,2 % anual; si 2027 confirma +8 % de EBITDA, el mercado tiene que dejar de pedir un 10,9 %. Comprar sale de las dos reglas.
2. DCF inverso conservador (1,2 % frente a 11,5 % histórico y 5,1 % base): lo dice la síntesis.
3. Supuesto más agresivo: margen EBITDA operativo del 41,0 % desde 2029e (41,4 % en 2025 antes de los topes) y terminal del 2,5 % en un negocio regulado.
4. Proyección a +0,2/+2,2 % del consenso: dentro del 10 %.
5. Comparables frágiles (Pluxee 1,9x por su caja de clientes): peso 10 %, se lee el PER.
8. Bajista: tercer tope (Francia) + pérdida permanente; −16,3 %, por encima del mínimo de 52 semanas (15,23).
9. Dato crítico: el trato del float (11,96 EUR por acción) y la beta (41,80-55,06). Ambos con la variante en el texto.

## Fallos del sistema
1. **El motor no sabe tratar el float.** Edenred resta en su deuda neta 2.739 M de caja financiada por clientes y a la vez mete su rendimiento en el EBITDA; el puente y los múltiplos lo cuentan dos veces si se usa la deuda neta de la empresa. Hubo que hacerlo a mano (`otros_ajustes`, parches de circulante, margen calculado en un script). Arreglo: campos `balance.historico[].float` y `caja_restringida` y `financieros.cuenta[].ingresos_float`, y una opción `valoracion.criterio_float: "operativo"|"caja"` que el motor aplique de forma coherente al puente, al circulante del DCF y al EBITDA.
2. **El ROIC del motor no tiene sentido con patrimonio negativo y circulante negativo** (−795,7 % en 2020, 130,8 % en 2025). Arreglo: que el motor calcule también el ROIC sobre capital operativo (inmovilizado + fondo de comercio + circulante sin pasivos de clientes) y avise si el capital invertido es negativo.
3. **Múltiplos históricos y comparables mezclan criterios del puente**: el EV actual lleva `otros_ajustes` y los históricos y los comparables no (8,7x frente a 6,6x homogéneo). Arreglo: que el motor compare con la historia usando la misma deuda neta (sin `otros_ajustes`) o los ajuste también en la serie.
4. **La regresión múltiplo-crecimiento se marca «fiable» con cinco puntos (R² 0,59) y da 7,77 EUR**: un valor absurdo con apariencia de fiable. Arreglo: exigir n ≥ 6 y avisar si el valor implícito se aleja más de un 50 % de la mediana.
5. **`a-pdf.ps1 -Salida` con ruta relativa falla** («The directory name isn't valid»): Word necesita ruta absoluta. Arreglo: `Resolve-Path`/`[IO.Path]::GetFullPath` sobre `$Salida` dentro del script.
6. **El control «EBIT + resultado financiero = BAI» salta en cuatro años** porque la empresa deja «otros ingresos y gastos» bajo el EBIT. Arreglo: campo `otros_ingresos_gastos` en la cuenta que el control sume.
7. **`formato_cuenta: "naturaleza"` con `gastos_generales` = todos los gastos operativos** (A lo rellenó así): el prompt pide `null`, y el integrador no avisa. Arreglo: aviso en `integrar.mjs` si `formato_cuenta` es naturaleza y `gastos_generales` no es `null`.
8. **Corte de sesión hacia las 17:42**: no se perdió nada (notas, `supuestos.mjs`, `variantes.mjs` y diario en disco). El aviso de guardar antes de la llamada 15 funcionó: a los 10 minutos los cuatro subagentes tenían nota (fallo 1 del diario de Rational, resuelto por el encargo).
9. **OAT diaria sin fuente oficial gratuita** (Banque de France pide clave, BCE solo mensual): se usó la media de agosto. Arreglo: añadir a `lecciones.md` la serie diaria de rendimientos del BCE para la zona euro o la del Bundesbank más el diferencial, y documentar la fuente francesa.
- Fin: 18:04. Tiempo ≈ 49 min (17:15-18:04), con el corte de sesión hacia las 17:42 y la reanudación.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Edenred - 2026-10-07 v2.docx` y su PDF. Mismo precio (27,61 EUR, cierre del 6-oct) y fecha de corte. Sin cambios en los supuestos del DCF.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Media | Comprar · Media (los criterios sugieren Alta; explicado en la síntesis) |
| Valor objetivo (WACC 8,65 %) | 42,22 EUR, RTE +57,7 %, asimetría 7,40x | 42,22 EUR, RTE +57,7 %, asimetría 7,40x |
| Con la prima del mercado (4,20 %, WACC 7,64 %) | 54,10 EUR, RTE +100,8 % | 54,10 EUR, RTE +100,8 % |
| Comprar por debajo / vender por encima | 48,17 / 61,60 | 41,46 / 61,60 (cambio del motor, mismas cifras) |
| Sostenibilidad del crecimiento | — | **En parte** (4,8 % anual proyectado; reinversión neta −6 % del NOPAT; sin mercado final comparable) |

- **Puente 2026e-2029e** (estimación propia con los dos motores de `supuestos.mjs`, ponderado por el 92-93 % de ingresos operativos): 2026e volumen +7,4 (intrínseco del 8,0 % del 1S26), precio −6,0 (topes de Italia y Brasil, −6,5 puntos), otros −0,1 (other revenue −0,6, divisa y perímetro +0,5); 2027e +6,5 / −0,9 / −0,1; 2028e +6,5 / 0 / 0; 2029e +6,1 / 0 / +0,1. Cuadra con el DCF.
- **Mercado final: null.** La cuota del 35 % es la de títulos restaurante en Francia (valor facial); los ingresos del DCF son del grupo (44 países y Mobility). El mercado francés a la comisión media de Edenred (≈5,6 %) daría una cuota de cientos por cien. No hay estadística global del sector. La prueba de cuota se hizo a mano: volumen de negocio de 49.000 M, el doble que Pluxee, y penetración inferior al 40 % en sus mercados históricos.
- **Veredicto «En parte»**: el volumen se sostiene y lo financia el circulante negativo (activos ligeros: la prueba es precio y cuota), pero el precio lo fija en parte el regulador y la comisión media ya bajaba en 2025 (volumen +9 % frente a ingresos +6,2 %). No se baja el base porque ya crece por debajo del intrínseco (6-7 % frente al 8,0 %), supone comisión constante sin subidas y el tope francés está en el bajista (30 %): dicho en la síntesis.
- Convicción: el control nuevo sugiere Alta; se mantiene Media por el veredicto «En parte», la dependencia del trato del float (11,96 EUR/acción) y de la beta (41,80-55,06 EUR), y la ley francesa pendiente.

**Fallos del sistema vistos**
1. **El ROIC del motor (130,8 %) entra en la prueba de sostenibilidad y en la tabla** aunque el capital invertido es casi nulo por el float; el incremental histórico (26,7 %) mezcla años con capital negativo. Arreglo: el campo de flotante pendiente (fallo 1 de v1) y no imprimir el ROIC si el capital invertido es inferior al 10 % de las ventas.
2. **La cuota de `competencia.cuota_pct` es de un solo país** y no hay campo para el perímetro: el motor no puede saber que no compara con los ingresos del grupo. Arreglo: `competencia.cuota_perimetro` (o `mercado_final.ingresos_perimetro`) para comparar la cuota con los ingresos del mismo segmento.
3. **«Comprar por debajo» pasa de 48,17 a 41,46 EUR con las mismas cifras** por un cambio del motor posterior al 7-oct; el informe v1 publicado queda con otro nivel. Arreglo: anotar en el registro de cambios del motor qué informes cambian de niveles al recalcular.
4. **La división volumen/precio en un negocio de comisiones sobre volumen** no está definida en el prompt (¿el valor facial es volumen o precio?). Aquí: volumen = volumen de negocio a comisión media constante (incluye valor facial); precio = cambio de la comisión media. Arreglo: una línea en el prompt para plataformas con tasa sobre volumen.

- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 39,63 EUR, rentabilidad +48,3 %, señal Comprar (`revision-12m-2026-10-13.md`).
