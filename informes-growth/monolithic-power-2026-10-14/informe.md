# Monolithic Power Systems (MPWR): análisis growth, 14-oct-2026

**Señal (método v9, vigente): Vender / no comprar** · Puntuación 70,7/100 · Señales de cambio de tendencia 4/8 · EV/beneficio bruto NTM 23,7x · Sin euforia (+34,4 % en 12 meses)
Precio 1.319,55 USD (cierre del 13-oct) · Objetivo 12 m 1.060,5 USD (ponderada −19,0 %, base −16,9 %, bajista −60,1 %, alcista +17,7 %) · Compra hasta 1.015,8 USD
**v7 (referencia): igual.** Vender / no comprar, −19,0 % / −16,9 %, compra hasta 1.015,8 USD. MPS solo da guía trimestral, así que v9 no tiene guía de 12 meses que aplicar y proyecta como v7 (es el único aviso del motor).
**Al precio actual** (1.258,50 USD, 14-oct a las 17:00 UTC, −4,6 % en la sesión; Yahoo y Nasdaq.com), con el objetivo del informe fijo: ponderada **−15,1 %**, base −12,9 %, bajista −58,2 %, alcista +23,4 %. Sigue en no comprar: está un 24 % por encima del «compra hasta».
Peso orientativo: **no entra**. Ni sustituye a ninguna growth ni entra en la lista de suplentes. Queda en observación por debajo de ~1.016 USD (sección 13).

> **Calculado con el método v9** (`verticales/growth/metodo.md`) y con EV/EBITDA NTM, porque MPS gana dinero de forma estable desde hace más de una década. Su margen operativo GAAP es del 30 % y el no GAAP, del 37,5 %. La regla mecánica proyecta las ventas para los 12 meses a jun-2028: 5.719 M USD en el base, 4.412 M en el bajista y 6.289 M en el alcista. El múltiplo de hoy, 32,8x, se rebaja por desaceleración (×0,72): queda en 23,5x en el base, 14,1x en el bajista y 30,6x en el alcista. Nuestra proyección (4.800 / 5.950 / 6.800 M) es solo contraste. El margen EBITDA implícito que usa el motor es del 39,9 %, igual que el que estimamos para los próximos 12 meses.

## 1. La tesis en cinco líneas

1. MPS diseña chips y módulos de alimentación eléctrica (convertidores, reguladores de tensión) y no tiene fábricas propias. Su gran negocio de hoy es **alimentar las GPU de IA (Nvidia) y los servidores**. Factura **3.273 M USD en 12 meses (+28,7 %)**, con un 55 % de margen bruto, un 31 % de margen operativo GAAP y caja neta de 1.414 M.
2. **Ha recuperado la cuota en Nvidia.** En 2025, Enterprise Data cayó un 2 % al perder parte de Blackwell frente a Infineon y otros. En 2026 sube un +97 % en el 1T y un **+164 % en el 2T**. La guía del 3T (1.150 M, +56 %) quedó un 17 % por encima del consenso. KeyBanc estima un ~70 % de cuota en Vera Rubin, pero la empresa no lo confirma.
3. Es un negocio excelente que siempre cumple. Ha batido su guía trimestral en los 8 últimos trimestres, por +5,2 puntos de media en el último año, y el fundador lleva 29 años al frente.
4. Pero **el precio descuenta el pico del ciclo**: 32,8x el EBITDA de los 12 meses siguientes, que incluye la rampa de Rubin. Son 63x sobre el EBITDA GAAP pasado y ~48x el beneficio de 2026. Cuando el crecimiento vuelva al ~25 % (el consenso de 2027 es +28 %), la regla rebaja el múltiplo un 30 % y el base sale en −17 %.
5. Hay riesgos de semiconductor cíclico: un solo gran cliente final detrás de Enterprise Data (el 39 % de las ventas), el 51 % de las ventas facturadas a China y el 56 % de los activos fijos allí, y la demanda de patentes de Vicor ante la ITC (abierta el 9-oct). A eso se suma una debilidad material de control interno con un CFO interino y ventas de directivos, sin ninguna compra. Es una gran empresa, pero no a este precio. Se compraría por debajo de ~1.016 USD.

