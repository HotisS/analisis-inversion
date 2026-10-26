# Diario · China Resources Sanjiu (000999.SZ) · análisis value completo (iteración 2) · corte 26-oct-2026

- Encargo de Hotis (26-oct-2026): rehacer el análisis tras los resultados del 3T26 (publicados el 24-oct-2026, después del informe del 20-oct). Método completo de `/analiza-empresa`, fases 2-4 hechas por mí en orden A-E (sin subagentes).
- Commit de partida: `862ee5a` («Semanal 25-oct: índices, salidas a bolsa, calendario y cobertura») al leer el procedimiento; al crear la carpeta el checkout ya estaba en `cda8fa0` (commit de otro hilo, sin cambios en el prompt ni el motor que use este análisis). Checkout compartido: sin pull, commit ni push desde este encargo.
- Punto de partida: `informes/cr-sanjiu-2026-10-20/` (scripts de notas copiados y rehechos; cada dato se vuelve a comprobar a la nueva fecha de corte).
- Horas en Madrid (UTC+1 desde el 25-oct).

## Pasos y fecha de los datos

| Hora (Madrid) | Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|---|
| 09:23 | Inicio; lectura de `analiza-empresa.md`, `prompt.md`, lecciones (núcleo, China), `objetivo-12m.md`, `robustez.md`, `METODO-VIGENTE.md` | — | — |
| 09:24 | Carpeta nueva `informes/cr-sanjiu-2026-10-26/` con `notas/` y `notas/docs/`; scripts de la iteración anterior copiados como punto de partida | — | — |
| 09:25 | Fase 1: identificación sin cambios (000999, ISIN CNE0000011K8, SZSE principal, CNY, CAS, cierre en diciembre). Sin XBRL público para China: `cuentas.mjs` no aplica; estados CAS de la F10 de Eastmoney descargados de nuevo hasta el 3T26 y cotejados con el PDF del 3T26 (ventas, beneficio, BPA, caja, deuda, minoritarios, fondo de comercio idénticos) | CNINFO + Eastmoney F10 | 30-sep-2026 (publicado el 23/24-oct) |
| 09:26 | Documentos primarios nuevos: informe del 3T26, deterioros de 9M26, consejo del 23-oct, trimestrales de KPC y Tasly, deterioros de KPC; anual 2025 y semestral 2026 releídos (segmentos del 1S26 cuadran) | `descargar.mjs` (CNINFO) | 24-oct-2026 |
| 09:27 | Precio y bolsa: cierre 25,05 CNY (Sina 15:35:30 de Pekín = Yahoo) | `bolsa.mjs` (000999.SZ, 510300.SS, 512010.SS) | 26-oct-2026 (sesión cerrada a las 08:00 de Madrid) |
| 09:27 | Regla 13: `movimiento.mjs 000999.SZ` (sin avisos P1-P5) y `movimiento-precio.mjs` (sin caídas diarias de −5 %) | Yahoo | 26-oct-2026 |
| 09:28 | Comparables (nueve chinas de medicina tradicional y OTC) y consenso de Yahoo | `notas/comparables-yahoo.mjs` | 26-oct-2026 |
| 09:28 | Bono chino a 10 años 1,64 % | ChinaBond (POST a la curva) | 23-oct-2026 |
| 09:29 | Sentimiento: Guba, tres páginas (≈ 300 mensajes del 13 al 26-oct); de ahí sale la noticia de UBS (财联社), comprobada en el texto de la noticia | Guba | 13-26 oct 2026 |
| 09:30 | Conferencias: actas de la del 3T26 (24-oct) y la del 1S26 (23-ago) en CNINFO; nota de Sinolink del 3T26 (25-oct) | CNINFO, Eastmoney | 23-ago y 24/25-oct-2026 |
| 09:31 | Stock Connect: 000999 sigue en la lista de HKEX (comprable y vendible) | HKEX xls → csv | 23-oct-2026 |
| 09:33 | Notas A, B, C, D y E reescritas en orden (`construir-notas.mjs` + `act-A.mjs` + `act-BCDE.mjs`) y guardadas | — | — |
| 09:34 | Aviso del coordinador (base del BPA, circulante, beta): (1) **misma base de BPA**: nuestra fórmula de BPA de escenarios es recurrente (sin valor razonable ni impuesto atípico) y aplicada a 2025 da 1,88 CNY, igual que el 扣非 por acción (1,88) y no el publicado (2,06); por eso la historia del PER (v3 y v2) se rehace con el BPA 扣非 ÷ 1.664,22 M de acciones (F10 de Eastmoney), no con el publicado como en la iteración anterior; 2019 se excluye de la media larga (su PER adelantado usa el BPA de 2020, hundido por la COVID). (2) **Circulante** al nivel real con la definición del motor (resta los anticipos de clientes): 38,0 % en 2025 y 40,0 % a sep-26 → 39 % constante; un primer 43 % (definición contable bruta) disparaba el control de circulante y se corrigió. (3) **Beta** 0,85 reapalancada con la deuda propia (D/E 9,6 %): media de la sectorial de Damodaran de farmacéuticas emergentes (0,97 → 1,05) y la propia (0,64 → 0,66) | Eastmoney F10 (扣非), Damodaran betaemerg.xls | 26-oct-2026 |
| 09:35 | Supuestos, `propio.mjs` (puente a 30-sep-2026, historia del PER con el BPA 扣非), `textos.mjs` y `resumen.mjs` reescritos | — | 30-sep-2026 / 26-oct-2026 |
| 09:37 | Integración, cálculo y Word + PDF (45 páginas; cobertura 85,4 %; 21 de 22 controles correctos y 1 explicado). DCF 31,54; valor intrínseco 31,88; objetivo 12 m 29,72 (base 29,75) | `motor/integrar.mjs`, `calcular-empresa.mjs`, `rellenar.mjs`, `soffice` | 26-oct-2026 |
| 09:39 | `revision-12m-2026-10-26.md` escrita | — | 26-oct-2026 |
| 09:40 | `apuntar-12m.mjs cr-sanjiu-2026-10-26`: v3 22,6 % / 22,8 %; grep confirma la carpeta en `objetivo12m-revisados.json` | `herramientas/apuntar-12m.mjs` | 26-oct-2026 |
| 09:42 | `robustez.mjs --actual` y `--json`: SÓLIDA, Comprar → robusta Mantener en cartera; nivel C; límites B2 24,13 / C 25,23; límite robusto 24,13; ROIC−WACC 6,2; sostenibilidad En parte; avisos D7, Q1, M6; sin CORREGIR | `herramientas/robustez.mjs` | precio de `precios.json` (24,78, 23-oct) |

## Decisiones
- Convicción **Baja** (el motor sugiere Alta): no pasa la v2 (base 11,7 %), ni un BPA −10 %, y la sostenibilidad es «En parte».
- Sostenibilidad «En parte» frente al «Sí» del motor: proyectamos +4,0-4,5 % en 2027-2029e en un mercado que crece un 1,7 % y con la dirección hablando de «fase de bajo crecimiento».
- `robustez.mjs --actual` toma 24,78 CNY de `precios.json` (cierre del 23-oct) porque el encargo no permite `precios.mjs`; a 25,05 la v3 da 22,6 % / 22,8 % (`apuntar-12m`). Anotado en la revisión a 12 meses.

## Revisión a 12 meses
- 26-oct-2026 · 25,05 CNY · v3 ×1,1 decide (selector 1,27) · ponderada 22,7 % / base 22,8 % · v2 16,1 % / 11,7 % · objetivo 29,72 (base 29,75) CNY · Comprar (robusta: Mantener) · comprar < 26,72, vender > 34,14.
