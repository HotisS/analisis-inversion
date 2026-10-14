# Diario · Unilever (ULVR) · 14-oct-2026

- Commit de partida: 8fcc604 (Bureau Veritas, 14-oct).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Todas las cifras salen de extractos de búsqueda (comunicados de resultados y RNS de la empresa, 20-F, prensa financiera, proveedores de datos) con su URL; lo que no cuadró va a `null` y a `meta.huecos` (13 huecos). Tipo de cambio (BCE, 12-oct: 0,84478 GBP/EUR), Bund (3,53 %) y prima de Damodaran (4,20 %) reutilizados de los informes del repositorio del mismo día; comparables (PER de 12 meses) de los informes de Nestlé y L'Oréal del 14-oct.
- Confianza: baja-media. Cuenta de resultados completa solo para 2024-2025 (operaciones continuadas); 2021-2023 con helados y de proveedores; balance y flujos solo de 2025; sin bolsa ni cierres anuales (el PER histórico es el PER medio anual de Sure Dividend).
- Fecha de corte: 2026-10-14. Divisa de las cuentas: EUR; cotización en GBp (precio 4.718 p del cierre del 13-oct = 55,85 EUR). Cierre del ejercicio: diciembre. Acciones con voto a 30-sep: 2.154,3 M.
- Decisiones: (1) se proyecta el perímetro actual, con la alimentación, y la operación con McCormick (cierre a mediados de 2027) se trata como neutral en valor; (2) margen EBITDA del DCF entre el publicado y el subyacente (≈1 punto de reestructuración recurrente); (3) circulante al 0 % de las ventas por falta de desglose; (4) minoritarios del puente a valor estimado (beneficio × 20 = 9.600 M), no contable; (5) BPA de la revisión a 12 meses en base subyacente, la del PER histórico.
- Tiempos: 14:15 inicio; 14:22 búsquedas terminadas (≈30 búsquedas); 14:28 informe cerrado; 16 de 16 controles; Word y PDF (soffice).
- Revisión a 12 meses v2: ponderada +9,1 %, base +9,7 % → Mantener (convicción media); objetivo 59,09 EUR (4.992 p); valor intrínseco 62,72 EUR (+12,3 %; DCF 65,96); compra < 53,00 EUR (4.477 p). Detalle en revision-12m-2026-10-14.md.

## Lecciones

- Empresa que cotiza en GBp y publica en EUR: `meta.tipo_cambio` en EUR por penique (0,0118374) y precio en EUR; el motor da los niveles en peniques.
- Escisión con agrupación de acciones (Unilever 8 por 9, dic-2025): el BPA publicado ya viene reexpresado con la agrupación; no mezclar con BPA antiguos de proveedores.
- Venta pendiente de un negocio grande con reparto de acciones (Reverse Morris Trust): si el cierre cae dentro de los 12 meses, el BPA del perímetro actual × PER aproxima precio + lo recibido; dilo en limitaciones.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 19.2x, mínimo 16.8x, media larga 20.2x; antes v2 17.9x/17.1x/18.7x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Unilever - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Mantener 16,2 % (antes v3 Mantener 16,2 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 14,0x / 16,5x / 18,7x, 9,1 % Mantener. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
