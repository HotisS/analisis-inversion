# Diario — Thales (HO), corte 2026-10-15

- Commit de partida: a225607 Seguimiento: regenerado.
- Fase 0: no había ficha de defensa ni aeroespacial en `sectores/`; hecha `sectores/defensa-2026-10-15.md` (6 campos) con comparables de Indra y Kongsberg llevados al cierre del 13/14-oct (`defensa-2026-10-15-comparables.json`, mediana PER NTM 19,6x).
- Fase 1: NIIF-UE, EUR, ejercicio natural, cuenta por función. Cuentas 2020-2025 del XBRL ESEF (`cuentas.mjs --esef "Thales"`, LEI 529900FNDVTQJOVVPZ19); semestre 1S26 del informe semestral. Precio 224,70 (cierre del 14-oct, `previousClose` de Yahoo: el histórico no traía aún el 14-oct).
- Fases 2-4 sin subagentes (encargo): notas A-E con `construir-notas.mjs`, supuestos en `supuestos.mjs`, textos en `textos.mjs`, ensamblado en `propio.mjs`.
- Decisiones: BPA ajustado de la empresa (base del consenso) para el objetivo a 12 m y su historia; Naval Group (35 %) y la futura sociedad espacial en el puente (asociadas 1.668,9 M); arrendamientos NIIF 16 en la deuda; consenso con `base_ebitda` ajustado y ajuste del 0,9 % de las ventas (participadas dentro del EBIT ajustado de la empresa). Transacciones con peso 0 (el Estado y Dassault controlan el 53 %).
- Primer cálculo con textos vacíos; tras `textos.mjs`, 18 de 20 controles correctos y 2 explicados (BAI de 2024 con actividades interrumpidas; Hensoldt LTM publicado frente a NTM ajustado).
- Resultado: DCF 241,56 (WACC 8,08 %, VT 72 %); valor intrínseco 236,37 (+5,2 %); objetivo 12 m 213,95, ponderada −3,0 %, base +3,9 % → Mantener, convicción Baja. Sostenibilidad «Sí» = motor «Sí» (no salta el control). ROIC 17,0 % − WACC 8,08 % = +8,9 puntos: calidad Sí.
- Word y PDF generados (cobertura 88,4 %; la sección de consenso queda por debajo del 60 % por falta de EBITDA y desglose de recomendaciones).
- 15-oct-2026: revisión a 12 meses (`revision-12m-2026-10-15.md`): v3 ×1,1 −3,1 % / base +3,9 % → Mantener (v2 −5,3 %); `apuntar-12m --simular`.
- Robustez: SÓLIDA, acción robusta «No mantener» (no comprar); avisos D3 (sin cierre en precios.json), E2 (resultados del 3T el 22-oct) y M6 (elasticidad 0,53). Variante más dura: BPA −10 % → −12,6 %.
- Huecos: URD 2022 no descargable; director financiero sin verificar; segunda fuente del tamaño del sector; desglose de recomendaciones de los analistas.

## Lecciones

- thalesgroup.com bloquea las descargas automáticas (Incapsula): los PDF se consiguen con WebFetch (los guarda en local) y luego `pdftotext`.
- En grupos con BPA ajustado de referencia (amortización de compras fuera), la historia del PER adelantado y el BPA de los casos deben ir en esa misma base; la cuenta del informe sigue con el BPA publicado del XBRL.
- Contratistas con participadas dentro del EBIT ajustado (Naval Group): el consenso de EBIT/EBITDA es «ajustado» con `ajuste_ebitda_pct_ventas` = participadas / ventas.
