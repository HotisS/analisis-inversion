# Diario · Qualys (QLYS) · 15-oct-2026

- Commit de partida: 1830faf. Encargo del coordinador (escáner «calidad a precio»: PER adelantado ≈22x, ROIC − WACC ≈+29, caja neta, ventas +11 % en 3 años). Sin commits ni pull por parte de este análisis.
- Entorno: nube de Claude Code. Cuentas 2018-2025 del XBRL de la SEC (`cuentas.mjs --sec QLYS`, CIK 1107843), comprobadas con el 10-K 2025 y el 10-Q del 2T26; notas de prensa 3T25-2T26 y de febrero 2021-2025; proxy 2026; Form 4. Precio y cierres con `bolsa`. Tasa libre: FRED DGS10 5,21 % (curl). Ficha sectorial reutilizada: `sectores/software-2026-10-14.md`.
- Fecha de corte 2026-10-14 (último cierre, 189,63 USD); divisa USD; ejercicio natural; US GAAP. Notas A-E y propio hechos por mí (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`).
- Decisiones: caja = caja + valores negociables (703,5 M); ingresos diferidos como pasivos de contrato en el circulante; arrendamientos operativos fuera de la deuda; capex con las comisiones activadas; recompras con las retenciones fiscales. BPA GAAP (pagos en acciones restados), como pide el encargo. Comparables con peso 0: su PER adelantado de Stock Analysis mezcla bases (ajustado, sin pagos en acciones) y subía el valor a ≈140. Pesos DCF 60 / escenarios 40. WACC 10,71 % (beta 1,0 entre la mensual 0,57 y la semanal 1,23; sin deuda). Sostenibilidad «Sí» (analista y motor coinciden; no salta el control).
- ROIC del motor n.d. (capital invertido negativo por ingresos diferidos y caja); ROIC propio ≈63 % sin ingresos diferidos, ROE 38,6 %. Calidad: Sí. Altman 8,67, Piotroski 8, Beneish −2,90.
- Resultado: DCF 120,49; valor intrínseco 119,16 (−37,2 %); DCF inverso 14,9 % anual de crecimiento (base 6,6 %); con la prima del mercado, 140,72.
- **Línea 12 m (v3)**: objetivo 210,98 USD, ponderada +11,3 %, base +7,4 %; **Mantener**, convicción media (absoluta y relativa: Vender). v2: 13,6 % / 10,0 %. Comprar < 119,16; vender > 234,42. Robustez: SÓLIDA, acción robusta «No mantener» (VI bajo el filtro de mantener, 140,19); con el BPA de consenso, 2,3 % / −1,3 %. Detalle en revision-12m-2026-10-15.md.
- **Confianza de los datos: media.** Falta: XBRL trimestral 2023-2024 (crecimiento interanual de los trimestres viejos), cuotas del mercado (de pago), calificaciones ESG, votos de remuneración 2024-2025, múltiplos de las transacciones y crecimiento de los comparables (el gráfico de mapa de comparables no se dibuja). Próximos resultados: 3-nov-2026.
- Word y PDF (soffice): 20 de 20 controles. Cobertura 85,5 %.
- Tiempo: unos 22 minutos de reloj (08:34-08:56 UTC), más la sesión anterior a la compactación del contexto.

## Lecciones

- En software estadounidense, el PER adelantado de Stock Analysis para los comparables suele ser ajustado (sin pagos en acciones); si el informe usa BPA GAAP, poner comparables a peso 0 o reconstruir el PER GAAP, porque si no inflan el valor intrínseco (aquí de 119 a 140).
- Stock Analysis bloquea curl desde la nube; WebFetch sí entra.
- FRED: `descargar.mjs` falla («fetch failed»); curl directo al CSV de DGS10 funciona.
- Con ingresos diferidos grandes y mucha caja, el capital invertido del motor sale negativo y el ROIC n.d.: calcular el ROIC propio sin ingresos diferidos y marcarlo como estimación en huecos.
