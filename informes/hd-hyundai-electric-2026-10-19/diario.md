# Diario · HD Hyundai Electric (267260.KS) · 19-oct-2026

Commit de partida: `8e12032 Escáner value amplio (16 regiones, 61 bolsas) y seis análisis value del 19-oct: CLASSYS, Eastroc, dLocal, Heijmans, Lasertec, Ningbo Deye`. Análisis completo desde cero (`/analiza-empresa`), no un refresco. Horas del contenedor (UTC) según las marcas de los archivos.

## Pasos y fecha de sus datos

| Paso | Hora (UTC) | Datos a fecha de |
|---|---|---|
| Identificación: KOSPI 267260, ISIN KR7267260008, KRW, K-IFRS consolidado, ejercicio a diciembre; carpeta nueva | ≈10:26 | 19-oct-2026 |
| `bolsa.mjs` (267260.KS, ^KS11, 010120.KS) → `notas/bolsa.json`; comprobación de la caída del 63 % (sin desdoblamiento; Naver confirma) | 10:26 | cierre del 19-oct-2026 (525.000 KRW) |
| Cuentas oficiales de DART con el visor por secciones (sin XBRL para Corea): 사업보고서 FY2022-FY2025, auditoría consolidada FY2022, 반기보고서 1S26, 분기보고서 3T24, 3T25 y 1T26; avisos de 2026 (contratos, guía, Anseong, juntas, plan de valor, accionista de control) | 10:28-10:45 | FY2025 (16-mar-2026); 1S26 a 30-jun-2026 (14-ago-2026); avisos hasta el 1-oct-2026 |
| Presentaciones de resultados 3T24-2T26 (web de la empresa) | ≈10:32 | 2T26 (28-jul-2026) |
| Consenso FnGuide/WiseReport (anual y trimestral), comparables Yahoo (11), bono coreano a 10 años (Naver 4,154 %), tipos de cambio | 10:37-10:38 | consenso 16-oct-2026; bono, cambios y comparables 19-oct-2026; Damodaran oct-2026 |
| Federal Register (antidumping preliminar y final 2023-2024), sección 232, tamaño de mercado (MarketsandMarkets, Frost, ficha `sectores/transformadores-2026-10-16.md`) | ≈10:39 | final AD 14-ago-2026; 232 del 6-abr-2026; ficha 16-oct-2026 |
| Foro de Naver (1.200 mensajes) | ≈10:41 | 19-ago a 19-oct-2026 |
| Notas A-E (`notas/construir-notas.mjs`) | 11:02 | — |
| `movimiento.mjs 267260.KS` (y ^KS11, 298040.KS, 010120.KS para separar mercado, sector y empresa) | ≈11:03 | cierre del 19-oct-2026 |
| Supuestos, puente y textos (`supuestos.mjs`, `propio.mjs`, `textos.mjs`, `resumen.mjs`), con riesgo de IA y `bolsa.contexto` | 11:02-11:08 | balance a 30-jun-2026 |
| `integrar.mjs` + `calcular-empresa.mjs` (21 de 21 controles; todas las citas con fuente) | 11:08 | — |
| Word (`rellenar.mjs`, cobertura 89,2 %) y PDF (soffice, 45 páginas) | 11:08 | — |
| `simbolos.json` (267260 → 267260.KS), `apuntar-12m.mjs` y `precios.mjs 267260` (con `flock`) | 11:09 | cierre del 19-oct-2026 |
| `robustez.mjs --actual`: SÓLIDA, acción robusta No mantener | 11:09 | precio del 19-oct-2026 |
| `revision-12m-2026-10-19.md` y este diario | 11:09-11:11 | — |

## La caída del 63 % (pedida en el encargo)

Real. Máximo de cierre de 1.430.000 KRW el 7-may-2026 (Yahoo; 1.420.000 en la serie de `movimiento.mjs`) y 525.000 el 19-oct: −63,3 %. Yahoo no registra desdoblamientos en la serie (solo dividendos de 5.200, 1.300 y 1.300 KRW), el volumen es normal y Naver da los mismos niveles (cierre de 522.000 en KRX/NXT, máximo de 52 semanas de 1.449.000, mínimo de 473.000, capitalización de 18,82 billones). Causas: mercado (KOSPI −36,7 % desde el máximo del 22-jun; el 28-29-jul −10,8 % y −6,0 %, el 15-oct −7,6 %), sector (Hyosung Heavy −57,9 % y LS Electric −48,3 % desde el mismo 7-may) y empresa (−16,9 % el 29-jul con la conferencia del 2T26; recortes de objetivos por el won en octubre).

