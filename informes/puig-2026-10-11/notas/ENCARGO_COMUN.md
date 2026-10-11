# Encargo común a los subagentes A-E (Puig, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion (en Bash: cd "/c/Users/husoe/OneDrive/Escritorio/IUSPI/Proyecto INV/analisis-inversion")
Carpeta de trabajo: informes/puig-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\puig<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/puig-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar: es un OneDrive). No toques otros informes, ni el código del repo, ni `cola.md`, `MEMORIA.md`, `lecciones.md`, `seguimiento.xlsx`. Sin git (ni add, ni commit, ni push). Hay otros análisis corriendo a la vez (SAP, Grifols, Netflix, Hermès): no toques sus carpetas.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera / User-Agent.** No uses `curl` a mano con cabeceras propias.
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/puig-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas, mira primero el `.tabla.txt` o `pdftotext -table -f N -l N`). `--lista URL` lista los PDF de una página.

## Empresa
- **Puig Brands, S.A.** (Barcelona). Cotiza en las Bolsas españolas (SIBE) desde la OPV del 3-may-2024 (24,50 EUR). Ticker **PUIG** (Yahoo `PUIG.MC`). Cotizan solo las **acciones de clase B** (ISIN ES0105777017, comprobar); las de **clase A** (con 5 votos por acción) no cotizan y las controla la familia Puig a través de **Exea Empresarial**. Índice: IBEX 35.
- **Cuentas en EUR** (millones), NIIF-UE, ejercicio natural (`"2025"`), cuenta probablemente por función (comprobar). `tipo_cambio` 1.
- Antes de la OPV (2024) Puig ya publicaba cuentas anuales consolidadas y un informe anual (Puig, S.L. / Puig Brands); el folleto de la OPV (CNMV, abr-2024) trae 2021-2023 auditados. Objetivo: 2019-2025 (mínimo 2020-2025) + 1S26.
- Último informe antes del corte: **resultados del 1S 2026 (finales de julio de 2026)**; ventas del 1T26 en abril. Próximo: **ventas de 9 meses / 3T26 a finales de octubre de 2026** (confirmar la fecha en el calendario de la web de inversores).
- Hechos clave de 2026: conversaciones de **fusión con Estée Lauder**, confirmadas a finales de marzo de 2026 y **rotas en mayo de 2026** (la acción cayó un 13,4 % el 22-may-2026); conflicto en Oriente Medio con efecto en ventas del 1S26; cambio de primer ejecutivo (José Manuel Albesa sustituye a Marc Puig como CEO en 2026; Marc Puig sigue de presidente: comprobar).
- Segmentos (comprobar): **Fragancias y Moda** (Rabanne, Carolina Herrera, Jean Paul Gaultier, Byredo, Penhaligon's, L'Artisan, Nina Ricci, Dries Van Noten, licencias), **Maquillaje** (Charlotte Tilbury, Byredo, Christian Louboutin), **Cuidado de la piel** (Uriage, Apivita, Dr. Barbara Sturm, Loto del Sur). Geografías: EMEA, América, Asia-Pacífico.
- Pagos de compras pendientes (opciones de venta de minoritarios de Charlotte Tilbury, Byredo, Sturm…) y deuda: ojo con el puente (`otros_ajustes`) y con NIIF 16.
- Competidores (B y D): L'Oréal, Estée Lauder, Coty, Interparfums (FR y US), Shiseido, Beiersdorf, e.l.f. Beauty, LVMH (Perfumes y Cosméticos), Kao. Transacciones del sector: Kering Beauté → L'Oréal (2025), Tom Ford → Estée Lauder (2022), Aesop → L'Oréal (2023), Rhode → e.l.f. (2025), Charlotte Tilbury → Puig (2020), Byredo → Puig (2022), Drunk Elephant → Shiseido (2019), KKR/Wella-Coty, etc.
- Fecha de corte: **2026-10-11 (domingo)**: precio de cierre del **viernes 9-oct-2026, 18,08 EUR** (ya en `notas/bolsa.json`, de `herramientas/bolsa.mjs`). Nada publicado después del corte.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de EUR**; BPA y DPA en EUR; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto (el PDF), no la página de inversores.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre muchos subagentes de cinco análisis y se agota pronto.** Primero documentos oficiales (web de inversores de Puig, CNMV); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas (E: 10 minutos y 40). Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
