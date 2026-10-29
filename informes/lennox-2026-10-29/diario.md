# Diario · Lennox (LII) · 2026-10-29 (hora de Madrid)

Encargo del escáner de la mañana: análisis completo nuevo tras el 3T26 del 28-oct (guía de BPA ajustado 2026 recortada a 21,00-21,50 USD). Repo al empezar: 87d22eb.

## Pasos
- 9:39 Carpeta nueva; cuentas XBRL de la SEC (`cuentas.mjs --sec LII`, 2016-2025); `bolsa.mjs` (SPY, XLI): cierre del 28-oct, 332,64 USD (la sesión del 29 no había abierto); `movimiento.mjs LII`.
- 9:40 Cinco notas en paralelo (A cuentas, B sector, C gobierno, D mercado y valoración, E sentimiento), partiendo de las del 15-oct y comprobando cada cifra en EDGAR.
- 9:42-9:53 Notas terminadas (E, C, A, D y B por ese orden).
- 9:50-9:53 Propio y textos; integrar y calcular: Comprar / Comprar, controles 20/21 con 1 explicado.
- 9:54 Word (cobertura 90 %), PDF, `apuntar-12m --precios`, robustez y `comprobar.mjs` (0 errores; corregido simbolos.json, que apuntaba a la carpeta del 15-oct).

## Decisiones
- DCF, puente y objetivo a 12 meses de la nota D. Bajista −3 pp de crecimiento y −2 pp de margen, terminal 2,5 %; alcista +1,5 y +1; 25/50/25.
- Historia del PER y casos en BPA ajustado de la empresa (los dos de las notas de resultados de EDGAR). El de 2023 es el publicado con LIFO; el de 2026e incluye una devolución de aranceles de ≈0,65 USD que la empresa no ajusta.
- **Veredicto de precio y noticias: «no cambia»**, no «retrasa» como proponía D. Las razones de D (esperar a que el consenso recoja la guía, la guía 2027 de enero o dos semanas sin mínimos) son esperar a resultados o a momentum, que el método descarta para las compras (regla del usuario del 15-oct; robustez.md C1: «los resultados cercanos no son motivo»). El hecho que movió el precio ya está en el informe.
- Pesos DCF 50 / escenarios 35 / comparables 15 (rivales con prima de centros de datos).

## Resultado
- Comprar, convicción baja (la regla absoluta da Mantener y la relativa Comprar). v3 24,7 % / base 20,8 %; v2 13,1 %; BPA −10 % 12,4 %. Valor intrínseco 345,33. Robustez FRÁGIL; acción robusta No comprar; **nivel B1** (hasta 340,08); A por debajo de 323,62. Filtro de mantener 377,17.
- Revisión a 12 meses en `revision-12m-2026-10-29.md`; apuntada con `apuntar-12m.mjs --precios` (20,7 % a 357,73 → 24,7 % a 332,64).
