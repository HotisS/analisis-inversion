# Memoria del proyecto (reglas del usuario y decisiones)

Lo que cualquier sesión de Claude, en cualquier equipo, tiene que saber antes de seguir. Se lee junto con `CLAUDE.md` y `cola.md` (y las lecciones, solo si se analiza una empresa). Solo reglas y decisiones **vigentes**: los cambios importantes y las decisiones ya sustituidas están en `archivo/HISTORICO.md` (memoria histórica: no se lee en el día a día).

## Cómo trabajar
- **El repo de GitHub (HotisS/analisis-inversion) es la única fuente.** El proyecto debe poder seguirse desde cualquier ordenador: al empezar, `git pull` (o clonar con la cuenta de gh); nada importante vive solo en un equipo.
- **Cada cambio va a la vez a GitHub y a la copia local**: commit y push al terminar cada pieza (informe, cambio de plantilla, cola).
- **La cola (`cola.md`) va de tres en tres** en paralelo (desde el 12-oct-2026), mezclando valor y crecimiento.
- **Sin empresas de juego ni apuestas** (12-oct): fuera de la cola, del escáner y de cualquier cartera.
- **Cada análisis lleva la capa de sentimiento** (sección 28, subagente E): opiniones actuales en foros y comentarios, contrastadas con los datos; nunca fuente de cifras.
- **Nunca datos personales** (el correo del usuario, su nombre…) en ninguna consulta externa, URL ni cabecera, tampoco en el User-Agent de la SEC.
- **Siempre Word y PDF** de cada informe entregado (`construccion/a-pdf.ps1`).
- Al cerrar cada empresa se comunica: recomendación y convicción, valor objetivo y rentabilidad esperada, cifras clave, commit y rutas del Word y del PDF.

## Preferencias de cartera (13-oct-2026; aplicarlas siempre que pida la cartera)
- **Edenred y el oro (IGLN) no se tocan** salvo que lo pida. (Grifols también estaba aquí; el 13-oct, noche, el usuario decidió venderla por la volatilidad y la deuda.)
- **No se amplían las posiciones que ya tiene** (13-oct, «no ampliamos ninguna»): el dinero de las ventas va a valores nuevos.
- **Adobe fuera** (13-oct, decisión del usuario, sin motivo dado): no proponerla.
- **Rightmove fuera** (14-oct, 12:53, «no la quiero en el portfolio»): no proponerla aunque pase los requisitos.
- **Comercio minorista: no le convence** (13-oct, Dunelm fuera aunque pasara los tres requisitos). No proponer minoristas salvo que lo pida.
- **Alphabet se queda** por decisión del usuario (13-oct), aunque no pase el filtro de mantener: no proponer venderla salvo que cambie la tesis (punto de control: 3T26, 28-oct).
- **Wolters Kluwer y Auto Trader entran** por decisión del usuario (13-oct), aunque su base a 12 meses quede bajo el 12 %.
- **Antes de recomendar vender algo que ya tiene, se investiga a fondo** (situación, novedades, argumentos a favor y en contra, qué cambiaría la decisión) y se deja un memorando `investigacion-cartera-AAAA-MM-DD.md` en la carpeta del informe (13-oct: Grifols, Alphabet, Hermès y Equifax).
- **Ninguna posición por debajo del 5 % ni por encima del 7 %** de la cartera, salvo Edenred y el oro (13-oct); **no hay máximo de valores** (13-oct: «no me importa tener más de 10»). Lo que quede por debajo del 5 % se vende (no se amplía nada que ya tenga).
- **Tres requisitos a la vez** para comprar o ampliar:
  1. **Rentabilidad**: a 12 meses ponderada ≥ 15 % (método v2, `verticales/empresa/objetivo-12m.md`).
  2. **Valor real**: base a 12 meses ≥ 12 % y valor intrínseco del informe ≥ precio.
  3. **Calidad del negocio**: sostenibilidad del crecimiento «Sí» y ROIC − WACC ≥ 5 puntos.
