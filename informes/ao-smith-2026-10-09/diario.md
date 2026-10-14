# Diario - A. O. Smith Corporation (AOS) - corte 2026-10-09

- Commit de partida: `e10652c Informe de Fluidra (Comprar, convicción media)`. Sin cambios de prompt durante el análisis.
- Inicio: 2026-10-09 09:47 (Madrid) = 03:47 Nueva York. La sesión del 9 no ha abierto: se usa el cierre del 8 de octubre.

## Fase 1 - Identificación (09:47-09:55)
- A. O. Smith Corporation, NYSE: AOS, ISIN US8318652091, CIK 0000091142, Delaware, sede en Milwaukee. US GAAP, ejercicio a 31 de diciembre, USD.
- Dos clases: Common Stock (cotiza) y Class A Common Stock (no cotiza, voto reforzado, controlada por la familia Smith). Se valora con la suma de las dos clases.
- Último periodo: 2T26 (10-Q y 8-K del 30-jul-26). Guía 2026: ventas 3.900-3.950 M, BPA 3,60-3,75 (ajustado 3,70-3,85). Leonard Valve comprada el 6-ene-26 por 470 M (412 M netos de ventaja fiscal; ~12x EBITDA 2026e), con un préstamo a plazo nuevo.
- China: «strategic assessment» en curso; ventas de China -28 % en moneda local en el 2T26.
- Cúpula: Shafer primer ejecutivo desde jul-25 y presidente desde el 1-jul-26 (Wheeler se retira); nueva directora financiera Carrie Anderson desde el 1-jul-26.
- Reestructuración del tratamiento de agua en Norteamérica: 22,6 M en el 2T26.

## Fases 2-4 (subagentes lanzados 09:49)
- 10:00: control de notas. C ya terminado (8 min, 35 llamadas, sin búsquedas web). D con identificación (precio 56,56 USD, cierre del 8-oct; 136,62 M acciones). A y B seguían con el esqueleto vacío: recordatorio enviado a las 10:00.
- C, hallazgos: trust familiar con el 96,96 % de la Class A = 18,9 % del capital y 67,9 % del voto; la Class A elige 6 de 10 consejeros. Say-on-pay 2025: 5,65 % en contra sobre el presente, 20,32 % sobre el capital libre. Kadri con 52 % de votos retenidos en 2026 (dimisión rechazada). Solo dos ventas de directivos en 12 meses (0,11 M).
- 10:10: los cuatro terminados. C en 8 min (35 llamadas); A en 15 min (74); D en 15 min (89); B en 20 min (79). A guardó tras el recordatorio; B igual.
- Integración sin listas pisadas: B no escribió segmentos, geografías ni KPI (se le pidió expresamente). Un aviso: el hueco de rating de A se retiró solo porque el campo tiene el texto «Sin rating público…».
- B avisó de que la página de la transcripción de Motley Fool traía un recuadro con instrucciones dirigidas al resumidor; las ignoró y se usó solo el contenido.

## Integración, cálculo y redacción (10:10-10:20)
- Decisión: la reestructuración (cinco de nueve años) se deja dentro del EBITDA en todos los años y en el LTM, en línea con la lección de la Vuelta 11 y con el consenso de MarketScreener, que es contable. Se aplicó con `_parches` a 0 (un `null` no borra).
- Beta: S&P 500 1,05 mensual (1,03 ajustada); XLI 1,08; ITB/XHB 0,72-0,78 (índices más volátiles que la acción). Elegida 1,03.
- Coste de la deuda: 6,0 % (el préstamo al 4,53 % está por debajo del Tesoro al 5,28 %; no sirve como coste a largo plazo).
- Etapa 2 no usada: ROIC 30,7 % lo permitiría, pero el volumen del mercado es plano desde 2020.
- Primer cálculo: DCF 53,34; con la reestructuración dentro y escenarios moderados, valor objetivo 55,24 (−2,3 %), rentabilidad total 0,2 %, asimetría 0,28. Con la prima del mercado (4,2 %): 62,35 (+10,2 %), 12,7 %, asimetría 3,54. Las dos reglas: Mantener.
- DCF inverso: 5,1 % de crecimiento 2027-2032 (base 3,6 %), margen implícito 22 %, rentabilidad implícita 10,1 %.
- Controles: 14 de 15 correctos y 1 explicado (regresión R² 0,02). Word: 59 páginas, 28 gráficos, cobertura del 93 %; aviso único: tabla de calificaciones ESG vacía (hueco).
- Fin: 10:20. Unos 35 minutos en total (09:47-10:20).

