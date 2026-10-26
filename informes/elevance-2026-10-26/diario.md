# Diario · Elevance Health (ELV) · 26-oct-2026

- Encargo de Hotis (26-oct-2026): rehacer el análisis value completo tras los resultados del 3T26 (21-oct-2026). Iteración nueva de `informes/elevance-2026-10-14/` (solo punto de partida; cada dato se vuelve a comprobar). Mismo ticker y clave (ELV).
- Commit de partida: 862ee5a (Semanal 25-oct: índices, salidas a bolsa, calendario y cobertura).
- Entorno: nube de Claude Code; Node sale con `NODE_USE_ENV_PROXY=1`. Sin subagentes (cuatro análisis a la vez): fases 2-4 bis hechas en orden A, B, C, D, E.
- Horas en Madrid (UTC+1 desde el 25-oct).

## Tiempos
- 09:00 lectura del encargo, `analiza-empresa.md`, `prompt.md`, lecciones (núcleo, EE. UU., aseguradoras de salud), `METODO-VIGENTE.md`, `objetivo-12m.md`, `robustez.md` y el diario anterior.
- 09:06 `cuentas.mjs --sec ELV` (XBRL 2016-2025), `bolsa.mjs` (cierre del 23-oct: la sesión del 26-oct no ha abierto en Nueva York) y `movimiento.mjs ELV`.
- 09:06-09:14 Fase A: comunicados 8-K del 4T20 al 3T26, 10-Q del 3T26, 10-K 2022, 2023 y 2025 y transcripciones del 2T26 y 3T26 (Motley Fool) descargados con `descargar.mjs` y leídos por partes.
- 09:14 `notas/A.json` (construir-A.mjs): cuenta 2021-2025 de los 10-K (2021-2022 reexpresados por LDTI), LTM a sep-26, 8 trimestres con el consenso de MarketBeat/FactSet, segmentos, balance, flujos, calidad y capital. Definición: EBIT = ingresos operativos − prestaciones − coste de productos − gastos operativos + renta de inversiones − amortización de intangibles; los resultados de instrumentos financieros van al resultado financiero.
- 09:15 `notas/B.json` (construir-B.mjs): sector y competidores de la nota anterior (fuentes de CMS, KFF, AMA y 10-K de competidores, comprobadas en el informe de UnitedHealth) con la posición, el ciclo, la regulación, los hitos y las controversias de Elevance actualizados con el 3T26 y el 10-Q.
- 09:17 `notas/C.json` (construir-C.mjs): proxy 2026 (consejo, comisiones, remuneración, accionistas), 8-K de las juntas 2024-2026 (voto de remuneración), Form 4 de 12 meses (`form4.mjs`; venta del director financiero de 4,66 M USD el 22-oct), 8-K de febrero, marzo y septiembre de 2026 y guías anuales 2021-2026 de los comunicados.
- Nota: horas corregidas a la hora del reloj del sistema (Madrid, CET) según la fecha de modificación de cada archivo; las primeras versiones las había estimado mal.
- 09:22 `notas/D.json` (construir-D.mjs): identificación (cierre 439,95 USD del 23-oct), consenso 2026-2028 (Stock Analysis y MarketBeat), bolsa de `bolsa.json` y `movimiento.json`, múltiplos 2021-2025, 8 comparables por PER adelantado, 8 transacciones del sector (fuentes comprobadas en el informe de UnitedHealth) y 21 fuentes de mercado.
- 09:27 `notas/E.json` (construir-E.mjs): Seeking Alpha (RSS de análisis y noticias), Stocktwits (30 mensajes del 8 al 24-oct), SentiSense (Reddit/X a 30 días) y cambios de recomendación de MarketBeat del 22-23 oct. Reddit bloqueado desde la nube.
- 09:27 `notas/propio.mjs` (supuestos), `integrar.mjs` y primer `calcular-empresa.mjs`: el circulante del motor (7,2 % de las ventas, sin reservas médicas) se mantiene constante (con 0 % liberaba 14.220 M en el primer año); provisión de CMS pendiente (593 M) en `otros_ajustes`. DCF 448,43 USD.
- 09:31 `notas/textos.mjs` (redacción: DCF, sostenibilidad «En parte», escenarios, suma de partes, puente, objetivo a 12 meses, catalizadores, riesgos con IA, preguntas, contexto de la regla 13, comentarios y síntesis), reintegrado y recalculado: 19 de 19 controles.
- 09:32 Revisión de comité (descripción del negocio añadida; síntesis recortada a 639 palabras), Word (`rellenar.mjs`, cobertura 93,2 %) y PDF (`soffice`, 52 páginas); páginas 1-4 revisadas.
- 09:32 `revision-12m-2026-10-26.md` y `apuntar-12m.mjs elevance-2026-10-26`: ELV Comprar 21,2 % → Mantener 7,2 % (base 10,4 %; v2 6,4 %); comprobado con grep en `objetivo12m-revisados.json`.
- 09:32 `robustez.mjs elevance-2026-10-26 --actual` (y `--json`): SÓLIDA, acción robusta «No mantener», sin CORREGIR; una VARIANTE (M4, doble castigo en el bajista de la v2, control). Nivel: ninguno (sostenibilidad «En parte», ROIC − WACC 2,8). Límite robusto 370,02 USD; límite B 386,84.
- 09:33 Entrega.
