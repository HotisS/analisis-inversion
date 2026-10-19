# Diario · Takasago Thermal Engineering (1969.T) · 19-oct-2026

- Commit de partida: 8e12032 («Escáner value amplio (16 regiones, 61 bolsas) y seis análisis value del 19-oct…»). Sin `git pull`, `commit`, `push`, `checkout`, `stash` ni cambios de rama, por encargo (checkout compartido). Escrito fuera de esta carpeta, siempre con `flock` sobre `repo.lock`: mi entrada `1969` en `verticales/empresa/simbolos.json` (releído dentro del candado, solo mi entrada) y lo que escriben solas `apuntar-12m.mjs` (`objetivo12m-revisados.json`) y `precios.mjs 1969` (`precios.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`/`--todos`.
- Tiempos (UTC del contenedor): inicio 10:26 (`_commit.txt`, `bolsa.mjs`); documentos de TDnet/eir-parts y EDINET, comparables y movimiento hasta la compactación del contexto; notas A-E, supuestos, propio, textos, resumen, Word, PDF, revisión a 12 meses, precios y robustez después. Hubo una compactación del contexto antes de escribir `construir-notas.mjs`.
- Fases A-E hechas por mí, sin subagentes (`notas/construir-notas.mjs`); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de Eastroc).

## Pasos y fecha de sus datos

| Paso | Herramienta / fuente | Fecha de los datos |
|---|---|---|
| Precio, rentabilidades, beta, cierres de ejercicio | `bolsa.mjs --accion 1969.T --indice 1306.T --sector 1619.T --cierre-mes 3 --etiqueta inicio`; `precios.mjs 1969` | cierre 19-oct-2026 (4.187 JPY) |
| Movimiento y caídas diarias (regla 13) | `movimiento.mjs 1969.T`; meses con el gráfico de Yahoo | 19-oct-2026 |
| Cuentas FY2021-FY2025 | kessan tanshin y «financial results» (inglés) del canal TDnet de eir-parts (`descargar.mjs`, `notas/docs/`) | FY2025: 12-may-2026 (flujos corregidos el 12-jun-2026) |
| Trimestres FY2024-1T FY2026, balance del puente | tanshin trimestrales | 1T FY2026: 5-ago-2026 (balance a 30-jun-2026) |
| Pedidos, cartera, mezcla, guía, Q&A | presentaciones y Q&A de FY2025 y 1T FY2026 | 12/19-may y 5-ago-2026 |
| Yuho FY2025 (segmentos, países, remuneración, cartera cruzada, plantilla) | EDINET vía `disclosure2dl` (PDF), texto con pdfminer | 25-jun-2026 |
| Votos de las juntas 2026 y 2024 | informes extraordinarios de EDINET (`disclosure2dl`, S100YM7V y S100TO7S) | 26-jun-2026; 20-jun-2024 |
| Consenso y objetivos | MarketScreener (6 analistas) | 19-oct-2026 |
| Comparables (9) | ficha de Yahoo (`herramientas/yahoo.mjs`) + PER con la previsión de la empresa de Yahoo! Japan | 19-oct-2026 |
| Bono japonés a 10 años (2,958 %) | Ministerio de Hacienda, `jgbcme.csv` | 16-oct-2026 (el del 19-oct aún sin publicar) |
| Prima implícita (4,20 %) | Damodaran ERPbymonth | oct-2026 |
| Mercado (obras de climatización y fontanería) | MLIT (estadística de obras, ejercicio fiscal 2022) y CREX (2024) | 29-mar-2024; 2025 |
| Sentimiento | foro de Yahoo! Japan (`/forum`), titulares de kabutan y Nikkei, Simply Wall St | sep-oct 2026 |
| Próximos resultados | patrón del año anterior (14-nov-2025) | 2T FY2026 hacia el **13-nov-2026** (fecha exacta sin publicar) |

## Decisiones

- Etiqueta del ejercicio «inicio» (FY2025 = abr-2025 a mar-2026, como la empresa); `cierre_ejercicio_mes` 3. BPA, DPA y acciones en base posterior al split 1:2 del 1-oct-2025.
- J-GAAP: EBITDA = explotación + amortización + amortización del fondo de comercio; resultado financiero = BAI − explotación (no operativo y extraordinarios, con las plusvalías de la cartera cruzada); sin arrendamientos en balance. Activos de contrato dentro de clientes; anticipos en `pasivos_contrato`.
- **Puente a 30-jun-2026**: deuda 40.593 (préstamos a corto 25.593 + bonos 15.000), caja 42.125, minoritarios 5.274; **cartera cruzada** (83 valores, 45.407 M a mar-26, a valor de mercado las cotizadas) menos el impuesto latente de la plusvalía (≈ 9.650 M) = **−35.750 en `otros_ajustes`** (suma); resto de inversiones financieras 18.794 en `asociadas`; superávit de pensiones neto de impuestos −6.750. En total suman 56.020 M (428 JPY por acción). **Caja neta de deuda ≈ 1.500 M** (casi cero: el circulante se comió la caja de FY2022).
- WACC 8,17 % (bono 2,958 %, beta 1,05, prima 5,5 %, sin prima adicional, Kd 1 %, deuda 7 %); g 1,5 %. Circulante en el 32,5 % de las ventas (FY2025, el máximo). Pesos DCF 60 / comparables 20 / escenarios 20.
- **BPA propio**: no operativo de 2.400-2.600 M y plusvalías de la cartera cruzada decrecientes (2.000 / 1.500 / 1.200 M), impuesto del 29 %, 130,89 M de acciones sin recompras no anunciadas. FY2028e base 342,85.
- **Comparables japoneses**: EV/EBITDA y margen EBITDA vacíos porque el EBITDA de Yahoo para Japón incluye no operativos (Takasago 57.007 M frente a 51.503 M propios); PER con la previsión de la propia empresa (Yahoo! Japan). Mediana de los nueve 15,98x.
- `voto_cupula_pct` 88,7 (reelección de Kojima en 2026; 92,9 % en 2024; la de 2025 no se encontró). Remuneración de Kojima FY2025 159 M (56 fijo, 68 bonus, 34 acciones) del yuho.
- Control «caja proyectada» explicado (circulante); recomendación Mantener, convicción Baja (las reglas absoluta y relativa discrepan).