- **Mantener**: calidad, ponderada ≥ 10 %, base ≥ 5 % y valor intrínseco no más de un 15 % por debajo del precio.
- **Análisis técnico** (gráficos del usuario: medias SAMA, EMA 365 y 1.000, SMA 200, RSI, ChandeMO): solo para decidir **cuándo** ejecutar (precio límite, stop, fecha tope), nunca qué se compra o se vende (13-oct).
- **Cada compra y venta con su motivo de negocio**, no solo la rentabilidad; tabla antes → después con la rentabilidad a 12 meses de cada activo (ponderada y base), el valor intrínseco frente al precio y la calidad.
- Sin juego ni apuestas. Sin cambios de un valor por otro que el usuario haya rechazado (13-oct: no cambiar LVMH y Viscofan por Wolters Kluwer y Auto Trader).
- Cartera vigente: `informes/cartera-2026-10-14-14h.md` (propuesta del 14-oct a las 13:45, con 4.000 EUR más de liquidez, sin Rightmove y 42 análisis nuevos en tres horas; sustituye a las anteriores del 14-oct).

## Decisiones vigentes
- 14-oct-2026: **regla de múltiplos común para el objetivo a 12 meses**, aplicada por el motor (`motor/objetivo12m.mjs`; método en `verticales/empresa/objetivo-12m.md`): base = menor entre PER actual y mediana de 5 años; bajista = mínimo de 5 años o base × 0,85; alcista = mayor entre media larga y comparables, con techo base × 1,30. Vive en `valoracion.objetivo_12m` y **manda en la recomendación**. Las 73 empresas ya recalculadas; los Word se rehacen con la próxima versión de cada informe.
- 14-oct-2026 (13:45): **cartera propuesta** (`informes/cartera-2026-10-14-14h.md`, igual que la de las 13:00 sin Rightmove; ningún análisis de la tercera hora pasa los requisitos; suplentes nuevos Deutsche Börse < 282 EUR y Amadeus ≈52,2 EUR; Sanofi solo como excepción de calidad): el usuario añade **4.000 EUR de liquidez**. Vender Zoetis, Puig, Hermès, ICE, Equifax e IBKR; comprar Nemetschek (29, ≤ 71 EUR) y LVMH (5, ≤ 385 EUR, excepción de calidad: ROIC − WACC 3,4); cancelar Wolters Kluwer y Auto Trader. Rightmove queda fuera por decisión del usuario (12:53): liquidez ≈6.300 EUR con suplentes hasta el 7-nov (Experian, ANYCOLOR, Deutsche Börse, Amadeus, Moncler, Booking, Coloplast, DSV, Constellation). Ponderada de +7,9 % a +8,5 % (sin oro ni liquidez, de +11,5 % a +13,5 %). Pendiente de que el usuario la acepte y conteste sobre WK/Auto Trader y LVMH.
- 13-oct-2026 (noche): **órdenes abiertas hasta el 7-nov** (`informes/cartera-concentrada-2026-10-13.md`). Compras con precio límite: Uber y Viscofan, la mitad ya; Nemetschek ≤ 68 EUR, Intuit ≤ 300 USD, Auto Trader ≤ 4,95 GBP, Wolters Kluwer ≤ 72 EUR. Ventas: Grifols y PepsiCo ya; ICE, Puig, Equifax y Hermès con precio límite y stop. Lo que no se ejecute antes del 7-nov no se hace a mercado: se revisa. **Regla**: antes de comprar, recalcular la rentabilidad a 12 meses con el precio del día (objetivos de `objetivo12m-revisados.json`).
- 13-oct-2026 (noche): **última cartera aceptada = versión 9** de `informes/cartera-concentrada-2026-10-13.md` (Adobe fuera, entra Intuit), parcialmente ejecutada el 13-oct. La sustituye la propuesta del 14-oct cuando el usuario la acepte.
- 13-oct-2026: todo el universo (73 empresas, sin juego) tiene la metodología nueva (sostenibilidad del crecimiento) y la rentabilidad a 12 meses; Group 1 Automotive, hecho el 14-oct.
- 13-oct-2026: presupuesto del usuario para la nube, 210 USD (≈ 39 USD gastados al decidirlo). Actualización rápida ≈ 1-2 USD; una orquestación larga, bastante más. **Ahorra tokens**: no leas archivos que no hagan falta (archivo/, diarios, código del motor).
