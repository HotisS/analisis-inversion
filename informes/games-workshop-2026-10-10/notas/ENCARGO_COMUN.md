# Encargo común a los subagentes A-D (Games Workshop, corte 2026-10-10)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Carpeta de trabajo: informes/games-workshop-2026-10-10/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_ar2026, B_hasbro_10k, ...)
Temporales: %TEMP%\analisis-inversion\gaw<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/games-workshop-2026-10-10/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar). No toques otros informes ni el código del repo ni `seguimiento.xlsx`. Sin commits. Hay otro análisis corriendo a la vez (Adobe, en `informes/adobe-2026-10-10/`): no lo toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera.**
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto; ojo a las del Reino Unido: RNS en Investegate, notas de prensa de resultados con cuentas completas, gilt del Banco de Inglaterra, cortos de la FCA).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/games-workshop-2026-10-10/notas/docs nombre url [nombre url ...]`. Web de inversores: https://investor.games-workshop.com/ (`--lista` no encuentra los PDF: busca los enlaces leyendo la página con WebFetch o el navegador integrado, sin descargar nada allí).

## Empresa
- **Games Workshop Group PLC** (Warhammer). LSE: **GAW** (Yahoo `GAW.L`, en peniques). ISIN **GB0003718474**. Sede: Nottingham. Índice: FTSE 100.
- **Cuentas en GBP** (millones), NIIF adoptadas en el Reino Unido. Precio en GBP (divide entre 100 el de Yahoo); `tipo_cambio` 1.
- El ejercicio cierra el domingo más cercano al 31 de mayo (52/53 semanas) y la empresa lo nombra por el año en que termina: FY2026 = junio 2025 - mayo 2026. Periodos `"FY2017"` … `"FY2026"`, `meta.cierre_ejercicio_mes` 5 y `meta.etiqueta_ejercicio` "fin"; publica **semestres** (`"1S26"` = jun-nov 2025, `"2S26"` = dic-25 a may-26). En `bolsa.mjs`: `--cierre-mes 5 --etiqueta fin`.
- Último informe antes del corte: **resultados e informe anual FY2026** (julio de 2026) y, si hay, la actualización de negocio o la junta de septiembre de 2026. Próximos: resultados del 1S27 en enero de 2027 (D confirma).
- Fecha de corte: **2026-10-10 (sábado)**: precio de cierre del **viernes 9-oct-2026**. Nada publicado después.
- Puntos clave: segmentos (Core: venta directa en tiendas propias, comercio y en línea; Licencias: royalties de videojuegos y del acuerdo con Amazon para cine y series de Warhammer 40.000), márgenes muy altos, dividendo de toda la caja sobrante, política de no deuda, cambio de CEO (Kevin Rountree → ?) y la dependencia de los ingresos de licencias (Space Marine 2).
- Competidores (B y D): Hasbro (Wizards of the Coast), Asmodee, Mattel, Spin Master, Embracer, Bandai Namco, Lego (privada), Takara Tomy.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}.
2. Unidades: magnitudes en **millones de GBP**; BPA y DPA en GBP (no peniques); acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre ocho subagentes de dos análisis.** Primero documentos oficiales (web de inversores, RNS en Investegate, Companies House); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas. Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
