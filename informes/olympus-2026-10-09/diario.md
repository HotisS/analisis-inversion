# Diario: Olympus Corporation (7733.T), corte 2026-10-09

- Commit de partida: `37c0161 Informe de Fielmann (Comprar, convicción media)` (el repo no es un clon de git en esta copia: `git log` responde con ese commit). Prompt y lecciones leídos enteros (lecciones con la «Vuelta 11»).
- Inicio: 10:07 (Madrid) = 17:07 en Tokio. La sesión del 9 ya había cerrado y Yahoo ya tenía el cierre: 2.000 JPY (`bolsa.mjs`, sin aviso de cierre).
- Tanda en paralelo: trabajo solo en `informes/olympus-2026-10-09/` y `%TEMP%\analisis-inversion\olympus` (subagentes con su letra detrás).

## Fase 1. Identificación (10:07-10:13)
- Olympus Corporation. TSE Prime 7733, ISIN JP3201200007. NIIF. Cierre a 31 de marzo. Divisa JPY.
- **Etiqueta del ejercicio: la contraria a la que traía el encargo.** El tanshin del 1T dice «Three Months of the Fiscal Year Ending March 31, 2027» y lo llama «1st Quarter of FY2027»: Olympus nombra el ejercicio por el año en que **termina** (FY2026 = abril 2025-marzo 2026). `meta.etiqueta_ejercicio: "fin"` y `bolsa.mjs --cierre-mes 3 --etiqueta fin` (por defecto la herramienta habría puesto «inicio» y desplazado un año los cierres de cada ejercicio). Equivalencia pasada a los cuatro subagentes.
- Último informe: 1T FY2027 (abr-jun 2026), 7-ago-2026. Ingresos 240.400 M (+16,4 %; +5 % a tipo constante), beneficio operativo ajustado 30.676 M (12,8 %). Guía FY2027 sin cambios: ingresos 1.055.000-1.076.000 M, margen operativo ajustado 15,2-16,7 %, BPA ajustado 106-119 JPY. Próximos resultados (2T): 10-nov-2026.
- Primer ejecutivo: Bob White (el tanshin lo firma como representante). Acciones: 1.114,49 M emitidas, 51,67 M en autocartera a 30-jun-2026 (13,38 M a 31-mar): recompra en marcha.
- Segmentos vigentes: GIS y SIS (desde FY2027, «Other» pasa a «Corporate and Elimination»). FDA: «la mayoría de los productos retenidos vuelve al mercado en el 2S FY27».
- Subagentes A-D lanzados a las 10:13.

## Mientras trabajan (10:13-)
- Betas (5 años) de 7733.T: TOPIX (1305.T) 0,52 mensual / 0,83 semanal (0,68 y 0,89 ajustadas); Nikkei 225 0,31 / 0,58; IHI (tecnología médica de EE. UU.) 0,31 / 0,55; IXJ (salud mundial) 0,46 / 0,60. Damodaran ene-26: «Healthcare Products» Japón 1,03 apalancada, 0,96 desapalancada (1,06 corregida por caja; 39 empresas); mundo 1,18 / 1,07 / 1,12 (842 empresas). Leídas convirtiendo el .xls a CSV con Excel por COM (Excel cerrado después; no se tocó Word).
- Prima implícita de Damodaran, octubre de 2026, «ERP (T12m with sustainable payout)»: 4,20 % (confirmada en la última fila del Excel). Prima madura 4,23 %, prima país de Japón 0,91 %, EE. UU. 0,23 %, Europa occidental 1,04 % (media ponderada), China 0,91 %, Asia 1,49 % (ctryprem ene-26).

## Subagentes (10:13-10:32)
- A (cuentas) 12 min, 72 llamadas; D (mercado) 11,5 min, 85; C (gobierno) 12,5 min, 74; B (sector y FDA) 19 min, 91. A los 10 minutos A, B y C tenían contenido real; D seguía con identificación, bolsa y puente: recordatorio por mensaje y lo completó a los 2 minutos.
- La integración no pisó listas (B no escribió segmentos). Ningún aviso de notas de trabajo.
- Hallazgos clave: FY2026 ventas 1.010.676 M, EBIT 97.120 M, margen ajustado 14,2 % (aranceles −18.000 M netos, FDA ≈ −30.000 M, plantilla 26.872 M). Alerta de importación 89-04 sobre Aizu en vigor a 19-ago-2026; sin cartas de advertencia después de 2023 (el encargo hablaba de 2024-2025: no se encontraron). Recompra de 60.000 M el 13-may-2026 a 1.540,5 JPY con deuda; S&P BBB+ negativa. Tres cambios de primer ejecutivo en 24 meses; Fujita reelegido con el 70,27 % en 2024.

