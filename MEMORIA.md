# Memoria del proyecto (reglas del usuario y decisiones)

Lo que cualquier sesión de Claude, en cualquier equipo, tiene que saber antes de seguir. Se lee junto con `CLAUDE.md`, `cola.md` y `verticales/empresa/lecciones.md`.

## Cómo trabajar
- **El repo de GitHub (HotisS/analisis-inversion) es la única fuente.** El proyecto debe poder seguirse desde cualquier ordenador: al empezar, `git pull` (o clonar con la cuenta de gh); nada importante vive solo en un equipo.
- **Cada cambio va a la vez a GitHub y a la copia local**: commit y push al terminar cada pieza (informe, cambio de plantilla, cola).
- **La cola (`cola.md`) va de dos en dos**: dos empresas en paralelo, y después las dos siguientes. Cada par mezcla una de valor y una de crecimiento.
- **Cada análisis lleva la capa de sentimiento** (sección 28, subagente E): opiniones actuales en foros y comentarios, contrastadas con los datos; nunca fuente de cifras.
- **Nunca datos personales** (el correo del usuario, su nombre…) en ninguna consulta externa, URL ni cabecera, tampoco en el User-Agent de la SEC.
- **Siempre Word y PDF** de cada informe entregado (`construccion/a-pdf.ps1`).
- Al cerrar cada empresa se comunica: recomendación y convicción, valor objetivo y rentabilidad esperada, cifras clave, commit y rutas del Word y del PDF.

## Decisiones
- 10-oct-2026: la lista de 14 empresas que seguía a Constellation y Auto Trader se perdió (no estaba en GitHub); se rehízo con el escáner (`cola.md`).
- 10-oct-2026: el análisis de Constellation empezado en otro equipo no llegó a GitHub; se rehace desde cero.
