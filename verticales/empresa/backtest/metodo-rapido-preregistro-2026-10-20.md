# Backtest del método value rápido · protocolo fijado antes de mirar datos (2026-10-20)

Estudio pedido por el usuario el 20-oct. **No cambia el método vigente.** Diseño aprobado con un cambio: la decisión se toma 1 día hábil después de publicar las cuentas.

## Fórmula rápida (la de backtest-comun.mjs con fecha de decisión real)
- g = mediana de los crecimientos anuales del BPA conocidos el día de la decisión, acotada a [−10 %, +25 %] (BPA ingenuo).
- BPA1 = BPA último × (1+g); BPA2 = BPA1 × (1+g). PER de hoy = precio de decisión ÷ BPA1.
- Historia del PER: precio al cierre de cada ejercicio y ≤ t ÷ BPA y+1 (adelantado) o ÷ BPA y (cierre), 5 últimos años, solo con cifras publicadas antes de la decisión.
- v3 tope ×1,1, v2 y selector como en backtest-comun.mjs. Objetivo = PER × BPA2 + dividendo (DPA de los últimos 12 meses).
- Comprar = ponderada ≥ 15 y base ≥ 12. Mantener = ponderada ≥ 10 y base ≥ 5.

## Datos
- Conjunto US: S&P 500 + S&P 400 de hoy (Wikipedia). BPA diluido anual de la SEC (companyfacts, 10-K), con la cifra y la fecha del primer 10-K que la publica; ajuste por *splits* posteriores con los de Yahoo. Decisión = fecha de presentación del 10-K + 1 día hábil, precio de cierre de ese día. Ejercicios 2012-2024 (el de 2024 aún tiene 12 m).
- Conjunto «nuestras»: las empresas de informes/ (backtest-comun.mjs), decisión = cierre del ejercicio + 3 meses + 1 día hábil, precio de Yahoo de ese día.
- Rentabilidad = total a 12 meses (cierre ajustado de Yahoo, con dividendos) desde la decisión. Índice: SPY (EE. UU.); para «nuestras», el índice del mercado (S&P 500, Stoxx 600 vía EXSA.DE, FTSE 100 vía ISF.L, Nikkei, Hang Seng, KOSPI...). Exceso = empresa − índice.

## Calidad con fecha (solo US)
- ROIC = EBIT × (1 − 21 %) ÷ (patrimonio + deuda − caja) del último 10-K. Calidad completa = ROIC − 8 % ≥ 5 en el último año y en los dos anteriores (sustituto de «sostenibilidad Sí»). Aflojada = ROIC − 8 % ≥ 5 solo en el último año, o ≥ 4,5 los tres. Sin datos = desconocida.

## Grupos (excluyentes, en este orden)
- Números A = selector, v2 y las dos con BPA2 × 0,9 dan Comprar. Números B = selector Comprar; v2 y BPA −10 % al menos Mantener.
- A = números A + calidad completa. B1 = números B + calidad completa. B2 = números A + calidad aflojada. C = números B + calidad aflojada.
- «Compra sin calidad» = números A o B con calidad que falla o desconocida.
- Mantener = no es compra y pasa Mantener. Vender = el resto.
- En «nuestras» no hay calidad con fecha: solo números A, números B, Mantener y Vender.

## Medidas
n, media, mediana, exceso medio y mediano frente al índice, % que bate al índice, % ≥ +15 %, % < −10 %. Por año y por mitades.

## Validación
- Por empresas: tickers alternos (orden alfabético) diseño/validación.
- Por tiempo: decisiones de 2012-2018 (ajuste) frente a 2019-2025 (validación).
- Una mejora se da por buena solo si su exceso mediano supera al de la regla vigente en la validación por empresas Y en la de tiempo, y no sube el % < −10 % más de 3 puntos.

## Mejoras (fijas)
1. Umbral 20/15 y 10/8 frente a 15/12.
2. Tope del múltiplo ×1,0 y ×1,2 frente a ×1,1.
3. g acotado a +15 %.
4. Calidad completa exigida frente a no exigirla (números A).
5. Clasificar: el 20 % con mayor ponderada cada año.
6. ¿Vender sirve?: exceso de Vender frente a Mantener.

## Límites conocidos
Sesgo de supervivencia (listas de hoy): cifras absolutas infladas; vale la comparación entre grupos. Las «nuestras» las elegimos porque hoy nos gustan. Sostenibilidad no reconstruible. Decisión anual.
