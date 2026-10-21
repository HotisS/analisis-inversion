# Diario: MONY Group (MONY.L), análisis value del 21-oct-2026

- Commit de partida: `cd70c9516e5a693103e1603a268fd76bdf52123a`. Checkout compartido con otro análisis en paralelo: sin pull, commit, push, checkout ni stash desde este hilo (durante el trabajo otro hilo hizo commits; la entrada MONY de `simbolos.json` quedó dentro de uno de ellos).
- Inicio: 07:36 UTC. Fin: 08:07 UTC (reloj del sistema).
- Iteración nueva, método completo. Del intento pausado del 20-oct (`informes/mony-2026-10-20/`, que no se borra) solo se reutilizan los documentos de `notas/docs/`, que siguen siendo los últimos publicados (resultados anuales 2025, informe anual 2025 y semestral 2026). A ellos se suman los RNS de junio a octubre de 2026, la respuesta de MSM a la CMA y el gilt del Banco de Inglaterra. El intento del 19-oct no se usa. Las notas A-E las escribe el analista, sin subagentes, con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Cuentas oficiales**: XBRL ESEF 2020-2025 (`cuentas.mjs --esef 54930016B7VO33FBE722`), cuenta por función, en GBP. Hay un hueco: los arrendamientos de 2021.
2. **Partidas no recurrentes dentro del EBITDA**: IVA irrecuperable con HMRC (1,0 / 3,0 / 4,4 M en 2023-2025) y gastos de la compra de Quidco en 2021 (3,6 M).
   - El DCF trata el IVA como un coste que **se repite**: margen ajustado −1,0 punto en 2026e y −0,5 puntos después.
   - La provisión pendiente (5,6 M después de impuestos) va al puente.
3. **BPA en base ajustada** (17,9 peniques en 2025, el publicado es 15,3), que es la base del consenso.
   - Fórmula: (EBITDA ajustado − amortización subyacente del 3 % − gasto financiero) × 0,75 ÷ acciones.
   - Calibrada con 2025: da 17,9.
4. **Ejercicio objetivo 2028e. PER actual = precio ÷ BPA de los próximos 12 meses** (2,3/12 de 2026e + 9,7/12 de 2027e), que da 10,4x. Las alternativas (solo 2026e o solo 2027e) también dan Comprar en v3.
5. **Se excluyen de la historia adelantada los cierres de 2019 y 2020** (25,2x y 21,9x). El BPA del año siguiente se hundió por el COVID en 2020 y por el colapso del cambio de comercializadora de energía en 2021. Si se incluyeran, la mediana subiría y el objetivo también: la exclusión es conservadora.
6. **Bajista severo por la IA**: −4,5 puntos de crecimiento (ventas −1,5 % al año), −3,5 de margen, crecimiento a perpetuidad del 0,5 % y probabilidad del 30 %.
   - El primer borrador era −3 / −3 con un crecimiento a perpetuidad del 1 %, y no recogía en serio la sustitución del canal.
   - En el WACC se suman 0,5 puntos de prima adicional por la dependencia de Google y de la IA.
7. **Puente a 30-jun-2026**:
   - Deuda 48,0; arrendamientos ≈ 19,0; caja 18,5; asociadas 3,3 (ITG, 49,9 %).
   - `otros_ajustes` 16,4: pagarés de Podium 2,3 + IVA 5,6 + recompra de julio y agosto 8,5. La recompra se suma para cuadrar con las acciones del 30-sep (511,6 M + 2,8 M de dilución).
8. **Comparables**: no hay ningún comparador puro cotizado salvo Future. Se usan tres grupos: Future; los captadores de clientes de EE. UU. (EverQuote, MediaAlpha, LendingTree); y los portales de anuncios europeos (Auto Trader, Rightmove, Baltic, Scout24, Hemnet).
   - Pesan un 15 %.
   - No hay EV/EBITDA NTM gratis del mismo proveedor, así que el gráfico del mapa se omite (aviso de `rellenar.mjs`).
