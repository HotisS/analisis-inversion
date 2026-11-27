# Diario — KEYENCE Corporation (6861) — corte 2026-11-27

- Inicio: 2026-11-27 10:38 (hora de Madrid).
- Commit de partida: `87188ae Tanda 1 (27-nov): Edenred, Netflix, Prysmian, Almawarid y Silicon2 rehechos`. No se cambia de versión del prompt durante el análisis.
- Encargo: `/tmp/claude-0/tanda-1127/encargo.md` (tanda del 27-nov, checkout compartido; sin subagentes: fases A-E hechas por mí). Procedimiento: `.claude/commands/analiza-empresa.md`, `verticales/empresa/prompt.md` (entero), `lecciones.md`, `lecciones-paises.md` (Japón), `lecciones-casos.md` (grep: participadas, desdoblamiento), `METODO-VIGENTE.md` §2 y §4 (v3 ×1,1, selector, niveles A/B de la regla 16, regla 13).
- Motivo: resultados del 2T del ejercicio FY2026 (29-oct-2026) y desdoblamiento 1 por 5 con efecto el 21-nov-2026. Iteración nueva sobre `informes/keyence-2026-10-07/` (último `datos-v5.json`, que ya había pasado las cifras por acción a la base nueva con `desdoblamiento.mjs` el 19-nov, sin investigación nueva).

## Pasos (hora de Madrid) y fecha de los datos de cada uno

| Hora | Paso | Fecha de los datos |
|---|---|---|
| 10:38 | Lectura del encargo, procedimiento, prompt entero, lecciones (núcleo, Japón, casos), METODO-VIGENTE §2 y §4 | — |
| 10:40 | `bolsa.mjs` (6861.T, ^N225, 1625.T, `--cierre-dia 20`) y `movimiento.mjs 6861.T` | cierre del 27-nov-2026 |
| 10:41 | Comprobación del ajuste del desdoblamiento en Yahoo (gráfico con `events=split`) | 27-nov-2026 |
| 10:42 | Descarga de tanshin y presentación del 2T, tanshin del 1T y anual, nota del desdoblamiento, nota del dividendo, compra de TraceParts e informe semestral (半期報告書) | 29-oct, 23-oct y 2-nov-2026 |
| 10:44 | Consenso tras resultados (Yahoo quoteSummary, base nueva) y MarketScreener (página del 23-oct) | 27-nov y 23-oct-2026 |
| 10:45 | JGB 10 años (MoF, 2,704 %), prima de Damodaran (4,41 %, nov), BCE (USD/JPY 159,26) | 26-nov y nov-2026 |
| 10:46 | Comparables (Yahoo quoteSummary de 6 empresas; Hexagon fuera) | 27-nov-2026 |
| 10:47 | Regla 13: Nikkei y rivales por semana, días de caída, escáner de noticias del repo | 27-nov-2026 |
| 10:48 | Notas A, C, D rehechas con `notas/actualizar-notas.mjs` (÷5 en BPA y DPA, ×5 en acciones, 2T26, LTM sep-26, puente 20-sep-2026, consenso, bolsa, comparables, accionistas a 20-sep); E (sentimiento) nueva; B sin cambios | 20-sep / 27-nov-2026 |
| 10:50-10:55 | `supuestos.mjs` (DCF, escenarios, BPA propio), `propio.mjs` y `resumen.mjs` reescritos; integrar y calcular | — |
| 10:56 | Word (`rellenar.mjs`: 27 gráficos, cobertura 91,3 %) y PDF (soffice, 58 páginas); revisadas como imagen portada y síntesis | — |
| 10:57 | `apuntar-12m.mjs keyence-2026-11-27 --precios` y `robustez.mjs --actual` (con `flock`); `comprobar.mjs` sin ERROR de Keyence | cierre del 27-nov-2026 |
| 10:58 | `revision-12m-2026-11-27.md` y este diario | — |

## El desdoblamiento (motivo del encargo)
- Nota del 29-oct-2026: 1 acción → 5, base el viernes 20-nov-2026, efecto el sábado 21-nov; 243.207.684 → 1.216.038.420 acciones emitidas; sin cambio de capital. Autocartera a 20-sep: 682.755 (→ 3.413.775). Acciones en circulación en la base nueva: **1.212,625 M** (Yahoo: 1.212.624.920).
- **Yahoo ya ajusta toda la historia**: evento `splits` 5:1 fechado el 19-nov-2026 (primera sesión ex-derecho), el cierre del 6-oct sale a 16.298 JPY (= 81.490 / 5) y la serie no tiene salto en el 18/19-nov (14.722 → 14.690). `bolsa.mjs` toma esa serie: precio, rango de 52 semanas (17.584 / 10.302), cierres de ejercicio y volumen (3,13 M de acciones/día, ×5 del anterior) salen en la base nueva. `movimiento.mjs` igual (sin salto en el 1 m). Única trampa: `defaultKeyStatistics.forwardEps` de Yahoo (1.867,39) **no** está ajustado; no se usa. MarketScreener seguía en la base vieja (página del 23-oct).
- En el informe: BPA y DPA de toda la cuenta ÷ 5, acciones × 5, trimestres ÷ 5, LTM, consenso (Yahoo ya en base nueva; MarketScreener ÷ 5), historia del PER con cierres de Yahoo ajustados ÷ BPA ÷ 5 (los múltiplos no cambian), objetivo, límites y textos en la base nueva (los textos de las notas con «350 a 550 JPY» y similares se reescribieron). Dividendo: 650 JPY anuales en la base vieja = 130 JPY en la nueva (325 a cuenta pagado el 26-nov en acciones viejas; 65 complementario por acción nueva).

