# MongoDB (MDB): análisis growth, 14-oct-2026

**Señal (método vigente v11): Comprar (convicción baja)** · Puntuación 74,5/100 · Señales de cambio de tendencia 5/8 · EV/ventas NTM 8,8 veces
Precio 373,07 USD (fecha del informe) · Objetivo 12 m 439,5 USD · Ponderada +17,8 % · Base +11,6 % · Bajista −38,6 % · Alcista +86,6 % · Compra hasta 416,4 USD

> **Actualización del 20-oct-2026 (sin investigación nueva del negocio; el resto del informe es del 14-oct).** (1) Apartado 4 bis añadido (foso, riesgo de IA, ciclo y sector, mercado con fuente: Gartner). (2) **Comparables verificados con una sola fuente: mediana 12,3x, no ~14x** (el ~14x salía en parte de memoria). El múltiplo alcista baja de 13,4x a 12,3x: **objetivo 12 m 425,5 USD (antes 439,5)**, ponderada al precio del informe +14,1 % (antes +17,8 %), compra hasta v11 405,3 USD. La señal v11 sigue siendo Comprar (convicción baja). Con las reglas del 20-oct (+25 % a 12 m y rentabilidad ≥ 0,75 veces la caída del escenario malo, las dos al precio de hoy), **el límite queda en 340,40 USD** (antes 349,37). A 348,69 USD (cierre del 19-oct) da +22,0 % con un escenario malo de −34,3 % (0,64 veces): hoy no es compra. Donde las secciones 9 y 13 citan 439,5 USD, +17,8 % o el alcista de 13,4x, valen las cifras de esta nota.
Peso orientativo: 3.5 % de la cartera · Por qué: cumple todos los requisitos de compra
Cabecera rehecha con la v11 el 15-oct (auditoría de homogeneidad). Antes decía (método v7): Comprar (convicción baja). El texto de abajo puede citar cifras de esa versión anterior; mandan las de esta cabecera.


## 1. La tesis en cinco líneas

1. MongoDB es la base de datos documental líder (la más usada fuera de las relacionales) y vende sobre todo **Atlas**, su servicio gestionado en AWS, Azure y Google (73 % de la suscripción). Factura **2.783 M USD en 12 meses (+25,5 %)** con un 73 % de margen bruto y un 23 % de FCF, sin deuda.
2. **Ha acelerado**: del +19 % (3T FY26) al **+30,5 % en el 2T FY27** (a jul-2026), con Atlas estable en ~29 %, retención neta subiendo al 122 %, récord de altas de clientes y su **primer trimestre con beneficio operativo GAAP** claro.
3. **Está barata para lo que crece**: 8,8x ventas NTM y 12x beneficio bruto (Snowflake 18,6x y Datadog 20,3x), en su mediana de 3 años. El DCF inverso solo descuenta un ~14 % anual de crecimiento a 10 años.
4. **Pero el relato se ha torcido**: guía del 3T floja (−13,5 % el 2-sep), el CEO se fue a Meta a los 11 meses (−18,5 % el 28-sep) y el 13-oct se supo que salían la directora de clientes y el jefe de producto de IA. Y queda la pregunta de fondo: **¿la IA juega a favor o en contra?** (los agentes de programación recomiendan Postgres por defecto).
5. Conclusión: la regla dice **Comprar (baja)** por debajo de 443 USD, con buen margen (+24,7 %, +22,6 % con la guía). Riesgo de IA **medio, no existencial**. **No cabe hoy** en el bolsillo growth: queda como **suplente n.º 2**, y podría sustituir a Snowflake si se nombra un CEO creíble y el 3T confirma Atlas ≥ 26 %.

## 2. Negocio y tecnología

MongoDB vende una base de datos de documentos (JSON) con búsqueda, búsqueda vectorial, procesamiento de flujos y, desde la compra de Voyage AI (2025), modelos propios de *embeddings* y reordenación [1][4]. Tres formas de venta: **Atlas** (nube gestionada, por consumo; 565,9 M USD en el 2T, ~+29 %), **Enterprise Advanced** (licencia para instalar en casa o en nube privada; EA y otros 181,2 M, +36 %, con contratos plurianuales que se reconocen de golpe) y servicios [1]. 70.600 clientes (69.300 de Atlas) y ~75 % de la Fortune 100; 2.999 clientes de más de 100.000 USD de ARR (+17 %) [1].

