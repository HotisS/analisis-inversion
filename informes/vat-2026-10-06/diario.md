# Diario — VAT Group AG (VACN), corte 2026-10-06

- Commit de partida: `4f041a6 Informes v2 de Viscofan, Indra y On (con síntesis) e informe de Intuitive Surgical` (no se cambia de versión del prompt a mitad).
- Inicio: 23:00 (hora local de la máquina).

## Fase 1 — Identificación (23:00-23:05)
- VAT Group AG, VACN (SIX), ISIN CH0311864901, CHF, ejercicio natural.
- **Normas contables: NIIF** («IFRS Accounting Standards», nota de bases de preparación de los estados financieros 2025, línea 324 del texto). No Swiss GAAP FER.
- Información periódica: anual y semestral completos; 1T y 3T son actualizaciones de pedidos y ventas. Último dato: 1S26 (22-jul-2026), con la compra de Atonarp anunciada el mismo día.
- 2T26: pedidos récord 500 M CHF (*book-to-bill* 1,7x), ventas 291 M, cartera 648 M. Ciclo en subida fuerte.
- Encargo común en `notas/ENCARGO_COMUN.md`.
- Fricción: `descargar.mjs` funciona a la primera con vatgroup.com; el texto del PDF sale con columnas desordenadas en el estado de resultados (cifras y rótulos desalineados): hay que leer con cuidado o cruzar con la presentación.

## Fases 2-4 (desde 23:02)
- 23:02 Lanzados A, B, C y D a la vez con el encargo común; presupuesto 20 min / 80 llamadas cada uno.
- Mientras tanto leo la presentación del 1S26 para la tesis. Datos clave: ventas 1S26 512 M (−8 %), 1T26 ≈ 221 y 2T26 291; pedidos 1S 856 M (+75 %); margen bruto 66,6 %; EBITDA 148 M (29,0 %), efecto neto de divisa +1,8 pp; guía 3T26 ventas 355-385 M sin Atonarp; ritmo de producción > 450 M/trimestre a final de año; guía 2027 «en revisión». Atonarp: ≈ 110 M CHF en caja, financiada con préstamo bilateral, apalancamiento pro forma 1,0x EBITDA 2025, cierre previsto en el 3T26. Banda de margen EBITDA del día del inversor 2025: 30-37 %. Capacidad instalada para hasta 2.500 M CHF de ventas.
- **Corrección del encargo**: la actualización del 3T26 es el **jueves 15 de octubre de 2026** (calendario de la presentación), no el 22-23 que puse en el encargo común. Es un catalizador a 9 días del corte.
- 23:04 D ya ha corrido `bolsa.mjs` (VACN.SW, CHSPI.SW, SMH): precio 698,2 CHF el 6-oct (cierre: la sesión suiza acaba a las 17:30 y son las 23:04), rango 305,1-727,2, +90,5 % en un año, beta 1,61, volatilidad 42 %, caída máxima −58 % (nov-21 → oct-22). Capitalización ≈ 20.900 M CHF frente a un EBITDA 2025 de 321,6 M: ≈ 65x los últimos 12 meses. La pregunta del informe es qué ciclo descuenta eso.
- 23:09 Mensaje a A: los ingresos de 2017 (692,4) coinciden exactamente con los de 2020; sospecha de copia.
- 23:11 Primer cálculo con notas parciales y supuestos de borrador (WACC 9,0 % con 1 punto de prima adicional): DCF 192,72 CHF frente a 698,2 (−72 %); DCF inverso: crecimiento implícito 29,5 % anual, rentabilidad implícita 3,7 %. EV/EBITDA LTM 69,7x, NTM 33,9x. La distancia es tan grande que no la cambia ningún ajuste fino: el precio descuenta que la subida de 2026-2028 no tiene corrección.
- 23:13 C terminado (10 min, 61 llamadas). Hallazgos: COO (Berden) se va a principios del 4T26 sin sucesor; comité ejecutivo a dos personas; objetivo 2027 recortado en mayo de 2025 de 1.800-2.200 a 1.500-1.700 M y ahora «en revisión»; 1T26 por debajo de su guía (≈ 215 frente a 240-260 M); auditor KPMG reelegido con solo el 79 % en 2026; ventas de directivos por ≈ 1,06 M CHF en mar-sep 2026; el dividendo de 2026 sale de beneficios acumulados, no de reservas de aportaciones de capital.
- **Fallo del sistema (motor): los escenarios solo admiten desplazamientos uniformes** de crecimiento y margen en todos los años no fijos. En una cíclica el bajista correcto es un perfil (caída fuerte en un año y recuperación), no −x puntos cada año para siempre, que se convierte en una pérdida permanente de nivel. Arreglo: admitir en `escenarios.casos[]` un `anios` opcional (lista por año de `crecimiento_pct` y `margen_ebitda_pct` que sustituye a la del base) o `ajustes_por_anio`. Mientras tanto, lo aproximo y lo explico en la narrativa.
- 23:14 B terminado (11 min, 73 llamadas). Cuota de VAT ≈ 70 % en válvulas de vacío para semiconductores (el mismo informe anual da 77 % en otra página); tres mayores clientes 16/14/13 % de ventas (sin nombre); único rival directo verificable en válvulas: Presys (Atlas Copco); MKS, KITZ SCT, UCT e Ichor son parciales o adyacentes. SEMI: WFE 2026e 143.900 M USD (+23 %), +21,8 % en 2027 y +14,1 % en 2028. China 32 % de ventas en 2025 y ≈ 28 % en el 1S26. semi.org da 403 (réplicas de PR Newswire sí funcionan).
- 23:17 A terminado (13 min, 96 llamadas: por encima del presupuesto de 80). Cuenta, balance y flujos 2016-2025 completos; serie trimestral 4T18-2T26 de pedidos, ventas, cartera y book-to-bill; márgenes semestrales 1S19-1S26. Ventas 2017 = 692,4 M comprobadas como imagen (coinciden con 2020 por 12 mil CHF: no era copia). Calibración del ciclo: 2018→2019 ventas −18,3 % y EBITDA −28,4 %; 2022→2023 ventas −22,7 % y EBITDA −32,3 %. Faltan transcripciones (GuruFocus 403, Quartr solo resumen).
- 23:18 D terminado (14 min, 76 llamadas). Consenso MarketScreener (18 analistas): ventas 1.327/1.874/2.152 M, EBITDA 444,7/683,2/817 M (base NIIF: 2025 cuadra al millón), BPA 10,53/16,71/19,98; PO medio 713,11 (390-860). Ocho comparables de MarketScreener a CHF (BCE 6-oct, 0,8305 CHF/USD). Solo tres transacciones con múltiplo (todas de 2021). Bono suizo 10 años 0,51 %; Damodaran ERP 4,23 %. Puente a 30-jun-26 cuadra con la deuda neta publicada (282 M). Atonarp sin cierre confirmado: fuera del puente (≈ 3,7 CHF/acción).
- Fases 2-4 cerradas a los 18 minutos (23:00-23:18). Ningún subagente se cortó; A pasó del presupuesto (96 llamadas).

