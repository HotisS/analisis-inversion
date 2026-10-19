# Diario · DLocal Limited (DLO, Nasdaq) · 19-oct-2026

- Commit de partida: 99bd934 («Escáner fuera de hora 19-oct 10:34»). Sin `git pull`, `commit` ni `push` por encargo (checkout compartido con otros cinco análisis). No se ejecutaron `seguimiento.mjs`, `cobertura.mjs` ni `regenerar.mjs`; no se tocaron `cola.md`, `lecciones*.md`, `MEMORIA.md`, `METODO-VIGENTE.md` ni `seguimiento.xlsx`. Escrito fuera de la carpeta: la entrada `DLO` de `verticales/empresa/simbolos.json` (edición atómica: releer, añadir solo DLO, escribir) y lo que escribieron solas `precios.mjs DLO` y `apuntar-12m.mjs informes/dlocal-2026-10-19`.
- Tiempos (UTC): inicio ≈ 09:16; cuentas, documentos y notas A-E hasta ≈ 09:36; parte propia, cálculo, Word, PDF, revisión 12 m y robustez hasta ≈ 09:48. Hubo una compactación de contexto a mitad (la investigación siguió con los mismos archivos).
- Encargo: análisis value completo desde cero (carpeta nueva). Puntos pedidos: caja de comerciantes fuera del puente, comisión que baja, divisas y controles de capital (Argentina, Nigeria, Egipto); el dueño pidió además un informe amplio con mucho detalle geográfico. Escáner: PER NTM 12,8; ROIC medio 30 %; FCF yield 9 %; ventas +38 % anual en 3 años.
- Entorno: nube con proxy (`NODE_USE_ENV_PROXY=1`). Sin herramienta Agent: las fases A-E las hice yo (`notas/construir-notas.mjs` escribe A.json … E.json); parte propia en `notas/propio.mjs` (supuestos) + `notas/textos.mjs` (textos escritos tras el primer cálculo).

## Pasos hechos y fecha de los datos

| Paso | Herramienta / fuente | Fecha de los datos |
|---|---|---|
| Cuentas anuales 2019-2025 | `cuentas.mjs --sec DLO` (XBRL de los 20-F) + 20-F 2025, 2023 y 2022 | Ejercicio 2025 (20-F del 18-mar-2026) |
| Trimestres y balance del puente | 6-K de resultados 4T24-2T26 y estados intermedios del 2T26 | 2T26 (30-jun-2026; 6-K del 13-ago-2026) |
| Precio y bolsa | `bolsa.mjs DLO` (frente a SPY e IPAY), `precios.mjs DLO` | Cierre del 16-oct-2026: 14,67 USD |
| Movimiento (regla 13) | `movimiento.mjs DLO` | Hasta el 16-oct-2026 |
| Consenso | MarketScreener (BPA, EBITDA, ventas 2026-2028) y Stock Analysis (objetivos) | 19-oct-2026 y 8-oct-2026 |
| Comparables | Ficha quoteSummary de Yahoo (10 empresas; script en el scratchpad) | 19-oct-2026 |
| Tasa libre | Curva del Tesoro de EE. UU. (FRED falló) | 16-oct-2026 (10 años 5,09 %) |
| Prima implícita | Damodaran, ERPbymonth | Octubre de 2026 (4,20 %) |
| Accionistas e insiders | 13D/A de General Atlantic, 13G/A de Azar, Form 4 (SEC) | Hasta el 19-oct-2026 (último Form 4: 5-ago-2026) |
| Noticias | 6-K, Seeking Alpha (RSS), Investing.com, Stocktwits, transcripción del 2T26 (Earnings Whispers) | Hasta el 18-oct-2026 |

## Decisiones

