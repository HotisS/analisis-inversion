# Diario · Fortinet (FTNT) · 15-oct-2026

- Commit de partida: 70ba47e. Encargo de subagente: sin subagentes, sin git y sin escribir fuera de la carpeta.
- Tiempo: unos 50 minutos en dos tramos (hubo una compactación de contexto en medio). Las notas A-E se hicieron con `notas/construir-notas.mjs`; el resto con `propio.mjs`, `supuestos.mjs` y `textos.mjs`.

## Pasos

1. `cuentas.mjs` (SEC, XBRL 2016-2025), `bolsa.mjs`, Form 4, anexos 99.1 (4T24-2T26), 10-K 2025, 10-Q 2T26 y proxy 2026.
2. Notas A-E, propio, integrar y calcular. Resultado: 21 de 22 controles correctos y 1 explicado (tipo impositivo de 2023).
3. Word con rellenar.mjs (cobertura 87,7 %) y PDF con soffice.
4. robustez.mjs `--actual`, también con `--bpa-factor 0.9`, y `apuntar-12m.mjs --simular`.

## Decisiones

- Modelo como el de Qualys:
  - caja con las inversiones financieras;
  - ingresos diferidos como pasivo de contrato (circulante −75 % de las ventas);
  - capex con los edificios y las comisiones activadas;
  - comparables con peso 0; DCF 60 / escenarios 40.
- 2026e con un crecimiento fijo del 19 % (guía +18-20 %). Después baja del 10 % al 4 %.
- ROIC: el del motor sale n.d. porque el capital invertido es negativo. El propio, sin ingresos diferidos, es ≈41 %, así que ROIC − WACC ≈ +30 pp.
- Convicción media (no alta): la ponderada está a 2,3 puntos del umbral de Vender.
- Riesgo de IA: medio, de sentido mixto.

## Lecciones (para quien integre)

- El resultado de las participadas por el método de la participación (Linksys y otras, 2021-2025) hay que llevarlo al resultado financiero y al BAI. Si no, el beneficio neto de 2022-2023 no cuadra en el control de sumas.
- Dell'Oro no abre con WebFetch, pero sí con curl. MarketScreener no abre; stocktaper da 429.
- Stock Analysis da el PER adelantado mezclando bases (GAAP y ajustada): el histórico conviene rehacerlo con el BPA GAAP real.
- La robustez avisa D3 («sin cierre en precios.json») porque no se puede escribir en `precios.json` desde un subagente. El precio se comprobó con `bolsa.json` y `movimiento.mjs`.
