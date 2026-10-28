# Lecciones de los análisis reales (núcleo: léelo antes de buscar)

Lo aprendido en los análisis de octubre de 2026. Este archivo es lo común a todos; hay dos anexos que **no se leen enteros**:
- `lecciones-paises.md`: fuentes y registros por país. Lee solo la sección del país de la empresa (y la de sus comparables, si hace falta).
- `lecciones-casos.md`: trampas de sectores y casos contables concretos (contratistas, reguladas, flotante, software con nube, aseguradoras, escisiones, doble clase, compradores en serie…). Búscalas con `grep -n -i "<palabra>"` cuando el caso aparezca.

Las lecciones nuevas van al archivo que toque, en una o dos líneas, y solo si no están ya. Los diarios de `informes/*/diario.md` no hace falta leerlos.

## Herramientas del repo: úsalas en vez de escribir las tuyas

- `node herramientas/descargar.mjs --dir informes/<carpeta>/notas/docs nombre url …`: guarda HTML y PDF con su texto al lado (PDF con marcas de página y un `.tabla.txt` con las columnas alineadas; no en los HTML de EDGAR, y el `.txt` no decodifica entidades HTML). Avisa de PDF escaneados, texto ilegible y bloqueos antibot. `--lista URL [texto]` lista los PDF de una página de inversores. Deja `docs/_manifest.json` con la URL final de cada archivo. Pon el nombre sin extensión (si no, `X.json.json`). Si un PDF grande se agota, sube `TIEMPO_DESCARGA` (segundos).
- `node herramientas/bolsa.mjs --accion SIMB --indice SIMB --sector SIMB --corte AAAA-MM-DD [--cierre-mes M] --salida informes/<carpeta>/notas/bolsa.json`: precio, rango de 52 semanas, volumen, rentabilidades, betas (mensual 5 años, semanal 2 y 5, y ajustadas), volatilidad, caída máxima y **precio de cierre de cada ejercicio** (`--cierre-dia` si no cierra a fin de mes; `--etiqueta fin|inicio` fuerza cómo se nombra el ejercicio; `--indice-beta` para la beta frente a otro índice). Mira la hora de la bolsa: si la sesión del corte no ha cerrado, usa la anterior y avisa (dilo en el informe). Los ETF (`SPY`, `XLY`, `EXV1.DE`) dan rentabilidad total; los índices `^…`, solo precio (`^GDAXI` ya es total: usa `EXS1.DE`). No convierte divisa ni pasa GBp a GBP. Usa rutas relativas (con `/c/...` desde Git Bash no escribe y no avisa). Cita: «Yahoo Finance, históricos diarios». En días de caída extrema la historia de Yahoo puede no traer la última barra (Brasil, 26-oct): mira `regularMarketPrice` o el ADR y dilo; `movimiento.mjs` se queda en la víspera.
- `node herramientas/cuentas.mjs --sec TICKER|CIK` (EE. UU. y extranjeras con 20-F) o `--esef "Nombre"|LEI` (UE y Reino Unido, desde 2020) `--dir informes/<carpeta>/notas`: `financieros.cuenta`, `balance.historico` y `flujos.historico` desde el XBRL del regulador (5-10 ejercicios, millones, con el concepto que da cada campo y la lista `faltan`). Se COMPRUEBA contra el informe anual (signos, perímetro, no recurrentes, splits viejos) y lo que falte se busca en las cuentas; los conceptos propios de la empresa (`bvi:…`) van en `notas/cuentas-mapa.json` con `--mapa`. Japón, Suiza y Australia no están: como siempre. Desde el 14-oct por la noche el JSON trae `parciales` (campos sumados con una parte que falta, p. ej. deuda sin el corto) y `dpa_base` por ejercicio (devengo, solo final o PAGADO): no copiar un campo marcado sin comprobarlo. **Con `--esef "Nombre"`, si hay varias entidades usa la primera (KONE → Konecranes): mira la línea «Varias entidades» y pasa el LEI.**
- El EBITDA de MarketScreener y del consenso es el AJUSTADO y el del XBRL el publicado: en comparables EV/EBITDA no mezclar bases (en sectores con muchos ajustes, corredores o software con compras, usar solo PER o decirlo en la nota D).
- Ejercicios no naturales (Diploma a septiembre, Cintas a mayo): el puente al valor por acción necesita las compras, recompras y caja posteriores al último balance.
- `node herramientas/historia-adelantada.mjs <carpeta>`: pasa un informe hecho con la historia del PER al cierre (v2) a la base adelantada (v3) sin rehacerlo: `datos-vN.json` nuevo, historia v2 guardada en `per_historico.v2`; si el BPA propio no está en la base del publicado, lo deja en v2 y avisa. Para informes nuevos no hace falta: el prompt ya pide la historia adelantada.
- `node herramientas/precios.mjs [TICKER…]`: último cierre de Yahoo de todas las analizadas en `verticales/empresa/precios.json`; `node herramientas/apuntar-12m.mjs --precios --todos` recalcula la rentabilidad a 12 meses de todas al mismo cierre (antes de una cartera o una compra). El precio del informe es el cierre de la fecha de corte o, como mucho, de dos sesiones antes (control del motor).
- En la nube de Claude, Node solo sale a internet con `NODE_USE_ENV_PROXY=1` delante del comando (curl sí sale). La SEC devuelve 403 a los User-Agent con paréntesis; `www.sec.gov` puede dar 403 por IP compartida (la herramienta pasa al buscador de EDGAR o al CIK).
- `node herramientas/form4.mjs --ticker XXX --desde AAAA-MM-DD`: compras y ventas de directivos en EE. UU., por persona. Filtra a mano las donaciones (código G) de un accionista del 10 %; incluye operaciones anteriores a `--desde` si se presentaron después. Los Form 144 son avisos, no ventas.
- `node herramientas/prompt-de.mjs A|B|C|D|E`: la parte del prompt de cada subagente (no imprime las lecciones: que las lean aparte).
- `node motor/integrar.mjs --dir informes/<carpeta>`: junta las notas y `propio` en `datos.json`.
- **No leas el código de `motor/`**: lo que calcula está en la sección 5 del prompt. Si un resultado te extraña, grep de la función concreta.

