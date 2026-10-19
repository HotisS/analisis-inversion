# Diario · KION GROUP AG (KGX.DE) · 19-oct-2026

- Commit de partida: 8e12032 («Escáner value amplio (16 regiones, 61 bolsas) y seis análisis value del 19-oct…»). Sin `git pull`, `commit`, `push` ni cambios de rama por encargo (checkout compartido). Escrito fuera de esta carpeta, con `flock` sobre el candado común: mi entrada `KGX` en `verticales/empresa/simbolos.json` (releído dentro del candado, solo mi entrada), y lo que escriben solas `apuntar-12m.mjs` (`objetivo12m-revisados.json`) y `precios.mjs KGX` (`precios.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Tiempos (UTC del contenedor): inicio 10:26 (`_commit.txt`); bolsa y movimiento 10:30-10:31; documentos 10:36; comparables 10:39; supuestos 10:44; notas A-E, propio, textos y resumen 10:50-11:00; Word y PDF 11:00; revisión a 12 meses, precios y robustez 11:01-11:03. Hubo una compactación del contexto en medio (después de escribir `supuestos.mjs`).
- Fases A-E hechas por mí, sin subagentes (`notas/construir-notas.mjs`); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de Eastroc).

## Pasos y fecha de sus datos

| Paso | Herramienta / fuente | Fecha de los datos |
|---|---|---|
| Cuentas XBRL | `cuentas.mjs --esef "KION GROUP"` y con el LEI 5299005KY91C4C6U9H17: **sin datos** (filings.xbrl.org no tiene emisores alemanes) | — |
| Cuentas 2021-2025 | Excel oficiales «All tables» de los informes anuales 2022-2025 (reports.kiongroup.com), comprobados contra los PDF de 2025 y 2024 | anual 2025: 26-feb-2026 |
| 1S26, 1T26, 3T25, 1S25, arrendamiento | informe semestral 2T26, declaración 1T26 y 3T25, semestral 1S25, Leasing Deep Dive (kiongroup.com) | 1S26: 30-jul-2026 |
| 3T26 provisional y previsión | anuncio ad hoc de KION (EQS) | 14-oct-2026 |
| Precio, beta, rentabilidades, cierres | `bolsa.mjs KGX.DE` frente a EXS1.DE (DAX) y EXH4.DE (industriales europeos); `precios.mjs KGX` | cierre 16-oct-2026 (sesión del 19-oct abierta: 33,85) |
| Movimiento y caídas diarias | `movimiento.mjs KGX.DE` | 19-oct-2026 (intradía 33,84) |
| Consenso y objetivos | MarketScreener (15 analistas) | 19-oct-2026 |
| Comparables (10) | ficha de Yahoo (script en el scratchpad, cambio a EUR) | 19-oct-2026 |
| Bund 10 años (3,45 %) | Bundesbank, serie BBSIS | 16-oct-2026 |
| Prima implícita (4,20 %) | Damodaran ERPbymonth | oct-2026 |
| Sector | MMH Top 20 carretillas (ago-2025); Interact Analysis vía MMH (13-ene-2026) | 2024-2026 |
| Gobierno y remuneración | informe anual 2025, informe de remuneraciones 2025, junta de 2025, BlackRock (6-ago-2026) | feb-ago 2026 |
| Sentimiento | foros alemanes ilegibles o bloqueados: sección omitida | — |
| Próximos resultados | calendario financiero de KION | **29-oct-2026** (3T26) |

## Decisiones

- **EBITDA sin la flota (opción B)**: EBITDA = EBIT publicado + amortización y deterioros sin la depreciación de la flota de alquiler y arrendamiento (588,5 M en 2025; la flota, 611,2 M, se queda como coste). En `arrendamientos` del balance y del puente: arrendamientos de compra NIIF 16 + pasivos del alquiler a corto + pasivos del negocio de arrendamiento netos de los derechos de cobro (2.821,3 M a jun-26). `consenso.base_ebitda` «ajustado» con 5,4 % de las ventas. Los comparables se miran por PER (EV/EBITDA NTM sin datos, así que el motor solo usa el PER).
- No recurrentes en el EBITDA = EBITDA ajustado de KION − EBITDA publicado (166,9 M en 2025; −29,7 M en el LTM). LTM = 2025 + 1S26 − 1S25. FCF del LTM ≈ 318 M (FCF nuevo de KION menos arrendamientos de compra e intereses).
- Puente a 30-jun-2026: deuda 1.635,1; arrendamientos 2.821,3; caja 391,0; minoritarios 30,3; pensiones 337,2 (481,7 × 0,7); asociadas 143,1.
- WACC 8,84 % (Bund 3,45 %, beta 1,6, prima 5,5 % + 0,5 por el control chino y China, Kd 4,25 %, deuda 40 %); g 2,0 %. Pesos DCF 60 / comparables 15 / escenarios 25.
- Ventas 2026e +2,7 % fijo (1S real +3,5 %, 3T provisional +4,8 %, previsión de 11.450-11.750 M); 2027e +2,5 %; 2028e-2029e +4 %; luego hasta 2 %. Margen EBITDA 11,6 % → 13,1 %; amortización 5,2 → 4,5 %; capex 5,2 → 4,6 %; circulante 13,5 %; impuesto 33 % y luego 30 %.
- **BPA propio**: resultado financiero recurrente −140 / −135 / −130 M; minoritarios 12 M; 131,1 M de acciones. Base 2,99 / 3,58 / 4,17 (2026e-2028e); bajista 2028e 2,87 (2027e con −6 puntos de crecimiento y −2 de margen); alcista 4,86.
- **Historia del PER**: adelantado, 2021 excluido (128,6x); mediana 16,13x, mínimo 11,49x; actual 9,52x; selector 1,69 < 1,8 → decide la v3. v2 guardada en `per_historico.v2` (mediana 16,6x).
- Convicción **Baja** (los criterios dan Media): ROIC por debajo del WACC, bajista del −27,5 % y dos rebajas de previsión.
- Dos controles explicados: tipo impositivo de 2024 (37,4 %: deterioro no deducible de ITS Americas y pérdidas sin activo fiscal) y crecimiento del BPA (desde 1,75 de 2025 con 201 M de no recurrentes; ≈ 14 % anual desde una base limpia de ≈ 2,80).
- Votos de la junta de 2026 no encontrados: `voto_remuneracion_pct` = 73,89 (informe de 2024 en la junta de 2025).

## Resultado

- DCF 44,99 EUR (WACC 8,84 %, VT 57 %); valor intrínseco **44,28 EUR, +29,9 %**; con la prima del mercado 59,20. DCF inverso: ventas −0,3 % al año o margen EBITDA del 12,0 % perpetuo; rentabilidad implícita 9,9 %.
- **12 m (v3)**: objetivo **45,06 EUR**; ponderada **+34,0 %**, base **+30,3 %** (a 33,85 en sesión: 34,9 / 31,2); v2 de control 21,2 / 18,0; con BPA −10 %: 20,7 / 17,4 (21,6 / 18,2 en sesión). Regla: **Comprar**, convicción baja. Comprar < 39,65 EUR; vender > 50,74 EUR.
- Calidad: ROIC 2025 **4,48 %** (NOPAT 454,3 / capital medio 10.136,6; motor 4,5 %) − WACC **8,84 %** = **−4,36 puntos** (motor −4,3); sostenibilidad **Sí**.
- **Robustez (`--actual`)**: SÓLIDA; acción vigente Comprar; **acción robusta Mantener** por **Q1** (calidad); sin B1; L1 pasa; límite de compra 39,65 EUR; límite robusto 35,75 EUR; sin C1-C3. **No es COMPRA ROBUSTA (regla 6)**: falla el filtro de calidad (ROIC − WACC < 5).
- Regla 13: **no cambia**. Riesgo de IA: mixto, exposición media, ±10 % a 3-5 años (más automatización para Dematic frente a rivales de robots y carretillas autónomas).
- Word y PDF (43 páginas, soffice con perfil propio): 19 de 21 controles correctos y 2 explicados; cobertura 85,6 % (sentimiento por debajo del 60 %: omitido). Avisos del Word: suma de partes sin filas (no aplica) y mapa de comparables sin EV/EBITDA NTM.

## Huecos

- Cuentas XBRL del regulador (Alemania fuera de filings.xbrl.org), sentimiento en foros, votos de la junta de 2026, tenencias de los directivos, posición corta, recomendaciones por tipo, EV/EBITDA de Dematic y de Smart Innovation, serie de 5 años del tamaño del sector, `vs_consenso` de los trimestres anteriores al 3T26.

## Lecciones propuestas (para el coordinador; no escritas en archivos comunes)

1. **Emisores alemanes sin ESEF en filings.xbrl.org** (ya visto con GEA): los Excel «All tables» de los informes de la empresa (KION: reports.kiongroup.com/<año>/ar/) traen cuenta, balance, flujos, segmentos, arrendamientos y deuda de dos ejercicios en tablas limpias; un volcado con openpyxl basta y es mejor que el PDF.
2. **Fabricantes con negocio de alquiler y arrendamiento (KION, Jungheinrich, Toyota Industries)**: su EBITDA publicado suma la depreciación de la flota (5,4 % de las ventas en KION) y su deuda financiera no incluye los pasivos de la flota. Para que EV/EBITDA, deuda neta/EBITDA y DCF sean coherentes: EBITDA sin la depreciación de la flota (coste recurrente) y pasivos de la flota netos de los derechos de cobro a clientes en `arrendamientos`; base del consenso «ajustado» con ese porcentaje; comparar por PER.
3. **KION cambió en 2026 la definición de FCF** (incluye la deuda captada para el negocio de arrendamiento): el FCF publicado de 2026 no es comparable con el de 2025; restar arrendamientos de compra e intereses para un FCF del accionista.
4. El tope ×1,1 con un PER actual por debajo del mínimo de 5 años da una rentabilidad alta (34 %) en una empresa que no cubre el coste de capital: el filtro de calidad (Q1) es lo que la frena, como debe.
