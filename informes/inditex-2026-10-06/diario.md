# Diario del análisis de Inditex (fecha de corte 2026-10-06)

Procedimiento: `/analiza-empresa` siguiendo `verticales/empresa/prompt.md` (versión 4 del motor). Reloj del sistema: empecé a las 21:23 y generé el Word definitivo a las 22:11, unos **50 minutos**.

**Resultado**: **Vender, con convicción baja**. Valor objetivo 44,48 EUR frente a 53,82 EUR (−17,4 %); rentabilidad total esperada a 12 meses −15,1 %; asimetría 0,20x (alcista +9,4 %, bajista −48,1 %).
- Informe: 66 páginas y 28 gráficos; Word lo abre sin reparar.
- Fuentes: 152.
- Cobertura de campos: 89,9 %.
- Controles: **14 de 14 correctos**.

## 1. Tiempos por fase

| Hora | Fase | Qué hice |
|---|---|---|
| 21:23-21:27 | 0. Lectura | `analiza-empresa.md`, `prompt.md` entero, `CLAUDE.md`, los diarios de Viscofan, Indra y On, y los scripts de trabajo de On. |
| 21:27-21:28 | 1. Identificación y lanzamiento | Datos de la empresa: Inditex, ITX, ES0148396007, Mercado Continuo/IBEX 35, NIIF-UE, EUR, cierre a 31 de enero, cuenta por función. Escribí `notas/ENCARGO_COMUN.md` (reglas, calendario fiscal, trampas conocidas) y lancé los cuatro subagentes A-D en paralelo. |
| 21:28-21:45 | Motor y puente | Leí `calcular-empresa.mjs` entero y encontré el fallo del ejercicio no natural (fricción 1). Leí los anexos del 1S26 para el puente y escribí `propio.mjs` y `construir.mjs`, adaptados de On. |
| 21:45-21:56 | Notas | Llegaron las notas de C, A y D, y revisé los datos de cada una. |
| 21:56-22:00 | 5-6. Primer cálculo y supuestos | WACC: tasa libre, beta, prima de mercado y prima país ponderada por ventas (Damodaran). Escenarios y comparables. Probé variantes del WACC y de los escenarios en una copia del cálculo en el scratchpad. |
| 22:00-22:06 | 7. Redacción | `redaccion.mjs` y `resumen.mjs`. B terminó a las 22:01, después de un aviso mío. |
| 22:06-22:08 | 8. Revisión de comité | Las diez preguntas. Corregí cuatro efectos en valor de los riesgos que había estimado a ojo y no cuadraban con las sensibilidades del motor (−4 % → −5 %, −5 % → −7 %, −10 % → −14 %). Añadí la crítica a la puntuación de gobierno. |
| 22:06-22:11 | Encargo nuevo | Síntesis de una página (`resumen.sintesis`), pedida a mitad de trabajo, con la plantilla nueva. Word → PDF → PNG: portada, síntesis, «La decisión» y síntesis de valoración. La síntesis cabe en una página. Borré el PDF y los PNG. |

Ficheros en `notas/`:
- Notas de los subagentes: `A.json`, `B.json`, `C.json`, `D.json`.
- Comparables y bolsa: `comps.mjs` y `comps.json`, `D_*.mjs`.
- Lo mío: `textos.mjs` (supuestos), `redaccion.mjs` (textos), `resumen.mjs` (resumen y síntesis), `sintesis.txt`.
- Integración: `propio.mjs`, `construir.mjs`.
- Parche del Word: `parche-nd.mjs` (fricción 2).
- Documentos: `docs/`.

## 2. Fuentes clave y decisiones

**Fuentes primarias**
- Cuentas consolidadas de FY2019 a FY2025, con notas: arrendamientos, segmentos, vinculadas, impuestos y BPA.
- Notas de resultados, anexos trimestrales y guiones de conferencia de 9M24 a 1S26.
- Estados intermedios del 1S26.
- IAGC e IARC de 2025.
- Actas y votos de las juntas de 2024, 2025 y 2026.
- Registro de la CNMV: directivos, participaciones, posiciones cortas y otra información relevante.
- Cuentas de H&M, ABF, TJX, Next, Gap y Zalando.
- 8-K de las transacciones.

