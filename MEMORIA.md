# Memoria del proyecto (reglas del usuario y decisiones)

Lo que cualquier sesión de Claude, en cualquier equipo, tiene que saber antes de seguir. Se lee junto con `CLAUDE.md` y `cola.md` (y las lecciones, solo si se analiza una empresa). Solo reglas y decisiones **vigentes**: los cambios importantes y las decisiones ya sustituidas están en `archivo/HISTORICO.md` (memoria histórica: no se lee en el día a día).

## Cómo trabajar
- **`METODO-VIGENTE.md` (raíz) dice qué versión del método decide hoy y lleva el registro fechado de descubrimientos** (14-oct, pedido del usuario: «apunta muy bien todos los descubrimientos y metodología vigente siempre»). Se lee antes de analizar y se actualiza con cada cambio.
- **El repo de GitHub (HotisS/analisis-inversion) es la única fuente.** El proyecto debe poder seguirse desde cualquier ordenador: al empezar, `git pull` (o clonar con la cuenta de gh); nada importante vive solo en un equipo.
- **Cada cambio va a la vez a GitHub y a la copia local**: commit y push al terminar cada pieza (informe, cambio de plantilla, cola).
- **La cola (`cola.md`) va de cuatro en cuatro** en paralelo (desde el 14-oct-2026), mezclando valor y crecimiento. Sin empresas «para tenerla medida»; las que no ganan dinero van a la cola growth (`cola-growth.md`) (14-oct).
- **Informe Word completo para todas** (14-oct, el usuario rechazó el triaje con ficha corta: «se comerá buenas»).
- **Sin empresas de juego ni apuestas** (12-oct): fuera de la cola, del escáner y de cualquier cartera.
- **Cada análisis lleva la capa de sentimiento** (sección 28, subagente E): opiniones actuales en foros y comentarios, contrastadas con los datos; nunca fuente de cifras.
- **Nunca datos personales** (el correo del usuario, su nombre…) en ninguna consulta externa, URL ni cabecera, tampoco en el User-Agent de la SEC.
- **Siempre Word y PDF** de cada informe entregado (`construccion/a-pdf.ps1`).
- Al cerrar cada empresa se comunica: recomendación y convicción, valor objetivo y rentabilidad esperada, cifras clave, commit y rutas del Word y del PDF.

## Preferencias de cartera (13-oct-2026; aplicarlas siempre que pida la cartera)
- **Edenred y el oro (IGLN) no se tocan** salvo que lo pida. (Grifols también estaba aquí; el 13-oct, noche, el usuario decidió venderla por la volatilidad y la deuda.)
- **Se amplía lo que ya tiene si cumple los tres requisitos** (14-oct, 15:39; sustituye a «no ampliamos ninguna» del 13-oct). Cambiar una posición por otra solo si la diferencia de rentabilidad a 12 meses supera el coste de rotar (comisión e impuesto, si se conoce el precio de compra).
- **Adobe fuera** (13-oct, decisión del usuario, sin motivo dado): no proponerla.
- **Rightmove fuera** (14-oct, 12:53, «no la quiero en el portfolio»): no proponerla aunque pase los requisitos.
- **Comercio minorista: no le convence** (13-oct, Dunelm fuera aunque pasara los tres requisitos). No proponer minoristas salvo que lo pida.
- **Alphabet se vende** (14-oct, 16:50; sustituye a «Alphabet se queda» del 13-oct). El usuario preguntó «¿alphabet tú venderías?» y había delegado las órdenes. Con v2 da +1,8 % y el valor intrínseco está un 28 % por debajo del precio. Con ese dinero entra ANYCOLOR (100 a ≤ 3.137 JPY). Si el usuario quiere conservarla, se deshace.
- **Claude decide las órdenes** con la información de los informes (14-oct, 15:39: «las órdenes tú mandas»). Si el usuario opina sobre un valor, manda su opinión. **LVMH es excepción de calidad aceptada** (ROIC − WACC 3,4).
- **Antes de recomendar vender algo que ya tiene, se investiga a fondo** (situación, novedades, argumentos a favor y en contra, qué cambiaría la decisión) y se deja un memorando `investigacion-cartera-AAAA-MM-DD.md` en la carpeta del informe (13-oct: Grifols, Alphabet, Hermès y Equifax).
- **Tamaño: mínimo 1.000 EUR por posición** (12-oct; el mínimo del 5 % se retiró el 14-oct, 15:39) y, como guía, no más del 7 % salvo Edenred y el oro; **no hay máximo de valores** (13-oct).
- **Tres requisitos a la vez** para comprar o ampliar:
  1. **Rentabilidad**: a 12 meses ponderada ≥ 15 % (`verticales/empresa/objetivo-12m.md`). **Decide v3 con tope ×1,1** (14-oct, 17:05; calibrada por backtest; reglas exactas en `METODO-VIGENTE.md` §2) y **v2 es el control**: si v2 < 10 % y v3 > 15 %, la empresa se marca y no se compra sin motivo de negocio propio. Entre dos compras que compiten por la misma liquidez, gana la «robusta» (la que pasa con los dos métodos).
  2. **Valor real**: base a 12 meses ≥ 12 % y valor intrínseco del informe ≥ precio.
  3. **Calidad del negocio**: sostenibilidad del crecimiento «Sí» y ROIC − WACC ≥ 5 puntos.