## Integración, cálculo y redacción (10:32-10:41)
- Archivos del analista: `notas/propio.mjs` (importa `supuestos.mjs`, `textos.mjs` y `resumen.mjs`).
- **WACC 7,18 %**: JGB 3,089 % (8-oct, MoF); beta 0,99 = media de la propia semanal frente al TOPIX ajustada (0,89) y la sectorial japonesa de Damodaran reapalancada (0,96 → 1,08); prima madura 4,23 % y **prima país 0,75 % ponderada por geografía de ventas** (no la de Japón entera, 0,91 %, como Daiichi: Olympus vende el 90 % fuera de Japón y el prompt pide la prima por dónde vende). Con 0,91 la diferencia sería de unos 15 puntos básicos.
- DCF a 10 años sin etapa 2 (ROIC de FY2026 7,9 %, mercado maduro). Margen EBITDA 20,4 % → 23,0 %; proyección dentro del ±1,1 % del consenso en EBITDA. Capex de la guía (95.000 M con derechos de uso).
- Bajista: primera versión con terminal 1,5 % además de +0,5 de WACC daba −42,7 % y la regla absoluta Vender por milésimas (asimetría 0,50); quité la doble penalización del terminal (el WACC más alto ya recoge el riesgo) → −39,1 %, asimetría 0,52, las dos reglas Mantener. Lo dejo dicho: la regla absoluta está en el filo.
- Resultado: DCF 1.947,70 · comparables 1.941,40 · escenarios 1.879,22 · valor objetivo 1.932,11 (−3,4 %, total −1,9 %), asimetría 0,52; relativa 1.939,91 (−1,5 %). Mantener, convicción media. DCF inverso: margen 23,3 % o crecimiento 4,1 %.
- Controles: 14 correctos y 4 explicados (operaciones interrumpidas en FY2022-FY2024; caja proyectada frente a la histórica). Síntesis de 646 palabras. Word (59 páginas, 28 gráficos, cobertura 88,5 %) y PDF; revisadas como imagen las páginas 1-4.

## Tiempos
- Fase 1: 10:07-10:13. Subagentes: 10:13-10:32 (mientras, betas, Damodaran y lectura de la guía). Integración, supuestos, redacción, Word y PDF: 10:32-10:41 (más la revisión). Total ≈ 40 minutos.