Lo nuevo (Investor Day del 29-sep): **Atlas Infinite** (separa cómputo y almacenamiento para cargas de agentes «a ráfagas»), **Atlas Agent Engine** (memoria persistente, gobierno y seguridad para agentes), **MongoDB 9.0** (+20-35 % de rendimiento), servidor **MCP gestionado** que conecta Claude Code, Codex o Devin a los datos de Atlas, y *embeddings* automáticos de Voyage [1][4].

- **Tecnología 3/5**: el modelo documental, la escala horizontal y el «funciona en cualquier sitio» (nube, casa, híbrido) son buenos y tienen años de ventaja en operaciones de misión crítica. Pero **hay alternativas serias**: Postgres con JSONB y pgvector, DocumentDB de AWS y de Microsoft (compatibles con la API de MongoDB) y las bases de los hiperescaladores. No es 4 porque no es irreplicable en 3 años.
- **Posición 4/5**: líder indiscutido en bases documentales y Leader en la Forrester Wave de plataformas multimodelo (2T 2026) [1]; gana cuota (Atlas crece ~29 % frente a un mercado de ~15 %). No es 5 porque en el mercado total va detrás de Oracle, Microsoft, AWS y el ecosistema Postgres.

## 3. Crecimiento

| Trimestre (año fiscal a enero) | Ventas (M USD) | Crec. interanual |
|---|---|---|
| 1T FY26 (abr-2025) | 549,0 | 21,8 % |
| 2T FY26 (jul-2025) | 591,4 | 23,7 % |
| 3T FY26 (oct-2025) | 628,3 | 18,7 % |
| 4T FY26 (ene-2026) | 695,1 | 26,8 % |
| 1T FY27 (abr-2026) | 687,6 | 25,2 % |
| 2T FY27 (jul-2026) | 771,8 | 30,5 % |
| Guía 3T FY27 | 756-761 | ~20,7 % |
| 4T FY27 implícito en la guía | ~792 | ~14,0 % |

| Ejercicio | Ventas (M USD) | Crec. |
|---|---|---|
| FY24 (ene-2024) | 1.683 | 31,1 % |
| FY25 | 2.006 | 19,2 % |
| FY26 | 2.464 | 22,8 % |
| FY27 (guía de septiembre) | 2.990-3.030 | ~22 % |

Fuente: SEC XBRL y notas de resultados [1][2][11].

- **Ventas de 12 meses** (3T FY26-2T FY27): **2.783 M USD, +25,5 %**. **CAGR propio a 2 años: 23,7 %** (12 m a jul-2024: 1.820 M).
- **Aceleración**: 2T FY27 (+30,5 %) frente a la media de los cuatro anteriores (+23,6 %): **+6,9 pp**. Ojo: el EA (+36 %) lleva contratos plurianuales reconocidos de una vez; la dirección dice que no hubo grandes acuerdos agrupados en el trimestre [10].
- **Retención neta**: **122 %** (119 % un año antes) [10].
- **Guía**: año subido dos veces (2.880 → 2.940 → 3.010 M en el punto medio, +4,3 %), Atlas ~27 % en el año y ~26 % en el 3T; **EA plano en el segundo semestre**, por eso la guía del 3T y el 4T cae a +21 % y +14 % [1][2][10]. Investor Day: **+20 % o más anual en FY28-FY30**, Atlas en la mitad de los 20 [4].
- **Crecimiento que implica la guía en los 12 meses siguientes (`guia_12m_pct`): 18,7 %** = segundo semestre guiado (1.551 M, +17,2 %) más el primer semestre FY28 al +20 % del objetivo a 3 años (1.751 M), sobre 2.783 M.
- **Exceso medio sobre la guía (`exceso_guia_pp`): 6,0 pp** de crecimiento en los últimos 4 trimestres: 3T FY26 +7,3 pp (guía 587-592 M, real 628,3), 4T +5,0 pp (665-670, real 695,1), 1T FY27 +4,8 pp (659-664, real 687,6), 2T +6,8 pp (729-734, real 771,8) [1][2]. MongoDB guía de forma muy conservadora, sobre todo el consumo de Atlas más allá de un trimestre.

## 4. Mercado y competencia