## 2. Negocio y tecnología

- **Qué vende**: circuitos integrados y módulos de gestión de energía. Son reguladores multifase y etapas de potencia que bajan los 48 V o 12 V del rack a <1 V para la GPU o la CPU, convertidores CC-CC, controladores de motor y sensores. Lo vende a seis mercados [1]:

| Mercado (2T26) | Ventas M USD | Interanual | % del total |
|---|---|---|---|
| Enterprise Data (GPU de IA, servidores) | 380,6 | +164,3 % | 38,8 % |
| Storage & Computing (portátiles, memoria) | 199,8 | +2,3 % | 20,4 % |
| Automoción | 157,1 | +8,2 % | 16,0 % |
| Comunicaciones (ópticos, switches) | 131,5 | +78,3 % | 13,4 % |
| Consumo | 56,8 | −4,8 % | 5,8 % |
| Industrial | 54,8 | +17,3 % | 5,6 % |

- **Qué tiene de nuevo**: un proceso BCD propio que se fabrica en fundiciones externas y le da densidad y eficiencia, y el **encapsulado propio** para hacer módulos de potencia completos. Va camino de dejar de ser «solo chips» para ser un proveedor de soluciones completas: módulos de 48 V verticales (ya en varios clientes), convertidores de 800 V CA-CC con carburo de silicio para la nueva arquitectura de centros de datos (en muestras), interfaces de memoria DDR5 (primeros pedidos), automatización de edificios y robótica [1][8].
- **A quién**: el 88 % de las ventas pasa por distribuidores (el distribuidor A es el 28 %, el B el 15 % y el D el 10 %). El 94 % se factura a Asia. Los clientes finales no se publican. Enterprise Data está ligado sobre todo a las placas de GPU de Nvidia y de sus ensambladores (de memoria y por la prensa, sin dato de la empresa) [3][11].
- **Fabricación**: no tiene fábricas de obleas, pero sí plantas propias de prueba y encapsulado, sobre todo en Chengdu (China). El 56 % de sus activos fijos está en China (432,8 de 774,5 M). Diversifica hacia Taiwán, Malasia y EE. UU., y desde el 9-sep también hacia **GlobalFoundries en Singapur** (volumen en 2027) [3][12].

## 3. Crecimiento

| Trimestre | Ventas M USD | Interanual | Guía (punto medio) | Bate la guía |
|---|---|---|---|---|
| 3T24 | 620,1 | +30,6 % | | |
| 4T24 | 621,7 | +36,9 % | | |
| 1T25 | 637,6 | +39,2 % | | |
| 2T25 | 664,6 | +31,0 % | 650 | +2,2 % |
| 3T25 | 737,2 | +18,9 % | 720 | +2,4 % (+2,8 pp) |
| 4T25 | 751,2 | +20,8 % | 740 | +1,5 % (+1,8 pp) |
| 1T26 | 804,2 | +26,1 % | 780 | +3,1 % (+3,8 pp) |
| 2T26 | 980,6 | +47,6 % | 900 | +9,0 % (+12,2 pp) |
| 3T26 (guía) | 1.140-1.160 | +56,0 % | 1.150 | resultados el 29-oct |

| Año | Ventas M USD | Crecimiento |
|---|---|---|
| 2023 | 1.821,1 | +1,5 % (bajón del ciclo) |
| 2024 | 2.207,1 | +21,2 % |
| 2025 | 2.790,5 | +26,4 % |
| 12 m a jun-2026 | 3.273,1 | +28,7 % |
| 2026 (consenso) | ~4.150 | ~+49 % |
| 2027 (consenso) | ~5.300 | ~+28 % |

- **CAGR propio a 2 años**: 31,5 % (1.894 → 3.273 M en 12 meses). **Aceleración**: +23,4 pp (47,6 % frente a una media del 24,2 % de los cuatro trimestres anteriores).
- **Retención**: no aplica (no es software). **Guía**: solo trimestral, nunca anual, así que `guia_12m_pct` = null y **v9 no recorta**. El exceso medio sobre la guía es de +5,2 pp en los 4 últimos trimestres [5].
- **Ojo con la calidad del salto**: casi todo viene de Enterprise Data (+236 M de los +316 M interanuales del 2T). Storage & Computing (+2 %) y consumo (−5 %) siguen flojos, y la automoción crece poco (+8 %; la empresa espera «mitad de la decena» en el año). Es una rampa de producto en un cliente, no un crecimiento repartido.

