# Diario del análisis de Indra (fecha de corte 2026-10-06)

Procedimiento: `/analiza-empresa`, siguiendo `verticales/empresa/prompt.md` entero. Sin subagentes: fases 2-4 hechas por mí, en orden. Reloj del sistema: empecé a las 17:54 y generé el informe definitivo a las 18:29, unos **35-40 minutos** de trabajo efectivo según el reloj (el reloj de la máquina me parece corto para lo que se hizo; tómese como orientativo). Resultado: 45 páginas, 28 gráficos, 43 fuentes (21 primarias), cobertura de campos del 94,5 %, **14 de 16 controles correctos** y Word abre el documento sin repararlo (`a-pdf.ps1`: 45 páginas).

**Recomendación: Mantener, convicción media.** Valor objetivo 58,59 € frente a 59,72 € (−1,9 %); rentabilidad total esperada −1,4 %; alcista +23,8 % / bajista −42,0 % (asimetría 0,57x).

## 1. Tiempo y fuentes por fase

| Fase | Tiempo aprox. | Qué leí |
|---|---|---|
| 0. Comando, prompt, README, motor y diario de Viscofan | 3 min | `analiza-empresa.md`, `prompt.md` entero, `calcular-empresa.mjs` entero, el diario de Viscofan (para no repetir errores). |
| 1. Identificación | 2 min | Indra Sistemas, S.A., IDR, ES0118594417, Bolsa de Madrid (y Barcelona, Bilbao, Valencia), NIIF-UE, cierre en diciembre, una sola clase de acciones. La web es ahora indragroup.com. |
| 2. Documentación primaria | 12 min | Cuentas consolidadas 2025 (570 págs.) leídas por notas: 1 (perímetro), 5 (combinaciones de negocio: TESS, AERTEC, Micro Nav, Global ATS, Hispasat), 12 (ITP Aero), 20 (BPA), 21 (deuda y vencimientos), 22 (otros pasivos financieros: anticipos PEM de TESS e Hisdesat, SpainSat NG-II, opción de venta de Airbus/Sener), 24 (litigios), 27 (segmentos y geografías), 36 (estructura de capital), 42 (auditor), 43 (vinculadas), 44 (hechos posteriores) e informe de gestión (APM, guía, riesgos, acciones propias). Cuentas 2024, 2023 y 2022 (estados financieros, BPA diluido, arrendamientos, segmentos y guías). Estados intermedios del 1S26 (balance, cuenta, anticipos PEM por programa, acciones propias, vinculadas, accionistas). Notas de resultados 1T25, 1S25, 9M25, 2025, 1T26 y 1S26; presentación del 1S26; tablas xls del 1S26; IARC 2025 completo; IAGC 2025 (escaneado: lo convertí a imágenes con `pdf-a-png.ps1` y leí las páginas A.1, A.11-A.14, C.1.26 y C.1.31-C.1.34); comunicado de la junta de 2026. |
| 3. Sector y competencia | 5 min | EDA (gasto en defensa UE), OTAN vía prensa (España), comunicados de Leonardo (Iveco Defence), Redeia (Hispasat), Hensoldt/ESG y Thales/Imperva; prensa sobre EM&E, Escribano y posiciones cortas. |
| 4. Mercado y valoración | 8 min | MarketScreener (consenso, valoración histórica y estimaciones de 8 comparables), Stock Analysis (Indra y 8 comparables), Investing (recomendaciones, rango de 52 semanas, IBEX), BCE, Trading Economics, factsheet de BME, The Objective. |
| 5-6. Cálculo, supuestos y DCF inverso | 3 min | Dos pasadas del motor. El DCF inverso esta vez sí resolvió (11,1 % de crecimiento implícito). |
| 7. Redacción | 6 min | `notas/textos.mjs`, con las cifras de `calc` copiadas. |
| 8. Revisión de comité y entrega | 3 min | Corregí cinco frases sin fuente o con cifra mal derivada (fondo de comercio nuevo 381 → 405 M; efectos en valor de dos riesgos; dos afirmaciones históricas sin fuente; una cita a la nota de resultados que no decía lo que yo le atribuía). Revisé el PDF como imágenes (portada, resumen, segmentos, trimestres, rentabilidad y deuda, gobierno, escenarios y anexos). |

