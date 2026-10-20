# Diario: Bytes Technology Group (BYIT), análisis value del 20-oct-2026

- Commit de partida: `e75420c` («Parkin: análisis value completo 20-oct (no compra; límite 3,68 AED)», 14:43:35 UTC).
- Checkout compartido con otro análisis en paralelo: este hilo no hace pull, commit ni push.
- Inicio: 14:44 UTC. Fin: 15:40 UTC (reloj del sistema). La espera hasta el cierre de Londres (15:35 UTC) fue para usar el cierre del día en la robustez.
- Análisis nuevo y desde cero. No se ha usado el intento anterior del 19-oct.
- Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/cardinal-health-2026-10-19/`.
- La parte propia está en `notas/propio.mjs`, `notas/supuestos.mjs` y `notas/textos.mjs`.

## Decisiones

1. **Ejercicio a 28/29 de febrero, con la etiqueta «fin»** (FY2026 = mar-25 a feb-26). El ejercicio objetivo de la regla a 12 meses es el **FY2029e**.
2. **Divisa: GBP con tipo de cambio 1.** Yahoo cotiza en peniques (GBp): 450,4 GBp = 4,504 GBP. La entrada de `simbolos.json` lo anota.
3. **Ingresos brutos frente a netos.**
   - Las ventas NIIF mezclan software neto (agente, desde el FY2023, con el FY2022 reexpresado) con hardware y servicios propios en bruto.
   - La actividad se mide con el beneficio bruto (167,3 M en el FY2026) y con la GII (facturación) como contexto.
   - El margen EBITDA del DCF va sobre las ventas NIIF, igual que la historia. El FY2021 (sin reexpresar) queda fuera de las series.
4. **Circulante negativo y capital invertido negativo.**
   - El circulante comercial es del −35,6 % de las ventas en el FY2026. En el DCF va del −34 % al −30 %, algo menos negativo por más servicios y menos EA.
   - El ROIC del motor no aplica. A mano: resultado operativo después de impuestos ÷ capital fijo (inmovilizado + intangibles + fondo de comercio) = 78,2 % en el FY2026. Está explicado en `controles_explicados`.
5. **Caja neta y puente** (31-ago-2026):
   - Caja de 68,4 M y arrendamientos de 2,1 M; sin deuda financiera.
   - `otros_ajustes` = 6,0 M que se restan como deuda: 19,4 M del pago inicial de CyberOne más 9,0 M (la mitad del pago variable máximo), menos 22,4 M de circulante estacional consumido en el primer semestre, que vuelve en el segundo.
   - Asociadas: 3,0 M.
6. **WACC del 10,81 % sin deuda.**
   - Gilt a 10 años del 5,31 % (15-oct-2026, tomado del informe de Computacenter: la base de datos del Banco de Inglaterra no respondió).
   - Beta de 1,0 (semanal de 5 años 1,01; de 2 años 0,96), prima del 5,0 % y prima adicional del 0,5 % por la concentración en Microsoft.
7. **Sostenibilidad: «En parte», fijada por el analista** (el motor decía «Sí»). Las pruebas de reinversión pasan sin esfuerzo porque el negocio no necesita capital, pero el crecimiento depende de un margen que fija un tercero:
   - Microsoft pesa el 50 % del beneficio bruto y el margen sobre facturación ha caído del 9,0 % al 6,0 %.
   - La comisión de los EA llega a cero en 2026 y Microsoft empuja la venta directa en grandes cuentas.
   - Por eso **no pasa la calidad** del método, aunque el ROIC − WACC sea enorme.
8. **BPA propio**: el diluido NIIF desde la proyección del DCF, con 238,4 M de acciones (230,1 M emitidas tras la recompra, más 8,3 M de dilución) y sin recompras no anunciadas. Coincide con el consenso: FY2029e de 0,26 frente a 0,2594.
9. **PER actual = precio ÷ BPA de los próximos 12 meses** (4,3/12 del FY2027e + 7,7/12 del FY2028e = 0,2359), es decir, 19,1x. Las alternativas también dan Mantener (detalle en la revisión a 12 meses).
10. **Dependencia de Microsoft, cambio de consejero delegado, aviso de beneficios de 2025 e IA**:
    - Microsoft es el riesgo 1, con probabilidad alta y un −29 % en el escenario bajista.
    - El aviso de beneficios de julio de 2025 y el −15,4 % del 24-mar-2026 están en el bajista, que no es cosmético: repite el FY2026.
    - Cambio de consejero delegado: Murphy dimitió en febrero de 2024 por operaciones no comunicadas y Sam Mudd está en el puesto desde mayo de 2024; presidente nuevo desde septiembre de 2026 y director financiero por nombrar. Es un riesgo de gobierno bajo.
    - IA: exposición alta, sentido mixto, −10 % a 3-5 años. Juega en contra por menos puestos y licencias por usuario y por la venta directa de los proveedores de IA; a favor, por Copilot, la seguridad y el gobierno de datos.
11. **Precio**: el informe usa el cierre del 19-oct (4,504 GBP), porque la sesión del 20-oct estaba abierta al empezar (454,0 GBp a las 14:45 UTC). La decisión se comprueba con la sesión del 20-oct en `robustez.mjs --actual`.
12. **Regla 13: veredicto «no cambia».**
    - La subida del 79 % desde el mínimo de marzo tiene causa (resultados, recompra, subida de la guía).
    - Las caídas de septiembre y octubre tienen causa (JP Morgan, el día de resultados).
    - No hay hechos con fecha que puedan mover un 5 % en contra, salvo una posible colocación de Coronation o Camissa, que va anotada como aviso y en los riesgos.
13. **Huecos de comparables**: los comparables no tienen EV/EBITDA de los próximos 12 meses (lo mismo pasa en el informe de Computacenter), así que el gráfico de crecimiento frente a múltiplo no se dibuja. Tampoco hay calificaciones ESG ni vencimientos de deuda (no tiene deuda).

## Resultado

- **Regla a 12 meses (v3, sin marcas del selector)**: ponderada +12,7 % y base +18,4 %, con dividendo y al cierre del 19-oct, es decir, **Mantener** (`apuntar-12m.mjs` la redondea al +12,8 %).
- **Valor intrínseco**: 3,55 GBP (−21,2 %).
  - DCF: 3,55 GBP con un WACC del 10,81 %; 3,90 con la prima del mercado.
  - El DCF inverso pide un crecimiento del 10,1 % frente al 6,1 % del caso base.
- **Controles**: 18 de 18 correctos (el ROIC, explicado).
- **Robustez (`--actual`, con 4,562 GBP al cierre del 20-oct)**:
  - Veredicto: SÓLIDA. Acción vigente y robusta: «No mantener» (no comprar; no es para cartera).
  - Regla a 12 meses al precio de hoy: ponderada +11,2 % y base +16,9 %, es decir, Mantener.
  - Con un BPA −10 %: +0,3 % y +5,3 %.
  - Límite de compra común: 3,55 GBP (= 355 GBp), con nivel B2 a 3,55 y C a 3,54. Límite robusto: 3,55. Filtro de mantener: hasta 4,18.
  - Aviso V1: el valor intrínseco queda un 22 % por debajo del precio.
- Fin: 15:40 UTC.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales FY2021-FY2026 | `herramientas/cuentas.mjs --esef "Bytes Technology"` (XBRL ESEF, filings.xbrl.org, LEI 213800LA4DZLFBAC9O33) | Informe anual 2025/26 (cierre 28-feb-2026), publicado el 11-may-2026 |
| Semestre HY27 | Interim Results HY27 (RNS) y presentación | 13-oct-2026 (cierre 31-ago-2026) |
| Otros documentos primarios | Informes anuales FY2024 y FY2025, resultados FY2023 y HY26, actualizaciones de cifras, RNS de consejo, directivos, recompra, derechos de voto y participaciones significativas | 2023 a 12-oct-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs --accion BYIT.L --indice ^FTMC --sector EXV3.DE --etiqueta fin` (Yahoo) | Cierre del 19-oct-2026 (450,4 GBp) |
| Consenso | MarketScreener (11 analistas) | 20-oct-2026 |
| Comparables | Yahoo (la misma consulta que el informe de Computacenter) | 20-oct-2026 |
| Tasa libre | Gilt a 10 años (5,31 %) | 15-oct-2026 |
| Prima de mercado (contraste) | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Noticias de 12 meses | `herramientas/noticias.mjs --meses 12 --valores BYIT`, RNS (Investegate), The Register, TechMarketView | 20-oct-2025 a 20-oct-2026 |
| Sentimiento | Simply Wall St, AskTraders y prensa | oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs BYIT.L` | 20-oct-2026, 14:45 UTC (454,0 GBp) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 20-oct-2026, 15:07 UTC |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 20-oct-2026, 15:09 UTC |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs bytes-2026-10-20` | Precio de 4,504 (19-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada BYIT añadida) | 20-oct-2026 |
| Precios | `herramientas/precios.mjs BYIT` | Cierre del 20-oct-2026: 456,2 GBp (consultado a las 15:37 UTC, después de la subasta de cierre; el anterior era 450,4 del 19-oct) |
| Robustez | `herramientas/robustez.mjs informes/bytes-2026-10-20 --actual` | Cierre del 20-oct-2026 (4,562 GBP), 15:39 UTC |
