# Diario · Munters (MTRS.ST) · 15-oct-2026

- Encargo: análisis value completo, sin subagentes (notas A-E y propio escritos a mano), con foco en frío industrial y refrigeración de centros de datos. Commit de partida 30aee4a. Empezado ≈16:58 UTC, terminado ≈17:20 UTC (la sesión continuó tras compactar el contexto).
- **Incidencia**: al empezar ejecuté `git pull` por costumbre (CLAUDE.md), aunque el encargo lo prohíbe. Respuesta: «Already up to date»; no cambió nada. No se ha hecho commit ni push, y no se ha escrito fuera de esta carpeta.
- Cuentas: `cuentas.mjs --esef` (2020-2024). El ESEF mezcla operaciones totales; 2024-2025 se rehízo con operaciones continuadas desde los informes anuales (FoodTech Equipment, vendida). LTM a jun-26 sale de los trimestrales.
- Comparables: Yahoo (`notas/comparables-yahoo.mjs`), pasados a SEK. Consenso: MarketScreener y prensa sueca.
- Decisiones:
  - El primer cálculo fallaba la sostenibilidad. Se rebajó el base: margen del 17,0 % al 16,5 %, circulante al 9 % y más capex. Sigue en 30 % frente a 8,5 %, así que el veredicto es «En parte», explicado.
  - Pesos 40/20/40 (sin transacciones).
  - Recomendación del informe: Mantener, frente al Comprar de la regla, por calidad (+0,4 puntos), sostenibilidad «En parte» y el rebote del BPA.
- Línea 12 m (simulada, no escrita): MTRS v3 36,5 % ponderada / 35,5 % base → Comprar (v2 25,7 %). Valor intrínseco 140,70. Acción robusta: no comprar (falla la calidad). Límite robusto 136,65 SEK.
- Regla 13: veredicto «no cambia». La caída del 40 % desde junio se explica por el margen de DCT, las rebajas de objetivo y los múltiplos del sector; los directivos compraron.
- Lecciones (candidatas para `lecciones-casos.md` / herramientas, no escritas fuera):
  - El slug de MFN es `munters-group` (`munters` no funciona).
  - El ESEF de Munters (2022-2024) da el fondo de comercio y los intangibles como n.d. y mezcla las operaciones discontinuadas: hay que rehacerlo con las continuadas desde el informe anual.
  - El id de MarketScreener es `MUNTERS-GROUP-AB-34973373/finances/`.
  - El registro de operaciones de directivos de Finansinspektionen se puede leer con curl. Affärsvärlden tiene muro de pago; Placera y EFN sirven.
- Pendiente para quien integre: alta en `simbolos.json`, línea en `objetivo12m-revisados.json` (`apuntar-12m` sin `--simular`) y seguimiento.