9. **Precio**:
   - El informe usa el cierre del 20-oct: 200,6 peniques, de `regularMarketPreviousClose` de Yahoo y de `movimiento.mjs`. Yahoo aún no tiene la fila diaria del 20-oct y `precios.mjs` da el cierre del 19-oct, 201 peniques.
   - La decisión se toma con la sesión: 198,7 peniques a las 08:06 UTC, en `robustez.mjs --actual`.
10. **Regla 13: «no cambia»**. Tendencia alcista y sin aviso P. Las caídas del año (10-feb −8,6 % con Insurify en ChatGPT, 23-sep −7,8 % con la «IA agéntica») fueron de sector y sin hecho nuevo de la empresa. No hay colocaciones ni ofertas pendientes. Moltiply tiene el 12 %, sin oferta. El próximo hecho con fecha (el comunicado de diciembre, ≈ 3-dic) queda a más de 15 días.
11. **Recomendación: Comprar según la regla, con convicción baja, y no es compra robusta**. La v2 da Mantener y con el BPA −10 % la rentabilidad cae al 5-9 %. El control «compra robusta» está explicado en `controles_explicados`.

## Resultado

- **Regla a 12 meses (v3, sin marcas del selector)**: ponderada 15,0 % y base 19,0 % al cierre del 20-oct, por lo que da **Comprar** (justo en el umbral).
  - Con la sesión (1,99 GBP): 16,1 % / 20,1 %.
  - v2 de control: 13,5 % (14,6 % con la sesión), que da Mantener.
- **Valor intrínseco**: 2,18 GBP (+8,7 %). DCF 2,36 (WACC 10,54 %, valor terminal 60 %); con la prima del mercado, 2,74. El DCF inverso descuenta un crecimiento del −0,2 % anual.
- **Calidad**: ROIC 35,0 % frente a un WACC del 10,5 %, unos +24 puntos. Sostenibilidad «Sí»: pasa la prueba, con el foso estrechándose.
- **Robustez (`--actual`)**: FRÁGIL. La acción robusta es Mantener en cartera.
  - Límite de compra 2,01 GBP (v2 1,98).
  - Límite robusto común 1,82 GBP (nivel A; B1 1,90).
  - Con el BPA −10 %: 5,5 % / 9,0 %.
- **Controles**: 20 de 21 correctos y 1 explicado (compra robusta). El Word tiene una cobertura del 90,2 % y 2 avisos: la tabla de suma de partes vacía (no aplica) y el mapa de comparables sin EV/EBITDA NTM.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2020-2025 | `herramientas/cuentas.mjs --esef 54930016B7VO33FBE722` (XBRL ESEF, filings.xbrl.org) | Informe anual 2025 (17-mar-2026; cierre 31-dic-2025) |
| Semestre 2026 | Interim results 2026 (RNS) y transcripción | 21-jul-2026 (cierre 30-jun-2026) |
| Documentos primarios | Resultados anuales 2018-2025, informes anuales 2023 y 2025, presentaciones, December Statement 2025, RNS de participaciones, junta, consejo, directivos y derechos de voto | 2020 a 20-oct-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo) | cierre del 19-oct-2026 (falta la fila del 20-oct) |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) + MarketScreener | 21-oct-2026 07:37 UTC (sesión abierta) |
| Tasa libre | Banco de Inglaterra, gilt a 10 años (IUDMNPY) | 16-oct-2026 (5,30 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Tipos de cambio | BCE | 20-oct-2026 |
| Posiciones cortas | FCA | 20-oct-2026 (2,4 %) |
| Sentimiento | Stockwatch, Kalkine, MarketBeat (Motley Fool UK), AJ Bell | feb a 17-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs MONY.L` | 20-oct-2026 (200,60 peniques) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 21-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 21-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs mony-2026-10-21` | precio 2,006 (20-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada MONY) | 21-oct-2026 |
| Precios | `herramientas/precios.mjs MONY` | cierre 19-oct-2026; sesión 21-oct 198,7 peniques (08:06 UTC) |
| Robustez | `herramientas/robustez.mjs … --actual` | sesión del 21-oct-2026 (1,99 GBP) |
