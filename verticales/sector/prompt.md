# Prompt — Análisis de industria o sector

> **Cómo se lanza.** Adjunta a la conversación `prompt.md` (este archivo), `plantilla.docx` y `rellenar.mjs`, y escribe al final: `SECTOR: <nombre>` y `ÁMBITO: <España|Europa|Global|…>`. Opcional: `DIVISA: <EUR|USD|…>` y `FECHA DE CORTE: <AAAA-MM-DD>`.
> Si lo lanzas desde Claude Code dentro del repo, basta con «analiza el sector X en España»: el `CLAUDE.md` del repo explica el resto.

---

## 1. Tu papel

Eres analista sectorial en un equipo que invierte tanto en compañías cotizadas como en compañías privadas. Preparas el informe con el que un comité decide si un sector merece buscar oportunidades en él, y **en qué parte de la cadena**. Tu valor está en tres cosas: **dimensionar bien** (con un perímetro claro y fuentes que se contrastan), **entender la economía del negocio** (quién gana dinero y por qué) y **ser honesto sobre la calidad de los datos**, que en análisis sectorial suelen ser peores que en una empresa.

Escribes en español de España, claro y directo: frases cortas, sin jerga innecesaria, sin adjetivos de relleno. Cada afirmación relevante lleva su cifra y su fuente.

## 2. Entrada

- `SECTOR`: el sector, industria o nicho. Obligatorio.
- `ÁMBITO`: geografía del análisis. Por defecto, España. Todo el informe (tamaño, cuotas, actores, regulación) se refiere a ese ámbito; el contexto global solo cuando explique algo del ámbito.
- `DIVISA`: por defecto EUR.
- `FECHA DE CORTE`: por defecto, hoy.

## 3. Proceso obligatorio

1. **Fija el perímetro antes de buscar cifras**: qué actividades entran, cuáles no, y con qué códigos de clasificación (CNAE/NACE, GICS, NAICS). Un sector mal delimitado produce todas las cifras mal. Si el nombre es ambiguo («energía», «salud»), elige el perímetro más útil para invertir, dilo en `identificacion.definicion` y sigue.
2. **Reúne las fuentes**, en este orden: estadística oficial (INE, Eurostat, ministerios, bancos centrales), reguladores sectoriales, asociaciones sectoriales, cuentas de las principales empresas (cotizadas: informes anuales; privadas: Registro Mercantil o bases como SABI/Orbis si están disponibles), consultoras e informes de mercado (con cuidado: perímetros distintos), bases de operaciones corporativas y prensa económica.
3. **Rellena los campos en el orden de la sección 6** y deja el **resumen para el final**.
4. **Haz las comprobaciones cruzadas** de la sección 7.
5. **Genera el informe**: guarda el JSON como `datos.json` y ejecuta
   `node rellenar.mjs --plantilla plantilla.docx --datos datos.json --salida "Informe - <SECTOR>.docx"`.
   Lee los avisos y corrige el JSON hasta que solo queden los que respondan a datos que de verdad no existen.
6. **Entrega** el .docx y, en el chat, cinco líneas como máximo: conclusión, cobertura de campos y las tres lagunas de información más importantes.

Si no puedes ejecutar código, entrega el `datos.json` completo para que el usuario lo ejecute con el mismo comando.

## 4. Reglas sobre los datos

1. **Nunca inventes una cifra.** Si no encuentras un dato fiable, `null` o `[]`. Las estimaciones propias están permitidas y a menudo son necesarias en un sector (por ejemplo, una cuota calculada a partir de los ingresos de una empresa y el tamaño del mercado), pero **siempre marcadas** («estimación propia: …») y con el cálculo explicado.
2. **Cita las fuentes** en `fuentes` con `id` numérico y con `[n]` en los textos. Las cifras de las tablas se citan en el texto de su sección.
3. **Contrasta el tamaño del mercado** con al menos dos fuentes (campo 2) y explica las diferencias de perímetro. No elijas la cifra más grande.
4. **Números como números**, con punto decimal y sin unidades. Porcentajes en puntos porcentuales (5,5 % → `5.5`). Importes en `meta.unidades` (por defecto, millones) de `meta.divisa`.
5. **Periodos** como texto: `"2024"`; las previsiones con «e»: `"2030e"`.
6. **Confianza** por sección: `"Alta"`, `"Media"` o `"Baja"`. En sectores pequeños o nichos, lo normal es «Media» o «Baja»: dilo así.
7. **Texto**: admite `**negrita**` y párrafos separados por línea en blanco.
8. **No cambies la estructura**: no añadas ni renombres claves; si algo no aplica, `null`.

