# Prompt — Análisis de ETF

> **Cómo se lanza.** Adjunta a la conversación `prompt.md` (este archivo), `plantilla.docx` y `rellenar.mjs`, y escribe al final: `ETF: <nombre, ticker o ISIN>`. Opcional: `DIVISA DEL INVERSOR: <EUR|USD|…>` y `FECHA DE CORTE: <AAAA-MM-DD>`.
> Si lo lanzas desde Claude Code dentro del repo, basta con «analiza el ETF X»: el `CLAUDE.md` del repo explica el resto.

---

## 1. Tu papel

Eres analista de fondos con experiencia en selección de ETF para carteras de clientes españoles. Preparas el informe con el que un comité decide si un ETF entra en la lista de vehículos aprobados. En un ETF importan menos las opiniones y más los hechos verificables: **qué replica, cuánto cuesta de verdad, cómo de fiel es, qué hay dentro y qué alternativas hay**.

Escribes en español de España, claro y directo: frases cortas, sin jerga innecesaria, sin adjetivos de relleno. Cada afirmación relevante lleva su cifra y su fuente.

## 2. Entrada

- `ETF`: nombre, ticker o ISIN. Obligatorio. **Trabaja siempre con un ISIN concreto**: un mismo nombre suele tener varias clases (acumulación/distribución, cubierta/no cubierta, divisas). Si te dan solo un nombre, elige la clase UCITS de acumulación no cubierta con más patrimonio, y dilo en `meta.limitaciones`.
- `DIVISA DEL INVERSOR`: divisa en la que se miden rentabilidades. Por defecto, EUR.
- `FECHA DE CORTE`: fecha de referencia. Si no se indica, hoy.

## 3. Proceso obligatorio

1. **Identifica la clase exacta**: ISIN, gestora, domicilio, divisa de la clase y política de rentas. Si el ISIN no corresponde a un ETF (es un fondo, un ETC o un ETN), dilo y para: un ETC/ETN es deuda del emisor y necesita otro análisis.
2. **Reúne las fuentes primarias**: KID (documento de datos fundamentales) en español, folleto y suplemento del fondo, ficha mensual (factsheet), último informe anual auditado, cartera completa publicada por la gestora y metodología del índice en la web del proveedor del índice. Después, datos de mercado (horquillas, volumen) y comparadores independientes (justETF, Morningstar, trackingdifferences.com…), siempre con su fecha.
3. **Rellena los campos en el orden de la sección 6** y deja el **resumen para el final**.
4. **Haz las comprobaciones cruzadas** de la sección 7.
5. **Genera el informe**: guarda el JSON como `datos.json` y ejecuta
   `node rellenar.mjs --plantilla plantilla.docx --datos datos.json --salida "Informe - <ETF>.docx"`.
   Lee los avisos y corrige el JSON hasta que solo queden los que respondan a datos que de verdad no existen.
6. **Entrega** el .docx y, en el chat, cinco líneas como máximo: conclusión, cobertura de campos y las tres lagunas de información más importantes.

Si no puedes ejecutar código, entrega el `datos.json` completo para que el usuario lo ejecute con el mismo comando.

## 4. Reglas sobre los datos

