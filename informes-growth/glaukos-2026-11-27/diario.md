# Diario GKOS growth 2026-11-27

Commit de partida: 35e7572

- 27-11 10:56 Inicio. Leídos encargo.md, analiza-growth.md, metodo.md, plantilla.md, regla 15 y robustez growth. Punto de partida: informe growth del 14-oct.
- 27-11 10:57 movimiento.mjs GKOS: 259,90 USD (cierre 25-nov; 26-nov festivo en EE. UU.), 1 m +43,5 %, 12 m +165 % (base 24-nov-2025), máximo de 52 semanas; P1 y P2. cuentas.mjs --sec GKOS → notas/cuentas-xbrl.json (anuales 2016-2025).
- 27-11 10:59 EDGAR: 8-K del 28-oct (ex. 99.1 nota de prensa y 99.2 Quarterly Summary del 3T26), 10-Q del 3T26 (28-oct), 8-K del 6-nov (presentación de noviembre), Formularios 4 desde el 29-oct. XBRL trimestral (ventas, coste de ventas, pagos en acciones, resultado operativo). Comprobado: ventas 3T26 211,0 M (+58 %), guía 2026 775-785 M y guía preliminar 2027 de 1.000 M (nota de prensa, Quarterly Summary y transcripción).
- 27-11 11:03 Yahoo (consenso, comparables, diario), Nasdaq (segunda fuente de precio), transcripción del 3T26 (TradingKey), Jefferies Londres (18-nov), S&P (paso al MidCap 400 el 4-nov), StockTwits; presentación de marzo de 2026 para el mercado (Market Scope).
- 27-11 11:04 datos.json escrito (con `cualitativo` y `contexto_mercado`) y motor v11: 83/100, 6/8, EV/ventas NTM 16,3, EV/beneficio bruto 20,1, ponderada −13,6 %, base −11,9 %, bajista −57,1 %, alcista +26,5 %, objetivo 224,6 → Vender (ponderada ≤ −10 %); compra hasta 213,9. Sin alertas ni avisos. Euforia en el filo: subida 149,1 % de cierre a cierre (165 % con la base de movimiento.mjs).
- 27-11 11:05 robustez-growth --precios (flock): FRÁGIL, señal robusta Vender (v7 daría Mantener, +1,3 %); G2, G5, G6, G8, P1, P2; sin CORREGIR. Regla 15: ponderada −13,6 % < 25 %; 3 años +22,1 % pero el DCF inverso (23,6 %) > crecimiento final (22 %); cociente −13,6/57,1 = −0,24 < 0,75 → Esperar. Límite = mín(213,9; 224,6/1,25 = 179,7; (224,6 + 0,75 × 111,4)/1,75 = 176,1) = 176,10 USD.
- 27-11 11:07 informe.md, Word y PDF (pandoc + soffice). comprobar.mjs: 3 errores de otras carpetas (ASML, ASPEED, cartera), ninguno de esta.

## Pasos y fecha de sus datos
1. Precio y movimiento: cierre del 25-nov-2026 (Yahoo y Nasdaq; 26-nov festivo).
2. Cuentas: 10-Q y 8-K del 3T26 (28-oct-2026; datos a 30-sep-2026); XBRL anual hasta 2025.
3. Guía: nota de prensa y Quarterly Summary del 28-oct-2026; transcripción del 28-oct; Jefferies 18-nov.
4. Consenso, objetivos, cortos y comparables: Yahoo, 27-nov-2026.
5. Directivos: Formularios 4 hasta el 25-nov-2026.
6. Foros: StockTwits 27-nov-2026.
7. Mercado alcanzable: presentación de marzo de 2026 (Market Scope 2024) y WAC de iDose de feb-2024.
