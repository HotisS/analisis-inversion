# Cloudflare (NET): análisis growth, 14-oct-2026

**Señal (método v7): Mantener** · Puntuación 81,3/100 · Señales de cambio de tendencia 6/8 · EV/beneficio bruto 56x
Precio 360,93 USD · Objetivo 12 m 409,3 USD (ponderada +13,4 %, base +16,5 %, bajista -45,1 %, alcista +65,6 %) · Compra hasta 226,2 USD
Peso orientativo: no entra · Por qué: no compra: EV/beneficio bruto > 35

> **Calculado con el método v7** (vigente desde el 14-oct tras el backtest de 71 casos, `verticales/growth/metodo.md` §6). Si la sección 9 enseña otras cifras de valoración, son del borrador con la proyección del analista; mandan las de arriba: ventas con la regla mecánica (4252 M en el base) y múltiplo de hoy con rebaja por desaceleración (22,6x / 37,6x / 48,9x).

## 1. La tesis en cinco líneas

1. Es un negocio de primera que **se está acelerando**: las ventas crecen un 36 % en el 2T 2026 (27,8 % un año antes), la retención neta sube al 120 % (114 %) y los clientes de más de 100.000 USD, un 27 %. La puntuación growth es de 81,3/100.
2. El cambio de tendencia está en marcha: 6 de 8 señales activas. Tras el desplome de mayo (−24 % por despidos y una guía corta), la acción ha ido de 196 a 361 USD y está en máximos históricos.
3. Lo que falla es el precio: ~40x las ventas de los próximos 12 meses y **56x el beneficio bruto**, frente al tope de 35x del método. El DCF inverso pide un crecimiento del ~34 % anual durante 10 años, por encima del 33,5 % actual.
4. Si el mercado mantiene el múltiplo (rebajado un 7 % por la desaceleración), la regla da +13,4 % ponderada y +16,5 % en el base, pero el bajista es −45 %. El margen bruto, además, baja (71,8 % GAAP frente a 74,9 %), y eso encarece el EV/beneficio bruto.
5. Conclusión: **Mantener** (quien la tenga, sin vender; quien no, no comprar). Pasaría a Comprar por debajo de **226 USD** con el negocio intacto, o con unas ventas que crezcan lo bastante para que el EV/beneficio bruto baje a 35x a este precio (unos 4.500 M USD de ventas NTM con margen bruto del 72 %, algo más de un año de crecimiento al ritmo actual).

## 2. Negocio y tecnología

Cloudflare tiene una red global propia (más de 330 ciudades) que se coloca delante de webs, aplicaciones y redes corporativas. Sobre ella vende: **seguridad de aplicaciones** (CDN, antiDDoS, WAF, gestión de bots), **Zero Trust/SASE** para empleados (Cloudflare One), **servicios de red** (Magic Transit, WAN) y una **plataforma de desarrollo** (Workers, R2, Workers AI, AI Gateway) que ejecuta código e inferencia de IA en el borde. Vende por suscripción y uso a millones de clientes gratuitos y de pago; los 4.698 clientes de más de 100.000 USD suponen el 73 % de las ventas [1][2].

Lo nuevo: la tesis del **«internet de agentes»**. Más de la mitad del tráfico que ve ya no es humano, y Cloudflare quiere ser el peaje entre los agentes de IA y el contenido: bloqueo por defecto de rastreadores de entrenamiento (sep-2026), **Pay Per Use** y **Monetization Gateway** (cobro de agentes por HTTP 402/x402, Birthday Week, 30-sep-2026), Web Search API y una CLI para agentes [19]. En el Investor Day de junio fijó más de 5.000 M USD de ventas anualizadas a final de 2028 [4].

**Tecnología 4/5**: red y software propios a escala difícil de replicar (datos de ~20 % de la web, coste marginal bajo), pero hay alternativas de calidad por línea (Akamai, Zscaler, AWS/Google en desarrollo e IA). **Posición 4/5**: líder en seguridad de aplicaciones y red para webs, con cuota creciente; en SASE va detrás de Zscaler y Palo Alto.

## 3. Crecimiento