## 4. Mercado y competencia

- **Mercado alcanzable**: ~50.000 M USD en 2028 (estimación de memoria, sin comprobar [15]). Sale de la gestión de energía analógica (~40.000-45.000 M) más los módulos de potencia de centros de datos y la automoción. **Penetración del 6,5 %.** La empresa apunta a una capacidad de fabricación «muy por encima de 6.000 M» de ventas al año, casi el doble de lo que factura hoy [1].
- **Rivales**: Infineon, Renesas e Intersil, Texas Instruments, Analog Devices, Vicor (módulos de alimentación vertical) y Alpha & Omega (etapas de potencia). En la alimentación de GPU, MPS fue el proveedor principal de Hopper y perdió parte de Blackwell en 2025 (la «noticia» de Deutsche Bank: ~15 % de las ventas en riesgo). En 2026 vuelve a ganar con Blackwell Ultra y Rubin. Rosenblatt espera a TI y quizá a ADI en Rubin, y KeyBanc estima ~70 % de cuota para MPS [11].
- **Por qué gana**: densidad de potencia y rapidez de diseño (proceso y encapsulado propios), capacidad de suministro diversificada y precio. **Por qué puede perder**: Nvidia tiene dos o tres proveedores por plataforma y cambia el reparto en cada generación, como en 2025. La propia Nvidia también podría integrar la gestión de energía.
- **Posición 4/5, tecnología 4/5**: es líder en las GPU, pero con alternativas reales y sin efecto red.

## 5. Cambio de tendencia

| # | Señal | ¿Sí? | Prueba | Fuente |
|---|---|---|---|---|
| 1 | Revisiones al alza | **Sí** | Guía del 3T de 1.150 M frente a un consenso de ~982 M (+17 %). Needham sube a 2.000, KeyBanc a 2.100 y Truist a 1.889; TD Cowen reitera 1.850 el 5-oct. Ventas 2026 de ~4.150 M | [1][7][8] |
| 2 | Precio sobre la media de 200 y la media al alza | **Sí** (por poco) | Cierre de 1.319,55 frente a una media de 1.299,3 que sube (1.258,7 hace un mes). El intradía del 14-oct (~1.258) ya está por debajo | [6] |
| 3 | Fuerza relativa a 6 m | No | −3,8 % frente al Nasdaq-100 (+20,4 %) y al SOXX (+38,3 %) | [6] |
| 4 | EV/ventas ≥ +20 % desde el mínimo de 12 m | No | +19 % en EV/ventas NTM (11,0x el 18-nov-2025 → 13,1x) y +13 % en EV/EBITDA (29,1x → 32,8x) | [6][14] |
| 5 | Inflexión operativa | **Sí** | Margen operativo GAAP del 31,0 % frente al 24,8 % (+6,2 pp); no GAAP del 37,5 % frente al 34,8 % | [1] |
| 6 | Sentimiento mejorando | No | Cae un 22 % desde el máximo de junio y un 15 % desde el 5-oct, con la venta de semis y la denuncia de Vicor ante la ITC. Hay debate sobre su valoración | [9][10][11] |
| 7 | Compras de directivos o de inversores de referencia | No | Solo ventas: Hsing vendió ~40 M USD el 28-sep y ~67 M en mayo, y otros siete directivos también venden. Recompras mínimas | [4] |
| 8 | Catalizador nuevo en 6 meses | **Sí** | Rampa de Vera Rubin (2S26), DDR5, 800 V, GlobalFoundries y resultados del 29-oct | [1][12][13] |

**4 de 8.** **Euforia: no.** Sube un +34,4 % en 12 meses, lejos del +150 % del veto, y el EV/beneficio bruto NTM es de 23,7x. La subida está muy por debajo de la de su sector (SOXX +91 %, Vicor +414 %): el mercado ya ha descontado parte del riesgo de ciclo y de cuota.

