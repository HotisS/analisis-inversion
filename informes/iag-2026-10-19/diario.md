# Diario: International Consolidated Airlines Group (IAG.L), análisis value completo, corte 2026-10-19

- Commit de partida: `604e556c31567bd10e0a2ff62218e8892ad37bd1` (19-oct-2026 16:33:11 UTC). Checkout compartido con otro análisis: sin pull, commit ni push (encargo).
- Inicio: 19-oct-2026, 16:34 UTC. Método: `.claude/commands/analiza-empresa.md` + `verticales/empresa/prompt.md` + lecciones (núcleo, Reino Unido, UE, España, aerolíneas y arrendamientos en `lecciones-casos.md`). Sin informe previo de IAG en `informes/`: análisis nuevo desde cero.

## Tiempos

| Hora (UTC) | Paso |
|---|---|
| 16:34 | Lectura de CLAUDE.md, METODO-VIGENTE.md, MEMORIA.md, `/analiza-empresa`, prompt y lecciones |
| 16:35-16:45 | Cuentas ESEF (`cuentas.mjs --esef`), descarga de informes (RNS y PDF íntegros), bolsa.mjs, Yahoo (consenso, comparables, crudo, divisas), Bund, noticias y sentimiento |
| 16:48-16:55 | Notas A-E (`notas/construir-notas.mjs`) y parte propia (`propio.mjs`, `textos.mjs`) |
| 16:55-17:00 | `integrar.mjs` y `calcular-empresa.mjs` (20 de 21 controles correctos y 1 explicado) |
| 17:00-17:01 | Word (`rellenar.mjs`) y PDF (LibreOffice) |
| 17:01-17:03 | `revision-12m-2026-10-19.md`, `apuntar-12m.mjs`, entrada en `simbolos.json`, `precios.mjs IAG`, `robustez.mjs --actual` |

## Decisiones

- **Cuentas**: ESEF del informe anual 2025 (filings.xbrl.org, 0 errores de validación) para 2020-2025; semestre a 30-jun-2026 del PDF íntegro del 31-jul-2026. La web de IAG da 403 (antibot): informes desde Investegate y rns-pdf.londonstockexchange.com.
- **Cuenta por naturaleza** (`formato_cuenta: "naturaleza"`): `coste_ventas` = combustible y derechos de emisión; `gastos_generales` null. EBITDA = EBIT publicado + amortizaciones (con derechos de uso). Extraordinarios en `no_recurrentes_en_ebitda` (2021 −205, 2022 −31, 2024 +160; LTM +149).
- **Deuda**: el XBRL da los préstamos con arrendamientos; se separan con la nota de arrendamientos (9.637 → 6.995 M). La caja incluye los depósitos remunerados a corto (la del XBRL no).
- **Puente a 30-jun-2026**: deuda 6.960 (bancos y bonos 1.739 + convertible 4 + financiación de aviones 5.217), arrendamientos 6.907, caja y depósitos 9.175, asociadas 372 (participación 50 + otras inversiones 322, Air Europa a valor razonable). Pensiones 0: el superávit de 2.115 M de BA no es del accionista. `otros_ajustes` 2.463 = anticipos estacionales de billetes (10.098 − 8.032 = 2.066: la caja de junio está inflada) + recompras pagadas después de junio (≈ 397 M), coherente con 4.352 M de acciones del 16-oct.
- **Combustible y coberturas**: guía de 8.300-8.600 M en 2026 (70 % del 2S cubierto); margen 2026e del 13,2 % antes de extraordinarios; 2027-2028 con la curva del Brent (87 y 78 USD en dic-27 y dic-28). El DCF baja el margen EBITDA al 19 % (ciclo medio) desde el 23 % de 2025.
- **Arrendamientos de aviones**: con NIIF 16 están en la deuda, así que el capex del DCF suma ≈ 500 M al año de altas de derechos de uso (lección de Aeroméxico). Comparables de EE. UU. sin NIIF 16: su EV/EBITDA no es comparable (dicho en el informe).
- **Recompras**: BPA de 2028e con 4.263 M de acciones (las de hoy menos el resto del tercer programa), sin recompras no anunciadas.
- **Historia del PER**: adelantada en EUR con el BPA ajustado de la empresa; 2017-2018 con cierres de Londres sin ajustar (la ampliación de 2020 distorsiona los ajustados); 2021 excluido; 2019-2020 sin dato (pérdidas). Mediana 4,18x, mínimo 2,75x, media 5,1x; comparables 9,75x.
- **Sostenibilidad «Sí»**: crecimiento del 3,2 % dentro del objetivo de capacidad (2-4 %) y pruebas del motor superadas; la reserva de ciclo va en el margen, no en el crecimiento.
- **Control explicado**: BPA de 2022 (0,08 calculado frente a 0,06 publicado) por el ajuste del convertible en el numerador del diluido.
- **Precio**: cierre de Londres del 19-oct-2026 (412,2 peniques, 15:30 UTC), el mismo en el informe y en `robustez --actual`; GBPEUR 1,186 (16:40 UTC).

## Resultado

- Regla v3: ponderada −2,1 %, base +1,4 % → Mantener (v2 de control +2,8 % / +6,3 %). Robustez: SÓLIDA; acción robusta «No mantener» (no pasa el filtro de mantener); límite de compra 351,04 GBp, límite robusto común (v3 y v2 con BPA −10 %) 316,71 GBp. BPA −10 %: −11,7 % / −8,4 %.
- DCF y valor intrínseco 5,99 EUR (+22,5 %). ROIC del motor 27,4 % frente a WACC 8,30 %. Regla 13: «no cambia».

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2020-2025 | `cuentas.mjs --esef` (filings.xbrl.org, informe anual 2025) | 31-dic-2025 (publicado en 2026) |
| Resultados 2025 (PDF íntegro) | RNS 6078U (rns-pdf.londonstockexchange.com) | 26-feb-2026 |
| Semestre 2026 (PDF íntegro) | RNS 6982O | 30-jun-2026 (publicado el 31-jul-2026) |
| Trimestres 3T25 y 1T26 | RNS 5744G y 4939D | 6-nov-2025 y 7-may-2026 |
| Historia 2019-2024 | RNS de resultados (Investegate) | 2020-2025 |
| Acciones, recompras, dividendos | RNS: total voting rights, transaction in own shares, buyback | 1-oct a 16-oct-2026 |
| Gobierno y remuneración | Informe anual 2025; RNS de la junta, CFO y PDMR | 2025-2026 |
| Bolsa (rentabilidades, beta, volatilidad) | `bolsa.mjs` (IAG.MC, EXSA.DE, EXV9.DE) | 19-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs IAG.L` | 19-oct-2026 |
| Consenso y comparables | Yahoo quoteSummary (`notas/yahoo-datos.mjs`) | 19-oct-2026 16:41 UTC |
| Brent, gasóleo, divisas | Yahoo (BZ=F, HO=F, GBPEUR) | 19-oct-2026 16:40 UTC |
| Tasa libre | Bundesbank BBSIS (Bund 10 años, 3,49 %) | 19-oct-2026 |
| Prima implícita | Damodaran (4,20 %) | oct-2026 |
| Noticias y sentimiento | Prensa, Seeking Alpha, Stocktwits, ii.co.uk | nov-2025 a oct-2026 |
| Precio de la decisión | `precios.mjs IAG` (412,2 GBp) | 19-oct-2026 (cierre de Londres) |
| Robustez | `robustez.mjs --actual` | 19-oct-2026 17:03 UTC |