## Decisiones

- **Cuentas**: DART como fuente oficial; el visor por secciones funciona desde la nube (el PDF de DART devuelve 0 bytes). Sin XBRL. `beneficio_neto` = atribuido; resultado financiero = BAI − EBIT.
- **2026e fijo** (1S publicado): +12,2 % de ventas, margen EBITDA del 27,4 %. Después +16 % y +13 % (cartera de 8.490 M USD y contrato de centros de datos), y 9/7/5/4/3,5 %. Margen del 28,5 % en 2027-2028 y vuelta hasta el 20 % en 2033e (ciclo normal del sector 10-15 %). Circulante del 7 % al 15 % (devolución de anticipos).
- **WACC 10,02 %**: bono coreano 4,154 %, beta 1,0 (0,82 mensual, 0,88 ajustada), prima 5,5 % + 0,5 (país y gobierno de grupo; el ciclo va en los flujos). Terminal 3 %.
- **Escenarios** 25/50/25 con perfil desde 2029: el bajista lleva el margen al 14 % (ciclo normal), el alcista al 26 % (escasez permanente).
- **Historia del PER**: fuera 2020 (BPA de 2021 en pérdidas) y 2021 (BPA de 2022 atípico: 85.777 M de otros ingresos e impuesto casi nulo). Quedan 4 años (5,9/5,9/18,8/31,4); el mínimo de 5,9x (antes del ciclo) hace muy duro el bajista (robustez M4: «doble castigo»; sin él, +5,0 %). Se mantiene: es el mínimo real de una cíclica en máximos de margen.
- **BPA propio** un 8 % (2027e) y un 16 % (2028e) bajo el consenso: diferencia de margen (won y capacidad nueva).
- **Huecos**: consenso previo por trimestre, resultado por línea, ESG externo, CR5, posición corta, EV/EBITDA NTM de comparables (el mapa de comparables no se dibuja), cifra de la guía de 2023.

## Resultado

Mantener, convicción media. A 12 m (v3 ×1,1, decide la v3): ponderado 502.329 KRW (−2,8 %), base 536.797 (+3,7 %); v2 de control +11,9 % / +13,9 % (Mantener); con BPA −10 %, −12,4 % / −6,5 %. Valor intrínseco 396.130 KRW (−24,5 %); DCF 329.426. ROIC 59,0 % − WACC 10,02 % = 48,98 puntos; sostenibilidad Sí. Robustez SÓLIDA, acción robusta No mantener; límite de compra 396.130 KRW; no es compra robusta (fallan v3, v2, valor intrínseco, B1 y L1). Regla 13: no cambia. Próximos resultados: 3T26 hacia el 22-oct-2026 (estimada).

## Lecciones propuestas

- **DART sí responde desde la nube** (contradice el diario de CLASSYS): búsqueda con `POST https://dart.fss.or.kr/dsab007/detailSearch.ax` (`textCrpNm`), secciones con `dsaf001/main.do?rcpNo=` (nodos con rcpNo, dcmNo, eleId, offset, length, dtd) y texto con `report/viewer.do?...`; los avisos de una página, con el dcmNo de `viewDoc(...)` y `eleId=0&offset=0&length=0&dtd=HTML`, vienen en cp949 (convertir con `iconv -f cp949 -t utf-8`). La descarga en PDF (`pdf/download/pdf.do`) devuelve 0 bytes. Iría a `lecciones-paises.md` (Corea).
- **Caídas desde máximos en Corea: separar mercado, sector y empresa** con `movimiento.mjs` sobre el KOSPI y dos competidores; en 2026 el KOSPI se movió más de un 10 % en un día varias veces y la mayor parte de los «desplomes» del escáner fueron de mercado.
- **Cíclicas en máximos de margen con historia corta**: la historia adelantada recoge los PER de antes del ciclo (5-6x), que hacen el bajista muy duro (robustez M4); conviene decirlo en `per_excluidos` y mirar la variante «sin doble castigo» antes de concluir.
- **Anticipos de clientes en el ROIC**: con pasivos de contrato grandes, el ROIC del motor (59 %) sale inflado; dar al lado uno con el circulante de ciclo medio (aquí ≈ 34 %, estimación propia).