## 6. Economía unitaria y camino a la rentabilidad

- **Margen bruto** GAAP del 55,2 % en 12 meses, estable desde hace años (55-56 %). La empresa dice estar en la parte baja de su rango objetivo y espera que se mantenga o suba algo [8].
- **Margen operativo**: GAAP del 28,7 % en 12 meses (940 M) y no GAAP de ~35 %. El 2T26 marca un 31,0 % y un 37,5 %, y la guía del 3T implica ~38 % no GAAP. **EBITDA ajustado** (GAAP + pagos en acciones + amortizaciones) de ~1.207 M en 12 meses y de ~1.938 M estimados para los 12 meses siguientes [14].
- **FCF**: 585,6 M en 12 meses (flujo de operaciones de 822,4 M menos inversiones de 236,8 M), un **17,9 % de las ventas**. Ha bajado frente a 2025 (666 M) y 2024 (642 M) porque el circulante crece con las ventas (inventario +111 M y clientes +88 M en el 1S26) y por las inversiones en capacidad (153 M en el 1S26 frente a 88 M). Por eso puntúa «FCF positivo» y no «creciente».
- **Regla del 40**: 28,7 + 17,9 = **46,6**.
- **Dividendo**: 2,00 USD por trimestre (+28 % en 2026), ~400 M al año: **casi el 70 % del FCF**. Si el FCF no sube con las ventas, el dividendo y la capacidad compiten por la misma caja.

## 7. Caja, deuda y dilución

- **Caja e inversiones de 1.413,8 M, sin deuda.** FCF positivo: la pista es infinita.
- **Pagos en acciones**: 209 M en 12 meses, un **6,4 % de las ventas** (lejos del 15 % que marca alerta).
- **Dilución del 2,6 %** en 12 meses (48,02 → 49,26 M de acciones diluidas). Se debe a la entrega de acciones de los planes plurianuales a principios de 2026. Las recompras casi no la compensan: 4 M USD en el 1S26, aunque la autorización sube a 1.000 M [3].
- Sin convertibles.

## 8. Dirección y ejecución

- **Historial 5/5**: ha batido el punto medio de su guía trimestral en los 8 últimos trimestres, con márgenes siempre dentro del rango [5].
- **Dirección 3/5**:
  - A favor: Michael Hsing es el fundador y lleva 29 años como CEO. El capital se asigna con prudencia (sin deuda, dividendo creciente, compras pequeñas y bien integradas).
  - En contra: el CFO Bernie Blegen se retiró en febrero y **Rob Dean es interino desde hace ocho meses**, sin sucesor nombrado [5]. Hay una **debilidad material de control interno** en impuestos diferidos que sigue sin corregir a 30-jun; la empresa espera cerrarla a fin de 2026 [3].
  - Además, hay ventas continuas de directivos: Hsing, ~107 M USD entre mayo y septiembre; S. Tseng, D. Xiao, M. Sciammas y otros [4].

## 9. Valoración

**Ejercicio objetivo**: los 12 meses a jun-2028. **Métrica**: EV/EBITDA NTM, porque es rentable de forma estable. El motor saca un margen EBITDA implícito del 39,9 % de los dos múltiplos.

- **EV al cierre**: 1.319,55 × 49,3 − 1.413,8 = **63.640 M USD** (al precio actual, 60.630 M).
- **Ventas NTM** (3T26-2T27): **~4.865 M (+48,6 %)**. Suman la guía del 3T (1.150), el 4T implícito en el consenso de 2026 (~1.215) y un 1S27 de ~2.500, estimación propia [14]. **EV/ventas NTM 13,1x, EV/EBITDA NTM 32,8x y EV/beneficio bruto NTM 23,7x** (el tope de compra es 35x). Sobre 12 meses pasados, EV/EBITDA GAAP de 63,4x y PER de 76x (StockAnalysis). PER del consenso de 2026 de ~48x y de 2027 de ~38x [7].
- **Historia de 3 años**, con el EBITDA ajustado real de los 4 trimestres siguientes [14]: **mediana de ~30,5x y mínimo de 25,3x** (mar-2025, en plena «pérdida» de Blackwell). Máximo de 45x (sep-2024). Hoy cotiza un poco por encima de la mediana.
- **Comparables**: Texas Instruments ~23x NTM (27,7x pasado), Analog Devices ~24x (29,7x pasado), Infineon ~13x (de memoria). **Mediana de ~23x.** MPS crece mucho más que todos.
- **Desaceleración**: el crecimiento NTM es del 48,6 % (la rampa de Rubin). El del año objetivo se estima en ~25 %, porque el consenso de 2027 es +28 % y luego se frena. Factor √(25/48,6) = 0,72, con tope del −30 %.