- **Mercado alcanzable: ~100.000 M USD en 2028**: la parte operativa de un mercado de bases de datos de 119.700 M en 2024 y ~161.000 M previstos en 2026 (Gartner; verificado el 20-oct, ver 4 bis). Con cualquier cifra entre 56.000 y 139.000 M la penetración puntúa igual.
- **Penetración**: 2.783 / 100.000 = **2,8 %**.
- **Rivales**: Postgres y sus versiones gestionadas (Amazon Aurora y RDS, Neon de Databricks, Crunchy Data de Snowflake, Supabase), DocumentDB de AWS y Microsoft, Cosmos DB, Oracle, bases vectoriales especializadas (Pinecone) y, en analítica, Snowflake y Databricks.
- **Por qué gana**: es la opción por defecto para datos con estructura cambiante y para aplicaciones de cara al cliente que escalan; las empresas de IA que crecen (ElevenLabs, Harvey) migran a MongoDB cuando chocan con los límites de Postgres o de las bases de los hiperescaladores [13]. La mitad de las ventas pasan por algún hiperescalador y las de *marketplace* crecen más que el total [4].

### El riesgo de que la IA se coma el negocio (valoración explícita)

**Veredicto: riesgo medio, no existencial. Distinto de Duolingo.** En Duolingo la IA sustituye el producto (un modelo de lenguaje enseña idiomas gratis); en MongoDB la IA **necesita** el producto: cada agente o aplicación de IA guarda su estado, su memoria y sus datos operativos en una base de datos. El peligro no es que desaparezca la categoría, sino **perder cuota frente a Postgres**. Argumentos:

| En contra (la IA le quita) | A favor (la IA le suma) |
|---|---|
| **Los agentes de programación eligen Postgres por defecto**: el propio CEO lo admitió en Citi el 9-sep («si no usas ciertas palabras, recomienda Postgres») [13]. El foso de MongoDB era la preferencia de los programadores, y ahora la decide cada vez más el agente. | Más software escrito = más aplicaciones = más bases de datos; las que escalan en producción migran a MongoDB [13]. |
| Las plataformas de «vibe coding» (Lovable, Replit, Bolt) usan Supabase/Postgres; Databricks y Snowflake compraron Neon y Crunchy Data para cubrir esa demanda [13]. | Cohorte de IA nativa y laboratorios: 3-5 % de Atlas pero **+165 % interanual** [4]; un laboratorio de frontera usa MongoDB como memoria de conversación [10]. |
| La IA abarata reescribir código, así que **baja el coste de cambiar de base de datos** (hacia Postgres o desde Postgres). | MongoDB usa esa misma IA para migrar aplicaciones de Oracle y SQL Server (programa de modernización). |
| Postgres con pgvector cubre la búsqueda vectorial «suficiente» sin otra base. | Voyage AI: las altas llegan sobre todo **desde Claude Code y Codex**, que recomiendan sus *embeddings* [13]; búsqueda vectorial ya en EA. |

**Lo que dicen los datos hoy**: ninguna señal de erosión. Atlas lleva tres trimestres en ~29 %, la retención neta sube (119 → 122 %), las altas de clientes son récord (2.900 en el 2T) y la guía de Atlas del año pasó del ~24 % al ~27 % [1][10]. **Lo que vigilar**: altas de clientes por trimestre (si bajan de ~2.000, los nuevos proyectos se van a Postgres), crecimiento de Atlas por debajo del 22 % y retención neta por debajo del 115 %. La salida del jefe de producto de IA (13-oct) justo cuando la empresa quiere que los agentes la elijan por defecto es una mala noticia para este frente.

## 4 bis. Foso, riesgo de IA y sector (añadido el 20-oct-2026)

Apartado obligatorio desde el 20-oct (decisión de Hotis). No cambia ninguna cifra del cálculo.

