# Diario · BSE Limited (BSE.NS) · 20-oct-2026

- Commit de partida: 9516a7b («Cola de índices: Computacenter (pareja 14)»). Checkout compartido con otro análisis en paralelo (Hollywood Bowl): sin `git pull`, `commit`, `push`, `checkout` ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada BSE, edición atómica tras releer; la entrada BOWL del otro hilo queda intacta) y en lo que escriben `precios.mjs BSE` (`precios.json`) y `apuntar-12m.mjs bse-2026-10-20` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`. Sin herramientas de IBKR ni de hearthbot.
- Tiempos (UTC): inicio 08:20; investigación hasta ≈ 08:35 (con una compactación del contexto por medio); notas A-E, cálculo, Word y PDF ≈ 08:51; revisión, robustez y diario ≈ 08:55.
- Encargo: análisis value completo desde cero (no había informe de BSE), con la regulación de SEBI de las opciones semanales, la competencia de la NSE y el riesgo de IA; separar la caja de clientes y el fondo de garantía de la caja propia; comprobar si se puede comprar desde IBKR siendo residente en España.
- Lecciones leídas: núcleo de `lecciones.md`; `lecciones-paises.md` no tiene sección India; `lecciones-casos.md` (bolsas: el XBRL solo da ingresos de contratos).
- **Precio**: el encargo suponía sesión abierta el 20-oct. No la hay: el calendario de festivos de la NSE (API holiday-master) marca el 20-oct-2026 como Dussehra, y Yahoo no tiene ninguna barra de hoy en BSE.NS, RELIANCE.NS, HDFCBANK.NS ni ^NSEI. El precio de hoy es el cierre del 19-oct (3.336 INR); `robustez.mjs --actual` no encuentra sesión en curso y usa ese cierre.

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Precio, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs --accion BSE.NS --indice ^NSEI --sector ^CNXFIN --corte 2026-10-20 --cierre-mes 3 --etiqueta fin` (sector sin datos) | cierre 19-oct-2026 |
| Precio común | `precios.mjs BSE` | cierre 19-oct-2026 (3.336 INR); 20-oct festivo |
| Movimiento (regla 13) | `movimiento.mjs BSE.NS` | 19-oct-2026 |
| Cuentas FY2022-FY2026 | Informes anuales FY2025-26, FY2024-25, FY2023-24 y FY2021-22 (NSE; `descargar.mjs`) | 2022-06 a 2026-07 |
| Trimestres 2T FY25-1T FY27 | Resultados, presentaciones y transcripciones 2T FY26-1T FY27 (anuncios a la NSE) | hasta 2026-08-10 |
| Anuncios (auditor, MSCI, datos, SEBI, junta, IIBH, Ebix, GST) | API de anuncios de la NSE (167 en 12 meses) y PDF de cada uno | 2025-10 a 2026-10-16 |
| Accionariado | Presentación del 1T FY27 | junio de 2026 |
| Consenso y objetivos | Yahoo earningsTrend/financialData (19 analistas); Business Today, Business Standard, Outlook Business, Equentis | 2026-08-05 a 2026-10-20 |
| Bono indio a 10 años | FRED INDIRLTLT01STM | septiembre de 2026 (7,06 %) |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 (4,20 %) |
| Comparables y tipos de cambio | Yahoo quoteSummary (11 fichas + BSE) y USDINR, EURINR, GBPINR, HKDINR | 2026-10-20 |
| CDSL (participada, 15 %) | Yahoo CDSL.NS | 2026-10-20 |
| Festivos de la NSE | API holiday-master de la NSE | calendario 2026 |
| Compra desde España | Base de conocimiento de Interactive Brokers (acceso a la NSE solo para NRI) | consulta 20-oct-2026 |
| Sentimiento | ValuePickr (API del hilo 13699), prensa india | hasta 2026-10-18 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 20-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 20-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs bse-2026-10-20` | 20-oct-2026 |
| Robustez | `robustez.mjs informes/bse-2026-10-20 --actual` | 20-oct-2026 (precio del 19-oct) |

## Decisiones

- India sin XBRL en `cuentas.mjs`: cuentas de los informes anuales auditados (Ind AS consolidados), en lakhs ÷ 10 = millones de INR. FY2023 de las comparativas del informe de FY2024. El informe de FY2021-22 venía como «.zip» en la NSE y era un PDF.
- **Caja propia**: efectivo + otros saldos bancarios + inversiones + otros activos financieros − otros pasivos financieros (márgenes y depósitos de miembros) − Core SGF (12.468 M). Contraste con las notas de inversiones «owned» de FY2026: ≈ 61.307 M frente a 60.772 M. **Flujo operativo ajustado** sin la variación de pasivos de clientes ni las partidas del Core SGF.
- Cuenta por naturaleza: `coste_ventas` = gastos operativos sin amortización y con la aportación al Core SGF; EBITDA = «Operating EBITDA including Core SGF». FY2024 sin la plusvalía excepcional de CDSL. BPA de operaciones continuadas ÷ 411,98 M de acciones (incluidas las en suspenso de la desmutualización), ajustado por las ampliaciones gratuitas 2:1 de 2022 y 2025.
- Ingresos de derivados: 11.550 M de 15.661 M en el 1T FY27 (74 %), de la presentación; FY2026 ≈ 65 % sumando los trimestres del gráfico de la presentación.
- Ejercicio objetivo **FY2029e**. Ingresos: FY2027e +19 % (2T con −20 % de derivados por la subasta de cierre, estimación del foro, solo como apoyo), FY2028e +8 %, después 12 / 12 / 11 / 10 / 8,5 / 7 %. Margen EBITDA 64,5 % → 66 %. Capex 7 % → 3,5 %; circulante 8 %.
- WACC 15,05 % (bono 7,06 %, beta 1,27, prima 5,5 % + 1,0 por SEBI y un solo producto; sin deuda); g 6 % nominal en INR (explicado en controles). Pesos DCF 50 / comparables 20 / escenarios 30. Escenarios 25/50/25: bajista −8 pp de crecimiento y −4 pp de margen, g 5 %; alcista +5 / +1,5.
- Puente a 31-mar-2026: sin deuda; caja propia 60.772; asociadas 34.992 (CDSL a mercado neta de un 14,3 % de impuesto 34.120 + resto al contable 872); otros_ajustes 4.120 (dividendo final pagado en julio); minoritarios 1.225 (contable).
- BPA propio: resultado financiero recurrente 4.700 / 5.700 / 6.700 M (caja propia creciente al ≈ 5,5 % + otros + CDSL), impuesto 25,2 %, minoritarios −80 M, 411,98 M de acciones. FY2029e: 70,82 / 90,31 / 103,29 INR.
- Historia del PER adelantado sin exclusiones (FY2023, 14,4x, no cumple ningún criterio de exclusión de la regla). Mediana 30,3x, actual 41,9x → decide la v3 con el tope ÷1,1. `apuntar-12m` marca ¡REVISAR! (v3 −11,0 % y v2 +7,4 %): revisado a mano en la revisión a 12 meses; se mantiene.
- Comparables: bolsas indias (NSE, MCX, CDSL, CAMS) y mundiales (CME, ICE, Cboe, Nasdaq, HKEX, Deutsche Börse, LSEG). LSEG en peniques → libras; MCX sin capitalización en Yahoo (reconstruida desde el valor empresa); Cboe y Deutsche Börse sin crecimiento ni EV/EBITDA adelantado (ingresos brutos frente a netos).
- Regla 0: las cifras del foro (prima de agosto-octubre, −20 % de derivados del 2T) solo como opinión y apoyo del supuesto, citadas como foro; la del −12 % de agosto y la cuota de prima, de prensa abierta en su página. Ninguna cifra sale de un resumen de buscador; lo de IBKR es un hecho cualitativo de su base de conocimiento.
- Regla 13: veredicto **no cambia**. No hay compra que aplazar; el 2T FY27 no tiene fecha.

## Resultado

- Recomendación **Vender** (regla), convicción baja. v3 −11,0 % / base +3,4 %; v2 +7,4 % / +13,7 %; BPA −10 % −19,9 % / −6,9 %. Objetivo 2.959 INR; valor intrínseco 1.282 INR (−61,6 %; DCF 1.130). Comprar por debajo de 1.282; la señal de venta se apaga por debajo de 3.299.
- ROIC FY2026 269 % − WACC 15,05 % = 254 puntos; sostenibilidad Sí.
- Robustez **SÓLIDA**, acción robusta **No mantener**, límite robusto 1.282,15 INR; avisos M3, M4 (×2), V1 y M6.
- Controles: 20 de 22 correctos y 2 explicados (g 6 % en INR, salto del flujo libre frente a la media de tres años). Cobertura de campos 84,5 % (directivos sin guías, balance sin deuda ni rating).
- Huecos: consenso trimestral, resultado por línea, rating (sin deuda), serie del mercado de bolsas, nota ESG, votos de remuneración (no se votan), operaciones de directivos, múltiplos de transacciones, consenso de FY2029e, posición corta, Reddit.
