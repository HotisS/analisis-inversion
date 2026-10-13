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

## Decisiones
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