## Fases 5-6 (23:17-23:20)
- Supuestos (notas/supuestos.mjs): base con ciclo (2026 consenso +23,6 %/33 %; 2027 +38 %/36 %; 2028 +12 %/37 %; 2029 −15 %/31,5 %; recuperación y 34,5 % terminal), capex 6-6,5 % → 5 %, circulante 24 %, impuesto 17 %. WACC en CHF: bono 0,51 %, beta Blume 1,41, prima 5,5 %, sin prima adicional (la beta ya recoge el ciclo) → 8,12 %. Gordon 1,5 % en CHF.
- Resultado: DCF 229,55 (−67,1 %); objetivo 272,01 (−61,0 %); DCF inverso: crecimiento 26,1 % anual 2027-2035 o rentabilidad implícita del 3,8 %; ningún margen alcanza el precio con nuestro crecimiento.
- Pruebas de robustez con copias de datos.json en el scratchpad (mismo motor): sin la corrección de 2029 y margen del 37 % para siempre → 302,25; con la prima de Damodaran (4,23 %, WACC 6,37 %) → 319,47; con el consenso hasta 2028, margen del 38 % para siempre, sin ciclo y WACC 6,37 % → 470,02 (−32,7 %). Ninguna combinación razonable llega a 698. La conclusión no depende del ERP.
- Decisión: Vender, convicción **Baja**. La regla da Vender y nuestras cifras coinciden con el consenso hasta 2027 (−2,3 % en ventas de 2027): la distancia la crean la tasa de descuento implícita (3,8 % frente a 8,1 %) y el valle de 2029. Por la regla del prompt, eso es convicción baja salvo catalizador con fecha; el catalizador con fecha (15-oct) es más probable que sea positivo a corto plazo (pedidos fuertes). Es una recomendación de valoración, no de calendario del ciclo.
- Fricción: el integrador no avisa de que D escribió los datos del WACC en una clave `dcf.extra` y otra `extra_wacc` (vacía); se cuelan en datos.json sin uso. Arreglo: que `integrar.mjs` avise de claves de primer nivel desconocidas (`extra_wacc`).

