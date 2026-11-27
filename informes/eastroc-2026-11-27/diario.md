# Diario · Eastroc Beverage (Group), línea H (9980.HK) · 27-nov-2026 · iteración tras el 3T26

- Commit de partida: **3d983a2** («Escáner 27-nov 9:00: revisiones y señales»), en `notas/_commit.txt`. Encargo de la tanda del 27-nov (`/tmp/claude-0/tanda-1127/encargo.md`): rehacer el informe value completo; motivo: a ≈ 3,9 % de su nivel B y 3T26 flojo (BPA ×0,95 según el escáner).
- Checkout compartido: sin `git pull/commit/push/stash/checkout/reset/add`. Escrito fuera de esta carpeta solo por `flock … apuntar-12m.mjs eastroc-2026-11-27 --precios` (`objetivo12m-revisados.json`) y `flock … robustez.mjs eastroc-2026-11-27 --actual`. No se ejecutaron `precios.mjs`, `seguimiento.mjs`, `cobertura.mjs`, `comprobar.mjs --escribir` ni `npm run plantillas`; no se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md`, `simbolos.json` ni `seguimiento.xlsx`. Temporales en `/tmp/claude-0/tanda-1127/eastroc/`.
- Misma línea y ticker que el informe anterior: **H, 9980.HK** (la A, 605499.SS en Shanghái, da la historia de la cotización y del PER, pasada a base H con el cociente H/A de hoy).
- Fases A-E hechas por mí, sin subagentes, partiendo de los scripts de `eastroc-2026-10-19/notas` (copiados y rehechos: `construir-notas.mjs`, `supuestos.mjs`, `propio.mjs`, `textos.mjs`, `resumen.mjs`). Las cuentas anuales 2020-2025 no cambian (CAS auditadas, ya comprobadas); todo lo demás se rehízo a hoy.

## Horas (Madrid) y pasos, con la fecha de los datos

| Hora | Paso | Fuente / herramienta | Fecha de los datos |
|---|---|---|---|
| 10:21 | Lectura del encargo, procedimiento, prompt, lecciones (China y Hong Kong), método vigente | repo | commit 3d983a2 |
| 10:22 | Anuncios de CNINFO desde el 15-oct y descarga | CNINFO `hisAnnouncement/query` + `descargar.mjs` | 3T26 publicado el 30-oct (aprobado el 29-oct); anuncios hasta el 24-nov |
| 10:23 | Cuenta, balance y flujos de 9M26 y 9M25; ventas por producto, canal y región; 1S26 para aislar el 3T | `2026年第三季度报告`, `前三季度主要经营数据`, semestral 2026 | 30-sep-2026 |
| 10:24 | Precio, rentabilidades, beta, cierres de ejercicio; movimiento (regla 13) | `bolsa.mjs` (9980.HK frente a 2800.HK y 3067.HK; 605499.SS frente a 510300.SS y 515170.SS), `movimiento.mjs` | cierre 27-nov-2026 (H 96,15 HKD; A 108,67 CNY) |
| 10:25 | Comparables (10) y consenso de Yahoo | `yahoo.mjs` (ficha + earningsTrend, script en temporales) | 27-nov-2026 |
| 10:26 | Bono chino 10 años 1,5912 % | ChinaBond, POST a `czbChartSearch` | 26-nov-2026 |
| 10:26 | Prima implícita 4,41 % | Damodaran `ERPbymonth.xlsx` | nov-2026 |
| 10:27 | Notas de brókeres tras el 3T26 (seis) | `reportapi.eastmoney.com` + páginas de `data.eastmoney.com/report/info` | 30-oct a 6-nov-2026 |
| 10:28 | Noticias (Mbappé, Temasek, BlackRock, Haitong, HSBC, licor, compras del presidente) y foros | Guba de Eastmoney (A y H, con curl) | 27-oct a 27-nov-2026 |
| 10:29-10:33 | Notas A-E (`construir-notas.mjs`) | — | — |
| 10:31 | Supuestos y propio; primer cálculo | `integrar.mjs`, `calcular-empresa.mjs` | — |
| 10:33 | Primer `apuntar-12m --precios` y `robustez --actual` (con flock) | `precios.json` (96,55 HKD, toma del escáner del 27-nov) | 27-nov-2026 |
| 10:34-10:37 | Textos, resumen, segundo cálculo, Word y PDF (47 páginas) | `rellenar.mjs`, soffice | — |
| 10:38 | Revisión a 12 meses, `apuntar-12m --precios` y `robustez --actual` finales; `comprobar.mjs` | — | 27-nov-2026 |
| 10:39 | Hueco de la conferencia del 3T26, reintegración, Word y PDF finales | — | — |

## Decisiones

- **Precio**: 96,15 HKD (cierre del 27-nov) × 0,85 = **81,73 CNY**; A 108,67 CNY; **H/A 0,7521** (descuento 24,8 %, antes 27,3 %).
- **LTM a sep-26** = 2025 + 9M26 − 9M25: ventas 22.627,5; EBIT 5.856,3; beneficio 4.799,2; BPA 6,719 (9M26 5,7505 + 4T25 0,968). Amortización LTM de 615 M **estimada** (los trimestrales no la dan). Dividendo de 12 meses 4,923 CNY (final de 2025 + a cuenta de 2026), como en el informe anterior.
- **Puente a 30-sep-2026**: caja 23.071,92 (efectivo 14.151,58 + tesorería 6.565,90 + depósitos a menos de un año 1.801,78 + fondos 552,66), deuda 6.272,62, arrendamientos 401,16, minoritarios 41,68, `otros_ajustes` 174,55 (dividendo por pagar).
- **3T26 aislado** (9M26 − 1S26): ventas 6.153 (+0,75 %); energéticas 3.843 (−8,6 %), electrolitos 1.361 (+0,5 %), té 580 (+145 %), otras 365 (+17 %); sur −2,6 %, centro −8,1 %, este +8,2 %, oeste −2,8 %, norte +6,2 %; distribuidores −4,9 %, grandes clientes +17,7 %, en línea +82 %. EBIT 1.718 (+6,5 %); margen bruto 45,7 % (+0,5 puntos); gasto comercial −11,4 %; gasto financiero 49 M (−9,5 M en el 3T25), de él ≈ 126 M de pérdidas de cambio (estimación: 49 − 22,9 de intereses pagados + 100,1 de intereses cobrados); valor razonable −25 M (+120 M); beneficio 1.278 (−7,8 %); sin extraordinarios 1.253 (−1,3 %); BPA 1,7556 (−12,7 %, con la H).
- **Supuestos**: ventas 2026e +9 % (fijo: 9M26 + 4T como el 4T25), 2027e +8 %, 2028e +7 %, bajando al 3 %; margen EBITDA 28,5 / 27,5 / 27,2 → 27 %; capex 8,3 % → 3,8 %; impuesto 21,5 %; resultado financiero 250 / 330 / 320 M. WACC 8,19 % (bono 1,5912 %, beta 0,85, prima 5,5 % + 2,5 %), g 1,0 %. Pesos DCF 60 / comparables 15 / escenarios 25. Mercado final y escenarios (−4/−2,5 y +3/+1) como antes.
- **BPA propio** 2026e 6,60 / 2027e 6,85 / 2028e 7,16 (antes 7,07 / 7,40 / 7,87). Escenarios 2028e: 6,00 / 7,16 / 7,84. **Base de BPA: publicado** en escenarios y en la historia (`base_bpa` declarado; el aviso H1 de robustez desaparece).
- **Historia del PER** adelantada en base H: 38,0 / 26,2 / 16,5 / 22,0 / 23,4 → mediana 23,42x; actual 11,92x; **selector: desrateada (2,0), decide la v2**. Comparables: mediana 17,4x (sin KDP).
- **Consenso** (solo contraste): mediana de seis notas posteriores al 3T26 (6,58 / 7,08 / 8,15) y Yahoo (6,51 / 6,85); objetivos de 12 analistas de la H, 114,88 HKD de media. MarketScreener no se usa (cifras previas al 3T26).
- Señal del informe anterior cumplida («energéticas por debajo del +5 % en el 3T26 → Mantener»). No se pasa el base al bajista anterior porque el EBIT del 3T creció un 6,5 % y los anticipos suben un 42,9 %; se rebaja crecimiento y margen (BPA 2028e −9 %).
- Convicción **Baja** frente a la «Media» sugerida (control explicado): la ponderada está a 1,1 puntos del umbral y depende del selector.
- Riesgo de IA: Neutral, exposición baja (sin cambios).

## Resultado

- DCF **127,98 CNY** (WACC 8,19 %, VT 57 %); valor intrínseco **126,74 CNY (149,11 HKD), +55,1 %**; con la prima del mercado 139,26. DCF inverso: ventas −3,4 % al año o margen EBITDA del 17,0 %; rentabilidad implícita 13,5 %.
- **12 m (v2 por el selector)**: objetivo **88,13 CNY (103,68 HKD)**; ponderada **+13,9 %**, base **+10,3 %** → **Mantener** (convicción baja). v3 sin selector 25,1 % / 20,8 %. Regla: comprar por debajo de 94,67 HKD; banda Vender por encima de 121,64 HKD.
- **apuntar-12m --precios** (96,55 HKD de `precios.json`): 13,4 % / 9,8 % → Mantener (antes Comprar 15,8 %).
- **Robustez (--actual)**: FRÁGIL; `senal_cartera` **Mantener**; `accion_robusta` **No comprar**; **nivel hoy: ninguno**; límites **A 85,73 HKD, B 90,11 HKD**; **`limite_mantener_cot` 99,50 HKD**; colchón de BPA 4 % para mantener (— para comprar); M1 VARIANTE, P4 y M6 AVISO; sin CORREGIR ni CONFIANZA.
- Calidad: ROIC 41,9 % − WACC 8,19 % = **33,7 puntos**; sostenibilidad **Sí**.
- Regla 13: **no cambia**. Próximos resultados: 2026, hacia el 31-mar-2027; conferencia del 3T26 el 9-dic-2026.
- Word y PDF (47 páginas): 20 de 21 controles correctos y 1 explicado (perímetro de 2022); cobertura 87,5 % (capital y directivos por debajo del 60 %). `comprobar.mjs`: ningún ERROR de esta carpeta (el único ERROR, C12 VIS-RTS, es de la cartera).

## Huecos

- Conferencia del 3T26 (convocada para el 9-dic, después del corte): sustituida por seis notas de brókeres y prensa. EBITDA trimestral, calificaciones ESG, desglose de la remuneración, historial de guía, múltiplos de EBITDA de las transacciones, posición corta, ISIN.

## Lecciones (para el coordinador; no escritas en archivos comunes)

- Acciones A en CNINFO: el `orgId` de `hisAnnouncement/query` no es fijo (Eastroc: `9900041766`); sacarlo antes con `new/information/topSearch/query` (keyWord = código). Las actas de reuniones con inversores (`tabName=relation`) de un valor de Shanghái pueden no estar: la conferencia trimestral de SSE Roadshow puede llegar semanas después de los resultados (Eastroc: 3T el 29-oct, conferencia el 9-dic).
- Con una H recién salida, el efectivo de la salida en HKD genera pérdidas de cambio que van al gasto financiero (Eastroc: ≈ 355 M en 9M26): el resultado financiero del año en curso no es recurrente y el BPA de los años siguientes no debe arrastrarlo.
