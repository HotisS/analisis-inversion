# Encargo común a los subagentes A-E (Grifols, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
(en Bash: `cd "/c/Users/husoe/OneDrive/Escritorio/IUSPI/Proyecto INV/analisis-inversion"`; rutas absolutas siempre)
Carpeta de trabajo: informes/grifols-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\grf<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
El repo vive dentro de un OneDrive. Trabaja SOLO dentro de `informes/grifols-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar, ni Glob/Grep). No toques otros informes, ni el código del repo, ni `seguimiento.xlsx`, `cola.md`, `MEMORIA.md`, `lecciones.md`. **Sin git (ni add, ni commit, ni push).** Hay otros análisis corriendo a la vez en el mismo repo (Puig, SAP, Netflix, Hermès): no los toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera** (para EDGAR, `descargar.mjs` ya lleva un User-Agent de aplicación; no uses `curl` a mano contra sec.gov).
No llames a ninguna herramienta `mcp__hearthbot__*` ni publiques nada. Reddit está bloqueado: no lo intentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/grifols-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas de estados financieros, mira primero el `.tabla.txt`; `--lista URL` lista los PDF de una página).

## Empresa
- **Grifols, S.A.** (Sant Cugat del Vallès, Barcelona). Bolsa española (Mercado Continuo, IBEX 35). Dos clases:
  - **Clase A** (con voto): ticker GRF / Yahoo `GRF.MC`, ISIN **ES0171996087**. Es la línea que se valora.
  - **Clase B** (sin voto, con dividendo preferente): ticker GRF.P / Yahoo `GRF-P.MC`, ISIN **ES0171996095**.
  - **ADR** en NASDAQ: **GRFS** (cada ADR = 1 acción B; compruébalo). Grifols presenta **20-F y 6-K** en la SEC (emisor extranjero): EDGAR es una vía buena para el informe anual en inglés con notas.
- **Cuentas en EUR** (millones), **NIIF-UE**, ejercicio natural a 31 de diciembre (`"2016"` … `"2025"`). Trimestres `"2T26"` (abr-jun 2026). Cuenta de resultados por función.
- Último informe antes del corte: **resultados del 1S/2T 2026** (finales de julio de 2026). Próximos: 3T26 (D confirma la fecha en el calendario financiero de Grifols). Nada publicado después del 9-oct-2026.
- Web de inversores: https://www.grifols.com/en/investors (informes anuales, presentaciones trimestrales, calendario). CNMV: https://www.cnmv.es (hechos relevantes / otra información relevante, participaciones significativas, IAGC e IARC).
- Precio y datos de bolsa ya calculados en `notas/bolsa.json` (A: 9,88 EUR; B: 6,74 EUR; ADR 7,46 USD; cierres del viernes 9-oct-2026). No los toques.
- **Acciones**: cuenta A y B por separado, sin autocartera, a la fecha más reciente publicada (D). Se usarán acciones A-equivalentes (B convertidas a su precio relativo) para que precio × acciones = capitalización real de las dos clases; D da los datos, el analista hace la cuenta.
- Puntos clave del caso: deuda alta (bonos, préstamo TLB, apalancamiento de ~4-5x; rating de Moody's, S&P y Fitch; refinanciación y vencimientos 2027-2028), el informe de Gotham City (ene-2024) y la investigación de la CNMV (reexpresión/reclasificación de Scranton y SRAAS), la OPA frustrada de Brookfield con la familia (2024-2025), la venta del 20 % de Shanghai RAAS a Haier (2025), Biotest (compra 2022, fibrinógeno, Yimmugo), **minoritarios grandes** (Biotest, la participación preferente de GIC en BPC Plasma/Haema, otros): van al puente a valor de mercado o contable, dilo; plasma: coste por litro, centros de donación, rendimiento por litro (inmunoglobulinas y albúmina), plan de eficiencias, guía de 2026 (ingresos, EBITDA ajustado, flujo libre antes de M&A), dividendo reanudado.
- Familia Grifols y vinculadas (Scranton Enterprises, arrendamientos de centros, etc.): gobierno (C).
- Competidores (B y D): CSL (Behring), Takeda (Plasma-Derived Therapies), Octapharma (no cotiza), Kedrion (no cotiza), LFB, Biotest (filial), ADMA Biologics, Bio Products Laboratory, Shanghai RAAS, Hualan Bio, China Biologic/Tiantan. Comparables cotizados para D: CSL, Takeda, ADMA, Shanghai RAAS, Hualan, Tiantan, Biotest (si cotiza aún), Kamada, y quizá diagnósticos/hospital (Werfen no cotiza).
- Fecha de corte: **2026-10-11 (domingo)**: precio de cierre del **viernes 9-oct-2026**.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de EUR**; BPA y DPA en EUR; acciones en millones. Porcentajes en puntos (12,5 % = 12.5). Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto, no la portada de inversores.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre muchos subagentes de cinco análisis y se agota pronto.** Primero documentos oficiales (web de Grifols, EDGAR 20-F/6-K, CNMV); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas (E: 10 minutos y 40 llamadas). Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
