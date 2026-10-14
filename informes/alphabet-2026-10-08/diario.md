# Diario: Alphabet (GOOGL), corte 2026-10-08

- Commit de partida: `eaff0ef Informe de Microsoft (Mantener, convicción baja)`.
- Inicio: 18:37 (hora de Madrid). La sesión del 8 de octubre en Nasdaq no ha cerrado: precio de cierre del 7 de octubre.

## Fase 1. Identificación (18:37-18:45)
- Alphabet Inc., CIK 1652044. GOOGL (clase A, un voto, ISIN US02079K3059) y GOOG (clase C, sin voto, ISIN US02079K1079), Nasdaq Global Select. Clase B (diez votos) sin cotizar. USD, US GAAP, ejercicio natural.
- Último 10-K: FY2025, presentado el 2026-02-05. Último 10-Q: 2T26 (30-jun-2026), presentado el 2026-07-23.
- Hallazgo que cambia la tesis de capital: en junio de 2026 Alphabet pasó de recomprar a emitir. 8-K del 4 y 5 de junio: ampliación de 58,6 M acciones A+C a ~352-355 USD (~20,7 mM), colocación privada a Berkshire Hathaway por 10 mM, dos series de preferentes obligatoriamente convertibles al 6,25 % (GOOGM/GOOGN, 385 M de títulos de 50 USD = 19,25 mM, conversión el 15-may-2029 a 0,1126-0,1421 acciones por título, con *capped call* hasta 532,67 USD) y un programa ATM de hasta 40 mM. 8-K del 10-ago-2026: bonos por 25 mM (2028-2066). Hay que tratar las preferentes en el puente y las acciones del ATM en el recuento.

## Fases 2-4 (subagentes A-D lanzados a las 18:46)
- 18:49-18:55: D guarda bolsa.json y las betas frente a SPY, ^GSPC, ^NDX, QQQ y XLC; A, B y C descargan 10-K, 10-Q, comunicados, *proxy* y 8-K. Cierre del 7-oct: 350,50 USD; rango de 52 semanas 235,84-408,61.
- Lectura propia del 10-Q del 2T26: cartera de Cloud de 513.900 M (algo más del 50 % en 24 meses); acciones de SpaceX cotizadas por 94.100 M (80.000 M con restricción a corto y 14.100 M hasta el 3T27); no cotizadas 124.259 M a medida alternativa, «sobre todo una empresa privada»; ganancia de 99.031 M en participaciones en el 2T26 (efecto en el BPA de 6,26 USD); capex de 80.598 M en el 1S26 y FCF de los últimos 12 meses de 53.273 M; ATM sin ventas a 30-jun (su destino declarado son los impuestos de las entregas de acciones a empleados); arrendamientos financieros de solo 2.500 M.
- **~18:55-22:07: corte de red.** La sesión y los cuatro subagentes se paran; a las 22:07 las cuatro notas siguen siendo esqueleto (78-216 bytes) y B.json lleva una marca BOM que impide leerlo con JSON.parse. 22:08: reanudados los cuatro con SendMessage, con lo ya descargado para que no lo repitan.
- 22:18-22:24: terminan C (53 llamadas), A (49), D (70) y B (84) tras la reanudación; los cuatro conservaban el contexto. A no pudo leer las transcripciones (abc.xyz con JavaScript) pero C sí las bajó en PDF (C-tr-*): uso esas para la conferencia.
- Datos que mueven la tesis: guía de capex 2026 de 195-205 mM (subida dos veces), consenso de capex de 300 mM en 2027; cartera de Cloud de 514 mM; Anthropic (Serie H a 965 mM post-money, may-2026) y SpaceX (cotizada, 92.379 M a 7-oct) explican las plusvalías; compromisos de compra de 811 mM; consenso de MarketScreener con EBITDA que suma la remuneración en acciones (6,19 % de ventas) y BPA 2026 con plusvalías (20,63 frente a 12,15 de Stock Analysis).

