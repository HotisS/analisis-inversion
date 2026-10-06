---
description: Análisis de inversión completo de una empresa cotizada (30-60 min) → informe Word con valoración, finanzas, sector y gobierno
argument-hint: <nombre, ticker o ISIN> [divisa] [fecha de corte]
---

Vas a preparar el análisis de inversión completo de **$ARGUMENTS**.

## Antes de empezar
1. Lee **entero** `verticales/empresa/prompt.md`. Es tu especificación: papel, protocolo por fases, protocolo de huecos, reglas de datos, los 27 campos con su formato JSON, la revisión de comité y las comprobaciones finales. Síguelo al pie de la letra.
2. Crea la carpeta de trabajo `informes/<nombre-corto>-<AAAA-MM-DD>/` y dentro `notas/`. Ahí vivirán `datos.json`, las notas de investigación y el informe.
3. Fija la fecha de corte (hoy salvo que el usuario diga otra) y dedica entre 30 y 60 minutos al análisis. Prima la profundidad: leer los documentos, no hojearlos.

## Fases 2-4 en paralelo (si puedes lanzar subagentes)
Tras la fase 1 (identificación), lanza **cuatro subagentes a la vez**, cada uno con este encargo, la identificación exacta de la empresa (nombre, ticker, ISIN, divisa, cierre del ejercicio) y la instrucción de **leer las secciones correspondientes de `verticales/empresa/prompt.md`**:

- **A. Cuentas**: `financieros`, `trimestres`, `balance`, `flujos`, `calidad`, `capital` y la parte de datos de `negocio` (segmentos, geografías, KPI). Informes anuales con notas (5-10 ejercicios), informes trimestrales y transcripciones de las dos últimas conferencias.
- **B. Sector y competencia**: `sector`, `competencia`, `historia`, `esg`, y la parte descriptiva de `negocio`. Al menos dos fuentes de tamaño de mercado e informes anuales de 3-5 competidores.
- **C. Equipo y gobierno**: `directivos` y `gobierno`. IAGC e IARC (o *proxy*), registros oficiales de participaciones y de operaciones de directivos, hechos relevantes de 12 meses e historial de cumplimiento de la guía.
- **D. Mercado y valoración**: `identificacion` (precio, acciones, rango), `consenso`, `bolsa`, `multiplos_historicos`, `comparables` (6-10, cifra a cifra), `transacciones` (5-10), el `puente` de `valoracion` y los datos de mercado para el WACC (bono a 10 años, beta).

**Guardar por partes.** Cada subagente reescribe su `notas/<letra>.json` **después de cada campo que termina** (no solo al final): un corte por límite de uso o por error no debe perder lo ya investigado. Cada campo terminado lleva su parte de `fuentes`; los que faltan quedan sin escribir.

Cada subagente escribe en `notas/<letra>.json` **solo hechos**, con la estructura de sus campos en el prompt y una lista `fuentes` propia (numerada desde 1). Aplica el protocolo de huecos (tres intentos, después `null` y una entrada en `huecos`) y devuelve en su respuesta un resumen de diez líneas: qué ha encontrado, qué falta y qué le ha parecido raro.

Si no puedes lanzar subagentes, haz las fases 2-4 tú mismo, en ese orden y con la misma profundidad.

**Si un subagente se corta**, no lo relances entero: lee su `notas/<letra>.json`, mira qué campos faltan y complétalos tú (o con un subagente nuevo que solo haga esos campos). La integración acepta notas parciales.

## Integración, cálculo y redacción (tú)
1. Fusiona las notas en `datos.json`: renumera las fuentes en una sola lista sin duplicados y actualiza las citas `[n]` de los textos.
2. Primer cálculo: `node motor/calcular-empresa.mjs --datos informes/<carpeta>/datos.json`. Corrige los controles en «Revisar».
3. Fase 6 (supuestos del DCF, escenarios, pesos), segundo cálculo y lectura del DCF inverso.
4. Fase 7 (redacción, resumen el último) y fase 8 (revisión de comité con las diez preguntas del prompt).
5. Genera el informe:
   `node motor/rellenar.mjs --plantilla verticales/empresa/plantilla.docx --datos informes/<carpeta>/datos.json --salida "informes/<carpeta>/<Nombre> - <AAAA-MM-DD>.docx"`
6. Si estás en Windows con Word, compruébalo: `powershell -File construccion/a-pdf.ps1 "<informe>.docx"` (debe abrir sin reparar).

## Entrega
Responde con la ruta del informe y, en diez líneas como máximo: recomendación (Comprar/Mantener/Vender) y convicción, valor objetivo y rentabilidad total esperada, qué descuenta el precio (DCF inverso), cobertura, controles en «Revisar» que quedan y por qué, y las secciones o datos omitidos (los de núcleo, primero).
