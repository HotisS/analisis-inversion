---
description: Análisis de inversión completo de una empresa cotizada (30-60 min) → informe Word con valoración, finanzas, sector y gobierno
argument-hint: <nombre, ticker o ISIN> [divisa] [fecha de corte]
---

Vas a preparar el análisis de inversión completo de **$ARGUMENTS**.

## Regla estricta de carpetas
El repo vive dentro del OneDrive corporativo del usuario. Trabaja **solo** dentro del repo y en `%TEMP%`. Está **terminantemente prohibido** entrar en cualquier otra carpeta de ese OneDrive: ni buscar, ni leer, ni escribir, ni borrar, ni hacer Glob, Grep o listados por encima de la carpeta que contiene el repo. Los temporales y los PNG van a `%TEMP%`; evita crear y borrar archivos de usar y tirar dentro del repo. Pasa esta regla a cada subagente.

## Antes de empezar
1. Lee **entero** `verticales/empresa/prompt.md`. Es tu especificación: papel, protocolo por fases, protocolo de huecos, reglas de datos, los 28 campos con su formato JSON, la revisión de comité y las comprobaciones finales. Síguelo al pie de la letra.
2. Lee `verticales/empresa/lecciones.md` (corto): herramientas del repo, fuentes que funcionan y trampas ya conocidas. No hace falta leer los diarios de análisis anteriores ni el código de `motor/`.
3. Anota en el diario el commit con el que empiezas (`git log -1 --oneline`) y no cambies de versión del prompt a mitad del análisis.
4. Crea la carpeta de trabajo `informes/<nombre-corto>-<AAAA-MM-DD>/` y dentro `notas/` y `notas/docs/`. Ahí vivirán `datos.json`, las notas de investigación, los documentos descargados y el informe. **Si la empresa ya tiene análisis anteriores en `informes/`, este es una iteración nueva: carpeta nueva con la fecha de hoy, sin tocar, mover ni pisar las anteriores** (el Excel de seguimiento las numera 1, 2, 3… para ver cómo evoluciona la valoración). Puedes leer la última como punto de partida, pero vuelve a comprobar cada dato a la nueva fecha de corte y di en la síntesis qué ha cambiado desde la anterior. Usa el mismo ticker que en ella. Las versiones v2, v3… dentro de una misma carpeta son correcciones del mismo análisis, no iteraciones.
5. Fija la fecha de corte (hoy salvo que el usuario diga otra) y dedica entre 30 y 60 minutos al análisis. Prima la profundidad: leer los documentos que importan, no hojearlos ni leerlos enteros cuando basta con una nota.

## Fases 2-4 en paralelo (si puedes lanzar subagentes)
Tras la fase 1 (identificación, que incluye leer el calendario financiero de la última presentación para fijar la fecha de los próximos resultados), lanza **cinco subagentes a la vez**. A cada uno pásale este encargo, la identificación exacta de la empresa (nombre, ticker, ISIN, divisa, cierre del ejercicio, carpeta de trabajo) y estas instrucciones: ejecutar `node herramientas/prompt-de.mjs <letra>` y leer su salida (es su parte del prompt; **no** el prompt entero), leer `verticales/empresa/lecciones.md` y descargar con `herramientas/descargar.mjs` en `notas/docs/`.

- **A. Cuentas**: `financieros`, `trimestres`, `balance`, `flujos`, `calidad`, `capital` y la parte de datos de `negocio` (segmentos, geografías, KPI). Informes anuales con notas (5-10 ejercicios), informes trimestrales y transcripciones de las dos últimas conferencias.
- **B. Sector y competencia**: `sector`, `competencia`, `historia`, `esg`, y la parte descriptiva de `negocio`. Al menos dos fuentes de tamaño de mercado e informes anuales de 3-5 competidores.
- **C. Equipo y gobierno**: `directivos` y `gobierno`. IAGC e IARC (o *proxy*), registros oficiales de participaciones y de operaciones de directivos, hechos relevantes de 12 meses e historial de cumplimiento de la guía.
- **D. Mercado y valoración**: `identificacion` (precio, acciones, rango), `consenso`, `bolsa`, `multiplos_historicos`, `comparables` (6-10, cifra a cifra), `transacciones` (5-10), el `puente` de `valoracion` y los datos de mercado para el WACC (bono a 10 años, beta). Precio, rango, volumen, rentabilidades, beta, volatilidad, caída máxima y precios de cierre de cada ejercicio salen de `herramientas/bolsa.mjs`, no a mano.
- **E. Sentimiento**: `sentimiento`. Foros de inversores (Reddit, Seeking Alpha, Stocktwits y los del país de la empresa), comentarios de lectores en la prensa económica y debates de los últimos tres meses, sobre todo desde los últimos resultados. Opiniones, no cifras: resumir sin nombres de usuario. Presupuesto menor: unos 10 minutos y 40 llamadas, y sin gastar búsquedas web que necesiten A-D (ver lecciones: se comparten); mejor abrir directamente las páginas de los foros.