| Escenario | Ventas 12 m a jun-2028 | Supuesto (regla mecánica) | EV/EBITDA | Precio 12 m | Rentabilidad |
|---|---|---|---|---|---|
| Bajista (25 %) | 4.412 | La mitad del crecimiento base | 14,1x | 519,1 | −60,1 % |
| Base (50 %) | 5.719 | +34,8 % y +29,6 % (media del pasado y del CAGR propio, con decaimiento) | 23,5x | 1.089,0 | −16,9 % |
| Alcista (25 %) | 6.289 | ×1,2 el crecimiento base | 30,6x | 1.544,9 | +17,7 % |
| **Ponderado** | | | | **1.060,5** | **−19,0 %** |

Las rentabilidades incluyen el dividendo (0,6 %). **Asimetría**: 0,3. **Precio máximo de compra: 1.015,8 USD**, que lo fijan la ponderada del 5 % y la base del 0 %. El tope de 35x el beneficio bruto quedaría muy por encima. **v7 da exactamente lo mismo.**

**Al precio actual (1.258,50 USD, 17:00 UTC)**, con el objetivo fijo de 1.060,5: ponderada **−15,1 %**, base −12,9 %, bajista −58,2 % y alcista +23,4 %. Sigue en Vender / no comprar.

**Sensibilidad** (mismo código, sin cambiarlo):

| Variante | Ponderada | Base | Señal |
|---|---|---|---|
| Vigente, cierre de 1.319,55 | −19,0 % | −16,9 % | Vender / no comprar |
| Precio actual de 1.258,50, objetivo fijo | −15,1 % | −12,9 % | Vender / no comprar |
| Crecimiento del año objetivo de la regla (29,6 %) en vez de 25 % | −12,1 % | −9,8 % | Vender / no comprar |
| Crecimiento del año objetivo del 35 % | −4,7 % | −2,1 % | Mantener |
| Múltiplo de hoy (32,8x) sin rebaja, ventas mecánicas | ~+14 % | ~+16 % | (cálculo a mano, fuera de la regla) |
| Probabilidades de 35/50/15 (ciclo y un cliente) | −26,8 % | −16,9 % | Vender / no comprar |
| Crecimiento NTM y del año objetivo de la regla (34,8 % y 29,6 %) | +13,6 % | +16,6 % | Comprar (baja), hasta 1.428 |

- **Lectura**: la señal depende de cuánto múltiplo pierda MPS cuando pase la rampa de Rubin. La última fila compra, pero es incoherente: aplica el EV/EBITDA calculado sobre el EBITDA de la guía (1.938 M) a unas ventas NTM más bajas (4.412 M), y el margen EBITDA implícito sube al 44 %, cuando el real es del ~40 %. Es la mejora 2 de Arista, ya pendiente. Con supuestos coherentes, el precio de hoy solo se justifica si MPS **conserva ~33x el EBITDA con un crecimiento del 25 %**. En el ciclo pasado, ese múltiplo se pagó en el pico (45x en sep-2024) y luego cayó a 25x en seis meses.
- **Consenso**: objetivo medio de 1.840 USD (+39 % sobre el cierre; de 1.575 a 2.100; 17 analistas, 16 de ellos en Comprar). Ventas de 2027 de 5.300 M. Nuestra proyección base (5.950 M a jun-2028) está algo por encima de la mecánica (5.719). Con ella y el múltiplo base de 23,5x, el precio sería de ~1.130 (−14 %).
- **DCF inverso**: con un FCF NTM de ~1.000 M (tras impuestos, pagos en acciones, inversiones y circulante), un 9 % de descuento y un 3 % perpetuo, el precio descuenta **~21 % anual durante 10 años**. Es mucho para un fabricante de semiconductores cíclico: MPS lo ha hecho en su historia (CAGR de ~22 % en 2014-2024, de memoria), pero arrancando desde un pico.

