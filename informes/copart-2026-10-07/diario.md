# Diario — Copart, Inc. (CPRT), corte 2026-10-07

- Commit de partida: `232dd63 Empresa: DCF en tres etapas y regla relativa (prima implícita del mercado)`.
- Inicio: 11:41 (hora local, `date`).
- Tanda en paralelo (hasta tres análisis a la vez): trabajo solo en `informes/copart-2026-10-07/` y en `%TEMP%\analisis-inversion\copart*`. Sin commits.

## Fase 1 — Identificación (11:41-11:48)
- Copart, Inc., NASDAQ: CPRT, CIK 900075, ISIN US2172041061, Delaware, sede en Dallas. US GAAP, USD. Ejercicio a 31 de julio: `cierre_ejercicio_mes: 7`, `etiqueta_ejercicio: "fin"` (el FY2026 va de ago-2025 a jul-2026 y es el último cerrado; 10-K del 29-sep-2026).
- La sesión del 7-oct en Nueva York no ha abierto a la hora del corte (11:41 en Madrid = 05:41 en Nueva York): precio = cierre del 6-oct-2026.
- Hechos de los últimos 12 meses que cambian el análisis (EDGAR):
  - 10-sep-2026: acuerdo para comprar ACV Auctions (NYSE: ACVA) por OPA en efectivo a 10,50 USD/acción, ≈ 1.900 M de valor de las acciones, pagada con caja, cierre previsto antes de fin de 2026 (HSR y mayoría de las acciones). ACV: ingresos de 760 M en 2025. Neutra en BPA el primer año completo, acrecitiva desde FY2028 (empresa).
  - 23/29-jun-2026: vuelve Jay Adair como CEO (yerno del fundador y presidente Willis Johnson); sale Jeff Liaw (CEO desde 2022) con acuerdo de transición (pagos, eliminación de barreras de precio de opciones). 2/8-jul: Pocock, presidenta (President). 13-ago: Berger, consejero, socio de Wilson Sonsini (abogados de la empresa y de la compra de ACV).
  - 23-ene-2026: nueva línea revolving no garantizada de 1.250 M (Wells Fargo, vence 2031).
  - FY2026: ingresos 4.666 M (+0,4 %), servicios en EE. UU. −1,8 % (huracanes Helene y Milton en FY2025 y menos volumen), Internacional +12,4 %; EBIT 1.652,6 M (−2,6 %); recompras de 1.632,5 M (las primeras en años); caja 1.907,9 M + letras del Tesoro a vencimiento 2.581,9 M, sin deuda financiera; capex 337,4 M (569,0 M en FY2025).
- Próximos resultados (1T FY27): Copart no publica calendario; el año pasado, 20-nov. Lo confirma D.

## Fases 2-4 (subagentes lanzados a las 11:48)
- A cuentas, B sector, C gobierno, D mercado, con encargo específico de Copart y los fallos conocidos de hoy (tipos con FRED, arrendamientos fuera del puente, beta rara, recompras posteriores al balance, no recurrentes, Form 4 con script propio).
- Terminaron: C hacia las 12:03 (15 min, 54 llamadas), A hacia las 12:06 (21 min, 77), D hacia las 12:11 (26 min, 97) y B hacia las 12:13 (28 min, 89). A y B no habían escrito nada útil en `notas/` a los 10 minutos: les mandé un recordatorio y empezaron a guardar por partes. D y B se pasaron de llamadas (97 y 89 frente a 80). B agotó el límite de búsquedas web de la sesión y siguió descargando documentos.
- Hallazgos que cambian el análisis:
  - Precio 26,82 USD (−39,4 % en un año, −58 % desde mayo de 2025): 10,9x EBITDA frente a una mediana histórica de 22,3x.
  - OPA sobre ACV sin cerrar: 47,78 % aceptado a 30-sep (hace falta la mayoría), plazo ampliado al 7-oct y HSR que vence el 13-oct tras volver a notificar. Un rival («Party B») ofreció 11-12 USD por ACV.
  - Unidades de aseguradoras en EE. UU.: −8 % en FY2026 y −7,5 % en el 4T, con un gran cliente perdido a favor de IAA (sin él, +2,3 %). IAA: +11 % de lotes en el 2T de 2026.
  - Coste por coche +12,7 % en el 4T26; margen EBITDA del 37,3 %.
  - Recompras de 1.632,5 M a 37,63 USD en FY2026 (las primeras en años).
  - Investigación del DOJ sobre blanqueo en la plataforma, sin provisión.
  - Salida de Liaw por encima de su contrato (barreras de precio de 785.336 opciones eliminadas).

