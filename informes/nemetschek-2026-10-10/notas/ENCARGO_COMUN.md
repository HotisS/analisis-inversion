# Encargo común a los subagentes A-D (Nemetschek, corte 2026-10-10)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Carpeta de trabajo: informes/nemetschek-2026-10-10/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\nem<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/nemetschek-2026-10-10/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar). No toques otros informes ni el código del repo ni `seguimiento.xlsx`. Sin commits. Hay otros análisis corriendo a la vez (Dunelm (informes/dunelm-2026-10-10/), Intuit (informes/intuit-2026-10-10/), Uber (informes/uber-2026-10-10/)): no los toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera** (para EDGAR, `descargar.mjs` ya lleva un User-Agent de aplicación; no uses `curl` a mano contra sec.gov).
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/nemetschek-2026-10-10/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas de estados financieros, mira primero el `.tabla.txt`).

## Empresa
- **Nemetschek SE**. XETRA: **NEM** (Yahoo `NEM.DE`). ISIN **DE0006452907**. Sede: Múnich. Índice: DAX.
- **Cuentas en EUR** (millones), NIIF-UE; `tipo_cambio` 1. Tasa libre en euros = **Bund** a 10 años (Bundesbank).
- Ejercicio natural; periodos `"2016"` … `"2025"`, estimaciones `"2026e"`; trimestres `"2T26"`. Publica trimestres.
- Último informe antes del corte: **informe semestral del 1S26 (julio de 2026)**; el 3T26 sale a finales de octubre (D confirma la fecha). Web de inversores: https://ir.nemetschek.com/ .
- Puntos clave: segmentos (Design, Build, Manage, Media —Maxon—), paso a suscripción y SaaS (ARR, recurrentes), compra de GoCanvas (2024) y deuda, **la familia Nemetschek (fundación) controla ~45 % del capital: marca `accionista_control` y calcula el voto libre si se puede**, márgenes EBITDA del ~30 %, el debate de la IA en el software de diseño (BIM).
- Competidores (B y D): Autodesk, Bentley Systems, Dassault Systèmes, Trimble, Hexagon, PTC, Procore, Topcon.
- Fecha de corte: **2026-10-10 (sábado)**: precio de cierre del **viernes 9-oct-2026**. Nada publicado después.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo («pendiente de revisar» no vale).
2. Unidades: magnitudes en **millones** de la divisa de las cuentas; BPA y DPA en unidades (no peniques ni céntimos); acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre doce subagentes de tres análisis y se agota pronto.** Primero documentos oficiales (web de la empresa, EDGAR, RNS en Investegate, registro del país); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas. Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
