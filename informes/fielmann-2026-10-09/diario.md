# Diario: Fielmann Group AG (FIE.DE), corte 2026-10-09

- Commit de partida: f1a9bdb (Informe de Evolution (Comprar, convicción baja)).
- Inicio: 09:36 (hora local).

## Fase 1 (09:36-09:42)
- Fielmann Group AG, Xetra, ticker FIE (Yahoo FIE.DE), ISIN DE0005772206, EUR, ejercicio a 31-dic, NIIF-UE.
- Capital social 84 M EUR = 84 M acciones; autocartera pequeña (comprobar en el semestral).
- Últimos resultados: semestral 2026 del 27-ago-2026. Próximos: informe del 3T, 5-nov-2026 (calendario financiero del semestral).
- Guía 2026 rebajada en agosto: ventas 2.500-2.550 M EUR, EBITDA ajustado 560-580 M, margen 22-23 %, margen BAI ajustado ~12 %.
- Descargados por mí: informe anual 2025, semestral 2026 y presentación del semestral (notas/docs).

## Fases 2-4: subagentes (09:37-09:56)
- Cuatro subagentes en paralelo. Las cuatro notas tenían contenido a los 9 minutos (comprobado por tamaño y claves, no por existencia). A terminó a los 15 min (84 llamadas), C a los 15 (90), B a los 16 (105), D a los 18 (111).
- Criterio enviado a A a mitad de trabajo: EBITDA reportado en la cuenta y sin no recurrentes (los ajustes se repiten: 20,8 M en 2024 y en 2025); el consenso, ajustado, se rebaja un 0,85 % de ventas. Así no se resta dos veces (Vuelta 11).
- Integración: la nota de sector no pisó las listas de negocio de la de cuentas (B no escribió segmentos, KPI ni geografías, como se le pidió).

## Integración, cálculo y redacción (09:56-10:06)
- Primer cálculo: DCF 60,44 con circulante del 3 % (el real es el 9 %: el primer año liberaba 143 M). Corregido; también crecimiento medio punto bajo el consenso, terminal 2,25 %, +0,5 pp por liquidez (free float 27 %, 2,8 M EUR/día). DCF final 47,10.
- Beta 0,89 (semanal 5 años ajustada frente al STOXX Europe 600); SDAX 0,81, MDAX 0,80, STOXX 600 Retail 0,70; mensuales 0,34-0,46 descartadas. Fielmann está en el SDAX, no en el MDAX.
- NIIF 16: arrendamientos (594 M) en la deuda del puente; capex del DCF = inmovilizado + altas de derechos de uso (11-12 % de ventas); amortización con la de derechos de uso.
- Etapa 2 usada (5 años): ROIC 13,9 % frente a WACC 7,74 %; aporta 6,2 % del valor (44,37 sin ella).
- Resultado: Comprar, convicción media. Objetivo 49,13 (+32,2 %), RT 36,0 %, asimetría 2,38. Relativa (ERP 4,20 %): 59,79, Comprar. DCF inverso: 2,6 % de crecimiento o 21,2 % de margen.
- Controles: 14 de 15 correctos y 1 explicado (comparables frágiles). Word y PDF de 56 páginas; portada, síntesis y «La decisión» revisadas como imagen.
- Fin: 10:06 (unos 30 minutos).

## Fallos del sistema
1. **Esperar a los subagentes sin `sleep`.** Un subagente que coordina no tiene cómo «esperar» la notificación: si acaba el turno, termina. `sleep` largo está bloqueado. Lo que funcionó: un bucle `until` en primer plano sobre el tamaño de las notas. Arreglo: documentarlo en el comando (`until [ $(cat notas/*.json | wc -c) -gt N ]; do sleep 10; done`).
2. **`integrar` sin `calcular` borra `calc`**, y un `textos.mjs` que lee `calc` deja el resumen vacío en la integración siguiente. Me pasó una vez. Arreglo: que `integrar` conserve el `calc` anterior o que avise de «resumen vacío porque no hay calc».
3. **`_parches` no llega a `meta.huecos`**: para quitar nombres de campo (tcac_previsto_pct, posicion_corta_pct) de los huecos que se imprimen hubo que editar las notas B y D. Arreglo: que `integrar` avise de nombres de campo en `huecos[].campo` (ya lo hace en textos) y acepte parches sobre `meta.huecos`.
4. **`bolsa.mjs` con un índice equivocado**: el subagente lanzó la herramienta contra el ETF del MDAX (el encargo decía MDAX) y la empresa está en el SDAX; además trata `^SDAXI` como índice de precio aunque es de rendimiento, y hubo que calcular las rentabilidades con un script propio. Arreglo: lista de índices de rendimiento conocidos (SDAXI, MDAXI, DAX) en la herramienta, y comprobar el índice en el informe anual antes de lanzarla.
5. **Comparables mezclan fabricantes y minoristas**: la mediana (13x) duplica el valor. El motor avisa de fragilidad pero no hay un campo para excluir un comparable de la mediana como en transacciones. Arreglo: `excluir` también en `comparables.empresas`.
6. **Circulante por defecto**: el primer supuesto (3 %) liberaba 143 M de caja en 2026 y subía el DCF un 28 %. El control lo cazó; conviene que `supuestos` parta siempre de `calc.balance[].circulante_ventas_pct` del último año.