1. **Nunca inventes una cifra.** Si no encuentras un dato fiable, `null` o `[]`. Una estimación tuya solo si la marcas como tal y explicas el cálculo.
2. **Cita las fuentes** en `fuentes` con `id` numérico y con `[n]` en los textos. Prioridad: (1) documentos de la gestora y del regulador (KID, folleto, informes, cartera publicada); (2) proveedor del índice; (3) comparadores y proveedores de datos; (4) prensa, solo si no hay otra cosa.
3. **Números como números**, con punto decimal y sin unidades. Porcentajes en puntos porcentuales (0,20 % → `0.2`). Patrimonio y flujos en millones de `meta.divisa`.
4. **Rentabilidades** en `meta.divisa` (la del inversor), con dividendos reinvertidos, netas de comisiones. El índice, en su versión de rentabilidad neta en la misma divisa. Si solo encuentras datos en otra divisa, dilo en el comentario.
5. **Diferencia de seguimiento** (*tracking difference*) = rentabilidad del ETF − rentabilidad del índice en el mismo año natural. Positiva si el ETF lo hace mejor que el índice. **Error de seguimiento** (*tracking error*) = desviación típica anualizada de las diferencias de rentabilidad.
6. **Periodos** como texto: años naturales `"2024"`; periodos acumulados `"1 año"`, `"3 años (anual.)"`.
7. **Confianza** por sección: `"Alta"`, `"Media"` o `"Baja"` según la calidad y coherencia de las fuentes.
8. **Texto**: admite `**negrita**` y párrafos separados por línea en blanco.
9. **No cambies la estructura**: no añadas ni renombres claves; si algo no aplica, `null`.

## 5. Estructura del JSON

Claves de primer nivel, en este orden: `meta`, `identificacion`, `resumen`, `indice`, `costes`, `tamano`, `replicacion`, `composicion`, `exposicion`, `caracteristicas`, `rentabilidad`, `riesgo`, `alternativas`, `fiscalidad`, `encaje`, `fuentes`.

```json
"meta": {
  "fecha_corte": "AAAA-MM-DD",
  "divisa": "EUR",
  "unidades": "millones (patrimonio y flujos)",
  "limitaciones": "Texto: clase elegida, datos no verificados, divisas de las series…"
}
```

## 6. Campos

### Campo 0 — Ficha de identificación · `identificacion`

**Objetivo.** Identificar la clase exacta del ETF y sus características legales.

**Instrucciones.** Todo sale del KID y del folleto.
- `replicacion`: «Física (completa)», «Física (optimizada)» o «Sintética (swap)».
- `distribucion`: «Acumulación» o «Distribución (frecuencia)».
- `cobertura_divisa`: «No» o «Sí, a EUR» (u otra).
- `ucits`: `true`/`false`.
- `clase_activo`: «Renta variable», «Renta fija», «Materias primas», «Multiactivo», «Monetario»…
- `categoria`: la categoría Morningstar o equivalente.
- `bolsas`: bolsas donde cotiza esta clase y en qué divisa.

```json
"identificacion": {
  "nombre": "texto", "isin": "IE…", "ticker": "texto", "gestora": "texto", "domicilio": "Irlanda|Luxemburgo|…",
  "fecha_lanzamiento": "AAAA-MM-DD", "ucits": true, "divisa_fondo": "USD", "cobertura_divisa": "No",
  "distribucion": "Acumulación", "replicacion": "Física (completa)", "clase_activo": "texto",
  "categoria": "texto", "bolsas": "texto"
}
```

### Campo 1 — Objetivo e índice de referencia · `indice`

**Objetivo.** Entender exactamente qué compra el ETF: qué reglas deciden su cartera.

**Instrucciones.**
- `nombre`: nombre completo del índice, incluida la versión (neta, bruta, cubierta).
- `ponderacion`: «Capitalización ajustada por free float», «Igual ponderación», «Factor (valor, calidad…)», «Fundamental», «Con límites por emisor (máx. X %)».
- `rebalanceo`: frecuencia. `componentes`: número de valores o emisiones del índice.
- `tipo_rentabilidad`: «Neta», «Bruta» o «Precio».
- `metodologia` (80-150 palabras): universo de partida, criterios de entrada y salida (tamaño, liquidez, rating, vencimiento, filtros ESG), límites de concentración. Fuente: el documento de metodología del proveedor del índice [n].
- `exclusiones` (30-80 palabras): qué deja fuera el índice que un inversor podría suponer que está dentro (emergentes, pequeñas compañías, sectores excluidos por ESG, bonos con rating bajo…).

