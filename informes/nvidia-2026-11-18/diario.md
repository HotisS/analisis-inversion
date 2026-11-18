# Diario · Nvidia (NVDA) · 18-nov-2026 (análisis value, iteración 3, tras los resultados del 3T FY27)

- Commit de partida: d534523 (Escáner 18-nov: revisiones y señales). Prompt `verticales/empresa/prompt.md` y método vigente (v3 ×1,1 con selector; niveles A y B desde el 16-nov).
- Tarea programada (petición de Hotis del 13-nov). Sin los cinco subagentes de investigación: notas A-E actualizadas por mí a partir de las del 13-nov, cada dato nuevo comprobado con el 8-K; tres subagentes solo para leer prensa (resultados, SEC, Tesoro). PDF con `soffice`.
- Fecha de corte 2026-11-18; precio = cierre del 17-nov (155,46 USD), anterior a los resultados. Punto de partida: `informes/nvidia-2026-11-13/`.

## Pasos (hora de Madrid; sacadas de la hora de los archivos)

- 18-11 09:31 · Inicio; lectura de CLAUDE.md, MEMORIA, el comando, el diario y la revisión del 13-nov, regla 16 de METODO-VIGENTE.
- 18-11 09:32 · `cuentas.mjs --sec NVDA` (XBRL FY2017-FY2026). EDGAR: 8-K del 17-nov con nota de resultados, comentario del director financiero e información complementaria del 3T FY27. **El 10-Q del 3T no está presentado** («en las próximas semanas»).
- 18-11 09:33-09:34 · `precios.mjs` (377 precios, cierres 16-18 nov), `movimiento.mjs NVDA` (155,46 el 17-nov, −28,4 % en un mes, en mínimos de 52 semanas) y `bolsa.mjs` (hasta el 17-nov).
- 18-11 09:33-09:36 · Prensa: resultados y conferencia (TheStreet, TradingKey, Gate, BigGo), investigación de la SEC según el WSJ (TechCrunch, AI Weekly), Tesoro y regla BIS (Stocktwits, Coinotag, Journalarta, FourWeekMBA). Yahoo: consenso, objetivos y cambios de analistas; 162,94 USD tras el cierre (+4,8 %). Tesoro a 10 años 5,10 % (17-nov).
- 18-11 09:35-09:36 · Notas A, C, D y E actualizadas.
- 18-11 09:37-09:39 · propio.mjs y textos.mjs; integrar y calcular (19 de 23 controles correctos y 4 explicados); `apuntar-12m.mjs --precios` y `robustez.mjs --actual`; Word y PDF (47 páginas, portada revisada como imagen).
- 18-11 09:40 · `simbolos.json` → carpeta nueva; `cobertura.mjs --arreglar`, `seguimiento.mjs`, `comprobar.mjs`: 0 errores.
- 18-11 09:41 · Revisión 12 m y diario; commit y push.

## Decisiones

- Guía de ingresos del 4T (130.000 M) ≥ 120.000 M: se mantiene el base de ventas (FY2028e +45 % desde un FY2027e más alto, 614.322 M, casi igual que el 13-nov). Guía de margen del 71-72 % < 72 %: se rebaja 1,5 pp el margen EBITDA de FY2028e-FY2031e, como estaba fijado. BPA base FY2029e 14,55 → 14,20.
- Puente a 25-oct-2026: deuda 32.371 M; caja y valores de deuda 53.512 M; cotizadas 44.219 M y no cotizadas 65.528 M como «asociadas»; garantías (118.000 M) y Hugging Face fuera del puente.
- Sostenibilidad «En parte» (sin cambio): el 3T refuerza la financiación de clientes (clientes 81.033 M, garantías 118.000 M, acuerdos con neoclouds 32.000 M).
- Precio y noticias: **descarta**. El WSJ publica el 17-nov una investigación civil de la SEC sobre si la información de Nvidia engañó a los inversores (sin confirmar por la empresa ni la SEC). El encargo del 13-nov fijaba que una investigación formal a la propia Nvidia descarta la compra; como su objeto es la fiabilidad de la información, se aplica hasta que el 10-Q o la SEC aclaren el alcance. Para quien la tiene no obliga a vender (no es un hecho probado).
- Recomendación Mantener (convicción baja), no comprar, aunque la regla da Comprar (21,6 %).
- Comparado con el 13-nov: precio 166,19 → 155,46 (−6,5 %); objetivo ponderado 198,87 → 188,53; VI 173,88 → 174,64; ponderada 19,8 → 21,6 %; base 17,5 → 17,3 %; v2 8,4 → 9,7 %; filtro de mantener 181,09 → 171,81; contexto «retrasa» → «descarta»; niveles C/B2 → ninguno (regla del 16-nov y «descarta»).

## Revisión a 12 meses

Nvidia · 18-nov-26 · 155,46 USD (cierre 17-nov) · objetivo ponderado 188,53 USD (+21,6 %) · base 181,76 (+17,3 %) · v2 9,7 % · VI 174,64 (+12,3 %) · consenso 265,23 · regla **Comprar**, informe **Mantener** (baja) · robustez **FRÁGIL**, compra robusta no · nivel **ninguno** (sostenibilidad «En parte» y «descarta») · filtro de mantener 171,81 USD. Detalle en `revision-12m-2026-11-18.md`.

## Qué vigilar

- 10-Q del 3T (próximas semanas): ¿confirma la investigación de la SEC y su alcance? Concentración de clientes.
- Respuesta del consejo al Tesoro (≈25-nov) y comparecencia de Huang en la Cámara (1-dic, según la prensa).
- Resultados del 4T (≈24-feb-2027): margen bruto de Rubin frente al 71-72 %; guía del 1T FY28.

## Lecciones

- Sin lección nueva general. El consenso de Yahoo tarda más de un día en recoger unos resultados: decirlo cuando se analiza al día siguiente.
