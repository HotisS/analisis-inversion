# Encargo común a los subagentes A-E (Salesforce, corte 2026-10-12)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Carpeta de trabajo: informes/salesforce-2026-10-12/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\crm<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/salesforce-2026-10-12/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/, y como referencia los informes `informes/sap-2026-10-11/`, `informes/microsoft-2026-10-08/`, `informes/adobe-2026-10-10/`), y en %TEMP%. Prohibido leer, listar o buscar por encima de la carpeta `analisis-inversion` (es un OneDrive corporativo). No toques otros informes, ni el código del repo (`motor/`, `construccion/`, `verticales/`, `herramientas/`), ni `seguimiento.xlsx`, `cola.md`, `MEMORIA.md`, `lecciones.md`. Sin git add/commit/push. Hay otros análisis corriendo a la vez en el mismo repo: no los toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota). **Nombres de descarga sin extensión** (`descargar.mjs` la añade y si no la duplica: `X.json.json`).
**Nunca pongas datos personales del usuario (correo, nombre) en ninguna consulta externa, URL, cabecera ni User-Agent.** Para EDGAR usa `descargar.mjs`, que ya lleva su User-Agent de aplicación; nada de `curl` a mano contra sec.gov.
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado para WebFetch: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero. La salida incluye las lecciones (≈57 KB): léela por partes.
2. Lee `verticales/empresa/lecciones.md` si no te ha salido entera.
3. Descarga con: `node herramientas/descargar.mjs --dir informes/salesforce-2026-10-12/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`).

## Empresa
- **Salesforce, Inc.** NYSE: **CRM** (Yahoo `CRM`). ISIN **US79466L3024**. CIK **0001108524**. Sede: San Francisco (Salesforce Tower). Índice: S&P 500 (también Dow Jones). Sector GICS: Tecnologías de la información / Software de aplicaciones.
- **Cuentas en USD** (millones), **US GAAP**; `divisa_cotizacion` USD, `tipo_cambio` 1. Cuenta **por función** (coste de suscripción y soporte, coste de servicios profesionales, I+D, marketing y ventas, generales y administración, reestructuración).
- **Ejercicio a 31 de enero. Etiqueta «fin»: «FY2026» = feb-2025 a ene-2026 (10-K presentado 2026-03-02); «FY2027» = feb-2026 a ene-2027 (en curso).** Trimestres con la etiqueta de la empresa: 1T27 = feb-abr 2026, 2T27 = may-jul 2026. Usa siempre esta convención (`"FY2026"`, `"FY2027e"`, `"2T27"`).
- Último anual: **10-K FY2026**, `https://www.sec.gov/Archives/edgar/data/1108524/000110852426000060/crm-20260131.htm`. Anterior: 10-K FY2025 (accession 0001108524-25-000006, `crm-20250131.htm`).
- Último trimestral: **10-Q 2T27** (31-jul-2026), `https://www.sec.gov/Archives/edgar/data/1108524/000110852426000190/crm-20260731.htm`; resultados 8-K del 2026-08-26 (accession 0001108524-26-000187). 1T27: 10-Q del 2026-05-28 (0001108524-26-000127), 8-K 2026-05-27 (0001108524-26-000125).
- **Investor Day 16-sep-2026**: presentación en el 8-K del 2026-09-17 (accession 0001108524-26-000210, exhibit 99.1): objetivos a medio plazo, guía y modelo económico.
- Proxy: **DEF 14A del 2026-04-16** (accession 0001108524-26-000085, `crm-20260416.htm`), junta del 2026-05-28 (8-K de votaciones 2026-06-01, 0001108524-26-000131).
- Otros 8-K: deuda (8-K 2025-11-18 ítem 2.03; 8-K 2026-03-12 y 2026-03-13 ítems 1.01/2.03), cambios de directivos (5.02: 2026-03-06, 2026-05-27, 2026-08-05 —salida de un presidente y director de ingeniería—, 2026-09-02).
- Lista de presentaciones EDGAR ya descargada: `notas/docs/comun_submissions.json`. Series XBRL: `https://data.sec.gov/api/xbrl/companyfacts/CIK0001108524.json` (us-gaap).
- **Compras grandes**: Informatica (cerrada en noviembre de 2025, ≈8.000 M USD; comprueba fecha e importe en el 10-K): cambia el perímetro de FY2026 (solo unos meses consolidados) y FY2027. También Slack (2021, ≈27.700 M), Tableau (2019), MuleSoft (2018), Own Company, Regrello, Convergence, Bluebirds, etc.
- Puntos clave: Agentforce y Data Cloud (ARR), el debate de si los agentes de IA desplazan el cobro por usuario (asientos) hacia cobro por consumo o por resultado; remuneración en acciones muy alta (≈ 3.000 M/año: el margen no-GAAP la excluye); comisiones activadas («costs capitalized to obtain revenue contracts», se amortizan en marketing y ventas); pasivos de contrato (unearned revenue) muy estacionales (facturación anual concentrada en el 4T, cierre en enero); recompras y dividendo (desde 2024); activismo de 2023 (Elliott, Starboard, ValueAct…); cRPO y RPO.
- Competidores/comparables: Microsoft (Dynamics), SAP, Oracle, ServiceNow, Adobe, HubSpot, Workday (y Zoho/Pipedrive, no cotizan).
- **Fecha de corte: 2026-10-12 (lunes).** La sesión de NYSE no ha cerrado a la hora de trabajo: precio de cierre del **viernes 9-oct-2026**. Nada publicado después del corte.
- Próximos resultados: 3T27 a principios de diciembre de 2026 (fecha por confirmar: búscala; el año pasado fue el 3-dic-2025).

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de USD**; BPA y DPA en USD; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto, no la portada de inversores.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** (con lo que tengas) y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 limpio sin BOM, escrito con la herramienta Write** (nada de heredocs en Bash ni `node -e` con textos largos). Antes de terminar, comprueba que no hay «Ã» ni «Â» en tu nota. Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre los subagentes de tres análisis y se agota pronto.** Primero documentos oficiales (EDGAR, web de inversores de Salesforce); búsquedas solo para lo que no tenga otra vía. Scripts propios con Write, en `.mjs`, guardados en %TEMP% (no en el repo).
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas (E: 10 minutos y 40 llamadas). Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
