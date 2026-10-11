# Encargo común a los subagentes A-D (Trigano, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion (en Bash: cd "/c/Users/husoe/OneDrive/Escritorio/IUSPI/Proyecto INV/analisis-inversion")
Carpeta de trabajo: informes/trigano-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\trigano<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/trigano-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar: es un OneDrive). No toques otros informes, ni el código del repo, ni `cola.md`, `MEMORIA.md`, `lecciones.md`, `seguimiento.xlsx`, ni ejecutes `herramientas/seguimiento.mjs`. Sin git (ni add, ni commit, ni push). Hay otros análisis corriendo a la vez en el repo: no toques sus carpetas.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera / User-Agent.** No uses `curl` a mano con cabeceras propias.
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto; mira sobre todo las últimas líneas: Francia, MFN, API de BDIF de la AMF).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/trigano-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas, mira primero el `.tabla.txt` o `pdftotext -table -f N -l N`). `--lista URL` lista los PDF de una página.

## Empresa
- **Trigano S.A.** (París; sociedad anónima con **Directoire y Conseil de surveillance**). Euronext París, compartimento A, CAC Mid 60 / SBF 120. Ticker **TRI** (Yahoo `TRI.PA`), ISIN **FR0005691656**. Fundador y accionista de control: François Feuillet y familia (comprobar % de capital y de votos: hay derechos de voto doble en Francia).
- Autocaravanas (camping-cars, n.º 1 europeo), caravanas, accesorios y redes de distribución integradas; «Autres activités de loisirs»: residencias móviles (mobil-homes: IRM, Louisiane, O'Hara, Adria Dom, **BIO Habitat comprada el 1-dic-2024**), remolques (Erka, Lider…), equipamiento de camping.
- **Cuentas en EUR** (millones), NIIF-UE. **EJERCICIO NO NATURAL: cierra el 31 de agosto.** **Etiqueta = año en que TERMINA** (`meta.etiqueta_ejercicio: "fin"`, `cierre_ejercicio_mes: 8`): **"FY2025" = 1-sep-2024 a 31-ago-2025** (la empresa lo llama «exercice 2025» o «2024/2025»); **"FY2026" = 1-sep-2025 a 31-ago-2026** («2025/2026»). Semestres: "1S26" = sep-2025 a feb-2026. Trimestres de ventas: "1T26" = sep-nov 2025, etc. Úsalo siempre así en `periodo`.
- Último ejercicio auditado: **FY2025** (Rapport annuel 2025, publicado 16-dic-2025: https://trigano-finance.com/download/26810/ed3df1dc475753e1fb81b328c93ffa55/). Último informe con cuenta completa: **resultados del 1S26** (6-may-2026: https://trigano-finance.com/download/26916/5d9e31680ddeabcb9297bfb91518b93e/ — ventas 1.779,7 M, ROC 159,3 M, BN 121,3 M, BPA 6,28). **Ventas anuales FY2026 publicadas el 23-sep-2026** (https://trigano-finance.com/download/26918/08af5f02bd94ebd46c44f8b35705f922/ — 3.800,0 M, +3,8 %; margen ROC «cercano al 10 %»; tesorería neta sin NIIF 16 ≈ 500 M; recompras de 60 M y dividendo de 76 M en el ejercicio; dividendo FY2026 a cuenta 2,10 + 2,40 EUR). Ya están en `notas/docs/P_ca_annuel_2026.*` y `P_resultats_1S26.*`. Ventas 3T26 (24-jun-2026): https://trigano-finance.com/download/26917/efa7437b09f5ed82a38939eecb41074a/ ; 2T26 (25-mar-2026): https://trigano-finance.com/download/26911/d31ee373e4d83104738e78c7d090e2e5/ ; 1T26 (6-ene-2026): https://trigano-finance.com/download/26873/a3e1cc5a522d732b0ecc7ae80884dd38/ .
- Web de inversores: https://trigano-finance.com (Rapports financiers: /finances-et-actionnaires/rapports-financiers/ ; Communiqués: /finances-et-actionnaires/communiques-de-presse/ ; Assemblée générale: /finances-et-actionnaires/assemblees-generales/ ; Gouvernance: /le-groupe/gouvernance/). Los informes anuales anteriores (2017-2024) también están ahí (usa `descargar.mjs --lista` sobre esas páginas o WebFetch para ver los enlaces /download/...). MFN: https://mfn.se/all/a/trigano (calendario). AMF BDIF para operaciones de directivos y declaraciones de umbrales (ver lecciones).
- **Próximos resultados: resultados anuales FY2026 el 24-nov-2026** (después del cierre).
- Fecha de corte: **2026-10-11 (domingo)**: precio de cierre del **viernes 9-oct-2026, 125,30 EUR** (ya en `notas/bolsa.json`, de `herramientas/bolsa.mjs`; máx. 52s 178,8 el 15-ene-2026, mín. 123,7 el 2-oct-2026). Nada publicado después del corte.
- Cíclica: el sector de vehículos de ocio cayó con fuerza en 2008-09 y tuvo un auge 2020-2022 (COVID) con normalización en 2024-2025. Las caídas históricas de ventas y márgenes de Trigano (FY2009, FY2020) y de Thor/Hymer, Knaus Tabbert y Winnebago importan para calibrar el escenario bajista.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de EUR**; BPA y DPA en EUR; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto (el PDF), no la página de inversores.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre muchos subagentes de cuatro análisis y se agota pronto.** Primero documentos oficiales (trigano-finance.com, AMF, MFN); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas. Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
