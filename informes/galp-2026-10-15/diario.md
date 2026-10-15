# Diario · Galp Energia (GALP.LS) · 15-oct-2026

- Commit de partida: 70ba47e. Encargo del coordinador (sector energético: Brasil, Namibia, Sines; guerra de Irán y Ormuz). Sin commits ni pull por parte de este análisis; sin subagentes.
- Entorno: nube de Claude Code. Cuentas: XBRL ESEF 2020-2024 (`cuentas.mjs --esef`, LEI 2138003319Y7NM75FG53; no trae 2025) + cuentas consolidadas 2025 + informes 4T22, 4T24, 1T26, 1S26 y avance del 3T26 (12-oct). Precio y cierres con `bolsa.mjs` (GALP.LS frente a EXSA.DE y EXH1.DE). Bund 3,42 % (Bundesbank, 15-oct). Brent y futuros con `movimiento.mjs` (BZ=F 106 USD; dic-27 85,6; dic-28 77,6). Consenso y comparables de MarketScreener (WebFetch).
- Fecha de corte 2026-10-15; precio 22,65 EUR (cierre del 15-oct; Lisboa ya había cerrado). Divisa EUR; ejercicio natural; NIIF-UE. Notas A-E con `notas/construir-notas.mjs`; propio = `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Decisiones: (1) base RCA: EBITDA del motor = RCA (diferencia con IFRS en `no_recurrentes_en_ebitda`), BPA de la proyección y de la historia del PER en RCA (457/881/1.002/961/1.154 M de 2021-2025). (2) 2026e fijo (+30,2 %, margen 18,9 %, EBITDA ~4.800 M frente a 4.735 M del consenso); 2027-2028 −10 % anual con la curva de futuros. (3) Minoritarios del puente a valor económico (1.800 M, 30 % de Sinopec en Petrogal Brasil) en vez del contable (933 M). (4) Beta 0,9 (la de Yahoo frente al Stoxx 600 sale −0,07 mensual: la petrolera sube cuando cae el mercado en la guerra) + 1,5 puntos de prima por Brasil y Namibia; WACC 8,81 %. (5) Historia del PER sin 2025 (BPA 2026 de guerra). (6) Namibia solo en la suma de partes (1.500 M, opción con riesgo). (7) Transacciones y sentimiento a null con sus tres intentos.
- Resultado: DCF 19,90; valor intrínseco 18,65 (−17,7 %); con la prima del mercado 21,56. DCF inverso: 0,3 % de crecimiento frente a −1,9 % del base; margen 17,7 % frente a 16,5 %.
- **Línea 12 m (v3 ×1,1, selector sin marcas)**: objetivo 19,76 EUR; ponderada −10,0 %, base −12,3 % → **Mantener**, convicción baja (absoluta Vender, relativa Mantener). v2: −4,4 % / −10,8 %. Comprar < 17,73; Vender > 22,66. Robustez: SÓLIDA, acción robusta «No mantener»; límite robusto 16,01 EUR; BPA −10 %: −18,7 % / −20,9 % (Vender). Calidad: ROIC 18,6 − WACC 8,81 = +9,8; sostenibilidad «Sí».
- Regla 13: veredicto «no cambia». Próximos resultados: 26-oct-2026.
- Word y PDF (soffice, 38 páginas): 18 de 21 controles correctos y 3 explicados (tipo impositivo por SPT y CESE). Cobertura 79,7 %. Confianza media.
- `apuntar-12m.mjs --simular`: v3 −10 % / −12,3 % → Mantener (no escrito).

## Lecciones

- Galp: `cuentas.mjs --esef` solo llega a 2024 en octubre de 2026; 2025 sale del PDF de cuentas consolidadas (IMR2025). Las URL de Galp cambian de patrón por trimestre (`Inv%202Q26/2Q26%20Report.pdf`, `Inv_3Q26/Trading%20Update_3Q26.pdf`, `Inv_4Q24/Galp_4Q24.pdf`).
- Petroleras en un pico de guerra: la beta de Yahoo frente a un índice amplio sale negativa o casi nula; usar una beta de sector. Excluir de la historia adelantada del PER el último cierre si el BPA del año siguiente es una prima de guerra imprevisible.
- Brent y su curva de futuros salen de Yahoo con `movimiento.mjs BZ=F` y `BZZ27.NYM`, `BZZ28.NYM`: sirven para anclar la normalización del caso base.
- Sociedades con un minoritario grande en el activo principal (Sinopec 30 % en Petrogal Brasil): el contable del puente infravalora a los minoritarios; valorarlos por su beneficio.
