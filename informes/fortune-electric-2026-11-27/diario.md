# Diario · Fortune Electric (1519.TW) · 27-nov-2026

- Commit de partida: 87188ae («Tanda 1 (27-nov): Edenred, Netflix, Prysmian, Almawarid y Silicon2 rehechos»). Tanda del 27-nov, checkout compartido, sin subagentes (fases A-E hechas por mí).
- Motivo: el escáner pide versión nueva tras el 3T26 (BPA +45 %) y la robustez del informe del 16-oct salía BLOQUEADA por un «D2 CORREGIR» (precio del informe 656 frente a 484 de mercado, cociente 1,355 tomado por otra divisa).
- Iteración nueva sobre `informes/fortune-electric-2026-10-16/` (no tocada). Notas A-E copiadas como punto de partida y actualizadas con `notas/actualizar-notas.mjs` (3T26, LTM, puente, consenso, comparables, sentimiento); `propio.mjs` y `textos.mjs` rehechos.

## Pasos (hora de Madrid) y fecha de los datos

| Hora | Paso | Fecha de los datos |
|---|---|---|
| 10:38 | Lectura de encargo, procedimiento, prompt, lecciones (Taiwán, contratistas), METODO-VIGENTE (regla 13 y 16); robustez del informe viejo y escáner | — |
| 10:40 | Precio diario de Yahoo (16-oct → 27-nov) y `movimiento.mjs 1519.TW` | cierre 27-nov-2026 (484 TWD) |
| 10:41 | MOPS (`mopsov`/`mops` t164sb01 y doc.twse): rechazan la consulta («FOR SECURITY REASONS»); no se insistió | — |
| 10:42 | Datos abiertos de la TWSE: cuenta 9M-2026, balance 30-sep-2026, ventas de octubre | 30-sep-2026 / oct-2026 (publicado 10 y 27-nov) |
| 10:43 | Stock Analysis trimestral (cuenta, balance, flujos 2T25-3T26), cuadrado con la TWSE | 30-sep-2026 |
| 10:44 | Anue: hecho relevante del 3T26 (10-nov), ventas de octubre, aclaración del 3-nov, días de límite | 3 al 27-nov-2026 |
| 10:45 | TAIEX y 10 comparables del 16-oct al 27-nov (causa de la caída) | 27-nov-2026 |
| 10:46 | Consenso Yahoo (quoteSummary con crumb) y FactSet de Anue | 27-nov-2026 / 23-sep-2026 |
| 10:46 | `bolsa.mjs` (0050.TW índice, 2308.TW sector) | 27-nov-2026 |
| 10:47 | Bono de Taiwán 10 años (1,86 %, Trading Economics) y ERP de Damodaran (nov-2026, 4,41 %) | 27-nov-2026 / nov-2026 |
| 10:47 | Comparables rehechos con Yahoo (9 empresas, cambio del día) | 27-nov-2026 |
| 10:48 | PTT (sentimiento): sin hilos nuevos desde may-2026 | 27-nov-2026 |
| 10:49 | Notas A, D y E actualizadas; propio (DCF, puente 30-sep, 12 m) | — |
| 10:50 | Integrar y calcular (1.ª y 2.ª pasada) | — |
| 10:53 | Textos, integrar, calcular, Word (26 gráficos) y PDF con soffice | — |
| 10:55 | `apuntar-12m.mjs --precios` y `robustez.mjs --actual` (con flock); `comprobar.mjs` | precio 27-nov-2026 |
| 10:57 | revision-12m y diario | — |