**Presupuesto de cada subagente: unos 20 minutos y unas 80 llamadas a herramientas.** Es de sobra para leer las fuentes que importan (el subagente de sector de Inditex llegó a 221 llamadas y 70 minutos sin mejorar el resultado: rebuscaba cifras que ya tenía de otra fuente). Prioriza por impacto en la decisión; al llegar al límite, cierra con lo que tengas y registra lo que falte como hueco con sus intentos.

**Guardar por partes.** Cada subagente reescribe su `notas/<letra>.json` **después de cada campo que termina** (no solo al final; como mucho cada 10 minutos, aunque sea con el campo a medias): un corte por límite de uso o por error no debe perder lo ya investigado. Cada campo terminado lleva su parte de `fuentes`; los que faltan quedan sin escribir.

Cada subagente escribe en `notas/<letra>.json` **solo hechos**, con las claves de primer nivel del prompt (`financieros`, `gobierno`…), una lista `fuentes` propia (numerada desde 1, con citas `[n]` a esa lista) y una lista `huecos` (protocolo de tres intentos). Devuelve en su respuesta un resumen de diez líneas: qué ha encontrado, qué falta y qué le ha parecido raro.

Si no puedes lanzar subagentes, haz las fases 2-4 bis tú mismo, en ese orden y con la misma profundidad, escribiendo igualmente las notas A-E.

**Esperar a los subagentes.** Cada uno avisa al terminar: no esperes con `sleep` ni con bucles de comprobación; mientras tanto, trabaja en `propio`.

**Si un subagente se corta**, no lo relances entero: lee su `notas/<letra>.json`, mira qué campos faltan y complétalos tú (o con un subagente nuevo que solo haga esos campos). La integración acepta notas parciales.

**Mientras trabajan los subagentes**, no leas el código del motor: prepara `notas/propio.json` (estructura abajo) con lo que ya sepas y piensa la tesis.

## Integración, cálculo y redacción (tú)
1. Escribe tu parte en `notas/propio.json`: las secciones que redactas tú (`meta` salvo `huecos`, `resumen`, `dcf`, `escenarios`, `valoracion`, `suma_partes`, `catalizadores`, `riesgos`, `preguntas`, los `comentario` y textos de juicio de las demás secciones…), tus fuentes propias en `fuentes` y tus `huecos`. **Tus citas llevan la letra de la nota**: `[A3]` es la fuente 3 de `A.json`, `[D2, B5]` dos fuentes, `[P1]` una fuente tuya. Si usas un `.mjs` para escribir textos largos, que exporte el objeto por defecto (`export default {…}`) como `notas/propio.mjs`. Para cambiar un elemento de una lista que viene de una nota, usa `_parches: [{ "ruta": "trimestres.items[3].vs_consenso", "valor": "Superior" }]`; para retirar un hueco que registró una nota y que sí has resuelto, `huecos_resueltos: [{ "seccion": "…", "campo": "…" }]` (los huecos de un campo que acaba con valor se retiran solos).
2. Integra: `node motor/integrar.mjs --dir informes/<carpeta>`. Junta notas y propio (lo tuyo completa o sustituye campo a campo lo de las notas; un `null` no borra), renumera las fuentes sin duplicados, traduce todas las citas y avisa de citas sin fuente y secciones vacías. **No escribas tu propio script de fusión.** Vuelve a ejecutarlo cada vez que cambies una nota o `propio`.
3. Primer cálculo: `node motor/calcular-empresa.mjs --datos informes/<carpeta>/datos.json`. Corrige los controles en «Revisar» (en las notas o en `propio`, y reintegra).
4. Fase 6 (supuestos del DCF, escenarios, pesos), segundo cálculo y lectura del DCF inverso.
5. Fase 7 (redacción, resumen el último) y fase 8 (revisión de comité con las diez preguntas del prompt). Las cifras de los textos salen de `calc` tal cual.
6. Genera el informe:
   `node motor/rellenar.mjs --plantilla verticales/empresa/plantilla.docx --datos informes/<carpeta>/datos.json --salida "informes/<carpeta>/<Nombre> - <AAAA-MM-DD>.docx"`