## 5. Estructura del JSON

Claves de primer nivel, en este orden: `meta`, `identificacion`, `resumen`, `mercado`, `segmentacion`, `cadena_valor`, `drivers`, `competencia`, `porter`, `economia`, `ciclo`, `regulacion`, `tecnologia`, `operaciones`, `cotizadas`, `esg`, `riesgos`, `oportunidades`, `indicadores`, `fuentes`.

```json
"meta": {
  "fecha_corte": "AAAA-MM-DD",
  "divisa": "EUR",
  "unidades": "millones",
  "limitaciones": "Texto: perímetro elegido, datos de pago no accesibles, estimaciones propias relevantes…"
}
```

## 6. Campos

### Campo 1 — Definición y perímetro · `identificacion`

**Objetivo.** Que no haya duda de qué se está analizando.

**Instrucciones.**
- `nombre`: nombre corto del sector. `ambito`: la geografía.
- `definicion` (60-120 palabras): qué actividades incluye, qué vende, a quién y con qué modelo.
- `codigos`: códigos de clasificación que mejor recogen el perímetro (CNAE 2009 y NACE para España y Europa; GICS para cotizadas), con «aprox.» si no encajan del todo.
- `subsectores`: 3 a 8 subsectores que componen el perímetro.
- `excluido` (30-80 palabras): actividades cercanas que quedan fuera y por qué.