## Fallos del sistema
1. **Etiqueta del ejercicio errónea en el encargo y en la herramienta.** El encargo decía que Olympus nombra el ejercicio por el año en que empieza y `bolsa.mjs` asume «inicio» para cierres en marzo; Olympus usa el año en que termina («1st Quarter of FY2027» = abr-jun 2026). Sin comprobarlo, los cierres de cada ejercicio habrían quedado desplazados un año. Arreglo propuesto: que `bolsa.mjs` no tenga valor por defecto para cierres en enero-marzo (exigir `--etiqueta`) y que las lecciones digan «Japón: comprobar en el tanshin, no suponer» (Daiichi, Fanuc y Keyence usan «inicio»; Olympus, «fin»).
2. **Betas sectoriales de Damodaran en .xls binario.** `descargar.mjs` los guarda como `.xlsx` y no se pueden leer sin Excel; los convertí a CSV con Excel por COM. Arreglo: que `descargar.mjs` respete la extensión `.xls` y añadir a `herramientas/` un lector de la tabla de betas (o usar la versión HTML si existe).
3. **Prima país incoherente entre informes japoneses.** Daiichi puso la de Japón entera (0,91 %); el prompt pide la de dónde vende la empresa. Aquí, ponderada con `negocio.geografias`, 0,75 %. Arreglo: que el motor calcule la prima país ponderada a partir de las geografías y de una tabla de Damodaran, y avise si `prima_adicional_pct` se aparta mucho.
4. **Comparables con EBITDA de definiciones distintas** (EE. UU. y Reino Unido ajustados en MarketScreener frente al NIIF de Olympus). El motor no tiene forma de homogeneizarlos y el valor por comparables queda sesgado a la baja; solo se puede decir en el texto. Arreglo: campo `comparables.empresas[].ajuste_ebitda_pct` o una marca de base para excluirlos del EV/EBITDA.
5. **La regla absoluta en el filo de 0,5 de asimetría.** Un cambio razonable del bajista (terminal 1,5 % o 2,0 %) movía la regla absoluta de Vender a Mantener. Arreglo: que el motor informe de la asimetría con dos decimales y avise cuando la regla cambia con menos de 0,05 de margen, para que el texto lo diga.
6. **Transacciones casi sin EV/EBITDA publicado** (solo Hologic). El motor usa EV/ventas y da 4.267,58 JPY, un 113 % sobre el precio; con peso 0 no deforma la decisión, pero ocupa la tabla de síntesis. Arreglo: el ya propuesto en Daiichi (marcar la sección como «solo referencia»).
7. **Esperas largas con `until … sleep`** en Bash: el límite de 600 s pasó una de ellas a segundo plano. Arreglo: esperar siempre en segundo plano y no bloquear.
8. **Un subagente devolvió el resumen en inglés** (la nota sí estaba en español). Arreglo: recordar en el encargo «responde en español».

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Olympus - 2026-10-09 v2.docx` y su PDF. Mismo precio (2.000 JPY) y fecha de corte. Añade `dcf.sostenibilidad` y, como la prueba fallaba, el recorte mínimo del caso base (lectura prudente, `encargo-recorte.md`) en la misma versión.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Mantener · Media | **Vender · Baja** |
| DCF (WACC 7,18 %) | 1.947,70 JPY | 1.905,08 JPY |
| Valor objetivo | 1.932,11 JPY, RTE −1,9 %, asimetría 0,52x | 1.902,53 JPY, RTE −3,4 %, asimetría 0,44x |
| Con la prima del mercado (4,20 %) | 1.939,91 JPY, RTE −1,5 % | 1.910,16 JPY, RTE −3,0 %, asimetría 0,46x |
| Regla absoluta / relativa | Mantener / Mantener | Vender / Vender |
| Niveles | Comprar < 1.711,85; Vender > 2.020,99 | Comprar < 1.685,64; Vender > 1.978,63 (el precio, un 1,1 % por encima) |
| Margen EBITDA final | 23,0 % | 22,7 % (el de FY2025) |
| Crecimiento medio proyectado / financiable | 3,7 % / 1,7 % (ROIC FY2026 7,9 %) | 3,7 % / 1,7 % (3,3 % con el ROIC de FY2025, 15,1 %) |
| Capital nuevo (implícito) | 31,9 % | 30,9 % (control explicado) |
| Sostenibilidad | — | En parte |

- **La prueba falla por el año de partida, no por el crecimiento.** Con el ROIC de FY2026 (7,9 %, hundido por 26.872 M del programa de plantilla, ≈ 30.000 M de ventas retenidas por la FDA y 18.000 M de aranceles) la reinversión (22 % del NOPAT) financia un 1,7 % anual, y la vuelta del margen desde el 15,9 % parece un 31,9 % de rendimiento del capital nuevo. Bajar el crecimiento no lo arregla: con un 3,0 % de media sale financiable 1,6 % e implícito 31,2 %, porque la reinversión baja con él. Pasar la prueba al pie de la letra exigiría un margen casi plano en el 16 %, contra la guía y el consenso.
- **Recorte mínimo**: lo único por encima de lo demostrado era el margen final (23,0 % frente al 22,7 % de FY2025, el último ejercicio limpio): se limita al 22,7 % desde FY2030e. El crecimiento no se toca: el 3,7 % apenas supera el 3,4 % del mercado (la cuota casi no se mueve; prueba a mano porque el 70 % es de un segmento) y con el ROIC de FY2025 la reinversión financia un 3,3 %, más ≈ 0,6 puntos de precio del puente. El control del capital nuevo va a `controles_explicados` (medido desde FY2025 rinde ≈ 16 %).
- **La señal cambia a Vender** por 0,3 puntos de margen: la asimetría baja de 0,52x a 0,44x (bajista que pesa más del doble que el alcista con RTE negativa) en las dos reglas. Convicción baja frente a la media que sugieren los criterios (dicho en la síntesis): el precio está a un 1,1 % del umbral y es reducir, no salir.
- Textos reescritos: síntesis (645 palabras), tesis, visión diferencial, «en contra», qué cambiaría, márgenes y terminal del DCF (8,9x implícito), lectura, escenarios (base al 22,7 %, alcista al 24,7 %), comentarios de valoración y rentabilidad, efectos de tres riesgos.

**Fallos del sistema vistos**
1. La prueba de reinversión usa el ROIC y el NOPAT del último ejercicio. Con un año de partida deprimido por partidas puntuales (Olympus FY2026), el crecimiento financiable sale bajo y el «capital nuevo» rinde un 31 % aunque la proyección solo vuelva al margen de FY2025; ninguna rebaja razonable del crecimiento lo arregla. Arreglo: que el motor admita un año base normalizado (`sostenibilidad.anio_base`) o use la mediana del ROIC de cinco años.
2. La regla de recomendación salta de Mantener a Vender con 0,3 puntos de margen final por el umbral de asimetría de 0,5x (ya visto en v1 con el terminal del bajista). Arreglo: avisar cuando la asimetría está a menos de 0,05 del umbral.
3. El aviso «Tabla sin filas: calc.suma_partes.partes» sigue saliendo en un informe sin suma de partes.

- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 2.247 JPY, rentabilidad +13,9 %, señal Mantener (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +13,9 % → +12,8 %, base +12,0 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v3.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 21.1x, mínimo 11.6x, media larga 21.4x; antes v2 20.5x/18.9x/21.8x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
