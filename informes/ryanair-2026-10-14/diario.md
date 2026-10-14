# Diario · Ryanair Holdings (RYA.IR) · 14-oct-2026

- Commit de partida: 074d579.
- Entorno: nube de Claude Code; la red solo deja la búsqueda web (WebSearch). WebFetch, curl, descargar.mjs y bolsa.mjs no funcionan. Las cifras salen de extractos de búsqueda con la URL como fuente.
- Fecha de corte: 2026-10-14. Divisa: EUR. Ejercicio cerrado el 31 de marzo; etiqueta «fin» (FY2026 = abr-2025 a mar-2026, como la empresa). Ejercicio objetivo a 12 m: FY2029e (primero que cierra más de 18 meses después del corte; mismo criterio que Experian y Halma).
- Confianza de los datos de núcleo: **Baja**. Precio 24,16 € sin cierre fechado (roic.ai, cuadrado con el ADR del 9-oct: 54,04 USD ÷ 2 ÷ 1,1188); cuentas FY23-FY26 de extractos de los comunicados y del 20-F (cuadran entre sí: ingresos, EBIT, BAI, impuestos, beneficio y BPA); balance FY22-FY24 solo con totales; FY22 sin cuenta completa. Para pasar a Comprar habría que confirmar con el 20-F el precio de cierre, el balance a junio de 2026 y el BPA antes de excepcionales.
- Decisiones: cuenta por naturaleza (coste_ventas = combustible); 85 M de la multa de la AGCM como no recurrente en FY26; puente a 30-jun-2026 con caja 2.800 M, deuda 0 y arrendamientos 145 M; circulante 0 % en el DCF (el motor no ve los billetes cobrados por adelantado); impuesto del 12,5 % (real 9,7-10,3 %); beta 1,1 (estimación); comparables solo como referencia (10 %).
- 14-oct, 15:55: informe cerrado (Word y PDF con soffice), 18 de 21 controles correctos y 3 explicados (tipo impositivo). Recomendación Mantener, convicción baja (las reglas discrepan: relativa Comprar, absoluta Mantener). Sostenibilidad: Sí.
- Rentabilidad a 12 meses con la **regla v3** (historia de PER adelantado, `per_historico.base: "adelantado"`; git pull a 89e1711 antes de calcular): ponderada −6,3 %, base +4,3 % → Mantener (compra < 19,69 €; venta > 25,15 €); valor intrínseco 25,23 € (+4,4 %). Detalle en revision-12m-2026-10-14.md.
- Ficha sectorial corta (aerolíneas europeas) en `notas/ficha-sector-aerolineas-2026-10-14.md`: no se escribe en `sectores/` porque el encargo prohíbe tocar fuera de la carpeta; el integrador puede moverla.

## Lecciones
- Precio en la nube sin Yahoo: los RNS semanales de «Transaction in own shares» dan el precio medio diario con fecha (sirven también como cierre de ejercicio aproximado), y el ADR en USD convertido con el BCE sirve de contraste.
- Aerolíneas: el ROIC del motor sale inflado por los billetes cobrados por adelantado (pasivo corriente); dar aparte el rendimiento sobre el inmovilizado.