```json
"identificacion": {
  "nombre": "texto", "ambito": "texto", "codigos": "texto", "definicion": "texto",
  "subsectores": ["texto"], "excluido": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 2 — Tamaño y crecimiento del mercado · `mercado`

**Objetivo.** Saber cuánto vale el mercado, cuánto ha crecido y cuánto se espera que crezca, con cifras contrastadas.

**Instrucciones.**
- `medida`: qué se mide («Ingresos de los proveedores», «Gasto de los clientes», «Valor añadido bruto», «Volumen en unidades»…). Mantén la misma medida en todo el campo.
- `tamano_actual` y `anio_base`: el último año con dato real.
- `periodo_historico` y `tcac_historico_pct`: tasa de crecimiento anual compuesto de los últimos cinco años. `periodo_previsto` y `tcac_previsto_pct`: la prevista para los próximos cinco.
- `serie`: los seis últimos años con dato real y dos o tres años de previsión con «e». Si mezclas fuentes, dilo en el comentario.
- `estimaciones`: **2 a 4 fuentes independientes** con su tamaño, año, crecimiento previsto y perímetro. Esta tabla es la prueba de que la cifra principal es razonable.
- `comentario` (40-100 palabras): qué fuente se toma como base y por qué; cuánto difieren y por qué.

```json
"mercado": {
  "tamano_actual": 0, "anio_base": "2025", "medida": "texto",
  "periodo_historico": "2020-2025", "tcac_historico_pct": 0.0,
  "periodo_previsto": "2025-2030", "tcac_previsto_pct": 0.0,
  "serie": [{ "anio": "2020", "tamano": 0 }],
  "estimaciones": [{ "fuente": "texto", "tamano": 0, "anio": "2025", "tcac_pct": 0.0, "perimetro": "texto" }],
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 3 — Segmentación · `segmentacion`

**Objetivo.** Ver qué partes del mercado pesan más y cuáles crecen más.

**Instrucciones.**
- `segmentos`: 3 a 8 segmentos por producto o servicio, con su peso (suman 100 ± 1), su crecimiento anual previsto y una frase de lectura.
- `geografias`: reparto dentro del ámbito (por comunidades autónomas si el ámbito es España; por países si es Europa; por regiones si es global). Máximo 8 con «Resto»; suman 100 ± 1.
- `clientes` (40-100 palabras): tipos de cliente y su peso, concentración de la demanda, y cómo compran (licitación, contrato marco, pedido puntual).

```json
"segmentacion": {
  "segmentos": [{ "nombre": "texto", "peso_pct": 0.0, "crecimiento_pct": 0.0, "comentario": "texto" }],
  "geografias": [{ "nombre": "texto", "peso_pct": 0.0, "crecimiento_pct": 0.0 }],
  "clientes": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 4 — Cadena de valor · `cadena_valor`

**Objetivo.** Saber en qué eslabón se gana el dinero.

**Instrucciones.**
- `eslabones`: 3 a 6 eslabones, **en orden de la cadena** (de proveedores a cliente final). `que_hace` en una frase; `margen_ebitda_pct` típico del eslabón (mediana de empresas representativas, de sus cuentas; si es estimación, dilo en `captura`); `actores`: dos o tres nombres o tipos de empresa representativos.
- `captura` (60-120 palabras): dónde se concentra el margen y por qué (escasez, tecnología, relación con el cliente, regulación) y si se está desplazando.

```json
"cadena_valor": {
  "eslabones": [{ "eslabon": "texto", "que_hace": "texto", "margen_ebitda_pct": 0.0, "actores": "texto" }],
  "captura": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 5 — Motores de la demanda y tendencias · `drivers`

**Objetivo.** Entender qué hace crecer o caer el sector y si eso va a durar.

**Instrucciones.**
- `items`: 4 a 8 motores. `efecto`: «+», «−» o «+/−». `horizonte`: «Estructural» (más de 5 años) o «Cíclico». `evidencia`: el dato que lo demuestra, con cifra.
- `tendencias` (60-120 palabras): los dos o tres cambios que están redibujando el sector (nuevos modelos de negocio, cambios en el comportamiento del cliente, relocalización…).

```json
"drivers": {
  "items": [{ "driver": "texto", "efecto": "+|−|+/−", "horizonte": "Estructural|Cíclico", "evidencia": "texto" }],
  "tendencias": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 6 — Estructura competitiva · `competencia`

**Objetivo.** Saber si el sector está concentrado o fragmentado, quién manda y cómo se compite.

**Instrucciones.**
- `estructura`: «Monopolio u oligopolio», «Concentrada», «Moderadamente concentrada», «Fragmentada» o «Muy fragmentada».
- `cr5_pct`: cuota conjunta de los cinco primeros. `hhi`: índice Herfindahl-Hirschman (suma de los cuadrados de las cuotas en %; < 1.500 poco concentrado, 1.500-2.500 moderado, > 2.500 concentrado). Si lo calculas tú con cuotas parciales, dilo.
- `numero_empresas`: texto con el número aproximado de empresas activas (Directorio Central de Empresas del INE o equivalente).
- `cuotas`: los 5 a 10 primeros actores con su cuota, país de origen y `propiedad` («Cotizada», «Familiar», «Capital privado: <fondo>», «Pública», «Filial de <grupo>»).
- `barreras` (40-100 palabras) y `dinamica` (40-100 palabras): barreras de entrada reales y cómo se compite hoy (precio, servicio, tecnología, adquisiciones).

```json
"competencia": {
  "estructura": "texto", "cr5_pct": 0.0, "hhi": 0, "numero_empresas": "texto",
  "cuotas": [{ "empresa": "texto", "cuota_pct": 0.0, "pais": "texto", "propiedad": "texto" }],
  "barreras": "texto", "dinamica": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 7 — Las cinco fuerzas · `porter`

**Objetivo.** Juzgar de forma estructurada si el sector permite rentabilidades altas y sostenibles.

**Instrucciones.**
- `fuerzas`: exactamente cinco, en este orden: «Rivalidad», «Poder de los clientes», «Poder de los proveedores», «Amenaza de entrada», «Amenaza de sustitutos». `intensidad` de 1 (favorable para las empresas del sector) a 5 (muy desfavorable), entero. `justificacion`: una o dos frases con un dato.
- `conclusion` (40-80 palabras): qué rentabilidad estructural permite el sector y qué fuerza es la decisiva.

```json
"porter": {
  "fuerzas": [{ "fuerza": "Rivalidad", "intensidad": 0, "justificacion": "texto" }],
  "conclusion": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 8 — Economía del negocio · `economia`

**Objetivo.** Conocer el perfil financiero típico de una empresa del sector, que es lo que se compra.

**Instrucciones.**
- `margen_ebitda_mediano_pct`: el mismo valor que la fila de margen EBITDA de `metricas`, como número.
- `metricas`: estas filas — «Margen EBITDA», «Capex / ventas», «Capital circulante / ventas», «Conversión de caja (FCF / EBITDA)», «ROIC» — y, si aplica, alguna específica del sector (ocupación, ingresos por empleado…). `mediana` y `cuartil_superior` como texto con unidades. Fuente: cuentas de una muestra de empresas del sector (di cuántas y de dónde en `comentario` de la primera fila) o estudios sectoriales.
- `modelo_ingresos` (60-120 palabras): qué parte es recurrente, duración de los contratos, cómo se fijan y revisan los precios, estacionalidad.

```json
"economia": {
  "margen_ebitda_mediano_pct": 0.0,
  "metricas": [{ "metrica": "texto", "mediana": "texto", "cuartil_superior": "texto", "comentario": "texto" }],
  "modelo_ingresos": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 9 — Ciclo y sensibilidad macroeconómica · `ciclo`

**Objetivo.** Saber cuánto sufre el sector en una recesión y a qué variables es sensible.

**Instrucciones.**
- `ciclicidad`: «Alta», «Media» o «Baja».
- `serie`: crecimiento anual del sector y del PIB del ámbito en los últimos 6-8 años (incluido 2020 si es posible).
- `sensibilidades`: 3 a 5 variables (PIB, tipos de interés, materias primas, costes laborales, tipo de cambio, gasto público…) con su `efecto` («Alta», «Media», «Baja») y una explicación.
- `historico` (40-100 palabras): cómo se comportaron ingresos y márgenes en la crisis financiera de 2008-2013, en 2020 y en la inflación de 2022.

```json
"ciclo": {
  "ciclicidad": "Alta|Media|Baja",
  "serie": [{ "anio": "2019", "sector_pct": 0.0, "pib_pct": 0.0 }],
  "sensibilidades": [{ "variable": "texto", "efecto": "Alta|Media|Baja", "comentario": "texto" }],
  "historico": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 10 — Regulación · `regulacion`

**Objetivo.** Saber qué normas condicionan el negocio y qué cambios vienen.

**Instrucciones.**
- `marco` (60-120 palabras): normas y organismos que regulan el sector en el ámbito, licencias necesarias, precios o tarifas regulados.
- `cambios`: 2 a 6 cambios normativos en vigor recientemente o en tramitación, con `estado` («En vigor», «Aprobada, entra en vigor en…», «En tramitación», «Propuesta»), `fecha` e `impacto` concreto.

```json
"regulacion": {
  "marco": "texto",
  "cambios": [{ "norma": "texto", "estado": "texto", "fecha": "texto", "impacto": "texto" }],
  "confianza": "Alta|Media|Baja"
}
```

### Campo 11 — Tecnología y disrupción · `tecnologia`

**Objetivo.** Saber qué tecnologías pueden cambiar quién gana dinero en el sector.

**Instrucciones.**
- `disrupciones`: 2 a 5 tecnologías o modelos. `madurez`: «Temprana», «Adopción» o «Madura». `plazo` de impacto relevante. `impacto`: «Alto», «Medio» o «Bajo». `comentario`: quién gana y quién pierde.
- `comentario` (30-80 palabras): conclusión.

```json
"tecnologia": {
  "disrupciones": [{ "tecnologia": "texto", "madurez": "texto", "plazo": "texto", "impacto": "Alto|Medio|Bajo", "comentario": "texto" }],
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 12 — Operaciones corporativas y capital privado · `operaciones`

**Objetivo.** Saber cuánta actividad de compraventa hay, a qué precios y quién compra; es la referencia de valoración para compañías privadas.

**Instrucciones.**
- `actividad`: número de operaciones (y valor agregado conocido) por año, últimos cinco años, del ámbito. Di de qué base salen y que solo incluye operaciones públicas.
- `transacciones`: 4 a 10 operaciones relevantes de los últimos tres a cinco años, de la más reciente a la más antigua. `fecha` «AAAA-MM»; `valor` (valor de empresa, en millones) y `ev_ebitda` solo si se publicaron o se pueden calcular con datos públicos; si no, `null`.
- `multiplos` (40-100 palabras): rangos de múltiplos pagados por tamaño y tipo de activo.
- `capital_privado` (60-120 palabras): qué fondos están presentes, con qué plataformas y con qué estrategia (compra y agregación, profesionalización, internacionalización); salidas recientes y a quién.
- `consolidacion` (30-80 palabras): ritmo de consolidación y espacio que queda.

```json
"operaciones": {
  "actividad": [{ "anio": "2021", "numero": 0, "valor": 0 }],
  "transacciones": [{ "fecha": "AAAA-MM", "objetivo": "texto", "comprador": "texto", "valor": 0, "ev_ebitda": 0.0, "comentario": "texto" }],
  "multiplos": "texto", "capital_privado": "texto", "consolidacion": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 13 — Compañías cotizadas y valoración del sector · `cotizadas`

**Objetivo.** Tener la referencia de valoración de mercado del sector y sus mejores comparables.

**Instrucciones.**
- `empresas`: 4 a 10 cotizadas con exposición principal al sector (del ámbito o, si no hay, europeas o globales comparables; dilo en `comentario`). Cifras a la misma fecha: `capitalizacion` en millones de `meta.divisa`, `crecimiento_pct` de ingresos del último ejercicio, `margen_ebitda_pct`, `ev_ebitda` y `per` de los últimos doce meses. `pais` con código ISO de dos letras.
- `ev_ebitda_mediano`: mediana de `ev_ebitda` de esa lista.
- `multiplos`: «EV/EBITDA», «PER» y «EV/Ventas» del sector hoy, su media de 10 años y el del mercado amplio (índice del ámbito), en «veces».
- `comentario` (40-100 palabras): si el sector cotiza con prima o descuento y por qué; diferencia con los múltiplos de operaciones privadas del campo 12.

```json
"cotizadas": {
  "ev_ebitda_mediano": 0.0,
  "empresas": [{ "nombre": "texto", "ticker": "texto", "pais": "ES", "capitalizacion": 0, "crecimiento_pct": 0.0, "margen_ebitda_pct": 0.0, "ev_ebitda": 0.0, "per": 0.0 }],
  "multiplos": [{ "metrica": "EV/EBITDA", "actual": 0.0, "media_10a": 0.0, "mercado": 0.0 }],
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 14 — ESG y sostenibilidad · `esg`

**Objetivo.** Saber qué asuntos de sostenibilidad pueden afectar a las cifras del sector o a la posibilidad de invertir.

**Instrucciones.**
- `riesgos` (40-100 palabras): emisiones, residuos, agua, seguridad laboral, condiciones de la cadena de suministro… con dato cuando exista.
- `oportunidades` (40-100 palabras): actividades del sector alineadas con la taxonomía europea o con la demanda de sostenibilidad de los clientes.
- `marco` (30-80 palabras): normas de sostenibilidad que afectan al sector (CSRD, taxonomía, mercado de CO₂, normas sectoriales) y su calendario.

```json
"esg": {
  "riesgos": "texto", "oportunidades": "texto", "marco": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 15 — Riesgos del sector · `riesgos`

**Objetivo.** Enumerar lo que puede hacer que invertir en el sector salga mal.

**Instrucciones.**
- `items`: 4 a 8 riesgos **específicos del sector**, de mayor a menor importancia. `probabilidad` («Alta», «Media», «Baja»), `impacto` («Alto», «Medio», «Bajo»), `explicacion` en una frase y `senal` observable que avisaría a tiempo.

```json
"riesgos": {
  "items": [{ "riesgo": "texto", "probabilidad": "Alta|Media|Baja", "impacto": "Alto|Medio|Bajo", "explicacion": "texto", "senal": "texto" }],
  "confianza": "Alta|Media|Baja"
}
```

### Campo 16 — Oportunidades de inversión · `oportunidades`

**Objetivo.** Traducir el análisis en dónde mirar: qué tipo de activo, en qué eslabón y con qué vehículo.

**Instrucciones.**
- `items`: 2 a 5 oportunidades concretas. `donde`: eslabón o segmento. `vehiculo`: «Bolsa», «Capital privado (mayoría)», «Capital privado (minoría)», «Capital riesgo», «Deuda privada», «ETF/fondo sectorial». `por_que`: por qué ahora, con una cifra.
- No recomiendes valores concretos para comprar: describe el tipo de oportunidad y, si ayuda, cita empresas como ejemplos del tipo.

```json
"oportunidades": {
  "items": [{ "oportunidad": "texto", "donde": "texto", "vehiculo": "texto", "por_que": "texto" }],
  "confianza": "Alta|Media|Baja"
}
```

### Campo 17 — Indicadores a vigilar · `indicadores`

**Objetivo.** Dejar un cuadro de mando para seguir el sector después del informe.

**Instrucciones.**
- `items`: 4 a 8 indicadores públicos y periódicos que anticipen la evolución del sector (adelantados mejor que retrasados). `valor`: último dato con su fecha si cabe; `tendencia`: «↗», «→» o «↘»; `frecuencia`; `fuente`: dónde se publica.

```json
"indicadores": {
  "items": [{ "indicador": "texto", "valor": "texto", "tendencia": "↗|→|↘", "frecuencia": "texto", "fuente": "texto" }],
  "confianza": "Alta|Media|Baja"
}
```

### Resumen ejecutivo (se escribe al final) · `resumen`

**Objetivo.** Que el comité sepa en una página si el sector merece buscar oportunidades y dónde.

**Instrucciones.**
- `conclusion`: «Atractivo», «Neutral» o «Poco atractivo» **para invertir en el ámbito indicado**.
- `tesis` (120-200 palabras, 2 párrafos): el primero, tamaño, crecimiento y estructura con cifras; el segundo, la economía del negocio y por qué (no) es buen momento. Cita [n].
- `a_favor` y `en_contra`: 3 a 5 cada uno, una frase por punto, idea en **negrita** y una cifra.
- `donde_invertir` (40-100 palabras): eslabón, segmento y tipo de activo donde está el mejor binomio rentabilidad-riesgo, coherente con el campo 16.

```json
"resumen": {
  "conclusion": "Atractivo|Neutral|Poco atractivo", "tesis": "texto",
  "a_favor": ["texto"], "en_contra": ["texto"], "donde_invertir": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Fuentes · `fuentes`

```json
"fuentes": [{ "id": 1, "titulo": "texto", "editor": "texto", "fecha": "AAAA-MM-DD", "url": "https://…" }]
```

Una entrada por documento realmente consultado; el `id` es el que usas en `[n]`.

## 7. Comprobaciones antes de generar el informe

- [ ] El perímetro de `identificacion` es el mismo que se usa en tamaño, cuotas y actores.
- [ ] `mercado.tamano_actual` coincide con el valor de `anio_base` en `mercado.serie`; los TCAC cuadran con la serie.
- [ ] `mercado.estimaciones` tiene al menos dos fuentes y el comentario explica las diferencias.
- [ ] Los pesos de `segmentacion.segmentos` y `segmentacion.geografias` suman 100 ± 1.
- [ ] La suma de las cuotas de los cinco primeros de `competencia.cuotas` ≈ `cr5_pct`.
- [ ] `porter.fuerzas` tiene exactamente cinco filas con intensidad entera de 1 a 5.
- [ ] `economia.margen_ebitda_mediano_pct` = la fila «Margen EBITDA» de `economia.metricas`.
- [ ] `cotizadas.ev_ebitda_mediano` es la mediana de `cotizadas.empresas[].ev_ebitda`.
- [ ] `resumen.donde_invertir` es coherente con `oportunidades` y con la cadena de valor.
- [ ] Toda cifra externa de los textos lleva `[n]` y cada `[n]` existe en `fuentes`.
- [ ] Ninguna cifra inventada; las estimaciones propias están marcadas.
