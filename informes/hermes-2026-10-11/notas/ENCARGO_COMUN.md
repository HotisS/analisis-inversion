# Encargo común a los subagentes A-E (Hermès, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Carpeta de trabajo: informes/hermes-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\herm<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/hermes-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/, informes/lvmh-2026-10-08/ como referencia sectorial), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar: es un OneDrive). No toques otros informes, ni el código del repo, ni `seguimiento.xlsx`, `cola.md`, `MEMORIA.md`, `lecciones.md`. Sin git add/commit/push. Hay otros análisis corriendo a la vez (Puig, SAP, Grifols, Netflix): no los toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera** (ni en User-Agent).
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado para WebFetch: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/hermes-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas de estados financieros, mira primero el `.tabla.txt`).

## Empresa
- **Hermès International** (SCA, société en commandite par actions). Euronext París: **RMS** (Yahoo `RMS.PA`). ISIN **FR0000052292**. Sede: 24 rue du Faubourg Saint-Honoré, París. Índices: CAC 40 / Euro Stoxx 50.
- **Cuentas en EUR** (millones), NIIF-UE, cuenta por función; `tipo_cambio` 1. Ejercicio = año natural (cierre 31-dic).
- Documento base: **Documento de Registro Universal 2025 (URD, inglés)**: https://assets-finance.hermes.com/s3fs-public/node/pdf_file/2026-04/1777391712/260320_hermes_urd2025_en.pdf?VersionId=jE9NgndClrtsqa.kJW0uyG8NRg4SFCVU (A lo descarga primero como `A_urd2025`; los demás pueden leer el .txt de A cuando exista, o descargarlo con su prefijo si lo necesitan antes). Web de inversores: https://finance.hermes.com/en/ (la lista de PDF no sale con `--lista`; usa WebFetch sobre las páginas para ver los enlaces y baja los PDF con descargar.mjs).
- Último informe antes del corte: **resultados del primer semestre de 2026** (finales de julio de 2026; ingresos 1S26 8.163 M EUR, caja neta reexpresada 12.926 M EUR, 27.107 empleados). Próximo: **ingresos del 3T26 el 22-oct-2026** (antes de la apertura; conferencia a las 9:00). Resultados anuales 2026: 11-feb-2027.
- Puntos clave: control familiar (familia Hermès vía H51 y otros, ~2/3 del capital; Émile Hermès SAS socio colectivo; derechos de voto dobles), gerencia (Axel Dumas y Émile Hermès SAS), Consejo de Vigilancia; segmentos geográficos (la empresa reporta por zonas) y por oficios (Marroquinería-Guarnicionería, Prêt-à-porter y Accesorios, Seda y Textiles, Otros oficios, Perfumes y Belleza, Relojes, Otros productos); margen operativo ~40 %; caja neta ~13.000 M EUR; aranceles de EE. UU., China y el frenazo del lujo; subidas de precio; capacidad de producción (nuevos talleres de marroquinería).
- Competidores y comparables (B y D): LVMH, Kering, Richemont, Prada, Moncler, Brunello Cucinelli, Burberry, Chanel (no cotiza; cuentas publicadas), Ferrari (comparable de lujo de escasez), L'Oréal, EssilorLuxottica… Referencia sectorial (no copiar cifras sin comprobar): `informes/lvmh-2026-10-08/datos.json`.
- Fecha de corte: **2026-10-11 (domingo)**: precio de cierre del **viernes 9-oct-2026**. Nada publicado después.
- Francia: participaciones significativas y operaciones de directivos en la AMF (BDIF: https://bdif.amf-france.org ; declaraciones de dirigentes); posiciones cortas en la AMF (por encima del 0,5 %). Tasa libre en EUR = Bund alemán (Bundesbank).

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de EUR**; BPA y DPA en EUR; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre muchos subagentes de cinco análisis y se agota pronto.** Primero documentos oficiales (web de la empresa, AMF, URD); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas (E: 10 minutos y 40 llamadas). Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