**Fuentes de mercado**
- MarketScreener: consenso y comparables.
- Stock Analysis: valor empresa, ROIC y beta.
- Yahoo: históricos de cotización.
- Trading Economics y CNBC: bonos a 10 años.
- BCE: tipos de cambio.
- Damodaran: prima de mercado y prima país.

**Decisiones**
1. **Etiquetas de ejercicio y cierre**: etiquetas de Inditex («FY2025» = feb-25 a ene-26) con `cierre_ejercicio_mes: 13`. Ver fricción 1.
2. **Serie de cuentas FY2019-FY2025**: son los siete ejercicios con NIIF 16. FY2018 y anteriores no son comparables en EBITDA.
3. **NIIF 16, igual en todo el informe**:
   - Los arrendamientos (6.197 M) van en el puente.
   - El capex del DCF suma las altas de derechos de uso: 10,8 % de las ventas en FY2026e, frente al 12,2 % de FY2025, que incluía el plan de logística.
   - El pago de arrendamiento (una sola línea en Inditex) se separa en principal e intereses. Es una estimación propia.
   - D homogeneizó los comparables americanos (US GAAP): suma el alquiler fijo del 10-K a su EBITDA, y su valor empresa ya incluye los arrendamientos.
4. **WACC del 8,51 %**:
   - Tasa libre: Bund (3,49 %), no el bono español (4,10 %). El 84 % de las ventas está fuera de España, y el diferencial de 61 pb refleja las elecciones del 29-nov.
   - Beta: 1,0.
   - Prima de mercado: la madura de Damodaran, 4,23 %.
   - Prima adicional: 1,0 %, la prima país de Damodaran ponderada por las ventas de cada área. Estimación propia.
   - Lo comprobé con una prima de mercado del 5 % y del 4,23 % sin prima país: la regla da Vender en los tres casos (DCF entre 42,7 y 50,8 EUR).
5. **Comparables (seis)**: H&M, Fast Retailing, TJX, Ross, Next y ABF. Excluí Zalando, Gap y Lululemon, con el motivo en el texto.
   - Con ellas, la mediana del EV/EBITDA NTM baja de 12,2x a 7,7x y los comparables valdrían 33-40 EUR en lugar de 51.
   - Es la decisión más discutible del informe, y la dejo dicha en `comparables.criterio`.
6. **Dividendo pendiente**: el segundo pago de FY2025 (≈ 2.726 M) estaba en «acreedores» a 31-jul y se paga el 2-nov. No lo resté en el puente, porque el precio del 6-oct lleva ese derecho.
7. **Múltiplos históricos**: solo FY2019 y FY2021-FY2025. FY2020 tenía un PER de 69x por la covid y movía la media.
8. **Recomendación según la regla**: Vender, con convicción baja.
   - La discrepancia con el mercado es de tasa de descuento (7,3 % implícito frente a 8,5 %), no de operativa: nuestra proyección queda a menos del 1,4 % del consenso.
   - Los métodos relativos dicen «en precio».
   - El momento operativo es bueno (+9 % a tipo constante en agosto).

## 3. Fricciones del sistema, con su arreglo (de más a menos importante)

1. **El motor toma el año de la etiqueta como año de cierre del ejercicio, pero Inditex lo usa como año de inicio.**
   - `finEjercicio(anioDe("FY2025"), 1)` da el 31-ene-2025, y el FY2025 de Inditex cierra el 31-ene-2026.
   - Con `cierre_ejercicio_mes: 1` y las etiquetas de Inditex (como pedía el encargo) pasan dos cosas:
     - el NTM se salta FY2026e y mezcla FY2027e con FY2028e, un año por delante;
     - en el DCF, FY2026e recibe fracción 0 y todo el descuento se desplaza un año.
   - Apaño, sin tocar el motor: `cierre_ejercicio_mes: 13`, porque `Date.UTC(año, 13, 0)` da el 31 de enero del año siguiente. La plantilla no imprime el campo.
   - Los proveedores tampoco coinciden: MarketScreener etiqueta por el año de cierre (su «2027» es el FY2026 de Inditex), igual que TJX («fiscal 2026» = feb-25 a ene-26).
   - *Arreglo*: un campo `meta.etiqueta_ejercicio: "inicio" | "fin"` en el motor, una línea en el §4.6 del prompt y un control: si el último ejercicio real «cierra» más de 13 meses antes del corte, avisar.
