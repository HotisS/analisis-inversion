# Diario · Thermo Fisher Scientific (TMO) · 26-oct-2026 (iteración tras el 3T26)

- Commit de partida: a84b2a0 (EssilorLuxottica, 26-oct). Prompt de `verticales/empresa/prompt.md` sin cambios durante el análisis.
- Encargo de Hotis: rehacer el análisis value completo porque TMO publicó el 3T26 el 21-oct-2026, después del informe del 14-oct. Método completo, sin subagentes (fases 2-4 por mí, notas A-E). Mismo ticker (TMO) y clave que `thermo-fisher-2026-10-14`.
- Horas de Madrid (UTC+1), siempre de `TZ=Europe/Madrid date`.

## Tiempos
- 09:50 inicio; leídos `analiza-empresa.md`, `prompt.md` entero, `lecciones.md`, EE. UU. de `lecciones-paises.md`, casos (compradores en serie) de `lecciones-casos.md`, §1-5 de `METODO-VIGENTE.md`. Carpeta `informes/thermo-fisher-2026-10-26/` con `notas/` y `notas/docs/`.
- 09:57 descargados 10-K 2021/2023/2025, 10-Q 2T26, comunicados 4T24-3T26, conferencia 3T26 (Motley Fool), proxy 2026, 8-K junta y directivos, folleto y FWP de bonos de feb-2026; cuentas.mjs, bolsa.mjs (cierre 23-oct 673,82 USD), movimiento.mjs, noticias.mjs, form4.mjs; Stock Analysis y MarketBeat (consenso y comparables), Tesoro (10 años 5,00 % a 23-oct).
- 10:06 notas A (cuentas), B (sector) y C (gobierno) escritas.
- 10:10 nota D (identificación, consenso, bolsa con `contexto` de la regla 13, múltiplos históricos, 10 comparables, transacciones) escrita; puente y WACC pasados a `propio` (no son claves de D).
- 10:11 nota E (sentimiento): Stocktwits (30 mensajes del 16-24 oct), feed de Seeking Alpha, MarketBeat. Reddit da 403 desde la nube (hueco).
- 10:17 `propio.mjs` (+ `supuestos.mjs`, `textos.mjs`, `resumen.mjs`), integrar y calcular: 20 de 23 controles correctos y 3 explicados (tipo impositivo bajo de 2023-2025, no proyectado).

## Decisiones y comprobaciones
- **Misma base del PER (aviso del hilo)**: comprobado. Los tres casos del objetivo a 12 meses usan BPA AJUSTADO de 2028e (27,41 / 29,80 / 31,34 USD) y la historia adelantada también: cierre de cada año ÷ BPA ajustado real del año siguiente (2018 18,1x; 2021 28,7x; 2022 25,6x; 2023 24,3x; 2024 22,7x; 2025 23,0x sobre nuestro 2026e). Excluidos 2019 y 2020 (BPA del año siguiente inflado por la covid). Mediana 5 a 24,3x, mínimo 22,7x, media larga 23,7x; actual 673,82 / 27,32 = 24,7x. Comparables: PER adelantado sobre BPA ajustado de consenso (Stock Analysis), mediana 26,0x. **El informe del 14-oct mezclaba bases**: su `datos-v2.json` (historia-adelantada.mjs) dividía los cierres por el BPA CONTABLE del año siguiente (mediana 33,9x) y aplicaba ese múltiplo a escenarios en BPA ajustado; además su BPA ajustado de 2018-2019 estaba mal (9,49 y 10,69 USD frente a ≈11,12 y 12,35 de los comunicados). Eso infló su v3 (15,9 % / 14,9 %).
- **Calibración del BPA**: la fórmula (margen EBITDA GAAP + 1,3 puntos − depreciación 2,6 % − financieros − impuesto 11,5-12 % − 20 M de minoritarios, 371 M de acciones) da 25,27 USD en 2026e frente a 25,28 del punto medio de la guía; 2027e 27,32 frente a 27,74 de consenso (sin recompras no anunciadas).
- **Circulante** al nivel real: 21,5 % de las ventas (2018-2025: 20,2-21,9 %), no 0 %.
- **Beta**: 0,90, la ajustada de la regresión mensual de 5 años de la propia TMO (0,85 bruta); ya lleva su deuda. Desapalancada con su D/E de mercado (41.370 / 249.140 = 0,166, impuesto 15 %) = 0,79; reapalancada con la misma estructura = 0,90. No se copia de un comparable.
- **Consenso tras resultados**: contrastado con Stock Analysis (BPA 2026e 25,26, 2027e 27,74; objetivo medio 750,92 con 27 analistas) y MarketBeat (27,76 USD de 2027e; objetivo medio 681 con 25 analistas, con objetivos más viejos).
- **Sostenibilidad**: el motor da «Sí»; reinversión neta negativa (amortización de intangibles comprados > capex), así que la prueba se hace a mano (orgánico 4-5 % frente a un mercado del 6,7 %, cuota 17,5 % → 18,0 %, precio 1,5 %). Sin recorte del base.
- Resultado: v3 ponderada +4,6 %, base +8,6 % → Mantener (v2 +9,0 %); valor intrínseco 497,43 USD (−26,2 %); ROIC 9,0 % frente a WACC 9,20 %.

## Cierre
- 10:19 comprobado (aviso del hilo) que el 3T26 está publicado de verdad: 8-K de la SEC, anexo 99.1 «Thermo Fisher Scientific Reports Third Quarter 2026 Results», fechado el 21-oct-2026 (`notas/docs/pr-3t26.html`).
- 10:19 Word y PDF regenerados (cobertura del 90 %, ninguna sección por debajo del 60 %); `revision-12m-2026-10-26.md` escrito.
- 10:19 `apuntar-12m.mjs thermo-fisher-2026-10-26`: TMO pasa de Mantener 15,9 % (690,00) a Mantener 4,6 % (673,82, cierre del 23-oct); base 8,7 %, v2 9,0 %. Grep: la carpeta aparece en `objetivo12m-revisados.json`.
- 10:19 `robustez.mjs --actual` (y `--json`): SÓLIDA; acción robusta «No mantener» (el valor intrínseco, 497,43, queda un 26 % por debajo del precio: no pasa el filtro de mantener, con su límite en 585,21); nivel ninguno (`limites_nivel_cot` vacío); límite robusto 497,43; límite B 497,42; ROIC−WACC −0,2; sostenibilidad Sí; colchón de BPA −10,4 % para comprar y −5,4 % para mantener. Ningún CORREGIR. D5 (VARIANTE, tipo contable del 7 %) no afecta: la historia y los casos van en BPA ajustado, con un tipo del 11,5-12 %, no con el BPA contable.