## Leer documentos sin gastar de más

- Informes de 300-600 páginas: `descargar.mjs` + `grep -n` sobre el `.txt` y leer solo esas páginas. Nunca el documento entero. Las notas de prensa de resultados anuales suelen traer cuentas y notas completas en ~40 páginas.
- PDF escaneados o tablas que no suman: `construccion/pdf-a-png.ps1 <pdf> -Paginas "N"` y leer como imagen solo esas páginas. `pdftotext -table -f N -l N archivo.pdf -` saca limpias tablas que `-layout` mezcla.
- Revisión del Word: que `a-pdf.ps1` lo abra sin reparar y mirar como imagen la portada, «La decisión» y la síntesis. `a-pdf.ps1` y `pdf-a-png.ps1` escriben en `%TEMP%\analisis-inversion`; ejecútalos con `powershell -ExecutionPolicy Bypass -File …`. **En Linux**: `soffice -env:UserInstallation=file:///tmp/lo-<carpeta> --headless --convert-to pdf --outdir <ruta absoluta> <docx absoluto>` (sin perfil propio sale con código 1 y sin PDF).
- **Nunca descargues con el navegador integrado** (al usuario le sale un cuadro de «Guardar»). Webs con Cloudflare o antibot: lee los enlaces con el navegador sin descargar y baja los PDF con `descargar.mjs`; los PDF suelen estar en otro dominio. No resuelvas comprobaciones de seguridad.

## Fuentes comunes (gratis)