## Integración, cálculo y redacción (22:18-22:26 según el reloj del sistema)
- Integración: la nota B sustituye la lista de geografías de A, pero con las mismas cifras (solo cambia «Resto de América» por «Canadá y Latinoamérica»); los segmentos (4) y los KPI (8) de A sobreviven. Aviso de nota de trabajo en financieros.ajustes (comillas invertidas de A): reescrito en propio.
- Rating resuelto con el Free Writing Prospectus de los bonos de agosto (Moody's Aa2, S&P AA+, estables). La conferencia (ultima_presentacion) reescrita con las transcripciones oficiales que bajó C.
- Decisiones: consenso con BPA 2026e de 12,15 (Stock Analysis, sin plusvalías) en vez de 20,63 (MarketScreener, con ellas); EBITDA del consenso «ajustado» (suma la remuneración en acciones, 6,19 % de ventas; comprobado al millón por D). Puente del 30-jun: deuda 100.164, arrendamientos financieros 2.590 (operativos fuera), caja y valores de deuda 155.411, minoritarios 7.100 a valor contable, participaciones 195.553 (SpaceX a precio del 7-oct, no cotizadas a valor contable revaluado con la ronda de Anthropic, menos un 21 % de impuesto latente sobre ~168.000 M de plusvalías, estimación propia), otros ajustes 36.606 (preferentes por su valor de liquidación 19.250 y multas devengadas 17.356). Beta 1,13 (S&P 500 ajustada; Nasdaq 100 1,02 y XLC 1,00 descartadas: Alphabet pesa el 5,8 % y el 22,5 %). Capex del DCF en la guía (40,5 % en 2026) y por debajo del consenso en 2027-2028; terminal 3,5 % con etapa de transición de 5 años; pesos DCF 40, escenarios 30, comparables 15, suma de partes 15.
- Primer cálculo con márgenes conservadores: DCF 204,52. Subidos los márgenes hacia el consenso (46 % en régimen frente a 45,8 % del consenso en 2028): DCF 236,76.
- Resultado: valor objetivo 252,74 USD (−27,9 %), rentabilidad total −27,6 %; con la prima implícita (4,2 %) 281,33 (−19,7 %, −19,5 %). Reglas absoluta y relativa: Vender → Vender, convicción baja (la diferencia es de tasa de descuento y de crecimiento después de 2028; ingresos a −5,6 % del consenso en 2028). DCF inverso: crecimiento 16,6 % frente a 11,9 %, margen 58,7 % frente a 46,0 %, rentabilidad implícita 8,7 %.
- Controles: 14 de 16 correctos y 2 explicados (terminal 3,5 % y comparables frágiles). Síntesis de 610 palabras. Word y PDF de 59 páginas; revisadas como imagen las páginas 1, 2 y 4. Cobertura de campos 95,4 %.

## Fallos del sistema
1. **Corte de red de ~3 horas (18:55-22:07)**: se pararon la sesión y los cuatro subagentes con las notas aún en esqueleto. Se reanudaron con SendMessage y los cuatro conservaban el contexto; terminaron en 10-12 minutos. Arreglo: que prompt-de.mjs exija guardar la primera versión con contenido antes de 8 minutos, y un vigilante (Monitor) que avise si una nota sigue por debajo de 1 KB a los 10 minutos.
2. **B.json con BOM**: el esqueleto se escribió con una marca BOM (probablemente desde PowerShell) y JSON.parse falla. Arreglo: que integrar.mjs quite el BOM al leer las notas y avise.
3. **Transcripciones**: A no pudo leerlas (abc.xyz se genera con JavaScript) y C sí encontró los PDF oficiales. Arreglo: apuntar en lecciones.md la ruta de los PDF de transcripciones de Alphabet y repartir las transcripciones a un solo subagente.
4. **EBITDA del consenso con la remuneración en acciones sumada** (MarketScreener): pasó en Microsoft y ahora en Alphabet. Arreglo (ya propuesto): que el motor compare el EBITDA del último ejercicio real del proveedor con el de las cuentas y proponga el ajuste.
5. **BPA del consenso con plusvalías de participaciones**: el BPA 2026e de MarketScreener (20,63) incluía 135.946 M de ganancias de SpaceX y Anthropic y deprimía el PER NTM (21,5x frente a 24,5x tras el parche). Arreglo: un campo consenso.base_bpa («con plusvalías» / «operativo») y aviso del motor si el BPA estimado cae más de un 20 % al año siguiente.
6. **PER LTM y múltiplos históricos con plusvalías**: el PER de los últimos 12 meses (17,6x) sale con 149.000 M de ganancias no repetibles. Arreglo: un campo financieros.ltm.no_recurrentes_bajo_ebit para que el PER se calcule sin ellas.
7. **Impuesto latente de las participaciones**: el puente no tiene campo para él y hay que restarlo a mano en asociadas. Arreglo: valoracion.puente.impuesto_latente_asociadas.
8. **Preferentes obligatoriamente convertibles**: sin campo propio; van en otros_ajustes por su valor de liquidación, que solo es correcto entre 355 y 444 USD. Arreglo: un campo de convertibles con tramo de conversión para que el motor elija entre importe fijo y acciones según el valor objetivo.
9. **Circulante comercial frente a devengos**: el motor usa clientes + existencias − proveedores (13 % de ventas) y la nota de balance de A dice que el circulante es negativo con devengos y reparto de ingresos. Arreglo: campo opcional de otros pasivos operativos en balance.historico.
10. **Control del terminal fijo en el 3 %** (repetido de Microsoft): con el Tesoro al 5,27 % el 3,5 % es coherente. Arreglo: umbral ligado a la tasa libre.
- Fin: 22:26 (sin contar el corte, unos 30 minutos de 18:37 a 18:55 y unos 20 de 22:07 a 22:26).

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Alphabet - 2026-10-08 v2.docx` y su PDF (55 páginas). Mismo precio (350,50 USD, cierre del 7-oct) y fecha de corte. No se tocan supuestos del DCF.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Vender · Baja | Vender · Baja (los criterios dan Media; explicado en la síntesis) |
| Valor objetivo (WACC 10,74 %) | 252,74 USD, RTE −27,6 % | 252,74 USD, RTE −27,6 % |
| Con la prima del mercado (4,20 %, WACC 9,86 %) | 281,33 USD, RTE −19,5 % | 281,33 USD, RTE −19,5 % |
| Comprar por debajo / vender por encima | 245,16 / 313,65 | 241,37 / 313,65 |
| Sostenibilidad del crecimiento | — | **Sí** (13,1 % proyectado; financiable al ROIC actual: 18,6 %) |

- **Prueba de reinversión (la clave con este capex)**: la proyección reinvierte 1.256.681 M netos, el 49 % del NOPAT (capex bruto medio del 27,5 % de las ventas). Al ROIC de 2025 (37,7 %) eso financiaría un 18,6 % anual; el base crece un 13,1 %. El capital nuevo solo tiene que rendir un 20,2 %, frente a un ROIC incremental histórico del 37,1 %. El base no pide más de lo que la calidad da: el Vender ya supone que la inversión en IA rinde la mitad que el negocio histórico. Por eso no hay que bajar el caso base.
- **Cuota**: `mercado_final` en null. La cuota publicada (24,8 %) es publicidad sobre el gasto publicitario mundial de WARC, y los ingresos del DCF incluyen Cloud, suscripciones y dispositivos (27 % en 2025). Prueba a mano (estimación propia): con el mercado publicitario al +6,3 % desde 2027e (≈ 2,29 billones en 2035) y la publicidad de Alphabet en el 24,8 % (≈ 567.000 M), el resto tiene que llegar a ≈ 793.000 M en 2035, un 22 % anual desde los 108.145 M de 2025; Cloud creció un 37 % anual en 2019-2025 y tiene 514.000 M contratados.
- **Puente 2026e-2029e** (estimación propia a nivel de grupo): volumen 18,5/16,5/13/11, precio 3,5/3/3/3, otros 1,5/0,5/0/0 (divisa y Wiz en 2026e: 24,2 % publicado frente a 23 % orgánico en el 2T26). Cuadra con el DCF.
- **Cambia el nivel de compra** (245,16 → 241,37) con los mismos supuestos: lo calcula así el motor actual (no viene de la sostenibilidad). Actualizados la síntesis y `cambiaria_recomendacion`. Control nuevo «Convicción frente a la sugerida»: los criterios dan Media (el precio pide 4,7 puntos más de crecimiento que el base, menos de 5); se mantiene Baja porque el Vender depende del WACC y de un capex cuyo rendimiento aún no se ve en la caja, con 57 de 62 analistas en comprar.
- Textos cambiados: frase del veredicto en «El negocio», explicación de la convicción en «Valoración», niveles en «Qué cambiaría la decisión» y primer punto de `cambiaria_recomendacion`. Controles: 18 de 20 correctos y 2 explicados (los mismos de v1). Sin avisos en el Word; cobertura 91,8 %.

**Fallos del sistema vistos**
1. La prueba de cuota compara los ingresos totales con un solo mercado: en conglomerados (publicidad + nube) no hay perímetro comparable y `mercado_final` queda en null. Arreglo: admitir `mercado_final` por segmento (segmento, tamaño) y comparar con los ingresos de ese segmento.
2. Con capex muy alto, la prueba sale holgada si el base supone un rendimiento bajo del capital nuevo (20,2 % frente a 37,1 %): no avisa de que el base puede ser *demasiado* prudente. Arreglo: aviso informativo si el rendimiento implícito queda por debajo de la mitad del histórico, para que la síntesis lo diga.
3. El nivel de compra cambió entre versiones del motor sin cambiar datos (245,16 → 241,37): el diario de v1 no deja rastro de la regla con la que se calculó. Arreglo: guardar `calc.version` en la tabla del diario o avisar al recalcular si los niveles se mueven sin cambios en los supuestos.
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +1,8 % → +2,0 %, base +6,8 %, señal Mantener (`revision-12m-2026-10-12.md`).
