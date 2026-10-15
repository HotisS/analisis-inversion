# Diario · Equinor (EQNR.OL) · 15-oct-2026

Encargo: análisis value completo, sin subagentes, foco «sector energético: petróleo y gas, gas a Europa». Commit de partida: 30aee4a. Inicio 16:59 UTC. Sin commits ni escrituras fuera de esta carpeta (lo comunes los integra quien encarga).

## Flujo
- Bolsa: `bolsa.mjs --accion EQNR.OL --indice OSEBX.OL --sector EXH1.DE --corte 2026-10-15 --incluir-hoy 1` y `movimiento.mjs EQNR.OL` (1 m +1,9 %, 6 m +30,6 %, 12 m +80,9 %; a −0,6 % del máximo).
- Cuentas: `cuentas.mjs --sec EQNR` falló (0 ejercicios); `--esef "Equinor"` dio 2019-2024 incompleto. Las cuentas 2017-2025 salieron del companyfacts de la SEC (taxonomía ifrs-full) con un extractor propio; 2025, 1T26 y 2T26 contrastados con los PDF de la empresa (notas/docs).
- Notas: numeros.mjs (cuenta, DCF, comparables, BPA), textos.mjs (todas las secciones), resumen.mjs, fuentes.mjs (32), propio.mjs. Integrar → calcular → rellenar → PDF con soffice.
- Controles: 18 de 24 correctos y 6 explicados (impuesto del 70-80 %, segmentos sin ventas externas, BPA 2028e frente a 2025 deprimido).

## Decisiones
- Divisa: cuentas en USD, cotización en NOK; tipo 0,105220 USD/NOK (BCE 15-oct).
- DCF en USD con WACC 9,35 % (rf 5,21 del T-bond de 10 años; beta 0,85 sectorial: la de cinco años frente al OSEBX, 1,63, no sirve porque Equinor pesa mucho en el índice) y terminal del 1 %. Impuesto proyectado 66-70 %.
- BPA 2028e base con la curva de futuros del TTF (46 EUR/MWh) y del Brent (77,6 USD).
- PER 2021 excluido (BPA de 2022 de la crisis del gas).
- Puente a 30-jun-26 con la deuda con el Estado por amortización de acciones como otros ajustes (4.277 M).
- Calidad: ROIC real 9,9 % frente a WACC 9,35 % (+0,5): no pasa. ROACE de la empresa 14,5 % (+5,2, solo con su definición).

## Línea 12 m
EQNR.OL · v3 ×1,1 · objetivo 35,82 USD (340,43 NOK) · ponderada −17,3 % · base −14,0 % · Vender · robustez SÓLIDA (No mantener) · límite robusto 279,25 NOK · analistas 382,66 NOK.

## Lecciones (para integrar)
1. `cuentas.mjs --sec` falla con emisores IFRS cuyo companyfacts tiene también la clave us-gaap (Equinor tiene 2 conceptos us-gaap): elige us-gaap y sale con 0 ejercicios. Debería elegir la taxonomía con más conceptos.
2. El ROIC del motor limita el impuesto al 40 % (`Math.min(0.4, …)` en calcular-empresa.mjs): con el 78 % noruego (Equinor, Aker BP, Vår) infla el ROIC (28,6 % frente al 9,9 % real). Hay que juzgar la calidad con el tipo real.
3. La beta frente a un índice local donde la empresa pesa mucho (Equinor en el OSEBX) no sirve: beta sectorial.
4. Símbolo nuevo para la integración: EQNR.OL (NOK), índice OSEBX.OL.