- **Consenso**: MarketScreener (estimaciones a 3 años de la empresa y de los comparables, mismo proveedor para LTM y NTM); Investing para recomendaciones y precio objetivo. MarketScreener solo abre con WebFetch.
- **Valor empresa, ROIC, flotante, posición corta**: Stock Analysis (su valor empresa no resta las inversiones financieras a largo plazo: recalcúlalo con el puente).
- **Tipos de cambio**: BCE (`eurofxref-daily.xml`; histórico en `eurofxref-hist.zip`).
- **Bonos a 10 años**: siempre con `descargar.mjs` de fuente oficial (FRED `DGS10`, que va un día por detrás; Tesoro, BCE, Bundesbank…). **Nunca con WebFetch** (se inventó un 3,9 % con el bono al 5,31 %). **Tasa libre en euros = Bund**, no el bono del país de la sede; el riesgo país, si procede, en `prima_adicional_pct`.
- **Prima de riesgo implícita** (regla relativa): Excel mensual de Damodaran `https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx` (última fila de la hoja 1; columna «ERP (T12m with sustainable payout)»; las fechas de la primera columna vienen mal, guíate por el S&P y el bono). Oct 2026: 4,20 %.
- **Rating**: suele estar en el informe anual o en el folleto de la última emisión de bonos; no gastes búsquedas web en él.
- **Consenso tras resultados** (26-oct): MarketScreener y Stock Analysis tardan días en actualizar (y pueden servir páginas viejas por WebFetch); MarketBeat, el `quoteSummary`/`earningsTrend` de Yahoo, IFIS (Japón) y las notas de brokers de `reportapi.eastmoney.com` (acciones A) van al día. Di la fecha de cada cifra.
- **Antes de rehacer un informe «tras resultados», confirma la fecha en el comunicado o calendario de la empresa**: la del calendario o del informe puede ser supuesta (Air Liquide: 29-oct, no 23-oct).
- **Comunicados**: GlobeNewswire, MFN y Cision cuando la web de inversores no responde.

## Datos y consenso: trampas generales

- **Ninguna cifra de resúmenes de buscador, de WebFetch ni de «Summary by AI»** (inventaron un EBITDA semestral, un múltiplo de 12x y un bono «por encima del 6 %»). Regla 0.
- **Comprueba la definición del consenso antes de usarlo**: el EBITDA de MarketScreener puede sumar los pagos en acciones, provisiones, asociadas o toda la amortización del estado de flujos (US GAAP con arrendamientos operativos: el ajuste es la diferencia observada en el último ejercicio); su BPA puede ser GAAP en unas empresas y ajustado en otras, o incluir plusvalías de participadas un año sí y otro no (Alphabet, Amazon, Salesforce). Usa `consenso.base_ebitda: "ajustado"` con el ajuste en % de ventas si procede, y no restes dos veces lo que tu EBITDA ya excluye.
- **Comparables en la misma base que la empresa** (EBITDA con o sin pagos en acciones; BPA ajustado o no). Ejercicios no naturales: pondera los dos estimados por los meses de los próximos 12.
- **Comparables frágiles**: explica cada exclusión (el motor avisa si quitar uno cambia mucho la mediana). El motor no admite `excluir`: quítalos de la lista en `propio` y explícalo en `criterio`. Con pocos, baja su peso. Si otra carpeta tiene comparables de hace 1-3 días, reutilízalos llevándolos al nuevo cierre con la variación de precio.
- **Múltiplos de transacciones de prensa**: suelen mezclar valor de una parte con el EBITDA del 100 % o incluir sinergias. Recalcula con la nota oficial.
- **Acciones**: resta la autocartera; con dividendo flexible, doble clase o recompra acelerada pendiente, recalcula. Si usas acciones de después de una recompra recién terminada, resta lo pagado de la caja.
- **No recurrentes**: deterioros o reestructuración dentro del EBITDA o del LTM van en `no_recurrentes_en_ebitda` (también `ltm.`), no en parches año a año; plusvalías de valor razonable dentro de gastos operativos, igual. Lo que se repite casi todos los años (costes de adquisición, reestructuraciones anuales) no es no recurrente.
- **Perímetro**: compras al cierre y escisiones van en `cambios_perimetro`; una OPV no es una compra; un deterioro tampoco (deja Altman y Beneish sin interpretar). Reexpresiones: usa las cifras reexpresadas y di qué años no lo están (el Beneish no las detecta).
- **Fecha de corte en plena sesión**: cierre del día anterior, y dilo. **Ejercicio no natural**: fija si «FY2025» es el año de inicio o de cierre (`meta.etiqueta_ejercicio`) al principio y pásalo a los subagentes.
- **Cita el documento concreto**, no «la web de inversores».

