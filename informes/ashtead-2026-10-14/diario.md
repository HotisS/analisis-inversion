# Diario · Sunbelt Rentals (antes Ashtead Group, SUNB) · 14-oct-2026

- Commit de partida: 5ef92b6 (Unilever; método v2 con regla de múltiplos común).
- Análisis value; la sesión growth trabaja en paralelo con sus propios archivos (no se tocan).
- Identificación: Ashtead Group plc ya no es la cotizada. Desde el 27-feb-2026 la dominante es Sunbelt Rentals Holdings, Inc. y desde el 2-mar-2026 la cotización principal está en la NYSE (SUNB, USD), con línea secundaria en Londres. Canje 1 por 1. Se usa la de Nueva York; carpeta con el nombre pedido (`ashtead-2026-10-14`). Ejercicio a 30 de abril (FY2026 = may-25 a abr-26); US GAAP desde el 3T26 (FY2022-FY2024 en NIIF).
- Entorno: nube de Claude Code; solo WebSearch (≈30 búsquedas). Sin WebFetch, curl, descargar.mjs ni bolsa.mjs. Todas las cifras salen de extractos de búsqueda (8-K de resultados, 10-K, RNS de Ashtead, proveedores). **Confianza baja**: balance y flujos solo de FY2026, deuda neta estimada con el apalancamiento publicado (1,8x × EBITDA LTM), precio del 9-oct (no se encontró el del 13-oct), comparables (3) con fechas de mayo-agosto, gobierno sin proxy.
- Notas A-E escritas por el analista principal, sin subagentes; propio en `notas/propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- 14:30 inicio; 14:42 primer cálculo; 14:45 Word y PDF (36 páginas). 19 de 20 controles y 1 explicado (3 comparables).
- Decisiones:
  - BPA en base contable (US GAAP, sin no recurrentes, con amortización de intangibles) para casos y PER histórico; PER histórico de Stock Analysis (contable). Excluido FY2021 (31x); FY2026 con BPA limpio de 134 M no recurrentes.
  - Sostenibilidad: la primera versión (crecimiento medio 4,9 %) fallaba con el ROIC real (11,5 %; el motor daba 22,9 % por el balance incompleto, corregido dejando solo FY2026). Base rebajado al 3,6 % medio y capex subido al 24,5-28,5 %: pasa (financiable 3,7 %). Veredicto «En parte».
  - Circulante a 0 en el DCF (sin balance); pesos 50 DCF / 50 escenarios (comparables y transacciones a 0).
  - Convicción **Baja** (el motor sugiere Media) por datos de núcleo incompletos.
- Línea 12 m: objetivo FY2028e ponderado 72,46 USD → **−2,1 %** (base +5,4 %, con dividendo del 1,5 %) → **Mantener**; valor intrínseco 41,22 USD (−45,2 %); comprar < 41,22, vender > 81,76. Detalle en `revision-12m-2026-10-14.md`. No se ejecutó `apuntar-12m.mjs` ni `seguimiento.mjs` (lo integra el orquestador).

## Lecciones
- Empresas que cambian de NIIF a US GAAP al mudar la cotización (Ashtead → Sunbelt): el EBITDA baja por los arrendamientos operativos y la serie se rompe; declararlo en `cambios_perimetro` y no meter los arrendamientos operativos en el puente.
- Si solo hay balance de un año, no pongas un segundo año con patrimonio y deuda vacíos: el motor promedia el capital invertido con 0 y el ROIC sale el doble.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 16.4x, mínimo 14.1x, media larga 16.9x; antes v2 18.55x/15.26x/18.19x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
