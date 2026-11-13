# Diario — Intercontinental Exchange (ICE), corte 2026-11-13

- Inicio: 2026-11-13 16:10 (hora de Madrid).
- Commit del repo al empezar: 154a068 Tanda 13-nov: cobertura y seguimiento rehechos tras el escáner.
- Prompt: verticales/empresa/prompt.md de ese commit (no se cambia a mitad).
- Petición: Hotis (13-nov, 16:09 Madrid): «Vendo ice pues - rehaz informe primero, ha crecido mucho en el pasado». Análisis value completo nuevo antes de vender, respondiendo a la objeción del crecimiento pasado.
- Iteración nueva (cuarta: 8-oct, 28-oct, 9-nov, 13-nov). Carpeta nueva; la del 9-nov no se toca. Fases 2-4 hechas por mí, sin subagentes: el 3T26 ya se investigó a fondo el 9-nov (transcripción, 10-Q, comparables cifra a cifra) y entre el 9 y el 13-nov ICE no ha publicado nada más que formularios 4 y 144. Notas A-E del 9-nov como punto de partida, revisadas contra lo publicado desde entonces.

## Fase 1 — Identificación
- Intercontinental Exchange, Inc., NYSE: ICE. ISIN US45866F1049. CIK 0001571949. USD, ejercicio natural, US GAAP. Ticker y clave igual (ICE).
- Precio: cierre del jueves 12-nov-2026, 177,86 USD (bolsa.mjs y movimiento.mjs); el 13-nov a las 16:10 Nueva York no ha abierto. +3,2 % desde el 9-nov (172,27). Máximo de 52 semanas el 12-nov (181,38 en la sesión). Hoy a las 16:20 cotiza a 179,34.
- Próximos resultados: 4T26 el 4-feb-2027.

## Tiempos (hora de Madrid)
- 16:10 git pull, lectura de analiza-empresa.md, CLAUDE.md, diario del 9-nov. Carpeta nueva y notas del 9-nov copiadas como punto de partida.
- 16:11 cuentas.mjs --sec ICE (XBRL 2016-2025 vueltas a bajar, sin cambios); bolsa.mjs (SPY y XLF, corte 12-nov); movimiento.mjs ICE (13-nov); form4.mjs desde 13-nov-2025 (96 presentaciones, 95,2 M USD vendidos, ninguna compra).
- 16:12 EDGAR: presentaciones desde el 28-oct (solo 10-Q y 8-K del 3T26 el 29-oct; después, formularios 4 y 144 hasta el 12-nov). noticias.mjs ICE 15 días: mercado de acciones tokenizadas con OKX (12-nov), futuros de viento, artículos de Seeking Alpha y Simply Wall St; nada de gravedad alta.
- 16:13 Yahoo quoteSummary (13-nov): BPA 2026e 8,19 y 2027e 8,93; objetivo medio 193,53 (167-245); sin cambios de recomendación desde el 30-oct. Tesoro a 10 años: 5,10 % el 12-nov (4,86 % el 6-nov). Cierres del 12-nov de los nueve comparables y EUR/USD y GBP/USD (Yahoo).
- 16:14 comparables-2026-11-12.json (múltiplos llevados al precio del 12-nov con la deuda neta fija; mediana PER 23,4x → 24,1x). supuestos.mjs (WACC: Rf 5,10 %, beta 0,89, Kd 5,9 %, deuda 16 %) y propio.mjs.
- 16:15 integrar y calcular (19 de 20 controles y 1 explicado: R² 0,15); apuntar-12m; robustez.
- 16:15-16:18 Estudio de crecimiento frente a rendimiento del capital con el XBRL (2016-2025) y los segmentos; textos.mjs, resumen.mjs y E.json reescritos con las cifras nuevas; sección `rentabilidad` nueva con la respuesta a «ha crecido mucho».
- 16:18 Word (28 gráficos, cobertura 93,5 %; único aviso: ESG sin calificaciones) y PDF con soffice. revision-12m-2026-11-13.md.
- 16:20 simbolos.json → ice-2026-11-13; apuntar-12m --precios; comprobar.mjs: 0 errores; cobertura --arreglar; seguimiento.mjs.

## Qué ha cambiado frente al 9-nov
- Negocio y BPA: nada (sin publicaciones nuevas de ICE). Mismos supuestos de ventas, márgenes, inversión, BPA y escenarios.
- Mercado: precio +3,2 %; bono a 10 años +24 pb → WACC 8,43 % → 8,74 %; comparables +2-4 %.
- Consenso: objetivo medio 192,20 → 193,53; recomendaciones 4 compras fuertes, 8 compras, 3 mantener y 1 venta.
- Directivos: 94,1 → 95,2 M USD de ventas en 12 meses (formularios 4 del 12-nov).
- Nuevo hecho: ICE y OKX lanzan un mercado de acciones tokenizadas (12-nov). Veredicto regla 13: no cambia.

## Crecimiento frente a rendimiento del capital (objeción de Hotis)
- Ingresos netos 4.499 M (2016) → 9.931 M (2025): +9,2 % anual. BPA ajustado 3,88 (2019) → 6,95 (2025): +10,2 % anual. BPA GAAP 2,39 → 5,77.
- Compras en caja 2016-2025 (XBRL): 22.272 M USD (Ellie Mae 9.446 M en 2020; Black Knight 10.198 M en 2023, unos 11.800 M con acciones). Fondo de comercio 12.291 → 30.646 M; con intangibles adquiridos, 46.000 M, el 96 % del capital invertido.
- Tecnología hipotecaria: unos 2.100 M de los 5.432 M de ingresos añadidos; resultado operativo 14 M en 2025 (859 M ajustado) → ≈ 3 % después de impuestos sobre lo pagado.
- Bolsas: resultado operativo 2.523 → 3.982 M (2021-2025, +12 % anual), margen 74 %, sin compras grandes.
- ROIC del motor 7,0-8,2 % en 2021-2025 (8,1 % en 2025) frente a WACC 8,74 %; sin fondo de comercio, 22,3 %; ROIC incremental 11,5 %. A mano con LTM ajustado y balance de sep-26: 9,1 %. Todas por debajo de WACC + 4,5.

## Decisiones
- Recomendación del informe = la de la regla: Mantener, convicción Baja (para quien no la tiene). La señal para quien la tiene sale de robustez.mjs: Vender.

## Resultado
- DCF 163,50 USD (−8,1 %); valor intrínseco (síntesis) 174,93 (−1,6 %); DCF inverso 5,8 % de crecimiento, rentabilidad implícita 8,3 %. Escenarios 111,11 / 163,50 / 205,35 (asimetría 0,41).
- **Línea 12 m**: objetivo ponderado 190,02 USD → **+7,9 %** (base 194,06 → **+10,2 %**); bajista 135,79, alcista 236,18; v2 de control 10,1 % (base 8,1 %). Regla: **Mantener**. Comprar por debajo de 166,94; banda Vender por encima de 213,31.
- robustez.mjs: **FRÁGIL**; senal_cartera **Vender (no pasa el filtro de mantener con la regla vigente)**; calidad tampoco (ROIC − WACC −0,6 < 4,5); accion_robusta **No comprar**; sin nivel de compra; limite_mantener_cot **174,52 USD**; sin colchón de BPA; límite robusto 150,47.
- Fin: 16:21 (hora de Madrid).
