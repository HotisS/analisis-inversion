# Diario · BSE Limited (BSE.NS) · 18-nov-2026

- Commit de partida: **254cbac** («Nvidia 18-nov: análisis value tras los resultados del 3T FY27»). Checkout compartido con otros 9 agentes de la tanda del 18-nov: sin `git pull`, `commit`, `push`, `stash`, `checkout` ni `reset`. Solo se escribió en esta carpeta y en lo que escriben `apuntar-12m.mjs bse-2026-11-18 --precios` y `robustez.mjs` (con `flock /tmp/tanda-1118.lock`). No se ejecutaron `precios.mjs` (corrido por el coordinador a las 12:18), `seguimiento.mjs`, `cobertura.mjs` ni `comprobar.mjs --escribir`; no se tocaron `cola.md`, `MEMORIA.md`, `lecciones*.md` ni `simbolos.json`. Temporales en `/tmp/claude-0/tanda-bse/`.
- Encargo: iteración tras el 2T FY27 (publicado el 4-nov-2026, sin recoger) y revisar un dato sospechoso del informe del 20-oct (ROIC − WACC de 254 puntos): capital invertido (caja de clientes y fondos de garantía), acciones tras ampliaciones gratuitas y precio. India está en la lista de exclusiones de la cola de cobertura, pero BSE ya se sigue: informe hecho igualmente.
- Método: fases A-E hechas por mí (sin subagentes), sobre el generador de notas del informe anterior (`notas/construir-notas.mjs`), dato a dato con los documentos nuevos. Lecciones leídas: núcleo de `lecciones.md`; `lecciones-paises.md` no tiene sección India; `lecciones-casos.md` (bolsas con cámara: ingresos y deuda del XBRL; fondo de comercio y ROIC).

## Pasos (hora de Madrid) y fecha de los datos

| Hora | Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|---|
| 12:21 | Lectura del encargo, procedimiento, prompt (§0-5 y campos clave), lecciones, METODO-VIGENTE §2 y §4 | — | — |
| 12:22 | Carpeta nueva y noticias | `noticias.mjs --meses 12 --valores bse` (sin noticias relevantes de la empresa: el buscador mezcla la bolsa con empresas cotizadas en ella) | hasta 18-nov-2026 |
| 12:23 | Resultados del 2T FY27 | Anuncio a la NSE del 4-nov-2026 (resultados consolidados y separados, balance y flujos semestrales, revisión limitada de S.R. Batliboi); transcripción de la conferencia (NSE, 11-nov); nota de PL Capital (5-nov) | 30-sep-2026 (cuentas); 4-nov (conferencia) |
| 12:23 | Cuentas anuales para la caja propia | Informes anuales FY2025-26 y FY2024-25 (notas 9, 11, 12, 16 y 19), `descargar.mjs` | 31-mar-2024, 2025 y 2026 |
| 12:24 | Precio, beta, cierres de ejercicio | `bolsa.mjs --accion BSE.NS --indice ^NSEI --corte 2026-11-18 --cierre-mes 3 --etiqueta fin`; coincide con `precios.json` (3.755,70, 18-nov) | cierre 18-nov-2026 |
| 12:24 | Movimiento (regla 13) | `movimiento.mjs BSE.NS` | 18-nov-2026 |
| 12:25 | Consenso y comparables | Yahoo quoteSummary (`notas/bajar-yahoo.mjs`: BSE y 11 comparables, tipos de cambio) | 18-nov-2026 |
| 12:26 | Bono y prima | FRED INDIRLTLT01STM (oct-2026: 7,38 %); Damodaran ERPbymonth (nov-2026: 4,41 %) | oct/nov-2026 |
| 12:27 | Foro | ValuePickr (JSON del hilo 13699) | hasta 12-nov-2026 |
| 12:28-12:33 | Notas A-E, supuestos, propio, textos | `construir-notas.mjs`, `supuestos.mjs`, `propio.mjs`, `textos.mjs`, `resumen.mjs` | — |
| 12:33-12:35 | Integración, cálculo, Word y PDF | `motor/integrar.mjs`, `motor/calcular-empresa.mjs`, `motor/rellenar.mjs`, LibreOffice | 18-nov-2026 |
| 12:35 | Objetivo a 12 m y robustez | `flock … apuntar-12m.mjs bse-2026-11-18 --precios`; `flock … robustez.mjs informes/bse-2026-11-18 --actual` | precio 18-nov-2026 |
| 12:36 | Comprobación | `comprobar.mjs` (sin ERROR de esta carpeta; el ERROR C1 es de Experian; C10 de `simbolos.json` lo arregla el coordinador) | 18-nov-2026 |

