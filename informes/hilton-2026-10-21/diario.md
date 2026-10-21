# Diario: Hilton Worldwide Holdings (HLT), análisis value del 21-oct-2026

- Commit de partida: `247c5f507b7b1482f616d3121735e746cbf86c8d` («Salik: análisis value completo 21-oct…»). Este hilo comparte el checkout con otro análisis en paralelo (Yadea), así que no hace pull, commit ni push.
- Inicio: 11:22 UTC. Informe, PDF, revisión a 12 meses y robustez con el cierre del 20-oct: ≈ 11:50 UTC. Robustez con el precio de la sesión: 13:36 UTC.
- Es un análisis nuevo con el método completo; no había informe anterior de Hilton. Las notas A-E las escribió el analista, sin subagentes, con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`. Supuestos, BPA propio y textos en `notas/supuestos.mjs`, `notas/propio.mjs` y `notas/textos.mjs`.

## Decisiones

1. **Base de la cuenta: la «ajustada» de Hilton**, la de la guía, del consenso y de la historia del PER.
   - Ingresos = «total revenues as adjusted»: sin reembolsos de costes (3.700-3.900 M al año, sin margen) y con la amortización de los costes de captación de contratos devuelta.
   - EBITDA = EBITDA ajustado − pagos en acciones (170 M en 2025).
   - Amortizaciones = D&A − amortización de la compra de 2007 + amortización de los costes de captación de contratos.
   - Resultado financiero = −intereses; beneficio = beneficio ajustado; impuestos = el resto (≈ 28 %).
   - Arrendamientos = 0: US GAAP, el alquiler operativo (214 M) ya está en el EBITDA y los financieros están en la deuda.
   - Balance y flujos: XBRL de la SEC (`cuentas.mjs --sec HLT`, CIK 0001585689) con los intangibles corregidos (marcas + contratos + otros).
2. **Hilton Honors y tarjetas.** Los pasivos de Honors (3.077 M) y los ingresos diferidos (2.532 M) son pasivos de explotación: se cancelan con estancias y crecen con el sistema (+481 M en 2025). No van al puente como deuda. Las licencias de las tarjetas de American Express y de HGV están en los ingresos de franquicia y licencia (+104 M en 2025).
3. **Dinero clave.** Va en el flujo operativo en US GAAP; en el DCF se trata como inversión: 5,8-6,0 % de los ingresos (guía de 2026 ≈ 300 M; 416 M en 2025). Circulante del 26 % (clientes − proveedores de 2025), sin contar el crecimiento de los pasivos de Honors, que lo financian: prudente.
4. **ROIC con patrimonio negativo** (−5.388 M a fin de 2025; −6.303 M a 30-jun-2026). El ROIC del motor (38,9 %) se infla. A mano sobre el capital operativo: NOPAT 2.378 ÷ (fondo de comercio 5.081 + intangibles 6.700 + inmovilizado 684 + circulante 1.314 = 13.779) = 17,3 %; ROIC − WACC ≈ +7,3 puntos. Pasa la calidad. Está en `controles_explicados`.
5. **Puente a 30-jun-2026.**
   - Deuda contable 13.343 (13.400 de nominal al 5,03 %); caja 1.064 (55 restringidos); minoritarios 28.
   - `otros_ajustes` 1.674: lo que queda de la devolución de ≈ 3.500 M de 2026 tras 1.826 M en el 1S (≈ 1.607 de recompras + ≈ 67 de dividendos).
   - Acciones: 223 M (225,7 M a 30-jun − ≈ 4,7 M de recompras pendientes + ≈ 2 M de dilución).
6. **WACC 9,95 %.**
   - Tasa libre del 5,12 % (Tesoro a 10 años, 20-oct).
   - Beta de 1,05, entre la mensual a 5 años (1,09) y la semanal a 2 años (0,78).
   - Prima del 5,5 %; coste de la deuda del 5,5 % (bonos de 2031 y 2034); peso de la deuda del 14 %.
   - Con la prima de Damodaran (4,20 %), el WACC es del 8,8 %.
7. **Supuestos:** crecimiento 6,5 / 8,0 / 7,5 / 7,0 / 6,5 / 6,0 / 5,0 / 4,0 %; margen EBITDA del 72,5 % (guía 2026, fijo) al 76 % en 2031e; terminal Gordon 2,5 %. Bajista −1,5 / −2 con perfil de recesión en 2027 (−14 de crecimiento y −4 de margen), WACC +0,5 y terminal 2 %; alcista +1,5 / +1,5. Pesos 45/10/45.
8. **BPA propio sin recompras no anunciadas:** 2026e 9,11; 2027e 10,45; 2028e 11,76 (bajista 9,46, alcista 12,45). Calibrado con 2025 (8,11) y con la guía de 2026 (8,89-9,01 sin las recompras del 2S). Coincide con el consenso (9,05 y 10,42).
9. **PER actual = precio ÷ BPA de los próximos 12 meses:** 2,3/12 × 2026e + 9,7/12 × 2027e = 10,19, es decir, 35,3x. Con solo 2027e serían 34,4x; la señal no cambia.
10. **Historia adelantada.** Cierres de Yahoo ajustados por las escisiones de 2017. Se excluyen 2019 y 2020 (BPA de la pandemia). Mediana de 5 años 30,5x; mínimo 20,4x (2022); media larga 25,9x.
11. **Comparables.** La mediana del PER adelantado es 16,4x en una muestra partida: Marriott, IHG e Hyatt a 25-36x y el resto a 12-18x. Pesan un 10 %. Las transacciones (Graduate, Radisson Américas) no tienen múltiplo publicado y pesan 0.
12. **Regla 13: veredicto «no cambia».**
    - Avisos P1 (+17,0 % en un mes) y P2 (en máximo histórico); tendencia alcista, +12,8 % sobre la media de 200 sesiones.
    - La subida de octubre es de todo el sector, sin noticia propia: Marriott +17,2 %, Hyatt +13,6 %, IHG +11,7 % y PEJ +7,5 % frente al S&P 500 +1,0 %. El 20-oct Hilton subió un 3,8 % al anunciar el paso al Nasdaq (5-nov) y la posible entrada en el Nasdaq-100.
    - Directivos: ventas de 38,7 M USD en 12 meses (36,3 M de opciones que vencían del consejero delegado), ninguna compra. Sin colocaciones ni ampliaciones; los bonos de 2031 y 2034 son deuda ordinaria.
    - Los resultados del 3T del 27-oct no aplazan la decisión (regla 11).
13. **Riesgo de IA: «Mixto», exposición media, −5 a −10 % a 3-5 años.** Los agentes de reserva (Google, OpenAI) pueden quitar reservas directas y devolver poder a los intermediarios; el 10-K de 2025 ya cita los grandes modelos de lenguaje. Hilton tiene el AI Planner (marzo de 2026), la conexión directa con Navan y un director de tecnología nuevo (octubre de 2026).
14. **Huecos:** calificación crediticia, vida media de la deuda, crecimiento de tres trimestres antiguos, calificaciones ESG, múltiplos de transacciones y consenso de 2028 (tres búsquedas cada uno, en `meta.huecos`).

## Resultado

- Recomendación: **Mantener**, convicción media. Valor intrínseco 135,91 USD (DCF 136,96; con la prima del mercado 174,92) frente a 359,29.
- Revisión a 12 meses (v3, 2028e): ponderada −4,3 %, base +7,6 % (343,20 y 385,73 USD); v2 −9,2 %. Apuntada con `apuntar-12m.mjs`.
- Robustez con el cierre del 20-oct: sólida; acción robusta «No mantener»; límite de compra común 135,91 USD; BPA −10 %: −13,8 % / −3,2 %.
- Robustez con la sesión del 21-oct (357,01 USD, 13:36 UTC): sólida; ponderada −3,7 %, base +8,2 %; BPA −10 %: −13,3 % / −2,6 %; acción robusta «No mantener».
- Controles del motor: 19 de 19 correctos.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2016-2025 y 1S26 | `herramientas/cuentas.mjs --sec HLT` (XBRL del 10-K y 10-Q, CIK 0001585689) | 10-K 2025 (11-feb-2026, cierre 31-dic-2025); 10-Q del 2T26 (28-jul-2026, cierre 30-jun-2026) |
| Documentos primarios | `herramientas/descargar.mjs` desde EDGAR: 10-K 2021, 2023 y 2025, 10-Q 2T26, notas de resultados 2018-2025, 3T25, 1T26 y 2T26, proxy 2026, 8-K (junta, Silcock, bonos, revolving, Nasdaq) | 2019 a 20-oct-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo): HLT frente a SPY y PEJ | cierre del 20-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 21-oct-2026 11:26 UTC (antes de la apertura) |
| Competidores (ingresos y EBIT) | XBRL de la SEC (MAR, WH, CHH, ABNB) y ESEF (Accor); IHG de su informe anual | ejercicio 2025; IHG 1S26 |
| Operaciones de directivos | `herramientas/form4.mjs` (Form 4 de la SEC) | 21-oct-2025 a 21-oct-2026 |
| Tasa libre | Tesoro de EE. UU., curva diaria | 20-oct-2026 (5,12 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Sentimiento | Seeking Alpha (RSS), Stocktwits, Simply Wall St, Merlintrader | jun a oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs HLT` | 20-oct-2026 (359,29 USD) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 21-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs hilton-2026-10-21` | precio 359,29 (cierre del 20-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada HLT añadida) | 21-oct-2026 |
| Precios | `herramientas/precios.mjs HLT` | cierre del 20-oct-2026 (359,29) |
| Robustez | `herramientas/robustez.mjs … --actual` | cierre del 20-oct-2026 (11:48 UTC, antes de la apertura); sesión del 21-oct: 357,01 USD a las 13:36 UTC (ponderada −3,7 %, base +8,2 %, «No mantener», límite 135,91) |
