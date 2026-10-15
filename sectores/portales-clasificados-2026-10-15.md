# Ficha sectorial: portales de clasificados en línea (coches e inmuebles), 15-oct-2026

Hecha con el análisis de Auto Trader (`informes/auto-trader-2026-10-15/`), a partir de sus notas B y D (fuentes primarias citadas allí). Cifras de mercado al cierre del 14-oct-2026; caducan el 14-nov-2026. Comparables en `portales-clasificados-2026-10-15-comparables.json` (millones de GBP, misma base: MarketScreener/S&P Global; Rightmove, Scout24, REA, CAR Group, CarGurus, Cars.com y Hemnet).

## 1. Perímetro
Portales en línea donde profesionales (concesionarios, agentes inmobiliarios) y particulares anuncian coches o viviendas y pagan por suscripción, por anuncio o por servicios añadidos (financiación, valoración, reserva). GICS: Servicios de comunicación / Medios interactivos. No entran los vendedores directos de coches (Cazoo, Cinch, Carvana) ni los agregadores de financiación. Para los informes value, `mercado_final` se mide en el mercado subyacente de cada país (transacciones), porque no hay estadística pública del gasto en anuncios: en coches del Reino Unido, compraventas de usados de la SMMT/DVLA. La cuota se mide en minutos de audiencia (Comscore), no en ingresos: con ese perímetro `mercado_final` va en `null` y la prueba de cuota se hace a mano con poder de precios y audiencia.

## 2. Tamaño y crecimiento
- Coches usados, Reino Unido: 7,81 millones de compraventas en 2025 (+2,2 %), 6,75 M en 2020 y 6,89 M en 2022 (SMMT); 7,7 M en los 12 meses a marzo de 2026 según Auto Trader. Crecimiento 2020-2025 ≈ +3 % anual en volumen, casi plano desde 2021 (+0,9 %). La oferta de coches de 5-7 años caerá ≈17 % en dos años por las matriculaciones perdidas en la pandemia (Auto Trader, informe anual 2026).
- El crecimiento del sector **no sale del volumen sino del precio por cliente** (ARPR/ARPA): Auto Trader +5 % en FY2026 con forecourts −0,5 %; Rightmove ARPA +7-8 %. Previsión de los portales líderes: ventas +4-8 % anual (consenso MarketScreener), por debajo del 8-12 % de 2015-2024.

## 3. Estructura competitiva y cotizadas
Mercados nacionales con un líder que concentra la audiencia (efecto red de dos lados): Auto Trader >75 % de los minutos en portales de coches del Reino Unido (11 veces el segundo), Rightmove en inmuebles británicos, REA y CAR Group en Australia, Scout24 en Alemania. Los segundos (CarGurus, Motors, eBay/Gumtree, Carwow) tienen cuotas de audiencia de un dígito.

| Cotizada | Ticker | Capitalización (M GBP) | Crec. ventas NTM | Margen EBITDA | DN/EBITDA | PER NTM | EV/EBITDA NTM |
|---|---|---|---|---|---|---|---|
| Rightmove | RMV.L | 3.726 | 7,3 % | 72 % | 0,1x | 15,5x | 11,5x |
| Scout24 | G24.DE | 4.332 | 14,7 % | 62,5 % | 1,0x | 17,2x | 10,8x |
| REA Group | REA.AX | 10.861 | 6,1 % | 59,5 % | −0,4x | 26,6x | 16,1x |
| CAR Group | CAR.AX | 4.620 | 10,8 % | 55,9 % | 1,6x | 21,1x | 12,5x |
| CarGurus | CARG | 2.022 | 8,5 % | 33,1 % | −0,6x | 12,3x | 6,7x |
| Cars.com | CARS | 401 | 1,4 % | 29,2 % | 1,8x | 9,2x | 4,2x |
| Hemnet | HEM.ST | 469 | −2,3 % | 50,3 % | 0,9x | 13,4x | 9,9x |
| **Auto Trader** | AUTO.L | 3.913 | ≈4 % | 66 % | 0,5x (1,1x ajustada) | 12,6x (consenso) | 9,9x |

Mediana del PER NTM: 15,5x; del EV/EBITDA NTM: 10,8x. Transacciones 2019-2024: 22,9-26,5x EBITDA (AutoScout24, Trader Interactive, la oferta de REA por Rightmove, Domain).

## 4. Economía del negocio
Margen EBITDA mediano del 56 % y cuartil superior del 62-72 % (Rightmove, Auto Trader, Scout24); capex del 1-3 % de las ventas, circulante casi nulo, conversión de beneficio en caja ≈100 %. ROIC del líder del 40-60 % sobre capital tangible; sobre capital con fondo de comercio de la salida a bolsa o de compras, 15-50 %. Lo que separa al líder del segundo: la cuota de audiencia (los concesionarios pagan por el portal donde está el comprador) y el poder de subir precio cada año; los segundos (CarGurus, Cars.com) tienen la mitad o menos del margen.

## 5. Ciclo y regulación
Poco cíclico: los ingresos son suscripciones de profesionales. En 2009 los portales siguieron creciendo; en 2020 Auto Trader regaló anuncios meses y su BPA de FY2021 cayó a la mitad, recuperado en un año; en 2022-2023 la subida de tipos bajó los múltiplos, no las ventas. Regulación: en el Reino Unido, la CMA con poderes directos (ley DMCC) investiga desde el 27-mar-2026 las reseñas en línea (Auto Trader incluida); impuesto digital del 2 % (≈10,6 M al año en Auto Trader); en inmuebles, Rightmove con la CMA vigilando las tarifas. **El riesgo de régimen es la IA**: asistentes y agentes de compra que capten la búsqueda (hoy <1 % del tráfico de Auto Trader) y la entrada de plataformas con audiencia propia (Amazon Autos en el Reino Unido, anunciada para finales de 2026 según la prensa sectorial). Desde 2025 todo el sector se ha desrateado: PER de 25-30x a 12-17x en Europa.

## 6. Lo que vigilar
1. Clientes de pago y precio por cliente (forecourts/agentes y ARPR/ARPA), semestral, en los resultados de cada portal.
2. Audiencia: visitas y minutos (Comscore, que publican los propios portales), semestral; dos semestres a la baja serían la primera señal de desintermediación.
3. Tráfico que llega desde asistentes de IA y acuerdos con ellos (ChatGPT por MCP, Google), en las presentaciones.
4. Compraventas de usados de la SMMT (trimestral) y entrada de Amazon Autos en el Reino Unido.

**En cinco líneas.** El dinero se gana en el portal que concentra la audiencia de un país, no en los segundos. El sector merece buscar oportunidades porque el miedo a la IA ha desrateado a los líderes a 12-17 veces beneficios con márgenes del 60-70 %, pero la tesis exige creer que la audiencia aguanta: la única prueba son los datos de audiencia y precio de cada semestre. Auto Trader es el líder más barato (12,6x NTM del consenso, 12,0x sobre nuestro BPA de FY2028e) por su frenazo propio (Deal Builder). Rightmove queda excluida por el usuario. Sufren si la IA capta la búsqueda; se benefician si se convierten en la fuente de datos de los agentes.