## Resultado

- DCF 4.377,10 JPY (WACC 8,17 %, VT 68 %); valor intrínseco **4.565,88 JPY, +9,0 %**; con la prima del mercado 5.302,72. DCF inverso: crecimiento del 0,8 % anual o margen EBITDA del 11,2 %; rentabilidad implícita 8,5 %.
- ROIC FY2025 **17,9 %** frente a WACC **8,17 %** = **+9,73 puntos**; ROIC incremental FY2021-FY2025 31 %. Sostenibilidad **Sí** (4,3 % proyectado; financiable 3,4 %; cuota 4,1 % → 4,4 %).
- **12 m (v3, selector sin marcas)**: objetivo **4.006,60 JPY**; ponderada **−1,6 %**, base **−0,6 %** (−0,7 % en `apuntar-12m.mjs`); v2 de control 7,7 % / 9,2 %; con BPA −10 %: −11,2 % / −10,3 %. Regla: **Mantener**, convicción baja. Comprar < 3.582,30 JPY; vender > 4.579,56 JPY.
- **Robustez (`--actual`)**: SÓLIDA; acción vigente y robusta **No mantener** (filtro de mantener 3.745,14 JPY); límite robusto 3.235,31 JPY; M4 (doble castigo, no cambia la acción) y M6; sin C1-C3 ni P. **No es compra robusta (regla 6)**: fallan la ponderada ≥ 15 %, la del base ≥ 12 % (v3 y v2), B1 y L1.
- Regla 13: **no cambia** (caídas de marzo, julio y octubre sin hecho propio; mayo y agosto, resultados ya en la tesis; sin colocaciones anunciadas). Próximos resultados hacia el 13-nov-2026.
- Riesgo de IA: exposición media, sentido positivo (refrigeración de centros de datos y salas limpias para chips de IA); sin sustitución; riesgo de que los centros de datos se retrasen.
- Word y PDF (46 páginas, soffice con perfil propio): 20 de 21 controles correctos y 1 explicado; cobertura 86,3 %. Avisos: gráficos de EV de comparables y transacciones sin datos (EV/EBITDA japonés vacío a propósito; sin transacciones).

## Huecos

- Consenso trimestral, flujo libre de los últimos 12 meses (Japón no publica flujos en el 1T), años de KPMG como auditor, calificaciones ESG, CR5 del sector, operaciones de directivos (no hay registro en Japón), voto de la junta de 2025, fecha de entrada de tres consejeros de la comisión de auditoría, posición corta, transacciones comparables, recomendaciones por tipo y EBITDA del consenso.

## Lecciones propuestas (para el coordinador; no escritas en archivos comunes)

1. **Japón, documentos**: cuando la web de RI y EDINET (API con clave) no abren, el canal de TDnet de eir-parts da todo en JSON: `https://ssl4.eir-parts.net/V4Public/eir/<código>/en/announcement/announcement_3.js` (inglés; `ja/…_2.js` en japonés), y los PDF en `https://ssl4.eir-parts.net/doc/<código>/...`. Los PDF de EDINET sí se bajan sin clave de `https://disclosure2dl.edinet-fsa.go.jp/searchdocument/pdf/<docID>.pdf` (los docID salen de una búsqueda web).
2. **Japón, PDF «escaneados»**: el yuho y los informes extraordinarios de EDINET salen vacíos con `pdftotext` porque falta el paquete de fuentes Adobe-Japan1, no porque sean imágenes; `python3 -I -c "from pdfminer.high_level import extract_text…"` los lee enteros (yuho de 182.000 caracteres). De ahí salen la remuneración individual (≥ 100 M), las votaciones por consejero (`voto_cupula_pct`) y la cartera cruzada.
3. **Japón, comparables**: el EBITDA y el EBIT de Yahoo para empresas japonesas incluyen partidas no operativas (Takasago: 57.007 frente a 51.503 M); dejar vacío el EV/EBITDA de los japoneses y usar el PER con la previsión de la propia empresa de Yahoo! Japan (会社予想PER).
4. **Japón, cartera cruzada**: valorarla en el puente a mercado menos el impuesto latente (de la «diferencia de valoración neta de impuestos» del balance) como `otros_ajustes` negativo, y el superávit de pensiones neto de impuestos en `pensiones` negativo; las plusvalías anuales de su venta son recurrentes por plan pero decrecientes en el BPA propio.
