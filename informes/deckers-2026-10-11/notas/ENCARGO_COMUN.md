# Encargo común a los subagentes A-D (Deckers, corte 2026-10-11)

Repo: C:\Users\husoe\OneDrive\Escritorio\IUSPI\Proyecto INV\analisis-inversion (en Bash: cd "/c/Users/husoe/OneDrive/Escritorio/IUSPI/Proyecto INV/analisis-inversion")
Carpeta de trabajo: informes/deckers-2026-10-11/notas/ (documentos en notas/docs/, con prefijo de tu letra: A_..., B_..., ...)
Temporales: %TEMP%\analisis-inversion\deck<letra>. Nada de usar y tirar dentro del repo.

## REGLA ESTRICTA DE CARPETAS (no se negocia)
Trabaja SOLO dentro de `informes/deckers-2026-10-11/` (escritura) y del resto del repo (solo lectura: herramientas/, verticales/), y en %TEMP%. Prohibido entrar en carpetas por encima de `analisis-inversion` (ni buscar, ni leer, ni listar: es un OneDrive). No toques otros informes, ni el código del repo, ni `cola.md`, `MEMORIA.md`, `lecciones.md`, plantillas, motor, `seguimiento.xlsx`. Sin git (ni add, ni commit, ni push). No ejecutes `herramientas/seguimiento.mjs`. Hay otros análisis corriendo a la vez en el mismo repo: no toques sus carpetas.
No abras ni cierres procesos de Word. NUNCA descargues con el navegador integrado: todo documento se baja con `node herramientas/descargar.mjs` (con `TIEMPO_DESCARGA=180` si un PDF grande se agota).
**Nunca pongas datos personales (correo, nombre del usuario) en ninguna consulta externa, URL ni cabecera / User-Agent.** No uses `curl` a mano con cabeceras propias (EDGAR: `descargar.mjs` ya lleva un User-Agent válido).
No llames a ninguna herramienta `mcp__hearthbot__*`. Reddit está bloqueado: no lo intentes. No lances subagentes.

