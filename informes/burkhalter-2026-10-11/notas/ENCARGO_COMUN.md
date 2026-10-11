# Encargo común a los subagentes A-D (Burkhalter, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion (en Bash: cd "/c/Users/husoe/OneDrive/Escritorio/IUSPI/Proyecto INV/analisis-inversion")
Carpeta de trabajo: informes/burkhalter-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\burkhalter<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/burkhalter-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar, ni Glob ni Grep: es un OneDrive). No toques otros informes, ni el código del repo, ni `cola.md`, `MEMORIA.md`, `lecciones.md`, `seguimiento.xlsx`. Sin git (ni add, ni commit, ni push). No ejecutes `herramientas/seguimiento.mjs`. Hay otros análisis corriendo a la vez (CTS Eventim, ATOSS…): no toques sus carpetas.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera / User-Agent.** No uses `curl` a mano con cabeceras propias.
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto). Ojo a la línea de **Suiza (SIX)**: participaciones significativas en la API pública de la SIX (registro de notificaciones); las operaciones de directivos son anónimas (solo cargo e importe); no hay registro público de posiciones cortas.
3. Descarga con: `node herramientas/descargar.mjs --dir informes/burkhalter-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas, mira primero el `.tabla.txt` o `pdftotext -table -f N -l N`). `--lista URL` lista los PDF de una página (la web burkhalter.ch no devuelve los enlaces con `--lista`: localiza los PDF con WebFetch de la página de publicaciones o con las notas de EQS / webdisclosure, y bájalos con descargar.mjs).

## Empresa
- **Burkhalter Holding AG** (Zúrich). Cotiza en la **SIX Swiss Exchange**, ticker **BRKN** (Yahoo `BRKN.SW`), ISIN **CH0212255803** (comprobar). Índice de referencia: SPI. Grupo de instalaciones técnicas de edificios en Suiza (electricidad sobre todo; desde la fusión con **Poenina Holding** en 2023, también calefacción, ventilación, climatización, fontanería y cubiertas/fachadas: Caliqua, etc.). Unas 50-80 filiales locales; compras pequeñas constantes (seis en 2026 hasta septiembre: BZ-Dépannage, Enplan, Elektro Gasser, Caotec, Progressio/anplaq, AZ systems).
- **Cuentas en CHF** (millones), ejercicio natural (`"2025"`). Normas: probablemente **Swiss GAAP FER** (comprobar en el informe anual). OJO: bajo Swiss GAAP FER el fondo de comercio suele **compensarse contra el patrimonio** al comprar (o amortizarse); eso infla el ROIC y el ROE. A: busca la nota del fondo de comercio «teórico» (efecto de su capitalización en balance y cuenta) y anótalo en `extra`. Sin NIIF 16: los arrendamientos operativos no están en el balance (como US GAAP: el alquiler ya está en el EBITDA; no sumarlos a la deuda).
- Publica **anual y semestral** (no trimestral): `trimestres` va por semestres («1S24», «2S24»…). Último informe antes del corte: **semestre 1S26 publicado el 7-sep-2026** (ventas 587,3 M, +0,1 %; EBIT 31,1 M; beneficio 25,9 M; BPA 2,44 CHF; guía: BPA 2026 «moderadamente» por encima de 2025). La acción cayó ≈ 7-8 % ese día. Próximo: resultados anuales 2026 (≈ marzo de 2027; confirmar en el calendario financiero del informe semestral) y junta (≈ mayo de 2027).
- Directivos: presidente Gaudenz F. Domenig, CEO Zeno Böhm, CFO Urs Domenig (comprobar parentesco y fechas). Payout históricamente muy alto (dividendo ≈ todo el beneficio): ver `capital`.
- Fecha de corte: **2026-10-11 (domingo)**: precio de cierre del **viernes 9-oct-2026, 124,60 CHF** (ya en `notas/bolsa.json`, de `herramientas/bolsa.mjs`: rango 52 semanas 116,6-192,4; máximo el 22-abr-2026; beta mensual 5 años 0,58 frente al SPI). Nada publicado después del corte.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de CHF**; BPA y DPA en CHF; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto (el PDF), no la página de inversores.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre muchos subagentes de varios análisis y se agota pronto.** Primero documentos oficiales (burkhalter.ch, EQS, SIX); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas. Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
