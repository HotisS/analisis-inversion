# Memoria del proyecto (reglas del usuario y decisiones)

Lo que cualquier sesión de Claude, en cualquier equipo, tiene que saber antes de seguir. Se lee junto con `CLAUDE.md`, `cola.md` y `verticales/empresa/lecciones.md`.

## Cómo trabajar
- **El repo de GitHub (HotisS/analisis-inversion) es la única fuente.** El proyecto debe poder seguirse desde cualquier ordenador: al empezar, `git pull` (o clonar con la cuenta de gh); nada importante vive solo en un equipo.
- **Cada cambio va a la vez a GitHub y a la copia local**: commit y push al terminar cada pieza (informe, cambio de plantilla, cola).
- **La cola (`cola.md`) va de cuatro en cuatro** (desde el 10-oct-2026; antes, de dos en dos): dos pares seguidos en paralelo, con dos de valor y dos de crecimiento.
- **Cada análisis lleva la capa de sentimiento** (sección 28, subagente E): opiniones actuales en foros y comentarios, contrastadas con los datos; nunca fuente de cifras.
- **Nunca datos personales** (el correo del usuario, su nombre…) en ninguna consulta externa, URL ni cabecera, tampoco en el User-Agent de la SEC.
- **Siempre Word y PDF** de cada informe entregado (`construccion/a-pdf.ps1`).
- Al cerrar cada empresa se comunica: recomendación y convicción, valor objetivo y rentabilidad esperada, cifras clave, commit y rutas del Word y del PDF.

## Preferencias de cartera (13-oct-2026; aplicarlas siempre que pida la cartera)
- **Edenred y el oro (IGLN) no se tocan** salvo que lo pida. (Grifols también estaba aquí; el 13-oct, noche, el usuario decidió venderla por la volatilidad y la deuda.)
- **No se amplían las posiciones que ya tiene** (13-oct, «no ampliamos ninguna»): el dinero de las ventas va a valores nuevos.
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
- **Cada compra y venta con su motivo de negocio**, no solo la rentabilidad; tabla antes → después con la rentabilidad a 12 meses de cada activo (ponderada y base), el valor intrínseco frente al precio y la calidad.
- Sin juego ni apuestas. Sin cambios de un valor por otro que el usuario haya rechazado (13-oct: no cambiar LVMH y Viscofan por Wolters Kluwer y Auto Trader).
- Cartera vigente: `informes/cartera-concentrada-2026-10-13.md`.