7. Genera el PDF junto al Word, con el mismo nombre (el usuario lo quiere siempre, de cada versión que se entrega): `powershell -ExecutionPolicy Bypass -File construccion/a-pdf.ps1 "informes/<carpeta>/<Nombre> - <AAAA-MM-DD>.docx" -Salida "informes/<carpeta>/<Nombre> - <AAAA-MM-DD>.pdf"` (Word debe abrirlo sin reparar). Si rehaces el Word, rehaz también el PDF. Mira como imagen solo la portada, la síntesis, «La decisión» y la síntesis de valoración (`construccion/pdf-a-png.ps1 <pdf> -Paginas "1-4"`); no hace falta borrarlos.

## Rentabilidad a 12 meses (v2), después del PDF
Con el informe cerrado, haz la revisión a 12 meses de `verticales/empresa/objetivo-12m.md` (PER propio × BPA propio del ejercicio que mirará el mercado en un año, en bajista, base y alcista): media ponderada con las probabilidades de los escenarios (la cifra) y rentabilidad del base (el filtro de valor real: ≥ 12 % para comprar). Escríbela en `informes/<carpeta>/revision-12m-<AAAA-MM-DD>.md` (ejemplo: `informes/alphabet-2026-10-08/revision-12m-2026-10-12.md`), apunta el resultado en `verticales/empresa/objetivo12m-revisados.json` y ejecuta `node herramientas/seguimiento.mjs`. Un informe no está terminado sin las dos facetas: **sostenibilidad del crecimiento** en el DCF (`dcf.sostenibilidad`, con el caso base rebajado si falla) y **rentabilidad a 12 meses v2**.

## Análisis terminado: lista de comprobación (igual para todas las empresas)
En `informes/<carpeta>/`:
- `datos.json` (o `datos-vN.json`) calculado, con `dcf.sostenibilidad` (veredicto, puente de ingresos, mercado final o `null` explicado) y el caso base dentro de lo financiable;
- `<Nombre> - <AAAA-MM-DD>.docx` y su `.pdf` con el mismo nombre (versiones: ` vN` al final);
- `revision-12m-<AAAA-MM-DD>.md` con las tablas del método (BPA por escenario, PER histórico con exclusiones, escenarios, ponderada, base y contraste con el consenso);
- `diario.md` con el commit de partida, los tiempos, las decisiones y la línea de la revisión a 12 meses;
- `notas/` con las notas A-E y `propio`, y `notas/actualizacion-vN.mjs` para cada versión rápida.
Fuera de la carpeta:
- la revisión apuntada con `node herramientas/apuntar-12m.mjs '<línea JSON>'` (calcula la ponderada, la rentabilidad del base y la señal);
- `node herramientas/seguimiento.mjs` (columnas «Metodología» = Nueva y «… 12 m» llenas);
- `cola.md` marcada, las lecciones nuevas en `verticales/empresa/lecciones.md`, y commit y push.

Encargos de subagentes para trabajos repetidos sobre informes ya hechos, en `verticales/empresa/encargos/`: `actualizacion-sostenibilidad.md` (pasar un informe viejo a la metodología nueva), `recorte-caso-base.md` (cuando falla la prueba), `revision-12m.md` (rentabilidad a 12 meses) y `actualizacion-completa.md` (las dos cosas seguidas).

## Entrega
Responde con la ruta del informe (Word y PDF) y, en diez líneas como máximo: recomendación (Comprar/Mantener/Vender) y convicción, valor objetivo y rentabilidad total esperada, rentabilidad a 12 meses v2 (ponderada y base) y veredicto de sostenibilidad, qué descuenta el precio (DCF inverso), cobertura, controles en «Revisar» que quedan y por qué, y las secciones o datos omitidos (los de núcleo, primero).
