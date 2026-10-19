# Diario · Applied Nutrition Plc (APN.L) · 19-oct-2026

- Commit de partida: a1f9540 («Cola de índices: fuera Al Majed y Jamjoom (minoristas)»). Checkout compartido con otro análisis en paralelo: sin `git pull`, `commit`, `push`, `checkout` ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada APN, edición atómica tras releer el archivo) y en lo que escriben `precios.mjs APN` (`precios.json`) y `apuntar-12m.mjs applied-nutrition-2026-10-19` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Tiempos (UTC, reloj del entorno): inicio ≈ 11:44; notas A-E, cálculo, Word, PDF, revisión a 12 meses y robustez terminados ≈ 12:16. La investigación ocupó la primera parte de la sesión (antes de una compactación del contexto).
- Encargo: análisis value completo desde cero (procedimiento `/analiza-empresa`), con precio del último cierre y noticias de los últimos 12 meses.
- Sin subagentes: las fases A-E las hice yo (`notas/construir-notas.mjs` escribe A-E.json); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de CLASSYS).

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Precio, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs --accion APN.L --indice ^FTMC --sector GL9.IR --corte 2026-10-19 --cierre-mes 7` | cierre 16-oct-2026 (el del 19-oct no estaba publicado) |
| Precio común | `precios.mjs APN` | cierre 16-oct-2026 (291,5 GBp; en sesión el 19-oct, 291) |
| Movimiento (regla 13) | `movimiento.mjs APN.L` | 19-oct-2026 (en sesión) |
| Cuentas FY2024-FY2025 | `cuentas.mjs --esef` (filings.xbrl.org) e informe anual 2025 | 2025-11-07 |
| Cuentas FY2023 | Folleto de salida a bolsa (información financiera histórica) | 2024-10-14 |
| Cuentas FY2021-FY2022 | Companies House, cuentas de la filial (FRS 102, escaneadas, transcritas) | 2021-2022 |
| Semestres 1S FY2024-1S FY2026 | Resultados semestrales (RNS) | hasta 2026-03-23 |
| FY2026 y guía FY2027 | FY26 Trading Update and FY27 Outlook (RNS, sin auditar) | 2026-08-26 |
| Nutrablend | RNS del 1-jun-2026 | 2026-06-01 |
| Consenso y objetivos | MarketScreener (7 analistas); consenso calculado por la empresa; Deutsche Bank | 2026-10-19 / 2026-08 |
| Gilt a 10 años | FRED IRLTLT01GBM156N (descarga con curl; `descargar.mjs` falló) | septiembre de 2026 (5,2421 %) |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 (4,20 %) |
| Comparables | Yahoo quoteSummary (10 fichas; SIS.L ya no cotiza), GBPUSD y EURGBP | 2026-10-19 |
| Transacciones | SiS (bd-capital), Alani Nu (Celsius), OWYN (Simply Good Foods) | 2025 |
| Directivos y accionistas | RNS de PDMR, colocaciones y participaciones; informe anual 2025; resultado de la junta | hasta 2026-10-13 |
| Posiciones cortas | FCA, short positions daily update | 2026-10 |
| Sentimiento | Fool/Twelfth Magpie, Simply Wall St, The Grocer (titular); LSE Chat, ADVFN, Reddit y Stockopedia dan 403 | 2026-02 a 2026-09 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice (perfil `/tmp/lo-applied`) | 19-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs applied-nutrition-2026-10-19` | 19-oct-2026 |
| Robustez | `robustez.mjs informes/applied-nutrition-2026-10-19 --actual` | 19-oct-2026 |

## Decisiones

