# Diario · Midea Group, línea H (0300.HK) · 16-oct-2026

- Commit de partida: 7409c4a («README del escáner: el ROIC − WACC del filtro previo es aproximado»). Sin `git pull`, `commit` ni `push` por encargo (comparto el checkout con otros análisis). No se ejecutaron `apuntar-12m.mjs`, `seguimiento.mjs`, `cobertura.mjs` ni `calendario.mjs`; no se tocaron `objetivo12m-revisados.json`, `simbolos.json`, `escaner/calendario.json` ni `cola.md`.
- Origen: hueco de los grandes índices (Hang Seng, MSCI EM) con calidad aproximada en el escáner (ROIC − WACC ≈ 10). Ficha de sector reutilizada: `sectores/climatizacion-hvac-2026-10-14.md` (comparables y transacciones); el mercado final es otro (electrodomésticos + climatización mundial), porque el 73 % de Midea es hogar y edificios.
- Entorno: nube con proxy. `bolsa.mjs` para 0300.HK y 000333.SZ; `movimiento.mjs 0300.HK`; `descargar.mjs` para los PDF de HKEXnews (en `notas/docs/`); consenso y comparables con quoteSummary de Yahoo (`herramientas/yahoo.mjs`); MarketScreener solo por WebFetch (curl 403); bono chino de Trading Economics. `cuentas.mjs` no sirve para China/HK.
- Fecha de corte 2026-10-16; cuentas en RMB (NIIF de la línea H), cotización en HKD a 0,8515. Notas A-E por mí, sin subagentes (`notas/construir-notas.mjs`); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs`.
- **Confianza de los datos de núcleo: media-alta.** 2021-2023 del folleto H (NIIF auditadas), 2024-2025 de los anuales, 1S26 del semestral. Huecos: EBIT por negocio, semestres de 2024 comparables, CR5, calificaciones ESG, operaciones de directivos, posición corta y sentimiento (antibot en Guba y Xueqiu, 403 en Reddit).
- Decisiones:
  - **EBIT limpio**: resultado operativo − intereses cobrados − ganancias de instrumentos financieros − diferencias de cambio (pasan al resultado financiero). Margen EBITDA 11,8 % en 2025.
  - **ROIC prudente**: en el balance del motor la caja es solo efectivo + depósitos a plazo; los 238.000 M de depósitos estructurados y productos bancarios quedan como capital invertido. ROIC 19,2 % (2025) frente a WACC 7,74 %: **+11,43 puntos**. Con toda la tesorería fuera, el capital invertido sería casi nulo (no tiene sentido). El escáner daba ≈ 10: se confirma.
  - **Puente** con jun-26: caja = tesorería total 328.842 M; deuda 80.327 M con los convertibles de mayo; arrendamientos 3.312; minoritarios 12.932; `otros_ajustes` +2.400 (recompras pagadas después del balance; positivo = resta).
  - WACC 7,74 % (bono 1,67 %, beta 0,85 —la de Yahoo para 0300.HK mezcla otra empresa—, prima 5,5 % + 2,0 de China/aranceles/geopolítica, Kd 2,75 %, deuda 10 %); g = 1,1 % (rf − 0,5). Pesos DCF 60 / comparables 10 / escenarios 30.
  - Mercado final dividido por el 73,2 % (parte de las ventas en hogar y edificios) para que la cuota implícita compare lo mismo que la de hoy: 6,7 % → 6,6 %. Sostenibilidad **Sí** sin rebajar el base.
  - 2026e fijo (1S publicado): los ajustes de escenario del BPA a 12 m empiezan en 2027e.
  - PER histórico adelantado en base H: hasta 2023, cierre de la A × 0,946. 2020 excluido (burbuja). v2 en `per_historico.v2`.
- Resultado: DCF 133,34 RMB; valor intrínseco 129,34 RMB (151,90 HKD, +61,7 %); con la prima del mercado 145,58. DCF inverso: el precio descuenta −5,2 % anual de ventas (rentabilidad implícita 14,9 %).
- **12 m (v3 ×1,1, selector sin marcas)**: objetivo 83,78 RMB (98,39 HKD); ponderada +10,1 %, base +9,9 % (v2 12,7 % / 11,6 %). **Mantener**, convicción media. Comprar < 76,59 RMB (89,95 HKD); vender > 97,86 RMB. Robustez SÓLIDA, acción robusta **Mantener**; límite robusto 81,44 HKD. Bloque de precio y noticias: **no cambia**. Próximos resultados 29-oct-2026.
- Word y PDF (soffice): 20 de 20 controles. Cobertura 88,2 % (sentimiento vacío).

## Lecciones

- Yahoo 0300.HK trae datos anteriores a la salida a bolsa de Midea (sep-2024) de otra empresa con el mismo código: beta y rentabilidades largas sin sentido. Usar la A (000333.SZ) para la historia y la beta.
- En empresas chinas con tesorería enorme en depósitos estructurados, decidir qué es caja en el ROIC y qué en el puente, y decirlo: el ROIC prudente deja los depósitos dentro; la valoración los resta.
- Cuando solo una parte de las ventas juega en el mercado final, escalar el tamaño del mercado para que la prueba de cuota compare lo mismo.