| Aspecto | Veredicto | Pruebas |
|---|---|---|
| Foso (costes de cambio, escala) | **medio** | Retención neta de ARR 122 % (2T FY27; 119 % un año antes): los clientes que se quedan gastan un 22 % más cada año [1][10]; 2.999 clientes de más de 100.000 USD de ARR (+17 %) y ~75 % de la Fortune 100: aplicaciones de misión crítica, caras de migrar [1]; Cuota: ventas de ~2.000 M USD en 2024 frente a un mercado de 119.700 M (≈1,7 %), con los no relacionales creciendo al 22,7 % frente al 10,8 % de los relacionales [15]; Margen bruto estable del 72-74 % con Atlas ya ~73 % de las ventas: no compite por precio [1][11] |
| Riesgo de IA | **presiona, nivel medio** | La IA no sustituye el producto (lo necesita), pero baja el coste de cambiarse y empuja los proyectos nuevos hacia Postgres (detalle en la sección 4). Vigilar: Altas netas de clientes < 2.000 por trimestre dos veces seguidas; Atlas < 22 % dos trimestres seguidos; Retención neta < 115 %. |
| Ciclo | **sensibilidad media** | Atlas se cobra por consumo: en el bache de 2022-2023 los clientes optimizaron uso y el consumo frenó desde el verano de 2022; Atlas pasó a +37 % en FY24 y en mayo de 2024 la empresa recortó la guía por menor consumo [16]. No es cíclica como un industrial, pero una recesión recorta varios puntos de crecimiento en dos o tres trimestres. |
| Regulación | baja | Sin riesgo relevante (residencia de datos y privacidad, que favorecen a quien funciona en cualquier nube). |
| Estructura del sector | — | Mandan los hiperescaladores (AWS, Microsoft, Google, Oracle, IBM, los cinco primeros desde 2022) [17], que son a la vez socios (la mitad de las ventas pasan por sus marketplaces) y rivales (DocumentDB, Cosmos DB). El mercado va a la nube (64 %) y crece más en no relacionales [15]. |
| Por qué podría perder | — | Postgres gratis, «suficiente» para la mayoría de los casos (JSONB, pgvector) y elegido por defecto por los agentes y las plataformas de IA; los hiperescaladores ofrecen copias compatibles con la API de MongoDB dentro de lo que el cliente ya paga. Si los proyectos nuevos se quedan en Postgres, MongoDB vive de la base instalada y el crecimiento baja hacia el 15 %. |
| Mercado alcanzable (fuente) | ~100.000 M USD en 2028 | Gartner: DBMS 119.700 M USD en 2024 y ~161.000 M previstos en 2026 [15]. Se toma como alcanzable en 2028 ~100.000 M: la parte operativa (sin analítica, donde mandan Snowflake, Databricks y BigQuery); la proporción operativa/analítica es estimación propia. Con cualquier cifra entre 56.000 y 139.000 M la penetración puntúa igual. |

**Lectura:** foso medio, no fuerte. Los clientes que ya la usan se quedan y gastan más (retención neta del 122 %), pero el riesgo está en los proyectos nuevos. La IA presiona sin sustituir, y el consumo hace que frene en una recesión. Nada de esto rompe la tesis. Encaja con la puntuación que ya tenía (tecnología 3/5, posición 4/5) y con la convicción baja.

## 5. Cambio de tendencia

| # | Señal | Sí/No | Prueba | Fuente |
|---|---|---|---|---|
| 1 | Revisiones al alza | Sí (dudosa) | Guía FY27 de 2.880 a 3.010 M USD (+4,3 %) en dos subidas; objetivos al alza en ago-sep (Goldman 520, Canaccord 480, Bernstein 484), pero cinco recortes el 30-sep tras la salida del CEO (Stifel 385, UBS 375). Basada en guía y precios objetivo. | [1][2][7] |
| 2 | Precio sobre la media de 200 sesiones | No | 373,07 USD sobre una media de 340,8 USD, pero la media no sube: 343,9 hace dos semanas, 333,7 hace tres meses. | [5] |
| 3 | Fuerza relativa a 6 meses | Sí | +58,0 % desde el 13-abr (236,14 USD) frente a +20,4 % del Nasdaq-100. | [5] |
| 4 | Mejora del múltiplo | Sí | EV/ventas NTM de ~5,7x (mínimo del 10-abr) a 8,8x (+54 %). Sigue en su mediana de 3 años (8,7x): con la v8 también contaría. | [5][12] |
| 5 | Inflexión operativa | Sí | Beneficio operativo GAAP de +3,7 % frente a −11,0 % un año antes (+14,7 pp); no GAAP del 15 % al 24 %; FCF del trimestre casi doble. | [1] |
| 6 | Sentimiento mejorando | No | Empeora: −13,5 % por la guía (2-sep), −18,5 % por la salida del CEO (28-sep), salidas de directivos (13-oct) y recortes de objetivos. | [7][8][9][10] |
| 7 | Compras de directivos o institucionales | No | Solo ventas y retenciones; la empresa recompra (200 M en el semestre, 1.000 M más autorizados), pero no cuenta. | [3][6] |
| 8 | Catalizador nuevo | Sí | Atlas Infinite, Agent Engine, MongoDB 9.0 y MCP gestionado; nombramiento del CEO definitivo; resultados del 3T a principios de diciembre. | [3][4] |

**Euforia: no** (+16,9 % en 12 meses; EV/beneficio bruto 12,1x). Es el caso contrario a Datadog y Snowflake: el negocio acelera pero la percepción se ha enfriado.

## 6. Economía unitaria y camino a la rentabilidad

