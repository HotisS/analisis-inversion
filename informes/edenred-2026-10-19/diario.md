# Diario — EDENRED SE (EDEN) — corte 2026-10-19

- Inicio: 2026-10-19 15:54 (Madrid). Encargo de Hotis (hilo «Edenred análisis completo»): análisis value completo para ver si se mantiene la opinión del día (Vender sin esperar a resultados).
- Commit de partida: `c7114d7 Escáner: estado de compra propuesta más corto`. No se cambia de versión del prompt durante el análisis.
- Procedimiento: `.claude/commands/analiza-empresa.md` + `verticales/empresa/prompt.md` (leído entero) + `lecciones.md` + `lecciones-paises.md` (Francia) + `METODO-VIGENTE.md` §1-5.
- Iteración nueva (la anterior: `informes/edenred-2026-10-07/`, v4). Carpeta nueva, todo se vuelve a comprobar a la fecha de corte.

## Fase 1 — Identificación (15:54-16:05)
- Edenred SE, Euronext Paris `EDEN` (Yahoo `EDEN.PA`), ISIN FR0010908533, LEI 9695006LOD5B2D7Y0N70. Cuentas en EUR, NIIF-UE, ejercicio natural (cierre diciembre). Cotiza en EUR: tipo 1.
- Último informe publicado: semestral 1S26 (23-jul-2026). Próximo: ingresos del 3T26 el 21-oct-2026 (antes de la apertura).
- Sesión del 19-oct abierta a las 15:54 (cierra a las 17:30): el precio del informe será el cierre del 19-oct si el análisis termina después; si no, el del 16-oct.
- `cuentas.mjs --esef "Edenred"` cogió la primera entidad (EDENRED PAIEMENT, cifras que no son del grupo): repetido con el LEI del grupo → 7 ejercicios (2019-2025) en `notas/cuentas-xbrl.json`. Faltan EBITDA, EBIT, capex de intangibles, recompras y arrendamientos de flujos: los completa A con el informe anual.

## Fases 2-4 — Subagentes A-E (15:56-16:08)
- Cinco subagentes en paralelo; los cinco terminaron con nota completa (E ~5 min, C ~9, B ~11, D y A ~12). No hubo que relanzar ninguno.
- B leyó el texto adoptado n.º 352 (12-oct): sin tope legal; decreto posible tras dictamen de la Autorité, todo en vigor el 1-ene-2028; enmiendas del 2,5 % (AS62, AS73) decaídas. En el Senado desde el 13-oct, sin fecha.
- D: precio 30,05 (cierre 16-oct), 232,7 M de acciones diluidas, consenso MarketScreener 15 analistas (BPA 1,83 / 2,15 / 2,42), objetivo medio 31,21; Bund 3,49 % (Bundesbank); UBS sube objetivo a 28,50 el 16-oct.
- C: guías 2019-2025 cumplidas; Beyond22-25 parcial; Niel 8 % en opciones liquidables en efectivo (ene-may 2027); sin novedades de la aproximación de fondos desde junio.

## Integración y cálculo (16:08-16:14)
- Mismo criterio del float que la iteración anterior (visión operativa): 2.739 M de caja a otros_ajustes + 195 M de otros pasivos financieros + 75 M de recompras jul-sep; circulante sin float de 2024-2025 desde el URD 2025 pág. 159; minoritarios a 12x (516 M); asociadas 8 + 190 (60 % de Edenred Pay North America al valor mínimo de la operación con Abry).
- Veredicto «retrasa» de D cambiado a «no cambia»: la regla 13 no aplaza por resultados cercanos.
- Resultado: DCF 47,59; valor intrínseco 44,13; objetivo 12 m 36,52 (+25,9 %, base +27,7 %), v2 de control +13,4 %. Sostenibilidad «En parte». Recomendación del informe: **Mantener** (justificada: la regla daría Comprar, pero no es robusta y la sostenibilidad «En parte» impide comprar).
- Robustez --actual (29,81 EUR, 16:14): FRÁGIL, acción robusta Mantener en cartera; colchón de BPA 14 % para mantener.
- Decisión de juicio que mueve el selector: excluir de la historia adelantada el cierre de 2022 (BPA de 2023 con la multa). Con él, la mediana sería 26,9x (1,98 veces el actual) y decidiría la v2 (13,4 %): también Mantener.
- Controles: 18 correctos y 6 explicados. Word (27 gráficos, cobertura 92,4 %) y PDF con LibreOffice.