## Fases 5-6 — cálculo y supuestos (12:06-12:12)
- Primer cálculo con notas parciales: 8 de 17 controles (secciones vacías y DCF sin supuestos). Control real: activo de FY2020 +36 % sin compra (capex de terrenos y ASC 842), explicado.
- Criterios:
  - Arrendamientos operativos fuera del puente (0); solo los 2,7 M financieros cuentan como deuda.
  - Caja = caja + letras del Tesoro a vencimiento (4.489,8 M).
  - ACV fuera del puente y del DCF (no cerrada), con su efecto explicado en el texto: 2,04 USD por acción de caja.
  - Sin `_parches`: no hay no recurrentes que normalizar en el EBITDA de FY2026, y los de los huracanes de FY2025 no los cuantifica la empresa (hueco).
- WACC: Tesoro 5,31 % (FRED, DGS10, 5-oct), beta de Blume 1,02 (1,03 frente a SPY, 60 meses: no es rara), prima del 5,0 % y sin deuda: 10,41 %. Prima implícita de Damodaran de octubre: 3,70 % (ERPOct26.xlsx).
- Caso base:
  - Crecimiento: FY2027e +3,5 % (consenso +3,8 %), 4,5-5 % hasta FY2034e y 4 % al final.
  - Margen EBITDA del 39 % que sube al 40 % (consenso 40,4 % en FY2027e).
  - Capex del 8,5-9 % que baja al 6,5 % (1,2x la amortización al final).
  - Circulante del 5 % e impuesto del 20,5 %.
  - Terminal: Gordon al 3 %.
- **`etapa2` sí**: ROIC del 29,5 % frente a un WACC del 10,4 % (19 puntos) e Internacional en el 18 % de las ventas y creciendo a doble dígito. Es corta: del 4 % al 3 % en diez años. Aporta un 3,2 % (25,88 frente a 25,08).
- **Escenarios con `perfil`**: el bajista lleva un valle de dos años (FY2027e −6 pp de crecimiento, FY2028e −5 pp, y −3 pp de margen en ambos) sobre un desplazamiento uniforme de −2 pp de crecimiento y −3 pp de margen. Así recoge la duda central: si la caída es un valle o un declive.
- Resultado:
  - DCF 25,88 (−3,5 %).
  - DCF inverso: crecimiento del 4,9 % anual, margen del 41,4 % o rentabilidad del 10,1 %.
  - Valor objetivo 25,71 (−4,1 %), asimetría 0,77x. Regla absoluta: Mantener.
  - Regla relativa (prima del 3,7 %, WACC 9,08 %): 29,55 (+10,2 %), asimetría 2,31x. Mantener.
  - Recomendación: **Mantener**, convicción media.

## Fases 7-9 — redacción, comité y entrega (12:12-12:14 y, tras el corte, 17:12-17:17)
- Textos en `notas/textos.mjs` y `notas/resumen.mjs`, supuestos en `notas/supuestos.mjs`, ensamblado en `notas/propio.mjs`.
- Limpié notas de trabajo que se iban a imprimir: nombres de campo entre comillas invertidas en los comentarios de A (`coste_ventas`, `calc.calidad`…) y «no puedo dar» en las revisiones de D. Las copias de los originales están en `%TEMP%\analisis-inversion\copart`.
- **Corte por límite de uso entre las 12:14 y las 17:12.** Se perdió el contexto de la sesión. Reanudé comprobando el estado de los archivos: no faltaba nada.
- Revisión de comité:
  1. No hay tesis de convergencia: el precio ya descuenta el caso base. Mantener se sigue de las dos reglas.
  2. El DCF inverso (4,9 % de crecimiento) está en la síntesis y en la tesis.
  3. El supuesto más agresivo es el 40 % de margen desde FY2029e, frente al 37,3 % del 4T26. El más prudente es el Gordon (9,2x de salida frente a 10,2-10,6x de los pares).
  4. Frente al consenso, en FY2027e-FY2028e: ventas −0,3/−0,5 % y EBITDA −3,7/−3,9 %. Lo explica el coste por coche.
  5. Comparables frágiles (7,4-10,2x): pesan un 20 % y se dice por qué.
  6. La investigación del DOJ y las cuentas a cobrar que crecen más que las ventas están en calidad y en riesgos.
  7. Gobierno: control de hecho, 6 de 13 criterios.
  8. El bajista se calibró con la caída real de FY2026.
  9. Datos críticos verificados en dos fuentes: tasa libre (FRED) y acciones (10-K y 4T).
  10. **Error mío corregido en la revisión**: había escrito «cada punto de margen vale ≈ 8 % del valor» y «−15 % con 2 puntos menos de crecimiento» sin calcularlo. Recalculado con el motor en una copia: −2,6 % y −14,6 %.