- **Margen bruto**: **72,7 %** en 12 meses (beneficio bruto 2.023 M sobre 2.783 M); 74 % en el 2T (no GAAP 76 %), mejorando por la escala de Atlas [1][11].
- **FCF de 12 meses**: ~**652 M USD, 23,4 %** de las ventas (FY25 ~115 M; FY26 ~480 M): **FCF creciente** [1][2][11].
- **Regla del 40**: 25,5 + 23,4 = **48,9**. Con FCF menos pagos en acciones (652 − 565 = 87 M, 3,1 %) sería **28,6**.
- **Apalancamiento operativo**: margen operativo no GAAP del 24 % en el 2T (15 % un año antes); guía del año ~21 %; objetivo de +100-200 pb al año [1][4]. GAAP: tres trimestres seguidos con beneficio por acción.

## 7. Caja, deuda y dilución

- **Caja y valores**: **2.411 M USD** a 31-jul-2026; **sin deuda financiera** (los convertibles de 2026 se convirtieron en acciones a finales de 2024) [1][11].
- **Pista**: FCF positivo.
- **Acciones**: **86,4 M** diluidas (guía no GAAP del año, con todas las acciones restringidas); 80,56 M en circulación a 28-ago [1][11].
- **Dilución**: **~0 %** neta: las recompras (400 M USD en FY26, 200 M en el semestre) compensan los pagos en acciones (básicas medias de 81,1 a 80,5 M; totalmente diluidas no GAAP de 87,1 a 85,8 M). Se usa 0 % para no contar dos veces la caja de las recompras.
- **Pagos en acciones: 20,3 % de las ventas** (565 M USD en 12 meses). **En rojo: por encima del 15 % del método.** Bajan en proporción (22 % un año antes), pero el FCF «real» para el accionista es solo del 3 %.

## 8. Dirección y ejecución

- **Historial (5/5)**: ha batido su guía trimestral de ventas en todos los trimestres revisados (8 de 8, y de memoria desde su salida a bolsa en 2017), de media en 6 pp de crecimiento en el último año [1][2]. Pero su **guía anual inicial** decepcionó dos marzos seguidos (−22 % en mar-2026) [10].
- **Dirección (2/5)**: CJ Desai, fichado en nov-2025, **se fue a Meta a los 11 meses** (28-sep). Vuelve como interino Dev Ittycheria (CEO de 2014 a 2025, conoce la empresa y llevó las ventas de 35 a 2.300 M USD), ahora también socio de Sequoia, y el consejo busca CEO definitivo [3]. El 13-oct salieron la directora de clientes (Erica Volini, fichada en marzo) y el jefe de producto de IA (Pablo Stern-Plaza); siguen el CTO, el director comercial y el director financiero [8]. A favor: asignación de capital sensata (caja neta, recompras de 600 M en 18 meses, beneficio GAAP). En contra: rotación en la cúpula, pagos en acciones del 20 % y solo ventas de directivos.

## 9. Valoración

**Ejercicio objetivo**: 12 meses a jul-2028 (ventas de los 12 meses siguientes dentro de un año; 2 años sobre los 12 m a jul-2026, como en el backtest). **Métrica: EV/ventas NTM** (el margen GAAP acaba de pasar a positivo; el EBITDA aún no es estable).

- **EV de hoy**: 373,07 × 86,4 − 2.411 = **29.822 M USD**.
- **Ventas NTM**: ~3.395 M (12 m × 1,22: guía del semestre más el ritmo habitual de batirla). **EV/ventas NTM 8,8x; EV/beneficio bruto NTM 12,1x** (tope del método: 35x).
- **Mediana de 3 años: ~8,7x**; **mínimo: ~4,6x** (abril de 2025) [12]. **Comparables: ~14x** (Snowflake 18,6x, Datadog 20,3x, ServiceNow ~9,9x, Elastic ~5x; los dos últimos de memoria o de terceros) [14].
- **Desaceleración**: 22 % NTM frente al 20 % del año objetivo → factor 0,95.

| Escenario | Ventas año objetivo (M USD) | Múltiplo | Precio 12 m | Rentabilidad |
|---|---|---|---|---|
| Bajista (25 %) | 3.488 | 5,0x | 231,1 | −38,0 % |
| Base (50 %) | 4.272 | 8,4x | 442,8 | +18,7 % |
| Alcista (25 %) | 4.608 | 13,4x | 743,8 | +99,4 % |
| **Ponderado** | | | **465,1** | **+24,7 %** |