| Trimestre | Ventas (M USD) | Crec. interanual |
|---|---|---|
| 2T 2025 | 512,3 | 27,8 % |
| 3T 2025 | 562,0 | 30,7 % |
| 4T 2025 | 614,5 | 33,6 % |
| 1T 2026 | 639,8 | 33,5 % |
| 2T 2026 | 696,1 | 35,9 % |
| Guía 3T 2026 | 736-737 | ~31 % |

| Ejercicio | Ventas (M USD) | Crec. |
|---|---|---|
| 2023 | 1.296,7 | 33 % |
| 2024 | 1.669,4 | 29 % |
| 2025 | 2.167,9 | 30 % |
| 2026 guía | 2.864-2.870 | ~32 % |

Fuentes: [1][3][22] (2023-2024 y el 2T 2025 de memoria del analista, cuadran con los crecimientos publicados).

- **Ventas de los últimos 12 meses**: 2.512,4 M USD, **+33,5 %**. **CAGR propio a 2 años**: **30,4 %** (12 m a jun-2024: 1.477,7 M).
- **Aceleración**: el 2T 2026 crece un 35,9 % frente a una media del 31,4 % en los cuatro anteriores: **+4,5 pp**. Es la quinta aceleración en seis trimestres.
- **Retención neta en dólares: 120 %** (114 % un año antes, 118 % en el 1T) [2]. RPO corriente +35 % [1].
- **Guía**: 2026 de 2.864-2.870 M USD (subida dos veces; consenso LSEG previo 2.810 M). El 3T guiado (+31 %) es conservador: Cloudflare suele batir su guía en un 3-5 %.

## 4. Mercado y competencia

- **Mercado alcanzable**: Cloudflare estima 196.000 M USD en 2026 [20]. Lo rebajamos a **130.000 M USD** (dos tercios) porque incluye cómputo, almacenamiento y redes corporativas en los que su cuota es marginal.
- **Penetración**: 2.512 / 130.000 = **1,9 %**; con la cifra de la empresa, 1,3 %.
- **Rivales**: Akamai (CDN y seguridad, crece poco), Zscaler y Palo Alto (SASE), Fastly (CDN), AWS/Google/Microsoft (CDN, desarrollo e inferencia) y, como amenaza nueva, plataformas de agentes de los laboratorios de IA (el lanzamiento de Claude Managed Agents se citó en la caída de primavera) [12].
- **Por qué gana**: una sola red y una sola consola para todo, con coste marginal casi nulo para añadir productos; embudo gratuito enorme que convierte a grandes cuentas; y la posición de «portero» del tráfico de agentes, que nadie más tiene a esa escala.

## 5. Cambio de tendencia

| # | Señal | Sí/No | Prueba | Fuente |
|---|---|---|---|---|
| 1 | Revisiones al alza | Sí | Guía 2026 subida dos veces, hasta 2.864-2.870 M, sobre el consenso; guía del 3T sobre el consenso (736 frente a 722 M); subidas de objetivo a 330-390 USD tras el 2T | [1][9][10] |
| 2 | Precio sobre la media de 200 sesiones | Sí | 360,93 USD en máximos (máximo histórico 367,43). La media de 200 sesiones no aparece publicada: por la serie de precios estaría en ~250-260 USD y subiendo | [5][6][11] |
| 3 | Fuerza relativa a 6 meses | Sí | ~+70 % desde principios de abril (~211-216 USD); +77-78 % en 2026, muy por encima del Nasdaq | [6][12] |
| 4 | Mejora del múltiplo | Sí | EV/ventas NTM de ~20x en el mínimo de febrero a ~40x hoy (+100 %) | [8][13] |
| 5 | Inflexión operativa | No | Margen FCF 12 m ~12,5 % frente a ~10 % (+2,5 pp, menos de 5); margen no GAAP plano (13,8 %); el GAAP empeora por la reestructuración; margen bruto a la baja | [1][2][14] |
| 6 | Sentimiento mejorando | Sí | Del «la eficiencia con IA no basta» de mayo a máximos con la tesis de agentes. No eufórico: StockTwits neutral (69/100) y menciones −60 % en tres meses | [15][16][17] |
| 7 | Compras de directivos o institucionales | No | Ventas de directivos de ~166-252 M USD en 90 días (Prince, plan 10b5-1); no está en el S&P 500 | [16][18] |
| 8 | Catalizador nuevo | Sí | Pay Per Use y Monetization Gateway (30-sep), objetivos del Investor Day (> 5.000 M en 2028, «regla del 50» en 2027) | [4][19] |

