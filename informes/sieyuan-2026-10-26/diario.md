# Diario · Sieyuan Electric (002028.SZ) · 26-oct-2026

Commit de partida: `077aa5b` (prompt y motor sin cambios durante el análisis). Iteración nueva tras el informe del 3T26 (publicado en CNINFO el 24-oct-2026). Procedimiento completo (`/analiza-empresa`), fases A-E hechas por el mismo agente, sin subagentes. Horas: Madrid (UTC+1), sacadas de `TZ=Europe/Madrid date`.

## Pasos, con la fecha de los datos

| Paso | Hora Madrid | Datos a fecha de |
|---|---|---|
| Comprobación de que los resultados existen: CNINFO lista «2026年三季度报告» (id 1225618525) y el acta del consejo 2026-048, ambos del 24-oct-2026 | 10:55 | CNINFO 26-oct-2026 |
| Lectura de `analiza-empresa.md`, `prompt.md`, `lecciones.md`, sección China de `lecciones-paises.md`; carpeta nueva | 10:56 | — |
| Descarga del 3T26 (三季度报告, 2026-049) y del acta del consejo 2026-048 de CNINFO; notas del 3T26 de Soochow (26-oct), Guosen y Sinolink (25-oct) | entre 10:56 y 10:59 | 30-sep-2026 |
| `bolsa.mjs` (`--indice 510300.SS --sector 159326.SZ --corte 2026-10-26`) y `movimiento.mjs`: cierre 106,81 CNY del 26-oct (la sesión de Shenzhen cierra a las 8:00 de Madrid); 1 m −20,5 %, 3 m −31,5 %, 6 m −50,0 %, 12 m −3,5 %; avisos P3 y P5 | 10:59 | cierre del 26-oct-2026 |
| Causa del −10 % del 20-oct (límite a la baja, antes de los resultados): 中国基金报 vía 证券之星, «corrección de las expectativas del 3T» y arrastre del sector | entre 10:56 y 10:59 | 20-oct-2026 |
| Consenso: MarketScreener y Stock Analysis siguen con datos de antes de los resultados (último precio 9-oct y 17-sep); se usan las tres notas posteriores (Eastmoney 研报) para el BPA y MarketScreener solo para los objetivos | entre 10:56 y 10:59 | 25-26-oct-2026 |
| Comparables de Yahoo llevados al cierre del 26-oct (precio, BPA estimado, EV con la deuda neta de la ficha) con `sieyuan-comps.mjs` (scratchpad) | entre 10:56 y 10:59 | 26-oct-2026 |
| ChinaBond 10 años (POST a `searchYc`): 1,6376 % | 10:59 | 26-oct-2026 |
| Comprobación de 2025 y 9M25 contra las columnas comparativas del 3T26: activo 29.839,92, caja 4.929,84, clientes 8.183,10, existencias 4.078,94, patrimonio 15.493,24, ventas 9M25 13.826,98, beneficio 9M25 2.191,37 y flujo operativo 9M25 431,55 coinciden con `cuentas-cas-*.json` | entre 10:59 y 11:01 | 31-dic-2025 y 30-sep-2025 |
| Nota A: 3T26 en `cuentas-cas-periodos.json` (30-sep-2026 del trimestral), LTM sep-26 (amortización de 9M estimada como 1,5 × la del semestre), trimestres 4T24-3T26, balance, flujos, calidad, KPI; guardada | 11:01 | 30-sep-2026 |
| Nota B: State Grid 1S26 (+12,6 % de inversión en activos fijos, Xinhua 24-jul) frente al ≈ +1 % de UBS en 7M26 que usaba el informe anterior; Guosen 3T26 (escasez de transformadores, retrasos por el conflicto EE. UU.-Irán, supercondensadores); guardada. WebFetch agotado (cupo compartido): las páginas siguientes, con curl | 11:02 | 24-jul y 25-oct-2026 |
| Nota C: accionistas a 30-sep-2026 del trimestral (HKSCC 17,91 %, −15,5 M acciones en el 3T; fundadores sin cambios), consejo del 22-oct (7/7), HKEX `appactive` del 26-oct sin Sieyuan, sin anuncios de ventas de directivos desde el 16-oct; guardada | 11:03 | 30-sep y 26-oct-2026 |
| Nota D: identificación (787,9 M acciones diluidas, capitalización de Yahoo 84.034 M), consenso = media de las tres notas del 3T26 (MarketScreener y Stock Analysis sin actualizar), bolsa y contexto (regla 13) con `movimiento.mjs`, comparables al 26-oct, bono 1,6376 %; guardada | 11:05 | 26-oct-2026 |
| Nota E: Guba de Eastmoney (3 páginas, ≈ 160 hilos del 20 al 26-oct, `article_list` con curl) y Fenghuang; además, en la nota A, actas de las reuniones con inversores del 24-oct (3T26) y del 31-ago de CNINFO (`tabName=relation`); guardadas | 11:06 | 26-oct-2026 |
| Supuestos (`supuestos.mjs`), `propio.mjs` (puente a 30-sep), textos; `integrar` + `calcular` (21 de 23 controles y 2 explicados); historia del PER y BPA de los casos en la misma base (BPA diluido contable): comprobado | 11:11 | 26-oct-2026 |
| Word (`rellenar.mjs`, cobertura 85,6 %, 26 gráficos) y PDF (soffice con perfil /tmp/lo-sieyuan); portada y síntesis revisadas como imagen | 11:13 | — |
| `apuntar-12m.mjs sieyuan-2026-10-26`: Mantener 3,3 % (125,10) → Mantener 14,0 % / base 13,3 % (106,81); carpeta presente en `objetivo12m-revisados.json` (grep) | 11:12 | cierre del 26-oct-2026 |
| `robustez.mjs --actual` y `--json`: SÓLIDA, acción robusta Mantener en cartera, nivel ninguno, límites A 95,40 y B1 98,09, límite robusto 95,40, sostenibilidad Sí, ROIC − WACC 36,1; sin CORREGIR (avisos D7 y P5; el P5 lee `precios.json` del 21-oct, que no se actualiza en este encargo) | 11:13 | precio del 26-oct-2026 |
| `revision-12m-2026-10-26.md` | 11:13 | — |

