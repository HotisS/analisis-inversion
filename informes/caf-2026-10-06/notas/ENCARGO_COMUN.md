# Encargo común a los subagentes A-D (CAF, corte 2026-10-06)

Repo: C:\Users\HugoSol\OneDrive - SUMA CAPITAL SGEIC SA\Escritorio\Vela\analisis-inversion
Carpeta de trabajo: informes/caf-2026-10-06/notas/  (documentos en notas/docs/, con prefijo de tu letra: A_cuentas2023, B_alstom_ar, C_iagc...)

Antes de nada: `node herramientas/prompt-de.mjs <tu letra>` (tu parte del prompt, con las claves JSON exactas) y `verticales/empresa/lecciones.md`. Descarga con:
`node herramientas/descargar.mjs --dir informes/caf-2026-10-06/notas/docs nombre url [nombre url ...]`
**y justo después** `node informes/caf-2026-10-06/notas/retxt.mjs`: `descargar.mjs` extrae los PDF sin `-enc UTF-8` y el pdftotext de esta máquina (xpdf 4.06) escribe Latin1, así que en español se pierden TODAS las tildes y eñes (sale «�» y los grep con «ó», «ñ» fallan). `retxt.mjs` re-extrae en UTF-8 los .txt dañados. Busca con grep -n y lee solo lo necesario.

Ya descargados (úsalos):
- `A_cuentas2025` (590 págs.): Informe de gestión consolidado 2025 (págs. del PDF ≈ 12-60: modelo de negocio, segmento Ferroviario, segmento Autobuses-Solaris, riesgos, información bursátil, medidas alternativas de rendimiento), EINF (≈ 59-405), **IAGC 2025 (desde la pág. ≈ 406)**, **IARC 2025 (desde ≈ 488)** y **cuentas anuales consolidadas 2025 con notas (desde ≈ 522)**. La paginación interna del documento va ≈ 18 páginas por detrás de la del PDF.
- `P_pres_1S26` (32 págs.): presentación de resultados del 1S26 (30-jul-2026).

## Empresa
- Construcciones y Auxiliar de Ferrocarriles, S.A. (marca «CAF»). Ticker **CAF** (Bolsas de Madrid y Bilbao, mercado continuo; Yahoo `CAF.MC`). ISIN **ES0121975009**. Sede: Beasain (Gipuzkoa). Índice: no está en el IBEX 35 (IBEX Medium Cap / mercado continuo; compruébalo).
- Cuentas en **EUR**, **NIIF-UE**, ejercicio **natural**; cotiza en EUR (tipo de cambio 1). Capital: **34.280.750 acciones** de 0,301 EUR; resta la autocartera si la hay.
- Información periódica: anual y semestral completas; 1T y 9M con presentación y nota. Último publicado antes del corte: **1S26 (30-jul-2026)**. Próximo: **resultados 9M26 el 12-nov-2026** (agenda de la presentación del 1S26). **Nuevo Plan Estratégico** se presentará en el 4T26 (el anterior, «Plan Estratégico 2026», es de dic-2022: sus objetivos se comparan con lo logrado).
- Periodos: ejercicios "2016" … "2025"; estimaciones "2026e" … "2028e"; trimestres "1T25" …; si solo hay semestres con margen, "1S24", "2S24", "1S25", "2S25", "1S26".
- Fecha de corte: 2026-10-06. No uses nada publicado después.
- Negocio: dos segmentos NIIF 8: **Ferroviario** (material rodante —trenes, metros, tranvías, cercanías, alta velocidad—, **servicios y mantenimiento**, señalización, componentes, proyectos llave en mano) y **Autobuses (Solaris**, comprada en 2018; peso creciente del autobús eléctrico de batería y de hidrógeno). Contratos plurianuales: ingresos por grado de avance; **cartera de pedidos** ≈ 17.700 M EUR y *book-to-bill*; márgenes de material rodante estrechos.
- Particularidades contables a buscar: activos y pasivos por contrato (obra ejecutada pendiente de facturar frente a **anticipos de clientes**), provisiones (contratos onerosos, garantías, penalizaciones), **avales y garantías** concedidos, *factoring* sin recurso y *confirming*, sobrecostes en proyectos (pérdidas reconocidas en contratos concretos: Reino Unido, Países Bajos, EE. UU., Brasil, México…), concentración de la cartera en grandes contratos, exposición por país, arrendamientos NIIF 16. **La cuenta de resultados va por naturaleza** (aprovisionamientos, personal…): `meta.formato_cuenta: "naturaleza"` (compruébalo).
- Accionistas de referencia (a verificar en el IAGC y la CNMV): Cartera Social (empleados), Kutxabank, Indumenta Pueri, herederos de Daniel Bravo Andreu, Norges Bank y otros.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Toda cifra se copia del documento original abierto y leído. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL o descarga con descargar.mjs (+ retxt.mjs) y usa grep.
1. Nunca inventes una cifra. Tras **tres intentos distintos** (1: fuente primaria directa; 2: otra vía/otro documento/otro término; 3: derivarlo o fuente secundaria fiable citada) sin éxito: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}.
2. Unidades: magnitudes en **millones de EUR** (CAF publica en miles: divide entre 1.000); precio, BPA, DPA en EUR; acciones en millones. Comparables extranjeros convertidos a EUR al tipo de la fecha de corte (BCE; dilo). Porcentajes en puntos (12,5 % → 12.5). Números como números. Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita con [n] (tus números locales). Una entrada por documento realmente leído y usado; cita el documento concreto.
4. **Guardar por partes**: reescribe tu `notas/<letra>.json` (JSON válido, claves de primer nivel del prompt + `fuentes` + `huecos`) DESPUÉS DE CADA CAMPO que termines (como mucho cada 10 minutos).
5. Escribe **solo hechos** con su fuente. Los textos de juicio (comentario, lectura…) los redacta el analista principal: déjalos sin escribir, pero vuelca los hechos útiles en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]).
6. No modifiques NADA fuera de informes/caf-2026-10-06/. Solo fuentes gratuitas. No resuelvas captchas. **No abras, cierres ni mates Word (WINWORD)**. No hagas commits.
7. Respeta las claves exactas de tu parte del prompt.
8. **Presupuesto: unos 20 minutos y unas 80 llamadas a herramientas.** Prioriza por impacto en la decisión; al llegar al límite, cierra con lo que tengas y registra lo que falte como hueco.