- Síntesis recortada de 753 a 652 palabras.
- Transacciones: la mediana (49,25 USD) la fijan ADESA (22x es un máximo) y ACV (29,1x sobre un EBITDA sin remuneración en acciones). Peso 0 y explicado en `valoracion.comentario`.
- Form 4: el script de C (`C-form4.mjs`) y la nueva `herramientas/form4.mjs` coinciden: 0 compras y 9.924.090 USD en ventas.
- Informe: 60 páginas, 27 gráficos, cobertura del 93,5 %.
  - Fuentes: 90 (54 primarias); 11 sin citar (12 %, dentro del 15 %).
  - Controles: 15 correctos y 3 explicados.
  - Abre en Word sin reparar.
  - Avisos: suma de partes vacía (no aplica) y gráfico de vencimientos vacío (no hay deuda).
- Tiempo efectivo: unos 38 min (11:41-12:14 y 17:12-17:17), sin contar el corte de cinco horas.

- **Corrección de la prima implícita (17:18-17:22, a petición del coordinador).** D había tomado el 3,70 % de ERPOct26.xlsx, que es la prima sin ajustar («ERP (T12m)»). La buena es la columna «ERP (T12 m with sustainable payout)» de ERPbymonth.xlsx, octubre de 2026: 4,20 %. La comprobé descargando el archivo (última fila: 4,20 % frente a 3,70 %, T-bond 5,29 %), la fijé en `notas/textos.mjs` con su fuente y rehice el cálculo y el Word. Relativa: WACC 9,59 %, valor 27,88 USD (+4,0 %), asimetría 1,51x. Niveles de la regla combinada: 24,22 / 30,98. La recomendación sigue en Mantener con las dos reglas. Actualicé síntesis, comentario de escenarios, valoración, justificación del WACC y «Qué cambiaría la decisión». Los «3,7» que quedan son otros datos (precio de remate, diferencia de EBITDA con el consenso, posición corta). Pasó lo mismo en Rational: arreglo del sistema, que `prompt-de.mjs D` nombre la columna exacta y que el motor avise si la prima relativa está por debajo de la «sustainable payout» del mismo mes.

## Fallos del sistema y su arreglo propuesto (de más a menos importante)
1. **Las compras pendientes de cierre no tienen sitio en el puente.**
   - Fallo: ACV (≈ 1.900 M en caja, 2,04 USD por acción, OPA abierta) solo cabe en el texto, y la caja del puente cuenta un dinero ya comprometido.
   - Arreglo: `valoracion.puente.posteriores: [{concepto, caja, deuda_asumida, ebitda_ntm, probabilidad_cierre}]`, para que el motor dé el valor de la empresa sola y el pro forma, y lo diga en «La decisión». Vertiv pidió lo mismo con UIG.
2. **El valor por transacciones se dibuja aunque pese 0 y sea engañoso.**
   - Fallo: aparecen 49,25 USD (+83,6 %) en la síntesis gráfica, por una mediana de múltiplos que mezcla un máximo (ADESA) y un EBITDA ajustado sin remuneración en acciones (ACV).
   - Arreglo: campo `transacciones.operaciones[].usar_en_mediana` (o `base_ebitda: "ajustado"`), y que el motor no dibuje un método de peso 0 sin avisar.
3. **Las sensibilidades de los riesgos se escriben a ojo.**
   - Fallo: puse «≈ 8 % por punto de margen» y el motor da −2,6 %.
   - Arreglo: que el motor publique en `calc.dcf` el efecto de ±1 punto de margen y de ±1 punto de crecimiento en todos los años (ya hace la tabla de WACC y g), para citarlo tal cual en `riesgos.items[].efecto_valor`.
4. **Notas de trabajo en campos que se imprimen.**
   - Fallo: A dejó nombres de campo entre comillas invertidas y referencias a `calc` en cuatro comentarios; D escribió «no puedo dar». `integrar.mjs` solo avisa de notas de trabajo en claves fuera del esquema.
   - Arreglo: que `integrar` avise también de comillas invertidas, «calc.», «no puedo» o «integrador» en cualquier texto que se imprime.
5. **Los subagentes no guardan por partes.**
   - Fallo: A y B tenían su JSON vacío a los 10 minutos pese a la instrucción.
   - Arreglo: que `prompt-de.mjs` exija la primera escritura de `notas/<letra>.json` antes de la llamada 15, y una herramienta `herramientas/estado-notas.mjs` (tamaño y campos por letra) para que el lanzador lo compruebe.