- **Sanciones, litigios y multas que se citan**: comprobar en la fuente primaria (comunicado del regulador, expediente judicial) que la sancionada es ESTA empresa y no otra del mismo caso (Qualys, 8ª hora: se le atribuyó la sanción de la SEC por SolarWinds que fue a Unisys, Avaya, Check Point y Mimecast). Sin fuente primaria, no se cita.

## Valoración: trampas generales

- **Beta**: contrasta la mensual de 5 años con la semanal de 2 años y la sectorial de Damodaran corregida por caja, sobre todo tras una burbuja (Adyen 2,33) o en utilities frente a un índice local (0,35 frente al IBEX: usa uno europeo amplio). Si cotiza en una divisa y publica en otra, la acción convertida a la divisa de las cuentas frente a índices en esa divisa. Di cuánto depende la recomendación de la beta.
- **Tasa libre alta** (EE. UU. al 5,2 %): el WACC de una beta ~1 pasa del 10 %; la regla relativa da la lectura útil y la convicción baja porque la diferencia es de tasa, no de cifras.
- **Terminal de Gordon frente al múltiplo histórico**: en negocios sin inversión, Gordon ≈ 1/(WACC − g) veces el NOPAT; en empresas que siempre han cotizado baratas implica un múltiplo muy superior. Dilo en la justificación; la `media` con la mediana de comparables modera.
- **Cíclicas**: `perfil` en los escenarios para la caída de un año concreto, calibrada con las históricas.
- **Convicción**: el motor la sugiere (`conviccion_sugerida`); úsala salvo razón que las cifras no recojan, y dilo. Si el precio descuenta contracción pero la empresa lleva años a ese múltiplo, la convergencia pide una revalorización sin precedente: baja a Media.
- **Niveles de compra y venta**: cambian al escribir la recomendación; reléelos en `calc.recomendacion.niveles` tras el último cálculo y busca las cifras viejas en la síntesis y en `cambiaria_recomendacion`.
- **«La decisión»** usa el crecimiento medio de toda la proyección y el DCF inverso el de los años no fijos: no mezcles las dos cifras en la misma frase.

## Sostenibilidad del crecimiento (`dcf.sostenibilidad`)

