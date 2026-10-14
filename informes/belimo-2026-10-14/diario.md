# Diario · Belimo (BEAN.SW) · 14-oct-2026

- Commit de partida: 657198e (Seguimiento: regenerado). Método vigente: v3 ×1,1 con selector (METODO-VIGENTE.md, 14-oct 19:30).
- Entorno: nube de Claude Code, red abierta. Sin subagentes: notas A-E escritas por mí con `notas/construir-notas.mjs`; parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Fecha de corte 2026-10-14; divisa CHF (cuentas y cotización); ejercicio natural; NIIF; cuenta por naturaleza.
- Fuentes primarias: informes anuales 2025, 2023 y 2022 (este, copia en UN Global Compact) y semestrales 2025 y 2026, en PDF de report.belimo.com (belimo.com devuelve 403 a curl y WebFetch; report.belimo.com sí abre). Suiza no tiene XBRL. Precio y bolsa con `bolsa.mjs` (cierre SIX del 14-oct: 800,00). Consenso: MarketScreener (WebFetch). Comparables: Yahoo con `herramientas/yahoo.mjs` (script en el scratchpad; resultado en `notas/comparables-yahoo.json` y en la ficha sectorial).
- Ficha sectorial corta hecha (encargo): `sectores/climatizacion-hvac-2026-10-14.md` y `-comparables.json`.
- Decisiones: BPA de 2023 normalizado (efecto fiscal único de 17,1 M) en la historia del PER; 2021 excluido de la historia (burbuja de múltiplos, 58x adelantado); caja de 2021 con los 60 M de depósitos a plazo; puente a 30-jun-26 (préstamos 94,9, arrendamientos 34,7, caja 103,5, pensiones 6,5). WACC 7,21 % (bono suizo 0,54 % + beta 1,05 × 5,5 % + 1 punto, criterio de Roche/Schindler/KN); terminal 1 %. Capex subido medio punto sobre la historia para que la prueba de sostenibilidad pase (financiable 8,6 % = proyectado 8,6 %); sin rebaja del crecimiento. Pesos DCF 50 / comparables 10 / escenarios 40.
- Resultado: DCF 426,07 CHF; valor intrínseco 427,67 (−46,5 %); con la prima del mercado 541,70. DCF inverso: 19,1 % anual de crecimiento 2027-2035 (base 7,4 %) o margen EBITDA del 41,6 %. ROIC 37,2 % frente a WACC 7,21 % (+30 pp). Sostenibilidad «Sí».
- **Línea 12 m (v3 ×1,1, selector «sin marcas»)**: objetivo 901,00 CHF; ponderada 13,9 %, base 18,1 % (apuntar-12m: 18,2 %); v2 16,7 % / 12,4 %. **Mantener**, convicción media. Comprar < 427,67; vender > 1.012,22. Robustez: SÓLIDA, acción robusta «No mantener» (V1). Detalle en revision-12m-2026-10-14.md.
- Word y PDF (soffice): 20 de 21 controles y 1 explicado (tipo impositivo de 2023). Cobertura 87,8 %. 39 páginas.
- Para subir la confianza: transcripciones de las conferencias, cifra de ventas de centros de datos (Jefferies: +77 %, sin verificar), consenso de una segunda fuente, votos de la junta de 2026.
- Próximos resultados: ventas de 2026 el 18-ene-2027; informe anual el 1-mar-2027.
- Tiempo: unos 20 minutos de reloj del sistema (17:52-18:12 UTC).

## Lecciones

- Belimo: `belimo.com/mam/...` da 403 (antibot) a curl, WebFetch y descargar.mjs; los mismos PDF están en `report.belimo.com/HY26/app/uploads/` (y los años anteriores en `/HY24/`, `/ar22/`), que sí abren.
- En las notas escritas con un script, las citas deben ir con el número de la propia nota ([3]), no con la letra ([A3]): `integrar` no traduce la letra dentro de una nota y la deja literal sin avisar. `construir-notas.mjs` de esta carpeta lo convierte al guardar.
- `herramientas/yahoo.mjs` (`ficha`) sirve para una tabla de comparables rápida en la nube: el `forwardPE` de las cotizadas de Londres sale en peniques (dividir por 100) y Halma no trae capitalización.