Ficheros de trabajo en `notas/`: `hechos.mjs` (cifras y cálculo de comparables), `textos.mjs` (juicio), `construir.mjs` (genera `datos.json` y la lista de fuentes), `docs/` (todos los documentos descargados y su texto; ojo, ocupa ≈ 260 MB, sobre todo por los PDF de cuentas y las imágenes del IAGC) y `paginas/` (el informe en PNG).

## 2. Datos difíciles, no encontrados y los tres intentos

**Costaron, pero aparecieron**
- **La web de Indra tiene un antibot (Radware)**: tras cuatro o cinco peticiones seguidas con `curl`, las páginas de inversores devuelven un captcha (no lo intenté resolver). Los PDF sí bajan. Conseguí los enlaces de informes trimestrales, IAGC e IARC pidiéndolos a WebFetch, que no estaba bloqueado.
- **El IAGC 2025 es un PDF escaneado** (pdftotext devuelve solo viñetas). Lo pasé a imágenes con `construccion/pdf-a-png.ps1` y leí las páginas clave a ojo: capital flotante (34,13 % a dic-25), restricciones por el régimen de inversiones extranjeras en defensa, auditor sin salvedades y 10 años de Deloitte, 21 reuniones del consejo.
- **El cambio de accionariado de 2026**: que la familia Escribano vendió su 14,3 % el 5-may-2026 no está en ninguna página de resumen; lo encontré en la nota de vinculadas del informe semestral y lo confirmé en prensa.
- **Consejo actual**: tras tres cambios de presidente y uno de consejero delegado, el IAGC de 2025 ya no sirve. Reconstruí el consejo con la web (vía WebFetch), el comunicado de la junta de 2026 (14 consejeros: 7 independientes, 5 dominicales, 1 otro externo, 1 ejecutivo) y, para los años de entrada, las series de retribución del IARC.
- **Remuneración del consejero delegado**: la tabla del IARC sale desordenada con pdftotext; hubo que cuadrar columnas a mano (80 + 24 + 660 + 748 = 1.512 miles en metálico; 1.886 miles en total).
- **El múltiplo de Hispasat**: 966 M de valor empresa (Redeia) y un EBITDA de «más de 140 M» que solo da Fitch citado por la prensa → 6,9x (máximo).

**No encontrados** (en `meta.huecos`, cada uno con tres intentos): segmentos de 2021 con la segmentación actual; cuota de mercado y CR5; revisiones del consenso a 3 y 12 meses; participaciones de los consejeros actuales; crecimiento de 3T24-4T24, orgánico trimestral y consenso previo; transcripciones; operaciones de directivos en el registro de la CNMV (error 403); rentabilidad total, 3-5-10 años, volatilidad y caída máxima; múltiplos NTM históricos; EV/EBITDA de una tercera transacción (Iveco Defence, Imperva, Ultra, Chemring y WNS no lo publican; un buscador atribuyó «12x» a Iveco Defence y no lo encontré en ninguna de las tres páginas que lo citaban: **no lo usé**); rating (Indra no tiene); informe de auditoría de 2025; puntuación de Sustainalytics; fecha de los resultados del 9M26.

**Trampas de los resúmenes de buscador detectadas**: el «12x EBITDA» de Iveco Defence (no verificable); el resumen de la web de Indra que clasificaba a Simón y a Arce como «ejecutivos» (Simón es «otro externo» y Arce independiente coordinadora, según el comunicado de la junta y el IARC); el «múltiplo de 5,2x» de Hispasat que calculaba Merca2 dividiendo el precio del 89,68 % de las acciones por el EBITDA del 100 % (mezcla valor de las acciones y EBITDA).