- **Si la prueba falla, rebaja el caso base** al crecimiento financiable (decisión del usuario, 13-oct); explicarlo no basta. Antes, mide con el motor cuánto vale medio punto menos de crecimiento, y mira si se arregla subiendo el capex (capital por unidad de ventas al final de la proyección: Microsoft, Intuitive, Fanuc, Indra) o si el exceso viene del margen (CAF, Tomra, bioMérieux, CSL: separa el aumento del NOPAT a margen constante).
- **Reinversión < 15 % del NOPAT**: el motor no hace la prueba y escribe «activos ligeros» / «sin inversión neta» aunque haya miles de millones (NIIF 16, picos de capex, amortización de compras), y puede mencionar «comprador en serie» sin serlo. Hazla a mano y dilo en la justificación.
- **`mercado_final` cuando la cuota publicada es de un segmento o de una sola línea de productos**: el motor divide los ingresos del grupo entre ese mercado, así que va en `null` y la prueba de cuota se hace a mano con las ventas del segmento.
- **Cuota en volumen** (estudios, transacciones, volumen procesado): expresa el mercado final a precio unitario de la empresa (volumen × tarifa o comisión media); en millones de volumen la cuota sale 0.
- **Plataformas con comisión**: volumen = volumen de negocio a comisión constante; precio = cambio de la comisión media.
- **Capital invertido negativo o casi cero** (contratistas con anticipos, CRO, recompras masivas): ROIC, ROIC incremental y prueba de reinversión salen sin sentido; explícalo en `controles_explicados` y haz la prueba con cartera de pedidos, margen y poder de precios, o con los años con capital apreciable.
- Falta en el motor: ROIC normalizado del año base, campo de ingresos del perímetro de la cuota y control de «financiable + precio < proyectado».

## Rentabilidad a 12 meses (`valoracion.objetivo_12m`)

- **Los múltiplos los pone el motor con la regla común** (14-oct; regla v3 desde la tarde del 14-oct): tú das el BPA de los tres casos, la historia del PER limpia **adelantada** (precio de cierre de cada año ÷ BPA real del año siguiente, con `per_historico.base: "adelantado"`; sin ese campo el motor aplica la v2 antigua y avisa) y los comparables. Elegidos a mano salían sesgados al alza. Cuida que historia y comparables estén en la **misma base de BPA** que los casos y que el «mínimo de 5 años» sea el de la serie limpia.
- **Cuadra el BPA con el publicado** (participadas, minoritarios, plusvalías, intangibles comprados, GBp, ADS, acciones A/B) y quita de la historia los años de pérdidas, burbuja o BPA atípico, diciendo cuáles. `herramientas/objetivo12m.mjs` es solo una calculadora de apoyo (toma el nombre de la carpeta sin `informes/` y no aplica el perfil anual de los escenarios).
- **Un año «de auge» no es atípico** si no cumple una regla de exclusión: quitarlo deja la historia corta y el selector fuerza la v2 (Pernod 19-oct: 9,3 % → 22,1 %). En compradores en serie sí se quitan los años cuyo BPA siguiente está hundido por costes de integración (DSV 2019, 2024, 2025).
- **`robustez.mjs --actual` lee `en_curso` de `precios.json`**, que puede ser una toma intradía vieja: tras el cierre, `node herramientas/precios.mjs` antes de la robustez (19-oct: EL, FDR y DSV salían con otro precio).
- **Comprueba a mano la base de la historia del PER** (26-oct): `historia-adelantada.mjs` puede dividir los cierres por el BPA contable del XBRL mientras los casos van en ajustado o subyacente; infló la v3 de Elevance, Thermo Fisher, Nestlé, Tomra y Bureau Veritas (TMO 15,9 % → 4,6 %). Apunta en el diario qué base usan historia y casos.
- **Valor intrínseco ≠ precio a 12 meses**, y **el consenso no es un input** (corrección del usuario): se muestra al lado; si tu base queda lejos, revisa tus supuestos, pero no acerques la cifra solo porque esté lejos.

## Redacción e integración

- **La síntesis**: ≤ 650 palabras y las mismas cifras que la portada. Relee la portada antes de cerrar.
- `integrar` avisa de «subagente», «BORRADOR»/«borrador» (usa «proyecto»), comillas invertidas y «calc.» en campos que se imprimen. No uses `*cursiva*` para nombres de campo.
- **Una nota puede pisar las listas de otra** (segmentos de A pisados por B o por una nota con menos años): `integrar` avisa («sustituye entera la lista…»); fusiónalas o restáuralas en `propio` (leyendo la otra nota desde `propio.mjs`).
- **`_parches` no llega a `meta.huecos`**: retira el hueco con `huecos_resueltos` y registra el tuyo en `propio` con otro nombre de campo.
- **`meta.fecha_corte` y `meta.divisa` en `propio`** desde el primer cálculo.
- **Codificación**: busca «Ã» y «Â» en las notas antes de integrar (UTF-8 releído como cp1252 rompe la clasificación de huecos).
- **Scripts propios y textos largos**: con Write o Edit, nunca con heredocs ni `node -e` en Bash (las comillas vaciaron una síntesis); en `.mjs` (el repo es `"type": "module"`); con rutas de OneDrive, `fileURLToPath(import.meta.url)`.
- **Nunca datos personales** (el correo del usuario) en un User-Agent ni en una consulta; para EDGAR, `descargar.mjs` ya lleva el suyo.

