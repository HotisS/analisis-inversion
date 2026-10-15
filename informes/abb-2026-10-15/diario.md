# Diario · ABB Ltd (ABBN, SIX) · 15-oct-2026

- Commit de partida: 70ba47e. Encargo del coordinador (foco de Hotis: electricidad —electrificación, centros de datos, red— y automatización). Sin subagentes, sin commits ni escritura fuera de la carpeta.
- Entorno: nube de Claude Code, 16:39-18:20 UTC. Cuentas 2014-2023 del XBRL de los 20-F en la SEC (`cuentas.mjs --sec 1091587`: el ticker ABB no lo encuentra; ABB dejó de presentar en la SEC tras 2023) y 2024-2025 de la información financiera del 4T25 (actividades continuadas, sin Robotics). Notas del 1T26, 2T26 y 4T25; informe de remuneración 2025; día del inversor 2025. El informe financiero e integrado 2025 dan 403.
- Fecha de corte 2026-10-15; precio 76,20 CHF (cierre del 15-oct, SIX cerrada); divisa de cuentas USD, cotización CHF, tipo 1,20451 USD/CHF (BCE). Tasa libre: DGS10 5,21 % (FRED, 13-oct).
- Decisiones: perímetro de continuadas sin Rotork (precio y aportación fuera a la vez) y con los ≈4.800 M netos de Robotics en otros ajustes; arrendamientos operativos fuera de la deuda (US GAAP); BPA publicado (no el operativo de ABB). Pesos DCF 50 / escenarios 30 / comparables 20. WACC 10,64 % (beta 1,05). Sostenibilidad «Sí» del analista; el motor dice «En parte» solo porque el histórico de ingresos mezcla cuatro ventas de negocios (control explicado). Capex subido al 3,0-3,1 % para que el crecimiento financiable (7,0 %) cubra el proyectado (7,1 %).
- Resultado: DCF 47,22 USD; valor intrínseco 52,98 (−42,3 %); DCF inverso 22,3 % anual frente al 6,1 % del base; rentabilidad implícita 6,9 %. ROIC 2025 26,1 % (ROIC − WACC = 15,5).
- **Línea 12 m (v3 ×1,1)**: objetivo 82,18 USD (68,23 CHF), ponderada −9,2 %, base +1,4 % → **Mantener**, convicción media. v2 −4,4 % / −0,1 %. Robustez SÓLIDA, acción robusta «No mantener» (como candidata, No comprar); BPA −10 %: −18,1 % / −8,6 % (Vender). Límite robusto 43,98 CHF.
- Regla 13: veredicto «no cambia» (sin colocaciones ni hechos pendientes; Rotork en efectivo; resultados el 20-oct no aplazan).
- Word y PDF (soffice, 37 páginas): 18 de 21 controles correctos y 3 explicados; cobertura 85,7 %. Confianza de datos: media.
- `apuntar-12m.mjs --simular` y `robustez.mjs --actual` (y `--bpa-factor 0.9`) ejecutados sin escribir.

## Lecciones (para integrar)

- Suiza con cuentas en USD (ABB): `cuentas.mjs --sec` no encuentra el ticker, pero con el CIK (1091587) trae los 20-F hasta 2023; para 2024-2025 la «Financial Information» trimestral del 4T trae cuenta, balance y flujos completos en ~50 páginas (los PDF de library.e.abb.com bajan; el informe integrado da 403).
- Con precio en CHF y BPA en USD, el PER adelantado de Yahoo (forwardPE) sale mal: divide CHF entre USD. Calcular el PER histórico con el cierre convertido al cambio de fin de año (FRED DEXSZUS).
- Tras desinversiones grandes, el histórico de ingresos del motor (TCAC 2,9 %) hace saltar el control de sostenibilidad: explicar con el crecimiento comparable que publica la empresa.
- MarketScreener: la caída de un artículo de prensa de 2025 salió en una búsqueda como si fuera de octubre de 2026: comprobar siempre la fecha del artículo antes de usarlo en la regla 13.
