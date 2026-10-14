# Diario · Nvidia (NVDA) · 14-oct-2026 (análisis value)

- Commit de partida: c581770 (Straumann, 14-oct). Prompt y método v2 con regla de múltiplos común.
- En paralelo, otra sesión hace el «análisis growth» de Nvidia con archivos propios; este es el análisis value habitual y no toca nada fuera de esta carpeta.
- Entorno: nube de Claude Code. Solo funciona WebSearch; no se probaron WebFetch, curl, `descargar.mjs`, `bolsa.mjs` ni `form4.mjs` (no funcionan aquí, según el encargo). Las cifras salen de extractos de búsqueda de los documentos de la SEC (10-K FY2026, 10-Q 1T y 2T FY27, 8-K de resultados, DEF 14A, 8-K de la junta) y de prensa financiera y agregadores citados con su URL. Las cuentas FY2022-FY2025 son las publicadas en los 10-K, sin documento descargado. **Confianza: media en cuentas y trimestres; baja en bolsa, comparables (varios PER de fuentes débiles o de otros análisis del repo) y beta (estimación propia).**
- Fecha de corte 2026-10-14; precio 228,52 USD, cierre del 13-oct (sesión del 14 sin cerrar). Divisa USD. Ejercicio cerrado a finales de enero, etiqueta «fin» (FY2026 = feb-25 a ene-26). Ejercicio objetivo a 12 m: FY2029e.
- 14:00-14:20: búsquedas (16): resultados 2T y 1T FY27, FY2026, balance y flujos FY2026, emisión de bonos de junio, precio, consenso, comparables, sentimiento, gobierno, sector.
- 14:20-14:40: notas A-E, supuestos, primer cálculo (DCF 116,97 con FY2030e −5 %); revisión del base: FY2028e +55 % (consenso +69 %), FY2029e +15 %, FY2030e −3 %, circulante del 26 % al 22 %. DCF 136,91.
- 14:40-14:45: textos, resumen, Word y PDF (soffice, 40 páginas). 17 de 19 controles correctos y 2 explicados.

## Decisiones

- BPA en base GAAP sin ganancias de participaciones (las de 7.800 M del 2T FY27 inflan el GAAP). FY2026 = 4,47 USD con la fórmula del método (EBIT × 0,84 ÷ acciones), en la misma base que los escenarios.
- Puente a 26-jul-26: caja y valores de deuda 56.600 M; deuda estimada 33.468 M (8.468 M + 25.000 M de junio); participaciones cotizadas de 42.800 M como «asociadas» a valor de mercado; las no cotizadas, fuera por falta de cifra.
- Beta 1,40 (estimación propia; no hay herramienta de bolsa). WACC 12,87 %; con la prima del mercado, 11,06 %.
- Sostenibilidad: reinversión del 6 % del NOPAT, el motor no hace la prueba; hecha a mano con guía, compromisos de compra y capex de los clientes. Veredicto «En parte»; el base ya está 14-16 puntos por debajo del consenso en FY2028-29e e incluye una pausa en FY2030e (no hace falta rebaja adicional).
- Sin transacciones (nadie puede comprar Nvidia; múltiplos no verificables). Pesos: DCF 40, comparables 30, escenarios 30.
- Convicción Baja (la sugerida: reglas absoluta y relativa discrepan, y la ponderada está a 0,7 puntos del umbral).

## Revisión a 12 meses (v2)

Nvidia · 14-oct-26 · 228,52 USD · objetivo ponderado 260,89 USD (+14,3 % con dividendo) · base 250,90 (+9,9 %) · VI 224,02 (−2,0 %) · consenso 321,3 · **Mantener**, convicción baja · compra < 224,02 USD, venta > 290,18 USD. Detalle en `revision-12m-2026-10-14.md`. No se ejecutó `apuntar-12m.mjs` ni `seguimiento.mjs` (lo integra el orquestador).

## Lecciones

- Empresas con ejercicio cerrado en enero (Nvidia): el ejercicio objetivo a 12 meses con corte en octubre es FY2029 (cierra en enero de 2029), no FY2028; y el BPA GAAP reciente incluye grandes ganancias de participaciones en cartera que hay que quitar de la historia del PER y del BPA propio.
- 2026-10-14: datos-v2.json y «Nvidia - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v2 Mantener 14,3 % (antes v2 Mantener 14,3 %).