**Euforia: no, por la regla.** Sube un +65,5 % en 12 meses (218,11 → 360,93 USD [7]), lejos del 150 %. Pero desde el mínimo de febrero (158,83) sube un +127 % en ocho meses, casi todo por expansión del múltiplo.

## 6. Economía unitaria y camino a la rentabilidad

- **Margen bruto**: GAAP del **71,8 %** en el 2T (74,9 % un año antes); no GAAP 73,1 % [1]. Se usa el **72 %** (GAAP de los últimos trimestres). Baja por la mezcla: más tráfico de pago (costes de red que pasan de marketing a coste de ventas) y Workers/IA, con menos margen pero menos coste comercial [14]. La empresa rebajó su objetivo a largo plazo a **70-77 %** (antes 75-77 %) [4].
- **FCF de los últimos 12 meses**: 75,0 + 99,4 + 84,1 + 56,4 = **314,9 M USD**, un **12,5 %** de las ventas (2025: 260,6 M, 12,0 %; 2024: 10,0 %) [1][3][22]. **Creciente**. El 2T lleva salidas de caja de la reestructuración.
- **Regla del 40**: 33,5 + 12,5 = **46**.
- **Apalancamiento operativo**: margen operativo no GAAP del 13,8 % (14 % en 2025); guía 2026 de 443-445 M USD (~15,5 %). El GAAP es −29,6 % en el 2T por 150,7 M de reestructuración (despido del 20 % de la plantilla). El ahorro de esos despidos debería verse desde el 4T; objetivo de beneficio GAAP en 2028 [1][4].

## 7. Caja, deuda y dilución

- **Caja**: 4.162,8 M USD a 30-jun (1.663,8 M de caja y 2.499,0 M en valores) [2]. En agosto emitió **2.500 M USD** de convertibles 0 % 2031 (conversión ~496,94 USD) con capped calls, y amortizó los **1.293,8 M** de los bonos 2026 (el exceso sobre el principal, en acciones). Caja estimada hoy: **~5.070 M USD** [21].
- **Deuda**: convertibles 0 % 2030 (2.000 M, conversión ~247,68 USD, ya en dinero) y 2031 (2.500 M): **4.500 M USD**. Caja neta ~570 M.
- **Pista**: FCF positivo, sin quema.
- **Dilución**: ~**2,5 %** anual (acciones medias de ~346 a ~354 M, más ~1,6 M netas por los bonos 2026). Acciones diluidas usadas: **372 M** (354 básicas + 14,6 M de opciones y RSU + ~2,5 M netas de los bonos 2030 en dinero) [2][24].
- **Pagos en acciones**: ~**20 % de las ventas** (~274 M USD con cargas sociales en el 1S 2026) [24]. **En rojo: supera el 15 %.** Descontándolos, el FCF sería negativo.

## 8. Dirección y ejecución

- **Historial (5/5)**: bate su propia guía de ventas trimestre tras trimestre desde la salida a bolsa (2T 2026: 696,1 M frente a 664-665 M guiados; 3T 2025: 562,0 frente a 543,5-544,5) y ha subido la guía anual dos veces este año [1][3]. La guía del 2T, más corta de lo esperado, provocó la caída de mayo, pero luego la batió con holgura.
- **Dirección (4/5)**: el cofundador Matthew Prince es CEO desde 2009 y controla la empresa con acciones B de voto reforzado (alineado, pero con gobierno menos protector para el minoritario). Asignación de capital sensata: convertibles al 0 % con capped calls que limitan la dilución y una reestructuración rápida. Restan las ventas continuas de directivos y los pagos en acciones del 20 % de las ventas.

## 9. Valoración

**Ejercicio objetivo: 2028** (ventas de los 12 meses siguientes dentro de un año; 2 años sobre los 12 m a jun-2026, como en el backtest). Métrica: **EV/ventas NTM**.

