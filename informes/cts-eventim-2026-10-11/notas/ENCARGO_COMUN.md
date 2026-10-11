# Encargo común a los subagentes A-D (CTS Eventim, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion (en Bash: cd "/c/Users/husoe/OneDrive/Escritorio/IUSPI/Proyecto INV/analisis-inversion")
Carpeta de trabajo: informes/cts-eventim-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\eventim<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/cts-eventim-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar: es un OneDrive). No toques otros informes, ni el código del repo, ni `cola.md`, `MEMORIA.md`, `lecciones.md`, `seguimiento.xlsx`, ni ejecutes `herramientas/seguimiento.mjs`. Sin git (ni add, ni commit, ni push). Hay otro análisis corriendo a la vez en el repo: no toques su carpeta.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera / User-Agent.** No uses `curl` a mano con cabeceras propias.
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto; mira sobre todo las últimas líneas).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/cts-eventim-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas, mira primero el `.tabla.txt` o `pdftotext -table -f N -l N`).

## Empresa
- **CTS Eventim AG & Co. KGaA** (sede en Bremen; *Kommanditgesellschaft auf Aktien*). Socio colectivo (persönlich haftende Gesellschafterin): **EVENTIM Management AG**, cuyo consejo de dirección preside **Klaus-Peter Schulenberg** (CEO). Consejo de vigilancia (Aufsichtsrat) de la KGaA. Accionista de control: **Schulenberg a través de la KPS Stiftung** (≈ 39 %: comprobar % exacto en el informe anual y en las notificaciones de derechos de voto). Schulenberg compró acciones el 27-mar, 7-abr y 11-jun-2026 (informe semestral).
- Xetra, ticker **EVD** (Yahoo `EVD.DE`), ISIN **DE0005470306**, WKN 547030. **Índice: MDAX** (no está en el DAX). Sector: venta de entradas (Ticketing: eventim, TicketOne, See Tickets, France Billet, Total Ticketing Group comprado en 2026…) y promoción de conciertos y festivales (Live Entertainment: EVENTIM LIVE, Vivo Concerti, festivales como Rock am Ring…), más recintos (LANXESS arena, Waldbühne, **ARENA MILANO / Unipol Dome** abierta en 2026 para los JJ. OO. de invierno).
- **Cuentas en EUR (millones), NIIF-UE, ejercicio natural (cierre 31-dic), etiqueta "2025".** Formato de la cuenta: por función (coste de ventas, gastos de distribución, administración). La empresa publica además un **EBITDA «normalizado»** (sin no recurrentes) y un EBIT normalizado (sin amortización de la asignación del precio de compra, PPA). Da siempre las cifras **reportadas** y, aparte, las normalizadas con su conciliación.
- Último auditado: **Informe anual 2025** (ya descargado: `notas/docs/P_ja2025.txt`, 339 páginas). Último informe: **semestral 1S26** (20-ago-2026; ya descargado: `notas/docs/P_h1_2026.txt`). La guía 2026 del informe anual (ventas y EBITDA normalizado «ligeramente por encima» de 2025) se mantiene en el semestral. **Próximos resultados: 12-nov-2026 (3T26)** según el calendario financiero de la empresa.
- Informes de la empresa (lista completa en https://corporate.eventim.de/en/investor-relations/financial-reports):
  - Anual 2024: https://corporate.eventim.de/media/document/d5cecf8e-8cf1-4517-a76e-c500c27c6b2a/assets/DE0005470306-JA-2024-PN-EQ-E-00.pdf?disposition=inline
  - Anual 2023: https://corporate.eventim.de/media/document/260251cd-d330-47ea-8085-55b16ec93d1f/assets/DE0005470306-JA-2023-EQ-E-00.pdf?disposition=inline
  - Anual 2022: https://corporate.eventim.de/media/document/5966d480-65d0-48a9-89a0-4341664cf715/assets/DE0005470306-JA-2022-EQ-E-00.pdf?disposition=inline
  - Anual 2021: https://corporate.eventim.de/media/document/4e34189a-abaa-4891-af05-446f1deb39c3/assets/DE0005470306-JA-2021-EQ-E-00.pdf?disposition=inline
  - Anual 2020: https://corporate.eventim.de/media/document/15301e88-074f-4608-8746-b72b0aa29fac/assets/DE0005470306-JA-2020-EQ-E-00.pdf?disposition=inline
  - Anual 2019: https://corporate.eventim.de/media/document/013c1f10-344d-4c22-83e7-b7845a03ce23/assets/DE0005470306-JA-2019-EQ-E-00.pdf?disposition=inline
  - Anual 2018: https://corporate.eventim.de/media/document/bf10dec3-be90-4c37-8444-afccb520107e/assets/DE0005470306-JA-2018-EQ-E-00.pdf?disposition=inline
  - Anual 2017: https://corporate.eventim.de/media/document/b0387b41-d4a2-4022-862b-244a12c85bbc/assets/DE0005470306-JA-2017-EQ-E-00.pdf?disposition=inline
  - 1T26: https://corporate.eventim.de/media/document/cdbd1003-7ebe-47de-a860-ed1fa6d1b45a/assets/DE0005470306-Q1-2026-EQ-E-00.pdf?disposition=inline
  - 3T25: https://corporate.eventim.de/media/document/db668015-6f19-427f-84bb-ab3ed285f955/assets/DE0005470306-Q3-2025-EQ-E-00.pdf?disposition=inline
  - 1T25: https://corporate.eventim.de/media/document/5e52b83e-9878-42e2-8ebd-8df0ccdbf97c/assets/DE0005470306-Q1-2025-EQ-E-00.pdf?disposition=inline
  - Otras páginas: /en/investor-relations/financial-calendar, /webcasts-presentations, /general-meeting (resultados de las votaciones de la junta del 27-may-2026), /press-releases (y directors' dealings / voting rights notifications).
- Fecha de corte: **2026-10-11 (domingo)**: cierre del **viernes 9-oct-2026, 58,75 EUR** (ya en `notas/bolsa.json`, de `herramientas/bolsa.mjs` frente a EXS3.DE = MDAX y EXV9.DE = STOXX Europe 600 Travel & Leisure; rango 52s 48,26 (30-sep-2026) – 86,35 (24-nov-2025); caída del −23,2 % el 27-mar-2026 con la guía de 2026). Nada publicado después del corte.
- Acciones: 96,0 M emitidas; restar la autocartera (comprobar número exacto).

## OJO: la caja de clientes (dinero de entradas)
La caja del balance (1.164 M a 30-jun-2026; 1.356 M a 31-dic-2025) incluye **dinero de entradas cobrado por adelantado que se debe a los promotores** («ticket money liabilities not yet settled with promoters», en otros pasivos financieros: 856,6 M a jun-26 y 1.089,3 M a dic-25) y hay «ticket money receivables» (26,9 M y 40,2 M). En Live Entertainment, además, hay **anticipos recibidos** de preventa de eventos propios (advance payments received / contract liabilities) y **anticipos pagados** a artistas (advances paid / prepayments). Esto es clave para el puente y para el circulante: da siempre estas partidas por separado, año a año, con su fuente. La caja propia no es la caja del balance.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de EUR** (la empresa publica en miles: divide entre 1.000); BPA y DPA en EUR; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto (el PDF), no la página de inversores. **Toda fuente que cites debe estar en tu lista `fuentes`** (compruébalo antes de terminar).
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre los subagentes de dos análisis y se agota pronto.** Primero documentos oficiales (corporate.eventim.de, Bundesanzeiger, BaFin, EQS); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas. Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