## Fases 7-9 (23:20-23:26)
- Redacción en `notas/propio.mjs` (textos de juicio de todas las secciones, catalizadores, riesgos, preguntas) y `notas/resumen.mjs` (síntesis de 649 palabras, tesis de 270). Supuestos en `notas/supuestos.mjs`.
- Integración: 96 fuentes (70 primarias), 95 citadas; 22 huecos (1 de núcleo: `sector.cr5_pct`, sin dato gratuito; ninguna sección omitida). Controles: 14 de 18 correctos y 4 explicados (tipo impositivo de 2023, R² de la regresión, comparables frágiles, salto LTM→NTM de los comparables por el ciclo). Cobertura de campos del Word: 94,6 %; 28 gráficos.
- Word: `a-pdf.ps1` lo abre sin reparar (58 páginas). Revisadas como imagen la portada, la síntesis, el resumen con «La decisión» y la síntesis de valoración. PDF e imágenes borrados.
- Nota sobre los tiempos: las horas que anoté a mano entre 23:17 y 23:31 eran estimaciones mías y estaban adelantadas; el reloj de la máquina marcaba las 23:25 al terminar. Desde aquí, solo horas leídas con `date`.

## Revisión de comité (fase 8)
1. Convergencia: el precio converge al valor cuando el book-to-bill baje de 1 y el mercado deje de extrapolar; no sabemos cuándo, por eso la convicción es baja. La recomendación sigue la regla (Vender).
2. DCF inverso: exigente (26,1 % anual hasta 2035 o 3,8 % de rentabilidad); está en el resumen, la tesis y la síntesis.
3. Supuesto más agresivo a favor de VAT: márgenes del 36-37 % en 2027-2028, por encima del pico de 2022 (35,0 %). El más contrario al mercado: el −15 % de 2029, con precedentes en 2019 (−18,3 %) y 2023 (−22,7 %).
4. Frente al consenso: 0 % en ventas de 2026, −2,3 % en 2027 y −4,7 % en 2028; EBITDA 2028 −7,1 %. Explicado.
5. Comparables: frágiles (18,8x-22,5x) y explicados; pesan un 20 %.
6. Calidad contable sin alertas; la señal que sí va al informe es el voto del 79 % al auditor.
7. Gobierno: protege al minoritario; la PSU relativa (ROIC, TSR, ventas frente a 21 pares) premia lo correcto en una cíclica.
8. Bajista verosímil (dos veces en siete años) y con la limitación del motor explicada en la narrativa.
9. Dato que cambiaría la conclusión: ninguno plausible. Probado: con el consenso hasta 2028, sin valle, margen del 38 % y WACC del 6,4 %, el DCF da 470,02 (−32,7 %). Precio y acciones verificados en dos fuentes (Yahoo y Stock Analysis, diferencia del 1,5 %).
10. Relleno: revisado; quitadas frases sin cifra en la síntesis para bajar de 707 a 649 palabras.

## Tiempo
- Inicio 23:00, fin 23:26 según el reloj de la máquina: **≈ 26 minutos** de reloj, por debajo de la horquilla de 30-60 del comando. Los subagentes sumaron ≈ 49 minutos de trabajo en paralelo (10, 11, 13 y 14 min) y 306 llamadas. No rebajé la profundidad para acabar antes: las fases 2-4 se cerraron en 18 minutos porque las cuatro corrieron a la vez y ninguna se cortó.