## 10. Foros y sentimiento

- **StockTwits** [10]: alcista y tranquilo. De los 20 últimos mensajes, 8 son alcistas y ninguno bajista. Se habla de la «ruptura» del 22-sep, de vender opciones put a 1.160 y de «picks and shovels» de la IA, y uno avisa de que paga ~80 veces el beneficio pasado. No hay euforia.
- **Prensa y analistas** [11]: TIKR y Barchart son constructivos (Rubin y la capacidad con GlobalFoundries). Rosenblatt (Neutral) y Loop (Mantener) piden un mejor momento por la valoración. Las caídas de octubre se atribuyen al sector (memoria, huelgas en Taiwán) y a la **denuncia de Vicor ante la ITC**.
- **Reddit, Rankia e Investing.com ES**: no aparecen hilos recientes indexados. Es una laguna: no se pudo medir el sentimiento minorista en castellano.
- **Contraste con los datos**: el negocio nunca ha ido mejor (récord de ventas y de márgenes, guía +56 %), pero la acción lleva cuatro meses bajando (−22 %). El mercado ya duda de cuánto dura la rampa de IA. Esa duda no es irracional: es la que hundió el múltiplo en 2025.

## 11. Riesgos y qué rompería la tesis

1. **Ciclo de IA y dependencia de Nvidia** (riesgo principal). Enterprise Data ya es el 39 % de las ventas y explica tres cuartas partes del crecimiento. En 2025, perder parte de Blackwell dejó ese mercado en −2 % y el múltiplo en 25x. Si Nvidia reparte Rubin con TI, ADI o Infineon, o si los hiperescaladores frenan la inversión en 2027, las ventas y el múltiplo caen a la vez.
2. **Riesgo de IA** (cómo afecta la IA al modelo de negocio): bajo en disrupción, porque la IA no sustituye a un regulador de tensión: lo necesita. Alto en ciclo, porque es «picks and shovels» del gasto en IA, justo el tipo de riesgo que el usuario dijo que le da miedo (Duolingo, 14-oct).
3. **Concentración**: tres distribuidores suman el 53 % de las ventas y un revendedor tiene el 20 % de las cuentas a cobrar. El cliente final real de Enterprise Data está muy concentrado, aunque la empresa dice que no.
4. **China**: el 51 % de las ventas se factura a China y el 56 % de los activos fijos están allí (Chengdu). Hay riesgo de aranceles, controles de exportación y represalias. Por ahora «sin impacto material» [3], pero se puede activar en días. Lo mitiga la diversificación (GlobalFoundries en Singapur en 2027).
5. **Patentes de Vicor**: la ITC abrió el 337-TA-1526 el 9-oct. Vicor pide una orden de exclusión de módulos de alimentación vertical, y hay otra demanda en Texas desde enero [9]. No es una condena, pero en módulos de 48 V es justo el negocio nuevo de MPS.
6. **Gobierno**: debilidad material de control interno, CFO interino desde febrero y ventas continuas de directivos.
7. **Ciclicidad de semiconductores**: inventarios internos de 676 M (140 días), pedidos cancelables sin penalización y plazos de 16-26 semanas. Es el clásico riesgo de doble pedido en un pico.

**Señales de venta concretas (si se tuviera)**: dos trimestres seguidos de caída secuencial de Enterprise Data; pérdida confirmada de cuota en Rubin; una orden de exclusión de la ITC sobre los módulos de 48 V; restricciones de exportación que afecten a Chengdu; o una guía trimestral por debajo del consenso con días de inventario al alza.

## 12. Catalizadores con fecha

