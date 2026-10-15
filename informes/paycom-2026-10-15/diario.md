# Diario — Paycom Software (PAYC), corte 2026-10-15

- Commit de partida: `ecb1d54 Seguimiento: regenerado`. Análisis hecho por un solo agente (fases 2-4 sin subagentes), en paralelo con otros tres en la misma copia; sin commits.
- Origen: escáner «calidad a precio» (PER adelantado ~17x, caja neta, ROIC − WACC ~+20, ventas +14 % en 3 años). Ficha sectorial reutilizada: `sectores/software-2026-10-14.md` (nóminas/HCM con riesgo de IA «Medio»).

## Fase 1 — Identificación
- Paycom Software, Inc.; NYSE PAYC; ISIN US70432V1026; Oklahoma City. US GAAP, USD, ejercicio natural.
- Último informe: 10-Q del 2T26; nota de resultados y prepared remarks del 2T26; transcripción (Motley Fool). 3T26 sin fecha anunciada: hacia el 4-nov-2026 (estimado).
- Precio: cierre del 14-oct-2026, 239,00 USD (el 15 no había cerrado). 52 semanas: 104,90-244,98.

## Fases 2-4 — Notas A-E
- `notas/construir-notas.mjs` construye A-E a partir de XBRL (`cuentas.mjs`), documentos de EDGAR (`descargar.mjs`), `bolsa.json`, Form 4 y consenso de MarketScreener. Comparables y transacciones reutilizados del informe de Paychex (12-oct), con los precios llevados al 14-oct.
- Correcciones al XBRL: DPA trimestral (0,38) → anual 1,5; inmovilizado 2024-2025; deuda 2023-2025 = 0; 2024 no recurrente −117,5 (reversión del paquete de 2020); patrimonio de 2016 reexpresado (parche a 116,5).
- SEC: el archivo (www.sec.gov/Archives) da 403 con el UA corto; funciona con el de `descargar.mjs`. data.sec.gov funciona con los dos.

## Fases 5-9
- DCF 2026e-2033e: crecimiento 7,4 % (fijo, guía) → 4,5 % (medio 6,1 %); margen EBITDA GAAP 43,0-44,0 % (= margen ajustado del consenso menos pagos en acciones del 3 %); amortización 9,3 → 6,6 %; capex 6,5-6,8 %; circulante 2 %; tipo 28 %. WACC 9,71 % (Rf 5,21 %, beta 0,90 media de mensual 0,79 y semanal 1,00, prima 5,5 %, deuda 7,7 % al 6 %). Gordon 3,0 %.
- Resultado: DCF 224,65 (−6,0 %); valor intrínseco 237,29 (−0,7 %); escenarios 154,97 / 224,65 / 281,87; asimetría 0,51x; con la prima del mercado 271,62 (+13,6 %). DCF inverso: 7,0 % frente a 5,9 %.
- Objetivo 12 m (v3, 2028e): 295,17 USD; ponderada 24,1 %, base 22,2 %. v2: 15,3 % / 10,9 %. Selector: decide v3. Regla: **Mantener**, porque el valor intrínseco queda un 0,7 % por debajo del precio. Convicción: Baja (el motor sugiere Media; me aparto porque la decisión depende de un 0,7 %; explicado en la síntesis).
- Sostenibilidad: Sí (motor: Sí). ROIC 32,8 % (34,1 % sin fondo de comercio) frente a WACC 9,71 %. Calidad: Sí.
- Riesgo IA: exposición Media, sentido Mixto, efecto −10 % (hasta −35 % con presión de precio).
- Controles: 20 de 24 correctos y 4 explicados (perímetro 2019 y 2024 por fondos de clientes; regresión; mediana de comparables).
- Word (cobertura 88,8 %, 28 gráficos) y PDF generados. Robustez: SÓLIDA, acción robusta Mantener.

## Lecciones
- **Paycom cobra por empleado**: el riesgo de IA no es solo de precio o sustitución, sino de volumen (menos empleados administrativos en los clientes). Sirve para todo el software de nóminas/HCM con precio por empleado (Paylocity, Paychex, ADP).
- **Patrimonio reexpresado por ASC 606 en la serie XBRL**: companyfacts puede mezclar el patrimonio reexpresado de un 10-K posterior con el activo y el pasivo originales del año; el control de cuadre del balance lo detecta. Se corrige con activo − pasivo del mismo balance.
- **Fondos de clientes y control de perímetro**: el activo total salta con los fondos al cierre (día de la semana); sin compras (fondo de comercio constante), se explica en vez de declarar perímetro.
- **BPA del consenso «ajustado» sin pagos en acciones** (Paycom ~1,1 USD por acción): la comparación con nuestro BPA GAAP normalizado debe corregirlo antes de hablar de diferencia.
- En los textos, evita las comillas invertidas (`): integrar las marca como nota de trabajo.
