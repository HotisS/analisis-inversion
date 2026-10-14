# Diario · Cintas (CTAS) · 14-oct-2026

- Commit de partida: 88a56c6 (al empezar; durante el análisis main avanzó a 7406b34 sin cambios en el prompt ni en el motor que use este informe). Sin `git pull` por el encargo (coordinador).
- Entorno: nube de Claude Code, red abierta. Sin subagentes: notas A-E escritas por mí (`notas/construir-notas.mjs`), parte propia en `propio.mjs` + `textos.mjs`.
- Fecha de corte 2026-10-14; USD; ejercicio a 31 de mayo, etiqueta «fin» (FY2026 = jun-25 a may-26). Precio: cierre del 13-oct (206,38), la sesión del 14 no había cerrado.
- Fuentes: XBRL de la SEC (`cuentas.mjs`), 10-K FY2026 y FY2024, 10-Q 1T FY2027, notas de prensa (8-K) de 3T26, 4T26 y 1T27, proxy 2026, 8-K de UniFirst (marzo, junio, octubre) y de la línea de crédito; Form 4 con `form4.mjs`; bolsa con `bolsa.mjs`; Tesoro (10 años 5,21 % el 13-oct); consenso de Yahoo y Stock Analysis; comparables del análisis de Rentokil del 7-oct llevados al 13-oct + Vestis y Aramark de Stock Analysis; foros: RSS de Seeking Alpha y API de Stocktwits (CTAS y UNF).
- **Nota de la sesión anterior comprobada**: en Cintas `cuentas.mjs` sí recoge toda la amortización (513 M = depreciación 318,6 + amortización de intangibles y comisiones 194,2, concepto `DepreciationDepletionAndAmortization`), así que no hubo que sumar nada al EBITDA. El capex del flujo (395 M) ya incluye el software. Sí sumé al capex del DCF las comisiones activadas (≈1,2 % de ventas) y el aumento del inventario en servicio (≈1,0 %).
- **UniFirst sigue en marcha** (8-K del 6-oct-2026): segunda solicitud de la FTC (11-jun), cumplimiento certificado el 2-oct, acuerdo de plazos que impide cerrar antes del 11-dic-2026; Canadá respondido el 29-sep; cierre esperado antes de fin de 2026. UniFirst cotiza a 258 frente a ≈314 de valor de la oferta (−18 %). Valoración de Cintas sola.
- Decisiones: no recurrentes en el EBITDA (litigio 45 M en FY2024, plusvalía −15 M en FY2025, costes UniFirst 15,1 M en FY2026 y 29,5 M LTM). BPA 2019-2022 ÷4 por el split. Arrendamientos operativos fuera del puente (US GAAP). Caja del puente −500 M por recompras de septiembre (estimación). Terminal «media» (Gordon 3 % y 18x EBITDA, el mínimo histórico): Gordon solo da 9,8x con el bono al 5,21 %. Pesos DCF 50 / escenarios 40 / comparables 10. Sostenibilidad «Sí» con la prueba a mano (reinversión 8 % del NOPAT; el motor no la hace).
- Resultado: DCF 127,42; valor intrínseco 125,35 (−39,3 %); con la prima del mercado 135,43; DCF inverso 12,4 % de crecimiento anual (base 6,3 %) o margen 45,2 %; rentabilidad implícita 6,4 % frente a WACC 9,67 %. ROIC 29,6 % (≈ +20 puntos sobre el WACC). 19 de 19 controles.
- **Línea 12 m (v3 ×1,1)**: objetivo 186,68 USD; ponderada −8,6 %, base −3,5 %; **Mantener**, convicción media (sugerida). v2 de control: −1,3 % / +0,9 %. Comprar < 125,35; vender > 209,50. Robustez: SÓLIDA, acción robusta «No mantener» (V1: valor intrínseco 39 % bajo el precio). Detalle en `revision-12m-2026-10-14.md`.
- Ficha sectorial nueva: `sectores/servicios-uniformes-2026-10-14.md` (+ `-comparables.json`).
- Word y PDF (soffice, 40 páginas, 27 gráficos, cobertura 88,6 %). Confianza de los datos: media-alta (cuentas primarias; consenso de una fuente; tamaño de mercado de un competidor).
- Tiempo: unos 20 minutos de reloj (17:09-17:29 UTC).

## Lecciones

- En Cintas (US GAAP) `cuentas.mjs` ya trae D&A completa; la nota «solo recoge la depreciación» no es general: comprobar en el estado de flujos antes de sumar nada.
- Negocios de alquiler con inventario en servicio (uniformes): ese inventario se amortiza en el coste de ventas y su aumento va en el flujo operativo; en el DCF hay que sumar su crecimiento al capex (o al circulante), o la reinversión sale casi nula.
- Con el bono de EE. UU. al 5,2 %, Gordon con g = 3 % implica menos de 10x EBITDA aunque el ROIC sea del 30 %: la «media» con el mínimo histórico del múltiplo modera sin inflar.
