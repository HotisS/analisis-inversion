# Diario · Endesa (ELE.MC) · 14-oct-2026

- Commit de partida: 2657a59 (ANYCOLOR 14-oct; método v2 con regla de múltiplos común).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de los extractos de búsqueda (notas de prensa de Endesa, Stock Analysis, TipRanks, MarketScreener, Investing, prensa financiera), con la URL como fuente. Confianza: **baja-media**. Cuenta de resultados 2021-2025 y deuda neta, media; balance (sin circulante comercial), comparables (seis de ocho solo con PER de agregadores) y gobierno (sin IAGC ni IARC), baja.
- Fecha de corte: 2026-10-14. Divisa: EUR. Cierre: diciembre. Precio 43,03 € (Rankia, media sesión del 14-oct). Acciones ≈1.006 M (estimación propia: capital de 1.041,7 M menos la recompra de los tramos 3-5).
- Bund 3,53 % (Bundesbank, 12-oct) y ERP 4,20 % reutilizados de otros informes del repo del mismo día.
- Comparables de Naturgy y Redeia reutilizados del informe de Enagás (7-oct).
- 12:42 inicio; ≈30 búsquedas web; 12:58 informe cerrado: 18 de 18 controles; Word y PDF (soffice, 38 páginas).
- Decisiones: cuenta por naturaleza sin aprovisionamientos (no disponibles); amortizaciones = EBITDA − EBIT de Stock Analysis (incluyen deterioros y provisiones); impuestos 2021-2024 incluyen minoritarios; puente con la deuda neta de junio (incluye arrendamientos) + 1.355 M de otros ajustes (complementario de julio y recompra desde julio); provisiones de plantilla, pensiones y desmantelamiento fuera (hueco). Sostenibilidad: Sí (crece 1,5 %, financiable 2,2 %). Sin RAB ni transacciones.
- Línea 12 m: objetivo ponderado 30,87 € (−24,6 %), base −25,4 %, señal **Vender** (compra < 28,22 €; venta > 36,06 €); valor intrínseco 41,06 € (−4,6 %). Detalle en `revision-12m-2026-10-14.md`. Convicción baja: la historia del PER solo tiene dos cierres fiables (2024-2025).

## Lecciones

- Sin acceso a `bolsa.mjs`, los cierres de ejercicio se pueden deducir de notas de prensa que dan precio y rentabilidad en el año («38,83 € y +25 % en el año» → cierre anterior ≈31,1 €); marcarlo como estimación. Con solo dos cierres la regla del PER queda frágil: decirlo en la convicción.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 10.2x, mínimo 8.4x, media larga 13.5x; antes v2 12.5x/11.2x/12.5x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