## 3. Instrucciones del prompt ambiguas, contradictorias o imposibles

1. **Deuda y anticipos públicos.** El prompt define `deuda_financiera` como «bancaria + bonos + pagarés» y deja `otros_ajustes` para «pasivos asimilables a deuda». En Indra hay 3.600 M de préstamos a tipo cero del Ministerio de Industria (PEM, TESS, Hisdesat) que la empresa trata como anticipos de clientes. Que sean deuda o circulante cambia el valor en 8-20 € por acción y el prompt no da criterio. Elegí tratar como deuda solo los 1.472 M de PEM cobrados directamente por Indra en 2026 (coincide con la deuda neta que se deduce del FCF sin PEM que publica la empresa) y dejar como circulante los de TESS e Hisdesat; lo explico en `limitaciones`, pero es un juicio que el prompt debería guiar.
2. **Segmentos «tal como los reporta la empresa», con 5 ejercicios.** Indra cambió de segmentación en 2023 (de Transporte y Defensa / Minsait a cuatro segmentos) y otra vez en 2026 (cinco, con Espacio aparte). No hay forma de tener 5 años homogéneos; el prompt no dice si priorizar la homogeneidad o la segmentación vigente.
3. **`acciones_diluidas` y BPA diluido** con bono convertible (2021-2023): el BPA diluido publicado usa un numerador ajustado por intereses; el control del motor (BN / acciones) tolera un 6 %, pero el prompt no lo explica.
4. **Un solo `cuota_pct` y `cr5_pct`** para una empresa con dos mercados (defensa española y servicios TI). No tiene sentido un número único.
5. **`geografias_criterio`** («destino» u «origen»): la nota 27 de Indra no lo dice; elegí «origen» porque presenta las ventas junto a los activos por zona.
6. **`participacion_pct` de directivos y `insiders`** dependen del registro de la CNMV, que no es accesible sin navegador (403). La única operación relevante (venta de 1.322 M de los Escribano) viene de prensa, con importe aproximado.
7. **«Ninguna cifra sale de un resumen de buscador»** choca con WebFetch, que también resume con un modelo pequeño: las cifras de MarketScreener y Stock Analysis que uso pasan por ese resumen. No tengo forma de ver la página original sin un navegador; lo dejo dicho.
8. **Rentabilidad total de los índices, volatilidad, caída máxima, múltiplos NTM históricos y revisiones de consenso**: siguen siendo imposibles con fuentes gratuitas (igual que con Viscofan).
9. **Escenarios como desplazamientos uniformes** del crecimiento y el margen «de cada año»: en Indra el crecimiento de 2026 (+29 %) es en gran parte perímetro ya consolidado y tres trimestres ya publicados; aplicarle −3 puntos en el bajista es poco realista. El prompt debería permitir desplazar desde el primer año no visible.
10. **Fechas de fuente AAAA-MM-DD** para documentos sin fecha visible (cuentas formuladas en febrero): usé AAAA-MM.

## 4. Problemas del motor de cálculo y de la plantilla

