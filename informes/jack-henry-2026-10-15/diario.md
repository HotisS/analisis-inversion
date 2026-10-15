# Diario: Jack Henry & Associates (JKHY), corte 2026-10-15

- Commit de partida: 9fdf1ce (al empezar); el coordinador actualizó después a a406355. Hecho a mano, sin subagentes (notas A-E escritas por `notas/construir-notas.mjs`; parte propia en `notas/propio.mjs`, `supuestos.mjs` y `textos.mjs`).
- Origen: carta de Riverwater del 1T-26 y escáner (PER adelantado ≈ 19,6x frente a 29-48x en 2016-2025; ROIC − WACC ≈ +14; sin deuda). Ficha sectorial reutilizada: `sectores/software-2026-10-14.md`.
- Se reutilizaron las notas de ayer (bolsa.json, cuentas-xbrl.json, form4.json, docs/) tras comprobarlas; precio actualizado al último cierre (155,26 USD, 14-oct; la sesión del 15-oct no había abierto).

## Decisiones
- Ejercicio a junio, etiquetado por el año en que termina (FY2026 = jul-25 a jun-26). Objetivo a 12 meses sobre el FY2028e.
- EBITDA = EBIT + depreciación + amortización del estado de flujos (el XBRL solo da la depreciación).
- Capex = equipos + software comprado + software desarrollado + ≈ 2 % de las ventas por el aumento de los costes de contratos activados (no pasan por el capex del estado de flujos y son inversión real).
- Desconversiones (fusiones bancarias) recurrentes: dentro del BPA y del EBITDA; solo la plusvalía de 6,8 M de FY2026 se trata como no recurrente.
- Beta 0,71 (ajustada, mensual a 5 años; la bruta es 0,57). WACC 9,07 % con bono al 5,21 % y prima del 5,5 %; con la prima implícita del mercado (4,2 %) el DCF sube a 155,83, justo el precio.
- Sostenibilidad del crecimiento: veredicto «Sí» (puente volumen 2,5-3,5 % + precio 3,5 %), igual que el del motor: el control no salta.
- Riesgo de IA: exposición Media, sentido Mixto, efecto ≈ −5 % del valor a 3-5 años (banca digital ≈ 30 % de las ventas; el core y los pagos, protegidos por la regulación y los costes de cambio).
- Comparables sin EV/EBITDA NTM (no hay consenso de EBITDA publicado en fuentes abiertas): los gráficos `comps_ev` y `comps_mapa` no se dibujan (aviso del motor, dato que no existe).
- Robustez: aviso D3 (sin cierre en `precios.json`, que no se toca desde este hilo) y V1 (valor intrínseco 17 % bajo el precio). Sin CORREGIR.

## Resultado
- Mantener, convicción baja. DCF 131,92 (−15,0 %); valor intrínseco 129,57 (−16,5 %). ROIC 23,6 % (39,1 % sin fondo de comercio), ROIC − WACC ≈ +14,5: calidad «Sí».
- 12 meses (v3, selector sin marcas): objetivo 190,79, ponderada +24,4 %, base +19,2 %. v2: 175,94, +14,8 % / +8,6 %. Consenso: 189,67.
- Comprar por debajo de 129,57; vender por encima de 214,63. Próximos resultados: 3-nov-2026 (1T FY2027).
- Línea de revisión 12 m: `revision-12m-2026-10-15.md` (apuntar-12m solo con `--simular`).

## Lecciones
- El XBRL de la SEC de Jack Henry no trae la amortización del software activado ni de intangibles, ni el capex de software desarrollado: hay que sacarlos del estado de flujos del 10-K.
- Los costes de contratos activados (ASC 340-40) son inversión recurrente en empresas de software bancario: van al capex del DCF aunque no estén en el capex del estado de flujos.
- `call-q4-mb.txt` (MarketBeat) bajó basura: para la conferencia usar resúmenes de Quartr/AllInvestView o la transcripción de la propia empresa.
- El script de Yahoo quoteSummary (`earningsTrend`) da el BPA de consenso por ejercicio y su revisión a 90 días; falla con algunos tickers con campos nulos (FISV): usar el informe previo del repositorio.
- En una nota, citar fuentes de otra letra ([A5] dentro de B) no lo traduce `integrar`: copiar la fuente en la lista de la propia nota.
