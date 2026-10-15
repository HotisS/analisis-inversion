# Diario · Sage (SGE.L) · 15-oct-2026

- Commit de partida: 9fdf1ce (durante el análisis llegó a main a406355: `riesgos.ia` obligatorio, ROIC sin fondo de comercio y veredicto de sostenibilidad del motor; aplicado antes del Word).
- Entorno: nube de Claude Code, red abierta. Sin subagentes: notas A-E con `notas/construir-notas.mjs`, parte propia en `propio.mjs` + `textos.mjs` + `textos12m.mjs`.
- Reutilizado de ayer (comprobado): `cuentas-xbrl.json` (ESEF FY2021-FY2025), `bolsa.json` y los RNS en `notas/docs` (FY18, FY21, FY22, FY24, FY25, 1S26, 3T26, informe anual 2025, derechos de voto). Ficha sectorial `sectores/software-2026-10-14.md` reutilizada.
- Correcciones al XBRL: la deuda incluía arrendamientos (separados: 103 M en FY2025); patrimonio = activo − pasivo; EBITDA = EBIT + amortización total (subyacente + intangibles de compras); DPA por devengo (final + a cuenta) de los RNS; acciones diluidas medias.
- Precio: 10,73 GBP (1.073 peniques), cierre del 14-oct. La sesión del 15-oct estaba abierta; al relanzar `bolsa.mjs` Yahoo dio la fila del 14-oct vacía y tomó el 13-oct (10,895): se mantiene el 14-oct, confirmado por MarketScreener («último cierre 10,73»; tiempo real 10,995 el 15-oct por la mañana). `bolsa.json` quedó con el 13-oct en `identificacion`; la nota D fija el 14-oct a mano.
- Una acción ≈ 12,72 EUR (BCE 14-oct: 0,84385 GBP/EUR): muy por debajo del 7 % de una cartera de 30.000 EUR.
- Decisiones: cifras publicadas (no las «subyacentes» de la empresa); no recurrentes FY2021 −55, FY2023 +44, FY2024 −5, FY2025 −3. Ingresos diferidos fuera del circulante (conservador). WACC 8,93 % (gilt 5,39 %, beta 0,85). Sostenibilidad «En parte» (el motor dice «Sí»: no salta el control, que solo actúa al revés); la mitad del crecimiento es precio y la parte de pequeñas empresas es la más expuesta a la IA. `riesgos.ia`: exposición Alta, sentido Mixto, −15 % a 3-5 años.
- ROIC 21,5 % con fondo de comercio frente a WACC 8,93 % (+12,6 puntos; el escáner decía +5,4 con otra base de capital). Sin fondo de comercio el capital operativo es negativo (ingresos diferidos): no aplica. Motor: «compra única grande» (Intacct).
- Fundsmith volvió a comprar Sage en el 1S26 (ii.co.uk, 30-jul-2026). Caída desde el máximo de 13,35 GBP (feb-2025) al mínimo de 7,72 (24-feb-2026): −42 %; hoy −6,9 % en un año.
- Resultado: DCF 9,78 GBP; valor intrínseco 9,51 (−11,4 %); con la prima del mercado 11,15. DCF inverso: 8,3 % de crecimiento anual (base 6,8 %), rentabilidad implícita 8,5 %.
- **Línea 12 m**: v3 ponderada +24,9 %, base +26,5 % (objetivo 13,18 GBP); v2 +17,9 % / +15,4 %; selector v3. **Mantener**, convicción baja (valor intrínseco bajo el precio; absoluta Vender, relativa Mantener). Comprar < 9,51 GBP; vender > 14,89. Robustez SÓLIDA, acción robusta Mantener.
- Controles: 18 de 19 y 1 explicado (regresión). Cobertura 85,6 %. Word y PDF (40 páginas) con soffice.
- Próximos resultados: 19-nov-2026 (FY2026).
- Tiempo: unos 50 minutos (07:30-08:20 UTC).

## Lecciones

- Sage (y otras británicas con ingresos diferidos grandes): el ROIC sin fondo de comercio no tiene sentido porque el capital operativo es negativo; el ROCE de la empresa (31-33 %) excluye la amortización de compras.
- El XBRL británico de Sage etiqueta como «Borrowings» la deuda con arrendamientos: separar con la nota de deuda neta.
- Con la sesión del corte abierta, `bolsa.mjs` puede perder el cierre del día anterior si Yahoo devuelve la fila vacía: contrastar con MarketScreener («último cierre»).