## Decisiones

- Comprobación previa: el 3T26 existe (CNINFO, 24-oct-2026, 2026-049).
- Consenso: MarketScreener (último precio del 9-oct) y Stock Analysis (17-sep) no se habían actualizado tras los resultados; el BPA de consenso es la media de las tres notas del 25-26-oct (Soochow 4,58/5,98/7,71; Guosen 4,64/6,49/8,59; Sinolink 4,62/6,47/8,48). Objetivos: MarketScreener 209,54 (pre-resultados), contrastado con Yahoo 205,32 (9 analistas).
- Misma base de BPA en la historia del PER v3 y en los casos: BPA diluido contable (comprobado; el BPA de 2025 de la historia, 4,01, es el publicado).
- Circulante del DCF al 18 % de las ventas, su nivel real LTM sep-26 (≈ 18,1 %; 17,5 % en 2025), no por debajo (el informe anterior usaba el 17 %).
- Beta 1,0: media aproximada de la semanal de 2 años (1,14) y la ajustada mensual (0,82); con D/E del 1,1 % la beta reapalancada con la deuda de Sieyuan es igual a la desapalancada.
- 2026e fijo: ventas +26,5 % (27.247 M) y margen EBITDA del 17,6 % (9M ≈ 19,2 %, 4T ≈ 15 % como en 2025). Margen 17,6 % → 17,0 % en 2031e (antes 18,8 % → 17,5 %): el 3T26 perdió 2,7 puntos de margen EBIT por la mezcla.
- State Grid: el informe anterior usaba «≈ +1 % en 7M26» (UBS vía ifeng); State Grid declara +12,6 % de inversión en activos fijos en el 1S26 (Xinhua). Se citan las dos y se deja de decir «red china casi plana».
- Fuente nueva primaria: actas de las reuniones con inversores en CNINFO (`tabName=relation`): 24-oct (3T26) y 31-ago. La empresa dice que Norteamérica es la región que más crece y que sus equipos quedarían fuera de la orden 14420; el caso base no lo da por bueno (alcista).
- Sostenibilidad «Sí» del motor: el financiable (11,2 %) está por debajo del 13,9 % proyectado solo por el año fijo 2026e; en 2027e-2031e el crecimiento medio es del 11,4 %. Cuota 1,6 veces la actual (por encima del límite relativo, dentro del absoluto de 10 puntos): punto exigente, dicho en la síntesis.
- Convicción baja (la sugerida): ponderada a menos de 3 puntos del umbral y reglas absoluta/relativa discrepantes.

## Resultado

Mantener, convicción baja. Objetivo a 12 meses 121,02 CNY (ponderada +14,0 %; base 120,24, +13,3 %). Valor intrínseco 98,09 CNY (−8,2 %). ROIC 44,2 % − WACC 8,08 %. Robustez SÓLIDA, acción robusta Mantener en cartera, límite robusto 95,40 CNY. Regla 13: no cambia. Próximos resultados: avance de 2026 a mediados de enero de 2027.

## Huecos

- Peso de EE. UU. en las ventas; pedidos de 9M26 en cifra (solo «> 30 %»); amortización de 9M26 (estimada).
- Los del informe anterior: EBITDA trimestral, segmentos de 2021-2023, CR5, cuotas de los competidores, desglose de la remuneración, transacciones con múltiplo, posición corta, foros internacionales.

## Lecciones propuestas

- China: las empresas cuelgan en CNINFO el acta de cada reunión con inversores (投资者关系活动记录表), también la de resultados; se lista con `hisAnnouncement/query` y `tabName=relation`. Es la fuente primaria de la «conferencia» que no tiene transcripción.
- Acciones A tras resultados: MarketScreener y Stock Analysis tardan días en actualizar; las notas de brokers chinos del día siguiente (API `reportapi.eastmoney.com/report/list?code=…`, con BPA previsto) son el consenso fresco.
- `robustez.mjs --actual` toma el movimiento de `precios.json`; si el encargo prohíbe `precios.mjs`, el aviso P5 sale con fecha vieja aunque el precio sea el del corte.
