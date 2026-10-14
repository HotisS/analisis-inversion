# Diario · Sectra (SECT B) · 14-oct-2026

- Commit de partida: 5db76fa (L'Oréal, 14-oct).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, descargar.mjs y bolsa.mjs no funcionan. Las cifras salen de los extractos de búsqueda (comunicados de resultados de Sectra en Cision y su web, Stock Analysis, Investing, MarketScreener, prensa sueca), con la URL como fuente; lo que no cuadró va a null y a meta.huecos. **Confianza: baja-media.** Unas 25 búsquedas.
- Fecha de corte: 2026-10-14. Divisa: SEK. Ejercicio mayo-abril, etiqueta «fin» (FY2026 = may-2025 a abr-2026). Precio: 310,20 SEK, cierre del 9-oct (no se encontró uno posterior verificable).
- Notas A-E hechas por mí (sin subagentes) con `notas/construir_notas.py`; comparables y transacciones reutilizados del informe de Pro Medicus (12-oct), pasados a SEK.
- Decisiones: amortizaciones estimadas al 2,7 % de las ventas y resultado antes de impuestos con tipo del 21,5 % (no había cuentas completas); BPA de FY2025 = 475,6 M / 192,6 M = 2,47 (los agregadores dan 2,92, que no cuadra con el beneficio publicado); 110 M de acuerdo de patentes de FY2025 como no recurrente. Prueba de sostenibilidad: la cuota (Imaging IT ≈ 5 % del mercado mundial de Signify) pasaba de 1,9 veces con la senda inicial (10,8 % anual) → caso base rebajado a 7,8 % anual (cuota final 1,46 veces); etapa 2 retirada.
- Tiempos: investigación ~25 min; notas, cálculo y redacción ~20 min. 17 de 17 controles; Word y PDF (soffice).
- Rentabilidad a 12 meses v2: ponderada +15,2 %, base +18,2 % → **Mantener** (el valor intrínseco, 125,24 SEK, queda un 59,6 % por debajo del precio); compra < 125,24 SEK, venta > 397,02 SEK. PER histórico estimado (sin cierres anuales). Detalle en revision-12m-2026-10-14.md.

## Lecciones
- Sectra: los agregadores (Stock Analysis, Fool, roic.ai) atribuyen a FY2025 un BPA de 2,92 que no cuadra con el beneficio publicado (475,6 M); cuadra el de FY2026 (2,93). Usar el comunicado.
- Sin bolsa.mjs, el PER histórico de la regla a 12 meses queda estimado con PER publicados por la prensa; en empresas de PER muy alto el resultado depende mucho de esa estimación: rehacer con cierres reales cuando haya red.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 80.8x, mínimo 64x, media larga 81.7x; antes v2 90x/60x/95x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
