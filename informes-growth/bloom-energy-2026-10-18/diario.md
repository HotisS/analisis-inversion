# Diario: Bloom Energy (growth, 18-oct-2026)

- No había informe previo de Bloom en informes/ ni en informes-growth/ (comprobado). No se hizo git pull (encargo).
- Precio: cierre del viernes 16-oct-2026, 221,31 USD (Yahoo vía movimiento.mjs; Gotrade da el mismo cierre).
- Símbolo de Yahoo: BE. Próximos resultados: 22-oct-2026 tras el cierre (nota de prensa de Bloom del 12-oct-2026).
- Cuentas: SEC (8-K de resultados 1T y 2T26, 10-Q/A del 2T26, companyfacts para 2023-2025). Ventas 12 m a jun-2026: 3.113,2 M (+91,0 %); a jun-2024: 1.328,3 M (CAGR 2 años 53,1 %).
- Acciones: 323,3 M = diluidas del 2T26 (incluyen el 0 % convertible 2030 como si se convirtiera: 2.500 M a 194,97 USD = 12,8 M de acciones, en dinero a 221 USD). Por eso la deuda NO incluye los convertibles (2.448 M de valor contable): deuda = obligaciones de financiación 206,5 + deuda sin recurso 2,6 + con recurso a corto 4,7 = 213,8 M. Si el precio cae por debajo de 195, el convertible vuelve a ser deuda (2.500 M ≈ 12,8 M × 195): casi el mismo valor, el resultado apenas cambia.
- Dilución 8,3 %: diluidas del 2T26 (323,3 M) frente a totalmente diluidas del 2T25 (232,5 básicas + 59,2 convertibles + 6,8 opciones = 298,5 M, 10-Q). La mayor parte es el convertible de nov-2025 (2.500 M cobrados) y el warrant de Oracle. La dilución futura sin ampliaciones sería menor (pagos en acciones ≈ 5,5 % de las ventas, < 1 % de la capitalización al año): el motor aplica la pasada (regla), y es prudente.
- Margen bruto: 32,0 % GAAP del 1S26 (no el no GAAP del 34 % de la guía).
- Clientes: un solo cliente 73 % de las ventas del 2T26; dos clientes 44 % y 21 % del 1S26 (el segundo, parte vinculada: las JV de Brookfield). Probabilidades 35/50/15 (un solo producto y concentración extrema).
- Ventas a jun-2028 del analista (bajista 5.500 / base 7.500 / alcista 9.500): base algo por debajo del consenso de esa ventana (≈ 8.330 M = media de 2027, 6.810, y 2028, ≈ 9.850). Capacidad: 2 GW a final de 2026 (10-K); cada GW más, 6-9 meses y 100-150 M de inversión.
- Múltiplos EV/ventas NTM históricos: cálculo propio semanal con precio de Yahoo, ventas reales de los 4 trimestres siguientes (y consenso desde el 3T26), acciones y deuda neta aproximadas: mediana 3 años 2,7x, mínimo 1,4x (oct-2024), mínimo de 12 meses 6,4x (dic-2025), hoy ≈ 12,9x. Comparables: estimación propia aproximada.
- Ventas de directivos: suma propia de los Form 4 de 12 meses: 165 M USD vendidos, 0 comprados.
- Foros: Reddit no se puede leer desde la nube (bloqueado); StockTwits sí (14-17 oct); Rankia sin hilo encontrado.

## Lecciones (para quien integre)
- Convertibles en dinero: si las acciones diluidas ya los cuentan (if-converted), la deuda no debe incluirlos. Vale la pena un campo explícito en datos.json (`convertibles_en_acciones: true`) para que el motor no lo deje al criterio de cada analista.
- La dilución pasada mezcla ampliaciones ya cobradas (convertible de 2.500 M en caja) con la dilución recurrente; el motor v11 la aplica entera al año siguiente (es lo que corrige la candidata v14 con `dilucion_esperada_pct`).

## Resultado
- Motor v11: 76,2/100, 5/8 señales, ponderada −15,5 %, base −3,0 %, bajista −58,7 %, alcista +43,6 % → Vender / no comprar; compra hasta 178,10 USD; EV/beneficio bruto NTM 40,4 (> 35). Alertas: múltiplo > 2 × mediana 3 años, exceso sobre la guía 18,6 pp, dos clientes 65 %.
- robustez-growth --precios: FRÁGIL; señal robusta Vender; con pesos 25/50/25 sería Mantener (−5,3 %). Ninguna variante da Comprar.
- Regla 13: veredicto global «no cambia» (caída de octubre de mercado; ninguna colocación ni decisión con fecha).
- Pendiente para quien integre: símbolo de Yahoo BE en simbolos.json; fecha de resultados 2026-10-22 (nota de Bloom del 12-oct); quitar de cola-growth.md si estaba; resumen.md con growth.mjs --todos.
