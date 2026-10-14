# Memoria del proyecto (reglas del usuario y decisiones)

Lo que cualquier sesión de Claude, en cualquier equipo, tiene que saber antes de seguir. Se lee junto con `CLAUDE.md` y `cola.md` (y las lecciones, solo si se analiza una empresa). Solo reglas y decisiones **vigentes**: los cambios importantes y las decisiones ya sustituidas están en `archivo/HISTORICO.md` (memoria histórica: no se lee en el día a día).

## Cómo trabajar
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
- **Alphabet se queda** por decisión del usuario (13-oct), aunque no pase el filtro de mantener: no proponer venderla salvo que cambie la tesis (punto de control: 3T26, 28-oct).
- **Órdenes de Wolters Kluwer y Auto Trader canceladas y LVMH entra como excepción de calidad** (14-oct, 15:39: el usuario delega las órdenes, «tú mandas»). Claude decide las órdenes con la información de los informes.
- **Antes de recomendar vender algo que ya tiene, se investiga a fondo** (situación, novedades, argumentos a favor y en contra, qué cambiaría la decisión) y se deja un memorando `investigacion-cartera-AAAA-MM-DD.md` en la carpeta del informe (13-oct: Grifols, Alphabet, Hermès y Equifax).
- **Tamaño: mínimo 1.000 EUR por posición** (12-oct; el mínimo del 5 % se retiró el 14-oct, 15:39) y, como guía, no más del 7 % salvo Edenred y el oro; **no hay máximo de valores** (13-oct).
- **Tres requisitos a la vez** para comprar o ampliar:
  1. **Rentabilidad**: a 12 meses ponderada ≥ 15 % (`verticales/empresa/objetivo-12m.md`). **Con la regla v3, los requisitos y los límites se miden con la cifra v2 de cada informe y v3 solo ordena** (14-oct, 16:45, decisión de Claude con la delegación del usuario: en 48 de 135 informes el base v3 es el PER actual × 1,3 por medianas de 2021-2025 que doblan el actual, y la cartera daría +30 %, que no es creíble). Revisar si un backtest con caídas de múltiplo generales lo desmiente.
  2. **Valor real**: base a 12 meses ≥ 12 % y valor intrínseco del informe ≥ precio.
  3. **Calidad del negocio**: sostenibilidad del crecimiento «Sí» y ROIC − WACC ≥ 5 puntos.
- **Confianza de datos baja = no Comprar** hasta confirmar las cifras con fuente primaria (14-oct, 15:29): la señal se queda en Mantener y se apunta qué falta confirmar.
- **Mantener**: calidad, ponderada ≥ 10 %, base ≥ 5 % y valor intrínseco no más de un 15 % por debajo del precio.
- **Precio actual antes de cada orden** (14-oct, 16:10, regla obligatoria): antes de proponer o mantener una orden de compra o venta, mirar el precio actual y comprobar que la rentabilidad, el límite y la señal siguen vigentes; en la tabla, precio y hora del dato y si la orden sigue en pie o cambia.
- **Análisis técnico** (gráficos del usuario: medias SAMA, EMA 365 y 1.000, SMA 200, RSI, ChandeMO): solo para decidir **cuándo** ejecutar (precio límite, stop, fecha tope), nunca qué se compra o se vende (13-oct).
- **Cada compra y venta con su motivo de negocio**, no solo la rentabilidad; tabla antes → después con la rentabilidad a 12 meses de cada activo (ponderada y base), el valor intrínseco frente al precio y la calidad.
- Sin juego ni apuestas. Sin cambios de un valor por otro que el usuario haya rechazado (13-oct: no cambiar LVMH y Viscofan por Wolters Kluwer y Auto Trader).
- Cartera vigente: **tabla de órdenes del 15-oct** `informes/ordenes-2026-10-15.md` (14-oct, 16:45, revisada con v3 y v2; sustituye a `informes/cartera-2026-10-14-15h.md`).

## Decisiones vigentes
- 14-oct-2026: **regla de múltiplos común para el objetivo a 12 meses**, aplicada por el motor (`motor/objetivo12m.mjs`; método en `verticales/empresa/objetivo-12m.md`): base = menor entre PER actual y mediana de 5 años; bajista = mínimo de 5 años o base × 0,85; alcista = mayor entre media larga y comparables, con techo base × 1,30. Vive en `valoracion.objetivo_12m` y **manda en la recomendación**. Las 73 empresas ya recalculadas; los Word se rehacen con la próxima versión de cada informe.
- 14-oct-2026 (16:45): **cartera para el 15-oct** (`informes/ordenes-2026-10-15.md`). Vender Zoetis, Puig, Hermès, ICE, Equifax e IBKR. Comprar Nemetschek (29, ≤ 71 EUR), Bureau Veritas (76, ≤ 27,80 EUR) y LVMH (5, ≤ 392 EUR, excepción de calidad), más el tramo 1 growth (sección 4, del hilo growth). Cancelar Wolters Kluwer, Auto Trader, Deutsche Börse y Constellation; Amadeus pasa a la lista de espera. Lista de espera hasta el 7-nov: ANYCOLOR ≤ 3.137 JPY (primera), Adyen ≤ 908,88 EUR, Coloplast ≤ 454 DKK, Booking ≤ 156 USD, DSV ≤ 1.153 DKK, Amadeus ≤ 52,20 EUR, Moncler ≤ 43,97 EUR, Unilever ≤ 53,81 EUR. Liquidez final ≈964 EUR. Rentabilidad v2 de +9,0 % a +14,4 % (realista +7,2 %), volatilidad 14,1 %, Sharpe realista 0,34. Alphabet se queda (v3 Vender, v2 +1,8 %; control el 28-oct).
- 13-oct-2026 (noche): **órdenes abiertas hasta el 7-nov** (`informes/cartera-concentrada-2026-10-13.md`). Compras con precio límite: Uber y Viscofan, la mitad ya; Nemetschek ≤ 68 EUR, Intuit ≤ 300 USD, Auto Trader ≤ 4,95 GBP, Wolters Kluwer ≤ 72 EUR. Ventas: Grifols y PepsiCo ya; ICE, Puig, Equifax y Hermès con precio límite y stop. Lo que no se ejecute antes del 7-nov no se hace a mercado: se revisa. **Regla**: antes de comprar, recalcular la rentabilidad a 12 meses con el precio del día (objetivos de `objetivo12m-revisados.json`).
- 13-oct-2026 (noche): **última cartera aceptada = versión 9** de `informes/cartera-concentrada-2026-10-13.md` (Adobe fuera, entra Intuit), parcialmente ejecutada el 13-oct. La sustituye la propuesta del 14-oct cuando el usuario la acepte.
- 13-oct-2026: todo el universo (73 empresas, sin juego) tiene la metodología nueva (sostenibilidad del crecimiento) y la rentabilidad a 12 meses; Group 1 Automotive, hecho el 14-oct.
- 13-oct-2026: presupuesto del usuario para la nube, 210 USD (≈ 39 USD gastados al decidirlo). Actualización rápida ≈ 1-2 USD; una orquestación larga, bastante más. **Ahorra tokens**: no leas archivos que no hagan falta (archivo/, diarios, código del motor).
