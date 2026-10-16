# Diario — GTT (GTT.PA), corte 2026-10-16

- Commit de partida: 0f09d25 Cobertura: ninguna empresa con calidad sin calendario, noticias ni revisión tras resultados; escáner de índices (fotos de 11 índices).
- Empresa nueva (no estaba en `simbolos.json`): símbolo Yahoo GTT.PA, ISIN FR0011726835.
- Fase 0: no hay ficha de GNL/equipos de energía en `sectores/`; ficha corta como nota propia en `notas/ficha-sector.md` (el encargo no permite escribir en `sectores/`).
- Fase 1: NIIF-UE, EUR, ejercicio natural, cuenta por naturaleza. Cuentas 2019-2025 del XBRL ESEF (`cuentas.mjs`, LEI 969500BVOHVZUUFWDT54), contrastadas con URD 2025 y notas de resultados; 1S26 de la nota semestral. Precio 207,00 (sesión del 15-oct, intradía de Yahoo y Stock Analysis: el histórico diario no traía aún el 15-oct).
- Fases 2-4 sin subagentes (encargo): notas A-E con `construir-notas.mjs`, supuestos en `supuestos.mjs`, textos en `textos.mjs`, ensamblado en `propio.mjs`.
- Decisiones: no recurrentes dentro del EBIT publicado devueltos al EBITDA (2023 −8,9; 2024 −21,0 ingresos; 2025 +48,7 Elogen); deuda 2020-2023 = arrendamientos; BPA publicado para el objetivo a 12 m (no hay ajustado); historia del PER adelantada sin exclusiones (ciclo); comparables de múltiplo (no hay licenciador cotizado), peso 15 %; transacciones peso 0; prima adicional de 0,5 puntos por concentración.
- Primer cálculo con textos vacíos; tras `textos.mjs` y citar las fuentes de contexto, 19 de 19 controles correctos.
- Resultado: DCF 181,76 (WACC 8,55 %, VT 66 %); DCF inverso: crecimiento implícito 5,4 % frente a 2,6 % del base; valor intrínseco 176,98 (−14,5 %); objetivo 12 m 195,98, ponderada −1,0 %, base +3,7 % → Mantener, convicción Baja. ROIC 177,5 % − WACC 8,55 %; sostenibilidad «Sí» = motor «Sí».
- Word y PDF generados (cobertura 90,5 %; avisos: sin movimientos fuertes, sin suma de partes, mapa de comparables incompleto).
- Robustez: SÓLIDA, acción robusta «No mantener»; límite de compra (objetivo fijo) 176,98, filtro de mantener 186,26, límite robusto 161,18. Avisos D3 (sin cierre en precios.json), E2 (resultados del 3T el 23-oct) y M6 (elasticidad 0,59). Variante más dura: BPA −10 % → −10,5 %.
- Huecos: resultado por segmento; consenso de cada semestre; reparto de recomendaciones; EV/EBITDA NTM de los comparables; múltiplos adelantados de un proveedor; canon por buque (no publicado).

## Lecciones

- www.gtt.fr: `descargar.mjs --lista` no encuentra los PDF; se sacan los enlaces de las páginas con curl.
- En negocios de ciclo largo (pedidos con 2-3 años de facturación), el PER adelantado es inverso al beneficio: alto en el valle y bajo en el pico. No excluir años del ciclo.
