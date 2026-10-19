# Diario · Eastroc Beverage (Group), línea H (9980.HK) · 19-oct-2026

- Commit de partida: 99bd934 («Escáner fuera de hora 19-oct 10:34»). Sin `git pull`, `commit`, `push` ni cambios de rama por encargo (checkout compartido). Escrito fuera de esta carpeta: mi entrada `9980.HK` en `verticales/empresa/simbolos.json` (releído justo antes; diff solo con mi entrada), y lo que escriben solas `apuntar-12m.mjs` (`objetivo12m-revisados.json`) y `precios.mjs 9980.HK` (`precios.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Tiempos (marcas de los archivos, UTC del contenedor): inicio 09:17 (`_commit.txt`, `bolsa.mjs`); documentos 09:23; comparables 09:24; movimiento 09:26; bolsa de la A 09:29; notas A-E 09:35; supuestos y propio 09:37-09:38; textos, resumen, Word y PDF 09:45; revisión a 12 meses, símbolo, precios y robustez 09:46-09:47. Hubo una compactación del contexto en medio (después de escribir `construir-notas.mjs`).
- Encargo: análisis value completo de la línea H (9980.HK, comprable desde IBKR sin Stock Connect), precio, límite y rentabilidad en HKD; comprobar acciones A+H y descuento H/A; más geografías («amplialo… muchas geografias»): seis regiones de ventas y comparables de EE. UU., China, Hong Kong y Tailandia.
- Fases A-E hechas por mí, sin subagentes (`notas/construir-notas.mjs`); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de Transsion).

## Pasos y fecha de sus datos

| Paso | Herramienta / fuente | Fecha de los datos |
|---|---|---|
| Precio H | `bolsa.mjs 9980.HK` (frente a 2800.HK y 3067.HK); `precios.mjs 9980.HK` | cierre 16-oct-2026 (HK cerrada el 19-oct, Chung Yeung) |
| Precio A, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs 605499.SS` frente a 510300.SS (CSI 300) y 515170.SS (alimentación y bebidas) | 16-oct-2026 (A: 113,04 el 19-oct) |
| Tipo de cambio | Yahoo HKDCNY=X (0,85264) | 16-oct-2026 |
| Cuentas 2020-2025, 1S25, 1S26, 1T25, 1T26, 3T25 | informes CAS de CNINFO/SSE (`descargar.mjs`, `notas/docs/`, texto con pdftotext) | anual 2025: 31-mar-2026; 1S26: 31-jul-2026 |
| Folleto H (NIIF 2022-9M25, Frost & Sullivan) | HKEX | 26-ene-2026 |
| Acciones y autocartera | resultado de la junta extraordinaria (HKEX); avance de la recompra (SSE) | 9-oct-2026; 30-sep-2026 |
| Consenso y objetivos | MarketScreener (19 analistas) | 16-oct-2026 |
| Comparables (9) | ficha de Yahoo (`herramientas/yahoo.mjs`, script en el scratchpad) | 19-oct-2026 |
| Bono chino 10 años (1,648 %) | ChinaBond por POST | 16-oct-2026 |
| Prima implícita (4,20 %) | Damodaran ERPbymonth | oct-2026 |
| Movimiento y caídas diarias | `movimiento.mjs 9980.HK` y `605499.SS`; `movimiento-precio.mjs`; meses de la H con Yahoo | 16-oct (H) y 19-oct (A) |
| Sentimiento | Guba de Eastmoney (A y H, con curl) y SSE Roadshow | 4-19 oct-2026; conferencias 29-may y 17-sep-2026 |
| Próximos resultados | anuncio de consejo de HKEX | publicado 16-oct-2026: 3T26 el **29-oct-2026** |

## Comprobaciones pedidas

- **Acciones A+H**: 734.199.310 emitidas = 676.016.900 A + 58.182.410 H; 7.122.551 A en autocartera → **727.076.759 con voto**, las que se usan (junta del 9-oct, HKEX; avance de la recompra a 30-sep). Sobreasignación de la H ya ejercida en parte en marzo (3.865.800 H), dentro de las 58,18 M.
- **Descuento H/A**: H 97,40 HKD × 0,8526 = 83,04 CNY frente a A 114,25 CNY (mismo día, 16-oct) → **H/A 0,7269, descuento del 27,3 %**. En la salida a bolsa (3-feb, 248 HKD) era ≈ 12 %; se amplió tras liberarse los anclas el 3-ago.
- Ampliaciones liberadas de 3 × 10 en 2024 y may-2026: BPA y DPA anteriores a 2024 ÷ 1,69 y de 2024-2025 ÷ 1,3 (Yahoo ajusta igual los precios).

## Decisiones

- `meta.divisa` CNY, `divisa_cotizacion` HKD, `tipo_cambio` 0,8526. `identificacion.precio` = 83,04 CNY. ISIN a `null` (no lo encontré en los documentos descargados; no se pone sin verificar).
- **EBIT** = resultado de explotación + gastos financieros − ingresos de inversiones − cambios de valor razonable ± extraordinarios: la tesorería va al resultado financiero.
- **ROIC prudente**: caja del motor = solo efectivo (货币资金); los depósitos y productos de tesorería quedan en el capital invertido; los anticipos de distribuidores no se restan. ROIC 2025 **41,94 %** (NOPAT 4.086,5 / capital 9.744) frente a WACC **8,2436 %** = **+33,69 puntos**. El puente resta toda la tesorería (23.604,25 a jun-26) y suma como `otros_ajustes` el dividendo a cuenta pagado en septiembre (2.181,23).
- WACC 8,24 % (bono 1,648 %, beta 0,85 sobre la 0,73 de la A, prima 5,5 % + 2,5 de China, control y producto único, Kd 2 %, deuda 8 %); g 1,1 %. Pesos DCF 60 / comparables 15 / escenarios 25.
- Ventas 2026e +12 % fijo (1S real 12.443 M + 2S 10.937 M, +7,9 %); 2027e +10 %, 2028e +9 %, luego hasta 3 %. Margen EBITDA 28,5 % → 27,0 %; amortización 2,7 → 3,6 %; capex 9,5 → 3,8 %; circulante −2,5 %; impuesto 21 %.
- Mercado final: Frost & Sullivan 281.000 M (2029e) × 1,109 = 311.629 M en 2030e, pasado a precio de fábrica con 0,4136 (ventas de 2024 ÷ 23,0 % del mercado) = 128.890 M → cuota del 23,0 % al 24,7 %. Sostenibilidad **Sí** (motor y analista).
- **BPA propio**: resultado financiero recurrente 480 / 380 / 350 M (2026e-2028e), 727,08 M de acciones sin suponer más recompras. 2028e base 7,87 (consenso 9,13, −14 %).
- **Historia del PER**: la de la A × H/A de hoy. Adelantado 36,7 / 25,4 / 16,0 / 21,3 / 21,1 → mediana 21,28x; actual 11,23x. v2 en `per_historico.v2` (mediana 28,2x). **Selector: 1,9 ≥ 1,8 → desrateada, decide la v2** (base = PER actual).
- **Dividendo de 12 meses** (`financieros.ltm.dpa`, parche): 4,923 CNY = final de 2025 (1,92 en acciones de hoy) + a cuenta de 2026 (3,00), el atribuible a jul-25/jun-26, en lugar de los 3,846 de 2025. Es el dato correcto para un LTM a jun-26 con dividendo semestral, y cambia la señal: con 3,846 la regla daba Mantener (14,5 % / 10,8 %); con 4,923, Comprar (15,8 % / 12,1 %). Lo dejo dicho porque la compra depende de ello.
- Convicción **Baja** (los criterios dan Media porque miran la rentabilidad al valor intrínseco): control explicado.
- Control de perímetro de 2022 explicado (préstamos bancarios a corto colocados en depósitos, no una compra).

## Resultado

- DCF 137,54 CNY (WACC 8,24 %, VT 57 %); valor intrínseco **135,70 CNY (159,16 HKD), +63,4 %**; con la prima del mercado 152,86. DCF inverso: ventas −3,3 % al año o margen EBITDA del 16,3 % perpetuo; rentabilidad implícita 14,1 %.
- **12 m (v2 por el selector)**: objetivo **91,25 CNY (107,03 HKD)**; ponderada **+15,8 %**, base **+12,1 %** (12,0 % en `robustez.mjs`); v3 sin selector 27,7 % / 23,4 %; con BPA −10 %: 4,8 % / 1,4 %. Regla: **Comprar**, convicción baja. Comprar < 97,43 HKD; vender > 123,93 HKD.
- **Robustez (`--actual`)**: SÓLIDA; acción vigente Comprar; **acción robusta Mantener** por **B1**; L1 pasa (97,40 ≤ 97,43); límite robusto 88,24 HKD; sin C1-C3. Variantes que cambian la acción: BPA −10 % y precio +5 %.
- Regla 13: **no cambia** (anclas ya libres desde el 3-ago, sin colocaciones ni ventas del accionista de control, que compra H). Próximos resultados **29-oct-2026**.
- Riesgo de IA: Neutral, exposición baja, 0 % a 3-5 años en el negocio (una bebida de impulso; la IA solo ayuda en datos de venta); riesgo de reputación puntual, como el vídeo falso hecho con IA de junio de 2026.
- Word y PDF (44 páginas, soffice con perfil propio): 21 de 22 controles correctos y 1 explicado; cobertura 86,7 % (capital y directivos por debajo del 60 %: sin adquisiciones y sin desglose de remuneración). Avisos del Word: gráficos de EV/EBITDA NTM y transacciones sin datos (los proveedores no dan EV/EBITDA NTM gratis).

## Huecos

- EBITDA trimestral (solo ventas y beneficio en los CAS), calificaciones ESG, desglose fijo/variable de la remuneración, historial de guía (no da), múltiplos de EBITDA de las transacciones, posición corta, recomendaciones por tipo del consenso, ISIN.

## Lecciones (para el coordinador; no escritas en archivos comunes)

- Dividendo semestral con LTM a mitad de año: el `ltm.dpa` debe ser el atribuible a esos 12 meses (final del año anterior + a cuenta del actual), no el del último ejercicio; en Eastroc decide la señal.
- Hong Kong cierra por festivos propios (Chung Yeung) cuando Shanghái abre: el H/A se calcula con los dos cierres del mismo día, no con el último de cada uno.