- **29-oct-2026**: resultados del 3T26 (guía de 1.140-1.160 M). Lo importante es la guía del 4T, la mezcla de Enterprise Data y lo que digan de Rubin y de 2027.
- **15-oct-2026**: pago del dividendo de 2,00 USD.
- **~23-nov-2026**: la ITC fija el calendario del 337-TA-1526 (45 días desde que lo abrió).
- **Fin de 2026**: cierre previsto de la debilidad material y posible nombramiento del CFO definitivo.
- **2S26-1S27**: rampa de Vera Rubin, primeros ingresos de DDR5 y del 800 V (fechas no confirmadas por la empresa).
- **2027**: producción en volumen en GlobalFoundries Singapur.

## 13. Encaje en cartera

- **Señal**: **Vender / no comprar** al cierre y al precio actual, con v9 y con v7. **Revisión del precio de hoy hecha**: a 1.258,50 USD (17:00 UTC), con el objetivo fijo, la ponderada es −15,1 %. No hay orden que proponer. Solo pasaría a Comprar por debajo de **~1.016 USD**, un 19 % por debajo del precio actual (el mínimo de 12 meses fue de 857).
- **Frente a la cartera value y a `MEMORIA.md`**: Alphabet se vende mañana y no cuenta como exposición a IA, así que la cartera se queda casi sin exposición directa al gasto en IA. Aun así, MPS no es la forma de reponerla. Es la apuesta más pura del bolsillo al ciclo de inversión en IA de unos pocos clientes (como Arista y Celestica, que tampoco entraron), y el usuario ha dicho que le da miedo ese ciclo.
- **Frente al bolsillo growth** (`informes-growth/cartera-growth.md`, **lleno, ~20 %**: Nu, argenx, Shopify, Axon y Snowflake; liquidez de ≈27 EUR): **no sustituye a ninguna**. Las más flojas, Shopify (≈+18 %) y Snowflake (≈+16 %), sacan ~33 puntos de rentabilidad esperada a MPS (−15 %).
- **Suplentes**: **no entra en la lista** (Samsara, Datadog, Natera, MongoDB, Toast, Zscaler, Dexcom), porque no es Comprar. Queda **en observación, fuera de la vigilancia formal**: su ponderada es negativa, no está entre 0 y 5 %. Volvería a mirarse tras los resultados del 29-oct si la guía del 4T y lo que digan de 2027 suben el crecimiento del año objetivo por encima del ~35 %, o con el precio por debajo de ~1.016 USD sin cambio de tesis.
- **Si algún día entrara**: 3,5 % (convicción baja por el ciclo y la concentración), en dos tramos y nunca por encima del «compra hasta» del informe vigente.

## 14. Puntuación

| Bloque | Puntos | Máx. | Detalle |
|---|---|---|---|
| A. Crecimiento | 20,0 | 25 | Ventas 12 m +28,7 % (3), CAGR 2 años 31,5 % (4), aceleración +23,4 pp (5) |
| B. Mercado y tecnología | 14,7 | 20 | Penetración 6,5 % (3), tecnología (4), posición (4) |
| C. Cambio de tendencia | 10,0 | 20 | 4 de 8 señales (revisiones, media de 200, inflexión operativa, catalizador) |
| D. Economía unitaria | 10,0 | 15 | Margen bruto 55,2 % (3), regla del 40 de 46,6 (3), FCF positivo (4) |
| E. Caja y dilución | 8,0 | 10 | FCF positivo (5), dilución del 2,6 % (3) |
| F. Ejecución y dirección | 8,0 | 10 | Historial (5), dirección (3) |
| **Total** | **70,7** | **100** | |

