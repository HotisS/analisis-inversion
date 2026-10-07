# Lecciones de los análisis reales (léelas antes de buscar)

Lo aprendido en Viscofan, Indra y On (octubre de 2026). Ahorra búsquedas que ya sabemos que fallan y evita trampas que ya nos mordieron. Se actualiza tras cada análisis; los diarios completos están en `informes/*/diario.md`, pero no hace falta leerlos.

## Herramientas del repo: úsalas en vez de escribir las tuyas

- `node herramientas/descargar.mjs --dir informes/<carpeta>/notas/docs nombre url …`: guarda HTML y PDF con su texto al lado (PDF con marcas de página). Avisa de PDF escaneados y de bloqueos antibot.
- `node herramientas/bolsa.mjs --accion SIMB --indice SIMB --sector SIMB --corte AAAA-MM-DD [--cierre-mes M] --salida informes/<carpeta>/notas/bolsa.json`: precio, rango de 52 semanas, volumen, rentabilidades (1-10 años y por año), beta de 5 años, volatilidad, caída máxima y **precio de cierre de cada ejercicio** (para `multiplos_historicos`). Símbolos de Yahoo: `ITX.MC`, `IDR.MC`, `ONON`, `^IBEX`, `^GSPC`, `^STOXX`; los ETF (`SPY`, `XLY`, `EXV1.DE`…) dan rentabilidad total, los índices `^…` solo de precio (la herramienta no los mezcla). Fuente citable: «Yahoo Finance, históricos diarios».
- `node herramientas/prompt-de.mjs A|B|C|D`: la parte del prompt de cada subagente.
- `node motor/integrar.mjs --dir informes/<carpeta>`: junta `notas/A-D.json` y `notas/propio.json` en `datos.json` con las fuentes renumeradas (ver el comando `/analiza-empresa`).
- **No leas el código de `motor/`**: lo que calcula está en la sección 5 del prompt. Si un resultado te extraña, busca con grep la función concreta.

## Leer documentos sin gastar de más

- Informes anuales de 300-600 páginas: `descargar.mjs` + `grep -n` sobre el `.txt` para localizar la nota (segmentos, deuda, arrendamientos, BPA, vinculadas) y leer solo esas páginas. Nunca el documento entero.
- PDF escaneados (pasó con el IAGC de Indra y la auditoría de Viscofan): `construccion/pdf-a-png.ps1` y leer como imagen **solo** las páginas que hacen falta, localizadas por el índice.
- Revisión del Word final: basta con que `a-pdf.ps1` lo abra sin reparar y mirar como imagen la portada, «La decisión» y la síntesis. El aspecto general de la plantilla ya está revisado.

## Fuentes que funcionan (gratis)

- **EE. UU. y emisores extranjeros**: EDGAR (10-K/10-Q o 20-F/6-K, 13G, Form 144). Con un User-Agent de aplicación (lo pone `descargar.mjs`). Los Form 144 son avisos de venta, no ventas.
- **España**: web de inversores de la empresa (PDF bajan bien aunque la web tenga antibot), CNMV para hechos relevantes; el registro de operaciones de directivos de la CNMV da 403 sin navegador (anótalo como hueco con sus tres intentos, no insistas).
- **Consenso**: MarketScreener (estimaciones completas a 3 años, de la empresa y de los comparables, mismo proveedor para LTM y NTM). Investing para recomendaciones y precio objetivo como contraste.
- **Valor empresa, ROIC, flotante, posición corta**: Stock Analysis.
- **Tipos de cambio**: BCE (`eurofxref-daily.xml`, histórico en `eurofxref-hist.zip`). **Bonos a 10 años**: Trading Economics o Investing, pidiendo a WebFetch el texto literal del dato.
- **Japón** (para Fanuc, Keyence): web de inversores en inglés (*Securities Report*, *Kessan Tanshin*), ejercicio a marzo; EDINET si hace falta el original.

## Trampas que ya nos mordieron