## Fallos del sistema y arreglo propuesto (por importancia)
1. **Los escenarios del motor solo admiten desplazamientos uniformes.** En una cíclica, el bajista debería ser un perfil (caída fuerte un año y recuperación), no −3 puntos cada año, que acaba siendo una pérdida de nivel permanente. Arreglo: `escenarios.casos[].anios` opcional (crecimiento y margen por año que sustituyen a los del base) en `calcular-empresa.mjs`, y una línea en el prompt para cíclicas.
2. **No hay herramienta de comparables.** D escribió su propio lector de MarketScreener y el cálculo de LTM/NTM ponderado (`scratchpad/ms_parse.mjs`, `comp.mjs`). Arreglo: `herramientas/comparables.mjs --tickers … --corte … --divisa CHF` con la misma ponderación de los próximos 12 meses que el motor y conversión al BCE.
3. **El texto de los PDF de diseño sale con las columnas cruzadas** (cuenta, balance, países, remuneración: les pasó a A, B, C y D). Arreglo: en `descargar.mjs`, un aviso cuando una tabla no cuadra con su total y un modo `--raw` alternativo; en `lecciones.md`, «comprueba que las filas suman el total antes de usar una cifra; si no, lee la página como imagen».
4. **`pdf-a-png.ps1` renderiza el documento entero.** A tuvo que hacer una copia con páginas; yo rendericé 58 páginas para mirar 4. Arreglo: parámetro `-Paginas "1-3,40"`.
5. **El motor no ofrece pruebas de robustez.** Para saber si la conclusión dependía de la prima de mercado o del valle tuve que copiar `datos.json` al scratchpad y editarlo a mano tres veces. Arreglo: `calcular-empresa.mjs --variante archivo.json` (o `dcf.pruebas: [{nombre, cambios}]`) que imprima el valor de cada variante y lo deje en `calc.dcf.pruebas` para el informe.
6. **El DCF inverso devuelve `margen_implicito_pct: null` sin explicación** cuando ningún margen alcanza el precio. Arreglo: devolver «> X %» (el tope de la búsqueda) y que la plantilla lo diga.
7. **El encargo común llevaba una fecha equivocada (3T26)** porque la escribí antes de leer la presentación. Arreglo en el comando: en la fase 1, leer el calendario financiero de la última presentación antes de lanzar los subagentes.
8. **Eje del gráfico de síntesis de valoración ilegible** con valores en cientos (dos decimales que se pisan: «100,00200,00…»). Arreglo en la definición del gráfico: formato `#,##0` cuando el máximo pasa de 100.
9. **Presupuesto de A excedido (96 llamadas)** por la serie trimestral de 2019-2026 sacada de 30 notas de prensa. Arreglo en `lecciones.md`: en empresas con actualizaciones trimestrales, sacar la serie de la nota anual (tabla de pedidos y ventas por trimestre) y de la presentación, y bajar a notas sueltas solo para huecos.
10. **Suiza no está en `lecciones.md`**: SIX publica las operaciones de directivos sin nombre; la API `ser-ag.com/sheldon/.../overview.json` funciona sin navegador pero ignora el filtro por emisor; no hay registro público de posiciones cortas; semi.org da 403 (sirven las réplicas de PR Newswire); la API del SNB está desfasada (bono suizo: Trading Economics); GuruFocus da 403 y Quartr solo resume las conferencias. Arreglo: añadirlo a `lecciones.md` y, si se repite, `herramientas/six.mjs --isin`.
11. **El integrador no avisa de claves desconocidas** (D dejó `extra_wacc` vacía y los datos del WACC en `dcf.extra`). Arreglo: aviso en `integrar.mjs` para claves de primer nivel que no están en el prompt.

## Nota sobre las herramientas
- **Qué ahorraron.** `prompt-de.mjs` (cada subagente leyó solo su parte); `descargar.mjs` (PDF de VAT, SEMI vía réplicas, EDGAR para los comparables, todo con texto al lado y búsqueda por grep); `bolsa.mjs` (precio, rango, volumen, rentabilidades, beta, caída máxima y cierres de diez ejercicios en una llamada, sin mezclar total y precio); `integrar.mjs` (96 fuentes de cuatro notas renumeradas sin escribir un script de fusión, y retirada automática de huecos resueltos); los controles del motor (señalaron la fragilidad de los comparables y el salto LTM→NTM, que obligaron a explicarlos); `lecciones.md` (MarketScreener con `descargar.mjs`, regla de las cifras de buscador, comparables con ejercicios no naturales).
- **Qué les falta.** Escenarios por perfil anual y variantes de robustez en el motor; herramienta de comparables; render por páginas; detección de tablas descolocadas; fuentes suizas y de transcripciones en `lecciones.md`; aviso de claves desconocidas en el integrador; formato del eje en el gráfico de síntesis.