Acciones dentro de 12 meses: 86,4 M (dilución neta 0 %); caja de hoy sin sumar el FCF futuro, por la regla. **Asimetría: 2,6.** **Precio máximo de compra: 442,8 USD** (el que deja el base en 0 %; el tope de 35x beneficio bruto queda muy por encima).

**Cálculo a mano partiendo de min(mecánico, guía + exceso)**:

| Partida del crecimiento | Base (ventas, precio, rent.) | Ponderada | Bajista | Compra hasta |
|---|---|---|---|---|
| Mecánica (regla v7): 25,8 % | 4.272 M, 442,8 USD, +18,7 % | +24,7 % | −38,0 % | 442,8 |
| **min(25,8; 18,7 + 6,0) = 24,7 %** | 4.199 M, 435,6 USD, +16,8 % | **+22,6 %** | −38,6 % | ~436 |
| Solo la guía, sin exceso: 18,7 % | 3.828 M, 399,7 USD, +7,1 % | +12,4 % | −41,2 % | ~399 |

Con la guía más su exceso habitual la señal **sigue en Comprar** (cambia 2 pp). Incluso con la guía pelada pasaría.

- **Sensibilidad que sí importa: el alcista.** Sale de la mediana de comparables (~14x, parte de memoria), que lleva el múltiplo alcista al techo (base × 1,6). Sin comparables (alcista = base × 1,3 = 10,9x): ponderada **+15,7 %**, compra hasta ~411 USD. Con probabilidades 35/50/15 (por la rotación en la dirección): **+10,9 %**. Todo junto (guía + exceso, sin comparables y 35/50/15): **+3,9 %** → Mantener (en vigilancia), compra hasta ~369 USD. **La compra aguanta cualquiera de los ajustes por separado, no todos a la vez.**
- **Proyección propia (contraste)**: 3.600 / 4.000 / 4.300 M USD (base: +21 % hasta jul-2027 y +19 % después). Un 6 % menor que la mecánica.
- **Al precio de hoy** (365,53 USD intradía): ponderada +27,2 % (+25,2 % con la guía), por debajo del límite; la señal sigue vigente.
- **Consenso**: objetivo medio 462,91 USD (37 analistas, MarketBeat), +24 %; máximo 565, mínimo 372 [7]. Consenso de ventas del año objetivo: no encontrado (null).
- **DCF inverso**: con WACC del 10 %, FCF del 23 % al 30 % y crecimiento terminal del 4 %, el precio descuenta **~14 % anual durante 10 años**; con FCF después de pagos en acciones (del 3 % al 20 %), ~20 %. **Poco exigente** frente al objetivo de +20 % y el +25 % actual.

## 10. Foros y sentimiento

- **Prensa y analistas**: tras el 2T, titulares de «bate pero cae por Atlas estable y guía prudente» (Quartz, Finviz) [10]; tras la salida del CEO, recortes de objetivos (Stifel, UBS, BMO, DA Davidson, Stephens) y dudas sobre la continuidad; tras el Investor Day, BofA («tiene el impulso de la IA de su lado», objetivo 540) y Wolfe («las salidas van más rápido de lo esperado», 440) [4][7][8]. Consenso aún en compra (30 de 37).
- **StockTwits** (21.935 seguidores): dividido y nervioso: «the C suite is dropping like flies», «clowns all the way up», junto a «solid buy at these levels» y «500+ by EOY»; muchas operaciones con opciones. No hay euforia [9].
- **Seeking Alpha**: no se encontraron artículos de octubre; los de marzo-abril giraban en torno a la guía floja de Atlas [10]. **Laguna parcial.**
- **Reddit (r/stocks, r/investing, r/mongodb)**: la API no devolvió datos y la búsqueda no encontró hilos recientes. **Laguna.** Entre programadores, el debate «Postgres lo hace todo» es frecuente (DEV Community, blogs de 2026) [13].
- **En castellano**: sin hilos en Rankia ni Investing ES sobre la salida del CEO; solo notas de la caída de marzo. **Laguna.**
- **Contraste con los datos**: el sentimiento va peor que el negocio (aceleración, margen y retención al alza). Es el terreno en el que el método busca compras, con el matiz de que la rotación directiva es un riesgo real, no solo de percepción.

## 11. Riesgos y qué rompería la tesis