- **Resúmenes de buscador**: inventaron un EBITDA semestral (315 M en vez de 134,5 M), un múltiplo de 12x para una operación que no lo publicó y un bono «por encima del 6 %». Ninguna cifra sale de ahí (regla 0).
- **Múltiplos de transacciones** citados por la prensa: a menudo mezclan valor de las acciones de una parte con el EBITDA del 100 %, o incluyen sinergias. Recalcula con la nota oficial.
- **Acciones en circulación**: resta la autocartera; con dividendo flexible o doble clase (On: A + B/10), recalcula.
- **Cuenta por naturaleza** (muchas españolas): `meta.formato_cuenta: "naturaleza"`.
- **Anticipos y préstamos públicos** (Indra): decide con la regla del puente y di el efecto por acción.
- **Compras al cierre y OPV**: declara `cambios_perimetro`; una OPV no es una compra (el motor ya lo distingue si `emision_acciones` está en los flujos).
- **EBITDA ajustado del consenso** (sin remuneración en acciones): `consenso.base_ebitda: "ajustado"` y el ajuste en % de ventas.
- **Comparables con ejercicios no naturales** (Nike, Deckers, Lululemon…): pondera los dos ejercicios estimados por los meses que caen en los próximos 12.
- **Fecha de corte en plena sesión**: usa el cierre del día anterior y dilo.
- **Ejercicio no natural** (Inditex): mira si «FY2025» es el año de inicio o el de cierre y pon `meta.etiqueta_ejercicio`; no fuerces `cierre_ejercicio_mes`.
- **NIIF 16 en distribución**: sin las altas de derechos de uso en el capex, el DCF de Inditex daba 54,48 EUR en vez de 42,80 (las tiendas sin alquiler). Es la regla que más valor mueve en negocios con muchos locales.
- **Comparables frágiles**: con Inditex, la mediana pasaba de 7,7x a 12,2x según se incluyeran o no tres empresas. Explica cada exclusión; el motor avisa si quitar una sola cambia mucho la mediana.
- **Control familiar**: con un accionista de control, el voto de la junta lo decide él; calcula el voto en contra sobre el capital libre presente (`voto_remuneracion_contra_libre_pct`) y marca `presidente_vinculado_control` si preside alguien de su entorno.
- **Fuentes genéricas**: no cites «la web de inversores» para cosas distintas; cita el documento concreto (el integrador separa las fuentes con la misma URL y títulos distintos, pero mejor que no ocurra).
- **EE. UU. (EDGAR)**: `curl` a sec.gov da 403; usa `descargar.mjs` (lleva el User-Agent que exige la SEC). Las series anuales salen limpias de `https://data.sec.gov/api/xbrl/companyfacts/CIK##########.json` y la lista de presentaciones (Form 4, 10-Q…) de `https://data.sec.gov/submissions/CIK##########.json` (CIK con ceros a la izquierda hasta 10 cifras).
- **Sistemas cedidos en arrendamiento** (Intuitive: 809 M USD en 2025 traspasados de existencias a inmovilizado, fuera del capex): súmalos al capex o el DCF sube más de un 8 %.
- **MarketScreener cambia de base según la empresa**: el BPA es GAAP en unas y ajustado en otras (Intuitive frente a Stryker). Compruébalo con la conciliación de cada empresa antes de comparar PER.
- **Stock Analysis**: su valor empresa no resta las inversiones financieras a largo plazo; recalcúlalo con el puente.
- **Tasa libre de EE. UU.**: FRED (`https://fred.stlouisfed.org/series/DGS10`) o el Tesoro.
- **Suiza (SIX)**: participaciones significativas en la API pública de la SIX (registro de notificaciones); las operaciones de directivos son anónimas (solo cargo e importe); no hay registro público de posiciones cortas. SEMI (datos del sector de semiconductores) da 403.
- **Tablas de PDF desordenadas**: `pdftotext -layout` mezcla columnas en tablas anchas (pasó a los cuatro subagentes de VAT). Si una fila no suma su total, mira esa página como imagen con `construccion/pdf-a-png.ps1 <pdf> -Paginas "N"`.
- **Cíclicas**: usa `perfil` en los escenarios para la caída de un año concreto (calibrada con las caídas históricas) en vez de bajar todos los años.
- **Revisión visual**: `a-pdf.ps1` y `pdf-a-png.ps1` escriben en `%TEMP%\analisis-inversion` (fuera de OneDrive) y con `-Paginas` solo las páginas que hacen falta. Ejecútalos con `powershell -ExecutionPolicy Bypass -File …`.
- **Contratistas** (CAF, Indra): el circulante incluye activos y pasivos por contrato (`balance.historico[].activos_contrato` y `pasivos_contrato`); sin ellos, CAF salía con 405 M de circulante frente a los 87 M que publica. El flujo libre de 2022-2025 fue casi nulo porque el circulante se come ~21 céntimos por euro de ventas nuevas: el motor avisa si el DCF proyecta mucha más caja que la histórica.
- **Tablas de PDF**: `pdftotext -table -f N -l N archivo.pdf -` saca limpias tablas que `-layout` mezcla.
- **Yahoo y la fecha de corte**: en valores europeos el cierre del día de corte puede no estar aún; `bolsa.mjs` avisa y usa la sesión anterior (dilo en el informe).
- **Documentos y su URL**: cita el PDF concreto, no la página de inversores. `descargar.mjs` deja `docs/_manifest.json` con la URL final de cada archivo y avisa si una dirección antigua redirige a la portada.
