# Encargo común a los subagentes A-D (Inditex, corte 2026-10-06)

Repo: C:\Users\HugoSol\OneDrive - SUMA CAPITAL SGEIC SA\Escritorio\Vela\analisis-inversion
Carpeta de trabajo: informes/inditex-2026-10-06/notas/  (documentos descargados en notas/docs/, con prefijo de tu letra: docs/A_*.pdf, docs/A_*.txt)

## Empresa
- Industria de Diseño Textil, S.A. (Inditex). Ticker ITX (Bolsa de Madrid, Mercado Continuo, IBEX 35). ISIN ES0148396007. Sede: Arteixo (A Coruña).
- Cuentas en EUR, NIIF-UE, formato por función (ventas, coste de la mercancía, margen bruto, gastos operativos, EBITDA...).
- **Ejercicio NO natural: cierra el 31 de enero.** «FY2025» = febrero 2025 a enero 2026 (Inditex lo llama «ejercicio 2025»). meta.cierre_ejercicio_mes = 1.
  Periodos: ejercicios "FY2016" ... "FY2025"; estimaciones "FY2026e", "FY2027e", "FY2028e". Trimestres: "1T26" = feb-abr 2026, "2T26" = may-jul 2026, "3T25" = ago-oct 2025, "4T25" = nov 2025-ene 2026. Último informe publicado antes del corte: primer semestre FY2026 (feb-jul 2026, publicado en septiembre de 2026). Próximo: 9M FY2026 (diciembre 2026).
- Fecha de corte: 2026-10-06. No uses nada publicado después.

## Reglas que no se negocian (prompt.md §4)
0. **Ninguna cifra sale del resumen de un buscador.** Los resúmenes de WebSearch inventan números con aplomo. Toda cifra se copia de la página o del documento original, abierto y leído. Mejor: descarga los PDF con curl (`curl -sL -A "Mozilla/5.0 ..." -o docs/X_nombre.pdf URL`) y extrae texto con `pdftotext -layout`. WebFetch también resume con un modelo: para cifras clave pídele el TEXTO LITERAL de la tabla.
1. Nunca inventes una cifra. Si tras **tres intentos distintos** (1: fuente primaria directa; 2: otra vía/otro documento/otro idioma; 3: derivarlo o fuente secundaria fiable citada) no aparece: `null` y una entrada en `huecos`: {"seccion","campo","tipo":"Núcleo|Complemento","intentos":"1) ...; 2) ...; 3) ...","decision":"Omitido|Calculado y marcado como estimación"}.
2. Unidades: magnitudes en **millones de EUR**; precio, BPA, DPA en EUR; acciones en millones. Porcentajes en puntos (12,5 % → 12.5). Números como números (punto decimal). Gastos e inversiones en positivo.
3. Fuentes: lista `fuentes` propia numerada desde 1: {"id","titulo","editor","tipo":"Primaria|Datos de mercado|Sectorial|Prensa|Analistas","fecha":"AAAA-MM-DD (o AAAA-MM)","url"}. Cita en los textos con [n] (tus números locales). Una entrada por documento realmente leído y usado.
4. **Guardar por partes**: reescribe tu `notas/<letra>.json` (JSON válido) DESPUÉS DE CADA CAMPO que termines, no solo al final. Un corte por límite de uso no debe perder lo investigado. Campo terminado = campo con sus fuentes.
5. Escribe **solo hechos** con su fuente. Los campos de texto de juicio (comentario, lectura...) los redacta el analista principal: déjalos sin escribir, pero vuelca los hechos útiles para redactarlos en un objeto `extra` dentro de cada sección (frases cortas con cifra y [n]).
6. No modifiques NADA fuera de informes/inditex-2026-10-06/. Sin servicios de pago ni APIs con coste. No resuelvas captchas.
7. Estructura de los campos: lee las secciones correspondientes de `verticales/empresa/prompt.md` (§6 Campos) y respeta las claves exactas.

## Trampas conocidas de vueltas anteriores (diarios de Viscofan, Indra y On)
- Los resúmenes de WebSearch dieron EBITDA semestrales falsos, bonos al 6 % y múltiplos «calculados» por el buscador. Verifica todo en el original.
- Algunas webs tienen antibot tras varias peticiones seguidas con curl: espacia peticiones; WebFetch a veces pasa donde curl no.
- El registro de la CNMV es un formulario dinámico (a veces 403). Prueba las URL directas de consultas por entidad (p. ej. https://www.cnmv.es/Portal/Consultas/EE/... con el NIF de Inditex A15075062) y si no, prensa.
- IAGC escaneado: si pdftotext devuelve basura, `powershell -File construccion/pdf-a-png.ps1 <pdf>` y lee las páginas como imágenes.
- pdftotext desordena tablas: usa -layout y comprueba que las sumas cuadran.
- Fechas de documentos sin fecha visible: AAAA-MM del periodo.
- Datos de mercado gratuitos útiles: MarketScreener (consenso, finanzas), Stock Analysis (estadísticas), Investing, Yahoo Finance (chart API JSON: https://query1.finance.yahoo.com/v8/finance/chart/ITX.MC?period1=...&period2=...&interval=1d&events=div), Trading Economics, BCE.

## Al terminar
Devuelve en tu respuesta un resumen de diez líneas: qué has encontrado, qué falta y qué te ha parecido raro.