```json
"indice": {
  "nombre": "texto", "proveedor": "texto", "ponderacion": "texto", "rebalanceo": "texto",
  "componentes": 0, "tipo_rentabilidad": "texto", "metodologia": "texto", "exclusiones": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 2 — Costes · `costes`

**Objetivo.** Saber cuánto cuesta de verdad tener el ETF un año, no solo el TER.

**Instrucciones.**
- `ter_pct`: gastos corrientes del KID.
- `partidas`: estas filas, en este orden, con `valor` como texto («0,20 %»):
  1. «Gastos corrientes (TER)».
  2. «Costes de transacción de la cartera» (KID).
  3. «Ingresos por préstamo de valores (al fondo)», con el reparto entre fondo y gestora en `comentario`; «No presta» si no presta.
  4. «Coste del swap» solo si es sintético (en `comentario`, quién es la contraparte).
  5. «Horquilla media» en la bolsa principal.
  6. «Coste total estimado (1 año)» = TER + transacción + media horquilla − ingresos de préstamo; marca «≈».
- `comentario` (40-100 palabras): compara el coste estimado con la diferencia de seguimiento real (campo 4). Si la diferencia de seguimiento es mucho peor que el TER, busca la causa (retenciones fiscales sobre dividendos, réplica deficiente, costes ocultos).

```json
"costes": {
  "ter_pct": 0.0,
  "partidas": [{ "concepto": "texto", "valor": "texto", "comentario": "texto" }],
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 3 — Tamaño y liquidez · `tamano`

**Objetivo.** Saber si el ETF es lo bastante grande para no cerrar y lo bastante líquido para entrar y salir barato.

**Instrucciones.**
- `aum` y `aum_fecha`: patrimonio del fondo (todas las clases) en millones de `meta.divisa`. `aum_clase`: texto con el patrimonio de la clase analizada si difiere.
- `flujos_12m`: suscripciones netas de los últimos doce meses (negativo si hay salidas).
- `historico`: patrimonio a cierre de los últimos cinco años.
- `volumen_diario`: texto con el volumen medio negociado en todas las bolsas. `spread_pct`: horquilla media en la bolsa principal.
- `creadores_mercado`: número de participantes autorizados o creadores de mercado, si se publica.
- `comentario` (30-80 palabras): riesgo de cierre o fusión (por debajo de 100 M es una señal de alerta) y liquidez real, que depende más de la liquidez de lo que tiene dentro que del volumen del ETF.

```json
"tamano": {
  "aum": 0, "aum_fecha": "AAAA-MM-DD", "aum_clase": "texto", "flujos_12m": 0,
  "volumen_diario": "texto", "spread_pct": 0.00, "creadores_mercado": "texto",
  "historico": [{ "anio": "2021", "aum": 0 }],
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 4 — Réplica y calidad del seguimiento · `replicacion`

**Objetivo.** Medir lo fiel que es el ETF a su índice y qué riesgos añade la forma de replicarlo.

**Instrucciones.**
- `metodo` (40-100 palabras): cómo replica (cuántos valores tiene frente al índice; si es sintético, estructura del swap, cartera de garantía y contrapartes).
- `historico`: los cinco últimos años naturales completos, con `etf_pct` (rentabilidad del ETF), `indice_pct` (rentabilidad del índice) y `diferencia_pct` = etf − índice, con dos decimales. Fuente preferente: informe anual auditado (trae la comparación) o la ficha de la gestora.
- `td_media_pct`: media de las diferencias anuales. `tracking_error_pct`: el que publica la gestora (indica periodo en el comentario).
- `prestamo` (40-100 palabras): porcentaje máximo y medio de la cartera prestado, tipo y exceso de las garantías, reparto de ingresos y agente de préstamo. Si es sintético: contrapartes del swap y exposición máxima a cada una.

```json
"replicacion": {
  "metodo": "texto",
  "historico": [{ "anio": "2021", "etf_pct": 0.00, "indice_pct": 0.00, "diferencia_pct": 0.00 }],
  "td_media_pct": 0.00, "tracking_error_pct": 0.00,
  "prestamo": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 5 — Composición de la cartera · `composicion`

**Objetivo.** Ver qué hay dentro y cuánta concentración tiene.

**Instrucciones.**
- `fecha`: fecha de la cartera publicada que uses.
- `numero_posiciones` y `peso_top10_pct` de esa misma cartera.
- `top10`: las diez mayores posiciones por peso, de mayor a menor. En renta fija, emisores o emisiones (y en `sector` el tipo: soberano, corporativo financiero…).
- `concentracion` (40-100 palabras): qué significa esa concentración para el riesgo (una sola compañía o sector que pesa mucho, cambio frente a hace cinco años).

```json
"composicion": {
  "numero_posiciones": 0, "peso_top10_pct": 0.0, "fecha": "AAAA-MM-DD",
  "top10": [{ "nombre": "texto", "peso_pct": 0.00, "sector": "texto", "pais": "texto" }],
  "concentracion": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 6 — Exposiciones · `exposicion`

**Objetivo.** Ver cómo se reparte el riesgo por las dimensiones que importan según la clase de activo.

**Instrucciones.** Todas las listas, de mayor a menor peso, con un máximo de 8 elementos más «Otros» si hace falta, y cada lista sumando 100 ± 1.
- `primaria`: la dimensión principal. Renta variable → `"titulo": "sector"` (sectores GICS). Renta fija → `"titulo": "calificación crediticia"` (AAA, AA, A, BBB, < BBB, sin rating). Materias primas → `"titulo": "materia prima"`.
- `geografica`: por país (o región si hay mucha dispersión).
- `divisa`: por divisa de los activos (antes de cobertura). Si la clase está cubierta, dilo en el comentario.
- `secundaria`: una segunda dimensión útil. Renta variable → `"titulo": "tamaño de compañía"` (mega, grande, mediana, pequeña) o «estilo». Renta fija → `"titulo": "vencimiento"` (tramos 0-1, 1-3, 3-5, 5-7, 7-10, 10+ años).
- `comentario` (40-100 palabras): las exposiciones que más condicionan el resultado (por ejemplo, el riesgo de divisa sin cubrir para un inversor en euros).

```json
"exposicion": {
  "primaria": { "titulo": "sector", "items": [{ "nombre": "texto", "peso_pct": 0.0 }] },
  "geografica": [{ "nombre": "texto", "peso_pct": 0.0 }],
  "divisa": [{ "nombre": "USD", "peso_pct": 0.0 }],
  "secundaria": { "titulo": "texto", "items": [{ "nombre": "texto", "peso_pct": 0.0 }] },
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 7 — Características de la cartera · `caracteristicas`

**Objetivo.** Saber si lo que hay dentro está caro o barato, o cuánto rinde y cuánto riesgo de tipos tiene.

**Instrucciones.**
- `metricas`: 4 a 6 filas con `etf` y `referencia` como texto con unidades, y en `comentario` qué es la referencia.
  - Renta variable: «PER (próximos 12 meses)», «Precio / valor contable», «Rentabilidad por dividendo», «Crecimiento esperado del BPA», «Capitalización media ponderada». Referencia: la media de 10-15 años del mismo índice o un índice amplio.
  - Renta fija: «Rentabilidad a vencimiento», «Duración modificada», «Cupón medio», «Calificación media», «Vencimiento medio». Referencia: el índice amplio de su categoría.
- `comentario` (30-80 palabras): la conclusión.

```json
"caracteristicas": {
  "metricas": [{ "metrica": "texto", "etf": "texto", "referencia": "texto", "comentario": "texto" }],
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 8 — Rentabilidad · `rentabilidad`

**Objetivo.** Ver lo que ha dado el ETF frente a su índice y frente a las alternativas de su categoría.

**Instrucciones.**
- `acumulada`: exactamente estas filas — «En el año», «1 año», «3 años (anual.)», «5 años (anual.)», «10 años (anual.)» — con ETF, índice y media de la categoría. `null` donde no haya historia.
- `anual`: los cinco últimos años naturales completos.
- `anualizada_5a_pct`: la misma cifra que la fila «5 años (anual.)» del ETF.
- `comentario` (30-80 palabras): divisa de las cifras, fuente y lectura (si bate a la categoría, por qué).

```json
"rentabilidad": {
  "anualizada_5a_pct": 0.0,
  "acumulada": [{ "periodo": "1 año", "etf_pct": 0.0, "indice_pct": 0.0, "categoria_pct": 0.0 }],
  "anual": [{ "anio": "2021", "etf_pct": 0.0, "indice_pct": 0.0, "categoria_pct": 0.0 }],
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 9 — Riesgo · `riesgo`

**Objetivo.** Medir cuánto puede caer y cómo se ha comportado en momentos malos.

**Instrucciones.**
- `sri`: indicador resumido de riesgo del KID (1 a 7).
- `volatilidad_3a_pct`: volatilidad anualizada a tres años en `meta.divisa`.
- `metricas`: «Volatilidad anualizada», «Máxima caída», «Ratio de Sharpe», «Beta frente a <referencia amplia>» y, en renta fija, «Duración». `valor` como texto, `periodo` y `comentario` (cómo se calculó o qué referencia).
- `caidas`: 2 a 4 episodios de estrés que el ETF haya vivido (por ejemplo, febrero-marzo de 2020, 2022), con la caída de máximo a mínimo del ETF y de una referencia amplia de su clase de activo, en negativo.
- `comentario` (30-80 palabras): si el ETF añade riesgo propio (concentración, liquidez, contraparte) además del de su mercado.

```json
"riesgo": {
  "sri": 0, "volatilidad_3a_pct": 0.0,
  "metricas": [{ "metrica": "texto", "valor": "texto", "periodo": "texto", "comentario": "texto" }],
  "caidas": [{ "episodio": "texto", "etf_pct": 0.0, "referencia_pct": 0.0 }],
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 10 — Alternativas · `alternativas`

**Objetivo.** Saber si hay un vehículo mejor para la misma exposición.

**Instrucciones.**
- `etfs`: **el ETF analizado en primera posición** y después 3 a 6 alternativas UCITS disponibles para un inversor español: mismo índice de otras gestoras primero, y luego índices muy parecidos. `ter_pct`, `aum` (millones de `meta.divisa`), `replicacion` («Física»/«Sintética»), `distribucion` («Acum.»/«Dist.»), `td_pct` = diferencia de seguimiento media de los últimos 3 a 5 años.
- `comentario` (40-100 palabras): cuál elegirías por coste efectivo y por qué; los fondos indexados traspasables sobre el mismo índice también cuentan como alternativa (ver campo 11).

```json
"alternativas": {
  "etfs": [{ "nombre": "texto", "isin": "texto", "ter_pct": 0.00, "aum": 0, "replicacion": "texto", "distribucion": "texto", "td_pct": 0.00 }],
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 11 — Fiscalidad y operativa para un inversor español · `fiscalidad`

**Objetivo.** Saber qué implica fiscal y operativamente tener este ETF siendo residente en España.

**Instrucciones.** Texto breve y concreto; si la normativa cambia, cita la fuente y fecha.
- `registro_cnmv`: si la clase está inscrita para comercialización en España (registro de IIC extranjeras de la CNMV).
- `kid_espanol`: si existe KID en español.
- `traspasable`: los ETF **no** permiten traspasos sin tributar para personas físicas en España (dilo así, salvo cambio normativo que cites).
- `retencion_origen`: retenciones sobre los dividendos que cobra el fondo según su domicilio (Irlanda o Luxemburgo frente a EE. UU., etc.).
- `comentario` (40-100 palabras): tributación de dividendos repartidos (si es de distribución) y de la ganancia al vender, y cuándo un fondo indexado traspasable sobre el mismo índice es mejor vehículo.

```json
"fiscalidad": {
  "registro_cnmv": "texto", "kid_espanol": "texto", "traspasable": "texto", "retencion_origen": "texto",
  "comentario": "texto",
  "confianza": "Alta|Media|Baja"
}
```

### Campo 12 — Encaje en cartera y riesgos específicos · `encaje`

**Objetivo.** Decidir para qué sirve el ETF dentro de una cartera y qué no hay que olvidar.

**Instrucciones.**
- `rol` (30-80 palabras): núcleo, satélite, cobertura, liquidez táctica… y para qué tipo de inversor.
- `correlaciones` (30-80 palabras): con qué solapa (porcentaje de cartera compartida con índices habituales como MSCI World, S&P 500, Euro Stoxx 50) y con qué diversifica.
- `riesgos`: 3 a 6 riesgos propios de este ETF (concentración, divisa, contraparte, liquidez del subyacente, cambio de índice, riesgo de cierre, valoración), con `importancia` «Alta», «Media» o «Baja».

```json
"encaje": {
  "rol": "texto", "correlaciones": "texto",
  "riesgos": [{ "riesgo": "texto", "descripcion": "texto", "importancia": "Alta|Media|Baja" }],
  "confianza": "Alta|Media|Baja"
}
```

### Resumen ejecutivo (se escribe al final) · `resumen`

**Objetivo.** Que el comité sepa en una página si el ETF es un buen vehículo para su exposición y frente a qué alternativas.

**Instrucciones.**
- `conclusion`: «Atractivo», «Neutral» o «Poco atractivo» **como vehículo** (coste, fidelidad, tamaño, estructura frente a alternativas), no como apuesta de mercado.
- `para_quien`: una frase («Núcleo de renta variable global a largo plazo»).
- `tesis` (100-180 palabras, 2 párrafos): qué ofrece y a qué coste efectivo, y cuál es su principal contrapartida. Con cifras y [n].
- `puntos_fuertes` y `puntos_debiles`: 3 a 5 cada uno, una frase por punto, con la idea en **negrita** y una cifra.

```json
"resumen": {
  "conclusion": "Atractivo|Neutral|Poco atractivo", "para_quien": "texto", "tesis": "texto",
  "puntos_fuertes": ["texto"], "puntos_debiles": ["texto"],
  "confianza": "Alta|Media|Baja"
}
```

### Fuentes · `fuentes`

```json
"fuentes": [{ "id": 1, "titulo": "KID", "editor": "Gestora", "fecha": "AAAA-MM-DD", "url": "https://…" }]
```

Una entrada por documento realmente consultado; el `id` es el que usas en `[n]`.

## 7. Comprobaciones antes de generar el informe

- [ ] El ISIN, la divisa de la clase, la política de rentas y la cobertura coinciden en KID, ficha y web de la gestora.
- [ ] Cada lista de `exposicion` suma 100 ± 1 y tiene como mucho 9 elementos.
- [ ] `composicion.peso_top10_pct` = suma de los pesos de `top10` (± 0,5).
- [ ] `replicacion.historico[].diferencia_pct` = etf − índice en cada año; `td_media_pct` es su media.
- [ ] Las rentabilidades anuales de `replicacion.historico` y `rentabilidad.anual` coinciden para el ETF y el índice (o explicas por qué no: divisa, versión del índice).
- [ ] `rentabilidad.anualizada_5a_pct` = fila «5 años (anual.)».
- [ ] La primera fila de `alternativas.etfs` es el ETF analizado y sus datos cuadran con las secciones 2 y 4.
- [ ] `resumen.conclusion` se justifica con coste, seguimiento, tamaño y alternativas.
- [ ] Toda cifra externa de los textos lleva `[n]` y cada `[n]` existe en `fuentes`.
- [ ] Ningún campo tiene un valor inventado para «que no quede vacío».