## Decisiones
- 13-oct-2026 (noche): cartera versión 8: **se venden Grifols, Puig e ICE**; **tope del 7 %** por valor salvo Edenred y oro; entra **Adobe** (calidad alta y valor intrínseco +26,5 %, base +10,2 %) porque con el tope las tres compras que pasan todo no absorben el dinero. Ponderada del +15,6 % al +18,7 %; base del +9,1 % al +11,5 %.
- 13-oct-2026 (noche): el usuario **confirma vender Puig e ICE** tras revisarlas con el impulso de octubre (memorandos en sus carpetas). Duda de Grifols (volatilidad y deuda); alternativa sin Grifols calculada: misma rentabilidad (ponderada +18,6 %, base +12,0 %), con el dinero en Nemetschek, Uber y Viscofan. Decidido después: se vende (versión 8).
- 13-oct-2026 (noche): cartera versión 7: **no se amplía ninguna posición existente** (Grifols se queda en 120, SAP en 7, Daiichi en 100); el dinero va a Nemetschek (31) y Viscofan (31). Ponderada del +15,6 % al +18,6 %; base del +9,1 % al +12,0 %.
- 13-oct-2026 (noche): cartera versión 6: **Dunelm fuera** (al usuario no le convence el comercio minorista); su dinero va a Nemetschek, Uber y SAP. Ponderada del +15,6 % al +18,7 %; base del +9,1 % al +12,0 %.
- 13-oct-2026 (noche): cartera versión 5: **Alphabet se queda** (decisión del usuario); se financia bajando Nemetschek, Uber, Dunelm y Viscofan. Ponderada del +15,6 % al +18,7 %; base del +9,1 % al +11,8 %.
- 13-oct-2026 (noche): cartera versión 4: **Daiichi Sankyo no se amplía** (decisión del usuario) y **Equifax se vende** (falla la calidad tal como está escrita: sostenibilidad «En parte» y ROIC contable bajo el WACC; no se hace la excepción). Ponderada del +15,6 % al +19,9 %; base del +9,1 % al +12,5 %.
- 13-oct-2026 (tarde): cartera versión 3 (`informes/cartera-concentrada-2026-10-13.md`): entran Wolters Kluwer y Auto Trader; tras investigar a fondo, **Grifols se mantiene sin ampliar** (130 títulos solo por el mínimo del 5 %), **Alphabet y Hermès se venden** y **Equifax se mantiene y se amplía a 10 títulos después de los resultados del 20-oct**, como excepción a la regla de calidad (ROIC contable bajo el WACC por el fondo de comercio; sin fondo de comercio, 30,5 %), pendiente de que el usuario la acepte. Ponderada del +15,6 % al +21,0 %; base del +9,1 % al +12,3 %.
- 13-oct-2026 (cierre): **todo el universo al día con las dos facetas** (73 empresas; fuera Betsson y Evolution por juego, y las iteraciones antiguas de PepsiCo y Uber): sostenibilidad del crecimiento en el informe, con el caso base rebajado si falla (Fielmann, Tomra, On, bioMérieux, CAF, Olympus, Kongsberg, Fanuc, Microsoft, Intuitive, Indra, CSL), y rentabilidad a 12 meses v2. **Tres filtros para comprar**: ponderada ≥ 15 %; valor real = base a 12 meses ≥ 12 % y valor intrínseco del informe ≥ precio; sostenibilidad distinta de «No». Para mantener: ponderada ≥ 10 %, base ≥ 5 % y valor intrínseco no más de un 15 % por debajo del precio. Cartera final con el motivo de negocio de cada operación: `informes/cartera-optima-2026-10-13.md` (ponderada del +15,6 % al +21,4 %; base del +9,1 % al +12,5 %).
- 13-oct-2026: cambian de señal en el informe al actualizar: Olympus, Microsoft y Kongsberg (convicción) a Vender; Tomra, On, Rentokil y bioMérieux a Mantener; Indra a convicción baja. Las causas están en el diario de cada carpeta.
- 13-oct-2026 (noche): **rentabilidad a 12 meses = media ponderada** con las probabilidades de los escenarios de cada informe (no la media simple del hilo, que inflaba por el alcista con el PER histórico), y **filtro de valor real = escenario base ≥ 12 %** para comprar (≥ 5 % y ponderada ≥ 10 % para mantener). Cartera propuesta: `informes/cartera-optima-2026-10-13.md` (ponderada del +15,6 % al +22,5 %; base del +9,1 % al +12,4 %).
- 13-oct-2026 (tarde): **la «nueva metodología» que pedía el usuario es la rentabilidad a 12 meses PER propio × BPA propio («v2»)** del hilo de claude.ai «PROYECTOS GH - INV» (12-oct), no la sostenibilidad. Copiada del texto que pegó el usuario en `verticales/empresa/objetivo-12m.md`; una reconstrucción anterior («cerrar la mitad del descuento») era errónea y se retiró. Alphabet v2 (+1,5 %, Mantener) es del hilo; el resto se revisa empresa por empresa (`revision-12m-*.md` en cada carpeta) y el resultado va a `verticales/empresa/objetivo12m-revisados.json`. Ese día también se pasaron a la sostenibilidad la cartera y todas las Comprar (23 informes).
- 13-oct-2026: análisis completo pendiente de **Group 1 Automotive (GPI)**. En la nube de Claude Code no se pudo: la red bloquea sec.gov, Yahoo, MarketScreener, FRED y Damodaran.
- 13-oct-2026: presupuesto del usuario para la nube, 210 USD; la sesión llevaba ≈ 39 USD gastados al decidirlo. Cada actualización rápida cuesta ≈ 1-2 USD; la orquestación en una sesión larga, bastante más.
- 13-oct-2026: el usuario empieza a **actualizar a la metodología nueva** (sostenibilidad del crecimiento, desde el 10-oct) los 41 informes del 6 al 9-oct, **en rápido como las v2 del 7-oct** (script, sin investigación nueva, versión nueva en la misma carpeta); Evolution no se actualiza (juego). Cola en `cola.md`, de 3 en 3: cartera primero, luego compras propuestas, Comprar, Mantener y Vender.
- 12-oct-2026: **el usuario no quiere empresas de juego ni apuestas**: quedan fuera de la cola, del escáner y de cualquier propuesta de cartera (Betsson se analizó, pero no entra).
- 12-oct-2026: el usuario pone por delante S&P Global y Amazon y pasa a de 3 en 3; LVMH no se repite porque ya tiene informe (del 8-oct). La pausa sigue hasta que diga que sigamos.
- 11-oct-2026: el usuario reanudó la cola con diez empresas en tres tandas (desde las 16:05, de dos en dos a petición del usuario): 1) Nemetschek, Deckers, Gartner, Trigano; 2) Burkhalter, CTS Eventim, ATOSS; 3) Pluxee, Technip Energies, Betsson. Medpace y Pro Medicus salen de la cola por caras. Ese día se analizaron Puig, SAP, Grifols, Netflix y Hermès (su cartera) y se propuso un rebalanceo (`informes/rebalanceo-2026-10-11.md`).
- 11-oct-2026: el usuario pidió cerrar solo Dunelm e Intuit y dejar la cola en pausa (Nemetschek a medias).
- 10-oct-2026: el usuario paró la cola y la reanudó de cuatro en cuatro.
- 10-oct-2026: la lista de 14 empresas que seguía a Constellation y Auto Trader se perdió (no estaba en GitHub); se rehízo con el escáner (`cola.md`).
- 10-oct-2026: Games Workshop adelantada al par 2, a petición del usuario; Uber entra como iteración 2.
- 10-oct-2026: el análisis de Constellation empezado en otro equipo no llegó a GitHub; se rehace desde cero.