## El dato sospechoso: ROIC − WACC de 254 puntos

Se revisaron las tres cosas que pedía el coordinador:

1. **Capital invertido — había un error.** El motor calcula el capital invertido como patrimonio + minoritarios − caja. El informe del 20-oct ponía como caja propia «activos financieros − otros pasivos financieros − Core SGF» = 60.772 M. Las notas del informe anual de FY2026 separan cada partida en «Owned» y «Earmarked»: las propias suman 61.428 M, pero contra ellas hay pasivos que son de terceros y no estaban restados: los depósitos de los miembros (1.699 M, nota 16) y, sobre todo, las **«statutory remittances» (7.478 M, nota 19)**: impuestos y tasas cobrados para el Estado y SEBI que BSE retiene hasta pagarlos. La caja propia libre de marzo de 2026 es **52.251 M**; la de marzo de 2025, 32.485 M (no 36.673); la de marzo de 2024, 26.935 M (no 30.689). Con ello el capital invertido medio de FY2026 pasa de 8.134 a 14.488 M y el **ROIC de 269 % a 151 %**; ROIC − WACC de 254 a **135,9 puntos**. FY2022-FY2023 siguen con el método anterior (no se releyeron esos informes; su ROIC es orientativo). La caja de clientes (márgenes de miembros, «earmarked») y el Core SGF ya estaban bien fuera.
   - El ROIC sigue siendo muy alto, y es real: una bolsa casi no necesita capital operativo (inmovilizado ≈ 6.000 M, circulante financiado por cobros anticipados y tasas a pagar). Contraste: el ROE de FY2026 es 44,8 % con el 78 % del patrimonio en caja. No cambia la calidad (pasa de sobra el umbral de 5 puntos), pero sí el puente: la caja del valor baja 8.521 M (≈ 21 INR por acción en el DCF).
2. **Acciones — correctas.** 411,98 M es el denominador del BPA publicado (80.915 lakhs ÷ 19,64 INR en el 2T FY27 = 411,99 M), con las acciones en suspenso; capital desembolsado 8.158 lakhs ÷ 2 INR = 407,9 M emitidas; Yahoo usa 406,13 M en circulación. Los precios y BPA de la historia están ajustados por las dos ampliaciones 2:1 (2022 y mayo de 2025): cierres de Yahoo ya ajustados y BPA en la misma base (el BPA publicado de FY2026, 60,32 INR, ya va sobre las acciones posteriores a la ampliación de 2025).
3. **Precio — correcto.** 3.336 INR era el cierre del 19-oct (el 20-oct era festivo); hoy 3.755,70 (Yahoo, `bolsa.mjs` y `precios.json`), coherente con el «CMP 3.602» de PL del 5-nov y el máximo de 52 semanas de 4.446.

Además, al rehacer la historia del PER: el informe del 20-oct metía el cierre de FY2026 dividido por **nuestro** BPA de FY2027e (36,9x). La lección del 9-nov dice que un año sin BPA real del siguiente no entra; ahora la ventana es FY2021-FY2025 (mediana 26,2x, mínimo 10,3x). Esto endurece el bajista (10,3x frente a 14,4x).

## Decisiones

