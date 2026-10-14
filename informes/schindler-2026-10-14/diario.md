# Diario · Schindler Holding AG (SCHP) · 14-oct-2026

- Commit de partida: 0834eb2 (Linde, 14-oct; ya con la regla v3). Prompt `verticales/empresa/prompt.md` sin cambios durante el análisis.
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no se probaron (encargo). Unas 30 búsquedas, ≈15:35-16:10 UTC. Las cifras salen de extractos de búsqueda de los comunicados de Schindler (sindicados en MarketScreener, finanzen.ch, AWP), de notas del informe anual (reports.schindler.com) y de Stock Analysis, TipRanks, roic.ai, Wisesheets y companiesmarketcap, con la URL como fuente. **Confianza baja**: precio de hoy no confirmado (último cierre fechado: 260,40 CHF el 2-oct, Investing), balance de agregador sin circulante ni minoritarios, cuenta de 2021-2022 incompleta, amortización de 2025 estimada, precios de cierre históricos derivados del PER de proveedores.
- Fecha de corte 2026-10-14. Divisa CHF. Cierre en diciembre. Línea: bonos de participación SCHP (sin voto). Acciones 106,5 M (estimación con el BPA del 1S26). Próximos resultados: 22-oct-2026; día del inversor: 19-nov-2026.
- Notas A-E hechas por mí sin subagentes con `notas/build_notas.py` + `notas/notas_datos.py` (citas `{clave}` traducidas a la lista propia de cada nota), como en KONE; propio en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs`.
- Decisiones:
  - WACC en francos como Roche y Givaudan del repo: bono de la Confederación 0,54 % + beta 0,85 (estimada, sin serie) × 5,5 % + 1 punto adicional = 6,08 %; terminal 1,0 %.
  - Puente de jun-2026: caja e inversiones a corto 3.703 M, deuda 717 M (con arrendamientos), minoritarios 700 M (58 M × 12, estimación).
  - 2026e fijo: −1 % en francos y EBIT 13,2 %; después 3-3,5 % y EBIT hasta 14,3 %. Circulante 0 %.
  - PER adelantado reconstruido (regla **v3**): 2021 excluido (BPA 2022 atípico); 2024 con el PER de la nominativa; 2025 con un cierre de ≈320 CHF derivado de dos noticias de caída en el año (−10 % a 288,2 y −16,45 % a 267,2).
  - Sostenibilidad «Sí» sin rebaja (crecimiento del 2,2 % sin capital nuevo, por debajo del mercado).
- 14-oct, ≈16:05 UTC: 16 de 16 controles; Word y PDF (soffice). Cobertura 76,3 %.
- **Revisión a 12 meses (v2 con regla v3)**: objetivo 272,22 CHF, ponderada +6,8 %, base +9,9 % (dividendo 2,3 %) → **Mantener**, convicción baja (reglas absoluta Mantener / relativa Comprar; confianza de datos baja). Valor intrínseco 266,90 CHF (+2,5 %). Compra < 241,93; venta > 309,14. Detalle en `revision-12m-2026-10-14.md`. No se ejecutó `apuntar-12m.mjs` ni `seguimiento.mjs` (encargo).
- Para pasar a Comprar hay que confirmar con fuente primaria: precio del día, acciones tras la recompra, balance de 2025 (anticipos, minoritarios, pensiones) y BPA de 2021-2022.
- Ficha sectorial corta (ascensores) en `sector-ascensores-2026-10-14.md`, dentro de esta carpeta.

## Lecciones

- En la nube, un cierre de año que no aparece se puede reconstruir con dos noticias que den «precio y caída en el año» de fechas distintas (si coinciden, el dato es fiable); y el PER adelantado de un año sin precio sale del PER del proveedor × BPA del año ÷ BPA del siguiente, sin necesitar el precio.
- Empresas suizas con dos líneas (nominativa y bono de participación): los proveedores mezclan PER y precios de las dos; la nominativa cotiza ≈5-10 % más barata, así que no se pueden mezclar precios, pero sí ratios.
- 2026-10-14: datos-v2.json y «Schindler - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 6,8 % (antes v3 Mantener 6,8 %).