## El dato a corregir (motivo del encargo)
- **D2 CORREGIR era falso**: el precio de 656 era el cierre real del 16-oct; la acción cayó a 484 (−26,2 %) con el TAIEX −16,6 % y el sector −10 % a −25 % (Allis −24,6 %, LS Electric −23,3 %, GE Vernova −22,4 %), con sesiones de ±10 % al ritmo del índice antes de las elecciones del 28-nov. Sin cambio de divisa, sin ex-derecho (Yahoo sin eventos en 3 meses). Con la fecha nueva la marca desaparece (igual que ASPEED el 13-nov).
- **Fuente primaria**: MOPS no abrió hoy desde la nube; se usaron los datos abiertos de la TWSE (regulador) y el hecho relevante de MOPS del 10-nov reproducido por Anue: capital 3.474.689 miles = **347,47 M acciones** (la base del informe era correcta), BPA 9M de 10,48 y beneficio atribuido de 3.640,3 M.
- **Error real encontrado**: en el informe del 16-oct el consenso de FactSet se dividía por 1,1 (supuesta base antigua). No: el rango de FactSet (16,15-21,42 en 2026) coincide con el de S&P en la base nueva y el BPA de 12 meses de Yahoo (15,28) es 10,48 + 4,81 sobre 347,47 M. Se usa sin dividir (2028e 27,74). Solo afecta al contraste (D7), no a la regla.
- **Fecha de resultados**: el 3T26 se aprobó el **10-nov**, no el 13-nov que tenían la vigilancia y el informe.

## Decisiones
- 2026e fijo: ventas +0,3 % (9M 16.207,0 + 4T ≈ 8.300; octubre −15,4 %), margen EBITDA 27,4 % (9M 27,1 %; 3T 32,5 %).
- Base: 2027e +27 % (capacidad +30 %, Taichung, entregas retrasadas; existencias 11.402 M, anticipos 10.693 M), 2028e +18 %, luego 10/6/4/3 %. Margen 27,5 % (2027e) → 18,5 % (2032e). Capex 8 % → 3 %; circulante 15 % → 18 %; impuestos 22 %.
- WACC 8,77 %: tasa libre 1,86 %, beta 1,1 (1,01 mensual 5 a; 1,21 semanal 2 a), prima 5,5 % + 1,0. Terminal Gordon **1,3 %** (antes 1,5 %: con el bono al 1,86 % el tope es tasa − 0,5).
- Puente 30-sep-2026: deuda 1.561,8; arrendamientos 2.122,6; caja + inversiones a corto 5.969,6; minoritarios 167,1; sin otros ajustes (el dividendo ya se pagó en el 3T).
- Escenarios 30/50/20 como en octubre (bajista con perfil en 2028e).
- Historia del PER y escenarios en BPA **publicado** (base_bpa declarada en los dos).
- ROIC del motor 51,6 % (2025); sin anticipos ≈26 %. ROIC − WACC 42,8.

## Resultado
- **Mantener, convicción media.** DCF 197,99 TWD; valor intrínseco 220,58 (−54,4 %); DCF inverso sin solución (rentabilidad implícita 4,3 %). Sostenibilidad «Sí».
- **Línea 12 m:** objetivo ponderado 512,59 TWD (+8,0 %; base +14,6 %), regla v2 por el selector (v3 sin selector 14,6 %), Mantener; comprar < 220,58; filtro de mantener ≤ 259,51; banda Vender de la regla > 580,66. Detalle en `revision-12m-2026-11-27.md`.
- Robustez: SÓLIDA; `senal_cartera` «Vender (no pasa el filtro de mantener)»; `accion_robusta` «No comprar». **Nivel: ninguno.** Sin CORREGIR, VARIANTE ni CONFIANZA salvo M2 (historia de 3 años).
- Regla 13: `movimiento.mjs` → 1 m −14,0 %, 3 m −32,5 %, 6 m −39,4 %, 12 m −28,5 %; avisos P3 y P5; veredicto «no cambia».
- Controles: 20 de 21 correctos y 1 explicado (DCF inverso sin solución). `comprobar.mjs`: ningún ERROR de esta carpeta (los 3 ERROR son de keyence, vertiv y la cartera).

## Para el coordinador
- `simbolos.json` (1519) apunta a la carpeta vieja (aviso C10): cambiar a `fortune-electric-2026-11-27`.
- `precios.json` de 1519 es del 21-oct (P5 de robustez lo usa): pasar `precios.mjs`.
- Lección Taiwán: MOPS puede rechazar la consulta desde la nube («FOR SECURITY REASONS»); los datos abiertos de la TWSE (`openapi.twse.com.tw/v1/opendata/t187ap06_L_ci`, `t187ap07_L_ci`, `t187ap05_L`) dan cuenta acumulada, balance y ventas mensuales oficiales, y Anue reproduce los hechos relevantes de MOPS. Y: el consenso de FactSet de Anue ya sale en la base posterior a la ampliación gratuita (no dividir).
