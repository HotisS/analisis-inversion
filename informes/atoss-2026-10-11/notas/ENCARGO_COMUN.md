# Encargo común a los subagentes A-D (ATOSS Software, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion (en Bash: cd "/c/Users/husoe/OneDrive/Escritorio/IUSPI/Proyecto INV/analisis-inversion")
Carpeta de trabajo: informes/atoss-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\atoss<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/atoss-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar: es un OneDrive). No toques otros informes, ni el código del repo, ni `cola.md`, `MEMORIA.md`, `lecciones.md`, `seguimiento.xlsx`, ni ejecutes `herramientas/seguimiento.mjs`. Sin git (ni add, ni commit, ni push). Hay otros análisis corriendo a la vez en el repo: no toques sus carpetas.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera / User-Agent.** No uses `curl` a mano con cabeceras propias.
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto; mira sobre todo las últimas líneas: software con nube y pasivos de contrato, doble control, `^GDAXI`/EXS1.DE).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/atoss-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas, mira primero el `.tabla.txt` o `pdftotext -table -f N -l N`). `--lista URL` lista los PDF de una página.

## Empresa
- **ATOSS Software SE** (Múnich; Societas Europaea con sistema dual: **Vorstand** y **Aufsichtsrat**). Xetra/Fráncfort, Prime Standard. Ticker **AOF** (Yahoo `AOF.DE`), ISIN **DE0005104400**. Índices: **SDAX y TecDAX** (comprobado en el informe semestral 2026, pág. 6-7). Software de gestión de plantillas (*workforce management*: planificación de turnos, control de presencia, gestión de tiempos), con nube (*Cloud & Subscriptions*), mantenimiento, licencias, consultoría y hardware (terminales).
- **Cuentas en EUR (millones en el JSON; la empresa publica en TEUR o EUR: divide)**, NIIF-UE, **ejercicio natural (31-dic)**. Último anual auditado: **2025** (Geschäftsbericht 2025, bilingüe: https://www.hauptversammlung.de/fileadmin/public/user_upload/Atoss_GB25.pdf ; ventas 189,3 M). Último intermedio: **informe semestral 1S26** (11-ago-2026, ya en `notas/docs/P_halbjahr_2026.*`: ventas 103,2 M, EBIT 36,2 M, 35 %) y comunicado del 2T26 (24-jul-2026, `P_q2_2026.*`). Comunicado de resultados 2025 (30-ene-2026): https://backend.atoss.com/sites/default/files/2026-01/atoss-pi-geschaefstjahr-2025-30012026.pdf . Los PDF de la empresa están en `https://backend.atoss.com/sites/default/files/AAAA-MM/...` (bajan bien); la web www.atoss.com da 403 (antibot): busca los nombres de archivo con búsquedas web o WebFetch de terceros, o léelos con el navegador integrado sin descargar nada allí. Informes anteriores: patrón «atoss-half-year-report-2025.pdf», «atoss-annual-report-2024.pdf» o similares (compruébalo).
- **Acciones: 15.906.272** (sin autocartera relevante; comprobar). Hubo una ampliación con cargo a reservas (acciones gratuitas) que reexpresó las cifras por acción de años anteriores: usa siempre las ajustadas a 15,9 M de acciones.
- **Accionistas a 30-jun-2026**: Andreas Obereder (fundador y CEO) 23,90 % vía AOB Portfolio One GmbH & Co. KG (compró acciones en el 1S26); **General Atlantic Chronos GmbH 21,59 %** (desde 11-sep-2024); flotante 54,51 %. **Relevo anunciado**: Obereder deja el cargo de CEO a finales de 2026/principios de 2027 y pasa al Aufsichtsrat; Pritim Kumar Krishnamoorthy (COO) será CEO; Christof Leiber, CFO. Junta del 30-abr-2026: dividendo 2,28 EUR; rechazada la autorización de emitir bonos convertibles/warrants.
- **Guía 2026**: ventas 210-215 M y margen EBIT ≥ 34 %; **guía 2027**: ventas 235-245 M y margen EBIT ≥ 35 %.
- **Próximos resultados: 3T26 el 23-oct-2026** (después del corte).
- Fecha de corte: **2026-10-11 (domingo)**: cierre del **viernes 9-oct-2026, 87,30 EUR** (ya en `notas/bolsa.json`, de `herramientas/bolsa.mjs` frente a EXSE.DE (SDAX) y EXS2.DE (TecDAX), rentabilidad total; máx. 52s 124,0 el 13-ene-2026, mín. 65,0 el 26-jun-2026). Nada publicado después del corte.
- **Software con cobro anticipado (lección de SAP y Nemetschek)**: los **pasivos de contrato (Vertragsverbindlichkeiten / ingresos diferidos)** van en `balance.historico[].pasivos_contrato` de **todos** los ejercicios (y activos de contrato si los hay); sin ellos el circulante sale positivo y el DCF mete caja falsa.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de EUR**; BPA y DPA en EUR; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto (el PDF), no la página de inversores. **Antes de terminar, comprueba que todo [n] que citas existe en tu `fuentes`.**
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre muchos subagentes de dos análisis y se agota pronto.** Primero documentos oficiales (backend.atoss.com, Unternehmensregister, BaFin, EQS); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas. Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
