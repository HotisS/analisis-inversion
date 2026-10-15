# Diario · Lam Research (LRCX) · 15-oct-2026

- Commit de partida: 70ba47e. Encargo del coordinador (megatendencia IA, exposición indirecta). Sin commits, pull ni push por parte de este análisis; nada escrito fuera de la carpeta.
- Entorno: nube de Claude Code, sin subagentes. Cuentas FY2017-FY2026 del XBRL de la SEC (`cuentas.mjs --sec LRCX`), comprobadas con el 10-K FY2026 y las cuatro notas de prensa de FY2026; proxy 2026; Form 4 (`form4.mjs`); `bolsa.mjs` (SPY y SOXX); `movimiento.mjs`. Tasa libre: FRED DGS10 5,21 % (curl). Comparables: nota D de VAT (6-oct) llevada al 14-oct con precios de Yahoo.
- Fecha de corte 2026-10-15; precio del cierre del 14-oct (286,92 USD) porque la sesión del 15-oct no había cerrado (273,08 a las 16:40 UTC). Ejercicio a finales de junio, etiqueta «fin». Desdoblamiento 10x de 2024: FY2019-FY2022 ajustados.
- Decisiones: deuda FY2026 = 3.730,5 + 4,1 (incluye arrendamiento financiero); arrendamientos operativos fuera del puente (US GAAP). Pesos DCF 50 / escenarios 30 / comparables 20. WACC 13,10 % (beta 1,45 entre la ajustada 1,62 y la del sector; bruta 1,92). Terminal Gordon 3 %. FY2029e con una corrección del −6 %. Sostenibilidad «Sí» (analista y motor).
- Resultado: DCF 104,29; valor intrínseco 139,67 (−51,3 %); DCF inverso 26,6 % anual (base 9,8 %), rentabilidad implícita 6,7 %. Con la prima del mercado: 158,48. ROIC 75 % frente a WACC 13,1 % (+61,9 puntos).
- **Línea 12 m (v3)**: objetivo 259,18 USD, ponderada −9,3 %, base +6,4 %; **Mantener**, convicción media; v2 −21,7 % (Vender). Vender por encima de 289,13; comprar por debajo de 139,67. Robustez SÓLIDA, acción robusta «No mantener»; BPA −10 %: −18,3 % / −4,2 %. Límite robusto 139,66 USD. Detalle en revision-12m-2026-10-15.md.
- Regla 13: veredicto «no cambia» (caída del 37 % desde el máximo, sectorial; resultados el 21-oct-2026).
- Confianza de los datos: media-alta (cuentas primarias; consenso de una sola fuente gratuita, sin EBITDA; comparables de hace 8 días reescalados).
- Word y PDF (soffice): 40 páginas, cobertura 84,8 %, 18 de 22 controles correctos y 4 explicados.
- Tiempo: unos 35 minutos (16:38-17:15 UTC).

## Lecciones (para quien integre)

- Lam (y otras de EE. UU. con desdoblamiento reciente): el XBRL da BPA, DPA y acciones de los años anteriores al desdoblamiento sin reexpresar; los del 10-K más reciente (FY2023+) ya vienen ajustados. Dividir a mano FY2022 y anteriores.
- MarketScreener: las URL «LAM-RESEARCH-CORPORATION-<n>» adivinadas llevan a otras empresas; Stock Analysis /forecast/ da consenso de dos años gratis vía WebFetch (el tercero y el EBITDA son de pago).
- `robustez.mjs --actual` no encuentra precio para una empresa nueva que no está en `simbolos.json` (aviso D3); el precio actual se mira aparte con `movimiento.mjs`.
- Sectores con PER histórico de caídas muy bajo (semiconductores de equipos: 12-13x en 2019-2022): el bajista de la regla v3 (mínimo de 5 años) da −67 % a 12 meses; la marca M4 de doble castigo lo señala.
