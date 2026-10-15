# Diario · Genmab · 15-oct-2026

- Commit de partida: 70ba47e. Inicio 16:39 UTC, fin ≈17:05 UTC. Sin subagentes: lo he hecho yo solo, según el encargo.
- Precio: cierre del 15-oct en Copenhague (2.529 DKK, Yahoo GMAB.CO vía bolsa.mjs). Cambio BCE del 15-oct: 6,6693 DKK/USD. Cuentas en USD (moneda de presentación desde 2025).
- robustez.mjs da el aviso D3 (no hay cierre en precios.json) porque el encargo no deja escribir simbolos.json ni precios.json: el precio sale de notas/bolsa.json.

## Decisiones
- BPA del objetivo a 12 meses = media de 2028e-2030e (no el 2028e solo): la patente de daratumumab en EE. UU. caduca en 2029 y el 2028 sería el pico. Con 2028e solo (23,14) el objetivo base subiría a ≈583 USD y saldría un Comprar artificial.
- DCF en USD, con una caducidad explícita (−13 % en 2029, −2 % en 2031) y márgenes que se recuperan con productos propios (Epkinly, Rina-S, petosemtamab). Sin prima adicional. Pesos: DCF 50, comparables 10, escenarios 40. Suma de partes: no aplica.
- Convicción Baja (el motor sugería Media): el valor intrínseco y el objetivo a 12 meses se separan 76 puntos y el control v2 da solo un 7 %.
- Sostenibilidad «En parte» (el motor decía «Sí»): las regalías son el negocio demostrado y caducan; lo que las sustituye depende de fases 3 abiertas.

## Lecciones (para lecciones.md / lecciones-casos.md; no escritas allí por el encargo)
- Caso contable/sector (lecciones-casos): en farmacéuticas con un precipicio de patentes dentro de los 3 años del objetivo, normalizar el BPA de los 12 meses con la media del año objetivo y los dos siguientes, y decirlo en la métrica.
- Herramienta (lecciones): `cuentas.mjs --sec GMAB` mezcla DKK (hasta 2019-2022) y USD (desde 2023) en la misma serie cuando una empresa cambia de moneda de presentación. Hay que rehacer las series con las cifras clave en USD del ESEF (dan 5 años) o del XBRL del 20-F.
- Herramienta: los 6-K de EDGAR descargan solo la portada. Los anexos (ex99) se sacan del `index.json` de la carpeta del filing.
- Companyfacts: para cifras anuales hay que filtrar duraciones de más de 350 días (si no, coge trimestres).
- MarketScreener: comprobar que el ID corresponde a la empresa (el primero era Componenta). Genmab = GENMAB-A-S-447532.
- La web de inversores de Genmab da 403. Sirven los 6-K y el ESEF.