## Antes de nada
1. `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas). NO leas el prompt entero.
2. Lee `verticales/empresa/lecciones.md` (corto; mira las lecciones del final).
3. Descarga con: `node herramientas/descargar.mjs --dir informes/deckers-2026-10-11/notas/docs nombre url [nombre url ...]` (deja .txt y .tabla.txt al lado; busca con `grep -n`; en tablas, mira primero el `.tabla.txt` o `pdftotext -table -f N -l N`).

## Empresa
- **Deckers Outdoor Corporation** (Goleta, California; Delaware). NYSE: **DECK** (Yahoo `DECK`). CIK **0000910521**. ISIN US2435371073 (comprobar). Índice: S&P 500. Marcas: **HOKA** (running y calzado deportivo), **UGG** (calzado y moda) y «Other» (Teva; Sanuk y Koolaburra vendidas/cerradas: comprobar; AHNU).
- **Cuentas en USD** (millones), **US GAAP**. Arrendamientos operativos: el gasto ya está en el EBITDA; sus pasivos NO van a la deuda ni al puente (US GAAP). `tipo_cambio` 1.
- **ETIQUETA DEL EJERCICIO (fija para todos): el ejercicio cierra el 31 de marzo y se nombra por el año en que TERMINA** (`etiqueta_ejercicio: "fin"`, `cierre_ejercicio_mes: 3`). **"FY2026" = 1-abr-2025 a 31-mar-2026** (10-K presentado el 22-may-2026). FY2027 = abr-2026 a mar-2027 (en curso). Periodos de la cuenta: "FY2017"… "FY2026". Estimaciones: "FY2027e", "FY2028e", "FY2029e".
- **Trimestres** con la etiqueta fiscal: "1T27" = trimestre abr-jun 2026 (10-Q del 30-jul-2026, resultados 8-K del 23-jul-2026); "4T26" = ene-mar 2026; "3T26" = oct-dic 2025 (el de Navidad, el mayor); "2T26" = jul-sep 2025.
- **LTM**: "LTM jun-26", `fecha_fin` 2026-06-30 (jul-2025 a jun-2026). Último balance publicado: 30-jun-2026 (10-Q). Ojo: el balance de junio es estacional (inventario alto antes de la campaña de UGG).
- Presentaciones clave en EDGAR: 10-K FY2026 `deck-20260331.htm` (2026-05-22); 10-Q 1T27 `deck-20260630.htm` (2026-07-30); 8-K resultados 2026-05-21, 2026-07-23, 2026-01-29, 2025-10-23; DEF 14A `deck-20260724.htm` (2026-07-24); 8-K 2026-08-27 (items 1.01 y 2.03: nuevo acuerdo de crédito/deuda: comprobar); 8-K 2026-09-14 (5.07, votos de la junta). URL: `https://www.sec.gov/Archives/edgar/data/910521/<accesión sin guiones>/<documento>`; índice de presentaciones en `https://data.sec.gov/submissions/CIK0000910521.json`; series XBRL en `https://data.sec.gov/api/xbrl/companyfacts/CIK0000910521.json`.
- Próximos resultados: 2T27 (jul-sep 2026), previsiblemente a finales de octubre de 2026 (D: confirmar fecha).
- Fecha de corte: **2026-10-11 (domingo)**: precio de cierre del **viernes 9-oct-2026, 82,89 USD** (ya en `notas/bolsa.json`, de `herramientas/bolsa.mjs`, con rentabilidades, beta, volatilidad y cierres de ejercicio a 31 de marzo). Rango 52 semanas 77,20-122,29. Nada publicado después del corte.
- Contexto conocido (comprobar todo): caída de la acción en 2025 por la desaceleración de HOKA en EE. UU. y los aranceles; la empresa dejó de dar guía anual en mayo de 2025 por los aranceles y la retomó en julio de 2025 (comprobar qué guía hay para FY2027); recompras grandes; sin deuda financiera hasta ahora; CEO Stefano Caroti desde ago-2024 (sucedió a Dave Powers).
- Competidores (B y D): On Holding, Nike, adidas, Skechers (no cotiza desde la compra de 3G Capital en 2025), Birkenstock, Crocs, Asics, Puma, Wolverine, Brooks (Berkshire, no cotiza), New Balance (privada), Lululemon, VF Corp. Transacciones: 3G Capital → Skechers (2025), Authentic Brands → Reebok (2022), VF → Supreme (2020) y venta de Supreme a EssilorLuxottica (2024), Berkshire/Brooks, Crocs → HEYDUDE (2022), Deckers → HOKA (2013), Wolverine → Sweaty Betty (2021), Caleres/Stuart Weitzman (2025), Dick's → Foot Locker (2025).

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL, o descarga con descargar.mjs y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}. En `huecos` solo datos que faltan tras tres intentos, nunca notas de trabajo.
2. Unidades: magnitudes en **millones de USD**; BPA y DPA en USD; acciones en millones. Porcentajes en puntos. Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas|Foros y redes","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (números locales). Cita el documento concreto, no la página de inversores.
4. **Guardar por partes (CRÍTICO).** Escribe tu `notas/<letra>.json` en los **primeros 5 minutos** y reescríbelo **después de cada campo que termines, como mínimo cada 10 minutos**. JSON válido, **UTF-8 sin BOM** (herramienta Write o Node `fs.writeFileSync`). Claves de primer nivel del prompt + `fuentes` + `huecos`. Al terminar, añade `"_estado": {"terminado": "HH:MM", "resumen": "tus diez líneas"}`.
5. **Solo hechos** con su fuente. Los textos de juicio los redacta el analista principal: déjalos factuales y vuelca hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]). Nada de «subagente», comillas invertidas, «calc.» ni «BORRADOR» en los textos.
6. Solo fuentes gratuitas. No resuelvas captchas ni comprobaciones antibot.
7. **Búsquedas web: el límite es compartido entre muchos subagentes de cuatro análisis y se agota pronto.** Primero documentos oficiales (EDGAR); búsquedas solo para lo que no tenga otra vía. Scripts propios con Write, en `.mjs` (el repo es "type": "module"; con rutas de OneDrive usa fileURLToPath).
8. Presupuesto: unos 20-25 minutos y unas 80 llamadas. Prioriza por impacto; al límite, cierra con lo que tengas y registra huecos.

## Al terminar
Devuelve un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y aparte, 3 líneas sobre fallos o fricciones de las herramientas del repo.
