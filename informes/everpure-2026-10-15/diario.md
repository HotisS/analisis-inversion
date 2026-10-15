# Diario · Everpure (P, antes Pure Storage) · 15-oct-2026

- Commit de partida: 70ba47e. Encargo del coordinador (megatendencia IA: almacenamiento para centros de datos de IA). Sin subagentes, sin commits ni escrituras fuera de la carpeta.
- Entorno: nube. Cuentas FY2017-FY2026 del XBRL de la SEC (`cuentas.mjs --sec 1474432`), comprobadas con el 10-K FY2026, el 10-Q del 2T FY27 y siete notas de resultados (4T FY25 a 2T FY27); proxy 2026, 8-K de la junta y Form 4 (`form4.mjs`). Precio y cierres con `bolsa.mjs` (`--cierre-mes 1 --etiqueta fin`); `movimiento.mjs P`. Tasa libre FRED DGS10 5,21 % (curl). Consenso MarketScreener (WebFetch); comparables Stock Analysis.
- Corte 2026-10-15; precio = cierre del 14-oct (141,49 USD; el 15-oct a media sesión ≈131, −7 %). Ejercicio a 1-feb, etiqueta «fin». US GAAP, USD.
- Decisiones: caja = caja + valores negociables; ingresos diferidos (corrientes y no corrientes) en pasivos de contrato; arrendamientos operativos fuera; recompras + retenciones fiscales. BPA GAAP. Comparables con peso 0 (PER ajustado). Transacciones: sección omitida (sin múltiplos publicados). Pesos DCF 60 / escenarios 40. WACC 13,46 % (beta 1,5 entre 1,41 mensual y 2,14 semanal). Sostenibilidad «En parte» (el motor da «Sí» porque no hace falta capital; la calidad GAAP no lo sostiene). Mercado final en null: la hiperescala no está en el mercado de IDC.
- Resultado: DCF 40,88; valor intrínseco 40,62 (−71,3 %); DCF inverso 35,3 % anual (base 13,1 %). ROIC del motor n.d. (capital invertido negativo); ROIC operativo sobre capital fijo 10,7 % < WACC.
- **Línea 12 m (v3 ×1,1, selector v3)**: objetivo 220,26 USD, ponderada +55,7 %, base +48,1 %; **Mantener**, convicción media. v2 40,8 % / 34,7 %. Comprar < 40,62; vender > 244,73. Robustez (`--actual`): SÓLIDA, acción robusta «No mantener» (VI bajo el filtro); BPA −10 %: 40,1 % / 33,3 %; límite robusto 40,61 USD. Detalle en revision-12m-2026-10-15.md. `apuntar-12m.mjs --simular` coincide.
- Regla 13: veredicto «no cambia»; caída del 14-15-oct sin noticia propia.
- Word y PDF (soffice): 16 de 20 controles y 4 explicados. Cobertura 82,9 %. Próximos resultados: 18-nov-2026 (estimado por Stock Analysis; en 2025 fueron el 2-dic).
- Tiempo: unos 75 minutos.

## Lecciones

- Empresas con ejercicio a enero/febrero: `bolsa.mjs` sin `--etiqueta fin` nombra el ejercicio por el año de inicio (FY2025 = cierre de enero de 2026); con `--cierre-mes 1 --etiqueta fin` cuadra con el XBRL de la SEC.
- La caja del XBRL de la SEC (`cuentas.mjs`) no suma los valores negociables cuando la empresa los reporta con un concepto que deja de usar (AvailableForSale… solo hasta FY2021 en Pure): sacarlos del balance de cada 10-K.
- Con pagos en acciones de más del 10 % de las ventas, la historia del PER GAAP está inflada por años de beneficio mínimo (115-129x) y la regla v3 da objetivos a 12 meses muy por encima del consenso: el filtro que decide es el valor intrínseco y la calidad, no la rentabilidad a 12 meses.
