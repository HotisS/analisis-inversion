# Diario · RELX (REL.L) · 14-oct-2026

- Commit de partida: c401501 (cola del 14-oct, 12:00).
- Entorno: nube de Claude Code, como Group 1 Automotive. La red solo deja la búsqueda web; WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no se han usado (no funcionan aquí). Unas 25 búsquedas. Las cifras salen de los comunicados de resultados citados por la búsqueda (RNS de 2021-2026 en Investegate y relx.com, Form 6-K de 2025, resultado de la junta de 2026, aviso de recompra del 12-oct), con proveedores de datos citados para lo que falta (Stock Analysis, Finboard, Chartrow, Investing, StockAlarm). Lo que no se ha podido cuadrar va a null y a huecos.
- Confianza: media en cuenta de resultados (2022-2025), BPA ajustado y deuda neta; baja en balance (solo deuda neta y activo corriente), flujos (2 años), consenso (una fuente que rotula en USD cifras en GBP), sector (sin tamaño de mercado) y gobierno (sin consejo completo ni remuneración).
- Fecha de corte: 2026-10-14. Divisa: GBP (cotiza en peniques). Cierre: diciembre. Sin subagentes.
- Decisiones:
  - Precio: 27,01 GBP, media ponderada de la recompra del 9-oct (aviso del 12-oct); no se ha podido leer el cierre del 13-oct. Acciones: 1.742,3 M emitidas − 86,8 M en autocartera = 1.655,5 M.
  - Cuenta publicada; EBITDA = beneficio operativo publicado + amortización de activos propios (EBITDA ajustado − beneficio operativo ajustado) + amortización de intangibles comprados. 2021 sin EBITDA, 2023 sin impuestos.
  - Balance: deuda neta publicada (con arrendamientos) en deuda financiera y caja a cero. El ROIC del motor sale inflado (capital = deuda neta); se usa el ROIC ajustado de la empresa (15,4 %) y se explica.
  - Puente: deuda neta de junio (8.733 M) + 460 M de recompra estimada del 2S hasta el 9-oct (otros ajustes).
  - WACC 8,8 % con el gilt al 5,15 % y beta 0,85 (estimación); con la prima implícita del mercado el valor sube a 29,72.
  - Circulante a cero en el DCF (no se ha podido leer el saldo de ingresos diferidos).
  - Comparables y transacciones reutilizados del informe de Wolters Kluwer del 8-oct (RELX sustituida por Wolters Kluwer), capitalizaciones pasadas a GBP a 0,857.
  - Sostenibilidad: Sí (reinversión del 2 % del NOPAT; prueba a mano con el poder de precios). Base sin rebaja.
- 14-oct, 12:15: informe cerrado, 16 de 16 controles; Word y PDF (soffice). Rentabilidad a 12 meses v2: ponderada +11,1 %, base +11,6 % → Mantener, convicción baja (compra < 25,58 GBP; venta > 33,33); valor intrínseco 25,58 GBP (−5,3 %). Detalle en revision-12m-2026-10-14.md. Tiempo total: unos 20 minutos.
- Pendiente para quien integre: `apuntar-12m.mjs relx-2026-10-14` y `seguimiento.mjs` (no ejecutados por encargo).

## Lecciones

- RELX publica el BPA ajustado de cada año con el del anterior entre paréntesis en el RNS de resultados: una búsqueda por año da la serie limpia para el PER. Los cierres anuales en peniques no salen en la búsqueda; el ADR (1:1) en Chartrow/Digrin convertido con el cambio de fin de año sí, y cuadra.
- StockAlarm rotula en USD estimaciones que están en la divisa de las cuentas: comprobarlo contra el último año real antes de usarlas.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 29.2x, mínimo 24.3x, media larga 28.7x; antes v2 27.3x/22.4x/26.2x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
