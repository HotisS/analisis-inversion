---
description: Análisis de inversión completo de una empresa cotizada (30-60 min) → informe Word con valoración, finanzas, sector y gobierno
argument-hint: <nombre, ticker o ISIN> [divisa] [fecha de corte]
---

Vas a preparar el análisis de inversión completo de **$ARGUMENTS**.

## Antes de empezar
1. Lee **entero** `verticales/empresa/prompt.md`. Es tu especificación: papel, protocolo por fases, protocolo de huecos, reglas de datos, los 27 campos con su formato JSON, la revisión de comité y las comprobaciones finales. Síguelo al pie de la letra.
2. Lee `verticales/empresa/lecciones.md` (corto): herramientas del repo, fuentes que funcionan y trampas ya conocidas. No hace falta leer los diarios de análisis anteriores ni el código de `motor/`.
3. Anota en el diario el commit con el que empiezas (`git log -1 --oneline`) y no cambies de versión del prompt a mitad del análisis.
4. Crea la carpeta de trabajo `informes/<nombre-corto>-<AAAA-MM-DD>/` y dentro `notas/` y `notas/docs/`. Ahí vivirán `datos.json`, las notas de investigación, los documentos descargados y el informe.
5. Fija la fecha de corte (hoy salvo que el usuario diga otra) y dedica entre 30 y 60 minutos al análisis. Prima la profundidad: leer los documentos que importan, no hojearlos ni leerlos enteros cuando basta con una nota.

## Fases 2-4 en paralelo (si puedes lanzar subagentes)
Tras la fase 1 (identificación), lanza **cuatro subagentes a la vez**. A cada uno pásale este encargo, la identificación exacta de la empresa (nombre, ticker, ISIN, divisa, cierre del ejercicio, carpeta de trabajo) y estas instrucciones: ejecutar `node herramientas/prompt-de.mjs <letra>` y leer su salida (es su parte del prompt; **no** el prompt entero), leer `verticales/empresa/lecciones.md` y descargar con `herramientas/descargar.mjs` en `notas/docs/`.

- **A. Cuentas**: `financieros`, `trimestres`, `balance`, `flujos`, `calidad`, `capital` y la parte de datos de `negocio` (segmentos, geografías, KPI). Informes anuales con notas (5-10 ejercicios), informes trimestrales y transcripciones de las dos últimas conferencias.
- **B. Sector y competencia**: `sector`, `competencia`, `historia`, `esg`, y la parte descriptiva de `negocio`. Al menos dos fuentes de tamaño de mercado e informes anuales de 3-5 competidores.
- **C. Equipo y gobierno**: `directivos` y `gobierno`. IAGC e IARC (o *proxy*), registros oficiales de participaciones y de operaciones de directivos, hechos relevantes de 12 meses e historial de cumplimiento de la guía.
- **D. Mercado y valoración**: `identificacion` (precio, acciones, rango), `consenso`, `bolsa`, `multiplos_historicos`, `comparables` (6-10, cifra a cifra), `transacciones` (5-10), el `puente` de `valoracion` y los datos de mercado para el WACC (bono a 10 años, beta). Precio, rango, volumen, rentabilidades, beta, volatilidad, caída máxima y precios de cierre de cada ejercicio salen de `herramientas/bolsa.mjs`, no a mano.

**Guardar por partes.** Cada subagente reescribe su `notas/<letra>.json` **después de cada campo que termina** (no solo al final; como mucho cada 10 minutos, aunque sea con el campo a medias): un corte por límite de uso o por error no debe perder lo ya investigado. Cada campo terminado lleva su parte de `fuentes`; los que faltan quedan sin escribir.

Cada subagente escribe en `notas/<letra>.json` **solo hechos**, con las claves de primer nivel del prompt (`financieros`, `gobierno`…), una lista `fuentes` propia (numerada desde 1, con citas `[n]` a esa lista) y una lista `huecos` (protocolo de tres intentos). Devuelve en su respuesta un resumen de diez líneas: qué ha encontrado, qué falta y qué le ha parecido raro.

Si no puedes lanzar subagentes, haz las fases 2-4 tú mismo, en ese orden y con la misma profundidad, escribiendo igualmente las notas A-D.

**Si un subagente se corta**, no lo relances entero: lee su `notas/<letra>.json`, mira qué campos faltan y complétalos tú (o con un subagente nuevo que solo haga esos campos). La integración acepta notas parciales.

**Mientras trabajan los subagentes**, no leas el código del motor: prepara `notas/propio.json` (estructura abajo) con lo que ya sepas y piensa la tesis.

## Integración, cálculo y redacción (tú)
1. Escribe tu parte en `notas/propio.json`: las secciones que redactas tú (`meta` salvo `huecos`, `resumen`, `dcf`, `escenarios`, `valoracion`, `suma_partes`, `catalizadores`, `riesgos`, `preguntas`, los `comentario` y textos de juicio de las demás secciones…), tus fuentes propias en `fuentes` y tus `huecos`. **Tus citas llevan la letra de la nota**: `[A3]` es la fuente 3 de `A.json`, `[D2, B5]` dos fuentes, `[P1]` una fuente tuya. Si usas un `.mjs` para escribir textos largos, que exporte el objeto por defecto (`export default {…}`) como `notas/propio.mjs`.
2. Integra: `node motor/integrar.mjs --dir informes/<carpeta>`. Junta notas y propio (lo tuyo completa o sustituye campo a campo lo de las notas; un `null` no borra), renumera las fuentes sin duplicados, traduce todas las citas y avisa de citas sin fuente y secciones vacías. **No escribas tu propio script de fusión.** Vuelve a ejecutarlo cada vez que cambies una nota o `propio`.
3. Primer cálculo: `node motor/calcular-empresa.mjs --datos informes/<carpeta>/datos.json`. Corrige los controles en «Revisar» (en las notas o en `propio`, y reintegra).
4. Fase 6 (supuestos del DCF, escenarios, pesos), segundo cálculo y lectura del DCF inverso.
5. Fase 7 (redacción, resumen el último) y fase 8 (revisión de comité con las diez preguntas del prompt). Las cifras de los textos salen de `calc` tal cual.
6. Genera el informe:
   `node motor/rellenar.mjs --plantilla verticales/empresa/plantilla.docx --datos informes/<carpeta>/datos.json --salida "informes/<carpeta>/<Nombre> - <AAAA-MM-DD>.docx"`
7. Si estás en Windows con Word, compruébalo: `powershell -File construccion/a-pdf.ps1 "<informe>.docx"` (debe abrir sin reparar). Mira como imagen solo la portada, «La decisión» y la síntesis de valoración; borra el PDF y las imágenes al terminar.

## Entrega
Responde con la ruta del informe y, en diez líneas como máximo: recomendación (Comprar/Mantener/Vender) y convicción, valor objetivo y rentabilidad total esperada, qué descuenta el precio (DCF inverso), cobertura, controles en «Revisar» que quedan y por qué, y las secciones o datos omitidos (los de núcleo, primero).