- **Divisas: el objetivo y el precio en la misma moneda** (14-oct). Constellation tiene las cuentas en USD y cotiza en CAD: comparar sin convertir dio un falso −19 %. Antes de usar un objetivo, comprobar la divisa de las cuentas frente a la de cotización. Mismo problema con las cotizaciones de Londres en peniques (GBp).
- **La calidad se comprueba en cada informe, también en los suplentes** (14-oct, 17:05). DSV (ROIC − WACC 0,6, por el fondo de comercio de Schenker) y Coloplast (4,7) estuvieron de suplentes sin pasar calidad. En las empresas con capital invertido negativo (caja neta o patrimonio negativo por recompras: Booking, ANYCOLOR, CTS Eventim) el ROIC del motor sale negativo y no significa nada: usar el ROIC a mano del informe.
- **Confianza de datos baja = no Comprar** hasta confirmar las cifras con fuente primaria (14-oct, 15:29): la señal se queda en Mantener y se apunta qué falta confirmar.
- **Mantener**: calidad, ponderada ≥ 10 %, base ≥ 5 % y valor intrínseco no más de un 15 % por debajo del precio.
- **Precio actual antes de cada orden** (14-oct, 16:10, regla obligatoria): antes de proponer o mantener una orden de compra o venta, mirar el precio actual y comprobar que la rentabilidad, el límite y la señal siguen vigentes; en la tabla, precio y hora del dato y si la orden sigue en pie o cambia.
- **Análisis técnico** (gráficos del usuario: medias SAMA, EMA 365 y 1.000, SMA 200, RSI, ChandeMO): solo para decidir **cuándo** ejecutar (precio límite, stop, fecha tope), nunca qué se compra o se vende (13-oct).
- **Cada compra y venta con su motivo de negocio**, no solo la rentabilidad; tabla antes → después con la rentabilidad a 12 meses de cada activo (ponderada y base), el valor intrínseco frente al precio y la calidad.
- Sin juego ni apuestas. Sin cambios de un valor por otro que el usuario haya rechazado (13-oct: no cambiar LVMH y Viscofan por Wolters Kluwer y Auto Trader).
- Cartera vigente: **tabla de órdenes del 15-oct** `informes/ordenes-2026-10-15.md` (14-oct, 17:05, con v3 ×1,1 y v2 de control).

## Decisiones vigentes
- 14-oct-2026: **objetivo a 12 meses con la regla v3** (PER adelantado; base a mitad de camino hacia la mediana de cinco años con **tope ×1,1**; commit c8229e0). Lo aplica el motor (`motor/objetivo12m.mjs`), el método está en `verticales/empresa/objetivo-12m.md` y la cifra v2 se guarda al lado como control. Manda en la recomendación.
- 14-oct-2026 (17:35): **cartera para el 15-oct** (`informes/ordenes-2026-10-15.md`; informes rehechos, compra = acción robusta con v3 y v2). Vender Zoetis, Puig, Hermès, ICE, Equifax, IBKR y Alphabet. Comprar Nemetschek (29, ≤ 71 EUR), Bureau Veritas (38 a ≤ 26,89, y otras 38 tras el 21-oct si el orgánico es ≥ 4 %) y ANYCOLOR (100 a ≤ 3.048 JPY), más el tramo 1 growth (Nu, Axon, Shopify, Snowflake, Samsara). Lista de espera con límite robusto: LVMH ≤ 387,76 EUR (tras revisar el informe con el 3T), Booking ≤ 157,08 USD, Verisk ≤ 173,63 USD, Adyen ≤ 908,88 EUR. Netflix se vende por encima de 71,88 USD si el informe no mejora. Edenred (v3 +19,7 %, v2 +6,7 %), Intuit y Daiichi no se amplían. Liquidez ≈4.040 EUR (≈290 libres tras reservar los tramos 2). Rentabilidad v3 de +15,0 % a +18,3 % (v2 de +7,9 % a +11,0 %); volatilidad ≈12,5 %; Sharpe realista 0,54. Lo que no se ejecute antes del 7-nov se revisa con el precio del día.
- 13-oct-2026: presupuesto del usuario para la nube, 210 USD (≈ 39 USD gastados al decidirlo). Actualización rápida ≈ 1-2 USD; una orquestación larga, bastante más. **Ahorra tokens**: no leas archivos que no hagan falta (archivo/, diarios, código del motor).