6. **El límite de búsquedas web se comparte entre subagentes.**
   - Fallo: B se quedó sin WebSearch a media tarea.
   - Arreglo: en lecciones, «las búsquedas web son un recurso de la sesión: A, C y D usan EDGAR y descargas directas; B tiene prioridad en WebSearch».
7. **Los trimestres de un ejercicio no natural no se explican en la tabla.**
   - Fallo: Copart llama 4T FY2026 a mayo-julio de 2026. La plantilla no tiene campo para decirlo y A lo puso al principio de `ultima_presentacion`.
   - Arreglo: `trimestres.nota_periodos`, impresa bajo la tabla.
8. **El control de perímetro salta sin compra.**
   - Fallo: en FY2020 lo dispararon el capex de terrenos y la adopción de ASC 842.
   - Arreglo: que el control mire también el capex y las `adquisiciones` del año antes de pedir un cambio de perímetro.
9. **No hay cómo tratar una empresa sin guía pública.**
   - Fallo: `directivos.historial_guidance` es de núcleo, pero Copart no da guía. C usó los objetivos internos del bonus del proxy, que son un buen sustituto.
   - Arreglo: aceptarlo en el prompt como sustituto, y que el motor no lo cuente como hueco de núcleo si la empresa declara que no da guía.
10. **El diario no tiene sitio para los cortes.**
    - Fallo: no hay forma estándar de registrar un corte por límite de uso.
    - Arreglo: una línea fija en la plantilla del diario: «Cortes: inicio-fin, qué se perdió».

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Copart - 2026-10-07 v2.docx` y su PDF. Mismo precio (26,82 USD, 6-oct) y fecha de corte. Añade `dcf.sostenibilidad` con las fuentes que ya estaban; ninguna cifra del DCF cambia.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Mantener · Media | Mantener · Media |
| Valor objetivo (WACC 10,41 %) | 25,71 USD, RTE −4,1 %, asimetría 0,77x | 25,71 USD, RTE −4,1 %, asimetría 0,77x |
| Con la prima del mercado (4,20 %, WACC 9,59 %) | 27,88 USD, RTE +4,0 %, asimetría 1,51x | 27,88 USD, RTE +4,0 %, asimetría 1,51x |
| Comprar por debajo / vender por encima | 24,22 / 30,98 USD | 24,22 / 30,98 USD |
| Sostenibilidad del crecimiento | — | **Sí** (crecimiento medio 4,5 %; reinversión 1.707 M, 10 % del NOPAT; ROIC 29,5 %; cuota en null) |
| Controles | 15 de 18 y 3 explicados | 17 de 20 y 3 explicados |

- **Por qué «Sí»**: el 4,5 % anual (frente al 13,9 % de la década) sale sobre todo del ingreso por unidad (+3,5-5 % en el puente; ≈ +5,7 % en FY2026 con las unidades a la baja [16]), que no pide capital. El volumen (−1,5 % a +1,5 %) no exige ganar cuota y lo financia de sobra la reinversión al ROIC actual (29,5 % × 10 % ≈ 3 %). En 2008-09 los ingresos solo cayeron un 5,3 % [27].
- **`mercado_final` en null**: la cuota (≈ 62 %) es una estimación propia por unidades del par Copart-IAA, sin tamaño en USD ni previsión de crecimiento (`sector.tcac_*` en null). Prueba a mano: con el volumen del puente por debajo del 1,5 % anual, la cuota de unidades no tiene que subir; el riesgo va al revés (IAA gana cuota [28]) y está en el bajista.
- **Textos**: frase del veredicto en «El negocio» de la síntesis y por qué la convicción es media (qué la subiría o bajaría), porque saltaba el control nuevo «La síntesis explica la convicción». Nada más cambia.
- Avisos del Word (suma de partes sin filas, gráfico de vencimientos sin deuda) son de v1, no de este cambio.

**Fallos del sistema vistos**
1. El motor escribe «apenas necesita inversión neta… activos ligeros» con un capex medio del 8 % de las ventas (terrenos) porque la reinversión neta es < 15 % del NOPAT; y en esa rama deja `crecimiento_financiable_pct` en null, aunque ROIC × reinversión (≈ 3 %) es justo la cifra útil. Arreglo: dar siempre el financiable.
2. El control «La síntesis explica la convicción» solo cuenta dos veces la palabra «convicción»: lo pasa cualquier frase.
3. `herramientas/objetivo12m.mjs` espera el nombre de la carpeta, no la ruta: con `informes/copart-…` busca en `informes/informes/…`.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 33,07 USD (media ponderada; base 28,41), rentabilidad +23,3 % (base +5,9 %), señal Mantener (`revision-12m-2026-10-13.md`).
