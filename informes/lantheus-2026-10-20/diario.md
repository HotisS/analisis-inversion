# Diario: Lantheus Holdings (LNTH), análisis value del 20-oct-2026

- Commit de partida: `fed4bc904657e6ab7b715918846e87cb1f24af71` (20-oct-2026 16:08 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: 16:09 UTC.
- Análisis nuevo, método completo (no hay informe anterior de Lantheus en `informes/`). Notas A-E escritas por el analista (sin subagentes), siguiendo la forma de `informes/cardinal-health-2026-10-19/`.

## Desarrollo (20-oct-2026, horas UTC)

- 16:09-16:15 · Cuentas oficiales con `cuentas.mjs --sec LNTH` (XBRL 2016-2025; avisos: capex incompleto 2022-2025, rellenado a mano con las notas de resultados; la D&A de 2025, 70,1, incluye 47,1 de intangibles comprados). Bolsa (`bolsa.mjs`), movimiento (`movimiento.mjs`), noticias de 12 meses (`noticias.mjs`), Form 4 (ninguna compra ni venta en mercado en 12 meses). Descarga de 10-K, 10-Q, notas de resultados 2020-2026, DEFM14A, proxy 2026 y 8-K. FRED falló con `descargar.mjs`: bono a 10 años sacado del CSV del Tesoro (5,15 % el 19-oct).
- Hallazgo clave: **venta pendiente a Curium (CapVest)** por 102,50 USD en efectivo más un derecho contingente de hasta 12 USD (firmada el 3-ago; junta del 14-oct a favor; HSR vence el 21-oct; cierre en el 1S27).
- 16:19 · Yahoo (consenso y comparables). HOLX sin datos (comprada): fuera. Elekta fuera (coronas, ejercicio a abril). Telix sin PER útil (beneficio casi nulo: PER de 18.422x quitado con un filtro de < 100x). Mediana del PER NTM de los comparables: 14,8x.
- Notas A-E (`notas/construir-notas.mjs`), `propio.mjs`, `supuestos.mjs` y `textos.mjs`.
- **Decisiones:**
  - BPA de la regla = ajustado de la empresa − remuneración en acciones × 0,77 (85,6 M en 2025, que la empresa no resta). La historia del PER va en la misma base.
  - Historia adelantada: 2019 y 2020 excluidos (BPA del año siguiente casi nulo, antes de PYLARIFY). PER actual = precio ÷ BPA de los próximos 12 meses (2,4/12 de 2026e + 9,6/12 de 2027e) = 18,8x. Con solo 2026e la señal sería Mantener (≈ −5 %): la señal está en el borde y se dice.
  - Transacciones: solo una con múltiplos (la propia oferta), así que el motor no las usa; peso 0 y control explicado. Pesos: DCF 45, comparables 20, escenarios 35.
  - Prima adicional de 1 punto en el WACC por concentración (PYLARIFY + DEFINITY = 85 % de las ventas, exclusividad de nueva molécula vencida). WACC 10,28 %.
  - Crecimiento y margen por debajo de la dirección (DEFM14A): no se da por hecho que PYLARIFY aguante el precio.
  - **Recomendación: Mantener con convicción baja, apartándose de la regla (Vender por poco, −10,6 %)**, con `justificacion_recomendacion`: la regla no ve la oferta en efectivo. Regla 13: «descarta» como compra value (el punto HSR, «retrasa» hasta el 21-oct).
- 16:30 · `integrar.mjs` + `calcular-empresa.mjs`: 19 de 20 controles correctos y 1 explicado (capitalización con acciones diluidas: 67,5 M frente a 65,3 M en circulación). Síntesis de 642 palabras.
- 16:33-16:34 · Word (`rellenar.mjs`: cobertura del 87,4 %; avisos solo de datos que no existen: mercado PSMA, EV/EBITDA NTM de comparables, calificaciones ESG, suma de partes) y PDF (LibreOffice).
- 16:34 · `revision-12m-2026-10-20.md`; `apuntar-12m.mjs lantheus-2026-10-20` (v3 −10,6 %, base +3,2 %, Vender; v2 −21,9 %). `precios.mjs LNTH`: cierre de 99,92 (19-oct), sesión en curso a 100,08.
- 16:34 · `robustez.mjs`: al cierre del 19-oct (99,92), SÓLIDA, acción robusta **No mantener** (límite de compra 74,83; límite robusto 67,86; filtro de mantener hasta 81,18; C2 descarta). Con `--actual` (100,08 USD a las 16:34 UTC = 12:34 de Nueva York): lo mismo, v3 −10,8 % y base +3,0 %.
- Fuera de la carpeta, este hilo solo ha escrito su entrada LNTH en `verticales/empresa/simbolos.json` y lo que escriben `precios.mjs` (precios.json) y `apuntar-12m.mjs` (objetivo12m-revisados.json). Sin commit ni push (checkout compartido).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2016-2025 | `herramientas/cuentas.mjs --sec LNTH` (XBRL de la SEC, companyfacts) | 10-K 2025, presentado el 26-feb-2026 (cierre 31-dic-2025) |
| Último trimestre (balance y LTM) | 10-Q del 2T26 y nota de resultados | 6-ago-2026 (cierre 30-jun-2026) |
| Documentos primarios | 10-K 2025, 10-Q 3T25/1T26/2T26, notas de resultados 2020-2026, DEFM14A, DEF 14A 2026, 8-K de la fusión, HSR, demandas y junta | feb-2021 a 14-oct-2026 |
| Proyecciones de la dirección y análisis de Morgan Stanley | DEFM14A | 8-sep-2026 |
| Datos de bolsa (cierres, beta, volumen) | `herramientas/bolsa.mjs` (Yahoo) | cierre del 19-oct-2026 |
| Movimiento del precio (regla 13) | `herramientas/movimiento.mjs LNTH` | 20-oct-2026 (sesión en curso) |
| Noticias de 12 meses | `herramientas/noticias.mjs` y titulares de Seeking Alpha | 20-oct-2025 a 15-oct-2026 |
| Operaciones de directivos | `herramientas/form4.mjs` (Form 4) | 20-oct-2025 a 20-oct-2026 |
| Consenso y comparables | Yahoo Finance quoteSummary (`notas/yahoo-datos.mjs`) | 20-oct-2026 16:19 UTC |
| Tasa libre | Daily Treasury Par Yield Curve (10 años 5,15 %) | 19-oct-2026 |
| Prima implícita del mercado | Damodaran, ERPbymonth (4,20 %) | oct-2026 |
| Sentimiento | Stocktwits y Seeking Alpha | ago-oct 2026 |
| Precio de la decisión | `herramientas/precios.mjs LNTH` | cierre 19-oct-2026 (99,92 USD); sesión 20-oct 100,08 USD (12:34 Nueva York) |
| Robustez | `herramientas/robustez.mjs` y `--actual` | 20-oct-2026 16:34 UTC |