- **Flotante (lección Adyen)**: balance limpio de los fondos de comerciantes (cuentas a pagar a comerciantes fuera del activo y del pasivo); flujo operativo sin la variación neta de esos saldos. Caja del puente = «corporate cash» publicada (369,1 M) + activos financieros propios (79,2 M) = 448,3 M; comprobado: caja − pasivos con comerciantes + cuentas a cobrar = 427,9 M frente a 424,5 M publicados a dic-2025 (319,7 frente a 317,8 en 2024). Deuda 64,6 M (líneas de anticipo), arrendamientos 2,7 M.
- **Por eso el FCF yield del escáner (9 %) no se repite**: el motor da 4,3 % con el flujo limpio; el 9 % incluía la entrada de fondos de comerciantes. El «ROIC medio del 30 %» del escáner mide el capital con toda la caja; el del informe (capital operativo) es del 83,4 %.
- Consenso de EBITDA ajustado (MarketScreener 2025: 278,1 frente a 246,2 publicado): `base_ebitda` «ajustado» con un 2,6 % de las ventas.
- **WACC 14,59 %**: bono de EE. UU. 5,09 %, beta 1,30 (0,94 mensual, 1,54 semanal a 2 años, ≈ 1,4 comparables), prima 5,5 %, prima adicional 2,5 % (riesgo país ponderado por ingresos ≈ 4 %, algo más de la mitad porque la beta ya recoge parte), deuda 1,5 % al 6 %. g 3 %; sin etapa 2.
- Ventas: 2026e +46 % (fijo: 1S26 +55 % y guía), 2027e +25 %, 2028e +18 %, luego 14 → 4 % en 2035e (por debajo del consenso: 2.355 M frente a 2.542 M en 2028e). Margen EBITDA 20 / 20,5 / 21 %. Capex 3,2 → 2,6 %; amortización 2,2 → 2,5 %; circulante 1 %; impuestos 17 / 19 / 20 % (Pilar 2).
- Puente de ingresos: volumen +65 / +40 / +28 / +22 / +17 % y precio −19 / −15 / −10 / −8 / −6 % (la comisión resta cada año). Mercado final 2030e: TAM de 4,2 billones de volumen × 2,32 % (ingresos/volumen del 1S26) ≈ 97.400 M; cuota 2,4 % → 3,1 %. **Sostenibilidad «Sí»** (motor y analista).
- Escenarios: bajista −6 pp de crecimiento, −3 de margen, +0,5 de WACC (25 %); alcista +5 y +2 (25 %). BPA 2028e 0,92 / 1,21 / 1,45 (fórmula cuadrada con 2025: 0,65; 2026e 0,82 = consenso).
- Historia del PER adelantada: 2022 31,8x; 2023 45,4x; 2024 17,3x; 2025 17,2x (2021, 102x, excluido por burbuja). Mediana 24,6x; actual 14,4x (sobre el BPA de 2027e de 1,02). Selector: 1,71 < 1,8 → v3. Control v2 en `per_historico.v2`.
- Suma de partes: no aplica (un solo negocio). Transacciones sin peso (clase B con el 79,55 % del voto). Pesos 50 DCF / 20 comparables / 30 escenarios.

## Resultado

- DCF 13,66 USD (−6,9 %); escenarios 8,41 / 13,66 / 19,54 (ponderado 13,82); valor intrínseco 13,46 USD (−8,2 %); con la prima del mercado 15,22 (+3,7 %). DCF inverso: crecimiento implícito del 12,4 % anual (base 11,0 %), rentabilidad implícita del 13,8 %.
- **12 m (v3 ×1,1, sin marcas del selector)**: objetivo 20,30 USD; ponderada +39,7 %, base +32,5 % (v2 26,4 %). **Mantener**, convicción media: la rentabilidad pasa, pero el valor intrínseco está por debajo del precio. Límite de compra 13,46 USD; vender por encima de 22,76.
- Calidad: ROIC 83,4 % frente a WACC 14,59 % (+68,8 puntos).
- Robustez (`--actual`): **SÓLIDA**, acción robusta Mantener; sin marcas B1/L1/C1-C3, solo el aviso M6 (objetivo que se mueve con el precio por el tope). BPA −10 %: 25,9 % / 19,4 %. Ninguna variante cambia la acción (manda el valor intrínseco).
- Regla 13: **no cambia** (tendencia alcista; General Atlantic con 36,8 M de acciones como posible overhang; resultados a unas cuatro semanas).
- **Riesgo de IA**: exposición media, sentido mixto, +3 a +5 % a 3-5 años (más del 60 % del código ya con IA y plantilla estable; riesgo de pagos con agentes y rieles nuevos sobre la comisión).
- Word: 20 de 20 controles correctos; cobertura 88,6 % (gobierno y rentabilidad por debajo del 60 %: emisor extranjero sin voto de remuneración; ROIC sin desglose operativo). PDF con soffice (perfil propio).
- Próximos resultados: **2026-11-18** (estimada por el calendario de 2025; sin fecha anunciada).

## Huecos

- Transcripción completa del 1T26 (Seeking Alpha, roic.ai y stocktaper 403; sahmcapital 404): se usó la nota de prensa y la prensa.
- Causa de las caídas diarias del 12-feb, 23-feb y 26-mar-2026 (ni 6-K ni Form 4).
- Posición corta; EBITDA del 3T24; consenso previo de 2024-2025; múltiplos históricos de proveedor; calificaciones ESG.

## Para el coordinador

- Símbolo de Yahoo: DLO (Nasdaq, USD); se compra desde IBKR como cualquier acción del Nasdaq. Entrada añadida en `simbolos.json`; revisión apuntada en `objetivo12m-revisados.json` por `apuntar-12m.mjs`.

## Lecciones

- Procesadores con fondos de comerciantes: la «corporate cash» que publican cuadra con caja − pasivos con comerciantes + cuentas a cobrar; el FCF yield del escáner hereda la variación de esos fondos y sale inflado (9 % frente a 4,3 % limpio).