- **EV de hoy**: 360,93 × 372 + 4.500 − 5.070 = **~133.700 M USD**. Ventas NTM ~3.310 M (+32 %) → **EV/ventas NTM 40,3x**; **EV/beneficio bruto NTM 56,0x** [13].
- **Mediana de 3 años ~19x NTM**, **mínimo ~12x** (oct-2023). Estimación propia con el EV de MarketScreener a cierre de cada año (16-17x en 2023-2024, ~24x a final de 2025) y Seeking Alpha (27x en abril de 2026) [8].
- **Mediana de comparables ~12x NTM** (estimación: CrowdStrike ~40x, Zscaler 10-15x, Datadog ~12x, Akamai 3-4x, Fastly ~2x) [23]. No influye: el alcista queda en base × 1,3.
- **Desaceleración**: crecimiento NTM del 32 % frente al 27,7 % del año objetivo (regla mecánica) → factor **0,93**.

| Escenario | Ventas obj. (M USD) | Múltiplo | Precio 12 m | Rentabilidad |
|---|---|---|---|---|
| Bajista (25 %) | 3.325 | 22,6x | 198,2 | −45,1 % |
| Base (50 %) | 4.252 | 37,6x | 420,6 | +16,5 % |
| Alcista (25 %) | 4.654 | 48,9x | 597,9 | +65,6 % |
| **Ponderado** | | | **409,3** | **+13,4 %** |

Ventas con la regla mecánica (crecimiento de partida del 32,6 %, que decae un 15 % al año; bajista la mitad, alcista ×1,2). Acciones dentro de 12 meses: 381 M (+2,5 %); la caja no suma el FCF, por la regla. **Asimetría 1,5.** **Precio máximo de compra: 226,2 USD** (−37 %): es el que lleva el EV/beneficio bruto a 35x; por rentabilidad sola, el listón (ponderada 10 %, base 0 %) quedaría en ~372 USD.

- **Contraste con el analista**: nuestra proyección propia (bajista 3.900, base 4.250, alcista 4.500 M, a partir del objetivo de > 5.000 M anualizados a final de 2028) coincide en el base con la mecánica. No hay consenso publicado para 2028 (null).
- **Consenso de precio**: el objetivo medio (MarketBeat, verano de 2026) era 254-265 USD, por debajo del precio; las subidas tras el 2T van a 330-390 USD [10].
- **DCF inverso**: con un WACC del 9,5 %, un margen FCF que pasa del 12,5 % al 30 % y un crecimiento terminal del 4 %, el precio descuenta un **~34 % anual durante 10 años** (ventas de ~48.000 M USD en 2036, la cuarta parte del mercado que estima la empresa). Es más que el ritmo actual, aunque Cloudflare sea de las pocas que lo ha mantenido una década.

## 10. Foros y sentimiento

- **Prensa y analistas**: tono positivo tras el 2T (RBC: «la aceleración refuerza la oportunidad a largo plazo»; la dirección llamó a la IA el mayor viento de cola de su historia ya en el 1T), con voces críticas por valoración: Barchart («no es compra pese al buen panorama»), GuruFocus (GF Value de 175 USD en agosto) y Simply Wall St (P/S ~34x frente a un ratio justo de ~13x en primavera) [16].
- **Seeking Alpha**: las piezas recientes encontradas reconocen el negocio pero recomiendan Mantener por el punto de entrada (mayo); no se encontraron artículos de septiembre-octubre [16].
- **StockTwits / X**: sentimiento 69/100 «neutral» y menciones en caída del 60 % en tres meses (AltIndex); SentiSense marcaba «alcista» en agosto. Cortos del 3,5 % y put/call de 0,63: no hay euforia de minoristas [17].
- **Reddit (r/stocks, r/investing, r/CloudFlare)**: las búsquedas no devolvieron hilos recientes indexados. **Laguna**.
- **En castellano**: no aparecen hilos de Rankia; Investing.com México mostraba un sentimiento de usuarios mixto en julio; TIKR en español titula «ha subido un 78 % desde enero: ¿ya está descontado el rally?» [6].
- **Contraste con los datos**: el giro de percepción (de «la IA se come a Cloudflare» a «Cloudflare es el peaje de los agentes») está apoyado en datos reales (aceleración, NRR, guía), pero el precio ha subido mucho más que las estimaciones: casi todo es expansión del múltiplo.

