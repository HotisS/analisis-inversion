# Diario: Swisscom (análisis value desde cero, corte 2026-10-20)

- **Commit de partida:** 44b551af197575460b55a4d6e5a49fb0d5cff3be («Cola de índices: Hollywood Bowl (pareja 15)»).
- **Checkout compartido con otro análisis:** sin pull, commit ni push desde esta tarea. A mitad de la tarea el coordinador hizo un rebase; se comprobó que la entrada de `simbolos.json` estaba y se volvieron a ejecutar `precios.mjs` y `apuntar-12m.mjs`.
- **Horario:** empieza a las 08:58 UTC y termina hacia las 09:35 UTC del 20-oct-2026, con la bolsa de Zúrich abierta.

## Decisiones
- **Cuentas a mano.** Swisscom no publica en ESEF ni en la SEC, así que `cuentas.mjs` no sirve (Suiza). Las cifras salen de los PDF de los informes anuales 2021-2025, con 2024 reexpresado en el informe de 2025, y del informe del 1S26. Cuadran con el BAI y el beneficio publicados.
- **Base EBITDAaL**, la métrica de la empresa, de su guía y del consenso:
  - ebitda = EBITDAaL; ebit = EBIT NIIF − intereses de arrendamientos.
  - Arrendamientos fuera de la deuda (3.480 M) y sus pagos restados del flujo libre.
  - Se explica en `financieros.ajustes` y en `meta.limitaciones`.
- **No recurrentes:** no se devuelven al EBITDAaL los 126 M de integración y ajustes de 2025, porque se repiten hasta 2027-2028.
- **Comparables por PER solo:** 11 telecos europeas. Sunrise queda fuera porque pierde dinero en 2026. El EV/EBITDA de Yahoo (NIIF 16) no está en la misma base y se deja en null.
- **WACC del 4,31 %:**
  - Tasa libre del 0,6 % (Confederación a 10 años, SNB, 30-sep).
  - Beta de 0,70; prima de 5,5 + 0,8 puntos por Italia.
  - Deuda al 2 % y con un peso del 26 %.
- **Crecimiento terminal del 0,5 %:** es la media entre el 0 % de Suiza y el 2 % de Italia de las pruebas de deterioro. Choca con la regla de que g quede por debajo de la tasa libre menos medio punto; con g del 0 %, el DCF da 644 CHF.
- **Pesos de la síntesis:** DCF 50, escenarios 40 y comparables 10. Los comparables pesan poco porque los tipos europeos no son los suizos.
- **BPA propio un 3-5 % bajo el consenso**, por el resultado financiero al ritmo del 1S26.
- **Regla 13:** no cambia. Los movimientos tienen causa (dividendo, fecha ex, rebajas y salida del SMI) y no hay hecho pendiente.
- **Ficha sectorial:** no hay ficha de telecomunicaciones en `sectores/` y el encargo no permite crearla. Queda como límite.
- **Resultado:**
  - Recomendación: Mantener (no compra).
  - Rentabilidad a 12 meses: −5,1 % ponderada y +3,3 % en el base.
  - Valor intrínseco: 682,32 CHF.
  - Calidad: ROIC − WACC de 1,7, no pasa.
  - Acción robusta: No mantener. Límite robusto: 432,74 CHF.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Datos de bolsa (precio, rentabilidades, beta, cierres) | `bolsa.mjs` (Yahoo: SCMN.SW, CHSPI.SW, EXV2.DE) | Cierre del 2026-10-19 |
| Consenso, objetivos y comparables | `yahoo-datos.mjs` (quoteSummary) | 2026-10-20, 08:49 UTC |
| Consenso de la empresa | PDF de Swisscom (Analyst Consensus Q3 y Q2 2026) | 2026-10-08 y 2026-07-08 |
| Cuentas anuales | Informes anuales de Swisscom 2021-2025 (PDF) | 31-dic-2021 a 31-dic-2025 |
| Último periodo | Informe del 1S26 y nota de prensa | 30-jun-2026 (publicado el 2026-08-06) |
| Tasa libre | SNB, cubo rendeiduebd (10 años) | 2026-09-30 |
| Tipos de cambio | BCE | 2026-10-19 |
| Movimiento del precio (regla 13) | `movimiento.mjs` | 2026-10-20 (sesión en curso, 671,50) |
| Notas A-E | `notas/construir-notas.mjs` | 2026-10-20 |
| Integración y cálculo | `integrar.mjs`, `calcular-empresa.mjs` (19/19 controles) | 2026-10-20 |
| Word y PDF | `rellenar.mjs`, soffice | 2026-10-20 |
| Objetivo a 12 meses apuntado | `apuntar-12m.mjs` | 2026-10-20 |
| Precios | `precios.mjs SCMN` | Cierre del 2026-10-19; sesión del 20-oct en 671 |
| Robustez | `robustez.mjs --actual` | 2026-10-20 (671,00 CHF) |
