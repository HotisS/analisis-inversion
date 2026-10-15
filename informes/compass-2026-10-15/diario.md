# Diario · Compass Group (CPG) · corte 15-oct-2026

- Commit de partida: 9340b9e. Inicio ≈ 09:41 UTC; fin ≈ 10:10 UTC. Análisis value completo por un subagente (notas A-E con `construir-notas.mjs`, `propio.mjs` con `supuestos.mjs` y `textos.mjs`).
- Origen: escáner «calidad a precio» (PER adelantado ≈ 19,5x; ROIC − WACC ≈ +7; −9 % desde máximos).

## Datos y herramientas
- Cuentas del ESEF (`cuentas.mjs --esef "Compass Group"`). FY2021-FY2022 vienen en GBP y FY2023 en adelante en USD (Compass cambió la divisa de presentación en FY2024 y reexpresó FY2023). FY2021-FY2022 pasados a USD: cuenta y flujos al cambio medio del ejercicio (1,3693 y 1,2808), balance al de cierre (1,3470 y 1,1169), de Yahoo GBPUSD=X.
- Capex del XBRL incompleto: faltaban los «activos de cumplimiento de contratos» (equipos en cocinas de clientes). Capex hecho a mano = inmovilizado + intangibles + activos de contratos.
- **Serie de precios**: la línea de la LSE cotiza en USD desde el 1-abr-2026 y Yahoo (CPG.L) mezcla GBP y USD (mínimo de 52 semanas de ≈ 20 y volatilidad del 39 %, falsos). Estadísticas de bolsa con el ADR CMPGY (1:1, USD) frente a URTH y XLY (`notas/bolsa-adr.json`). Precio: 31,34 USD, cierre del 14-oct-2026. Máximo/mínimo de 52 semanas 35,94/26,95.
- Consenso: MarketScreener (20 analistas, objetivo medio 38,06 USD) y Yahoo (BPA subyacente FY2026 1,484 y FY2027 1,634).
- Comparables en USD (Sodexo, Aramark, Elior, SSP, Avolta, DO & CO, ISS). FCF de SSP y Avolta en null (el de Yahoo no cuadra). Sin EBITDA adelantado de los comparables: el gráfico de crecimiento frente a múltiplo no se dibuja.
- Bono a 10 años de EE. UU. 5,19 % (Tesoro, 14-oct); `descargar.mjs` falló con FRED y `curl` sí funcionó.

## Decisiones
- **BPA subyacente** en la regla a 12 meses (historia y previsión, como el consenso); la cuenta guarda el publicado. Los cargos de compras se repiten (comprador en serie): dicho en calidad y en la síntesis.
- EBITDA de la cuenta = EBIT publicado + amortización subyacente; `no_recurrentes_en_ebitda` = beneficio operativo subyacente − EBIT publicado, de modo que el EBITDA ajustado del motor es el subyacente.
- WACC 8,64 % (Tesoro 5,19 %, beta 0,85 —la del ADR frente al MSCI World es menor, pero se usa una prudente—, prima 5 %, coste de la deuda 5 %, 14 % de deuda). Terminal Gordon 3 %. Pesos: DCF 50, comparables 10, escenarios 40.
- Puente a 31-mar-2026 (deuda 7.490, arrendamientos 1.641, caja 523, minoritarios 125, pensiones 86, asociadas 231).
- Sostenibilidad: «Sí» (motor y analista); el control no salta. Crecimiento medio proyectado 5,9 % frente a 10 % histórico; cuota del 12,8 % al 14,6 % del direccionable (360.000 M).
- Calidad: **Sí** (ROIC 18,4 % − WACC 8,64 % = +9,8; 41,2 % sin fondo de comercio).
- Riesgo de IA: exposición Baja, sentido Mixto, efecto −3 % / +2 % a 3-5 años (menos comensales en oficinas frente a contratos de centros de datos). GLP-1: efecto lento y parcial.
- Ficha sectorial nueva `sectores/catering-contrato-2026-10-15.md` (+ comparables en JSON): el perímetro de catering aéreo no sirve.

## Resultado
- DCF 30,18 USD (−3,7 %); valor intrínseco 28,73 (−8,3 %); con la prima del mercado 32,41. Regla absoluta Vender, relativa Mantener: **Mantener**, convicción baja.
- 12 meses (v3): objetivo 36,37 USD; ponderada +18,3 %, base +21,8 % → Mantener (falla VI ≥ precio). v2: 15,3 % / 11,8 %. Selector: v3.
- Robustez: SÓLIDA, acción robusta Mantener. Comprar < 28,73 USD; vender > 41,18.
- Una acción ≈ 27,99 EUR: muy por debajo del 7 % de 30.000 EUR.
- Próximos resultados: 24-nov-2026 (FY2026 y asignación de capital).
- Frente a DO & CO (Comprar, convicción baja): DO & CO más barata (PER 15x, FCF 8,6 %), sin deuda y con más ROIC; Compass más grande, diversificada y estable.

## Lecciones
- Una cotizada de Londres que cambia la divisa de cotización (Compass pasó de GBp a USD el 1-abr-2026) rompe la serie de Yahoo y `bolsa.mjs` (salto de divisa leído como caída): usar el ADR o la línea en una sola divisa y comprobar el mínimo de 52 semanas.
- Empresas que cambian la divisa de presentación: el XBRL de años anteriores viene en la divisa vieja; convertir (medio para cuenta y flujos, cierre para balance) o usar la reexpresión de la empresa.
- Yahoo da a los compradores en serie el EBITDA publicado: la ficha de catering aéreo pone a Compass a 16,3x EV/EBITDA con margen del 7,9 %, frente a 12,4x y 10,3 % con el subyacente. Comparar múltiplos con la misma base.