## 11. Riesgos y qué rompería la tesis

1. **Reversión del múltiplo**: el riesgo principal. A 40x ventas, volver a la mediana de 3 años (19x) supone −50 % con el negocio intacto. Ya pasó dos veces este año (−37 % en febrero, −24 % en mayo).
2. **Valoración**: EV/beneficio bruto 56x frente a 35x. **En rojo.**
3. **Pagos en acciones del ~20 % de las ventas**: **en rojo** (> 15 %); ventas continuas de directivos.
4. **Margen bruto a la baja** por Workers/IA y la mezcla de tráfico: si baja del 70 %, el beneficio bruto crece menos que las ventas.
5. **Competencia de gigantes** (AWS, Google, Microsoft) y de plataformas de agentes de los laboratorios de IA; Zscaler y Palo Alto en SASE.
6. **Ejecución tras despedir al 20 %**: riesgo en ventas y soporte si el modelo «IA primero» no rinde.
7. **Gobierno**: voto reforzado de los fundadores.

**Señales de venta concretas** (para quien la tenga): crecimiento de ventas por debajo del 25 % dos trimestres seguidos; retención neta por debajo del 112 %; recorte de la guía anual; margen bruto GAAP por debajo del 68 %; caída bajo la media de 200 sesiones con la media girando a la baja. Hoy no hay tesis rota.

## 12. Catalizadores con fecha

| Fecha | Hecho | Sentido |
|---|---|---|
| ~29-oct-2026 (por confirmar) | Resultados del 3T 2026 (guía 736-737 M USD) | +/− |
| Feb-2027 | Resultados del 4T y guía 2027 (prueba de la «regla del 50») | +/− |
| 2027 | Ahorro de la reestructuración en márgenes; posible entrada en el S&P 500 si gana dinero GAAP | + |
| Sep-2027 | Birthday Week 2027: adopción de Pay Per Use / Monetization Gateway | + |
| 2028 | Objetivos: > 5.000 M anualizados y beneficio GAAP | + |
| Jun-2030 / ago-2031 | Vencimientos de los convertibles (2.000 y 2.500 M; cubiertos por la caja) | neutro |

## 13. Encaje en cartera

Con la cartera value propuesta (IGLN, Edenred, Daiichi Sankyo, Uber, Viscofan, Alphabet, Netflix, SAP, Intuit, Nemetschek, LVMH y liquidez), el bolsillo growth podría llegar al 20 % (~5.960 EUR). Una posición de convicción media sería del 4 % (~1.190 EUR). De las growth ya analizadas (Palantir, CrowdStrike, Spotify, Rheinmetall), ninguna está en Comprar.

**Cloudflare no merece hueco hoy: peso 0 %.** La puntuación es alta (81,3) y la tendencia acompaña, pero pagar 56 veces el beneficio bruto deja un bajista del −45 % con una ponderada de solo +13 %. Además, la cartera ya está cargada de software y plataformas (Alphabet, SAP, Intuit, Nemetschek, Netflix, Uber) y Cloudflare añadiría el mismo factor (múltiplos de software de crecimiento) justo en máximos. La liquidez se queda donde está.

**Cuándo reconsiderarla**: por debajo de **~226 USD** sin cambio de tesis (entrada en dos tramos: la mitad a ese precio y la otra tras los siguientes resultados), o si las ventas siguen acelerando por encima del 35 % y el margen bruto se estabiliza, de modo que el EV/beneficio bruto baje a 35x. Entre las growth analizadas, es la que mejor combina aceleración y tendencia: es la primera candidata a revisar tras los resultados del 3T (~29-oct).

## 14. Puntuación

