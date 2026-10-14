# Diario — Betsson AB (BETS-B.ST), corte 2026-10-12

- Commit de partida: 1fe1e3f (Informe de S&P Global (Mantener, convicción baja)). Prompt sin cambios durante el análisis.
- Encargo: orquestador con cinco subagentes A-E en primer plano; sin commit, sin seguimiento.mjs, sin tocar cola/MEMORIA/lecciones/motor/construccion/verticales.

## Fase 1 — Identificación
- Betsson AB (publ), Nasdaq Stockholm Large Cap, ticker BETS B (Yahoo BETS-B.ST). ISIN B por confirmar (SE0000102378 en las notificaciones de la FI hasta 2024; D/C lo confirman). Cuentas en EUR (millones), NIIF-UE, cierre 31-dic. Cotiza en SEK.
- Próximos resultados: 22-oct-2026 (informe enero-septiembre, calendario de betssonab.com).
- Acciones a 30-jun-2026 (informe 2T26, p. 14): 15.034.000 A (10 votos, no cotizan), 121.854.405 B y 2.747.433 C (todas en autocartera); autocartera B 1.583.123. En circulación: 15,034 + 120,271 = 135,305 M. Votos totales 274.941.838.
- 2T26: ingresos 310,2 M EUR (+2 %, +6 % orgánico), EBITDA 58,5 M (−31 %), EBIT 42,2 M; B2B (licencias) 49,1 M frente a 75,6 M por un gran cliente B2B. Caja 310,0 M; saldos de clientes y jackpots 54,4 M; cuentas a cobrar a PSP 58,9 M; bonos 173,6 M (2027 y 2029). Deuda financiera neta −128,4 M.
- Dividendo 0,66 EUR (dos plazos, mayo y noviembre). Recompra 3,85 M B por 40 M EUR terminada abril 2026.

## Fases 2-4 — Subagentes A-E (en primer plano, terminaron en 5-11 min)
- A: cuentas 2021-2025 en EUR (antes publicaba en SEK), LTM jun-26 propio, 8 trimestres; formato función; impuestos al juego 15,5 % de ventas 2025 (19,6 % 2T26). B2B 90,2 → 49,1 M/trim. Fondos de clientes 54,4 M en otros pasivos corrientes. Rhino (Canadá) 64,5 M cerrada 3-ago-26.
- B: sector EGBA/H2GC; locally regulated 36 % (2T23) → 76 % (2T26); foso Estrecho, se estrecha.
- C: ISIN B nuevo SE0022726485. A = 56 % votos, 11 % capital; control familiar (Hamberg, Knutsson, Kling, Lindwall). Solo compras de directivos (~1,9 M EUR). Voto remuneración solo 2024 con detalle.
- D: 95,65 SEK (cierre 9-oct; el 12-oct en sesión). BCE 9-oct 11,1675 SEK/EUR → 8,565 EUR. Bund 3,53 %. Beta SEK 0,17 (inservible); EUR vs STOXX 600: 0,53 mensual 5a, 0,81 semanal 5a (0,87 ajustada). Consenso 3 analistas, todos Mantener, PO 95 SEK. Cortos 3,33 %.
- E: tono dividido y en mejora; Turquía/cliente B2B, cortos, dividendo, Brasil.

## Integración, cálculo y valoración
- D.json venía con mojibake (UTF-8 leído como cp1252: «NÃºcleo» en huecos.tipo, 186 casos); arreglado con un script en %TEMP% (copia de seguridad allí). Calidad.comentario de A traía una nota de trabajo; reescrita con la lectura de Altman 4,18 / Piotroski 6 / Beneish −2,72.
- Brasil: MP de 25-sep-2026 prohíbe las apuestas online (sin depósitos desde la publicación, fuera de línea el 6-oct, autorizaciones revocadas el 25-oct); Betsson tenía 13 empleados de media en Brasil en 2025: exposición pequeña, pero precedente de riesgo binario en Latinoamérica (27 % de los ingresos).
- Puente (30-jun-26): bonos 173,6, arrendamientos 23,2, caja 310,0, minoritarios 59 (estimación de D por múltiplo de su beneficio; contable −14,2), otros ajustes 118,9 = Rhino 64,5 (cerrada 3-ago) + saldos de clientes 54,4 (tratados como deuda; no están en el circulante del DCF). Deuda neta ajustada 6 M.
- WACC 9,52 %: Bund 3,53 %, beta 0,87 (ajustada semanal 5 años, acción en EUR frente al STOXX 600), prima 5,5 % + 2,0 % adicional (24 % de ingresos sin licencia local, Latinoamérica). Terminal: media de Gordon 2,0 % y 6,5x (Gordon solo implicaba 7,5x, por encima de 4,9-5,7x histórico).
- Proyección ≈ 3 % por debajo del consenso (2026e fijo: +4,0 %, margen 19,0 %). DCF 14,93 EUR; inverso: −9,1 % anual (base +4,5 %), rentabilidad implícita 17,6 %. Bajista con perfil (2027e −28 pp de crecimiento y −6 pp de margen: pérdida del 24 % sin licencia) = 7,07 (−17,5 %).
- Valor objetivo 13,76 EUR (153,66 SEK), +60,7 %, rentabilidad total 68,4 %. Regla: Comprar (absoluta y relativa). Convicción sugerida Alta; bajada a Media (múltiplo histórico 4,9-5,7x, cifras = consenso, riesgo regulatorio binario).
- Word (58 págs., 28 gráficos, cobertura 94,1 %) y PDF generados; 18 de 21 controles correctos y 3 explicados.

## Lecciones nuevas
- **Subagentes con mojibake**: una nota puede llegar con texto UTF-8 releído como cp1252 («NÃºcleo», «â€”»). `integrar` no lo detecta y el tipo de hueco «NÃºcleo» rompe la clasificación. Convendría que `integrar.mjs` avise de «Ã»/«Â» en cadenas y que los subagentes escriban siempre con Write.
- **Operadores de juego con fondos de clientes**: los saldos de jugadores van en «otros pasivos corrientes», fuera del circulante comercial; tratarlos como deuda en el puente (`otros_ajustes`) y no restar a la vez los cobros pendientes de PSP (ya en clientes). La deuda neta publicada de Betsson mezcla ambos (resta el 90 % de los cobros a PSP).
- **Precio que descuenta contracción con cifras = consenso**: el motor sugiere convicción Alta, pero si el múltiplo histórico de la empresa lleva años en el nivel actual, la convergencia depende de una revalorización sin precedente: bajar a Media y decirlo.
- **Terminal Gordon frente al múltiplo histórico**: con empresas que siempre han cotizado baratas (Betsson 4,9-5,7x), Gordon implica un múltiplo de salida muy superior (7,5x); usar `media` con la mediana de comparables modera el valor un 4-5 %.
- 2026-10-14: datos-v2.json y «Betsson - 2026-10-12 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: sin objetivo a 12 m.
