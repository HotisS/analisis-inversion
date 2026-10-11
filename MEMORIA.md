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
- 11-oct-2026: el usuario reanudó la cola con diez empresas en tres tandas (desde las 16:05, de dos en dos a petición del usuario): 1) Nemetschek, Deckers, Gartner, Trigano; 2) Burkhalter, CTS Eventim, ATOSS; 3) Pluxee, Technip Energies, Betsson. Medpace y Pro Medicus salen de la cola por caras. Ese día se analizaron Puig, SAP, Grifols, Netflix y Hermès (su cartera) y se propuso un rebalanceo (`informes/rebalanceo-2026-10-11.md`).
- 11-oct-2026: el usuario pidió cerrar solo Dunelm e Intuit y dejar la cola en pausa (Nemetschek a medias).
- 10-oct-2026: el usuario paró la cola y la reanudó de cuatro en cuatro.
- 10-oct-2026: la lista de 14 empresas que seguía a Constellation y Auto Trader se perdió (no estaba en GitHub); se rehízo con el escáner (`cola.md`).
- 10-oct-2026: Games Workshop adelantada al par 2, a petición del usuario; Uber entra como iteración 2.
- 10-oct-2026: el análisis de Constellation empezado en otro equipo no llegó a GitHub; se rehace desde cero.