2. **«n.d.» pegado al precio y al valor objetivo cuando las dos divisas coinciden.**
   - `calc.recomendacion.precio_txt` y `valor_objetivo_txt` valen `''` si la cotización está en la divisa de las cuentas, y `rellenar.mjs` los imprime como «n.d.».
   - Aparece en cinco sitios: la portada («53,82 EURn.d.», «44,48 EURn.d.»), la cabecera de la síntesis y el resumen ejecutivo.
   - Afecta a todas las empresas que cotizan en la divisa de sus cuentas. On no lo sufrió porque cotiza en USD y presenta en CHF.
   - Lo arreglé en el Word generado con `notas/parche-nd.mjs`.
   - *Arreglo*: en el motor, `null` en vez de `''`, o en `rellenar.mjs` tratar `''` como vacío sin «n.d.».
3. **La regla de decisión no distingue «caro frente a mi tasa de descuento» de «va a caer en 12 meses».**
   - La rentabilidad «a 12 meses» compara el valor intrínseco con el precio, sin ningún mecanismo de convergencia.
   - En Inditex, toda la diferencia viene de 1,2 puntos de rentabilidad exigida (7,3 % implícita frente a 8,5 %). Eso da Vender aunque el negocio vaya bien y los métodos relativos digan «en precio».
   - *Arreglo*: imprimir en «La decisión» la rentabilidad implícita frente al WACC, y exigir un catalizador con fecha (o `justificacion_recomendacion`) para Vender cuando la proyección propia está a menos de un 5 % del consenso.
4. **La valoración por comparables depende de qué empresas entran y no usa la regresión.**
   - Con nueve comparables, la mediana del EV/EBITDA NTM es de 7,7x; con seis, de 12,2x. Son 15 EUR por acción de diferencia.
   - La regresión (R² 0,94, 59,53 EUR) se imprime pero no entra en la síntesis.
   - *Arreglo*: un control que avise cuando quitar o poner una empresa mueve la mediana más de un 20 %, y la opción de usar el múltiplo de la regresión en la síntesis cuando R² ≥ 0,5.
5. **La puntuación de gobierno es complaciente con el control familiar: 12 de 12.**
   - No mide que cuatro de los diez consejeros sean dominicales de la familia, que la presidenta sea hija del accionista de control ni que no haya prima de control posible.
   - Los votos de remuneración (2,8 % en contra) los decide el 59 % del fundador. C calculó un 9,8 % en contra sobre el capital flotante presente, y el motor no tiene campo para ese dato.
   - *Arreglo*: un criterio «presidente sin vínculo con el accionista de control» y el campo `voto_remuneracion_libre_contra_pct`, que puntúe en lugar del total cuando `accionista_control` es `true` (lo mismo que se pidió en On para la doble clase).
6. **Múltiplos históricos con la media y sin forma de excluir años anómalos.**
   - El PER de 69x de FY2020 llevaba la media a 31,6x, y el informe decía «−17 % frente a su historia», cuando en realidad es +3 %.
   - Tuve que quitar ese año de la serie a mano.
   - *Arreglo*: usar la mediana y admitir un campo `excluir: true` en `multiplos_historicos.serie` con su motivo.
7. **El ROIC incremental sale del 265 %, una cifra sin sentido.**
   - Con mucha caja neta, el capital invertido (patrimonio + deuda neta) apenas cambia, y el cociente explota.
   - *Arreglo*: calcularlo sobre el capital operativo (sin la caja excedente) o no imprimirlo si el capital crece menos de un 10 % del NOPAT.
