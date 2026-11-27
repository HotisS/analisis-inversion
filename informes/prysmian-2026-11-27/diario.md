# Diario · Prysmian (PRY.MI) · 27-nov-2026

- Commit de partida: 3d983a2 («Escáner 27-nov 9:00: revisiones y señales»). Encargo del hilo principal (tanda 1127): está a ≈1,2 % de su nivel B y el 3T26 no estaba en el informe. Sin subagentes; sin git ni escrituras fuera de la carpeta (temporales en /tmp/claude-0/tanda-1127/prysmian/).
- Horas (Madrid): inicio 09:57 · notas A-E 10:06 · textos y cálculo 10:17 · Word y PDF 10:21 · robustez y apuntar-12m 10:22 · revisión, diario y comprobar.mjs (sin errores en la carpeta) 10:23.

## Pasos y fecha de los datos
1. Documentos del 3T26 (nota de prensa, presentación, informe de 9M de 105 páginas, transcripción): publicados el 29-oct-2026 (no el 30-oct del encargo).
2. Cuentas ESEF (`cuentas.mjs --esef`): 2021-2024 (2025 sigue sin estar); 2025 y 9M26 de las notas de prensa e informes.
3. Bolsa (`bolsa.mjs --corte 2026-11-26`, FTSEMIB.MI y EXH4.DE): cierre del 26-nov, 99,24 EUR; `movimiento.mjs` al 26-nov.
4. Consenso MarketScreener del 25-nov (21 analistas, objetivo 151,76); Yahoo quoteSummary de comparables del 25-27-nov.
5. Bund 3,32 % (26-nov); tipos BCE del 26-nov (USD 1,0975; JPY 174,79; DKK 7,4737); prima implícita de Damodaran de noviembre de 2026 (4,41 %).
6. Prensa y sentimiento (Teleborsa, Milano Finanza, Il Sole 24 Ore, Seeking Alpha, Stocktwits): 29-oct a 26-nov.
7. Cálculo (20 de 20 controles), Word (5 avisos, los mismos que el 15-oct; cobertura 88,1 %) y PDF: 27-nov.
8. Robustez (también `--actual`, con flock) y `apuntar-12m --precios` (con flock): precio del 26-nov.

## Decisiones
- Atkore se cerró el 19-oct, después del balance del 30-sep: su EV (3.800 M USD = 3.462 M EUR) va como capex de 2027e (17,1 % = 4,8 + 12,3) y la diferencia de descuento por pagarla en oct-2026 y no a mitad de 2027 (≈145 M) va a otros_ajustes (1.197 = híbrido 1.000 + Xtera 52 + 145). Comprobado: valor por acción igual que con la compra en el puente (114,96 frente a 114,97), y la prueba de sostenibilidad ve el coste (con la compra en el puente fallaba: el capital nuevo «rendía» un 40,2 %; así, 20,7 % frente a 18,5 % → «Sí»).
- `base_bpa: 'publicado'` en la historia del PER (BPA diluido publicado; 2025 sin YOFC); 2026e con el propio (3,20 de 9M26 + 4T26e).
- Comparables rehechos con Yahoo (precio, EV y EBITDA del mismo proveedor). NKT da BPA y EBITDA en EUR con el precio en DKK: convertido. La mediana del PER cae de 22,7x a 14,2x.
- capitalizacion_publicada a null: la de Yahoo (30.750 M) es a precio de la sesión (102,75), no al cierre del 26-nov.
- Sentimiento: sin fuente para un comentario de Morningstar tras resultados, se quita.
- Regla 13: veredicto «no cambia» (caídas de −5 % a −8 % del 22-oct, 4-nov, 20-nov, 24-nov y 25-nov con la venta de valores de IA, sin noticia propia; el día de resultados +6,6 %). Aviso P5.

## Revisión a 12 meses
- v3 ponderada 17,7 % / base 20,4 % → Comprar (v2 18,9 % / 13,6 %), objetivo 115,93 EUR; valor intrínseco 109,76. Robustez SÓLIDA, si la tienes Mantener, compra no robusta (B1: BPA −10 % → 6,0 %/8,5 %). Nivel hoy: ninguno; A 91,54, B 95,71; filtro de mantener 106,20. apuntar-12m: Mantener 12,6 % (109,40) → Comprar 17,7 % (99,24).