## Fuentes que suelen funcionar
- Web de inversores: https://www.cafmobility.com/accionistas-inversores/ (subpáginas `informacion-economico-financiera/informe-auditoria-cuentas-anuales-auditadas-informe-gestion-memoria-anual/`, `.../presentaciones-inversores/`, `.../informacion-publica-periodica/`, `informacion-general/participaciones-significativas-autocartera/`, `.../cobertura-consenso-analistas/`, `.../rating/`, `gobierno-corporativo/junta-general-accionistas/`). Los PDF cuelgan de `https://admin.cafmobility.com/uploads/...`: presentaciones 1T26 `Presentacion_de_Resultados_1_T_2026_9993fe0b2d.pdf`, FY25 `Presentacion_de_Resultados_FY_2025_e0bccdc8b6.pdf`, 9M25 `Presentacion_de_Resultados_9_M_2025_1_c0eaf8abad.pdf`, 1S25 `Presentacion_de_Resultados_1_S_2025_9419686bc9.pdf`, 1T25 `Presentacion_de_Resultados_1_T2025_af52fdd9d6.pdf`, FY24 `Resultados_2024_e57f02c4b1.pdf`; Plan Estratégico 2026 `Plan_Estrategico_2026_c13c54f857.pdf`; cuentas 2024 `CCAA_Consolidadas_2024_6e4e69fc31.pdf`; semestral 2024 `Informe_de_Gestion_y_Estados_Financieros_semestral_2024_ES_921348d62b.pdf`. Las de años anteriores, en la web antigua www.caf.net/upload/accionista/...
- CNMV: otra información relevante, participaciones significativas, operaciones de directivos (da 403 sin navegador: hueco), posiciones cortas.
- Consenso: MarketScreener (estimaciones a 3 años, mismo proveedor para comparables); Investing / Stock Analysis / Yahoo para contraste.
- Bono español a 10 años: Trading Economics / Investing (texto literal). Tipos de cambio: BCE.

## Al terminar
Devuelve en tu respuesta un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro. Y, aparte, 3-5 líneas sobre **fallos o fricciones de las herramientas del repo** (herramientas/*.mjs, lecciones.md, prompt) que hayas encontrado, con el arreglo concreto que propondrías.
