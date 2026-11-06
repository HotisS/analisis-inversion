# Diario · GigaCloud Technology (GCT) · análisis value · corte 2026-11-06

- Commit de partida: 54ce0ec Escáner: una sola pasada diaria a las 9:00 de Madrid (se quita la de las 15:45)
- Pedido de Hotis (5-nov-2026 16:06 Madrid): «lanzame value y growth de GigaCloud Technology Inc. (GCT) y me dices que tal».
- Horas en hora de Madrid (UTC+1).

## Pasos
- 06-11 01:07 Fase 1: identificación (CIK 0001857816, Islas Caimán, US GAAP, USD, cierre 31-dic; 10-K/10-Q/DEF 14A). 3T26 publicado el 5-nov-2026 (8-K y 10-Q).
- 06-11 01:07 cuentas.mjs --sec GCT: XBRL 2020-2025 → notas/cuentas-xbrl.json (datos SEC a 6-nov-2026).
- 06-11 01:07 bolsa.mjs (GCT, ^RUT, XLY) → notas/bolsa.json: cierre 63,01 USD del 5-nov-2026.
- 06-11 01:07 Lanzados los cinco subagentes A-E.
- 06-11 01:24 Notas A-E recibidas (A: cuentas; B: sector; C: gobierno; D: mercado; E: foros). Auditor: el 8-K del 3-mar-2026 confirma el cambio de KPMG Huazhen a Grant Thornton (C prevalece sobre A).
- 06-11 01:24 Integración, cálculo y Word/PDF (54 páginas, 26 gráficos; 20 de 25 controles correctos y 5 explicados: BPA y balance pre-OPV, perímetro 2022, impuesto 2024). PDF con LibreOffice (en la nube no hay PowerShell).
- 06-11 01:24 DCF 68,26 USD (+8,3 %), WACC 13,11 %. Revisión 12 m (v3): ponderada −12,9 %, base −4,4 % → Vender; v2 −29,3 %.
- 06-11 01:24 robustez.mjs: SÓLIDA; si la tienes, Vender (mantener hasta 49,88); compra robusta no; límites A 38,75 / B1 40,53 USD. Q2 avisa de dilución del 16,1 % anual: es la conversión de preferentes en la OPV de 2022; desde 2023 las acciones bajan (recompras).
- 06-11 01:24 Símbolo añadido a simbolos.json; precios.mjs GCT; cobertura --arreglar; seguimiento.mjs.
- Exclusión de Hotis «poco margen/minoristas»: no es minorista con tiendas (≈ 78 % B2B), pero sí de poco margen bruto (23-25 %). Se avisa en el resumen.
