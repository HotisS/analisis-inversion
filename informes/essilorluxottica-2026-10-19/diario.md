# Diario · EssilorLuxottica (EL.PA) · 19-oct-2026

- Commit de partida: 250a336 (19-oct-2026 17:42 UTC). Corrección: lo saqué con un `git log -1` (solo lectura) al empezar, antes de reparar en la prohibición de operaciones git; después no hice ninguna otra (ni pull, ni add, ni commit).
- Iteración nueva sobre `informes/essilorluxottica-2026-10-14/` (aquella se hizo sin red, solo con búsquedas: confianza baja-media). Aquí cada dato se vuelve a comprobar con fuente primaria a 19-oct.
- Entorno: nube de Claude Code, con red (curl, Node con `NODE_USE_ENV_PROXY=1`, WebFetch, WebSearch). Sin herramienta Agent: fases 2-4 bis hechas por mí en orden A-E, con las notas A..E.json igualmente.
- Fecha de corte: 2026-10-19. Divisa EUR, NIIF-UE, ejercicio natural (etiqueta «fin»).

## Tiempos y pasos (hora UTC; fecha de los datos de cada paso)

- 17:53 inicio; lectura de CLAUDE.md, analiza-empresa.md, prompt.md, lecciones.md, lecciones-paises (UE y Francia), METODO-VIGENTE.md.
- 17:54 `cuentas.mjs --esef "EssilorLuxottica"`: entidad correcta (LEI 549300M3VH1A3ER1TB49, la sociedad del grupo). filings.xbrl.org solo llega a 2024 (2020-2024); 2025 del comunicado anual de resultados (11-feb-2026, 41 páginas con los estados resumidos) y de la nota de capital. Datos: cuentas 2020-2025 y 1S26 (30-jun-2026).
- 17:55-18:05 documentos primarios: comunicado 1S26 (AMF, 28-jul-2026, 36 páginas), comunicado anual 2025 (web de la empresa), comunicados de MFN (recompra 28-ago, consejo 9-sep, capital a 30-sep, convocatoria del 3T: **ingresos del 3T el 20-oct-2026 a las 18:00 CEST**).
- 18:05 BDIF de la AMF: operaciones de directivos de 12 meses (60 avisos; Delfin compra ≈ 560.000 acciones entre mayo y agosto de 2026 a 164-175 EUR; Bpifrance 253.200 a 192,33 el 24-abr; Delfin pignora 5 M de acciones el 4-mar).
- 18:00 `bolsa.mjs` (EL.PA, EXSA.DE, EXV4.DE): cierre 152,05 EUR del 19-oct-2026 (sesión de París cerrada a las 17:30 CEST; dato leído a las 19:57 CEST). `movimiento.mjs EL.PA` (19-oct): 12 m −51,2 %, P5.
- 18:06-18:12 documentos y datos: DEU 2025 en ESEF (paquete D.26-0067 de la BDIF; filings.xbrl.org no tenía 2025), comunicados de 2023, 2024, 2025 y 1S26, avisos de directivos de la AMF (12 meses), Bund del Bundesbank (3,49 % el 19-oct), tipos del BCE del 19-oct, consenso de MarketScreener (19-oct), noticias (Reuters 16-oct sobre Delfin, Kepler 17-sep, Goldman 14-jul, Stifel 29-sep, BofA 9-oct, salida de L. M. Del Vecchio 25-ago, investigación de Milán nov-2025).
- Comparables: filas de los informes del repo de Hoya, Alcon, Demant, Sonova, Straumann (14-oct), Coloplast (12-oct), Cooper y Fielmann (9-oct), llevadas al precio de Yahoo del 16/19-oct con el mismo valor empresa y pasadas a EUR con el BCE del 19-oct (script en el scratchpad).
- 18:12-18:20 notas A-E (sin Agent: hechas por mí en orden), supuestos.mjs, propio.mjs, textos.mjs, resumen.mjs.
- Decisión: el objetivo a 12 meses y la historia del PER van en BPA ajustado. La iteración del 14-oct usaba BPA publicado en la historia (37,9x en 2021) y ajustado en el actual: eso activaba por error el selector de desrateadas. Historia adelantada 2021-2025: 28,5 / 25,3 / 26,2 / 34,7 / 36,8 (el último con nuestro BPA 2026e).
- Decisión: consenso de BPA ajustado estimado = BPA NIIF de MarketScreener + 647 M de amortización de compras neta de 2025 ÷ 461 M (para que D7 de robustez compare en la misma base).
- Decisión: beta 0,97 (ajustada mensual 5 años; 0,95 bruta, 1,07 semanal 2 años); WACC 7,84 %. Con beta 1,0 el DCF daba 128,94; con 0,97, 133,19.
- Decisión: pesos DCF 60 / escenarios 40 (encargo); minoritarios a 12 veces su resultado (1.800 M).
- 18:20-18:24 integrar.mjs + calcular-empresa.mjs (3 pasadas). Controles: 18 de 19 y 1 explicado (regresión R² 0,25).
- 18:24 rellenar.mjs → «EssilorLuxottica - 2026-10-19.docx» (cobertura 88,3 %); 18:26 PDF con LibreOffice (45 páginas).
- 18:26 movimiento.mjs EL.PA (datos del 19-oct, cierre 152,05): sin cambios frente a las 18:00.
- 18:27 apuntar-12m.mjs essilorluxottica-2026-10-19: Mantener, v3 19,8 % / base 20,1 %, v2 9,2 % (precio 152,05 del 19-oct). Sin choque con otras sesiones.
- 18:27 robustez.mjs --actual (precio de precios.json: 150,45 EUR, sesión del 19-oct tomada antes del cierre; el cierre oficial es 152,05 y precios.json es compartido, no lo actualizo): SÓLIDA, acción robusta Mantener en cartera; v3 21,0/21,4, v2 10,4, BPA −10 % 9,2/9,5; límite de compra 129,85 EUR; sin CORREGIR.

## Resultado

Mantener (convicción baja). Objetivo a 12 meses 178,13 EUR (+19,8 %, base +20,2 %); valor intrínseco 129,85 EUR (DCF 133,19); ROIC 5,4 % frente a WACC 7,84 %. No es compra robusta: falla el valor intrínseco frente al precio, la v2, el BPA −10 % y el filtro de calidad. Regla 13: no cambia.
