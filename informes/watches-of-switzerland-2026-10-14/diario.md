# Diario · Watches of Switzerland (WOSG.L) · 14-oct-2026

- Commit de partida: 2657a59 (ANYCOLOR; método v2 con regla de múltiplos común).
- Entorno: nube de Claude Code; la red solo deja WebSearch (sin WebFetch, curl, descargar.mjs ni bolsa.mjs). Las cifras salen de extractos de búsqueda de los comunicados de resultados (FY23, FY25, FY26, actualización de mayo y de la junta de septiembre), Reuters y proveedores de datos, con su URL. **Confianza baja**: sin cuentas completas, balance solo de FY25-FY26, sin bolsa (beta, rentabilidades), PER histórico con precios de cierre aproximados y cuatro comparables solo con PER.
- Fecha de corte 2026-10-14; precio 673,5 p (13-oct, web de la empresa). GBP, ejercicio a finales de abril/principios de mayo, etiqueta «fin» (FY2026 = 53 semanas a 3-may-2026). Próximos: ventas del 1S el 10-nov y resultados el 10-dic-2026.
- 12:42 inicio. Unas 22 búsquedas web. Notas A-E con `notas/construir.mjs` (sin subagentes); propio en `propio.mjs` + `textos.mjs`.
- Decisión clave: **base ajustada y antes de NIIF 16** (alquiler dentro del EBITDA, arrendamientos de 427,6 M fuera del puente), la de la guía y la deuda neta de la empresa; evita contar las tiendas sin alquiler (lección de Dunelm) sin necesitar las altas de derechos de uso.
- WACC 12,07 % (gilt 5,1 %, beta 1,2 estimada, +1 punto por dependencia de Rolex). DCF 5,76 GBP; síntesis 6,20 GBP (−7,9 %). DCF inverso: 8,6 % anual frente al 5,0 % base. Reglas: absoluta Vender, relativa Mantener → Mantener, convicción Baja (sugerida).
- Sostenibilidad «En parte»: financiable (5,0 % = 5,0 %), pero el capital nuevo rendiría un 32 % frente al ROCE publicado del 18 %; el ROIC incremental del motor (3,8 %) es un artefacto del balance incompleto, así que no se rebaja el base (explicado en controles).
- 12:53 Word y PDF (soffice). 17 de 18 controles correctos y 1 explicado (4 comparables).
- **Revisión a 12 meses v2**: ejercicio FY2028e; BPA 43,6 / 57,7 / 63,4 p; PER 8,2 / 11,5 / 14,2x (regla común); objetivo ponderado 6,47 GBP (−4,0 %), base 6,64 (−1,4 %), sin dividendo → **Mantener**; comprar por debajo de 5,62 GBP. Consenso ≈7,00 GBP. Detalle en `revision-12m-2026-10-14.md`. No se ha ejecutado `apuntar-12m.mjs` ni `seguimiento.mjs` (lo integra el orquestador).

## Lecciones
- Minorista con NIIF 16 cuando no se pueden leer las cuentas: trabajar en la base antes de NIIF 16 que publica la empresa (EBITDA con alquiler, sin arrendamientos en el puente) es coherente y evita buscar las altas de derechos de uso.
- Precio de cotización en la nube: el extracto de búsqueda de la página «share price information» de la propia empresa dio el cierre del día anterior; los avisos de recompra solo sirven si hay un programa en curso.
- Con el balance de solo dos años, el ROIC incremental del motor sale sin sentido y hace fallar la prueba de capital nuevo: explicarlo y usar el ROCE publicado.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 13.7x, mínimo 7.5x, media larga 13.8x; antes v2 11.5x/8.2x/11.5x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Watches of Switzerland - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 2,9 % (antes v3 Mantener 2,9 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 8,2x / 11,5x / 14,2x, -4,0 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