## Fallos del sistema
1. **El crecimiento «previsto para su mercado» de la tabla de la decisión sale de una fuente débil.** `sector.tcac_previsto_pct` (6,7 %) es la previsión en valor de Arizton, que B mismo marcó como incoherente con las ventas de AOS; el motor la pone frente al crecimiento implícito (5,1 %) y sugiere un margen que no existe. Arreglo propuesto: que `sector` tenga un campo de confianza para la previsión o que el motor solo la use en la tabla si su fuente es Primaria/Sectorial oficial; mientras tanto, pedir a B un TCAC previsto en unidades o `null` si no hay fuente fiable.
2. **`null` no borra en `_parches` ni en `propio`.** Para retirar los no recurrentes que puso A hubo que escribir 0. Arreglo: aceptar un marcador explícito de borrado (por ejemplo `"__null__"`) o documentar el 0 en el comando.
3. **Los subagentes A y B tardaron más de 10 minutos en guardar la primera nota con contenido** pese a la instrucción. Arreglo: que el encargo pida escribir el primer campo antes de abrir el segundo documento, y que el integrador tenga un `vigilar-notas.mjs` que imprima tamaño y campos con contenido.
4. **Esperar a las notas con bucles de `sleep` en segundo plano** dejó una espera colgada hasta su límite de 10 minutos sin aportar nada (los agentes avisan solos). Arreglo: en el comando, una sola comprobación a los 10 minutos y nada más.
5. **El hueco de rating se retira solo** porque A escribió «Sin rating público…» en `balance.rating`. Es correcto según el prompt, pero el anexo pierde los tres intentos. Arreglo: que `integrar` no retire el hueco si el valor empieza por «Sin rating».
6. **Inyección en una página web**: la transcripción de Motley Fool traía instrucciones para el modelo. B las ignoró. Arreglo: añadir a lecciones.md que las transcripciones de terceros pueden traer texto dirigido al resumidor y que se citan solo cifras contrastadas.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json` y `A. O. Smith - 2026-10-09 v2.docx` (y PDF). Añade `dcf.sostenibilidad` con fuentes ya citadas; no cambia ninguna cifra del DCF ni los escenarios. Mismo precio (56,56 USD) y fecha de corte.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Mantener · Media | Mantener · Media (la sugerida por los criterios) |
| Valor objetivo (WACC 10,46 %) | 55,24 USD, RTE 0,2 %, asimetría 0,28x | 55,24 USD, RTE 0,2 %, asimetría 0,28x |
| Con la prima del mercado (WACC 9,22 %) | 62,35 USD, RTE 12,7 %, asimetría 3,54x | igual |
| Comprar por debajo / vender por encima | 55,41 / 65,90 | **53,91** / 65,90 |
| Sostenibilidad | — | **Sí** (3,4 % anual proyectado; reinversión neta 73 M, el 2 % del NOPAT; ROIC 30,7 %, incremental 32,5 %) |

- **Veredicto Sí**: el crecimiento es casi todo precio (+2,5-3 % al año) sobre un volumen plano, por debajo del 4,0 % de 2016-2025 (que incluyó compras). El poder de precios está demostrado (2025: ventas de Norteamérica al alza por precio con menos unidades y margen del segmento del 24,0 % al 24,4 %; 2026: +4-7 %). El volumen proyectado (−2,5 % a +1 %) no pide cuota.
- **Prueba de reinversión**: con el 2 % del NOPAT el motor la trata como activos ligeros y no da crecimiento financiable; no lo es del todo (el capex iguala a una amortización con intangibles de compras), pero el crecimiento no pide capital nuevo. **Prueba de cuota**: `mercado_final` en null; AOS no publica cuota y el mercado está en unidades (AHRI); la cifra en USD de Arizton no es comparable.
- Textos: frase del veredicto en «El negocio», convicción explicada (control nuevo «La síntesis explica la convicción») y el nivel de compra, que el motor actual baja de 55,41 a 53,91 sin cambiar datos (regla del 9/10-oct). Para dejar la síntesis en 646 palabras se quitaron tres frases secundarias (EBITDA frente al consenso, peso de China en el valor, cumplimiento de la guía), que siguen en sus secciones.
- Word: 28 gráficos, cobertura del 89,7 %; aviso único, la tabla ESG vacía (hueco, como en v1).

**Fallos del sistema vistos**
1. El texto del motor para reinversión < 15 % del NOPAT («apenas necesita inversión neta… activos ligeros») se lee como si AOS no invirtiera; aquí el capex es el 2,2 % de las ventas. Ya anotado en lecciones; sigue pendiente en el motor.
2. El control «La síntesis explica la convicción» solo cuenta que la palabra «convicción» aparezca dos veces: una síntesis que lo explica con otras palabras no pasa, y una que la repite sin explicar sí.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 66,12 USD (media ponderada; base 59,92), rentabilidad 19,4 %, señal Mantener (el base, +8,4 %, no pasa el filtro del 12 %) (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +19,4 % → +12,4 %, base +8,4 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v3.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 18.2x, mínimo 15.5x, media larga 24.6x; antes v2 20.6x/17.4x/20.4x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