1. **Dirección**: CEO interino y salidas en cadena; un mal nombramiento o más salidas (CTO, director comercial, director financiero) frenarían la ejecución comercial.
2. **IA y Postgres** (sección 4): pérdida de los nuevos proyectos frente a Postgres por la elección de los agentes de programación.
3. **Consumo**: Atlas se cobra por uso; los clientes optimizan en las recesiones (2022-2023).
4. **EA irregular**: los contratos plurianuales hinchan unos trimestres y deprimen otros (la guía del 4T implica +14 %).
5. **Pagos en acciones del 20 %** de las ventas, compensados con recompras que consumen caja.
6. **Hiperescaladores**: socios y rivales a la vez (DocumentDB de AWS, Cosmos DB).

**Señales de venta concretas**:
- Atlas por debajo del 22 % dos trimestres seguidos o retención neta por debajo del 115 %.
- Altas netas de clientes por debajo de ~2.000 por trimestre dos veces seguidas.
- Salida del director financiero o del CTO, o CEO definitivo sin experiencia en software empresarial antes de mediados de 2027.
- Vuelta a pérdidas operativas GAAP por algo distinto de una compra.

Hoy no hay tesis rota.

## 12. Catalizadores con fecha

| Fecha | Hecho | Sentido |
|---|---|---|
| Principios de dic-2026 (sin anunciar; el año pasado, 1-dic) | Resultados del 3T FY27: Atlas frente al ~26 % guiado; altas de clientes | +/− |
| Sin fecha (búsqueda en marcha) | Nombramiento del CEO definitivo | +/− |
| Dic-2026 | AWS re:Invent (Atlas Infinite en AWS) | + |
| Principios de mar-2027 | Resultados del 4T y guía FY28: la guía de marzo hundió la acción dos años seguidos | +/− |
| FY27-FY28 | Disponibilidad general de Atlas Agent Engine | + |

## 13. Encaje en cartera

**Cartera value vigente** (`informes/cartera-2026-10-14-15h.md`): IGLN, Edenred, Daiichi Sankyo, Uber, Viscofan, Alphabet, Netflix, SAP, Intuit, Nemetschek, LVMH y Bureau Veritas, con órdenes con límite hasta el 7-nov. **Bolsillo growth** (`informes-growth/cartera-growth.md`): Nu (4 %), argenx (4,9 %), Shopify (4 %), Axon (3,7 %) y Snowflake (4 %), **~20 %, lleno y sin liquidez**. Suplentes: Dexcom, Datadog, Samsara, Zscaler y Wise.

**Precio actual antes de proponer nada** (regla del 14-oct): 365,53 USD a las ~16:20 UTC del 14-oct, por debajo del límite de 442,8 USD; ponderada +27,2 % (+25,2 % con la guía): la señal sigue en Comprar (baja).

**¿Sustituye a alguna growth? Hoy no.** El único candidato razonable es **Snowflake**, por ser el mismo tipo de negocio (datos para IA) y la de menor ponderada del bolsillo:

| | Ponderada (regla / con la guía) | Base | Bajista | EV/beneficio bruto | Puntuación | Riesgos propios |
|---|---|---|---|---|---|---|
| Snowflake (precio de las 16:15) | +16,8 % (la guía va por encima de la regla) | +20,0 % | −45 % | 27,8x | 78 (media) | Múltiplo exigente; IA a favor hoy |
| MongoDB | +24,7 % / +22,6 % | +18,7 % / +16,8 % | −38 % | 12,1x | 74,5 (baja) | CEO interino, salidas, Postgres |

Sobre el papel, MongoDB gana por ~6 pp y es mucho más barata. Pero **no se cambia**: (1) la ventaja depende del alcista por comparables (en parte de memoria); sin él, +15,7 %, por debajo de Snowflake; (2) la convicción es baja y la dirección está en el aire; (3) Snowflake acaba de entrar con un motivo de negocio que se mantiene, así que cambiarla ahora sería rotar por una diferencia que la incertidumbre se come; (4) al usuario le preocupa la IA, y en MongoDB el riesgo de cuota frente a Postgres es más directo que en Snowflake. Las otras (Nu, argenx, Axon, Shopify) tienen ponderadas con la guía iguales o mayores (Shopify +17,6 %, pero diversifica) y no son del mismo sector.

**Queda como suplente growth n.º 2**, detrás de Dexcom (que diversifica fuera del software y tiene el menor bajista) y por delante de Datadog (con la guía, ~+9 %). **Pasaría a sustituir a Snowflake** si, con los resultados del 3T (principios de diciembre), se cumplen tres cosas: CEO definitivo con experiencia en software empresarial, Atlas ≥ 26 % y altas de clientes ≥ 2.500; y siempre que Snowflake no haya cumplido su condición del tramo 2. Entonces, 3,5 %, unas 3 acciones) en dos tramos, con límite de **~411 USD** (el máximo de compra sin contar los comparables, más prudente que los 443 de la regla).