| Bloque | Puntos | Máx. | Detalle |
|---|---|---|---|
| A. Crecimiento | 20,0 | 25 | Ventas 12 m +33,5 % (4), CAGR a 2 años 30,4 % (4), aceleración +4,5 pp (4) |
| B. Mercado y tecnología | 17,3 | 20 | Penetración 1,9 % (5), tecnología 4, posición 4 |
| C. Cambio de tendencia | 15,0 | 20 | 6/8 señales, sin euforia |
| D. Economía unitaria | 12,0 | 15 | Margen bruto 72 % (4), regla del 40 = 46 (3), FCF creciente (5) |
| E. Caja y dilución | 8,0 | 10 | FCF positivo (5), dilución del 2,5 % (3) |
| F. Ejecución y dirección | 9,0 | 10 | Historial 5, dirección 4 |
| **Total** | **81,3** | **100** | Señal: **Mantener**, porque el EV/beneficio bruto (56x) supera 35x |

**Nota sobre el método** (propuesta, sin cambiar el código): la señal 4, «mejora del múltiplo», se activa igual cuando el múltiplo empieza a subir desde un mínimo que cuando ya se ha duplicado y está al doble de su mediana de 3 años (aquí 40x frente a 19x; en CrowdStrike, 40x frente a 18x). En ese punto ya no anuncia un giro, sino que dice que el giro está cobrado. Propuesta: contarla solo si el múltiplo ha subido ≥ 20 % desde el mínimo de 12 meses **y** sigue ≤ 1,3 × su mediana de 3 años, y repasar el backtest. En Cloudflare no cambia la señal (quedarían 5/8 y 78,8 puntos), pero afinaría el bloque C.

## Fuentes

[1] Cloudflare, nota de resultados del 2T 2026 (6-ago-2026), 8-K ex. 99.1 (SEC) y BusinessWire.
[2] Cloudflare, 10-Q del trimestre cerrado el 30-jun-2026 (SEC): caja y valores, convertibles 2026 y 2030, acciones potenciales, retención neta.
[3] Cloudflare, notas de resultados del 1T 2026, 4T y ejercicio 2025 y 3T 2025, 8-K (SEC).
[4] Investing.com / InvestingPro (SWOT, jun-2026) y Quartr: Investor Day del 10-jun-2026 y objetivo de beneficio GAAP en 2028.
[5] Yahoo Finance, histórico de cotizaciones de NET (cierres del 6 al 9-oct-2026).
[6] TIKR, «Cloudflare stock is up 78% since January» (oct-2026, también en español); Trade-Ideas (4-oct-2026).
[7] MarketBeat / TipRanks: cierre del 15-oct-2025.
[8] Seeking Alpha, métricas de valoración (7-abr-2026); MarketScreener, valoración histórica; cálculos propios.
[9] Reuters (vía Lufkin Daily News), guía del 2T 2026 frente al consenso LSEG.
[10] StockAnalysis (subidas de precio objetivo tras el 2T); MarketBeat (20-jul-2026).
[11] 24/7 Wall St. (máximos de 52 semanas, ago-sep-2026); Bullfincher (mínimo de 52 semanas).
[12] Motley Fool (6-mar-2026); TIKR (mayo-2026); Simply Wall St (abr-2026).
[13] Cálculo propio del EV y de las ventas NTM.
[14] Reuters (vía ARY News) y TIKR (mayo-2026): margen bruto del 1T y comentarios del director financiero.
[15] Barchart, Yahoo Finance y Mahoning Matters (mayo-2026): caída tras el 1T y despidos.
[16] Barchart; GuruFocus (7-ago-2026); Pluang / Seeking Alpha (mayo-2026); Simply Wall St.
[17] AltIndex (StockTwits); SentiSense (ago-2026); Benzinga (sentimiento).
[18] SEC, formularios 4 de Cloudflare (2026); agregadores 13F.
[19] Cloudflare blog, «Everything we launched during Birthday Week 2026» (30-sep-2026).
[20] Barchart (mercado potencial de 196.000 M USD en 2026); Investing.com (231.000 M en 2028, estimación de analistas).
[21] Cloudflare, nota de precio (11-ago-2026) y 8-K (13-ago-2026) de los convertibles 2031; caja estimada por el analista.
[22] Notas de resultados trimestrales históricas de Cloudflare (parte de memoria del analista, señalado en `datos.json`).
[23] Substack sergeycyw y multiples.vc (Zscaler); Clouded Judgement (30-ene-2026); Value Add VC (2026); estimaciones propias.
[24] Panabee (pagos en acciones del 1S 2026); dilución estimada por el analista.