8. **El script de PDF puede cerrar el Word del usuario.**
   - `construccion/a-pdf.ps1` hace `$word.Quit()` sin comprobar si la instancia de COM es la del usuario, que tenía abierto el informe de On.
   - Usé una copia en el scratchpad que solo llama a `Quit()` si la instancia no tenía documentos abiertos. Las tres veces se creó una instancia aparte, y el Word del usuario siguió abierto.
   - *Arreglo*: llevar ese cambio a `a-pdf.ps1`.
9. **Subagentes que no guardan por partes y fuentes que se fusionan.**
   - B pasó 27 minutos sin reescribir `B.json`, a pesar de la orden, y solo guardó tras un mensaje mío.
   - B10/B11 y D4/D5 apuntaban a páginas genéricas de prensa o de inversores. Mi `construir.mjs` (y también el nuevo `integrar.mjs`, que deduplica por URL) los habría fundido en una sola fuente.
   - *Arreglo*:
     - que cada subagente escriba un archivo por sección (`notas/B/sector.json`), para que «guardar» sea natural;
     - que `integrar.mjs` avise cuando dos fuentes con títulos distintos comparten URL, en vez de fundirlas.
10. **El sistema cambió a mitad del análisis**: `lecciones.md`, `integrar.mjs` y `herramientas/` a las 21:59, y la síntesis de una página a las 22:05.
    - Seguí con mis scripts, equivalentes, y añadí la síntesis.
    - *Arreglo*: fijar la versión al empezar (anotar el commit en el diario) y cambiar de versión solo entre análisis.

**Fricciones menores**
- **Informe largo**: 66 páginas, frente a las 35-50 del objetivo.
- **Tasa libre en euros**: el prompt no dice si la tasa libre es el Bund o el bono del país de la empresa (61 pb de diferencia, ±3-4 EUR por acción).
- **Caja comprometida con el dividendo**: el prompt no dice cómo tratar un dividendo aprobado y pendiente de pago dentro de «acreedores».
- **Rentabilidad por FCF de los comparables**: con NIIF 16 está inflada, porque el principal de los arrendamientos va en financiación, y la de los americanos no. Ningún control lo vigila.
- **Ventas comparables**: el campo `kpis` no tiene ninguna, porque Inditex no las publica aunque las define.

## 4. ¿Encajaron los cambios de la versión 4?

| Cambio de la v4 | Cómo funcionó con Inditex |
|---|---|
| **Deuda neta ajustada** | Sin uso aquí: no hay pensiones ni otros pasivos asimilables. La portada muestra la «deuda neta aj. / EBITDA» de −0,4x (caja neta con arrendamientos), correcta. |
| **Perímetro** (`cambios_perimetro`) | No aplica: Inditex no compra empresas. El control no dio falsos avisos. |
| **Gobierno** (`accionista_control`, `cambios_cupula_24m`, voto en contra) | Encajaron sin fricción (control `true`, 0 cambios en la cúpula), pero no cambian la nota cuando el control es familiar y estable (fricción 5). |
| **Años `fijo`** | Útil: FY2026e fijo, con dos trimestres publicados y la guía. El DCF inverso y los escenarios lo respetan, y la etiqueta del crecimiento medio («FY2027e-FY2035e») ya dice el periodo. |
| **Dos divisas** | Rompe el caso más común (cotización = cuentas): «n.d.» en la portada (fricción 2). |
| **Base del EBITDA del consenso** | Encajó: MarketScreener da el EBITDA NIIF 16 idéntico al publicado (11.267 M en FY2025), así que `base_ebitda: "NIIF"` y el control de saltos LTM/NTM no saltó. |
| **Regla del capex con altas de derechos de uso** | Encajó y es esencial en Inditex: sin ella, el capex sería un 5,8 % de las ventas en lugar del 10,8 %, y el DCF subiría de 42,80 a 54,48 EUR (comprobado quitando las altas y la amortización de derechos de uso), justo el precio de mercado: contaría las tiendas sin su alquiler. |
| **NTM con ejercicio no natural** | Solo funciona con el apaño del mes 13 (fricción 1). Es el cambio pendiente más importante. |