- Cuentas: India sin XBRL; cifras de los informes anuales y del anuncio del 2T FY27 en lakhs ÷ 10. Trimestre 2T FY27: ingresos 14.327 M, EBITDA con Core SGF 9.731 M (67,9 %), BPA 19,64 INR. LTM a septiembre: ingresos 58.064 M, EBITDA 37.920 M, BPA 74,82.
- Supuestos: FY2027e +26 % (primer semestre 29.987 M + 3T ≈ 15.800 + 4T ≈ 15.100), FY2028e +11 %, después 12 / 11 / 10 / 9 / 8 / 7 %. Margen 67 % → 68 % (dirección: 65-70 % sostenible). Capex 6 % → 3,5 %. Resultado financiero 6.000 / 7.200 / 8.800 M (≈ 6,5 % sobre la caja propia libre creciente + CDSL). WACC 15,31 % (bono 7,38 %, beta 1,26, prima 5,5 % + 1,0). g 6 % nominal en INR (explicado). Pesos y escenarios como el 20-oct.
- Puente a 31-mar-2026: caja propia libre 52.251 M; CDSL al precio de hoy (1.416,6) neto de un 14,3 % de impuesto 38.059 M + resto de asociadas 872 M; dividendo pagado en julio 4.120 M; minoritarios 1.225 M.
- `base_bpa` = «publicado» en la historia y en los casos (FY2024 sin la plusvalía de CDSL), declarado (aviso C5 resuelto).
- Comparables rehechos con Yahoo del 18-nov (no llevados al precio): mediana PER NTM 23,8x (23,0 el 20-oct).
- Convicción Baja aunque el motor sugiere Alta: la sugerida mira el valor intrínseco; la regla que decide está a 2,7 puntos del umbral y apoyada en el bajista de 2021 (explicado en `controles_explicados`).
- `apuntar-12m` marca ¡REVISAR! (v3 −12,7 % y v2 +9,2 %): revisado a mano en la revisión a 12 meses; se mantiene.

## Resultado

- **Recomendación Vender** (regla), convicción baja. v3 **−12,7 % / base +4,0 %**; v2 de control **+9,2 % / +14,6 %** (Mantener). Objetivo 3.268 INR; **valor intrínseco 1.379 INR** (−63,3 %; DCF 1.186). Sostenibilidad **Sí**. **ROIC − WACC 135,9 puntos** (corregido).
- Robustez **SÓLIDA**; si la tienes: **Vender**; compra robusta: no; nivel hoy: ninguno (informativo: ninguno); límites A 1.379,39 y B 1.379,38 INR; **filtro de mantener hasta 1.622,81 INR**; colchón de BPA: —. Avisos M3, M4 (×2), V1, M6.
- Regla 13: **no cambia**.
- Controles: 20 de 22 correctos y 2 explicados (g 6 % en INR; salto del flujo libre). Cobertura de campos 85,8 %.

## Qué cambió frente al informe del 20-oct

- Precio 3.336 → 3.755,7 INR (+12,6 %). Objetivo 2.959 → 3.268 INR; ponderada −11,0 % → −12,7 %; base +3,4 % → +4,0 %; v2 +7,4 % → +9,2 %. Valor intrínseco 1.282 → 1.379 INR (más BPA y CDSL más cara, menos caja). BPA FY2029e base 90,31 → 104,43 INR. ROIC − WACC 254 → 135,9 puntos (corrección de dato). Señal igual: Vender.
- **Señal de alarma del informe anterior**: «un 2T FY27 con ingresos por debajo de 13.000 M o una norma contra los semanales» → **no se cumplió** (14.327 M; ninguna norma nueva). La de mejora («prima por encima de 30.000 crore diarios con la subasta en vigor») **se cumplió en octubre** (35.481), un solo mes; por eso se sube el BPA, pero no cambia la señal.

## Lecciones

- **Bolsas indias (y cualquier infraestructura que cobra impuestos por cuenta del Estado)**: la caja propia no es «activos financieros − pasivos financieros de clientes − fondo de garantía»; hay que restar también los pasivos «owned» que son de terceros: depósitos de miembros y «statutory remittances» (STT, sellos, tasas de SEBI). En BSE sobrevaloraba la caja un 16 % y el ROIC casi al doble (269 % frente a 151 %). Usar las notas «Owned / Earmarked» del informe anual.
- La historia adelantada no admite el último cierre dividido por nuestro BPA estimado del año en curso (ya estaba en la lección del 9-nov; el informe del 20-oct la incumplía porque era anterior).
