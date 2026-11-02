# Diario · Booking Holdings (BKNG) · 2-nov-2026

- Commit de partida: 3d8a910 («Escáner 2-nov mañana: revisados Ryanair, Elm, solutions, Dixon, Hoya y Heijmans»).
- Petición de Hotis (2-nov, 9:41 Madrid): «lanza value booking.com». Iteración nueva (la anterior, 14-oct, se hizo solo con extractos de buscador, confianza baja).
- Fecha de corte: 2026-11-02 (lunes, antes de abrir EE. UU.): precio = cierre del viernes 30-oct, 148,13 USD (movimiento.mjs). Divisa USD, cierre en diciembre, US GAAP. Desdoblamiento 25×1 (2-abr-2026).
- Resultados 3T26: 3-nov-2026 tras el cierre de EE. UU. (a confirmar por D).

## Tiempos (hora de Madrid)
- 09:41 petición; 09:42 clon del repo; 09:43 cuentas.mjs --sec BKNG (XBRL de la SEC, 10 ejercicios); 09:44 movimiento.mjs (148,13 USD, 30-oct; P4 mínimos de 52 s, P5 tendencia bajista); 09:47 lanzados los cinco subagentes A-E.
- 09:47 E (sentimiento) terminado: tono Dividido; caída del 23-sep por Muse de Meta (agentes de IA), FTC 7-oct y CE 21-oct.
- 09:52 C (gobierno) terminado: 20 fuentes (18 primarias); say-on-pay 88-90 %; Form 4 sin compras, ventas 55,8 M en 12 m (10b5-1).
- 09:56 B (sector) terminado: 23 fuentes (13 primarias); caída de sep-2026 sectorial (Muse de Meta, 8-sep y 23-sep: BKNG −27 %, EXPE −23 %, ABNB −21 %); CNMC 413 M EUR suspendida, 472 M USD provisionados.
- 09:56 D (mercado) terminado: 753,4 M acciones diluidas; consenso BPA ajustado 10,46 / 12,37 / 14,17 (2026e-2028e); objetivo medio 232,71 (37 analistas); bono 10 a 4,94 % (Tesoro 30-oct); beta 1,11; puente 30-jun: deuda 20.180, caja 17.214.
- 09:58 A (cuentas) terminado: 21 fuentes (19 primarias); XBRL comprobado; BPA ajustado (acciones de hoy) 2022 3,99 · 2023 6,09 · 2024 7,48 · 2025 9,12 · LTM jun-26 9,58; publicado 2025 6,62.
- 10:07 integración y cálculo: propio (supuestos, textos, resumen), integrar.mjs y calcular-empresa.mjs; 21 de 22 controles y 1 explicado (v2 de control en Mantener: compra B1).
- Word y PDF (soffice, 57 páginas, 27 gráficos, cobertura 90,8 %); revisadas portada y síntesis.
- apuntar-12m.mjs (+ --precios), robustez.mjs, cobertura.mjs --arreglar, seguimiento.mjs, simbolos.json a la carpeta nueva; comprobar.mjs: 0 errores.

## Decisiones
- Base del BPA: **ajustado** de la empresa en casos e historia del PER (H1 casa). La empresa NO excluye los pagos en acciones de su EBITDA ni de su BPA ajustado (D, conciliación del 4T25); excluye amortización de intangibles, participadas, divisa, convertible, deterioros, transformación y provisiones legales.
- Puente del 30-jun-2026: otros_ajustes 6.036 M = 1.185 (recompras del 30-jun al 27-jul, fecha de las acciones) + 4.851 (exceso estacional de reservas cobradas por adelantado: 10.121 en junio frente a 5.270 en diciembre), porque el DCF proyecta 2026e entero desde el cierre de 2025.
- Bajista endurecido (−3,5 puntos de crecimiento, −3 de margen, terminal 2 %): es la historia de la IA que el mercado ya descuenta.
- Regla 13: veredicto «no cambia». Los resultados del 3T26 (3-nov) no aplazan (reglas 11 y 13 vigentes; el prompt aún decía «retrasa con tendencia bajista y resultados ≤ 15 días», texto superado por METODO-VIGENTE).
- Convicción Media (el motor sugiere Alta): la compra es frágil (v2 Mantener, BPA −10 % 11,5 %).

## Resultado
- **Línea 12 m**: ponderada 181,63 USD → **+23,7 %**; base 177,52 → **+20,9 %**; bajista 121,81, alcista 249,66. v2 de control 12,1 % (Mantener). **Comprar**, convicción media. Valor intrínseco 189,97 (+28,2 %); DCF 194,60 (WACC 10,00 %); DCF inverso 2,2 % frente a 6,0 %.
- Robustez: frágil; **nivel B1** (≤ 150,15 USD, tope 4 %); nivel A ≤ 143,62 USD; filtro de mantener hasta 166,60 USD.
- Cambio frente al 14-oct: aquel informe se hizo con extractos de buscador; ahora cuentas de la SEC comprobadas. El precio baja de 158,43 a 148,13 y la ponderada pasa de 25,9 % a 23,7 % (BPA 2028e 12,37 → 12,59 con 753,4 M de acciones; PER base 15,5x → 14,1x).
