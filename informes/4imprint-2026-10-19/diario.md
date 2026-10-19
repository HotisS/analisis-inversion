# Diario: 4imprint Group plc (FOUR.L), análisis value del 19-oct-2026

- **Commit de partida:** `30ed604dcf24abc5cb040849692f83dae8dabe5a`. El checkout se comparte con otro análisis en paralelo (JYP), así que desde este hilo no se ha hecho pull, commit, push, checkout ni stash. Fuera de la carpeta solo se ha escrito en `simbolos.json` (la entrada FOUR), `precios.json` (lo escribe `precios.mjs`) y `objetivo12m-revisados.json` (lo escribe `apuntar-12m.mjs`).
- **Horario:** inicio a las 18:14 UTC y fin hacia las 18:45 UTC (reloj del sistema).
- **Alcance:** análisis nuevo con el método completo. No había informe anterior de 4imprint. El analista escribió las notas A-E sin subagentes, con `notas/construir-notas.mjs` y la forma de `informes/cardinal-health-2026-10-19/`. Los textos están en `notas/textos.mjs` y los supuestos en `notas/supuestos.mjs`.

## Decisiones

1. **Divisas.** Las cuentas están en USD y la acción cotiza en peniques (GBp). Se usa `meta.divisa_cotizacion` = GBp y `meta.tipo_cambio` = 0,013308 USD por penique (GBPUSD de 1,3308 en Yahoo el 19-oct), el mismo patrón que Harbour Energy. Los cierres históricos se pasan a USD con el GBPUSD de cada fin de año.
2. **Precio.** Cierre de Londres del mismo día del corte, porque la bolsa ya había cerrado: 4.540 GBp (la web de inversores marca 16:36 GMT; Yahoo y `precios.mjs` coinciden) = 60,42 USD.
3. **Ejercicios de 52 o 53 semanas a finales de diciembre**, etiquetados por el año natural. `cuentas.mjs --esef` desplazó un año las etiquetas de 2020 y 2021 y no da activo ni pasivo total. Por eso la cuenta y el balance de 2021-2025 salen del registro de cinco años del informe anual, contrastado con el XBRL.
4. **Caja = efectivo + depósitos bancarios.** Es la medida de la empresa; el XBRL da solo el efectivo. Puente al 27-jun-2026:
   - caja de 136,9 M y arrendamientos de 2,9 M, sin deuda;
   - `otros_ajustes` de 27,5 M = dividendo a cuenta de 80 centavos (22,4 M), ya declarado y pagado el 14-sep, que quien compra hoy no cobra, + 5,1 M de pasivo fiscal neto por tratamientos inciertos.
5. **BPA ajustado.** 2026e no incluye los 5,1 M de partidas fiscales no recurrentes del 1S26: 3,47 USD, en línea con la guía (≈ 130 M de beneficio antes de impuestos) y con el consenso (3,48). Hasta 2025 el publicado y el ajustado coinciden.
6. **PER actual con el BPA de los próximos 12 meses:** 0,2 × 2026e + 0,8 × 2027e = 3,63, así que 16,6x. Es la misma base que la historia adelantada. Las alternativas (solo 2027e, 16,5x; solo 2028e, 15,5x) dan igualmente Mantener.
7. **Exclusiones en la historia del PER.**
   - Adelantada: 2019 y 2020 (BPA del año siguiente de 0,11 y 0,80 USD, por la pandemia).
   - Al cierre (v2): 2020 y 2021.
8. **ROIC.** El del motor (285 %) es real pero poco informativo, porque el capital invertido es casi nulo (circulante negativo y caja fuera). Medida exigente a mano: rentabilidad del capital empleado del 87 % antes de impuestos (≈ 65 % después). ROIC − WACC pasa con decenas de puntos de margen. Explicado en `controles_explicados`.
9. **Sostenibilidad del crecimiento: «En parte»** (el motor decía «Sí»). La calidad financia el crecimiento sin capital, pero llevamos tres años de ventas planas y de caída de los pedidos de clientes nuevos (−12 % en 2025, −7 % en el 1S26). El crecimiento proyectado depende de que la captación vuelva a funcionar con la IA cambiando la búsqueda. Convicción Media; la sugerida por el motor era Baja.
10. **Riesgo de IA (exposición Alta, amenaza).**
    - Un 7 % menos de ventas por dólar de marketing (de 7,86 a 7,0 USD) recorta el BPA en ≈ 15 %.
    - Mitigantes: marca, un 80 % de pedidos de clientes que repiten y diseño en línea propio.
    - El diseño con IA abarata el trabajo de los competidores digitales (Custom Ink, BDA).