## Actualización v3 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v3.mjs` (parte de `datos-v2.json`), salida `datos-v3.json`, `VAT Group - 2026-10-06 v3.docx` y su PDF. Sin fuentes nuevas; mismo precio (698,20 CHF) y corte (6-oct). Supuestos del DCF sin cambios.

| | v2 | v3 |
|---|---|---|
| Recomendación · convicción | Vender · Baja | Vender · Baja |
| Valor objetivo (WACC 8,12 %) | 272,01 CHF, RTE −60,0 %, asimetría −0,63x | igual |
| Objetivo con la prima del mercado (WACC 6,33 %) | 348,90 CHF, RTE −49,0 %, asimetría −0,34x | igual |
| Regla absoluta / relativa | Vender / Vender | Vender / Vender |
| Niveles | Comprar < 282,35; Vender > 395,50 (síntesis con los de v1: 238,61 / 305,64) | Comprar < 265,48; Vender > 395,50 (síntesis y `cambiaria_recomendacion` corregidas) |
| Sostenibilidad del crecimiento | — | **Sí** (9,1 % medio proyectado, 8,3 % compuesto 2025-2035; reinversión del 10 % del NOPAT: «sin inversión neta» para el motor) |

- **Puente 2026e-2029e**: volumen 30/37/11/−16, precio 1/1/1/1, otros (divisa) −7,4/0/0/0. 2026e: el 1S26 cayó un 8 % en francos y quedó plano a tipo constante [9]. Reparto volumen/precio, estimación propia: VAT no publica subidas de precio.
- **`mercado_final` en null**: la cuota del ≈ 70 % es del nicho de válvulas para semiconductores (unidad Semiconductors sin adyacencias, 632,7 M de 1.073,5 M). Prueba a mano: nicho de ≈ 900 M en 2025 al ritmo del WFE de SEMI (+23 / +21,8 / +14,1 %) = 1.538 M en 2028e; ventas de VAT en el nicho al ritmo del grupo = 1.209 M → cuota ≈ 79 % (límite 105 %), en línea con el objetivo de la empresa (> 80 % en 2029). Después de 2028 el base crece un 2,2 % anual: la cuota no sube más. Tasas de SEMI en USD; en CHF la cuota saldría algo mayor, lejos aún del límite.
- **Reinversión**: 494 M acumulados (10 % del NOPAT), capex medio del 5,4 % frente a una amortización del ≈ 4,6 %. No es un negocio de activos ligeros (circulante del 24 % de las ventas): la reinversión es baja porque hay capacidad instalada para hasta 2.500 M de ventas [7] y el base acaba en 2.390 M, y porque el valle de 2029e libera circulante. Capital nuevo a mano: (594 − 227) / 494 = 74 % (56 % a margen constante), bajo el límite de 1,25 × 61,2 % = 76,5 %. Ninguna prueba falla: no se recorta el base (no aplica `encargo-recorte.md`).
- **Por qué no cambia nada más**: la tesis es de valoración (el precio pide un 26,1 % anual o una rentabilidad del 3,8 %), no de calidad. El nivel de compra baja de 282,35 a 265,48 CHF por las reglas de niveles del motor actual, no por la sostenibilidad. Textos cambiados: frase del veredicto en «El negocio», niveles en «Qué cambiaría la decisión» y en `cambiaria_recomendacion`; tres recortes menores para quedar en 645 palabras.

**Fallos del sistema vistos**
1. La síntesis y `cambiaria_recomendacion` de v2 conservaban los niveles de v1 (238,61 / 305,64) mientras la tabla daba 282,35 / 395,50: la actualización v2 no tiene script ni sección en el diario. Arreglo: un control que compare las cifras de nivel citadas en la síntesis con `calc.recomendacion`.
2. Con reinversión < 15 % del NOPAT el motor no calcula el rendimiento del capital nuevo, aunque aquí es la prueba útil (74 % frente a un límite del 76,5 %, muy cerca). Arreglo: calcularlo siempre que la reinversión sea positiva, y decir «reinversión baja» en vez de «sin inversión neta».
3. El «crecimiento medio proyectado» es la media aritmética (9,1 %) e incluye el año fijo (+23,6 %); en una cíclica que sale de un suelo, la tasa compuesta (8,3 %) es la comparable con la historia.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 685,29 CHF, rentabilidad −0,8 %, señal Mantener (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada -0,8 % → +2,3 %, base +16,7 %, señal Mantener (`revision-12m-2026-10-13.md`).
