# Diario · Saint-Gobain (SGO.PA) · 20-oct-2026

- Commit de partida: 2d5cf2f («Growth: protocolo del backtest de rentabilidad frente a caída máxima…»), leído con `git log -1 --oneline` (solo lectura) a las 08:31 UTC del 20-oct-2026. Ninguna otra operación git (encargo: lo hace el hilo principal).
- Encargo: /tmp/claude-0/fr/enc-saint-gobain-2026-10-20.md (análisis value completo; contexto de riesgo país de Francia desde el 1-ago-2026).
- Entorno: nube de Claude Code, sin herramienta Agent: fases 2-4 bis hechas por mí en orden A-E, con notas A..E.json.
- Fecha de corte: 2026-10-20. Divisa EUR, NIIF-UE, ejercicio natural (etiqueta «fin»). Primera iteración (no hay informes anteriores de Saint-Gobain en `informes/`).

## Tiempos y pasos (hora UTC; fecha de los datos de cada paso)

- 08:28 inicio; lectura de CLAUDE.md, analiza-empresa.md, prompt.md (entero), lecciones.md, lecciones-paises (UE y Francia), grep de lecciones-casos (reguladas, participadas, arrendamientos, compradores en serie), METODO-VIGENTE §1-5 y el informe de EssilorLuxottica del 19-oct como modelo de estructura de notas.
- 08:33 `cuentas.mjs --esef "Saint-Gobain"`: entidad correcta (COMPAGNIE DE SAINT-GOBAIN, LEI NFONVGN05Z0FMN5PEC35), 6 ejercicios 2020-2025 (filings.xbrl.org ya tiene 2025). Falta EBIT 2023-2025, EBITDA, amortizaciones, recompras y desinversiones completas: del URD.
- 08:34-08:37 Precio: Yahoo (bolsa.mjs con EXSA.DE e índice sectorial EXV8.DE; EXOH.DE da 404) no tenía el cierre del 19-oct (último 16-oct, 66,54). **Decisión**: precio = cierre oficial del 19-oct en el CSV de Euronext (66,42 EUR), leído ≈10:36 CEST del 20-oct con la sesión en curso. movimiento.mjs (Yahoo) usó el intradía del 20-oct (66,14) para el bloque de movimiento.
- 08:33-08:39 Documentos: URD 2025, 2023 y 2021 (ESEF, filings.xbrl.org); comunicado completo del 1S26 (30-jul-2026) en L'Avenir Bourse porque saint-gobain.com da 403. Datos al 30-jun-2026.
- 08:37-08:49 Francia y tipos: Bund 10 a 3,49 % (Bundesbank, 19-oct); OAT 4,85 % y diferencial 142,3 pb (Idéal Investisseur, 19-oct); medias mensuales del BCE (sep: OAT 4,44 %, Bund 3,47 %); PLF 2027 (KPMG, Legifiscal: recargo del impuesto de sociedades prorrogado al 31,4 %); Moody's el 23-oct (Selectra, 14-oct). Damodaran: primas país (jul-2026) y prima implícita 4,20 % (oct-2026). Cambios del BCE del 19-oct.
- 08:40-08:49 Consenso y comparables de MarketScreener (20-oct; Stock Analysis bloqueado por Cloudflare, API de Yahoo con 429). Noticias: RSS de Google News con curl (noticias.mjs exige la clave en simbolos.json, que no se puede editar), ABC Bourse, BFM; AMF/BDIF: declaraciones de directivos y posiciones cortas (AQR 0,60 %). Foros: Boursorama y RSS de Seeking Alpha.
- 08:53-09:00 Notas A, B, C (verificadas contra el URD: auditores KPMG desde 2004 y Deloitte desde 2022; renovación e infraestructuras 50 % de las ventas; 1.170 centros industriales; fijo del PDG 1,3 M y ratio 130). Quité afirmaciones que no pude verificar (política de reparto en %, un consejero).
- 09:00-09:04 Notas D y E. **Decisión** regla 13: no cambia (sin colocaciones, ampliaciones ni ventas de directivos; el expediente de la UE no tiene fecha; Moody's y el presupuesto francés son macro y en buena parte en el precio; resultados del 27-oct no aplazan, regla 11).
- 09:04-09:06 supuestos.mjs y propio.mjs. **Decisiones**: BPA publicado NIIF (base del consenso), tasa libre Bund 3,49 % con prima adicional del 0,6 % (primas país de Damodaran ponderadas por ventas), beta 1,30 (entre la ajustada 1,42 y la sectorial ≈1,2), coste de la deuda 3,9 %, peso 26 % → WACC 9,07 %; pesos DCF 60 / escenarios 40; crecimiento sin compras (puente con «otros» = 0 desde 2027). Primer cálculo: 17 de 23 controles; corregido: segmentos con la línea de eliminaciones (−1.669 / −1.581), serie del sector con su formato.
- 09:06 Sensibilidad con la OAT (copia de las notas en /tmp/claude-0/fr/saint-gobain-2026-10-20/oat, tasa libre 4,85 %): WACC 10,08 %, DCF 93,40 → 77,65 EUR (−16,9 %), valor intrínseco 91,28 → 75,89 EUR (−16,9 %). Escrita en dcf.lectura.
- 09:08-09:10 textos.mjs y resumen.mjs; integrar + calcular: 18 de 20 controles correctos y 2 explicados (regresión R² 0,16 y estabilidad de comparables; los comparables no pesan). Word generado (cobertura 89,3 %, 28 gráficos; avisos: suma de partes y calificaciones ESG vacías). PDF con soffice (45 páginas).
- 09:10 `node herramientas/robustez.mjs saint-gobain-2026-10-20` (precio del informe 66,42; aviso D3: sin cierre en precios.json, que no puedo actualizar por el encargo): **veredicto FRÁGIL**; acción vigente Mantener en cartera; **acción robusta: No mantener**; límite de compra (objetivo fijo) 65,85 EUR (v2 62,90); filtro de mantener hasta 68,84; **límite de compra robusto 59,49 EUR**; colchón de BPA 4 % para mantener. **Margen BPA −10 %: 3,0 % − 15 = −12,0 puntos** (base con BPA −10 %: 7,3 %). `apuntar-12m.mjs --simular`: v3 14 % / base 18,8 % → Mantener (v2 8,9 %). No se ejecutó sin --simular.

## Resultado

- Mantener, convicción media. Objetivo 12 m 73,40 EUR: v3 ponderada +14,0 %, base +18,8 %; v2 8,9 % / 12,6 %; BPA −10 %: 3,0 % / 7,3 %. Valor intrínseco 91,28 EUR (+37,4 %). ROIC − WACC +1,6 puntos (10,7 % − 9,07 %). Sostenibilidad: Sí. Regla 13: no cambia.
- Francia: 23,1 % de las ventas, ≈12-15 % del resultado (estimación propia). Caída desde el 31-jul (−18,1 %): ≈9 puntos sector y tipos, ≈6 prima Francia, ≈3 propios.

## Lecciones

- LECCIÓN: con la web de la empresa bloqueada (403), los comunicados completos de resultados de emisores franceses están íntegros en bourse.lavenir.net (copia del servicio de difusión regulada), con tablas legibles.
- LECCIÓN: `noticias.mjs` no sirve para una empresa sin clave en simbolos.json; en encargos que prohíben editarlo, el RSS de Google News con curl y los titulares laterales de ABC Bourse cubren los 12 meses.
- LECCIÓN: el índice sectorial de construcción europeo en Yahoo es EXV8.DE (EXOH.DE da 404).
- LECCIÓN: Yahoo tarda en publicar el cierre de Euronext París del día anterior a primera hora; el CSV de live.euronext.com (getFullDownloadAjax) sí lo tiene.