**Lecciones para el método** (sin tocar el código; pendientes del backtest):
1. **Semiconductores cíclicos en plena rampa**: la rebaja por desaceleración (×0,72) actúa justo donde más protege, al comprar un EBITDA de pico a un múltiplo de pico. Pero en el base deja el múltiplo (23,5x) por debajo del mínimo de 3 años (25,3x), que ya fue un momento de pánico. La regla no usa el historial como suelo en el base, y es coherente con no suponer vuelta a la media. Se apunta como observación, no como cambio: en el backtest no hay casos de semis cíclicos en rampa para probar un suelo.
2. **Confirma la mejora 2 de Arista** (la señal depende del campo de crecimiento NTM): aquí pasa de −19 % a +13,6 % (Comprar) solo con dejar vacíos los crecimientos y que los ponga la regla. La causa es el margen EBITDA implícito: sale de dividir el EV/ventas NTM entre el EV/EBITDA, y si el crecimiento NTM no es el mismo con el que se calculó el EBITDA, el margen se infla (44 % frente al 40 %). Refuerza la propuesta de un campo de margen explícito.
3. **v9 no sirve en empresas que solo dan guía trimestral** (MPS, y en el backtest Nvidia 2016 y Twitter 2019): aquí la guía trimestral (+56 %) va por encima de la mecánica, así que no habría recortado nada. Sin cambio.

## Fuentes

[1] Monolithic Power Systems, Q2'26 Earnings Commentary (8-K, ex. 99.1, 30-jul-2026, SEC EDGAR): ventas de 980,6 M (+47,6 %) y por mercado, márgenes GAAP y no GAAP, caja de 1.413,8 M, guía del 3T26, recompra de 1.000 M, capacidad > 6.000 M, DDR5, 800 V y automoción.
[2] SEC EDGAR, XBRL companyfacts de MPS (10-K 2022-2025 y 10-Q 2026): ventas, beneficio bruto, beneficio operativo, flujo de operaciones, inversiones, pagos en acciones, amortizaciones y acciones diluidas.
[3] MPS, 10-Q del 2T26 (5-ago-2026): ventas por destino, distribuidores > 10 %, activos fijos por país, debilidad material, CFO interino, dividendos y recompras, flujo de caja del 1S26.
[4] SEC EDGAR, formularios 4 de abr-sep 2026 (ventas de M. Hsing, M. Sciammas, S. Tseng, D. Xiao, E. Elmiger, J. Zhou y otros; ninguna compra).
[5] MPS, notas de resultados 8-K del 31-jul-2025, 30-oct-2025, 5-feb-2026 y 30-abr-2026 (guías trimestrales y ventas por mercado); 8-K del 5-feb-2026 (retiro del CFO); 8-K del 10-sep-2026 (dividendo de 2,00 USD).
[6] Yahoo Finance chart API (MPWR, S&P 500, Nasdaq-100, SOXX, NVDA, TXN, ADI, IFNNY, VICR, AOSL) y Nasdaq.com: cierre del 13-oct de 1.319,55 USD en ambas; intradía del 14-oct de 1.258,50 USD a las 17:00 UTC en ambas.
[7] StockAnalysis.com (S&P Global, 5/14-oct-2026): objetivo medio de 1.840 USD, recomendaciones, consenso de ventas y BPA de 2026-2027, estadísticas de MPWR, TXN y ADI.
[8] Benzinga, Yahoo/StockStory y MarketBeat (30/31-jul-2026): consenso previo del 3T26 y subidas de objetivo; transcripción de la llamada del 2T26 (Motley Fool, parcialmente automática).
[9] USITC, nota del 9-oct-2026 (337-TA-1526, denuncia de Vicor; MPS y sus filiales de Chengdu y Shanghái entre los demandados); Bloomberg Law (ene-2026, demanda de Vicor en Texas).
[10] StockTwits, flujo de $MPWR (9-sep al 14-oct-2026).
[11] TIKR, TipRanks/The Fly (Rosenblatt, Loop, KeyBanc, Deutsche Bank, Oppenheimer), Smartkarma y JKN; sin hilos recientes en Reddit, Rankia ni Investing.com ES.
[12] GlobalFoundries, nota del 9-sep-2026: acuerdo de fabricación de MPS en Singapur (volumen en 2027).
[13] MPS, nota del 8-oct-2026: resultados del 3T26 el 29-oct-2026.
[14] Estimación propia: ventas y EBITDA NTM, EV/EBITDA NTM histórico (mediana de ~30,5x, mínimo de 25,3x) y DCF inverso (~21 %).
[15] De memoria (sin comprobar): mercado alcanzable de ~50.000 M en 2028, Infineon a ~13x, la cuota perdida en Blackwell en 2025 y el CAGR de ~22 % en 2014-2024.