1. **La deuda neta del motor ignora `otros_ajustes`.** La portada y la sección 11 imprimen «Deuda neta −846 M» y «DN/EBITDA −1,0x» (caja neta), cuando el propio puente del informe resta 1.541 M de pasivos asimilables a deuda. Es el titular más engañoso del informe y ningún control lo marca. Propuesta: mostrar en la ficha la deuda neta «ajustada» (con `otros_ajustes`, minoritarios y asociadas) junto a la contable.
2. **Adquisiciones al cierre del ejercicio.** Hispasat entra en el balance de 2025 sin su cuenta. El motor calcula sin avisar: DEPI de 5,04 que empuja el **Beneish M a −1,67 (por encima del umbral de −1,78: «perfil compatible con manipulación»)**, días de inventario de 96 frente a 56, circulante del 12,4 % frente al 2,4 %, DN/EBITDA de 1,22x y caída del ROIC de 22,8 % a 18,5 %. Falta un campo de «perímetro» o un control de «activo total +50 % en un año: ratios de balance no comparables».
3. **Altman Z de 1,97 («zona gris»)** porque los anticipos del Estado son pasivo: para contratistas de defensa con prefinanciación pública el indicador no tiene sentido y el motor no lo matiza.
4. **El control «Deuda neta del puente frente al último balance anual» salta**, como es lógico (−846 frente a 775), pero su texto («correcto si hay un balance trimestral más reciente») no ayuda: lo relevante aquí son los anticipos.
5. **Controles en «OK» con texto de alarma**: «Capitalización calculada ≈ publicada — OK — Calculada 10459, publicada 10459: revisa acciones y precio». Y formatos con punto decimal en el detalle («Suman 99.9 %», «2.5 %»).
6. **Gobierno: 8 de 11 «cumple» y un 50 % de independientes «cumple»** aunque la SEPI (28 %) actúa como accionista de control (propuso al presidente y forzó la salida del anterior) y hubo tres presidentes en 18 meses. La lista no tiene criterios de estabilidad de la cúpula, de influencia estatal ni de conflicto de interés del presidente. El voto de remuneración (59,9 %) «no cumple» por la abstención sistemática de la SEPI, que no es un rechazo: el criterio debería medir votos en contra, no a favor.
7. **NTM del consenso con perímetro cambiante**: el crecimiento NTM de Indra (17,9 %) compara ingresos NTM con Hispasat con un LTM que los tiene solo seis meses. Mismo problema de bases que señalé con Viscofan, ahora por perímetro.
8. **Escenarios sin palanca de balance ni de múltiplo de salida útil con Gordon**: el bajista no puede recoger «los anticipos se gastan y la caja desaparece» ni una compra apalancada.
9. **Suma de partes sin campo para el EBITDA por segmento del consenso**: tuve que anualizar el 1S26 (estimación propia, marcada). La plantilla imprime la tabla de partes, pero no la métrica de cada parte frente a su propia historia.
10. **Comparables con dos proveedores**: el motor no sabe que los EV/EBITDA LTM de Stock Analysis y los NTM calculados con EBITDA de MarketScreener usan definiciones distintas (Thales: 13,4x LTM y 11,3x NTM con un EBITDA de MarketScreener un 25 % mayor que el de Stock Analysis). Un control de «salto LTM→NTM > 30 %» lo habría señalado.
11. **Plantilla**: mejoró mucho desde Viscofan (solo queda un «n.d.» en todo el informe, y es texto mío). Quedan tablas partidas entre páginas (la de segmentos empieza al pie de la página 5 y sigue en la 6) y las celdas nulas de la tabla trimestral salen como «–», que es correcto pero ocupa columnas enteras (crecimiento orgánico) casi vacías.

## 5. ¿Es correcta la recomendación de la regla para Indra?

Sí. «Mantener» es lo razonable: el precio está dentro del rango de los métodos (54-66 €) y el DCF inverso descuenta algo exigente pero no absurdo (crecimiento del 11,1 % anual hasta 2032 frente al 12,6 % histórico, que incluía compras). Dos matices: (1) la asimetría de 0,57x está cerca del umbral de Vender (0,5 con rentabilidad negativa), y lo que la sostiene es el puente: si se trataran como deuda también los 437 M de PEM vía UTE, el valor bajaría unos 2,5 € y la regla se acercaría a Vender; si no se restara ningún anticipo, el valor subiría unos 8,4 € y la regla daría Mantener alto o Comprar. **La recomendación depende más del tratamiento contable de los anticipos públicos que de la operativa**, y eso el motor no lo hace visible. (2) La regla no ve el riesgo de gobierno (rotación de la cúpula, posible compra de EM&E), que en Indra es un riesgo binario; con él, «Mantener» con convicción media es honesto.

## 6. Qué falta para el nivel de un banco de inversión