- **FY2026 (cerrado el 31-jul-2026) no tiene cuentas** hasta el 16-nov-2026: la cuenta lleva FY2021-FY2025 reales y FY2026e es el primer año de la proyección, fijo con el avance de la empresa (160 M de ventas, +49,4 %; margen EBITDA del 27,1 %). Como el motor da fracción 0 a los años cerrados antes del corte, el puente va a 31-jul-2026 (caja neta de 15,9 M sin NIIF 16, arrendamientos ≈ 3,1 M, sin deuda).
- Divisa: `meta.divisa` y `divisa_cotizacion` GBP, tipo de cambio 1, precio en libras (2,915), como Auto Trader.
- Proyección: FY2027e con la guía (205 M, +28,1 %, margen 23,9 %, con ≈ 11 puntos de Nutrablend); FY2028e +10 % (consenso) y luego 9 / 8 / 7 / 6 / 5 / 4 %; margen 24 % bajando al 22 %. Circulante 32-33 % y luego 31 %; capex 3,5 % en FY2027e y 2-2,5 % después; impuesto 26 %.
- WACC 12,02 % (gilt 5,24 %, beta 1,05 ajustada mensual a 24 meses, prima 5,5 % + 1,0 por tamaño, dos años en bolsa y dependencia del fundador; sin deuda); g 2,5 %. Primero probé 1,5 puntos de prima adicional y beta 1,0 (12,24 %); lo bajé a 1,0 para alinearlo con los informes británicos del repo (Watches of Switzerland, 1,0). No cambia la conclusión (DCF 1,50 → 1,54).
- Escenarios 25/50/25: bajista −5 pp de crecimiento y −3 pp de margen; alcista +3 / +1,5. Pesos DCF 50 / comparables 20 / escenarios 30.
- BPA FY2028e: 0,1197 / 0,1504 / 0,1686 GBP (consenso 0,1532). 250 M de acciones (BPA básico = diluido).
- Historia del PER adelantado de solo dos años (10,5x y 23,5x; mediana como media de los dos, 17,0x); actual 21,2x. El selector (≤ 3 años) toma la más baja de v3 (−11,6 %) y v2 (−0,7 %): v3 → **Vender**. Sin exclusiones, aunque el 10,5x de julio de 2025 está hecho con un BPA que nadie esperaba (objeción en el resumen; la variante sin doble castigo da −6,2 %, Mantener).
- Mediana del PER de los comparables: 10,2x (estadounidenses estancadas y venta directa; Celsius 17x, Monster 36x).
- Regla 13: veredicto **descarta**. El CFO vendió casi la mitad de sus acciones sin motivo declarado (3-4-jun) y el CEO y el COO colocaron 7 M de acciones el 11-sep (motivo declarado: diversificar): tres consejeros ejecutivos en tres meses. Condición: rehacer con las cuentas de FY2026 (16-nov) y comprobar que no siguen las ventas (bloqueo de los fundadores hasta ≈ 10-mar-2027). Los resultados cercanos no cuentan.
- Controles: 22 de 23 correctos y 1 explicado (caja proyectada frente a la histórica: las ventas se duplican). La tabla de múltiplos históricos no se imprime (el motor pide tres años; hay dos).
- Incidente: un `sed` mal escrito borró `notas/construir-notas.mjs`; lo recuperé entero del registro de la sesión y volví a aplicar los dos arreglos (cita «[6 de A]» de B y comentario de comparables).

## Resultado

Vender, convicción media. Objetivo a 12 meses 2,58 GBP (−11,6 % ponderado; base −0,5 %); valor intrínseco 1,51 GBP (−48 %); ROIC − WACC 51 puntos; sostenibilidad Sí. Robustez SÓLIDA, acción robusta «No mantener»; límite robusto de compra 1,51 GBP; BPA −10 %: −20,3 % / −10,3 %.

Revisión a 12 meses (`apuntar-12m.mjs`): «APN: v3 ponderada -11.6 %, base -0.5 % → Vender (v2: -0.7 % Mantener)».

Pendiente para el hilo principal (prohibido en este encargo por el checkout compartido): `cobertura.mjs --arreglar`, `seguimiento.mjs`, `cola.md`, lecciones y commit/push.