## Subagentes

- **Guardan nota desde el principio y cada pocos campos**. A los 10 minutos, mira el **contenido** de `notas/<letra>.json`, no que exista (un esqueleto vacío no sobrevive a un corte); si sigue vacío, recuérdaselo.
- **Las búsquedas web se agotan en unos 15 minutos y las comparten todos los subagentes**: primero documentos oficiales; las búsquedas, para gobierno, rating y prensa.
- **Si un límite los corta**, sigue tú desde sus notas por orden de núcleo: cuentas, balance y flujos → consenso y comparables → gobierno → sector. Al relanzar uno, pásale la lista de lo ya descargado en `notas/docs`.
- **Varios análisis a la vez**: tope de 20 subagentes concurrentes; lanza como mucho tres o cuatro análisis. Un orquestador que cierra el turno con subagentes en segundo plano entrega sin terminar: antes de relanzarlos, mira el `_estado` de las notas.
- **Encargos**: no pongas nombres de cargos sin comprobar (contaminan la nota). Que escriban siempre con Write.
- **Iteración tras unos resultados**: copia las notas A-D de la anterior y da a cada subagente un encargo acotado a lo que cambia (trimestre, LTM, puente, consenso, bolsa, guía); terminan en 2-6 minutos. Si la anterior fijó un disparador y se cumple, dilo en la síntesis.
- **Sentimiento (E)**: opiniones de los últimos tres meses, tipo «Foros y redes»; ninguna cifra sale de ahí y no entra en la valoración. Ve directo a lo que abre (por país, en `lecciones-paises.md`): Reddit, Stocktwits web, LSE Chat y Stockhouse dan 403. Lo que suele abrir: RSS de Seeking Alpha (`seekingalpha.com/api/sa/combined/<TICKER>.xml`), API de Stocktwits (`api.stocktwits.com/api/2/streams/symbol/<T>.json`), índices de Motley Fool (`fool.com/sitemap/AAAA/MM`), Stockchase, interactive investor, MarketBeat (`/stocks/NASDAQ/<T>/news/`) y prensa sectorial. Si a los 10 minutos E.json sigue vacío, páralo y hazlo tú.
- **Tickers repetidos entre bolsas** (27-oct): `simbolos.json`, `precios` y `apuntar-12m` usan el ticker como clave; si ya existe (SAN = Sanofi), usa la clave con sufijo (`SAN.MC`) también en `identificacion.ticker`.
- **El selector v3/v2 salta con el precio** (28-oct: Hermès bajó a v2 al caer un 6,5 %; Equifax subió a v3 al subir un 10,8 %, con el BPA igual). Si la relación mediana/PER de hoy está a menos de un 5 % de 1,8, da la otra versión al lado en la síntesis.
- **`riesgos.ia` es obligatorio** y ningún control lo exige: el aviso de `rellenar.mjs` «riesgos por debajo del 60 %» suele ser eso (faltaba en Hermès, Intuit y Zoetis, también en los informes regenerados).
- **Bono de EE. UU. en la nube**: si `descargar.mjs` falla con FRED, el CSV diario del Tesoro (`daily-treasury-rates.csv`) por `curl` funciona y trae el dato del día.