## Resultados del 2T (29-oct-2026)
- Semestre: ventas 735.399 M JPY (+34,9 %), resultado operativo 408.262 (+50,0 %, margen 55,5 %), beneficio neto 298.675 (+49,4 %), BPA 1.231,53 JPY viejos = 246,31 nuevos. 2T: ventas 388.778 (+36,8 %), margen operativo 56,9 %, BPA 131,57 (base nueva). Divisa en el semestre: +51.900 M de ventas y +38.400 M de resultado operativo. Extranjero sin divisa +30,5 % en el 2T; semiconductores +65 % fuera de Japón.
- «BPA ×1,04 según el escáner»: no he encontrado el consenso previo del 2T en fuente gratuita (hueco registrado). Lo que sí se ve: el consenso de BPA de FY2026e subió un 5,5 % en 30 días tras el 2T (467,35 → 493,01) y el de FY2027e un 2,9 %; nuestro BPA de FY2028e sube un 8,1 % frente al informe anterior (529,53 → 572,62).

## Decisiones
- FY2026e fijo (+28,5 %): sin guía, pero con el semestre publicado el segundo semestre a +22,9 % es prudente (consenso +28,9 %). Después +10 % / +7,5 % (consenso +10,8 % / +7,4 %), corrección del −5 % en FY2029e y etapa 2 de diez años como en el informe anterior.
- WACC 8,10 % (JGB 2,704 %, beta Blume 1,05, prima Japón de Damodaran 5,14 %); terminal 2,2 % = JGB − 0,5 (regla del prompt). Escenarios 25/50/25; bajista con perfil en FY2027e (−9 %, margen 51 %) y terminal 1,8 %; alcista con el terminal del base (el anterior usaba 3,0 %, por encima del techo).
- Historia del PER adelantada sin FY2025 (sin BPA real del siguiente, criterio de `historia-adelantada.mjs`): mediana 39,5x, mínimo 33,2x, media larga 38,6x. Con FY2025 sobre nuestro BPA de FY2026e: mediana 36,6x y mínimo 23,7x; el base no cambia (manda el tope ×1,1) y el bajista sigue en base × 0,80. Base del BPA: publicado en historia y escenarios (declarado).
- Comparables rehechos con Yahoo del 27-nov (no llevados al precio): Hexagon fuera (Yahoo mezcla euros y coronas tras la escisión de Octave). EV/EBITDA NTM por EBITDA LTM escalado con las ventas esperadas (estimación, dicho en el criterio).
- Sostenibilidad: «Sí», hecha a mano porque el motor la trata como activos ligeros (financiable 12,0 % con la reinversión bruta frente al 8,6 % proyectado; capital nuevo al 56,8 % frente al 87,6 % incremental).

## Resultado
- **Mantener, convicción media** (la sugerida). Rentabilidad a 12 meses v3: ponderada **18,4 %**, base **17,7 %** (objetivo 17.451,45 JPY); v2 de control 8,5 %. Valor intrínseco 13.658,18 JPY (−8,0 %): bloquea el Comprar. DCF 13.728,99 (WACC 8,10 %); con la prima del mercado 15.045,59 (+1,4 %).
- Robustez: FRÁGIL; `senal_cartera` Mantener; `accion_robusta` No comprar; colchón de BPA — para comprar y 8 % para mantener; nivel de compra hoy **ninguno** (límites A 13.658,18 y B 13.658,17 JPY); `limite_mantener_cot` 15.972,92 JPY; regla vender > 19.523,83 JPY. ROIC − WACC 86,5 puntos; sostenibilidad Sí.
- Regla 13: veredicto «no cambia» (caída de mercado; desdoblamiento neutro; sin colocaciones ni litigios; 3T estimado 28-ene-2027).
- Frente al 7-oct: ponderada 13,8 % (v4, base vieja) → 18,4 %; valor intrínseco 13.313 (66.566,47 / 5) → 13.658,18; DCF inverso de «exigente» (14,4 % de crecimiento implícito) a 7,4 %; JGB 3,1 % → 2,7 %; la señal sigue en Mantener.
- 27-nov-2026: revisión a 12 meses apuntada (`apuntar-12m.mjs keyence-2026-11-27 --precios`): Mantener 26,6 % (informe viejo a 14.655) → Mantener 18,4 % (14.845, 27-nov) (`revision-12m-2026-11-27.md`).

## Para el coordinador (no lo toco)
- `verticales/empresa/simbolos.json`: la clave `6861` apunta a `keyence-2026-10-07` (aviso C10): pasar a `keyence-2026-11-27`.
- Lección posible (Japón o general): tras un desdoblamiento, el `forwardEps` de `defaultKeyStatistics` de Yahoo no se ajusta aunque `earningsTrend` sí; MarketScreener tardó semanas en pasar a la base nueva.