1. **Modelo por división** (Defensa por programa: VCR 8x8, Eurofighter, FCAS, PEM; Espacio con la flota de satélites; Minsait por vertical), con calendario de ejecución de la cartera y márgenes por programa. Hoy el DCF es de márgenes agregados y la tesis es de mezcla.
2. **Modelo de caja con los anticipos PEM**: calendario de cobro, consumo y compensación de los 3.600 M; sin él la deuda neta es una opinión.
3. **Datos de pago o conector** (FactSet, Bloomberg, Visible Alpha): consenso por división, historia de revisiones, múltiplos NTM históricos, rentabilidad total, transcripciones y registro de directivos.
4. **Due diligence política y legal**: estado del recurso de Santa Bárbara, calendario presupuestario de defensa, posición de la SEPI sobre EM&E y sobre Minsait; entrevistas con expertos del Ministerio y de los socios (Airbus, Leonardo, Rheinmetall).
5. **Comparables por división** (radares y electrónica: Hensoldt, Thales; vehículos: Rheinmetall, KNDS; espacio: SES, Eutelsat; TI: Capgemini, Sopra, Indra Minsait frente a NTT Data España) y transacciones con múltiplos completos.
6. **Controles nuevos del motor**: deuda neta ajustada en la ficha, aviso de cambio de perímetro, coherencia LTM-NTM entre proveedores, criterios de gobierno sobre estabilidad y control estatal.


## Actualización v3 (7 oct 2026): regla relativa y DCF en tres etapas

Sin investigación nueva. Script: `notas/actualizacion-v3.mjs` (parte de `datos-v2.json`, escribe `datos-v3.json`). Fuente nueva [44]: prima implícita del S&P 500 de Damodaran, octubre de 2026 (4,20 %). La v2 (.docx) no se ha tocado.

| | v2 | v3 |
|---|---|---|
| Recomendación | Mantener | Mantener |
| Convicción | Media | Media |
| Valor objetivo (nuestro WACC 9,11 %) | 58,59 € (RTE −1,4 %, asimetría 0,57) | igual |
| Valor objetivo con la prima del mercado (WACC 7,98 %) | — | 66,22 € (RTE +11,4 %, asimetría 1,70) |
| Regla absoluta / relativa | Mantener / — | Mantener / Mantener |
| Comprar por debajo de / vender por encima de | 51,17 € / 65,47 € | 57,83 € / 73,94 € |

- **etapa2: no**, decidido por el negocio antes de mirar el resultado. El ROIC (18,5 %) supera al WACC en 9,4 puntos y el objetivo de la OTAN llega a 2035. Pero España se ha comprometido a menos gasto [1], la cartera de Defensa se ejecuta en cinco o seis años y Minsait, el negocio de TI, no tiene ese recorrido (presión de precios y sustitución por IA) [7]. La proyección ya converge al 3 % en 2032 por esas razones.
- **Medido después, solo como referencia (no se usa):**
  - con diez años de transición sobre la proyección actual (del 3 % al 2,5 %), el DCF sube un 3,8 % y la rentabilidad relativa llega al 14,6 %: sigue en Mantener;
  - con la versión generosa (2030-2032 al 8 % y diez años de transición), la rentabilidad relativa llega al 34,2 % y la regla da Comprar.
  - El cambio de recomendación depende de reescribir la proyección explícita, no de la etapa de transición.
- **Sensibilidad a la prima:** Mantener con un 4,0 %; Comprar con un 3,8 %. El precio (59,72 €) está un 3 % por encima del nivel de compra.
- Con la prima del mercado, nuestro objetivo (66,22 €) es casi el del consenso (67,12 €).

**Fallos del sistema vistos en esta actualización**
1. `etapa2` arranca del crecimiento del último año explícito. Los informes hechos antes del cambio convergen al terminal dentro de la proyección, como pedía el prompt, así que la etapa añade casi nada (+3,8 %). Para que pese hay que subir el crecimiento de los últimos años explícitos. Eso es rehacer supuestos, no actualizar, y el prompt no dice qué hacer con un informe antiguo.
2. El motor no da la prima a la que cambia la regla relativa.