11. **Aranceles a China (≈ 50 % del origen de los productos).** Los proveedores los repercuten y 4imprint traslada el precio. El margen bruto bajó del 32,8 % al 31,5 % en el 1S26. El fallo del Supremo sobre los aranceles IEEPA y la sección 122 están en B.
12. **Pymes de EE. UU.** La debilidad de la demanda se recoge en el escenario bajista: −2 puntos de crecimiento y −1 punto de margen. Ya ocurrió en el 1S26.
13. **Sin ficha sectorial.** No hay ficha de distribución de artículos promocionales y el encargo impide escribir fuera de la carpeta. El perímetro, el mercado final (ASI: 27.700 M USD en Norteamérica en 2025) y los comparables se documentan en B y D.
14. **Transacciones: `null`**, porque no hay transacciones con precio comparables. Queda como hueco.
15. **Regla 13** (`movimiento.mjs FOUR.L`): +48,6 % en 12 meses, tendencia alcista y sin avisos P. Los cuatro movimientos fuertes se explican por resultados, guía y recogida de beneficios, sin hecho que cambie la tesis. Veredicto **«no cambia»**.
16. **Fuentes.** Se citan todas; las de propio son P1-P4: cálculo propio, Wikipedia, RNS del cambio de nombre de 2000 y Substack.
17. **Avisos de `rellenar.mjs`** que no se arreglan:
    - Gráfico de vencimientos vacío: no hay deuda.
    - Mapa de comparables con menos de dos puntos completos: a los comparables les faltan datos de crecimiento y rentabilidad homogéneos.
    - Suma de partes que no aplica.

## Resultado

- **Controles:** 21 de 21 correctos.
- **Valoración:**
  - DCF de 54,04 USD (−10,6 %), con WACC del 11,09 %.
  - Valor intrínseco de 53,53 USD (−11,4 %).
  - Objetivo a 12 meses de 56,09 USD (4.215 GBp): ponderada del −3,2 % y base del +2,3 / 2,4 %.
- **Recomendación:** Mantener.
- **Robustez (`--actual`):** SÓLIDA, con acción robusta **No mantener**.
  - Límite de compra de 3.822,92 GBp (v2: 4.022,39).
  - Límite robusto de 3.457,86 GBp.
  - Filtro de mantener hasta 3.996,69 GBp.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2020-2025 | `herramientas/cuentas.mjs --esef "4imprint"` (filings.xbrl.org, LEI 213800G95T751RN2CT94) | Informe anual ESEF de 2025 (cierre el 27-dic-2025, publicado el 14-abr-2026) |
| Semestre | Half year results del 1S26 (RNS y web de inversores) | 5-ago-2026 (cierre el 27-jun-2026) |
| Documentos primarios | Informes anuales 2022-2025, notas de resultados de 2025, avances de ene-2026 y may-2026, semestrales de 2024-2026, RNS de directivos y accionistas | 2022 a 5-ago-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs --accion FOUR.L --indice ^FTMC --sector IWM` (Yahoo) | Cierre del 19-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) y MarketScreener | 19-oct-2026, después del cierre de Londres |
| Mercado y competidores | ASI, PPAI y Counselor Top 40 | Datos de 2025, publicados en 2026 |
| Tasa libre | Tesoro de EE. UU., curva diaria (CSV) | 16-oct-2026 (5,09 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Sentimiento | Prensa británica, Simply Wall St y blogs (E) | ago a oct-2026 |
| Movimiento (regla 13) | `NODE_USE_ENV_PROXY=1 node herramientas/movimiento.mjs FOUR.L` | 19-oct-2026 (4.540 GBp) |
| Integración y cálculo | `motor/integrar.mjs` y `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs` y `soffice --headless --convert-to pdf` | 19-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs 4imprint-2026-10-19` | Precio de 60,42 USD (4.540 GBp, 19-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada FOUR añadida) | 19-oct-2026 |
| Precios | `NODE_USE_ENV_PROXY=1 node herramientas/precios.mjs FOUR` | Cierre del 19-oct-2026 (4.540 GBp) |
| Robustez | `herramientas/robustez.mjs informes/4imprint-2026-10-19 --actual` | Cierre del 19-oct-2026 (4.540 GBp) |
