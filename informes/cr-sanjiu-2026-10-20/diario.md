# Diario · China Resources Sanjiu (000999.SZ) · análisis value completo · corte 20-oct-2026

- Commit de partida: `9d75f1e` (9d75f1e93eded9e83d62514840d02296e4fc7fd1, «Cola de índices: Swisscom (pareja 16)»). Checkout compartido con otro análisis: sin pull, commit ni push desde este encargo.
- Inicio ≈ 09:34 UTC del 20-oct-2026 (hora del reloj del contenedor); fin ≈ 10:02 UTC. Análisis desde cero, sin partir de un informe anterior (no existía).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Precio de la decisión | Sina hq (15:35:45 de Pekín) y `herramientas/precios.mjs 000999` | Cierre del 20-oct-2026: 25,81 CNY |
| Históricos, beta y PER histórico | `herramientas/bolsa.mjs` (000999.SZ, 510300.SS, 512010.SS) | Hasta el 20-oct-2026 |
| Cuentas anuales | CNINFO: informes anuales 2021-2025 (PDF) + estados estructurados de Eastmoney F10 (CAS) | Ejercicio 2025 (publicado en mar-2026) |
| Cuentas intermedias | CNINFO: semestral 2026, 1T26, 9M25, 1S25; avances de resultados | 30-jun-2026 (publicado en ago-2026) |
| Compra de Tasly, fondo de comercio y deterioros | Informe de la compra (修订稿), anuncio de deterioros de 2025 | 2025-2026 |
| Gobierno, junta y vinculadas | Informe anual 2025, actas de las juntas (abr y sep 2026), anuncios del consejo | Hasta sep-2026 |
| Consenso | Yahoo (10 analistas), Sinolink, Southwest, Orient, Guojin, China Post (notas de 1S26) | Ago-oct 2026 |
| Comparables | `notas/comparables-yahoo.mjs` (nueve farmacéuticas chinas de medicina tradicional y CHC) | 20-oct-2026 |
| Tasa libre y prima | ChinaBond 10 años (1,6497 %); Damodaran ERP (4,20 %) | 19-oct-2026; oct-2026 |
| Stock Connect | Lista SZSE de HKEX (comprable y vendible, CCASS 70999); página de IBKR | 20-oct-2026 |
| Precio y noticias (regla 13) | `herramientas/movimiento.mjs 000999.SZ` | 20-oct-2026 |
| Calendario de resultados | Eastmoney 预约披露 (3T26 el 24-oct) | 20-oct-2026 |
| Sentimiento | Guba (dos páginas), prensa (Securities Star, Lanjinger, Jiemian, Gelonghui) | Jul-oct 2026 |
| Notas A-E y propio | `notas/construir-notas.mjs`, `supuestos.mjs`, `propio.mjs`, `textos.mjs`, `resumen.mjs` | — |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` (21 de 22 controles; el de compra robusta, explicado) | — |
| Word y PDF | `motor/rellenar.mjs` (cobertura 85,9 %) y soffice | — |
| Revisión a 12 meses | `revision-12m-2026-10-20.md`, `herramientas/apuntar-12m.mjs` | — |
| Robustez | `herramientas/robustez.mjs --actual` (FRÁGIL; acción robusta Mantener) | Precio del 20-oct-2026 |

## Decisiones

- **Cuentas**: los estados estructurados de Eastmoney F10 (copia de los CAS) se usan para no transcribir a mano; se cuadraron las cifras clave (ventas, beneficio, caja, deuda, fondo de comercio) con los PDF de CNINFO. BPA de 2021-2023 ajustados por las ampliaciones liberadas de 3 × 10 de 2024 y 2025 (factor 1,69 y 1,3).
- **Puente**: balance de 30-jun-2026; **minoritarios a valor de mercado** (72 % de Tasly y 71,95 % de KPC cotizadas: 20.444 M frente a 16.303 M contables), porque son participaciones cotizadas grandes; `otros_ajustes` = dividendo a cuenta pagado el 16-oct.
- **WACC**: beta 0,8 (la semanal ajustada es 0,64 y la mensual frente al CSI 300 sale negativa); prima adicional de 2,0 puntos (China, control estatal, precios regulados). Terminal al 1,0 %.
- **2026e fijo**: 1S26 real y 2S un 8 % bajo el 2S25 (ventas −3,6 %, margen EBITDA 19,9 %). BPA 2028e base 2,15 CNY, un 12-17 % bajo el consenso.
- **Sostenibilidad «En parte»** (el motor dice «Sí»): el +4,0-4,5 % de 2027-2029e depende de que el CHC y KPC se recuperen, y no está demostrado el poder de precio frente a las compras centralizadas.
- **Recomendación Comprar con convicción baja** (el motor sugiere alta): no pasa la v2 (14,9 %), con BPA −10 % baja a 8,2 % y la sostenibilidad es «en parte». Acción robusta: Mantener; límite robusto 24,29 CNY.
- **Riesgo de IA: bajo / neutral** (medicamentos y red de farmacias; la IA no sustituye el producto).
- **Stock Connect**: 000999 es del mercado principal de Shenzhen (no ChiNext), comprable y vendible por Northbound.
- **Gobierno**: voto en contra de los minoritarios a la remuneración (3,07 %) del acta de la junta de 2025; 8 de 13 criterios.
- Fuentes que fallaron: bbtnews e ifeng («fetch failed»); se usó Jiemian en su lugar.
- Avisos del Word que quedan (datos que no existen o no aplican): sin suma de partes, sin calificaciones ESG publicadas, sin calendario de vencimientos de deuda en el semestral, comparables chinos sin EV/EBITDA NTM, transacciones sin EV/EBITDA.

## Revisión a 12 meses

- 20-oct-2026 · regla v3 ×1,1 (decide por el selector) · objetivo 29,91 CNY (2028e: 11,3x × 1,88 / 14,1x × 2,15 / 16,0x × 2,36, pesos 25/50/25) · ponderada +19,8 %, base +21,4 % · v2 14,9 % / 11,4 % · señal Comprar (convicción baja); acción robusta Mantener; límite común 26,88 CNY, robusto 24,29 CNY · apuntada con `apuntar-12m.mjs`. Pendiente fuera de este encargo (checkout compartido): `cobertura.mjs --arreglar`, `seguimiento.mjs`, `cola.md` y commit/push.
