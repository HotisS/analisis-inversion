# Diario: Orion Oyj (ORNBV.HE), análisis value del 20-oct-2026

- Commit de partida: `e370950c9b63b6a4fa57016f4fc736e4fbf83c8d` (16:42 UTC). El checkout se comparte con otro análisis en paralelo, así que desde este hilo no hay pull, commit ni push.
- Inicio: 16:43 UTC. Fin: 17:20 UTC (unos 40 minutos de trabajo efectivo, con una pausa por cambio de contexto).
- Es un análisis nuevo con el método completo: no hay informe anterior de Orion en `informes/` y el intento del 19-oct no se usa. El analista escribió las notas A-E sin subagentes (`notas/construir-notas.mjs`), con la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

- **Cuentas.** XBRL ESEF de filings.xbrl.org (2019-2025) con `cuentas.mjs --esef`. Del informe anual y de los comunicados de cada año se completó lo que faltaba:
  - EBITDA y amortizaciones;
  - gastos comerciales sumados a los de administración;
  - intangibles, reservas y gastos financieros.
- **Arrendamientos.** Deuda de 2025 separada en préstamos (296,0) y arrendamientos (9,4). Antes de 2025 la deuda con intereses incluye los arrendamientos.
- **Precio y acciones.** Precio de la B (88,30, cierre del 20-oct). El BPA usa el total de acciones (A y B tienen los mismos derechos económicos): 141,13 M emitidas menos 0,77 M de autocartera = 140,37 M.
- **Hitos.** Van dentro de las ventas y del EBITDA publicados (183,4 M en 2025).
  - El LTM a junio de 2026 marca como no recurrente el de 180 M de Bayer.
  - 2023 resta los 30,7 M de pensiones.
  - La historia del PER y los casos a 12 meses usan el **BPA sin hitos** (hitos × 0,8 ÷ acciones), la misma base que la guía y el consenso.
- **DCF en dos piezas** (`supuestos.mjs`), con 12 años explícitos (2026e-2037e) para que el valor terminal sea el del laboratorio sin Nubeqa.
  - Nubeqa: llega a 1.180 M en 2028 y cae con las patentes del compuesto (EE. UU. 2033; Europa y Japón 2035), según la tabla de Bayer.
  - Resto: crece un 3,5 % y su margen después del I+D pasa del 5,5 % al 18 %.
  - Calibración: 2026e da 4,06 EUR (consenso 4,06) y 2028e da 5,06 (Inderes, unos 5,07).
- **Escenarios con perfil año a año.**
  - Bajista: IRA y competencia de la clase recortan Nubeqa; el resto crece al 2 % con 2 puntos menos de margen; WACC +0,5.
  - Alcista: Nubeqa +10 % y opevesostat aprobado (hito de 100 M en 2029 y regalías hasta 430 M).
- **Precio de Medicare (IRA) desde 2029.** Es un supuesto propio sobre las reglas de la ley (aprobación en julio de 2019); ni Orion ni Bayer lo confirman. Se dice así en el informe.
- **WACC del 7,80 %.** Bund al 3,45 %, beta 0,80, prima de mercado del 5,5 %, deuda casi nula.
- **Pesos.** DCF 50, escenarios 40, comparables 10. Las transacciones pesan 0: solo hay dos con múltiplo.
- **Huecos resueltos.** La lista de accionistas, que la web carga con un iframe, sale de las tablas a 31-dic-2025 del informe anual. El tamaño del sector sale de EFPIA Key Data 2026.
- **Controles.** 19 de 20 correctos y 1 explicado: la caja proyectada frente a la histórica, porque el hito se cobró en 2026 y el circulante creció con Nubeqa.

## Resultado

**Recomendación.** Mantener, con convicción media.
- Objetivo a 12 meses: 106,50 EUR (+22,6 % ponderado con dividendo; base +19,5 %).
- Valor intrínseco: 44,36 EUR (−49,8 %).
- DCF: 41,11 EUR.

**`robustez.mjs --actual`.**
- SÓLIDA, con acción robusta «No mantener».
- Límite común (A): 44,36 EUR.
- Con el BPA −10 %: 10,5 % ponderada y 7,7 % en el base.

**Regla 13: no cambia.** La acción está en máximos por hechos de la empresa (Nubeqa y subidas de la guía). El 3T26 se publica el 28-oct, no el 21 ni el 22.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2019-2025 | `cuentas.mjs --esef` (filings.xbrl.org) + informes anuales de Orion | 31-dic-2025 |
| Último periodo (LTM, balance del puente) | Half-Year Financial Report 1-6/2026 | 30-jun-2026 (publicado el 17-jul-2026) |
| Precio, rentabilidades, beta, cierres anuales | `bolsa.mjs` (Yahoo) | cierre del 20-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs ORNBV.HE` | 20-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 20-oct-2026, 16:48 UTC |
| Consenso de PER y BPA 2028e | Inderes | 20-jul-2026 |
| Tipos de cambio | BCE | 20-oct-2026 |
| Tasa libre (Bund a 10 años) | Bundesbank | 20-oct-2026 |
| Prima implícita del mercado | Damodaran ERPbymonth | oct-2026 |
| Ventas de Nubeqa (Bayer) y patentes | Informe anual de Bayer 2025 | 31-dic-2025 |
| Mercado farmacéutico | EFPIA Key Data 2026 (IQVIA) | 2025e |
| Accionistas | Informe anual de Orion 2025 (tablas) y comunicación de BlackRock | 31-dic-2025 y 17-jun-2026 |
| Noticias de 12 meses | Comunicados de Orion (Tenax, Qilu, ODM-216, recompra, fecha del 3T26) | 10-ago a 14-oct-2026 |
| Sentimiento | Foro de Inderes | 10-ago a 6-oct-2026 |
| Precio para la decisión | `precios.mjs ORNBV` + `robustez.mjs --actual` | cierre del 20-oct-2026 (88,30) |