## 14. Puntuación

| Bloque | Puntos | Máx. | Detalle |
|---|---|---|---|
| A. Crecimiento | 18,3 | 25 | Ventas 12 m +25,5 % (3), CAGR a 2 años 23,7 % (3), aceleración +6,9 pp (5) |
| B. Mercado y tecnología | 14,7 | 20 | Penetración 2,8 % (4), tecnología 3, posición 4 |
| C. Cambio de tendencia | 12,5 | 20 | 5/8 señales, sin euforia |
| D. Economía unitaria | 12,0 | 15 | Margen bruto 72,7 % (4), regla del 40 = 48,9 (3), FCF creciente (5) |
| E. Caja y dilución | 10,0 | 10 | FCF positivo (5), dilución neta ~0 % (5) |
| F. Ejecución y dirección | 7,0 | 10 | Historial 5, dirección 2 |
| **Total** | **74,5** | **100** | Señal: **Comprar (baja)**; cumple todos los requisitos de compra |

**Propuestas de mejora del método** (sin tocar el código; para probar con el backtest):
1. **Comparables verificados o fuera.** Aquí la mediana de comparables (en parte de memoria) sube el alcista hasta el techo y aporta 9 pp de ponderada. Propuesta: que solo cuenten comparables con fuente del día, o limitar su efecto a base × 1,3 cuando la empresa cotiza en su mediana de 3 años.
2. **Rotación en la dirección → probabilidades 35/50/15.** Salida del CEO o de dos altos directivos en 3 meses como caso de «ejecución dudosa» explícito (aquí, ponderada de +24,7 % a +10,9 %; sigue en Comprar).
3. La regla min(mecánico, guía + exceso) se confirma útil y poco agresiva: en MongoDB resta solo 2 pp porque la empresa guía muy por debajo de lo que hace.

## Fuentes

[1] MongoDB, nota de resultados del 2T FY27 (1-sep-2026), 8-K ex. 99.1 (SEC EDGAR).
[2] MongoDB, notas de resultados del 1T FY27 (28-may-2026), 4T FY26 (2-mar-2026), 3T FY26 (1-dic-2025) y 2T FY26 (26-ago-2025), 8-K ex. 99.1 (SEC EDGAR): guías trimestrales y anuales.
[3] MongoDB, 8-K del 28-sep-2026 (salida del CEO, consejero delegado interino, guía reafirmada) y del 29-sep-2026 (Investor Day; 1.000 M USD más de recompra).
[4] Investor Day del 29-sep-2026: Yahoo Finance («MongoDB unveils AI products, raises long-term targets amid CEO transition»), BofA vía Yahoo, transcripción de StockAnalysis, CoreValue Research.
[5] Yahoo Finance chart API (MDB y ^NDX) y Nasdaq.com (histórico): cierre de 373,07 USD el 13-oct-2026 en las dos; medias y subidas calculadas.
[6] SEC EDGAR, formularios 4, 144 y 13G de MongoDB (jun-oct 2026).
[7] MarketBeat, previsiones de analistas de MDB (14-oct-2026).
[8] TipRanks, «MongoDB stock swung widely today, October 13»; Investing.com, «Why is MongoDB stock rallying today?».
[9] StockTwits, flujo de mensajes de $MDB (9-14 oct-2026).
[10] Quartz y Finviz (2-sep-2026); Motley Fool, transcripción de la llamada del 2T FY27; TIKR (mar-2026); Diginomica, Blocks and Files y Constellation Research (sep-2026).
[11] MongoDB, 10-Q del 2T FY27 y SEC XBRL companyfacts (CIK 1441816).
[12] Cálculo propio de EV, múltiplos de hoy, mínimo de 12 meses, mediana y mínimo de 3 años y DCF inverso.
[13] Citi Global TMT Conference (9-sep-2026), transcripción en Investing.com; VentureBeat, «6 data predictions for 2026»; DEV Community y blogs técnicos de 2026 sobre Postgres frente a MongoDB.
[14] **De memoria o de terceros, sin verificar en esta sesión**: tamaño del mercado de bases de datos (IDC/Gartner); múltiplos de Elastic y ServiceNow (este, de un mensaje de StockTwits); Snowflake y Datadog salen de los informes growth del repo del 14-oct.
