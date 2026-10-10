# Encargo común a los subagentes A-E (Constellation Software, corte 2026-10-10)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion
Carpeta de trabajo: informes/constellation-software-2026-10-10/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_ar2025, B_tyler_10k, ...)
Temporales: %TEMP%\analisis-inversion\csu<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/constellation-software-2026-10-10/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar). No toques otros informes ni el código del repo ni `seguimiento.xlsx`. Sin commits. Hay otro análisis corriendo a la vez (Auto Trader, en `informes/auto-trader-2026-10-10/`): no lo toques.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera** (tampoco en el User-Agent de la SEC: `descargar.mjs` ya lleva uno de aplicación; no uses `curl` a mano contra sec.gov).
No llames a ninguna herramienta `mcp__hearthbot__*`.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/constellation-software-2026-10-10/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n` y lee solo las páginas que hacen falta). Tablas desordenadas: `pdftotext -table -f N -l N archivo.pdf -`.

## Empresa
- **Constellation Software Inc.** TSX: **CSU** (Yahoo `CSU.TO`). ISIN **CA21037X1006**. Sede: Toronto (20 Adelaide Street East, Suite 1200). Índice: S&P/TSX 60.
- **Cuentas en USD** (millones de USD), NIIF (IFRS del IASB). **Cotiza en CAD**: `meta.divisa` = USD, `meta.divisa_cotizacion` = CAD y `meta.tipo_cambio` = USD por 1 CAD a la fecha de corte (D, citado: Banco de Canadá). Beta: con la acción convertida a USD frente a índices en USD (lección de CSL), o contrástala.
- Ejercicio natural (cierre 31-dic). Periodos `"2016"` … `"2025"`; estimaciones `"2026e"`…; trimestres `"3T24"` … `"2T26"`.
- Último informe antes del corte: **2T26 (MD&A y estados financieros del 11-ago-2026)**. Próximos resultados: 3T26, principios de noviembre de 2026 (D confirma la fecha).
- Fecha de corte: **2026-10-10 (sábado)**: precio de cierre del **viernes 9-oct-2026**. Nada publicado después.
- Ya descargados en `notas/docs/` (léelos, no los vuelvas a bajar): `comun_mda_q2_26` (MD&A 2T26), `comun_fs_q2_26` (estados financieros 2T26), `comun_mic_2026` (circular de la junta 2026: consejo, remuneración, accionistas). Web de inversores: https://www.csisoftware.com/investor-relations (informes anuales, cartas del presidente). Archivos de SEDAR+ (AIF, informes anuales) si la web no los tiene.
- **Estructura a tener en cuenta**: consolida **Topicus.com** (TSXV: TOI; CSU controla con acción de supervoto; minoritarios relevantes, más la participación de Joday en Topicus Coop vía IRGA, ~29,4 %) y **Lumine Group** (TSXV: LMN; CSU tiene el 61,4 %, minoritarios 38,6 %). Pasivos por el **IRGA / TSS membership liability** (opciones de venta y compra de minoritarios): son asimilables a deuda (puente, `otros_ajustes`) y su revaluación pasa por la cuenta. Seis grupos operativos (Volaris, Harris, Jonas, Vela, Perseus, Total Specific Solutions/Topicus) + Lumine; la empresa reporta un segmento con desgloses por tipo de ingreso (licencias, mantenimiento y recurrentes, servicios, hardware) y por geografía. Métrica de la casa: **FCFA2S** (flujo libre disponible para el accionista), crecimiento orgánico y capital desplegado en adquisiciones.
- **Minoritarios en el puente**: Topicus y Lumine cotizan: a valor de mercado (participación de terceros × capitalización), y dilo.
- 2T26 leído: ingresos 3.335 M USD (+17 %), primer semestre 6.516 M (+19 %).
- Contexto que debéis comprobar (no lo deis por bueno sin documento): cambios en la cúpula en 2025 (Mark Leonard dejó la presidencia ejecutiva por salud en sept-2025; Mark Miller, consejero delegado), y el debate de 2025-2026 sobre si la IA generativa amenaza al software vertical (fuerte caída de la acción desde máximos).

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de USD**; BPA y DPA en USD; acciones en millones (CSU tiene ~21,19 M acciones). Conversiones al tipo de cierre del ejercicio (contables) o de la fecha de corte (mercado), y dilo. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el PDF concreto, no la web de inversores.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`; nunca PowerShell Set-Content/Out-File). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre todos (diez subagentes de dos análisis) y se agota pronto.** Primero documentos oficiales (web de la empresa, SEDAR+, EDGAR para competidores de EE. UU.); búsquedas solo para gobierno, rating, prensa y lo que no tenga otra vía. Scripts propios con Write, en `.mjs`.
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas (E: 10 minutos y 40 llamadas). Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo, con el arreglo que propondrías.
