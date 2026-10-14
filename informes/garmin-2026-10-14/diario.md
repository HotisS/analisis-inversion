# Diario · Garmin (GRMN) · 14-oct-2026

- Commit de partida: 1a222c5 (Ferrari, 14-oct).
- Entorno: nube de Claude Code. La red solo deja salir a la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de los extractos de búsqueda del 10-K FY2025, los 8-K de resultados (1T25-2T26), el proxy de 2026 y agregadores (Barchart, Stock Analysis, EDGAR Tools, Digrin), con la URL como fuente; lo que no cuadró va a `null` y a `meta.huecos` (17). Confianza: media en cuentas (cuadran margen bruto, EBIT y beneficio entre fuentes y con los segmentos), baja en comparables (solo PER adelantado y EV/EBITDA, de fechas distintas), gobierno (sin tabla de remuneración ni Form 4) y sector (solo unidades).
- Fecha de corte: 2026-10-14; precio de cierre del 13-oct (276,41 USD, GuruFocus/Yahoo). Divisa: USD. Ejercicio de 52-53 semanas a final de diciembre, etiqueta por año natural. US GAAP; sin deuda; arrendamientos operativos fuera del puente.
- 13:15 inicio · 13:25 notas A-E escritas (unas 35 búsquedas) · 13:27 primer cálculo · 13:30 Word (38 páginas) y PDF con soffice.
- Decisiones: 2026e fijo con la guía de julio (8.050 M, margen operativo 27 %); circulante al 36 % de las ventas (media 2023-2025); WACC 10,67 % (bono 5,22 %, beta 0,99, prima 5,5 %, sin deuda); terminal 2,5 % Gordon. Escenarios 25/50/25 (bajista con el precedente de 2022). Sostenibilidad «Sí» con la prueba hecha a mano (reinversión del 11 % del NOPAT: el motor no la hace por debajo del 15 %; ROIC 34,5 % × 11 % ≈ 3,8 % financiable + 2 puntos de precio ≥ 5,6 % proyectado). PER histórico con cuatro años (falta el cierre de 2021) y 2023 con el BPA pro forma (5,59) en vez del publicado (6,71).
- 14-oct, 13:32: informe cerrado, 16 de 17 controles correctos y 1 explicado (tipo fiscal de 2023). **Rentabilidad a 12 meses v2: ponderada −9,8 %, base −4,3 % → Mantener** (a dos décimas del umbral de venta de 277 USD; compra < 155,98 USD); valor intrínseco 155,98 USD (−43,6 %). Detalle en revision-12m-2026-10-14.md. Sin apuntar con `apuntar-12m.mjs` ni `seguimiento.mjs` (lo hace el orquestador).

## Lecciones

- En empresas de calidad sin deuda y con PER alto, con el bono de EE. UU. al 5,2 % el DCF queda muy por debajo (−47 %) y el filtro «valor intrínseco ≥ precio» fija el precio de compra mucho más abajo que la ponderada a 12 meses: dilo en la síntesis.
- El motor no hace la prueba de sostenibilidad con reinversión < 15 % del NOPAT (ya en lecciones): ROIC × reinversión + precio frente al crecimiento proyectado, a mano, sirvió.
